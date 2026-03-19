/**
 * Updates the Contentful blog post slug `whistleblowing-software-comparison-2026`.
 *
 * Requires: CONTENTFUL_MANAGEMENT_TOKEN (Contentful → Settings → API keys → Content management tokens)
 * Optional: CONTENTFUL_SPACE_ID (defaults to same fallback as lib/contentful.ts), CONTENTFUL_ENVIRONMENT_ID (default: master)
 *
 * Run: npm run contentful:update:whistleblowing-comparison-2026
 */
import { createClient } from "contentful-management";

const SPACE_ID =
  process.env.CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID || "rm7hib748uv7";
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || "master";
const CONTENT_TYPE = "9oYANGj5uBRT6UHsl5LxO";
const SLUG = "whistleblowing-software-comparison-2026";

const t = (value, marks = []) => ({ nodeType: "text", value, marks, data: {} });
const p = (...content) => ({ nodeType: "paragraph", data: {}, content });
const h2 = (...content) => ({ nodeType: "heading-2", data: {}, content });
const h3 = (...content) => ({ nodeType: "heading-3", data: {}, content });
const hr = () => ({ nodeType: "hr", data: {}, content: [] });
const link = (uri, label) => ({
  nodeType: "hyperlink",
  data: { uri },
  content: [t(label)],
});

function li(...inlineParts) {
  return {
    nodeType: "list-item",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: inlineParts.flat(),
      },
    ],
  };
}

function ul(...items) {
  return { nodeType: "unordered-list", data: {}, content: items };
}

function buildRichDocument() {
  return {
    nodeType: "document",
    data: {},
    content: [
      p(
        t(
          "Choosing whistleblowing software is rarely as simple as comparing feature checklists. Buyers also need to weigh security and confidentiality, how reporting and triage workflows operate day to day, pricing and procurement friction, rollout effort, and whether a platform fits how your organisation actually handles sensitive concerns."
        )
      ),
      p(
        t(
          "This guide is for compliance, HR, legal, IT, and operations leaders who are actively shortlisting whistleblowing software in 2026. It outlines what to look for when evaluating options, summarises several common approaches in the market, and points to "
        ),
        link("/vs-speakup", "deeper vendor-by-vendor comparisons"),
        t(" on Disclosurely where you want more detail.")
      ),
      p(
        t(
          "Disclosurely is included here because we maintain the platform and publish those comparison pages—not because this article ranks vendors. Use every summary as a starting point for your own due diligence, demos, and security review."
        )
      ),

      h2(t("How to evaluate whistleblowing software")),

      h3(t("Security and confidentiality")),
      p(
        t(
          "Ask how data is protected in transit and at rest, how access is restricted on a need-to-know basis, and what logging exists without weakening reporter privacy. Request documentation you can share with your information security team, and confirm how configuration choices (for example integrations or exports) change the risk profile."
        )
      ),

      h3(t("Anonymous reporting and follow-up communication")),
      p(
        t(
          "Clarify what “anonymous” means in practice: is the channel designed to minimise identity data, or only to hide the reporter from certain users? Check how follow-up questions work while preserving confidentiality, and how you will handle evidence attachments safely."
        )
      ),

      h3(t("Case management and audit trails")),
      p(
        t(
          "Look for a clear case lifecycle (intake, assignment, investigation steps, outcomes) that matches your policy, alongside an audit trail that supports oversight without unnecessary exposure of sensitive content. Confirm retention controls and how you would respond to subject access requests or regulatory enquiries."
        )
      ),

      h3(t("Compliance support")),
      p(
        t(
          "Map vendor capabilities to your legal context—for example EU Whistleblowing Directive-style timelines and record-keeping expectations—without treating software as a substitute for legal advice. Prefer vendors that explain how their workflows support common obligations, rather than making blanket “compliant” claims."
        )
      ),

      h3(t("Rollout effort and internal adoption")),
      p(
        t(
          "Evaluate how quickly you can launch a credible channel, what needs to be configured (forms, categories, roles, notifications), and what help you receive during rollout. The best feature set is of limited value if case owners find the tool hard to use under pressure."
        )
      ),

      h3(t("Pricing model and buying friction")),
      p(
        t(
          "Understand what drives price (users, cases, entities, modules), what is included in base packages, and how costs change as you scale. Be explicit about procurement steps—security questionnaires, legal review, and vendor onboarding—so you are comparing real time-to-value, not only list features."
        )
      ),

      h3(t("Multilingual support and organisational fit")),
      p(
        t(
          "If you operate across countries, confirm reporter-facing languages, time zones for support, and how you will govern consistent handling across regions. Finally, sanity-check cultural fit: will employees trust the channel, and does the product’s assumptions match your size and sector?"
        )
      ),

      hr(),

      h2(t("Overview of leading whistleblowing platforms")),

      h3(t("Disclosurely")),
      p(
        t(
          "Disclosurely is a focused whistleblowing platform built around secure reporting, structured case handling, and pragmatic rollout. It is often shortlisted by teams that want a dedicated channel with transparent pricing and a modern admin experience, rather than a broad compliance suite. For a balanced view, read our pages comparing Disclosurely with "
        ),
        link("/vs-speakup", "SpeakUp"),
        t(", "),
        link("/vs-navex", "NAVEX"),
        t(", and "),
        link("/vs-whistleblower-software", "Whistleblower Software"),
        t(".")
      ),

      h3(t("NAVEX")),
      p(
        t(
          "NAVEX is a long-established name commonly positioned within a wider ethics and compliance portfolio. Enterprises with formal procurement and multi-module strategies may shortlist it alongside other GRC-style vendors. Focus due diligence on total cost of ownership, implementation scope, and how whistleblowing workflows integrate with the modules you already license."
        )
      ),

      h3(t("SpeakUp (EQS Group)")),
      p(
        t(
          "SpeakUp is frequently encountered in European programmes, often alongside governance and compliance tooling from EQS Group. Compare anonymous reporting and two-way messaging in real scenarios, how administrator roles map to your team, and how pricing scales as you add entities or languages."
        )
      ),

      h3(t("Whistleblower Software")),
      p(
        t(
          "Whistleblower Software (the vendor) offers whistleblowing-focused tooling with packaging that varies by segment. Review security materials carefully, validate support for the workflows your policies require, and test whether the handler experience matches how your team triages and documents cases."
        )
      ),

      h3(t("Broader suite vendors")),
      p(
        t(
          "Some organisations procure whistleblowing capabilities inside larger HR, risk, or compliance suites. That can reduce vendor sprawl, but it may trade depth in anonymity, secure messaging, or whistleblowing-specific workflows for breadth. Test your non-negotiables rather than assuming equivalence across modules."
        )
      ),

      hr(),

      h2(t("Deeper vendor-by-vendor comparisons")),
      p(
        t(
          "If you already have a shortlist, the next step is usually a focused comparison against your requirements: security, workflows, buying model, and rollout path."
        )
      ),
      p(
        t("On Disclosurely you can explore:"),
      ),
      ul(
        li(link("/vs-speakup", "Disclosurely vs SpeakUp")),
        li(link("/vs-navex", "Disclosurely vs NAVEX")),
        li(link("/vs-whistleblower-software", "Disclosurely vs Whistleblower Software")),
        li(link("/pricing", "Pricing")),
        li(link("/security", "Security overview")),
        li(link("/whistleblowing-directive", "EU Whistleblowing Directive — practical context")),
        li(link("/contact", "Book a demo or ask a question"))
      ),

      h2(t("Helpful next steps")),
      p(
        t(
          "These links are optional next steps if you want to move from market scanning to a concrete evaluation path:"
        )
      ),
      ul(
        li(link("/vs-speakup", "Compare Disclosurely with SpeakUp")),
        li(link("/vs-navex", "Compare Disclosurely with NAVEX")),
        li(link("/vs-whistleblower-software", "Compare Disclosurely with Whistleblower Software")),
        li(link("/pricing", "View Disclosurely pricing")),
        li(link("/security", "See how Disclosurely approaches security")),
        li(link("/contact", "Book a demo"))
      ),

      h2(t("Which type of platform is right for you?")),

      h3(t("Best for small to mid-sized organisations")),
      p(
        t(
          "Teams that need a clear reporting channel, sensible defaults, and a shorter path to go-live often prioritise focused platforms with predictable packaging. Look for transparent pricing, guided setup, and documentation your lean internal team can maintain."
        )
      ),

      h3(t("Best for enterprise-heavy procurement environments")),
      p(
        t(
          "Large enterprises may favour vendors with established procurement packs, referenceable enterprise programmes, and integrations into wider risk or case ecosystems. Expect longer evaluation cycles; allocate time for security review, data processing agreements, and joint success planning."
        )
      ),

      h3(t("Best for teams that want transparent pricing and faster rollout")),
      p(
        t(
          "If you are optimising for speed and clarity, prioritise vendors that publish pricing or provide straightforward quotes, with implementation playbooks that match your internal capacity. Validate that “fast” does not come at the expense of the controls you need."
        )
      ),

      h3(t("Best for organisations prioritising broader suite vendors")),
      p(
        t(
          "If your strategy is to consolidate vendors, a suite may be attractive—provided whistleblowing workflows meet your minimum bar for confidentiality, case quality, and oversight. Pilot the whistleblowing module specifically, not only the surrounding platform."
        )
      ),

      hr(),

      h2(t("Frequently asked questions")),

      h3(t("What features matter most in whistleblowing software?")),
      p(
        t(
          "Most programmes need a trustworthy intake experience, confidential two-way communication where appropriate, structured case handling, role-based access, reporting for oversight, and retention controls. The priority order depends on your risk profile, jurisdictions, and whether you are replacing an existing channel."
        )
      ),

      h3(t("Is whistleblowing software required for organisations with 50+ employees?")),
      p(
        t(
          "Legal obligations depend on jurisdiction, sector, and how local law transposes the EU Whistleblowing Directive (and equivalent rules elsewhere). Many EU private-sector employers meet or exceed thresholds around 50 workers, but Member State rules and timelines differ. Confirm your position with qualified counsel and competent authority guidance—do not treat a blog article as legal advice."
        )
      ),

      h3(t("How do vendors usually price whistleblowing software?")),
      p(
        t(
          "Common models include per-user or per-admin pricing, banding by organisation size, multi-entity fees, and suite bundles where whistleblowing is one module. Ask what increases cost as you add languages, integrations, or advanced workflows, and what is included in support."
        )
      ),

      h3(t("What should buyers look for beyond feature lists?")),
      p(
        t(
          "Security architecture and operational access controls, realistic workflows for your case team, evidence of successful adoption in similar organisations, quality of onboarding and support, and clarity on roadmap items that matter to you (for example multilingual reporting or analytics)."
        )
      ),

      h3(t("Is anonymous reporting available in all systems?")),
      p(
        t(
          "Most vendors advertise anonymous or confidential reporting, but implementations differ in what data is collected, how messaging works, and what administrators can infer. Test scenarios that mirror your policy and threat model rather than relying on marketing language alone."
        )
      ),

      h3(t("What is the difference between a focused whistleblowing platform and a broader compliance suite?")),
      p(
        t(
          "Focused platforms typically centre the whistleblowing workflow end-to-end. Suites may pair whistleblowing with policy attestation, training, or broader case management—sometimes with trade-offs in depth or configuration complexity. Choose based on whether you need best-in-class whistleblowing workflows or consolidated vendor relationships."
        )
      ),

      hr(),

      h2(t("Conclusion")),
      p(
        t(
          "The right whistleblowing software choice depends on your organisation’s size, legal context, procurement constraints, and the level of workflow support your case team needs—not on a single “best” label."
        )
      ),
      p(
        t(
          "Use this guide to structure your evaluation, then validate assumptions with demos, reference customers where possible, and security review. If a focused platform with secure reporting, transparent pricing, and a modern rollout path fits your criteria, "
        ),
        link("/contact", "Disclosurely may be worth shortlisting"),
        t(". For side-by-side breakdowns, start with the comparison pages linked above.")
      ),
    ],
  };
}

const FIELDS = {
  title: "Whistleblowing software comparison 2026: a buyer’s guide",
  slug: SLUG,
  excerpt:
    "A practical 2026 buyer’s guide to shortlisting whistleblowing software: what to evaluate beyond features, how leading approaches differ, and where to find deeper vendor comparisons.",
  seoTitle: "Whistleblowing software comparison 2026 | Buyer’s guide",
  seoDescription:
    "Compare whistleblowing software options for 2026: evaluation criteria, balanced vendor context, FAQs, and links to Disclosurely vs SpeakUp, NAVEX, and Whistleblower Software.",
  tags: [
    "whistleblowing software",
    "software comparison",
    "buyers guide",
    "EU whistleblowing",
    "compliance",
  ],
  readingTime: 14,
  status: "published",
  content: buildRichDocument(),
};

async function main() {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  if (!token) {
    console.error("Missing CONTENTFUL_MANAGEMENT_TOKEN.");
    process.exit(1);
  }

  const client = createClient({ accessToken: token });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENV_ID);
  const locales = await environment.getLocales();
  const defaultLocale = locales.items.find((l) => l.default)?.code;
  if (!defaultLocale) {
    console.error("Could not determine default locale.");
    process.exit(1);
  }

  const { items } = await environment.getEntries({
    content_type: CONTENT_TYPE,
    "fields.slug": SLUG,
    limit: 1,
  });

  const entry = items[0];
  if (!entry) {
    console.error(`No blog post found with slug "${SLUG}".`);
    process.exit(1);
  }

  entry.fields.title = { ...(entry.fields.title || {}), [defaultLocale]: FIELDS.title };
  entry.fields.slug = { ...(entry.fields.slug || {}), [defaultLocale]: FIELDS.slug };
  entry.fields.excerpt = { ...(entry.fields.excerpt || {}), [defaultLocale]: FIELDS.excerpt };
  entry.fields.seoTitle = { ...(entry.fields.seoTitle || {}), [defaultLocale]: FIELDS.seoTitle };
  entry.fields.seoDescription = {
    ...(entry.fields.seoDescription || {}),
    [defaultLocale]: FIELDS.seoDescription,
  };
  entry.fields.tags = { ...(entry.fields.tags || {}), [defaultLocale]: FIELDS.tags };
  entry.fields.readingTime = {
    ...(entry.fields.readingTime || {}),
    [defaultLocale]: FIELDS.readingTime,
  };
  entry.fields.status = { ...(entry.fields.status || {}), [defaultLocale]: FIELDS.status };
  entry.fields.content = { ...(entry.fields.content || {}), [defaultLocale]: FIELDS.content };

  const updated = await entry.update();
  await updated.publish();
  console.log(`Published "${FIELDS.title}" (${SLUG}) in ${defaultLocale}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
