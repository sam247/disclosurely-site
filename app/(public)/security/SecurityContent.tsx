"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Key,
  Server,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Cloud,
  Database,
  Eye,
  Fingerprint,
  Globe,
  ScrollText,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

type CommitmentItem = {
  name: string;
  description: string;
  status: "inPlace" | "inProgress";
};

const commitmentCardIcons = [Shield, FileCheck, ScrollText, ClipboardList] as const;

function SecurityContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const featureIcons = useMemo(
    () => [Lock, Key, Shield, Fingerprint, Eye, Server, Database, FileCheck, Globe],
    [],
  );

  const securityFeatures = useMemo(
    () =>
      featureIcons.map((IconComponent, index) => {
        const n = index + 1;
        return {
          icon: IconComponent,
          title: t(`securityPage.features.item${n}Title`),
          description: t(`securityPage.features.item${n}Description`),
        };
      }),
    [t, featureIcons, i18n.language],
  );

  const commitmentItems = useMemo(() => {
    const raw = t("securityPage.commitments.items", { returnObjects: true });
    if (!Array.isArray(raw)) return [] as CommitmentItem[];
    return raw as CommitmentItem[];
  }, [t, i18n.language]);

  const dataProtectionSections = useMemo(
    () => [
      {
        category: t("securityPage.dataProtection.collectionTitle"),
        practices: [
          t("securityPage.dataProtection.collection1"),
          t("securityPage.dataProtection.collection2"),
          t("securityPage.dataProtection.collection3"),
          t("securityPage.dataProtection.collection4"),
        ],
      },
      {
        category: t("securityPage.dataProtection.storageTitle"),
        practices: [
          t("securityPage.dataProtection.storage1"),
          t("securityPage.dataProtection.storage2"),
          t("securityPage.dataProtection.storage3"),
          t("securityPage.dataProtection.storage4"),
        ],
      },
      {
        category: t("securityPage.dataProtection.accessTitle"),
        practices: [
          t("securityPage.dataProtection.access1"),
          t("securityPage.dataProtection.access2"),
          t("securityPage.dataProtection.access3"),
          t("securityPage.dataProtection.access4"),
        ],
      },
      {
        category: t("securityPage.dataProtection.retentionTitle"),
        practices: [
          t("securityPage.dataProtection.retention1"),
          t("securityPage.dataProtection.retention2"),
          t("securityPage.dataProtection.retention3"),
          t("securityPage.dataProtection.retention4"),
        ],
      },
    ],
    [t, i18n.language],
  );

  const infrastructureBullets = useMemo(
    () => [
      { icon: Cloud, title: t("securityPage.infrastructure.cdnTitle"), body: t("securityPage.infrastructure.cdnBody") },
      {
        icon: Database,
        title: t("securityPage.infrastructure.backupTitle"),
        body: t("securityPage.infrastructure.backupBody"),
      },
      { icon: Shield, title: t("securityPage.infrastructure.ddosTitle"), body: t("securityPage.infrastructure.ddosBody") },
      { icon: FileCheck, title: t("securityPage.infrastructure.auditTitle"), body: t("securityPage.infrastructure.auditBody") },
    ],
    [t],
  );

  const safeguards = useMemo(
    () => [
      t("securityPage.infrastructure.safeguard1"),
      t("securityPage.infrastructure.safeguard2"),
      t("securityPage.infrastructure.safeguard3"),
      t("securityPage.infrastructure.safeguard4"),
      t("securityPage.infrastructure.safeguard5"),
      t("securityPage.infrastructure.safeguard6"),
    ],
    [t, i18n.language],
  );

  const disclosureEmail = "security@disclosurely.com";

  return (
    <I18nProvider>
      <div className="min-h-screen bg-white">
        <section className="bg-white px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">{t("securityPage.hero.title")}</h1>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">{t("securityPage.hero.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{t("securityPage.highlights.card1Title")}</h3>
                <p className="text-gray-600">{t("securityPage.highlights.card1Body")}</p>
              </Card>

              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{t("securityPage.highlights.card2Title")}</h3>
                <p className="text-gray-600">{t("securityPage.highlights.card2Body")}</p>
              </Card>

              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{t("securityPage.highlights.card3Title")}</h3>
                <p className="text-gray-600">{t("securityPage.highlights.card3Body")}</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">{t("securityPage.features.title")}</h2>
              <p className="text-lg text-gray-600">{t("securityPage.features.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t("securityPage.commitments.title")}</h2>
              <p className="text-lg text-gray-600">{t("securityPage.commitments.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {commitmentItems.map((cert, index) => {
                const inPlace = cert.status === "inPlace";
                const statusLabel = inPlace
                  ? t("securityPage.commitments.statusInPlace")
                  : t("securityPage.commitments.statusInProgress");
                const IconComponent = commitmentCardIcons[index] ?? Shield;
                return (
                  <Card key={index} className="border border-gray-200 p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <IconComponent className="h-6 w-6 text-slate-600" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{cert.name}</h3>
                    <p className="mb-4 text-sm text-gray-600">{cert.description}</p>
                    <div
                      className={
                        inPlace
                          ? "inline-flex rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
                          : "inline-flex rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
                      }
                    >
                      {statusLabel}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">{t("securityPage.dataProtection.title")}</h2>
              <p className="text-lg text-gray-600">{t("securityPage.dataProtection.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {dataProtectionSections.map((section, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-600">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">{t("securityPage.infrastructure.title")}</h2>
                <p className="mb-6 text-lg text-gray-600">{t("securityPage.infrastructure.intro")}</p>
                <ul className="space-y-4">
                  {infrastructureBullets.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="mb-1 font-semibold text-gray-900">{item.title}</div>
                          <div className="text-gray-600">{item.body}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Card className="border-2 border-gray-200 bg-white p-8">
                <h3 className="mb-6 text-xl font-bold text-gray-900">{t("securityPage.infrastructure.safeguardsTitle")}</h3>
                <ul className="space-y-4">
                  {safeguards.map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="text-gray-600">{line}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-2 border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{t("securityPage.disclosure.title")}</h3>
                  <p className="text-gray-600">
                    {t("securityPage.disclosure.intro")}{" "}
                    <a href={`mailto:${disclosureEmail}`} className="text-blue-600 hover:underline">
                      {disclosureEmail}
                    </a>
                    . {t("securityPage.disclosure.outro")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">{t("securityPage.cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">{t("securityPage.cta.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                {t("securityPage.cta.startTrial")}
              </a>
              <Link
                href={`${langPrefix}/contact`}
                className="inline-flex items-center rounded-lg border border-blue-500 bg-blue-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {t("securityPage.cta.bookDemo")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default SecurityContent;
