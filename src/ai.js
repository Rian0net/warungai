// =============================================================================
// WarungAI — Firebase AI Logic layer (hybrid inference)
// =============================================================================
// All AI in this app goes through Firebase AI Logic. Three model instances
// demonstrate the three hybrid routing strategies offered by the SDK:
//
//   1. ONLY_ON_DEVICE   — Gemini Nano in Chrome (Prompt API). Never leaves
//                         the device. Throws if the on-device model is not
//                         available. Used for PRIVATE sales notes.
//   2. PREFER_ON_DEVICE — Hybrid: on-device when available, seamless
//                         fallback to the cloud model otherwise.
//                         Used for customer replies & product copy.
//   3. PREFER_IN_CLOUD  — Cloud-first (best quality), falls back to the
//                         on-device model if the device is offline.
//                         Used for promo ideas & translations.
//
// Every response reports `response.inferenceSource` ("ON_DEVICE" or
// "IN_CLOUD") so the UI can show the user — and the judges — exactly where
// each request actually ran.
//
// Model instances are created lazily, on/after a user interaction, as the
// Firebase AI Logic docs require for inference modes.
// =============================================================================

import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
} from "firebase/ai";

/** Default cloud-hosted model used for fallback / cloud-first requests. */
export const CLOUD_MODEL = "gemini-3.5-flash-lite";

export const InferenceSource = {
  ON_DEVICE: "ON_DEVICE",
  IN_CLOUD: "IN_CLOUD",
  UNKNOWN: "UNKNOWN",
};

/** Error thrown when an on-device-only request cannot run on this device. */
export class OnDeviceUnavailableError extends Error {
  constructor(cause) {
    super(
      "On-device model is not available on this device/browser, and this " +
        "feature refuses to send your data to the cloud.",
    );
    this.name = "OnDeviceUnavailableError";
    this.code = "ON_DEVICE_UNAVAILABLE";
    this.cause = cause;
  }
}

let aiService = null;
const modelCache = new Map();

/** Initialize the Firebase AI Logic service (Gemini Developer API backend). */
export function initAI(firebaseApp) {
  if (!aiService) {
    aiService = getAI(firebaseApp, { backend: new GoogleAIBackend() });
  }
  return aiService;
}

function getModel(mode) {
  if (!aiService) {
    throw new Error("AI service not initialized. Call initAI() first.");
  }
  if (!modelCache.has(mode)) {
    const params = { mode };
    // For modes that can reach the cloud, pin the cloud model explicitly.
    if (mode !== InferenceMode.ONLY_ON_DEVICE) {
      params.inCloudParams = { model: CLOUD_MODEL };
    }
    modelCache.set(mode, getGenerativeModel(aiService, params));
  }
  return modelCache.get(mode);
}

/**
 * Check whether Chrome's on-device model (Gemini Nano, via the Prompt API)
 * is usable right now. Returns one of:
 *   "available" | "downloadable" | "downloading" | "unavailable" |
 *   "unsupported" (no Prompt API — e.g. not Chrome desktop 139+)
 */
export async function checkOnDeviceAvailability() {
  const LanguageModel = self.LanguageModel;
  if (!LanguageModel || typeof LanguageModel.availability !== "function") {
    return "unsupported";
  }
  try {
    return await LanguageModel.availability();
  } catch {
    return "unavailable";
  }
}

/**
 * Prepare the on-device model (triggers its download if needed).
 * MUST be called from a user interaction (button click), per Chrome's
 * user-activation requirement. `onProgress` receives 0..1 download progress.
 */
export async function prepareOnDeviceModel(onProgress) {
  const model = getModel(InferenceMode.PREFER_ON_DEVICE);
  await model.initializeDeviceModel((fraction) => {
    if (typeof onProgress === "function") onProgress(fraction);
  });
}

async function generate(model, prompt) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  return {
    text: response.text(),
    inferenceSource: response.inferenceSource ?? InferenceSource.UNKNOWN,
  };
}

// =============================================================================
// Feature 1 — Private Sales Notes (ON_DEVICE_ONLY)
// =============================================================================
// Daily takings are the most sensitive data a warung owner has. This feature
// is hard-wired to ONLY_ON_DEVICE: if Gemini Nano is not available, it fails
// loudly and explains why — it will NEVER silently fall back to the cloud.
// =============================================================================
export async function summarizeSalesNotes(notes) {
  const model = getModel(InferenceMode.ONLY_ON_DEVICE);
  const prompt = [
    "You are WarungAI, an assistant for Indonesian micro-shops (warung / UMKM).",
    "Turn the shop owner's messy daily sales notes into a clean, structured summary.",
    "",
    "Rules:",
    "- Reply in the same language as the notes (Indonesian or English).",
    "- List one line per item: Item | Qty | Unit price | Amount.",
    "- Compute each line amount when quantity and price are present, and end with a TOTAL line (use Rp if the notes use Rupiah).",
    '- If a quantity or price is missing or unclear, write "?" for it and add a short "needs checking" note. Never guess or invent items, quantities, or prices.',
    "- Keep the output compact, with a one-line closing remark about the day.",
    "",
    "Sales notes:",
    '"""',
    notes,
    '"""',
  ].join("\n");

  try {
    await model.initializeDeviceModel(() => {});
    return await generate(model, prompt);
  } catch (err) {
    // ONLY_ON_DEVICE throws when the on-device model cannot serve the
    // request. By design there is no cloud fallback for this feature.
    throw new OnDeviceUnavailableError(err);
  }
}

// =============================================================================
// Feature 2 — Customer Reply & Product Copy (PREFER_ON_DEVICE, hybrid)
// =============================================================================
// Everyday drafting work: try the free, instant on-device model first and
// fall back to the cloud automatically when Nano is unavailable. The result
// badge shows which one actually answered.
// =============================================================================
export async function draftCustomerContent({ product, customerMessage, details }) {
  const model = getModel(InferenceMode.PREFER_ON_DEVICE);
  const prompt = [
    "You are WarungAI, an assistant for Indonesian micro-shops (warung / UMKM).",
    "Produce TWO things for the shop owner:",
    "",
    '1. A "WhatsApp reply" draft the owner can copy-paste to the customer: warm, polite, concise, in the language of the customer message (Indonesian or English).',
    '2. A "Product description": 2-3 attractive sentences for the product, suitable for a marketplace or WhatsApp catalogue, in the same language.',
    "",
    `Product: ${product || "(not specified)"}`,
    `Customer message / situation: ${customerMessage || "(general enquiry)"}`,
    `Extra details from the owner: ${details || "(none)"}`,
    "",
    "Format the answer with exactly these two headings:",
    "WhatsApp reply:",
    "Product description:",
  ].join("\n");

  await model.initializeDeviceModel(() => {});
  return generate(model, prompt);
}

// =============================================================================
// Feature 3 — Promo Ideas & Translation (PREFER_IN_CLOUD)
// =============================================================================
// Creative marketing work benefits from the bigger cloud model, so this one
// is cloud-first and only drops to the on-device model when offline.
// =============================================================================
export async function generatePromoIdeas({ product, audience, occasion }) {
  const model = getModel(InferenceMode.PREFER_IN_CLOUD);
  const prompt = [
    "You are WarungAI, a creative marketing assistant for Indonesian micro-shops (warung / UMKM) with very small budgets.",
    "",
    `Product / shop: ${product || "(a small neighbourhood warung)"}`,
    `Target customers: ${audience || "local neighbourhood customers"}`,
    `Occasion / moment: ${occasion || "a normal week (no special event)"}`,
    "",
    "Produce, in English with Indonesian content where asked:",
    "1. Three promo ideas — each with a catchy name and a one-line mechanic that a tiny shop can actually afford to run.",
    "2. Two ready-to-post social media captions for the same promo: one in Bahasa Indonesia and one in English (a translation pair).",
    "3. One short WhatsApp broadcast message in Bahasa Indonesia.",
    "Only use concrete discounts or prices if they were provided above; otherwise use placeholders like [10%].",
  ].join("\n");

  return generate(model, prompt);
}
