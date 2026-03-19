# Blog: Whistleblowing software comparison 2026 — implementation summary

## What changed

### Content (Contentful)

- **Source of truth:** Rich text and SEO fields for slug `whistleblowing-software-comparison-2026` are defined in [`scripts/contentful/update-whistleblowing-comparison-2026.mjs`](../scripts/contentful/update-whistleblowing-comparison-2026.mjs).
- **Publish:** With `CONTENTFUL_MANAGEMENT_TOKEN` set, run:
  - `npm run contentful:update:whistleblowing-comparison-2026`
- **Slug:** Unchanged (`whistleblowing-software-comparison-2026`).
- **Structure:** Intro (intent + evaluation framing), “How to evaluate whistleblowing software” (seven buyer factors), balanced vendor overview (Disclosurely, NAVEX, SpeakUp, Whistleblower Software, suite vendors), comparison bridge + bullet links, “Helpful next steps” CTAs, “Which type of platform is right for you?” (four archetypes), expanded FAQ, measured conclusion.
- **Title / SEO:** Updated title, excerpt, `seoTitle`, `seoDescription`, tags, reading time (~14 min), status `published`.

### App / i18n / routing

- **Blog chrome:** New `blog.*` keys in all locale files under `i18n/locales/` (UK-focused English source; translated strings for `es`, `fr`, `de`, `it`, `nl`, `pl`, `pt`, `sv`, `no`, `da`, `el`).
- **Server:** [`lib/blog-chrome.ts`](../lib/blog-chrome.ts) + `headers().get('x-lang')` for blog index metadata and post page labels; [`app/(public)/blog/page.tsx`](../app/(public)/blog/page.tsx), [`app/(public)/blog/[slug]/page.tsx`](../app/(public)/blog/[slug]/page.tsx).
- **Client:** [`app/(public)/blog/BlogClient.tsx`](../app/(public)/blog/BlogClient.tsx) uses `useTranslation` + `useLanguageFromUrl` for index UI; dates use `en-GB` for English and locale-aware `Intl` elsewhere.
- **Contentful locale:** [`lib/contentful-locale.ts`](../lib/contentful-locale.ts) maps non-English `x-lang` values to Contentful locale codes; English omits `locale` so the Delivery API uses the **space default** (avoids `en-US` vs `en-GB` mismatches). [`fetchBlogPosts` / `fetchBlogPost` / `fetchRelatedBlogPosts`](../lib/contentful.ts) only send `locale` when defined. Align map keys with **Settings → Locales** in Contentful (e.g. `fr` vs `fr-FR`).
- **Internal links in rich text:** [`components/blog/BlogPostBody.tsx`](../components/blog/BlogPostBody.tsx) renders same-site URLs with `next/link` and [`withLangPathPrefix`](../lib/resolve-blog-href.ts); external links stay `target="_blank"`.
- **Hygiene:** Removed debug ingest `fetch` calls from [`lib/contentful.ts`](../lib/contentful.ts) (blog post page debug blocks removed earlier in this work).
- **Layout / long copy:** `break-words` on article prose; `flex-wrap` / `min-h` on related cards and CTAs to reduce clipping on narrow viewports.

## Claims softened or removed (vs typical listicle risk)

- No “best platform” or market-leadership language; Disclosurely framed as **one option to shortlist** with explicit “starting point for due diligence” wording.
- No competitor pricing figures or unverifiable security absolutes.
- Compliance: emphasis on **mapping to your context** and **legal advice / authority guidance** (especially FAQ on 50+ employees / Directive).
- Vendor blurbs are **high-level and balanced**; detailed claims deferred to dedicated `/vs-*` pages.

## Internal links / CTAs added (in article body)

Rich text includes links to:

| Path | Role |
|------|------|
| `/vs-speakup` | SpeakUp comparison |
| `/vs-navex` | NAVEX comparison |
| `/vs-whistleblower-software` | Whistleblower Software comparison |
| `/pricing` | Commercial |
| `/security` | Security overview |
| `/whistleblowing-directive` | Directive context |
| `/contact` | Demo / questions |

Editorial pattern: relative paths in Contentful; the blog renderer adds `/{lang}` when the visitor uses a prefixed URL.

## Localisation status

| Area | Status |
|------|--------|
| Blog index + post chrome (nav, dates, related cards, back link) | **Complete** — all 12 locale JSON files include `blog.*` |
| Article body (title, rich text, SEO fields) | **English (default Contentful locale)** via publish script; other Contentful locales only after you add translations in the CMS (Delivery API uses `locale` + space fallback) |
| Layout QA (DE/FR long strings) | **Addressed in code** (`break-words`, wrapping); recommend a quick visual pass on `/de/blog/...` and `/fr/blog/...` after publishing |

## Dependencies / ops

- **devDependency:** `contentful-management` (for the update script only).
- **Env:** `CONTENTFUL_MANAGEMENT_TOKEN` required to run the script; optional `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT_ID`.

## Verification checklist

- [ ] Run publish script against production Contentful (or paste equivalent content in the entry) so the live post matches the repo script.
- [ ] Open `/blog/whistleblowing-software-comparison-2026` and `/fr/blog/whistleblowing-software-comparison-2026`: chrome translated, internal links keep locale prefix.
- [ ] Confirm Article JSON-LD and analytics still fire (no intentional changes beyond URL/canonical behaviour via existing `generatePageMetadata`).
