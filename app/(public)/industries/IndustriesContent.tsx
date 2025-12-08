"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function IndustriesContent() {
  const { i18n } = useTranslation();
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
              Industries
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Solutions for every industry</h1>
            <p className="text-lg text-gray-600">
              Tailored whistleblowing, compliance, and security controls for regulated sectors.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Financial Services", href: "/industries/finance" },
              { title: "Healthcare", href: "/industries/healthcare" },
              { title: "Public Sector", href: "/industries/public-sector" },
              { title: "Technology", href: "/industries/technology" },
              { title: "Manufacturing", href: "/industries/manufacturing" },
              { title: "Professional Services", href: "/industries/professional-services" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600">Secure intake, audit trails, and policy-aware workflows.</p>
                <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Built for regulated environments</h2>
              <p className="mt-4 text-gray-700">
                Encryption, data residency controls, role-based access, and audit logs keep teams compliant with sector-specific
                obligations.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                {[
                  "Configurable intake forms and workflows",
                  "Segregation of duties and approval paths",
                  "Data retention and export controls",
                  "Real-time SLA tracking and reminders",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">Security and compliance</h3>
              <p className="text-gray-700">
                AES-GCM encryption, access logging, and continuous monitoring help meet GDPR, ISO 27001, and sector frameworks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default IndustriesContent;

