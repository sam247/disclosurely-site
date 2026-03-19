# /vs-speakup refresh — summary

## Claims removed or softened

- Removed hero badge and all **$708 / 60% savings** framing, stat cards implying SpeakUp lacks transparency, and “winner” row styling.
- Dropped **annual savings**, **cross-currency price duels**, **ISO / zero-knowledge / session management** comparisons, and blanket **AI false** flags for SpeakUp.
- Replaced “SpeakUp hides pricing / contact sales” with **both vendors publish list pricing**; buying-path rows use **neutral “confirm on SpeakUp’s site”** wording.
- Migration: removed **zero downtime**, **guaranteed full export**, and **white-glove** hype; added **policy/admin-dependent** disclaimer and realistic steps.
- Final CTA: replaced numerical savings with **flexible alternative** + trial/demo framing.

## Balance tactics

- **Fairness note** under hero (public info; may change).
- **At a glance** cards describe Disclosurely strengths without attacking the competitor.
- Tables use **text-only cells** (no check/X “scoreboard”).
- **“Disclosurely may be a better fit if…”** bullets after tables; **“SpeakUp may suit organisations that…”** section for credibility.
- Competitor column consistently invites **verification on SpeakUp’s site** where detail varies by plan.

## Template readiness (`/vs-*`)

- New shared layout: [`components/comparison/CompetitorComparePage.tsx`](../components/comparison/CompetitorComparePage.tsx) + [`competitorCompareTypes.ts`](../components/comparison/competitorCompareTypes.ts).
- [`app/(public)/vs-speakup/CompareContent.tsx`](../app/(public)/vs-speakup/CompareContent.tsx) is a thin wrapper with `pageKey="speakup"`.
- **Next step for Navex / Whistleblower:** add `compare.navex` / `compare.whistleblower` (or similar) in locale files, pass `pageKey`, and optionally extend `COMPARE_CATEGORY_ORDER` if a page needs extra blocks.

## Localisation

- All strings live under **`compare.common`** and **`compare.speakup`** in [`i18n/locales/*.json`](../i18n/locales/).
- **12 locales** updated: `en`, `de`, `fr`, `es`, `it`, `nl`, `pl`, `pt`, `sv`, `no`, `da`, `el`.
- Layout uses **`break-words`**, **`min-w-0`**, **`text-pretty` / `text-balance`**, **`overflow-x-auto`** on tables, and flexible CTA rows for long translations.

## SEO

- [`app/(public)/vs-speakup/page.tsx`](../app/(public)/vs-speakup/page.tsx) fallbacks and JSON-LD use neutral UK-oriented titles/descriptions.
- [`app/(public)/[...slug]/page.tsx`](../app/(public)/[...slug]/page.tsx) `/vs-speakup` hero copy aligned with the new positioning.

## Verification note

- `npm run build` was not executed in this environment (missing local `node_modules`). Run `npm install && npm run build` locally before deploy.
