# /vs-whistleblower-software — implementation summary

## What was built

- Replaced the legacy hardcoded [`CompareContent.tsx`](app/(public)/vs-whistleblower-software/CompareContent.tsx) with [`CompetitorComparePage`](components/comparison/CompetitorComparePage.tsx) using `pageKey="whistleblower"` and `heroShowPricingAndDemo` (Start free trial, View pricing, Book a demo).
- New i18n tree: [`compare.whistleblower.*`](i18n/locales/en.json) (hero, fairness note, **quick dual summary**, five table groups, why cards, competitor-fit bullets, migration, final CTA).
- Neutral SEO + JSON-LD in [`page.tsx`](app/(public)/vs-whistleblower-software/page.tsx); [`[...slug]/page.tsx`](app/(public)/[...slug]/page.tsx) hero copy aligned.

## Shared template updates

- **Quick dual summary:** If `compare.{pageKey}.quickSummary.title` exists, the layout renders the two-column orientation block instead of the three “at a glance” cards, and **skips** the separate `fitBetter` list to avoid repetition.
- **Hero CTAs:** Optional `heroShowPricingAndDemo` adds Book a demo beside View pricing.
- **Table order:** [`COMPARE_CATEGORY_ORDER`](components/comparison/competitorCompareTypes.ts) is now pricing → reporting → case handling → security → rollout (applies to `/vs-speakup` as well).

## Claims and positioning

- **Removed:** Savings figures (e.g. €276), setup time duels, “winner” scoreboard language, ISO/zero-knowledge style rows, and other weak competitor absolutes from the old page.
- **Core angle:** Employee-band / packaged pricing vs clearer tier-based buying, trial path, flexibility, and automation — without implying the competitor is weak in every row.
- **Tables:** Text-only cells; competitor column uses “confirm on their site / plan” style wording.

## Localisation

- **Source overrides:** [`i18n/overrides/whistleblower/`](i18n/overrides/whistleblower/) (`de.json`, `fr.json` hand-written; `es`–`el` merged via [`scripts/seed-whistleblower-translations.mjs`](scripts/seed-whistleblower-translations.mjs) from English + partial patches).
- **Apply script:** [`scripts/apply-whistleblower-override.mjs`](scripts/apply-whistleblower-override.mjs) merges each override into [`i18n/locales/{lang}.json`](i18n/locales/).
- **Status:** All 12 locales include `compare.whistleblower`. For `es`–`el`, table **row** copy remains English where not covered by the merge patch (section titles + marketing blocks are translated). Consider a follow-up pass to translate every table cell for full parity.

## Manual verification

- Confirm Whistleblower Software’s **published** pricing model and trial/demo story periodically; adjust `compare.whistleblower.tables.pricing` rows if their packaging changes.
- Optional: tighten Portuguese migration copy (“Ajudamo-lo” → preferred formal phrasing).
