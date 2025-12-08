"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function CompareContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const points = [
    "Anonymous secure mailbox with two-way messaging",
    "AI summaries, triage, and workflow automation",
    "Compliance-ready with Directive SLAs and audit trails",
    "Transparent pricing and quick start",
  ];

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Comparison
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Disclosurely vs Resolver</h1>
            <p className="text-lg text-gray-600">
              A modern, encrypted platform for whistleblowing and compliance with automation built in.
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
    </I18nProvider>
  );
}

export default CompareContent;

