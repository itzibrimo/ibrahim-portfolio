import { NextRequest, NextResponse } from "next/server";
import {
  validateContactInput,
  sanitizeSingleLine,
  sanitizeMultiline,
  sanitizeEmail,
  escapeHtml,
  createRateLimiter,
  CONTACT_LIMITS,
} from "@/lib/security";
import { getContactDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Contact form API endpoint.
 *
 * Architecture:
 * - Validation + sanitization via shared lib/security utilities.
 * - Rate limiting here AND at the proxy layer (defense in depth).
 * - Submissions stored in Firestore via firebase-admin (see
 *   lib/firebase-admin.ts — service account credentials live only in
 *   server-side env vars, never in client code).
 * - Email notification via Resend (server-only API key).
 *
 * Required environment variables (never NEXT_PUBLIC_*):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *   RESEND_API_KEY
 *   CONTACT_NOTIFICATION_EMAIL
 *
 * The NEXT_PUBLIC_FIREBASE_* web config in .env.local is the browser SDK
 * config — intentionally public, and NOT used by this route. Firestore
 * security rules can therefore deny all direct client writes.
 */

// ── Rate limiter (5 submissions per 15 min per IP) ────────────────────────

const contactRateLimit = createRateLimiter("contact", {
  windowMs: 15 * 60 * 1000,
  max: 5,
});

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

// ── Firestore persistence (server-side only) ──────────────────────────────

async function storeSubmission(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const db = getContactDb();
  if (!db) {
    throw new Error("Firestore not configured — missing service account env vars");
  }

  await db.collection("contact_submissions").add({
    name: data.name,
    email: data.email,
    message: data.message,
    createdAt: FieldValue.serverTimestamp(),
    status: "new",
  });
}

// ── Email notification (server-side only) ─────────────────────────────────

async function sendNotification(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.log("[contact] Resend not configured — no email sent");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  // Plain-text body — user content never goes into HTML.
  const text = [
    "New portfolio contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  // HTML body — escape all user-supplied values at the output boundary.
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <hr />
    <pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre>
  `;

  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `Portfolio contact from ${data.name}`,
    text,
    html,
  });
}

// ── Handler ───────────────────────────────────────────────────────────────

const securityHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  const limit = contactRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: securityHeaders }
    );
  }

  // Body size guard
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > CONTACT_LIMITS.bodyBytes) {
    return NextResponse.json(
      { success: false, error: "Request body too large." },
      { status: 413, headers: securityHeaders }
    );
  }

  // Parse JSON
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400, headers: securityHeaders }
    );
  }

  // Honeypot — bots fill hidden fields
  if (raw && typeof raw === "object" && "website" in raw) {
    const honeypot = (raw as Record<string, unknown>).website;
    if (honeypot !== "" && honeypot !== undefined && honeypot !== null) {
      // Silently accept to not reveal bot detection
      return NextResponse.json(
        { success: true, message: "Message sent." },
        { status: 200, headers: securityHeaders }
      );
    }
  }

  // Validate and sanitize
  const result = validateContactInput(raw);
  if (!result.success || !result.data) {
    return NextResponse.json(
      { success: false, errors: result.errors ?? { form: "Invalid input." } },
      { status: 400, headers: securityHeaders }
    );
  }

  const data = result.data;

  // Additional sanitization pass (defense in depth)
  const clean = {
    name: sanitizeSingleLine(data.name, CONTACT_LIMITS.name),
    email: sanitizeEmail(data.email),
    message: sanitizeMultiline(data.message, CONTACT_LIMITS.message),
  };

  // Persist + notify — both can fail independently
  const [storeResult, notifyResult] = await Promise.allSettled([
    storeSubmission(clean),
    sendNotification(clean),
  ]);

  // Persistence is the source of truth — if Firestore fails, report an error
  // instead of falsely claiming delivery.
  if (storeResult.status === "rejected") {
    console.error("[contact] Firestore error:", storeResult.reason);
    return NextResponse.json(
      { success: false, error: "Could not save your message. Please try again later." },
      { status: 503, headers: securityHeaders }
    );
  }
  if (notifyResult.status === "rejected") {
    // Submission is safely stored; the notification email can be retried.
    console.error("[contact] Resend error:", notifyResult.reason);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Message received. I'll get back to you soon.",
    },
    { status: 200, headers: securityHeaders }
  );
}
