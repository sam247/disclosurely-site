"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";
import {
  COMPARE_CATEGORY_ICONS,
  COMPARE_CATEGORY_ORDER,
  type CompareCategoryId,
  type CompareTableRow,
} from "./competitorCompareTypes";

type Lang = (typeof supportedLanguages)[number];

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export type CompetitorComparePageProps = {
  /** i18n prefix, e.g. `speakup` → `compare.speakup.*` */
  pageKey: string;
  signupUrl: string;
  langPrefix: string;
  /** When true, hero shows both View pricing and Book a demo (default: pricing only). */
  heroShowPricingAndDemo?: boolean;
};

function CompareInner({ pageKey, signupUrl, langPrefix, heroShowPricingAndDemo }: CompetitorComparePageProps) {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  const p = `compare.${pageKey}`;

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const getRows = (categoryId: CompareCategoryId): CompareTableRow[] => {
    const rows = t(`${p}.tables.${categoryId}.rows`, { returnObjects: true });
    return Array.isArray(rows) ? (rows as CompareTableRow[]) : [];
  };

  const whyBullets = (index: 1 | 2 | 3, count: number) =>
    Array.from({ length: count }, (_, i) => t(`${p}.why.card${index}.bullet${i + 1}`));

  const hasQuickSummary = i18n.exists(`${p}.quickSummary.title`);
  const fitBetterBullets = Array.from({ length: 5 }, (_, i) => t(`${p}.fitBetter.bullet${i + 1}`));
  const fitCompetitorBullets = Array.from({ length: 4 }, (_, i) => t(`${p}.fitCompetitor.bullet${i + 1}`));
  const quickDisclosurelyBullets = Array.from({ length: 4 }, (_, i) => t(`${p}.quickSummary.disclosurelyBullet${i + 1}`));
  const quickCompetitorBullets = Array.from({ length: 4 }, (_, i) => t(`${p}.quickSummary.competitorBullet${i + 1}`));
  const openCalendly = () => {
    window.Calendly?.initPopupWidget({ url: "https://calendly.com/disclosurely/30min" });
  };

  return (
    <div className="min-h-screen bg-white">
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold text-gray-900 sm:text-5xl">
            <span className="block">{t(`${p}.hero.titleLine1`)}</span>
            <span className="mt-2 block text-blue-600">{t(`${p}.hero.titleLine2`)}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-pretty text-xl text-gray-600">{t(`${p}.hero.subtitle`)}</p>
          <div className="flex min-w-0 flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={signupUrl}
              className="inline-block min-w-0 max-w-full shrink-0 rounded-lg bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t("compare.common.startFreeTrial")}
            </a>
            <Link
              href={`${langPrefix}/pricing`}
              className="inline-block min-w-0 max-w-full shrink-0 rounded-lg border-2 border-blue-600 px-8 py-3 text-center text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              {t("compare.common.viewPricing")}
            </Link>
            {heroShowPricingAndDemo ? (
              <button
                type="button"
                onClick={openCalendly}
                className="inline-block min-w-0 max-w-full shrink-0 rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-center text-lg font-semibold text-gray-800 transition-colors hover:bg-gray-50"
              >
                {t("compare.common.bookDemo")}
              </button>
            ) : null}
          </div>
          {heroShowPricingAndDemo ? <p className="mt-3 text-sm text-gray-600">See available times instantly.</p> : null}
        </div>
      </div>

      {/* Fairness note */}
      <div className="border-y border-gray-100 bg-gray-50/80">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-pretty text-center text-sm leading-relaxed text-gray-600">{t(`${p}.fairnessNote`)}</p>
        </div>
      </div>

      {/* Quick dual summary (e.g. Whistleblower Software) or three-card at a glance */}
      {hasQuickSummary ? (
        <div className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              {t(`${p}.quickSummary.title`)}
            </h2>
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div className="min-w-0 rounded-lg border border-blue-100 bg-blue-50/40 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">{t(`${p}.quickSummary.disclosurelyTitle`)}</h3>
                <ul className="space-y-3 text-pretty text-sm text-gray-700">
                  {quickDisclosurelyBullets.map((line, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/60 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">{t(`${p}.quickSummary.competitorTitle`)}</h3>
                <ul className="space-y-3 text-pretty text-sm text-gray-700">
                  {quickCompetitorBullets.map((line, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              {t(`${p}.atAGlance.title`)}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-0 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{t(`${p}.atAGlance.card${i}.title`)}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-gray-600">{t(`${p}.atAGlance.card${i}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tables */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("compare.common.comparisonSectionTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-gray-600">
              {t("compare.common.comparisonSectionSubtitle")}
            </p>
          </div>

          <div className="space-y-10">
            {COMPARE_CATEGORY_ORDER.map((categoryId) => {
              const Icon = COMPARE_CATEGORY_ICONS[categoryId];
              const rows = getRows(categoryId);
              return (
                <div
                  key={categoryId}
                  className="min-w-0 overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="h-6 w-6 shrink-0" aria-hidden />
                      <h3 className="text-lg font-bold sm:text-xl">{t(`${p}.tables.${categoryId}.title`)}</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[280px] table-fixed">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="w-[28%] px-4 py-3 text-left text-xs font-semibold text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                            {t("compare.common.colFeature")}
                          </th>
                          <th className="w-[36%] px-4 py-3 text-left text-xs font-semibold text-blue-700 sm:px-6 sm:py-4 sm:text-sm">
                            {t("compare.common.colDisclosurely")}
                          </th>
                          <th className="w-[36%] px-4 py-3 text-left text-xs font-semibold text-gray-700 sm:px-6 sm:py-4 sm:text-sm">
                            {t(`${p}.competitorName`)}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80">
                            <td className="min-w-0 px-4 py-3 align-top text-sm font-medium text-gray-900 sm:px-6 sm:py-4">
                              <span className="break-words">{row.feature}</span>
                            </td>
                            <td className="min-w-0 px-4 py-3 align-top text-sm text-gray-800 sm:px-6 sm:py-4">
                              <span className="break-words">{row.disclosurely}</span>
                            </td>
                            <td className="min-w-0 px-4 py-3 align-top text-sm text-gray-700 sm:px-6 sm:py-4">
                              <span className="break-words">{row.competitor}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Disclosurely may be a better fit (skipped when quickSummary already orients buyers) */}
      {!hasQuickSummary ? (
        <div className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
              {t(`${p}.fitBetter.title`)}
            </h2>
            <ul className="space-y-3 text-pretty text-gray-700">
              {fitBetterBullets.map((line, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Why Disclosurely */}
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-gray-900 sm:text-4xl">{t(`${p}.why.title`)}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {([1, 2, 3] as const).map((i) => (
              <Card key={i} className="min-w-0 border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-balance text-xl font-bold text-gray-900">
                    {t(`${p}.why.card${i}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-pretty text-gray-600">{t(`${p}.why.card${i}.body`)}</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {whyBullets(i, 3).map((line, j) => (
                      <li key={j} className="break-words border-l-2 border-blue-200 pl-3">
                        {line}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* SpeakUp may suit */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
            {t(`${p}.fitCompetitor.title`)}
          </h2>
          <ul className="space-y-3 text-pretty text-gray-700">
            {fitCompetitorBullets.map((line, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Migration */}
      <div className="border-t border-gray-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-balance text-3xl font-bold text-gray-900 sm:text-4xl">{t(`${p}.migration.title`)}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-gray-600">{t(`${p}.migration.subtitle`)}</p>
          <div className="grid gap-6 text-left md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-0 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-2 text-2xl font-bold text-blue-600">{i}</div>
                <h3 className="mb-2 font-semibold text-gray-900">{t(`${p}.migration.step${i}.title`)}</h3>
                <p className="text-pretty text-sm text-gray-600">{t(`${p}.migration.step${i}.body`)}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-sm text-gray-500">{t(`${p}.migration.disclaimer`)}</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-blue-600 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-balance text-3xl font-bold text-white sm:text-4xl">{t(`${p}.finalCta.title`)}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl text-blue-100">{t(`${p}.finalCta.subtitle`)}</p>
          <div className="flex min-w-0 flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={signupUrl}
              className="inline-block min-w-0 max-w-full shrink-0 rounded-lg bg-white px-8 py-3 text-center text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100"
            >
              {t("compare.common.startFreeTrial")}
            </a>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-block min-w-0 max-w-full shrink-0 rounded-lg border-2 border-white px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t("compare.common.bookDemo")}
            </button>
          </div>
          <p className="mt-4 text-pretty text-sm text-blue-100">Book a 30-minute walkthrough.</p>
          <p className="mt-1 text-pretty text-sm text-blue-100">{t("compare.common.noCardNote")}</p>
        </div>
      </div>
    </div>
  );
}

export default function CompetitorComparePage(props: CompetitorComparePageProps) {
  return (
    <I18nProvider>
      <CompareInner {...props} />
    </I18nProvider>
  );
}
