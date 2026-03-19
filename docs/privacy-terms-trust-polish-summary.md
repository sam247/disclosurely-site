# Privacy and Terms trust polish — summary

**Scope:** Accuracy/trust alignment with `/security`, single source of truth in i18n, softer unsubstantiated claims, UK English in `en.json`, component refactor to `t()`, locale sync, metadata fallbacks.

## Content changes (canonical English — `i18n/locales/en.json`)

### Privacy

- **Introduction §2:** Wording shifted from blanket “We comply with…” to processing “in line with applicable requirements” under GDPR, UK GDPR, Directive 2019/1937, and other applicable law.
- **Data hosting (§6):** Supabase EEA (Ireland / Frankfurt where used); TLS 1.3 (or equivalent); **AES-256-GCM** (or equivalent) at rest; residency, transfers (GDPR Chapter V), and subprocessors aligned with security-page caution (no over-claim on ISO at our layer).
- **Security (§9):** Encryption bullet uses **AES-256-GCM**; physical security bullet describes **hosting provider** facilities (no statement that data centres are ISO 27001–certified as a fact about Disclosurely); closing paragraph avoids “industry-leading”.
- **Hero / meta:** Aligned with neutral, accurate descriptions (see `privacy.meta`).

### Terms

- **Service description:** Helps organisations manage reports; legal obligations framed as **sector/jurisdiction-dependent** (not blanket “in compliance”).
- **Availability:** **No 99.5% SLA**; commercially reasonable efforts, no guarantee of uninterrupted access (aligned with security page).
- **Subscription / payment:** Trial length references **pricing page (14-day trial where offered)** and signup terms; enterprise/custom **separate agreements** (`subscriptionPayment.content6`). Homepage pricing strip and FAQ trial copy aligned to **14 days** to match `pricing.hero.subtitle2`.
- **Regulatory compliance (§14):** **No** promise to “maintain security certifications”; obligations tied to **TOMs, DPA, subprocessors**, and notice of material changes to protection/subprocessors.

### Privacy (further)

- **§17 EU Directive:** Opening line softened from “designed to comply” to **support common requirements**; “Key measures” instead of “Key compliance measures”.

### Cookies policy (`CookiesContent.tsx`)

- Copy aligned with **Privacy Policy §14**: essential cookies, preferences, **no ad/marketing trackers**, no sale of personal data, **up to 30 days** for login state where applicable; link to **`/privacy`** via locale prefix; contacts **privacy@** / **support@** (replacing generic team@).

### Metadata fallbacks

- `app/(public)/privacy/page.tsx` and `app/(public)/terms/page.tsx` `generateMetadata` fallbacks match `privacy.meta` / `terms.meta` wording when Contentful SEO is absent.

## Components

- `PrivacyContent.tsx` and `TermsContent.tsx` render legal body from `privacy.*` / `terms.*` only (no hardcoded legal arrays). Wrappers use `break-words` / `min-w-0` where needed for long strings.

## Localisation status

| Locale | Privacy / Terms body |
|--------|----------------------|
| **en** | Canonical UK English; legal review recommended for any binding commitment. |
| **de, da, el, es, it, nl, no, pl, pt, sv** | Legal paragraphs for **data hosting**, **security** (encryption, physical, closing para), **terms compliance §14**, **service description §3**, and related trust strings updated to the **same English** as `en.json` where keys were previously identical English placeholders. |
| **fr** | **Mixed:** Section titles and some blocks remain French; **data hosting**, **data retention** (full English block aligned to `en`), and **introduction §2** updated for softer/accurate framing. Many privacy subsections still mix FR/EN — **needs professional legal translation** for a coherent French legal page. |

**Recommendation:** Treat non-English legal pages as **EN-accurate where synced**; commission **legal translation** for `fr` (and optionally others) rather than partial marketing translation.

## Items for manual / legal review

- **Registered office and contacts:** `London, EC1V 2NX`, `privacy@`, `dpo@`, `support@`, `legal@` — confirm live and correct.
- **Effective date** (`November 2025`) — confirm intended publication date.
- **Retention / termination** numbers (e.g. 30 days post-termination, subscription + six years) — confirm against DPA and operations.
- **Subprocessors** (Supabase, Stripe, email, etc.) — confirm current list and DPA.
- **Any future SLA or certification** — if you introduce a contractual uptime % or ISO/SOC claims, re-align security, privacy, and terms together.
- **Free trial length** — confirm live signup and Stripe against **14-day** marketing copy; update pricing/terms if the product changes.

## QA performed

- String-level sync across all 12 locale files for the updated keys; removed obsolete phrases (99.5%, ISO 27001 on data centres in privacy security list, “maintain certifications” in terms).
- **Suggested manual check:** `/de/privacy`, `/fr/privacy`, `/fr/terms`, `/de/terms` on mobile/desktop for wrapping (components already favour `break-words`).
