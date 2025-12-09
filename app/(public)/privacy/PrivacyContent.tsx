"use client";

import React, { useEffect } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

const personalDataSubsections = [
  {
    title: "a) Customer Account Data (Disclosurely as Controller)",
    items: [
      "Identity and contact information: full name, job title, company name, business email address, business phone number",
      "Account credentials: username, email address, password (encrypted and hashed), multi-factor authentication data",
      "Billing and payment information: billing address, payment method details (processed by Stripe—we do not store full card details), VAT/tax numbers, purchase history, invoices",
      "Organisation information: company registration details, number of employees, industry sector, organisational structure",
      "Communication data: correspondence with our support team, feedback, survey responses",
    ],
  },
  {
    title: "b) Whistleblower and Report Data (Customer as Controller, Disclosurely as Processor)",
    items: [
      "Report content: information voluntarily submitted in a report, which may include personal data about the whistleblower, accused persons, witnesses, or other individuals",
      "Special category data: reports may contain special categories of personal data or data relating to criminal convictions; processing follows GDPR Articles 9 and 10 and the EU Whistleblowing Directive",
      "Contact information (optional): if provided, email address, phone number, or mailing address for follow-up",
      "Technical and metadata: for non-anonymous reports we may collect IP address, browser, device, OS, time zone, plugins, screen resolution, and timestamps; for anonymous reports this is minimised or disabled per Customer settings",
      "Communication data: messages exchanged between whistleblowers and Customers through secure messaging",
      "Uploaded files: documents, images, audio, video, or other files attached to reports",
    ],
  },
  {
    title: "c) Technical and Usage Data",
    items: [
      "Log data: IP addresses, access times, pages viewed, browser type, referring/exit pages, operating system, click-stream data",
      "Security data: login attempts, authentication events, security incidents, access control logs",
      "Performance data: service performance metrics, error logs, crash reports, load times",
      "Cookie data: essential cookies for session management, authentication, and security (see Section 14)",
    ],
  },
  {
    title: "d) Marketing and Communications Data (with consent)",
    items: [
      "Newsletter subscriptions: email address and communication preferences",
      "Event registrations: name, email, company, job title for webinars or events",
      "Website forms: information submitted through contact forms, demo requests, or quote requests",
    ],
  },
];

const usageItems = [
  "Service Provision: operate and maintain the Service; authenticate users; process whistleblower reports; enable secure messaging; deliver case management; perform contractual obligations",
  "Account Management: create and manage accounts; process registrations; verify identity; manage subscriptions and renewals; communicate service updates",
  "Payment Processing: process subscription payments; issue invoices; manage billing; prevent payment fraud; maintain financial records",
  "Customer Support: respond to inquiries; provide technical support; troubleshoot issues; improve service quality",
  "Security and Fraud Prevention: protect the Service and users from security threats; detect and prevent fraud and unauthorised access; investigate incidents; ensure integrity",
  "Legal Compliance: comply with legal obligations including data protection laws, the EU Whistleblowing Directive, financial regulations, court orders, and regulatory requests",
  "Service Improvement: analyse usage (anonymised/aggregated); improve features and functionality; develop new services; optimise user experience",
  "Communications: send transactional emails and Service updates; send marketing communications with consent (opt-out available)",
  "Research and Analytics: conduct anonymised research; generate statistical reports; benchmark performance; analyse compliance trends",
  "Business Operations: manage internal operations; conduct audits; enforce terms; protect legal rights; facilitate business transactions",
];

const legalBases = [
  {
    label: "Contractual Necessity (Article 6(1)(b)) –",
    content:
      "Processing is necessary to perform our contract with you, including providing the Service, managing your account, processing payments, and delivering support.",
  },
  {
    label: "Legitimate Interests (Article 6(1)(f)) –",
    content:
      "Processing is necessary for our legitimate interests or those of a third party, including improving the Service, ensuring security, preventing fraud, conducting anonymised analytics, direct marketing to existing customers (opt-out), enforcing legal rights, and business administration.",
  },
  {
    label: "Legal Obligations (Article 6(1)(c)) –",
    content:
      "Processing is necessary to comply with legal obligations, including the EU Whistleblowing Directive, GDPR requirements, financial and tax regulations, court orders and legal process, regulatory investigations, and record-keeping requirements.",
  },
  {
    label: "Consent (Article 6(1)(a) and Article 9(2)(a)) –",
    content:
      "Explicit consent for marketing communications, optional data collection, processing of special category data (where applicable), and cookies beyond essential cookies. Consent can be withdrawn at any time.",
  },
  {
    label: "Vital Interests (Article 6(1)(d)) –",
    content: "Processing necessary to protect vital interests, such as when a report involves imminent serious harm or threats to life.",
  },
  {
    label: "Public Interest and Legal Claims (Article 9(2)(f) and (g)) –",
    content:
      "For special category data in whistleblower reports, processing may be necessary for the establishment, exercise, or defence of legal claims, or for reasons of substantial public interest.",
  },
  {
    label: "Whistleblowing Legal Framework (Article 9(2)(g) and Directive 2019/1937) –",
    content:
      "Processing personal data in whistleblower reports is explicitly permitted under the EU Whistleblowing Directive for receiving, investigating, and following up on reports concerning breaches of law and serious misconduct.",
  },
];

const disclosureItems = [
  "To Customer Organisations: reports and related data are disclosed to the Customer organisation operating the reporting portal.",
  "Service Providers and Subprocessors: trusted providers under contract (e.g., Supabase for hosting, Stripe for payments, email delivery, cloud storage, support platforms).",
  "Legal and Regulatory Obligations: to comply with court orders, investigations, data protection authorities, the EU Whistleblowing Directive, enforce Terms, or investigate fraud/security incidents.",
  "Protection of Rights and Safety: where necessary to protect rights, property, or safety, prevent fraud, or respond to emergencies.",
  "Business Transfers: in mergers, acquisitions, reorganisations, or bankruptcy, with notice before data becomes subject to a different policy.",
  "Professional Advisors: lawyers, accountants, auditors under confidentiality obligations.",
  "With Your Consent: for purposes not described elsewhere, with explicit consent.",
];

const securityItems = [
  "Encryption: TLS 1.3+ in transit; AES-256 at rest; hashed passwords (bcrypt with salt).",
  "Access Controls: role-based access control; MFA available; unique credentials with audit logging.",
  "Network Security: firewalls, IDS/IPS, regular penetration testing, DDoS protection.",
  "Data Segregation: logical segregation of Customer Data with appropriate access controls.",
  "Security Monitoring: 24/7 automated monitoring, retained logs, tested incident response.",
  "Employee Training and Vetting: background checks, confidentiality agreements, security awareness training, least-privilege access reviews.",
  "Physical Security: ISO 27001-certified data centres with access controls and surveillance.",
  "Backup and Recovery: encrypted daily backups in redundant locations; tested DR/BCP.",
  "Secure Development: secure coding practices, code reviews, dependency scanning, security testing in the SDLC.",
  "Data Breach Response: documented procedures; notify affected individuals and authorities within 72 hours where required.",
];

const rightsItems = [
  "Right of Access (Article 15)",
  "Right to Rectification (Article 16)",
  "Right to Erasure / 'Right to be Forgotten' (Article 17)",
  "Right to Restriction of Processing (Article 18)",
  "Right to Data Portability (Article 20)",
  "Right to Object (Article 21)",
  "Right Not to Be Subject to Automated Decision-Making (Article 22) – not currently used",
  "Right to Withdraw Consent (Article 7(3))",
  "Right to Lodge a Complaint (Article 77) with the relevant supervisory authority (ICO in the UK)",
];

const whistleblowingPoints = [
  "Confidentiality and Anonymity: secure channels and anonymous reporting options with measures to prevent unauthorised access to whistleblower identities.",
  "Data Minimisation: report data processed only as necessary; Customers should limit data collection to what is required.",
  "Security: encryption and security measures protect integrity and confidentiality of reports and communications.",
  "Retention Limits: Customers set retention in line with the Directive and national law; unnecessary data should be deleted once follow-up is complete.",
  "Access Rights: report access restricted to authorised personnel with audit logging.",
  "Data Subject Rights: GDPR rights must be balanced against protecting whistleblowers; Customers are responsible for this balance.",
  "Disclaimer: Customers are responsible for legal compliance; Disclosurely provides the platform, not legal advice.",
];

const contactDetails = [
  "Email: privacy@disclosurely.com (privacy and data protection) or support@disclosurely.com (general support)",
  "Data Protection Officer: dpo@disclosurely.com",
  "Address: Disclosurely Limited, London, EC1V 2NX, United Kingdom",
  "Response Time: We respond to inquiries within 10 business days and resolve requests within one month (or notify of extensions).",
];

function PrivacyContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang as Lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Privacy Policy
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Privacy &amp; Data Protection</h1>
            <p className="text-lg text-gray-600">
              How we collect, process, and protect data across Disclosurely products, aligned to GDPR and security best practices.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-sm text-gray-800 shadow-sm">
              <div className="space-y-2">
                <p>
                  <strong>Effective Date:</strong> November 2025
                </p>
                <p>
                  <strong>Company:</strong> Disclosurely Limited
                </p>
                <p>
                  <strong>Website:</strong> disclosurely.com
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  <a href="mailto:privacy@disclosurely.com" className="text-blue-700 underline">
                    privacy@disclosurely.com
                  </a>
                </p>
                <p>
                  <strong>Registered Office:</strong> London, EC1V 2NX, United Kingdom
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">1. Introduction and Scope</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Disclosurely Limited ("Disclosurely", "we", "us" or "our"), a company registered in England and Wales with registered office at London, EC1V 2NX, United Kingdom, is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, disclose, and protect your personal data when you use our whistleblowing and compliance platform at disclosurely.com (the "Service").
                  </p>
                  <p>
                    We comply with the GDPR, UK GDPR (Data Protection Act 2018), the EU Whistleblowing Directive (2019/1937), and other applicable data protection laws.
                  </p>
                  <p>
                    This Privacy Policy applies to Customers, Authorised Users, Whistleblowers, and website visitors. Different sections may apply to different user types as indicated.
                  </p>
                  <p>
                    By using the Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, do not use the Service.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">2. Data Controller and Data Processor Roles</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    The roles depend on the data and context: for Customer Account Data we act as Data Controller; for whistleblower reports the Customer acts as Controller and we act as Processor under the DPA; for website analytics we are Controller for anonymised usage data.
                  </p>
                  <p>
                    Contact: Customers should contact privacy@disclosurely.com. Whistleblowers should contact the organisation receiving their report.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">3. Personal Data We Collect</h2>
                <p className="mb-3 text-gray-700">
                  Categories collected depend on how you interact with the Service:
                </p>
                <div className="space-y-4 text-gray-700">
                  {personalDataSubsections.map((subsection) => (
                    <div key={subsection.title}>
                      <h3 className="font-semibold text-gray-900">{subsection.title}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {subsection.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">4. How We Use Personal Data</h2>
                <p className="mb-3 text-gray-700">
                  We use personal data for the purposes below (legal bases in Section 5):
                </p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {usageItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">5. Legal Bases for Processing</h2>
                <p className="mb-3 text-gray-700">
                  We process personal data only where we have a lawful basis under GDPR Article 6 (and Article 9 for special category data):
                </p>
                <div className="space-y-2 text-gray-700">
                  {legalBases.map((item) => (
                    <p key={item.label}>
                      <strong>{item.label}</strong> {item.content}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">6. Data Hosting, Storage, and International Transfers</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Data Hosting: Customer Data is hosted on secure Supabase infrastructure in the EEA (Ireland/Frankfurt) with AES-256 at rest and TLS 1.3 in transit.
                  </p>
                  <p>
                    Data Residency: Personal data subject to GDPR remains within the EEA/UK with EU-based backups.
                  </p>
                  <p>
                    International Transfers: Not routine. If needed, we use SCCs, adequacy decisions, or other GDPR-compliant safeguards and notify Customers.
                  </p>
                  <p>
                    Subprocessors: Carefully selected and bound by written agreements; list available on request.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">7. Data Retention Periods</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We retain personal data only as long as necessary for the purposes collected, legal obligations, disputes, and enforcement.
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Customer Account Data: duration of subscription plus six years; financial records retained seven years (UK tax law).</li>
                    <li>Whistleblower Reports and Customer Data: retained per Customer instructions; deleted or returned within 30 days of termination unless law requires longer.</li>
                    <li>Technical Logs and Security Data: up to 12 months for security and investigation.</li>
                    <li>Marketing Data: until you unsubscribe/withdraw consent; suppression list kept to respect opt-outs.</li>
                    <li>Anonymised Data: may be retained indefinitely for statistics and service improvement.</li>
                    <li>Legal Holds: deletion may pause during litigation or investigations.</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">8. Disclosure and Sharing of Personal Data</h2>
                <p className="mb-3 text-gray-700">
                  We do not sell, rent, or trade personal data. We may disclose data only in these circumstances:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {disclosureItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">9. Security Measures</h2>
                <p className="mb-3 text-gray-700">
                  We implement technical and organisational measures to protect personal data from unauthorised access, disclosure, alteration, destruction, loss, or misuse:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {securityItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-gray-700">
                  While we use industry-leading measures, no system is completely secure. Please use strong passwords, enable MFA, and follow best practices.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">10. Your Rights Under Data Protection Law</h2>
                <p className="mb-3 text-gray-700">
                  Depending on your role and the legal basis for processing, you may exercise the following rights:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  {rightsItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-3 space-y-2 text-gray-700">
                  <p>
                    To exercise these rights, contact privacy@disclosurely.com with enough detail to identify you and the relevant data. We respond within one month (extendable for complex requests).
                  </p>
                  <p>
                    Whistleblowers: for report content, contact the organisation you reported to (they are the Data Controller). We assist Controllers as appropriate.
                  </p>
                  <p>
                    We may need to verify identity before responding.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">11. Third-Party Services and Links</h2>
                <div className="space-y-3 text-gray-700">
                  <p>The Service may integrate with or link to third-party services not operated by Disclosurely.</p>
                  <p>We are not responsible for their privacy practices or security; review their privacy policies.</p>
                  <p>Examples: Stripe (payments), Google OAuth (authentication), transactional email providers.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">12. Children&apos;s Privacy</h2>
                <div className="space-y-3 text-gray-700">
                  <p>The Service is not intended for children under 16 and we do not knowingly collect their data.</p>
                  <p>If we learn we collected data from a child under 16 without consent, we will delete it promptly.</p>
                  <p>If you believe this has occurred, contact privacy@disclosurely.com.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">13. Anonymous Whistleblower Reporting</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    The Service supports anonymous reporting to protect whistleblower confidentiality. When enabled by a Customer, we minimise data collection and provide anonymous messaging.
                  </p>
                  <p>
                    Customers must not attempt to identify anonymous whistleblowers and must configure the Service lawfully. Complete anonymity cannot be guaranteed if identifying details are included or disclosure is required by law.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">14. Cookies and Tracking Technologies</h2>
                <div className="space-y-3 text-gray-700">
                  <p>The Service uses only essential cookies for authentication, security, and preference storage.</p>
                  <p>We do not use advertising or marketing trackers; most cookies are session-based, some persist up to 30 days.</p>
                  <p>
                    You can control cookies in your browser; disabling essential cookies may impact functionality. See browser help for instructions.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">15. Changes to this Privacy Policy</h2>
                <div className="space-y-3 text-gray-700">
                  <p>We may update this Privacy Policy to reflect changes in practices, technology, or legal requirements.</p>
                  <p>Material changes: notice via email (Customers), portal notice (Whistleblowers), and homepage notice (visitors) with at least 30 days where applicable.</p>
                  <p>Non-material changes: may be made without advance notice; please review periodically.</p>
                  <p>Continued use after changes constitutes acceptance; if you disagree, stop using the Service and request deletion where applicable.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">16. Contact Us and Data Protection Officer</h2>
                <div className="space-y-2 text-gray-700">
                  {contactDetails.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">17. EU Whistleblowing Directive Compliance</h2>
                <div className="space-y-2 text-gray-700">
                  {whistleblowingPoints.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">Last updated: November 2025</p>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default PrivacyContent;

