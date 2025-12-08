import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import DirectiveContent from "./DirectiveContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/whistleblowing-directive",
    fallbackTitle: "EU Whistleblowing Directive | Disclosurely",
    fallbackDescription:
      "Meet EU Whistleblowing Directive requirements with anonymous reporting, encrypted messaging, SLAs, and audit-ready workflows.",
    keywords: ["EU whistleblowing directive", "whistleblowing directive compliance", "EU directive 2019/1937"],
  });
}

export default function WhistleblowingDirectivePage() {
  return <DirectiveContent />;
}
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            EU Whistleblowing Directive
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Stay compliant with the EU Whistleblowing Directive
          </h1>
          <p className="text-lg text-gray-600">
            Meet requirements for safe channels, timely acknowledgements, and confidentiality with built-in encryption and
            audit trails.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to comply</h2>
            <p className="text-gray-600">
              Provide anonymous reporting channels, protect identities, and document every step. Automations keep you within
              mandated timelines.
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Anonymous intake with secure messaging",
                "3/7/90 day SLA reminders and tracking",
                "Role-based access for designated handlers",
                "Evidence logging and retention controls",
                "Multilingual portals for EU teams",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-50 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Built-in safeguards</h3>
            <p className="text-gray-700">
              Encryption by default, access logging, and configurable permissions ensure only authorized reviewers see sensitive
              reports while protecting reporter anonymity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Launch a compliant channel in days</h2>
          <p className="mb-6 text-lg text-blue-100">
            Guided onboarding, templates, and automated SLAs keep your organisation aligned with the Directive.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="w-full rounded-lg bg-white px-6 py-3 text-center text-blue-600 transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Start free trial
            </a>
            <a
              href="mailto:team@disclosurely.com"
              className="w-full rounded-lg border border-white/30 px-6 py-3 text-center text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function WhistleblowingDirectivePage() {
  return (
    <I18nProvider>
      <DirectiveContent />
    </I18nProvider>
  );
}

