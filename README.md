# WarungAI — Offline-First AI Assistant for Indonesian Micro-Shops

**WarungAI** helps the owners of Indonesia's ~64 million micro, small and
medium enterprises (UMKM) — the neighbourhood *warung*, food stalls, kiosks
and home shops — do the paperwork they currently do in their heads or on
scraps of paper: totalling the day's sales, replying to customers on
WhatsApp, and inventing the next promo.

WarungAI is built for the **#BuildHybridAI 2026** hackathon. All of its AI
runs through **Firebase AI Logic** with **hybrid inference**: Gemini Nano
on-device in Chrome (via the Prompt API) when available, and Gemini in the
cloud otherwise. The app chooses a different routing strategy per feature —
because a warung's daily takings and a marketing caption do not deserve the
same privacy treatment.

> **Live idea in one line:** *sensitive data never leaves the device,
> everyday work uses whichever model is fastest, creative work uses the
> biggest model — and the UI always shows which one answered.*

---

## Features & inference modes

Every result in the UI carries a badge with the inference source reported
by the SDK (`response.inferenceSource`): **On-device**, **Cloud**, or
**Fallback**.

| # | Feature | Mode | Why this mode |
|---|---------|------|---------------|
| 1 | **Private Sales Notes** | `ONLY_ON_DEVICE` | Paste messy handwritten-style daily sales notes → structured summary (items, quantities, totals). Daily takings are the shop's most sensitive data, so this feature is hard-wired to the on-device model. **If Gemini Nano is unavailable it refuses to run and explains why — it never falls back to the cloud.** That refusal *is* the feature. |
| 2 | **Customer Reply & Product Copy** | `PREFER_ON_DEVICE` (hybrid) | Drafts a warm WhatsApp reply plus a product description. On-device first: instant, free, works offline. If Nano is unavailable, the SDK falls back to the cloud automatically and the badge shows "Fallback". |
| 3 | **Promo Ideas & Translation** | `PREFER_IN_CLOUD` | Promo concepts, bilingual captions (Bahasa Indonesia ↔ English) and a WhatsApp broadcast draft. Creative work benefits from the larger cloud model; the on-device model remains an offline safety net. |

### Architecture

```
┌──────────────────────────── WarungAI (Chrome, Vite + vanilla JS) ───────────────────────────┐
│                                                                                             │
│   UI (index.html / src/main.js)                                                             │
│     │  every result is badged with response.inferenceSource                                 │
│     ▼                                                                                       │
│   AI layer (src/ai.js) — Firebase AI Logic, GoogleAIBackend                                 │
│     ├── GenerativeModel { mode: ONLY_ON_DEVICE }   ──► Feature 1 (private)                  │
│     ├── GenerativeModel { mode: PREFER_ON_DEVICE } ──► Feature 2 (hybrid)                   │
│     └── GenerativeModel { mode: PREFER_IN_CLOUD }  ──► Feature 3 (cloud-first)              │
│                    │                                        │                               │
│        on-device route                          cloud route (fallback / first choice)       │
│                    ▼                                        ▼                               │
│   Chrome Prompt API → Gemini Nano          Firebase AI Logic → Gemini (gemini-3.5-flash-lite)│
│   (data never leaves the device)           (protected by Firebase App Check)                │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

Key implementation details:

- Model instances are created **lazily on user interaction**, and
  `initializeDeviceModel()` is called before the first request, as the
  Firebase AI Logic docs require (Chrome user-activation rule).
- On load, the status panel calls `LanguageModel.availability()` (Chrome
  Prompt API) and shows whether Gemini Nano is *available / downloadable /
  downloading / unavailable / unsupported*, with a one-click
  **Prepare on-device model** button that downloads it with progress.
- `ONLY_ON_DEVICE` requests that cannot be served throw in the SDK; the AI
  layer converts that into an `OnDeviceUnavailableError`, and the UI
  explains the privacy reasoning instead of silently rerouting the data.

---

## Setup

### Prerequisites

- Node.js 20+ and npm
- **Chrome desktop 139+** for on-device inference, with the flag
  `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` set to
  **Enabled** (then restart Chrome). Without it, on-device is unavailable
  and hybrid features simply use the cloud.
- A Firebase project (free Spark plan is enough to start)

### 1. Create the Firebase project & enable AI Logic

1. Go to the [Firebase console](https://console.firebase.google.com) and
   create a project (Google Analytics is not required).
2. In the console: **AI Services → AI Logic → Get started**, and follow the
   guided workflow. When asked for a Gemini API provider, choose the
   **Gemini Developer API** (free to start). The workflow also enforces
   **Firebase App Check** for AI Logic — that is expected.
3. Register a **Web app** in Project settings and copy its config object.

### 2. Configure the app

Option A — environment file (recommended):

```bash
cp .env.example .env.local
# fill in the VITE_FIREBASE_* values from your web app config
```

Option B — edit the placeholders in `src/firebase-config.js` directly.

> The Firebase web config identifies your project; it is not a secret key.
> App Check **debug tokens**, however, must never be committed — this repo
> only ever reads them from your local `.env.local`.

### 3. App Check for localhost (debug provider)

AI Logic enforces App Check, so local requests need the debug provider:

1. In `.env.local` set `VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=true`.
2. Run the app (below), open DevTools — the console prints an
   *App Check debug token*.
3. Register it in **Firebase console → App Check → Apps →
   Manage debug tokens**.

For production, set `VITE_FIREBASE_APPCHECK_SITE_KEY` to your reCAPTCHA v3
site key instead.

### 4. Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs dist/
npm run preview
```

---

## Project structure

```
warungai/
├── index.html            # single-page UI (English UI; ID/EN input welcome)
├── src/
│   ├── main.js           # UI wiring, status panel, inference-source badges
│   ├── ai.js             # Firebase AI Logic layer: 3 models, 3 features
│   ├── firebase-config.js# placeholder config + App Check (debug via env)
│   └── style.css         # clean responsive styling, no external assets
├── DEMO-SCRIPT.md        # 3-minute demo video script
├── SUBMISSION.md         # Devpost submission text (draft)
├── .env.example          # copy to .env.local and fill in
└── LICENSE               # Apache-2.0
```

## Notes & limitations

- On-device inference via Firebase AI Logic is supported on **Chrome
  desktop**; on other browsers the on-device column of the status panel
  reports "not supported" and hybrid features use the cloud.
- On-device generation is single-turn text generation (no chat) — all
  three features are designed as single-turn requests.
- No user accounts, no database, no tracking: notes are processed in the
  request and never stored by the app.

## License

Apache-2.0 — see [LICENSE](LICENSE).
