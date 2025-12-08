"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function FaqContent() {
  const { i18n } = useTranslation();
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

  const faqs = [
    {
      q: "How does anonymous reporting work?",
      a: "Reports are end-to-end encrypted. Identities are hidden; investigators respond via secure two-way messaging.",
    },
    {
      q: "Is Disclosurely GDPR compliant?",
      a: "Yes. Data processing, retention, and access controls are designed to meet GDPR and EU Whistleblowing Directive requirements.",
    },
    {
      q: "Can we use our own domain and branding?",
      a: "Custom branding and custom domains are supported on higher tiers for a fully white-labeled experience.",
    },
    {
      q: "Do you support multi-language portals?",
      a: "Yes. Intake, notifications, and UI can be localized for supported languages.",
    },
    {
      q: "What about security certifications?",
      a: "We align to ISO 27001 controls with encryption, audit logs, and continuous monitoring.",
    },
  ];

  return (
    <div className="bg-white">
      <Head>
        <title>FAQ | Disclosurely</title>
        <meta
          name="description"
          content="Common questions about Disclosurely’s whistleblowing, security, and compliance platform."
        />
      </Head>
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            FAQ
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Answers to common questions on security, compliance, and onboarding.</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, idx) => (
              <AccordionItem key={item.q} value={`faq-${idx}`} className="rounded-lg border bg-white px-4">
                <AccordionTrigger className="text-left text-lg font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-700">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

export default function FAQPage() {
  return (
    <I18nProvider>
      <FaqContent />
    </I18nProvider>
  );
}

