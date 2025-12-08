import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-navex",
    fallbackTitle: "Disclosurely vs NAVEX",
    fallbackDescription: "See how Disclosurely compares to NAVEX with modern UX, encrypted whistleblowing, and AI automation.",
    keywords: ["disclosurely vs navex", "navex alternative", "whistleblowing comparison"],
  });
}

export default function VsNavexPage() {
  return <CompareContent />;
}
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Comparison
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Disclosurely vs NAVEX</h1>
          <p className="text-lg text-gray-600">
            A secure, AI-enabled alternative with fast deployment for whistleblowing and ethics reporting.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {points.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function VsNavexPage() {
  return (
    <I18nProvider>
      <CompareContent />
    </I18nProvider>
  );
}

