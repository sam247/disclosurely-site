# /about page — mission-led refresh summary

## What changed

- **[`AboutContent.tsx`](app/(public)/about/AboutContent.tsx)** rebuilt: all copy via `t("about.*")`, [`useLangPrefix`](hooks/useLangPrefix.ts) for localized links (`/pricing`, `/contact`, `/security`, explore cards).
- **Removed:** success-by-numbers (`500+`, `99.9%`, `50+`, 24/7 tiles), three generic “values” cards, mock dashboard section, Unsplash team grid, testimonial strip (and misleading “reviews” → pricing link), bottom CTA stats grid, hype-heavy security claims (zero-knowledge, military-grade, etc.).
- **New sections:** grounded hero + optional [`/abouthero.jpeg`](public/abouthero.jpeg); **Why we exist** (three paragraphs); **What we believe** (six bullets); **Who we build for** (five bullets); **How we approach trust** (intro + five bullets aligned with [`securityPage`](i18n/locales/en.json) themes + link to `/security`); **Closing CTA** (View pricing, Book a demo → contact); **Explore further** (neutral copy, three links).

## Claims / stats reduced

- No customer counts, uptime percentages, country counts, or support-hour claims on this page.
- Security language matches defensible product positioning (encryption, access control, GDPR-conscious design, audit logging, cloud/backups) — detailed commitments remain on `/security`.

## i18n

- **English:** full tree under [`about`](i18n/locales/en.json).
- **de, fr, es, it, nl, pl, pt, sv, no, da, el:** merged from [`i18n/patches/about.<lang>.json`](i18n/patches/) via [`scripts/patch-about-locales.mjs`](scripts/patch-about-locales.mjs) (re-run after editing a patch file).
- Legacy keys (`about.values`, `about.team`, `about.story`, `about.mission.content`, `hero.subtitle`) **removed**; nothing else referenced them.

## SEO / shell

- [`app/(public)/about/page.tsx`](app/(public)/about/page.tsx): metadata + Organization JSON-LD description updated.
- [`app/(public)/[...slug]/page.tsx`](app/(public)/[...slug]/page.tsx): `/about` hero title, subtitle, highlights refreshed.

## Layout / long strings

- Hero and body use `text-balance` / `text-pretty` and `max-w-*` where helpful; CTA buttons stack on small viewports (`flex-col` → `sm:flex-row`).

## Manual review

- Optional copy polish: German hero title (“Hinweisgeben”) vs preferred phrasing (“Meldewesen” / “Hinweisgeber-Meldungen”).
- Legal/compliance: ensure “GDPR-aligned” / directive wording matches counsel-approved site-wide phrasing.
