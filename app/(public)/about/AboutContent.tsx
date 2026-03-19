"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];
}

function AboutContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
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

  const beliefItems = useMemo(
    () => asStringArray(t("about.beliefs.items", { returnObjects: true })),
    [t, i18n.language],
  );
  const audienceItems = useMemo(
    () => asStringArray(t("about.audience.items", { returnObjects: true })),
    [t, i18n.language],
  );
  const trustItems = useMemo(
    () => asStringArray(t("about.trust.items", { returnObjects: true })),
    [t, i18n.language],
  );

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center sm:mb-12">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {t("about.hero.tag")}
              </span>
              <h1 className="mb-4 text-balance text-4xl font-bold text-gray-900 sm:text-5xl">{t("about.hero.title")}</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600 sm:text-xl">{t("about.hero.description")}</p>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="relative min-h-0 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/abouthero.jpeg"
                  alt=""
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                <h2 className="text-2xl font-bold text-gray-900">{t("about.mission.title")}</h2>
                <p className="text-pretty">{t("about.mission.p1")}</p>
                <p className="text-pretty">{t("about.mission.p2")}</p>
                <p className="text-pretty">{t("about.mission.p3")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gray-50/80 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">{t("about.beliefs.title")}</h2>
            <ul className="space-y-4">
              {beliefItems.map((text, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" aria-hidden />
                  <span className="text-pretty text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">{t("about.audience.title")}</h2>
            <ul className="space-y-4">
              {audienceItems.map((text, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" aria-hidden />
                  <span className="text-pretty text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">{t("about.trust.title")}</h2>
            <p className="mb-8 text-center text-pretty text-gray-600">{t("about.trust.intro")}</p>
            <ul className="mb-10 space-y-4">
              {trustItems.map((text, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" aria-hidden />
                  <span className="text-pretty text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Link
                href={`${langPrefix}/security`}
                className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-100"
              >
                {t("about.trust.securityCta")}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-2xl font-bold text-white sm:text-3xl">{t("about.cta.title")}</h2>
            <p className="mb-8 text-pretty text-lg text-blue-100">{t("about.cta.subtitle")}</p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={`${langPrefix}/pricing`}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                {t("about.cta.pricing")}
              </Link>
              <Link
                href={`${langPrefix}/contact`}
                className="inline-flex items-center justify-center rounded-lg border border-blue-400 bg-blue-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {t("about.cta.demo")}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">{t("about.explore.title")}</h2>
              <p className="text-pretty text-gray-600">{t("about.explore.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href={`${langPrefix}/features`} className="group block">
                <Card className="h-full rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("about.explore.featuresTitle")}</h3>
                  <p className="text-pretty text-sm text-gray-600">{t("about.explore.featuresBody")}</p>
                </Card>
              </Link>
              <Link href={`${langPrefix}/pricing`} className="group block">
                <Card className="h-full rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("about.explore.pricingTitle")}</h3>
                  <p className="text-pretty text-sm text-gray-600">{t("about.explore.pricingBody")}</p>
                </Card>
              </Link>
              <Link href={`${langPrefix}/whistleblowing-directive`} className="group block">
                <Card className="h-full rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("about.explore.directiveTitle")}</h3>
                  <p className="text-pretty text-sm text-gray-600">{t("about.explore.directiveBody")}</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default AboutContent;
