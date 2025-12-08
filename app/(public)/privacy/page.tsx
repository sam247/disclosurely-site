"use client";

import React, { useEffect } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

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
    <div className="bg-white">
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Privacy Policy
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Privacy & Data Protection</h1>
          <p className="text-lg text-gray-600">
            How we collect, process, and protect data across Disclosurely products, aligned to GDPR and security best
            practices.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8 text-gray-700">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Data we collect</h2>
            <p>
              We collect account details, usage analytics, and content you submit (including reports and messages) to deliver and
              support the service. Sensitive disclosures remain encrypted and access-controlled.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. How we use data</h2>
            <p>
              We process data to provide the platform, maintain security, meet legal obligations, and improve product experience.
              We do not sell personal data.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Security</h2>
            <p>
              AES-GCM encryption in transit and at rest, strict role-based access, audit logging, and continuous monitoring.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Your rights</h2>
            <p>
              Access, rectify, erase, restrict processing, and portability subject to applicable law. Contact team@disclosurely.com
              for requests.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">5. Subprocessors & transfers</h2>
            <p>
              We use vetted subprocessors with appropriate safeguards. Data may be transferred internationally with standard
              contractual protections.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">6. Contact</h2>
            <p>
              For privacy questions, email <a className="text-blue-600 underline" href="mailto:team@disclosurely.com">team@disclosurely.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <I18nProvider>
      <PrivacyContent />
    </I18nProvider>
  );
}

