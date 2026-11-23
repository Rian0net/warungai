# Devpost Submission — #BuildHybridAI 2026 (DRAFT)

> Copy the sections below into the Devpost submission form. Fields marked
> `[TO FILL]` need the real project links once they exist.

---

## Project name

**WarungAI**

## Tagline

Offline-first AI assistant for Indonesian micro-shops — private on-device
summaries, hybrid customer replies, cloud-powered promos, all through
Firebase AI Logic.

## Platforms

- Web (Chrome)

## Links

- **GitHub repository:** https://github.com/Rian0net/warungai
- **Live demo / working project URL:** https://rian0net.github.io/warungai/
- **Demo video (YouTube, ≤ 3 min):** `[TO FILL — video URL]`

---

## Description

### The problem

Indonesia's economy runs on more than 64 million micro, small and medium
enterprises (UMKM) — family-run *warungs*, food stalls, kiosks and home
shops. Their owners do everything themselves, and the invisible paperwork
piles up every single day:

- totalling the day's sales from memory or scribbled notes,
- answering the same customer questions on WhatsApp, one chat at a time,
- inventing promos and captions with no marketing help at all.

Cloud AI could help — but a warung's daily takings are its most sensitive
data, connections are unreliable, and there is no budget for per-request
AI costs. One routing strategy does not fit all of this work.

### The solution

**WarungAI** is a single-page web app that gives the shop owner three AI
tools, each routed through **Firebase AI Logic** with the inference
strategy that matches its privacy and quality needs:

1. **Private Sales Notes — `ONLY_ON_DEVICE`.**
   Paste the day's messy sales notes ("kopi sachet 20 laku 15 @2500,
   beras 5kg 3 karung @68000…") and get a structured summary with items,
   quantities and a computed total. This runs on Gemini Nano **only**. If
   the on-device model is unavailable, the feature *refuses to run* and
   explains why — a warung's takings never leave the device. Privacy is
   enforced by architecture, not by a promise in a privacy policy.

2. **Customer Reply & Product Copy — `PREFER_ON_DEVICE` (hybrid).**
   One click drafts a warm, copy-paste-ready WhatsApp reply in the
   customer's language plus a marketplace-ready product description.
   On-device first for speed, zero cost and offline use; the SDK falls
   back to the cloud automatically when Nano is unavailable.

3. **Promo Ideas & Translation — `PREFER_IN_CLOUD`.**
   Promo concepts sized for a tiny budget, bilingual captions
   (Bahasa Indonesia ↔ English) and a WhatsApp broadcast draft. Creative
   work gets the larger cloud model first, with the on-device model as an
   offline safety net.

**Radical transparency:** every result is badged with the actual
inference source reported by the SDK (`response.inferenceSource`) —
*On-device*, *Cloud*, or *Fallback* — so users (and judges) can verify
where each answer was really generated. A status panel also reports the
live availability of the on-device model (`LanguageModel.availability()`)
and offers a one-click model preparation/download with progress.

### Value proposition

- **Privacy small shops can verify** — financial data is processed
  on-device by design, and the UI proves it on every request.
- **Works with Indonesian reality** — offline-tolerant, zero marginal cost
  for the most frequent tasks, and fluent in Bahasa Indonesia and English.
- **One SDK, three honest strategies** — a reference implementation of
  per-feature inference routing with Firebase AI Logic hybrid inference.

### How it is built

- **Firebase AI Logic** (JS SDK) with the **Gemini Developer API**
  backend (`GoogleAIBackend`). Three `GenerativeModel` instances are
  created lazily on user interaction with `InferenceMode.ONLY_ON_DEVICE`,
  `InferenceMode.PREFER_ON_DEVICE` and `InferenceMode.PREFER_IN_CLOUD`;
  cloud requests use `gemini-3.5-flash-lite`.
- **On-device inference** uses Chrome's Prompt API (Gemini Nano) on
  Chrome desktop 139+; `initializeDeviceModel()` is called before the
  first request, with download progress surfaced in the UI.
- **Firebase App Check** protects the AI Logic endpoint (reCAPTCHA v3 in
  production; the debug provider, configured strictly via local
  environment variables, for localhost development).
- **Frontend:** Vite + vanilla JavaScript — no framework — one responsive
  page, no external assets, no tracking, no data storage. The app itself
  never persists the notes it processes.

### Challenges & what we learned

- Hybrid routing is a *product* decision, not just an API flag: the
  interesting design work was deciding which features may never touch the
  cloud, and making the "refusal" of the private feature understandable
  and trustworthy for a non-technical shop owner.
- The Chrome user-activation requirement for `initializeDeviceModel()`
  shapes the UX: model preparation belongs on an explicit button, and
  the status panel turned out to be the best place to teach users what
  "on-device" means.

### What's next

- Structured (JSON-schema) output for sales summaries, feeding a simple
  weekly bookkeeping view stored locally in the browser.
- Image input for photographed handwritten notes (on-device multimodal).
- An Android build reusing the same Firebase AI Logic routing design.

---

## Testing instructions (for judges)

1. Open the live demo URL in **Chrome desktop 139+**.
2. Check the **System status** panel: it reports whether the on-device
   model (Gemini Nano) is available on your machine. If it shows
   "Downloadable", click **Prepare on-device model** and wait for the
   one-time download to finish.
   *(Optional, for the full on-device experience: enable
   `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` and
   restart Chrome.)*
3. **Feature 1** ships with realistic sample sales notes pre-filled —
   just click **Summarize privately** and note the "Ran on-device" badge.
4. **Features 2 and 3** are also pre-filled with sample inputs; click
   their buttons and compare the inference-source badges.
5. To see the fallback path, open the demo in a browser without the
   Prompt API: Feature 1 will refuse (by design), Feature 2 will answer
   via the cloud with a "Fallback" badge.

No account or login is required. No data entered into the demo is stored.

## Built with

Firebase AI Logic · Firebase App Check · Gemini (cloud) · Gemini Nano /
Chrome Prompt API (on-device) · Vite · JavaScript
