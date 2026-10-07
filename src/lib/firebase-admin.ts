import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin — server-side only.
 *
 * Single shared Firestore instance for all server routes. Credentials come
 * exclusively from server-side env vars (never NEXT_PUBLIC_*):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *
 * The NEXT_PUBLIC_FIREBASE_* web config in .env.local is the browser SDK
 * config — it is intentionally public and is NOT used here. All Firestore
 * writes go through this admin instance so Firestore security rules can
 * stay locked down (deny-all for direct client writes).
 */

let db: Firestore | null = null;
let warned = false;

export function getContactDb(): Firestore | null {
  if (db) return db;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    if (!warned) {
      warned = true;
      console.warn(
        "[firebase-admin] Service account env vars missing — " +
          "FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY. " +
          "Firestore persistence disabled until they are set."
      );
    }
    return null;
  }

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

  db = getFirestore(app);
  return db;
}
