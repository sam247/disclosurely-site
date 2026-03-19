# Security page de-risk – implementation summary

## Claims softened or removed

| Area | Before | After |
|------|--------|--------|
| Hero | Military-grade, zero-knowledge, industry-leading | Strong encryption, controlled access, secure backups, privacy-conscious case handling |
| Summary cards | Zero-knowledge, banks/governments, HIPAA/SOX blanket | Access-controlled case management; GDPR-conscious design |
| Feature grid | Military-grade, 99.99% SLA, quarterly DR, immutable audit chain | Defensible AES-256-GCM, reputable cloud, periodic DR testing, audit logs designed to detect changes |
| Certifications | HIPAA “Compliant”; implied achievement | HIPAA removed; EU Directive 2019/1937 + GDPR as “In place”; ISO 27001 & SOC 2 as “In progress” only |
| Infrastructure | 99.99% uptime, world-class, invented metrics (A+, &lt;200ms) | Reputable cloud, monitoring, failover; **Operational safeguards** list (no scores) |
| Responsible disclosure | 24h acknowledgment, “highest standards” | Prompt acknowledgment aim; modest language |
| CTA | Military-grade / zero-knowledge | Strong encryption and controlled access; “Book a Demo” second button |
| Metadata / catch-all `pages['/security']` | Bank-grade, ISO in highlights | AES-256-GCM, RBAC, GDPR-conscious design |

## How the page is more defensible

- **No invented KPIs** (uptime %, security grade, response time bars).
- **No strict zero-knowledge or military-grade claims**; wording matches access control and encryption that are easier to substantiate.
- **Certification section** renamed to **Security commitments** with honest status labels (in place vs in progress).
- **Data protection** bullets use conditional language (“where configured”, “can be”, “aim to”) where absolute claims were risky.
- **UK English** in source copy (authorised, organisation, minimisation in spirit via “minimise”).

## i18n

- All page strings live under **`securityPage`** in `i18n/locales/*.json` (avoids clash with root `"security": "Security"` for account UI).
- **Translated:** `de`, `fr`, `es`, `nl`, `it`, `pl`, `da`, `no`, `sv`, `pt`, `el` (plus `en`).
- **QA:** Spot-check DE/FR (and long locales) on `/security` and `/de/security` etc. for card height, badge wrapping, and mobile overflow.

## Still needs manual verification (legal / product)

- Exact MFA enforcement policy for all admin accounts vs “available / can be enforced”.
- Whether **EU Directive** and **GDPR** “in place” badges match your legal/compliance sign-off.
- **HSM / key management** wording (now “cloud provider key management practices”) vs actual architecture.
- **Session timeout** and **retention/deletion** timelines vs product settings and DPA.
- **Penetration test frequency** (“periodic”) vs actual schedule.
- **security@disclosurely.com** inbox is monitored and matches disclosure process.

## Out of scope (follow-up)

- Other routes still use strong claims: About, Features, Landing, comparison pages, `pricing.security` / `features.security` in i18n. Align in a separate pass if desired.
