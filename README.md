# Ibrahim Sbouai — Portfolio

Personal engineering portfolio of **Ibrahim Sbouai**, Computer Engineering
student specializing in **Embedded Systems & IoT**.

Built with Next.js (App Router), React, Tailwind CSS v4 and Framer Motion.

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint    # ESLint
npm run build   # production build + type check
npm run start   # serve the production build
```

---

## Contact form

The contact form is a three-part system:

```
browser → /api/contact (public endpoint: validation, origin check, rate limit)
        → Firestore   (server-side write via firebase-admin service account)
        → Resend      (email notification to the portfolio owner)
```

Secrets never reach the browser. `firebase-admin` is declared in
`serverExternalPackages` and only imported inside the API route.

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values. All of these are
**server-side only** — none are prefixed with `NEXT_PUBLIC_`.

| Variable | Purpose |
| --- | --- |
| `FIREBASE_PROJECT_ID` | Firebase service account project id |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key (`\n` escaped) |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `Portfolio <contact@domain>` |
| `CONTACT_TO_EMAIL` | Where notifications are delivered (optional; falls back to the public contact address) |

At least one delivery channel must be configured, otherwise the endpoint
returns `503` with a clear message instead of faking success.

### Security notes

- Input is normalized and validated server-side; length caps are enforced
  (`name ≤ 80`, `email ≤ 254`, `message ≤ 2000`, body ≤ 16 KB).
- A honeypot field silently drops naive bots.
- Two independent in-memory rate limiters apply (proxy + route).
  For multi-instance deployments, move rate limiting to a shared store.
- Submissions are stored with `status: "new"`; Firestore access should be
  locked down with rules that deny all client reads/writes and allow only
  the Admin SDK.
- Email HTML escapes all user input; headers are never built from raw input.

---

## Deployment

Deploy on Vercel and configure the environment variables in the project
settings. The contact form works without configuration except that it will
report itself as not configured until a delivery channel is provided.
