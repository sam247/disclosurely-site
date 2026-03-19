# /vs-navex — implementation summary

## What was built

- Comparison page at [`app/(public)/vs-navex/`](app/(public)/vs-navex/) using [`CompetitorComparePage`](components/comparison/CompetitorComparePage.tsx) with `pageKey="navex"` and `heroShowPricingAndDemo` (Start free trial, View pricing, Book a demo).
- i18n tree: [`compare.navex.*`](i18n/locales/en.json) — hero, fairness note, **quick dual summary**, five table groups (buying/procurement → reporting → case handling → security → rollout), why cards, NAVEX-fit bullets, migration, final CTA).
- Neutral SEO + JSON-LD in [`page.tsx`](app/(public)/vs-navex/page.tsx); hero alignment in [`[...slug]/page.tsx`](app/(public)/[...slug]/page.tsx) for `/vs-navex`.

## Shared template (same as other /vs-* pages)

- Quick dual summary when `quickSummary.title` exists; separate `fitBetter` skipped to avoid repetition.
- Optional hero CTAs via `heroShowPricingAndDemo`.
- Table category order: pricing → reporting → case handling → security → rollout ([`COMPARE_CATEGORY_ORDER`](components/comparison/competitorCompareTypes.ts)).

## Claims and positioning

- **Angle:** Buying model, procurement friction, rollout practicality, and **focused whistleblowing product vs broader GRC / enterprise suite** context — not a feature scorecard.
- **Softened / avoided:** Unsupported NAVEX implementation timelines, certification duels, “winner” language, and absolutes about their architecture or pricing.
- **Competitor column:** “Confirm on NAVEX materials / your contract / segment” style wording; no invented facts.

## Localisation

- **Canonical English:** [`i18n/locales/en.json`](i18n/locales/en.json) `compare.navex`.
- **Full translated overrides:** [`i18n/overrides/navex/`](i18n/overrides/navex/) (`de`, `fr`, `es`, `it`, `nl`, `pl`, `pt`, `sv`, `no`, `da`, `el`) — entire `navex` object per language (hero through final CTA, including all table rows).
- **Apply one locale:** `node scripts/apply-navex-override.mjs <lang>`
- **Apply all override files:** `node scripts/apply-all-navex-overrides.mjs`
- **Status:** All 12 locales include `compare.navex` with translated copy for non-`en` languages listed above. `en` remains the source in `en.json` (not overwritten by overrides).

## Copy / QA notes

- German `why.card1.bullet2` uses **programmübergreifend** (correct compound), replacing an earlier typo.
- Portuguese migration step 2 uses **“Ajudamos a mapear…”** for natural formal phrasing.

## Manual verification

- Revisit NAVEX’s **public** positioning on suite scope, trial/sales motion, and trust/security docs periodically; adjust table rows only when you can cite or fairly summarise published material.
- Spot-check long strings (DE, FR, PL, EL) on **mobile** for comparison tables and hero CTAs after design changes.
