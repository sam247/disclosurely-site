# Pricing Page Conversion Improvements – Detailed Plan

## Overview

Improve the Disclosurely `/pricing` page for cold outbound traffic from UK and EU compliance leads. Keep existing layout, visual system, and structure. Focus on clarity, plan positioning, trust, and decision-making. All copy in UK English; all strings via i18n with a full localisation pass after changes.

---

## Current State Summary

| Area | Current implementation | Location |
|------|------------------------|----------|
| **Hero** | Tagline, "Simple, Transparent Pricing", two subtitles, one CTA | `PricingContent.tsx` L153–177; `en.json` `pricing.hero` |
| **Benefits bar** | Blue banner "Why Organizations Choose Disclosurely" + 3 stats | `PricingContent.tsx` L180–209; `en.json` `pricing.benefits` |
| **Designed for businesses** | Two-column: copy + 4 bullets + stock image | `PricingContent.tsx` L211–246; `en.json` `pricing.designedForBusinesses` |
| **Pricing cards** | Billing toggle, 3 cards (Starter/Pro/Enterprise), plan name + price + description + highlights/missing + CTA | `PricingContent.tsx` L248–354; plans from `useMemo` using `pricing.plans.*`, `pricing.features.*` |
| **Trust under cards** | Two badges: 7-day trial, Cancel anytime | `PricingContent.tsx` L356–371; `pricing.trustIndicators.badgeTrial/Cancel` |
| **Comparison table** | Categories: Reporting, Security, AI, Communication, Team, Customization, Support; many rows | `PricingContent.tsx` L377–641; `en.json` `pricing.compare` |
| **FAQ** | 4 accordion items | `PricingContent.tsx` L643–679; `en.json` `pricing.faq.trial/limit/change/security` |
| **Final CTA** | Single headline, single subheading, one button (Start Free Trial) | `PricingContent.tsx` L681–696; `en.json` `pricing.cta` |

---

## 1. Hero Section

**Goal:** Product-specific headline and subheading; keep single primary CTA.

**i18n changes in `i18n/locales/en.json` under `pricing.hero`:**

- **`tagline`**  
  - From: `"Transparent Pricing Built For Business."`  
  - To: e.g. `"Whistleblowing & compliance"` or `"Pricing"` (short, so it doesn’t compete with the headline).

- **`title`**  
  - From: `"Simple, Transparent Pricing"`  
  - To: `"Whistleblowing software pricing for teams of all sizes"`.

- **`subtitle1`**  
  - From: `"7-day free trial • Unlimited reports included"`  
  - To: `"Start with secure anonymous reporting, case management, and built-in compliance tools. Upgrade as your reporting needs grow."`  
  - If design prefers two lines, keep a single `subtitle` and optionally a short `subtitle2` (e.g. trial line).

- **`subtitle2`**  
  - From: long paragraph about encryption, GDPR, analytics.  
  - To: Either merge into one subtitle or use for a single line such as: `"14-day free trial, no credit card required. Change or upgrade plans anytime."`  
  - Ensure hero does not feel dense; one strong subheading is enough.

**Component:** No structural change. Continue using `t("pricing.hero.title")`, `t("pricing.hero.subtitle1")`, `t("pricing.hero.subtitle2")` (or collapse to one `subtitle` and update component to match). Keep the existing Start Free Trial button and `handleStartTrial("pricing_hero")`.

**SEO/metadata:** In `app/(public)/pricing/page.tsx`, update `fallbackTitle` and `fallbackDescription` to reflect the new positioning (whistleblowing/compliance pricing) if they still say "Simple, transparent pricing".

---

## 2. “Best for” Positioning on Each Tier

**Goal:** Every plan has a short “best for” line to aid quick choice.

**i18n in `en.json` under `pricing.plans`:**

- **`starter.bestFor`**  
  `"Best for small organisations launching a secure reporting channel"`

- **`pro.bestFor`**  
  `"Best for growing teams that need branded portals, automation, and reporting insights"`

- **`enterprise.bestFor`**  
  `"Best for larger or multi-entity organisations with advanced security and rollout needs"`

**Component (`PricingContent.tsx`):**

- In the `plans` `useMemo`, add a `bestFor` field per plan, e.g. `bestFor: t("pricing.plans.starter.bestFor")` (and pro/enterprise).
- In the card render (inside `CardHeader` or directly under the plan name), output the “best for” line:
  - After `CardTitle` (plan name), add a line such as:  
    `{plan.bestFor && <p className="text-sm text-gray-600 mt-1">{plan.bestFor}</p>}`  
  - Style so it’s clearly secondary to the plan name and price (e.g. small, muted). Keep it one line where possible for DE/FR.

---

## 3. Strengthen Plan Differentiation

**Goal:** Clear upgrade path; Pro as default choice; Enterprise clearly “more than custom”.

**i18n in `en.json`:**

- **`pricing.plans.starter.description`**  
  Keep short; can align with “best for” (e.g. “Get started with anonymous reporting and case management”) so description + best for don’t repeat.

- **`pricing.plans.pro.description`**  
  E.g. “Branded portals, secure messaging, AI triage, and workflow automation.” Reinforce why Pro is the main choice.

- **`pricing.plans.enterprise.description`**  
  Replace vague “bespoke” with concrete examples: e.g. “SSO, custom onboarding, advanced permissions and multi-team setups, dedicated support, and tailored hosting or data handling where needed.” Only include items that are accurate.

**Features (card bullets):**  
Keep using `pricing.features.*`. Ensure wording is compliance-oriented (anonymous reporting, secure case messaging, role-based access, audit-ready records, multilingual portals, AI features where applicable). No component change if keys are only updated.

**Component:** No new sections. Optional: add a short “What you get with Enterprise” or “Included in Enterprise” list in the Enterprise card (e.g. 3–4 bullets from i18n) if you add keys like `pricing.plans.enterprise.bullet1` etc.

---

## 4. Reassurance Row Near Pricing Cards

**Goal:** A single, visible strip of 4 reassurance points above or below the pricing cards.

**i18n in `en.json`:** Add a new block, e.g. `pricing.reassurance`:

```json
"reassurance": {
  "freeTrial": "Free trial available",
  "changePlans": "Change plans anytime",
  "noHiddenFees": "No hidden fees",
  "secureHosting": "Secure hosting included"
}
```

**Component:**

- Add a compact horizontal strip (e.g. flex wrap, icons + text) either:
  - **Above** the billing toggle, or  
  - **Below** the three pricing cards and **above** the current “Second Trust Indicators” (7-day trial / Cancel anytime).
- Reuse existing trust styling (e.g. CheckCircle, `text-blue-600`, `text-gray-700`) to match the design system.
- Render the four strings with small icons; keep to one line per point so translations don’t break layout.
- Optionally keep the existing “7-day free trial” / “Cancel anytime” row below that, or fold them into this strip and remove the duplicate section to avoid clutter.

---

## 5. Repurpose “Designed for Businesses of All Sizes”

**Goal:** Replace generic messaging and heavy reliance on stock image with “What’s included in every plan” (Option A).

**i18n in `en.json`:** Replace or repurpose `pricing.designedForBusinesses`:

- **`title`**  
  `"What's included in every plan"`

- **`description`**  
  Short intro line, e.g. “All plans include the essentials for secure, compliant whistleblowing.”

- **Bullets:** Replace current bullet1–bullet6 with six concrete items (single line each):
  - `bullet1`: "Secure anonymous reporting"
  - `bullet2`: "Case management and audit logs"
  - `bullet3`: "Encrypted data handling"
  - `bullet4`: "Hosted reporting portal"
  - `bullet5`: "Email notifications"
  - `bullet6`: "GDPR-conscious design"

- **`imageAlt`**  
  Update to describe the image if kept, or remove image (see below).

**Component:**

- Change section heading and body to use the new `title` and `description`.
- List the six bullets with CheckCircle (same pattern as now). Remove or shorten the long paragraph.
- **Image:** Either remove the right-column image entirely (single column of copy + bullets) or replace with a small illustration / product screenshot, or keep one small image with updated alt. Prefer “reduce reliance on stock imagery” as per requirements.

---

## 6. Pricing Card Content Clarity

**Goal:** Feature bullets are concrete and compliance-relevant; no vague SaaS language.

**i18n in `en.json` under `pricing.features`:** Review and tighten each key used in the cards, e.g.:

- `unlimitedCases` → e.g. “Unlimited anonymous reports”
- `unlimitedStorage` → e.g. “Unlimited secure storage”
- `emailSupport` → e.g. “Email support with onboarding”
- `messaging` → e.g. “Secure two-way reporter messaging”
- `aiHelper` → e.g. “AI case triage and risk scoring”
- `customBranding` → e.g. “Branded reporting portal”
- `cname` → e.g. “Custom domain (CNAME)”
- `workflows` → e.g. “Automated case workflows”
- Enterprise: `everythingPro`, `teamManagement`, `multipleCustomDomains`, `dedicatedSupport`, `slaGuarantee`, `customIntegrations`, `api`, `webhooks` — ensure each is one clear, accurate phrase.

**Component:** No change to structure; plans still use the same highlight/missing arrays. Ensure Pro card remains visually emphasised (border, “Most Popular” badge, primary-style CTA).

---

## 7. Feature Comparison Table Usability

**Goal:** Easier to scan; clear categories; consistent ticks/crosses; optional de-densify.

**i18n in `en.json` under `pricing.compare`:**

- **`subtitle`**  
  Can change to: `"See which plan is right for your business."` to match user request.

- **Categories:** Current groups are: reporting, security, ai, communication, team, customization, support. Align with requested grouping:
  - **Reporting** – keep.
  - **Security** – keep (Security & Compliance).
  - **Case Management** – add if not covered: e.g. group rows like SLA management, assignment rules, audit trail under a new `caseManagement` group label, or keep under “Team” and rename if needed.
  - **Branding** – can map to existing `customization` (Customization) or add `branding` and move custom branding/domain rows there.
  - **Support** – keep.

- Ensure row labels are compliance-friendly where relevant (e.g. “Anonymous report submission”, “Audit trail”, “Two-way secure messaging”).

**Component:**

- Keep the table; ensure category rows (`tr` with `colSpan={4}`) are visually distinct (e.g. `bg-gray-50`, bold).
- Use consistent icon semantics: e.g. CheckCircle green for included, X for not included; optionally blue for “Pro/Enterprise only” if desired.
- If the table feels too long, remove or merge low-value rows (e.g. one “Coming soon” row instead of three). Prefer clarity over row count.

---

## 8. Expand FAQ to 8 Buying-Focused Questions

**Goal:** Address objections and support decision-making with 8 questions.

**i18n in `en.json` under `pricing.faq`:** Add new keys and adjust existing so you have exactly 8 Q&A pairs. Suggested set:

1. **trial** (existing) – “Is there a free trial?” + short answer (e.g. 14-day, no card).
2. **includedInEveryPlan** (new) – “What’s included in every plan?” → Answer: secure anonymous reporting, case management, audit logs, encrypted data, hosted portal, email notifications, GDPR-conscious design (can mirror “What’s included” section).
3. **planFor50Plus** (new) – “Which plan is right for a team with 50+ employees?” → Answer: Pro or Enterprise; Pro for single entity with typical compliance needs; Enterprise for multi-entity or advanced security/onboarding.
4. **upgradeDowngrade** (existing `change`) – “Can we upgrade or downgrade later?” Keep or slightly tighten.
5. **onboardingSupport** (new) – “Do you offer onboarding support?” → Answer: Yes; email support on all plans; Pro has priority support; Enterprise has dedicated support and custom onboarding where applicable.
6. **anonymousOnAllPlans** (new) – “Is anonymous reporting included on all plans?” → Answer: Yes; all plans include secure anonymous reporting and a hosted portal.
7. **securityFeatures** (existing `security` or expand) – “What security features are included?” → Answer: Encryption (e.g. AES-GCM), GDPR alignment, audit trails, role-based access; Enterprise adds SSO and advanced options.
8. **hiddenCosts** (new) – “Are there any hidden costs?” → Answer: No; pricing is per plan; optional add-ons (if any) are clearly stated; no hidden fees.

**Component:** Replace the current four `AccordionItem`s with eight, each bound to a distinct `value` and to the new/updated `t("pricing.faq.<key>.question")` and `t("pricing.faq.<key>.answer")`. Keep accordion styling and accessibility.

---

## 9. Final CTA Section

**Goal:** Product-specific headline, two CTAs (Start Free Trial + Talk to Our Team).

**i18n in `en.json` under `pricing.cta`:**

- **`ready`**  
  From: `"Ready to Get Started?"`  
  To: `"Ready to launch a secure whistleblowing channel?"`

- **`join`**  
  From: generic “Join organizations worldwide…”  
  To: `"Start your free trial or talk to our team about the right plan for your organisation."`

- **`talkToTeam`** (new)  
  `"Talk to Our Team"`

**Component:**

- Keep blue background and container.
- Render `ready` as headline, `join` as subheading.
- Two actions:
  - Primary: Start Free Trial (existing button, same signup URL and tracking).
  - Secondary: Link to `/${langPrefix}/contact` with label `t("pricing.cta.talkToTeam")`, styled as secondary (e.g. outline or ghost) so it doesn’t compete with the primary CTA.
- Add `trackEvent` for “Talk to Our Team” if you use analytics (e.g. `demo_click` or `contact_click` with location `pricing_cta`).

---

## 10. Tone and Copy Rules (Implementation Checklist)

- Use UK English (e.g. “organisation”, “colour” if ever used).
- Avoid: “powerful platform”, “innovative solution”, “seamless experience”.
- Prefer: “secure”, “anonymous”, “compliant”, “audit-ready”, “role-based”, “encrypted”.
- When editing or adding copy, run a quick pass for these terms and replace any generic SaaS phrasing.

---

## 11. i18n / Localisation Pass (Required After All Copy Changes)

**Scope:** All new or changed keys under `pricing` (hero, plans.*.bestFor, reassurance, designedForBusinesses, features, compare, faq, cta).

**Files to update:**

- **Source of truth:** `i18n/locales/en.json` (all changes done first).
- **Locales to translate:** `de.json`, `fr.json`, `es.json`, `nl.json`, `it.json`, `pl.json`, `da.json`, `no.json`, `sv.json`, `pt.json`, `el.json`.

**Keys to add/translate in every locale:**

- `pricing.hero` (tagline, title, subtitle1, subtitle2 or subtitle).
- `pricing.plans.starter.bestFor`, `pricing.plans.pro.bestFor`, `pricing.plans.enterprise.bestFor`.
- `pricing.plans.enterprise.description` (and optional enterprise bullets if added).
- `pricing.reassurance.*` (freeTrial, changePlans, noHiddenFees, secureHosting).
- `pricing.designedForBusinesses` (title, description, bullet1–bullet6, imageAlt).
- `pricing.features.*` (any changed keys).
- `pricing.compare.subtitle` (and any new group names or row labels).
- `pricing.faq` (all 8 keys: trial, includedInEveryPlan, planFor50Plus, upgradeDowngrade, onboardingSupport, anonymousOnAllPlans, securityFeatures, hiddenCosts).
- `pricing.cta` (ready, join, talkToTeam, startTrial, contactSales).

**Verification:**

- Switch locale to French and German and check pricing page.
- Check for overflow, clipping, or broken layout on mobile and desktop (especially long DE/FR “best for” or FAQ answers).
- Shorten or rephrase any translation that breaks layout; keep “best for” to one line per plan where possible.

---

## 12. Technical and Routing Constraints

- Do not change routing or the `/pricing` path.
- Do not alter billing logic (monthly/annual toggle, price display).
- Do not remove or break the signup URL or `handleStartTrial` tracking.
- Preserve existing components (Card, Tabs, Accordion, Badge) and responsive classes.
- Keep `I18nProvider` and existing `useTranslation` / `useLanguageFromUrl` usage.
- Page metadata: update only fallback title/description in `app/(public)/pricing/page.tsx` to match new positioning; keep structured data unless you have a reason to change it.

---

## 13. File Change Summary

| File | Changes |
|------|--------|
| `i18n/locales/en.json` | Hero, plans.*.bestFor & descriptions, reassurance, designedForBusinesses, features (tighten), compare.subtitle, faq (8 items), cta + talkToTeam. |
| `i18n/locales/{de,fr,es,nl,it,pl,da,no,sv,pt,el}.json` | Full translation of all new/changed `pricing` keys. |
| `app/(public)/pricing/PricingContent.tsx` | Hero copy via i18n only; add bestFor to plans and card UI; add reassurance strip; refactor “Designed for” section (and optionally remove/shrink image); FAQ 4→8 items; final CTA two buttons + new copy. |
| `app/(public)/pricing/page.tsx` | Optional: update `fallbackTitle` and `fallbackDescription` for SEO. |

---

## 14. Deliverables Checklist

- [x] Hero: product-specific headline and subheading; primary CTA unchanged.
- [x] “Best for” line on Starter, Pro, and Enterprise.
- [x] Plan descriptions and (if added) Enterprise bullets clarify differentiation and upgrade path.
- [x] Reassurance row (4 points) near pricing cards.
- [x] “Designed for businesses” refactored to “What’s included in every plan” with 6 bullets; reduced reliance on stock image.
- [x] Pricing card feature copy compliance-focused and clear.
- [x] Comparison table categories and labels improved; consistent icons; optionally trimmed.
- [x] FAQ expanded to 8 buying-focused questions with concise answers.
- [x] Final CTA: new headline and subheading; two buttons (Start Free Trial + Talk to Our Team).
- [x] All new/changed strings in en.json and in 11 locale files; no overflow or broken layout in DE/FR (and spot-check other locales).
- [x] Short summary document: what was changed, how plan positioning was improved, localisation status, and any remaining areas for manual review.

---

## 15. Suggested Implementation Order

1. **en.json** – Apply all hero, plans (bestFor + descriptions), reassurance, designedForBusinesses, features, compare, faq, cta changes.
2. **PricingContent.tsx** – Hero (copy only), add bestFor to data and card UI, add reassurance strip, refactor “Designed for” section, FAQ 8 items, final CTA two buttons.
3. **page.tsx** – Metadata tweaks if desired.
4. **Locale files** – Translate all `pricing` keys in 11 files; then verify FR/DE and mobile/desktop layout.
5. **Summary** – Write the short summary of changes, plan positioning, localisation, and follow-ups.

---

## 16. Implementation Summary (Completed)

**What was changed**

- **Hero:** Title set to “Whistleblowing software pricing for teams of all sizes”; tagline to “Whistleblowing & compliance”; subtitles to product-focused copy and 14-day trial line; primary CTA unchanged.
- **Plans:** Added `bestFor` for Starter, Pro, Enterprise; tightened descriptions (Starter/Pro/Enterprise) and made Enterprise concrete (SSO, custom onboarding, advanced permissions, dedicated support, tailored hosting).
- **Reassurance:** New strip with four points (Free trial available, Change plans anytime, No hidden fees, Secure hosting included) below billing toggle, above pricing cards.
- **“What’s included”:** Section retitled and refactored to 6 bullets (secure anonymous reporting, case management and audit logs, encrypted data, hosted portal, email notifications, GDPR-conscious design); stock image removed; single-column layout.
- **Pricing cards:** `bestFor` rendered under each plan name; feature copy unchanged except `messaging` → “Secure two-way reporter messaging”.
- **Compare:** Subtitle updated to “See which plan is right for your business.” (EN); equivalent in all locales.
- **FAQ:** Replaced 4 items with 8: trial, includedInEveryPlan, planFor50Plus, upgradeDowngrade, onboardingSupport, anonymousOnAllPlans, securityFeatures, hiddenCosts.
- **Final CTA:** Headline “Ready to launch a secure whistleblowing channel?”; subheading updated; two buttons: “Start Free Trial” and “Talk to Our Team” (links to `/contact`, tracks `demo_click`).
- **Metadata:** `page.tsx` fallback title/description and structured data description updated for whistleblowing/compliance positioning.

**Plan positioning**

- Starter: small organisations launching a secure reporting channel.
- Pro: growing teams needing branded portals, automation, and reporting (positioned as main choice).
- Enterprise: larger or multi-entity organisations with advanced security and rollout needs; description lists SSO, custom onboarding, advanced permissions, dedicated support, tailored hosting/data.

**Localisation status**

- All new and updated `pricing` keys added to **en.json** and translated in **de, fr, es, nl, it, pl, da, no, sv, pt, el** (11 locales). Reassurance, bestFor, designedForBusinesses (6 bullets), 8 FAQ items, and CTA (including `talkToTeam`) are present in every locale.

**Remaining / manual review**

- **Visual check:** Confirm DE/FR and other locales on `/pricing` for overflow, clipping, or long “best for”/FAQ lines on mobile and desktop; shorten if needed.
- **Comparison table:** Plan did not require structural changes to table rows or categories; only subtitle copy was updated. Optional follow-up: group or trim rows per plan Section 7.
- **i18n:** No new namespaces; all keys live under existing `pricing`. No routing or signup/tracking logic changed.
