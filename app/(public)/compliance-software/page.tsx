"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function ComplianceContent() {
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

  return (
    <div className="bg-white">
      <Head>
        <title>Compliance Software | Disclosurely</title>
        <meta
          name="description"
          content="Streamline whistleblowing and compliance with encrypted intake, audit trails, and AI-powered workflows aligned to EU Directive and GDPR."
        />
      </Head>
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Compliance Software
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Streamline whistleblowing and compliance in one platform
          </h1>
          <p className="text-lg text-gray-600">
            End-to-end encryption, anonymous reporting, audit trails, and AI-powered workflows to keep you aligned with EU
            Whistleblowing Directive and GDPR.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Built for regulatory confidence</h2>
            <p className="text-gray-600">
              Capture, route, and resolve disclosures with secure two-way messaging, investigator controls, and full audit
              history. Meet response timelines and retention rules without manual overhead.
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Anonymous intake with secure messaging",
                "AES-GCM encryption in transit and at rest",
                "Role-based access and reviewer workflows",
                "Automated acknowledgements and SLAs",
                "Evidence management with file safeguards",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="overflow-hidden">
            <Image
              src="/assets/artwork/compliance_made_easy.png"
              alt="Compliance dashboard"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Key capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Policy-aware workflows",
                desc: "Automate intake, assignment, and resolution steps aligned to EU Directive timelines.",
              },
              {
                title: "Confidential messaging",
                desc: "Two-way encrypted chat with identity protection and configurable retention.",
              },
              {
                title: "Audit-ready reporting",
                desc: "Exports, activity logs, and attestations to support auditors and regulators.",
              },
              {
                title: "AI-powered triage",
                desc: "Risk scoring, summarization, and suggested actions to speed investigator response.",
              },
              {
                title: "Multi-language support",
                desc: "Localized intake and notifications to meet employee needs across regions.",
              },
              {
                title: "Security by default",
                desc: "Zero-knowledge design, strict access controls, and continuous monitoring.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-xl border border-gray-100 p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to meet the EU Whistleblowing Directive?</h2>
          <p className="mb-6 text-lg text-blue-100">
            Launch a secure, compliant whistleblowing program with encryption, audit trails, and guided workflows.
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

export default function ComplianceSoftwarePage() {
  return (
    <I18nProvider>
      <ComplianceContent />
    </I18nProvider>
  );
}

