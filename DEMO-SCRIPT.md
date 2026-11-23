# WarungAI — Demo Video Script (max 3 minutes)

**Format notes:** screen recording of the app in Chrome desktop + voiceover
(or on-screen captions). Record at 1080p. Keep the browser's address bar
visible in the status segment so judges can see it is a real web app.
Total target runtime: **2:45–3:00**.

---

### 0:00–0:30 — The problem, the solution, the hybrid idea *(required hook)*

> **[Screen: title card "WarungAI", then a photo-like shot of a small
> Indonesian warung / the app's header.]**
>
> "Indonesia has more than 64 million micro-shops — warungs. Every night,
> owners like Bu Tini total up the day's sales from memory, answer customer
> chats one by one, and guess at tomorrow's promo. They need AI help — but
> their sales numbers are private, their internet is unreliable, and their
> budget for AI is zero.
>
> This is **WarungAI**. It runs on **Firebase AI Logic hybrid inference**:
> Gemini Nano *on the device* for private work, Gemini *in the cloud* when
> it needs more brain — and it always shows you which one answered."

### 0:30–0:50 — Status panel: hybrid is real, not a slide

> **[Screen: scroll to the System status panel.]**
>
> "First, proof this is real. The status panel asks Chrome's Prompt API
> directly: Gemini Nano is *available* on this machine. Watch — I'll click
> 'Prepare on-device model' so the model is ready before we start."

*(If the model needs downloading, show the progress percentage briefly,
then cut.)*

### 0:50–1:35 — Feature 1: Private Sales Notes (on-device ONLY)

> **[Screen: Feature 1 card, with the sample messy notes.]**
>
> "These are today's sales notes — the way a real owner writes them.
> Messy, mixed, with prices scribbled in. This is the shop's most
> sensitive data, so WarungAI summarises it with the on-device model
> *only*. Click…"

*(Click "Summarize privately". Show the structured summary and the total.)*

> "A clean itemised summary with a total — and look at the badge:
> **'Ran on-device'**. Nothing left this laptop.
>
> And here is the important part: if the on-device model is *not*
> available, this feature **refuses to run**. It will not quietly send a
> warung's takings to the cloud. For a small shop, that refusal is the
> feature."

*(Optional, if time: toggle Chrome offline / show the refusal message
screenshot.)*

### 1:35–2:15 — Feature 2: Customer Reply & Product Copy (hybrid)

> **[Screen: Feature 2 card.]**
>
> "Next, everyday work. A customer asks on WhatsApp: is the coffee in
> stock, can you deliver today? One click drafts a warm reply in the
> customer's language — plus a product description for the catalogue.
>
> This feature *prefers* the on-device model: instant and free. If Nano
> isn't available, Firebase AI Logic falls back to the cloud
> automatically — and the badge honestly changes to **'Fallback —
> answered by the cloud'**. Same button, same result, no dead ends."

### 2:15–2:45 — Feature 3: Promo Ideas & Translation (cloud-first)

> **[Screen: Feature 3 card.]**
>
> "Creative work gets the big model. Promo ideas for 'Jumat Berkah',
> captions in Indonesian *and* English, and a WhatsApp broadcast draft —
> cloud-first, with the on-device model as an offline safety net."

*(Show the generated promo output scrolling.)*

### 2:45–3:00 — Close

> **[Screen: back to the header / title card.]**
>
> "Three features, three routing strategies, one SDK. Private by default,
> hybrid by design, and honest about where every answer came from.
> That's WarungAI — AI that fits in a warung. Terima kasih!"

---

## Recording checklist

- [ ] Chrome desktop 139+, flag
      `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` = Enabled
- [ ] On-device model prepared *before* recording (status = Available)
- [ ] Real Firebase project config in place (`.env.local`), App Check
      debug token registered
- [ ] DevTools closed, browser zoom 100%, window ≥1280px wide
- [ ] Voiceover recorded in a quiet room, or captions burned in
- [ ] Runtime ≤ 3:00 — judges may only watch the first 3 minutes
