import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CookiesContent from "./CookiesContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/cookies",
    fallbackTitle: "Cookie Policy | Disclosurely",
    fallbackDescription: "Understand how Disclosurely uses cookies and similar technologies across the platform.",
    keywords: ["cookie policy", "cookies", "privacy"],
  });
}

export default function CookiesPage() {
  return <CookiesContent />;
}
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Cookies
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Cookie Policy</h1>
          <p className="text-lg text-gray-600">How we use cookies and similar technologies on Disclosurely.</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 text-gray-700">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. What are cookies?</h2>
            <p>Small text files stored on your device to help deliver and improve the service.</p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. How we use them</h2>
            <p>Essential session cookies, preferences, analytics, and security. No sale of personal data.</p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Managing cookies</h2>
            <p>You can adjust browser settings to refuse cookies. Some features may not work without them.</p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Contact</h2>
            <p>
              Questions? Email <a className="text-blue-600 underline" href="mailto:team@disclosurely.com">team@disclosurely.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <I18nProvider>
      <CookiesContent />
    </I18nProvider>
  );
}

