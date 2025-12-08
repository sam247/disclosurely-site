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

function CareersContent() {
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
      <Head>
        <title>Careers | Disclosurely</title>
        <meta
          name="description"
          content="Join Disclosurely to build secure whistleblowing and compliance technology. Security-first, remote-friendly culture."
        />
      </Head>
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Careers
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Join the Disclosurely team</h1>
          <p className="text-lg text-gray-600">
            Build secure whistleblowing and compliance technology that helps organisations protect their people.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our culture</h2>
            <p className="mt-4 text-gray-700">
              We move fast, stay security-first, and obsess over customer trust. Remote-friendly, inclusive, and collaborative.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              {[
                "Security and privacy are core values",
                "Remote-first with flexible working",
                "Inclusive team and continuous learning",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">Open roles</h3>
            <p className="text-gray-700">
              We’re hiring across engineering, security, product, and customer success. Reach out with your CV and a short note on
              why you want to work on whistleblowing and compliance.
            </p>
            <a className="mt-4 inline-block text-blue-600 underline" href="mailto:team@disclosurely.com">
              Send us your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CareersPage() {
  return (
    <I18nProvider>
      <CareersContent />
    </I18nProvider>
  );
}

