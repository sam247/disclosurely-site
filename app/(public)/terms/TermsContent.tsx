"use client";

import React, { useEffect } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function TermsContent() {
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
              Terms of Service
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Terms & Conditions</h1>
            <p className="text-lg text-gray-600">
              Please review these terms carefully; they govern your use of Disclosurely's products and services.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 text-gray-700">
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Agreement</h2>
              <p>By using the service you accept these terms, our Privacy Policy, and any applicable data processing terms.</p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. Use of service</h2>
              <p>
                You will maintain account security, comply with laws, and avoid misuse including unauthorized access, reverse
                engineering, or abuse.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Customer data</h2>
              <p>
                You retain ownership of submitted data. We process it as a data processor under your instructions and applicable
                law.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Availability</h2>
              <p>
                Service is provided with commercially reasonable efforts for uptime and support; some features may be beta or subject
                to change.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">5. Liability</h2>
              <p>
                To the extent permitted by law, we limit indirect damages and cap direct liability related to fees paid for the
                service period.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">6. Contact</h2>
              <p>
                Questions? Email <a className="text-blue-600 underline" href="mailto:team@disclosurely.com">team@disclosurely.com</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default TermsContent;

