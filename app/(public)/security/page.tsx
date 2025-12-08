"use client";

import React, { useEffect } from "react";
import { ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function SecurityContent() {
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
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Security & Trust
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Security is built-in</h1>
          <p className="text-lg text-gray-600">
            Encryption, access controls, and monitoring at every layer to keep disclosures confidential and compliant.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {[
            {
              title: "Encryption everywhere",
              desc: "AES-GCM encryption in transit and at rest with zero-knowledge design for report content.",
              icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Access controls",
              desc: "Role-based access, approval flows, and audit logs for every action across cases and messaging.",
              icon: <Lock className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Monitoring & alerts",
              desc: "Continuous monitoring, uptime SLAs, and incident response processes aligned to ISO 27001 practices.",
              icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-100 p-6">
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Security and compliance without compromise</h2>
          <p className="mb-6 text-lg text-blue-100">
            Encryption, auditability, and governance controls to protect every disclosure and meet regulatory expectations.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="w-full rounded-lg bg-white px-6 py-3 text-center text-blue-600 transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Start free trial
            </a>
            <a
              href="mailto:team@disclosurely.com"
              className="w-full rounded-lg border border-white/30 px-6 py-3 text-center text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <I18nProvider>
      <SecurityContent />
    </I18nProvider>
  );
}

