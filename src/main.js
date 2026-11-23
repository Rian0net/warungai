// =============================================================================
// WarungAI — UI wiring
// =============================================================================
// One page, three features, one status panel. Every AI result carries a
// badge that names the inference source reported by Firebase AI Logic
// (`response.inferenceSource`), so it is always visible where a request
// actually ran: on-device, in the cloud, or as a fallback.
// =============================================================================

import "./style.css";
import { initFirebase, isFirebaseConfigured } from "./firebase-config.js";
import {
  initAI,
  checkOnDeviceAvailability,
  prepareOnDeviceModel,
  summarizeSalesNotes,
  draftCustomerContent,
  generatePromoIdeas,
  OnDeviceUnavailableError,
  InferenceSource,
} from "./ai.js";

const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------------------
// Boot: Firebase + AI service + status panel
// ---------------------------------------------------------------------------
const app = initFirebase();
initAI(app);

const firebaseStatusEl = $("firebase-status");
firebaseStatusEl.textContent = isFirebaseConfigured
  ? "Connected — project config loaded"
  : "Placeholder config — add your Firebase project values to run live cloud requests (see README)";

const DEVICE_STATUS_TEXT = {
  available: "Available — Gemini Nano is ready on this device",
  downloadable: "Downloadable — use the button below to fetch it (one-time)",
  downloading: "Downloading — please wait…",
  unavailable: "Unavailable on this device",
  unsupported:
    "Not supported in this browser — needs Chrome desktop 139+ (Prompt API)",
};

async function refreshDeviceStatus() {
  const status = await checkOnDeviceAvailability();
  $("device-status").textContent =
    DEVICE_STATUS_TEXT[status] ?? `Unknown (${status})`;
  return status;
}
refreshDeviceStatus();

$("prepare-device-btn").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const progressEl = $("prepare-progress");
  button.disabled = true;
  progressEl.hidden = false;
  progressEl.textContent = "Preparing on-device model…";
  try {
    await prepareOnDeviceModel((fraction) => {
      progressEl.textContent = `Downloading on-device model: ${Math.round(
        fraction * 100,
      )}%`;
    });
    progressEl.textContent = "On-device model is ready.";
  } catch (err) {
    progressEl.textContent =
      "Could not prepare the on-device model here. Hybrid features will " +
      "use the cloud instead. Details: " +
      (err?.message ?? err);
  } finally {
    button.disabled = false;
    refreshDeviceStatus();
  }
});

// ---------------------------------------------------------------------------
// Result rendering helpers
// ---------------------------------------------------------------------------
function badgeFor(feature, inferenceSource) {
  switch (feature) {
    case "sales": // ONLY_ON_DEVICE
      return inferenceSource === InferenceSource.ON_DEVICE
        ? { cls: "badge-device", label: "🟢 Ran on-device — nothing left this device" }
        : { cls: "badge-unknown", label: `Source: ${inferenceSource}` };
    case "reply": // PREFER_ON_DEVICE
      if (inferenceSource === InferenceSource.ON_DEVICE)
        return { cls: "badge-device", label: "🟢 On-device" };
      if (inferenceSource === InferenceSource.IN_CLOUD)
        return { cls: "badge-fallback", label: "🟠 Fallback — answered by the cloud" };
      return { cls: "badge-unknown", label: `Source: ${inferenceSource}` };
    case "promo": // PREFER_IN_CLOUD
      if (inferenceSource === InferenceSource.IN_CLOUD)
        return { cls: "badge-cloud", label: "🔵 Cloud" };
      if (inferenceSource === InferenceSource.ON_DEVICE)
        return { cls: "badge-device", label: "🟢 On-device (offline fallback)" };
      return { cls: "badge-unknown", label: `Source: ${inferenceSource}` };
    default:
      return { cls: "badge-unknown", label: `Source: ${inferenceSource}` };
  }
}

function showResult(el, badge, text) {
  el.hidden = false;
  el.classList.remove("error");
  el.innerHTML = "";
  const badgeEl = document.createElement("span");
  badgeEl.className = `badge ${badge.cls}`;
  badgeEl.textContent = badge.label;
  const pre = document.createElement("pre");
  pre.textContent = text;
  el.append(badgeEl, pre);
}

function showError(el, message) {
  el.hidden = false;
  el.classList.add("error");
  el.textContent = message;
}

async function runFeature(button, resultEl, action) {
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Working…";
  resultEl.hidden = true;
  try {
    await action();
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

// ---------------------------------------------------------------------------
// Feature 1 — Private Sales Notes (on-device only)
// ---------------------------------------------------------------------------
$("sales-btn").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const resultEl = $("sales-result");
  runFeature(button, resultEl, async () => {
    const notes = $("sales-input").value.trim();
    if (!notes) {
      showError(resultEl, "Please paste some sales notes first.");
      return;
    }
    try {
      const { text, inferenceSource } = await summarizeSalesNotes(notes);
      showResult(resultEl, badgeFor("sales", inferenceSource), text);
    } catch (err) {
      if (err instanceof OnDeviceUnavailableError) {
        showError(
          resultEl,
          "🔒 Blocked on purpose. The on-device model is not available in " +
            "this browser right now, and Private Sales Notes never sends " +
            "your numbers to the cloud — that is the whole point of this " +
            "feature. Open this page in Chrome desktop 139+, prepare the " +
            "on-device model with the button at the top, and try again. " +
            "The other two features are allowed to use the cloud.\n\n" +
            "Technical detail: " +
            (err.cause?.message ?? err.message),
        );
      } else {
        showError(resultEl, "Something went wrong: " + (err?.message ?? err));
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 2 — Customer Reply & Product Copy (hybrid, prefer on-device)
// ---------------------------------------------------------------------------
$("reply-btn").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const resultEl = $("reply-result");
  runFeature(button, resultEl, async () => {
    try {
      const { text, inferenceSource } = await draftCustomerContent({
        product: $("reply-product").value.trim(),
        customerMessage: $("reply-message").value.trim(),
        details: $("reply-details").value.trim(),
      });
      showResult(resultEl, badgeFor("reply", inferenceSource), text);
    } catch (err) {
      showError(
        resultEl,
        "Could not draft that just now (on-device and cloud both failed). " +
          "Check the Firebase configuration and your connection.\n\n" +
          "Technical detail: " +
          (err?.message ?? err),
      );
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 3 — Promo Ideas & Translation (cloud-first)
// ---------------------------------------------------------------------------
$("promo-btn").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const resultEl = $("promo-result");
  runFeature(button, resultEl, async () => {
    try {
      const { text, inferenceSource } = await generatePromoIdeas({
        product: $("promo-product").value.trim(),
        audience: $("promo-audience").value.trim(),
        occasion: $("promo-occasion").value.trim(),
      });
      showResult(resultEl, badgeFor("promo", inferenceSource), text);
    } catch (err) {
      showError(
        resultEl,
        "Could not generate promo ideas just now. Check the Firebase " +
          "configuration and your connection.\n\nTechnical detail: " +
          (err?.message ?? err),
      );
    }
  });
});
