"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function CookiesContent() {
  const { i18n } = useTranslation();
  const { currentLanguage, langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl break-words">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Cookies
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Cookie Policy</h1>
            <p className="text-lg text-gray-600">
              How we use cookies and similar technologies on Disclosurely. For full detail, see section 14 of our{" "}
              <Link href={`${langPrefix}/privacy`} className="text-blue-600 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 break-words text-gray-700">
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. What are cookies?</h2>
              <p>Small text files stored on your device so we can operate the service, keep you signed in where appropriate, and remember essential preferences.</p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. How we use them</h2>
              <p>
                We use essential cookies required for the product to work (for example session and security cookies) and
                cookies that remember preferences such as language. We do not use advertising or third-party marketing
                trackers. We do not sell personal data. Some cookies may persist for up to 30 days to maintain login
                state, as described in our Privacy Policy.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Managing cookies</h2>
              <p>
                You can control or delete cookies through your browser settings. If you disable essential cookies, parts
                of the service may not function.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Contact</h2>
              <p>
                Questions? Email{" "}
                <a className="text-blue-600 underline" href="mailto:privacy@disclosurely.com">
                  privacy@disclosurely.com
                </a>{" "}
                or{" "}
                <a className="text-blue-600 underline" href="mailto:support@disclosurely.com">
                  support@disclosurely.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default CookiesContent;

