// =============================================================================
// WarungAI — Firebase initialization
// =============================================================================
// This file contains PLACEHOLDER configuration only. No real keys, tokens, or
// secrets are committed to this repository.
//
// To connect the app to a real Firebase project, either:
//   (a) copy ".env.example" to ".env.local" and fill in the values from
//       Firebase console > Project settings > Your apps > Web app, or
//   (b) replace the REPLACE_WITH_* placeholders below with the same values.
//
// The Firebase web config object is NOT a secret (it identifies the project),
// but App Check debug tokens ARE sensitive in the sense that they must never
// be committed — they are only ever read from the local environment below.
// =============================================================================

import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";

// Read a VITE_FIREBASE_<suffix> value from the local environment,
// falling back to a clearly-marked placeholder when it is not set.
const pick = (suffix, fallback) =>
  import.meta.env[`VITE_FIREBASE_${suffix}`] ?? fallback;

const firebaseConfig = {
  apiKey: pick("API_KEY", "REPLACE_WITH_YOUR_FIREBASE_API_KEY"),
  authDomain: pick("AUTH_DOMAIN", "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com"),
  projectId: pick("PROJECT_ID", "REPLACE_WITH_YOUR_PROJECT_ID"),
  storageBucket: pick("STORAGE_BUCKET", "REPLACE_WITH_YOUR_PROJECT.appspot.com"),
  messagingSenderId: pick("MESSAGING_SENDER_ID", "REPLACE_WITH_YOUR_SENDER_ID"),
  appId: pick("APP_ID", "REPLACE_WITH_YOUR_APP_ID"),
};

/** True once the placeholder config has been replaced with a real project. */
export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith("REPLACE_WITH_") &&
  !firebaseConfig.projectId.startsWith("REPLACE_WITH_");

let app = null;

/**
 * Initialize (once) and return the FirebaseApp.
 *
 * App Check is initialized when a reCAPTCHA v3 site key is provided via
 * VITE_FIREBASE_APPCHECK_SITE_KEY. On localhost you can instead (or in
 * addition) enable the App Check *debug provider*:
 *
 *   1. Set VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=true (or a specific token
 *      UUID) in ".env.local".
 *   2. Reload the app — the debug token is printed to the browser console.
 *   3. Register it in Firebase console > App Check > Apps >
 *      Manage debug tokens.
 *
 * The debug token is set on `self.FIREBASE_APPCHECK_DEBUG_TOKEN` BEFORE
 * App Check is initialized, exactly as the official docs require. The value
 * only ever comes from the local environment — it is never hard-coded here.
 */
export function initFirebase() {
  if (app) return app;

  app = initializeApp(firebaseConfig);

  // --- App Check -------------------------------------------------------------
  const debugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;
  if (debugToken) {
    // "true" makes the SDK generate/print a token; a UUID reuses a known one.
    self.FIREBASE_APPCHECK_DEBUG_TOKEN =
      debugToken === "true" ? true : debugToken;
  }

  const siteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY;
  if (siteKey) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } else if (debugToken) {
    // Debug provider only (no site key configured yet): App Check still
    // initializes so local requests carry the debug token.
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider("debug-placeholder-key"),
      isTokenAutoRefreshEnabled: true,
    });
  }

  return app;
}

export { firebaseConfig };
