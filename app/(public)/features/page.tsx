"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";
import { CheckCircle2 } from "lucide-react";

type Lang = (typeof supportedLanguages)[number];

const featureIcons = [
  "/assets/icons/anonymous_reporting.png",
  "/assets/icons/secure_messaging.png",
  "/assets/icons/case_management.png",
  "/assets/icons/multi-user_access.png",
  "/assets/icons/regulatory_compliance.png",
  "/assets/icons/enterprise_security.png",
];

function FeaturesContent() {
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

  const features = useMemo(
    () => [
      {
        title: t("landing.features.anonymousReporting.title"),
        description: t("landing.features.anonymousReporting.description"),
        icon: featureIcons[0],
      },
      {
        title: t("landing.features.secureMessaging.title"),
        description: t("landing.features.secureMessaging.description"),
        icon: featureIcons[1],
      },
      {
        title: t("landing.features.caseManagement.title"),
        description: t("landing.features.caseManagement.description"),
        icon: featureIcons[2],
      },
      {
        title: t("landing.features.multiUserAccess.title"),
        description: t("landing.features.multiUserAccess.description"),
        icon: featureIcons[3],
      },
      {
        title: t("landing.features.regulatoryCompliance.title"),
        description: t("landing.features.regulatoryCompliance.description"),
        icon: featureIcons[4],
      },
      {
        title: t("landing.features.enterpriseSecurity.title"),
        description: t("landing.features.enterpriseSecurity.description"),
        icon: featureIcons[5],
      },
    ],
    [t],
  );

  return (
    <div className="bg-white">
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {t("landing.features.title")}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">{t("landing.features.subtitle")}</h1>
          <p className="text-lg text-gray-600">
            Secure, compliant, and AI-powered features that make whistleblowing effortless.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Security and compliance built in</h2>
            <p className="mt-4 text-lg text-gray-600">
              Enterprise-grade encryption, audit trails, and controls to keep every disclosure safe.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Military-grade encryption</h3>
              <p className="mb-6 text-gray-600">
                AES-GCM encryption for data in transit and at rest, with zero-knowledge design so only authorized reviewers
                can decrypt submissions.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Data isolation per tenant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Role-based access and approvals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Full audit logs for every action
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">AI-powered case management</h3>
              <p className="mb-6 text-gray-600">
                Smart triage, automated workflows, and guided responses to keep investigators focused on what matters.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Risk scoring and prioritization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Secure two-way anonymous messaging
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Templates for compliance responses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <I18nProvider>
      <FeaturesContent />
    </I18nProvider>
  );
}

