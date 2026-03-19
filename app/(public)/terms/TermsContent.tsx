"use client";

import React, { useEffect, useMemo } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

const TERMS_SECTIONS = [
  { id: "introduction", paragraphKeys: ["content"] as const },
  { id: "definitions", paragraphKeys: ["content"] as const },
  { id: "serviceDescription", paragraphKeys: ["content1", "content2", "content3"] as const },
  { id: "registration", paragraphKeys: ["content1", "content2", "content3"] as const },
  {
    id: "subscriptionPayment",
    paragraphKeys: ["content1", "content2", "content3", "content4", "content5", "content6"] as const,
  },
  { id: "dataProcessing", paragraphKeys: ["content1", "content2", "content3", "content4"] as const },
  { id: "customerObligations", paragraphKeys: ["content1", "content2"] as const },
  { id: "acceptableUse", paragraphKeys: ["content1", "content2"] as const },
  { id: "intellectualProperty", paragraphKeys: ["content1", "content2", "content3"] as const },
  { id: "warranties", paragraphKeys: ["content1", "content2", "content3"] as const },
  {
    id: "limitationOfLiability",
    paragraphKeys: ["content1", "content2", "content3", "content4"] as const,
  },
  { id: "termination", paragraphKeys: ["content1", "content2", "content3", "content4", "content5"] as const },
  { id: "confidentiality", paragraphKeys: ["content1", "content2"] as const },
  { id: "compliance", paragraphKeys: ["content1", "content2", "content3"] as const },
  { id: "modifications", paragraphKeys: ["content1", "content2"] as const },
  { id: "disputeResolution", paragraphKeys: ["content1", "content2", "content3", "content4"] as const },
  {
    id: "generalProvisions",
    paragraphKeys: [
      "content1",
      "content2",
      "content3",
      "content4",
      "content5",
      "content6",
      "content7",
      "content8",
    ] as const,
  },
  { id: "contact", paragraphKeys: ["content"] as const },
] as const;

function TermsContent() {
  const { t, i18n } = useTranslation();
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

  const heroBadge = useMemo(() => t("terms.hero.badge", { defaultValue: t("terms.hero.title") }), [t, i18n.language]);

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl break-words">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {heroBadge}
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {t("terms.hero.mainTitle", { defaultValue: t("terms.hero.title") })}
            </h1>
            <p className="text-lg text-gray-600">{t("terms.hero.description")}</p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6 break-words">
            {TERMS_SECTIONS.map((section) => (
              <div
                key={section.id}
                className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm"
              >
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t(`terms.sections.${section.id}.title`)}
                </h2>
                <div className="space-y-3 text-gray-700">
                  {section.paragraphKeys.map((pk) => {
                    const text = t(`terms.sections.${section.id}.${pk}`);
                    if (!text || text === `terms.sections.${section.id}.${pk}`) return null;
                    return (
                      <p key={pk} className="leading-relaxed">
                        {text}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="text-center text-sm text-gray-500">{t("terms.lastUpdated")}</p>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default TermsContent;
