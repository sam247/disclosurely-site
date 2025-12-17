"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function CareersContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
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
          <div className="mx-auto max-w-5xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {t("careers.hero.tag")}
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">{t("careers.hero.title")}</h1>
            <p className="text-lg text-gray-600">{t("careers.hero.subtitle")}</p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t("careers.culture.title")}</h2>
              <p className="mt-4 text-gray-700">{t("careers.culture.description")}</p>
              <ul className="mt-6 space-y-3 text-gray-700">
                {Object.values(t("careers.culture.values", { returnObjects: true }) as Record<string, string>).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">{t("careers.roles.title")}</h3>
              <p className="text-gray-700">{t("careers.roles.description")}</p>
              <a className="mt-4 inline-block text-blue-600 underline" href="mailto:team@disclosurely.com">
                {t("careers.roles.cta")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default CareersContent;

