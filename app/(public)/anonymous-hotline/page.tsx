import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import HotlineContent from "./HotlineContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/anonymous-hotline",
    fallbackTitle: "Anonymous Hotline | Disclosurely",
    fallbackDescription:
      "Provide a secure, anonymous whistleblowing hotline with encrypted two-way messaging and audit trails.",
    keywords: ["anonymous hotline", "whistleblowing hotline", "ethics hotline"],
  });
}

export default function AnonymousHotlinePage() {
  return <HotlineContent />;
}
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Anonymous Hotline
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Secure, anonymous whistleblowing hotline</h1>
          <p className="text-lg text-gray-600">
            Give employees a safe, encrypted channel to report concerns with two-way messaging and no identity exposure.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Anonymous by design</h2>
            <p className="text-gray-600">
              Reports stay encrypted end-to-end. Case handlers interact through a secure mailbox, preserving confidentiality while
              enabling follow-up questions and evidence collection.
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Identity shielding with unique inbox links",
                "Two-way secure messaging with attachments",
                "Multilingual intake and notifications",
                "Automated acknowledgements and SLAs",
                "Evidence handling with audit trails",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Adopt quickly</h3>
            <p className="text-gray-700">
              Launch in days with templates, language support, and configurable intake forms. Share hotline links or embed them in
              intranets and email footers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Empower employees to speak up safely</h2>
          <p className="mb-6 text-lg text-blue-100">
            Provide a trusted, anonymous hotline with encryption and transparent follow-up.
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

export default function AnonymousHotlinePage() {
  return (
    <I18nProvider>
      <HotlineContent />
    </I18nProvider>
  );
}

