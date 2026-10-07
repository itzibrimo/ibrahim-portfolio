/**
 * Security Utilities
 *
 * Shared helpers for input normalization, validation and rate limiting.
 *
 * Notes on approach:
 * - Input is normalized (control characters removed, length capped) but NOT
 *   HTML-mangled. Stored text is never rendered as HTML; escaping happens at
 *   the output boundary (e.g. when building the notification email).
 * - The rate limiter is in-memory and per-instance. The proxy layer adds a
 *   second limiter; a distributed store (e.g. Redis/Firestore) should replace
 *   this if the site ever scales horizontally.
 */

const CONTROL_CHARS_SINGLE_LINE = /[\u0000-\u001F\u007F]/g;
const CONTROL_CHARS_MULTILINE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Normalize a single-line field: no control characters, no CR/LF, capped. */
export function sanitizeSingleLine(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(CONTROL_CHARS_SINGLE_LINE, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Normalize a multi-line field: keep line breaks, drop other control chars. */
export function sanitizeMultiline(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(CONTROL_CHARS_MULTILINE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

/** Normalize an email address. */
export function sanitizeEmail(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(CONTROL_CHARS_SINGLE_LINE, "").trim().toLowerCase().slice(0, 254);
}

/**
 * Practical email format check: one @, a dot in the domain, no whitespace.
 * Deliberately conservative — delivery is the real validation.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
}

/** Escape a value for safe interpolation into HTML (email bodies). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

/**
 * Create an isolated in-memory limiter.
 * Returns { allowed, remaining, resetAt } for a key.
 */
export function createRateLimiter(
  name: string,
  config: RateLimitConfig
): (key: string) => { allowed: boolean; remaining: number; resetAt: number } {
  let store = stores.get(name);
  if (!store) {
    store = new Map<string, RateLimitEntry>();
    stores.set(name, store);
  }
  const activeStore = store;

  return function checkRateLimit(key: string) {
    const now = Date.now();
    const entry = activeStore.get(key);

    // Opportunistic cleanup to keep the map bounded.
    if (activeStore.size > 5000) {
      for (const [k, v] of activeStore) {
        if (now > v.resetAt) activeStore.delete(k);
      }
    }

    if (!entry || now > entry.resetAt) {
      const resetAt = now + config.windowMs;
      activeStore.set(key, { count: 1, resetAt });
      return { allowed: true, remaining: config.max - 1, resetAt };
    }

    if (entry.count >= config.max) {
      return { allowed: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count++;
    return { allowed: true, remaining: config.max - entry.count, resetAt: entry.resetAt };
  };
}

// ---------------------------------------------------------------------------
// Contact form validation
// ---------------------------------------------------------------------------

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  data?: ContactInput;
  errors?: Record<string, string>;
}

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 2000,
  /** Maximum accepted request body (bytes) */
  bodyBytes: 16_000,
} as const;

export function validateContactInput(raw: unknown): ValidationResult {
  if (typeof raw !== "object" || raw === null) {
    return { success: false, errors: { form: "Invalid request body." } };
  }

  const body = raw as Record<string, unknown>;
  const data: ContactInput = {
    name: sanitizeSingleLine(body.name, CONTACT_LIMITS.name),
    email: sanitizeEmail(body.email),
    message: sanitizeMultiline(body.message, CONTACT_LIMITS.message),
  };

  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  } else if (data.name.length < 2) {
    errors.name = "Name is too short.";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message) {
    errors.message = "Please enter a message.";
  } else if (data.message.length < 10) {
    errors.message = "Message is too short.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
