# /contact page refresh — summary

## What changed

- **Hero:** Warmer, buyer-oriented headline (“Talk to Disclosurely”) and subcopy focused on comparing providers, rollout, and pricing ([`ContactContent.tsx`](app/(public)/contact/ContactContent.tsx), [`en.json` `contact.hero`](i18n/locales/en.json)).
- **Left column:** Replaced email/phone/address blocks with **“How we can help”** — five concise bullets (walkthrough, pricing, compliance, rollout, enterprise setups) plus a tightened **enterprise card** (“Need a tailored setup?”).
- **Removed placeholder trust risks:** Fake phone (`+44 (0)20 1234 5678` / `+44 7123…`) and vague “London, United Kingdom” contact blocks are **removed** from the UI. Users reach the team via the form (emails still go to configured Resend recipients).
- **Form:** First field is **required enquiry type** (demo, pricing, compliance, rollout, enterprise setup, general). Optional **organisation size** band. Updated labels/placeholders (work email, organisation). **Reassurance** row: business-day response, no hard sales pressure, tailored conversation.
- **Submit:** Button copy **“Send request”** (localized).
- **API:** [`app/api/contact/route.ts`](app/api/contact/route.ts) accepts `enquiryType` (required, validated) and `organisationSize` (optional, validated); both included in outbound email body; subject line prefixed with `[enquiryType]`.
- **SEO / marketing shell:** [`app/(public)/contact/page.tsx`](app/(public)/contact/page.tsx) metadata and [`[...slug]/page.tsx`](app/(public)/[...slug]/page.tsx) `/contact` hero highlights aligned with new messaging.
- **Analytics:** `trackEvent("demo_booked", …)` unchanged; added optional `enquiry_type` in metadata.

## Localisation

- **All 12 locales** updated under `contact.*` with the new structure (`help`, `enterpriseCard`, `form.enquiryType`, `form.organisationSize`, `form.reassurance`, etc.). Legacy keys `contact.info.*` removed from locale files (no remaining code references).

## Manual review

- **Resend / inbox:** Confirm sales workflow is happy with subject prefix `[demo]`, etc.
- **Long strings:** Spot-check **DE/FR** on narrow viewports — reassurance row uses `flex-wrap` and `min-w-0` to reduce overflow risk.
- **API error strings** (e.g. missing enquiry type) are English-only from the server; optional follow-up to map to locale if needed.
