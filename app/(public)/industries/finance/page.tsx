"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function FinanceContent() {
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
            Financial Services
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Compliance for banks and financial firms</h1>
          <p className="text-lg text-gray-600">
            Secure reporting, audit trails, and policy-aware workflows for fraud, AML, conduct risk, and regulatory obligations.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Control, evidence, and oversight</h2>
            <p className="text-gray-700">
              Configure escalation paths, approvals, and retention to satisfy auditors and regulators while keeping reporter
              identities protected.
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Segregation of duties and approver flows",
                "Encryption with full access logging",
                "Case categories for AML, fraud, and conduct",
                "SLA tracking with reminders",
                "Exportable evidence packages for audits",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-50 p-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">Security posture</h3>
            <p className="text-gray-700">
              AES-GCM encryption, strict RBAC, and continuous monitoring support ISO 27001 alignment and regulator expectations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FinancePage() {
  return (
    <I18nProvider>
      <FinanceContent />
    </I18nProvider>
  );
}

