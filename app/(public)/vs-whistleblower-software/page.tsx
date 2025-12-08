"use client";

import React, { useEffect } from "react";
import Head from "next/head";
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
    "Encryption-first platform with anonymous two-way messaging",
    "AI-driven triage, summaries, and workflow automation",
    "EU Whistleblowing Directive SLAs and reminders built in",
    "Transparent pricing and rapid onboarding",
  ];

  return (
    <div className="bg-white">
      <Head>
        <title>Disclosurely vs Whistleblower Software</title>
        <meta
          name="description"
          content="Compare Disclosurely to traditional whistleblower software: encryption-first, AI automation, Directive-aligned SLAs."
        />
      </Head>
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Comparison
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Disclosurely vs Whistleblower Software</h1>
          <p className="text-lg text-gray-600">
            Security, speed, and compliance in a single platform for whistleblowing and ethics reporting.
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

export default function VsWhistleblowerSoftwarePage() {
  return (
    <I18nProvider>
      <CompareContent />
    </I18nProvider>
  );
}

