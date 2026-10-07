/**
 * Security Proxy (Next.js 16 — replaces middleware.ts)
 *
 * Applies security headers to all requests and rate-limits
 * the contact form API endpoint.
 */

import { NextResponse, type NextRequest } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), battery=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

// Rate limiting for contact endpoint
const RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 };

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

function rateLimitKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "unknown";
  const ua = (req.headers.get("user-agent") ?? "").substring(0, 50);
  return `${ip}:${ua}`;
}

function isRateLimited(req: NextRequest): boolean {
  const key = rateLimitKey(req);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  if (entry.count >= RATE_LIMIT.max) return true;

  entry.count++;
  return false;
}

export function proxy(request: NextRequest) {
  // Rate-limit contact submissions
  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/api/contact"
  ) {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  const response = NextResponse.next();

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
