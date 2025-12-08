"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function HealthcareContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  return (
    <div className="bg-white">
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Healthcare
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Protect patient trust with secure reporting</h1>
          <p className="text-lg text-gray-600">
            Anonymous disclosures, encryption, and auditability for clinical settings, PHI handling, and safety reporting.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Built for clinical compliance</h2>
            <p className="text-gray-700">
              Keep incidents, safety concerns, and ethics reports protected with strict access controls, retention, and oversight.
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Anonymous intake with secure follow-up",
                "Access controls for PHI-sensitive workflows",
                "Audit trails for investigators and reviewers",
                "Templates for safety and ethics categories",
                "Data retention and export controls",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">Security and privacy</h3>
            <p className="text-gray-700">
              Encryption, RBAC, and monitoring help safeguard sensitive health-related disclosures and align to privacy standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HealthcarePage() {
  return (
    <I18nProvider>
      <HealthcareContent />
    </I18nProvider>
  );
}

