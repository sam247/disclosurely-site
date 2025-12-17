"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Mail, Users, TrendingUp, Calendar } from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";
import { Card, CardContent } from "@/components/ui/card";

type Lang = (typeof supportedLanguages)[number];

function CareersContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage, langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const whyItems = [
    {
      icon: Users,
      title: t("careers.why.items.mission.title"),
      description: t("careers.why.items.mission.description"),
    },
    {
      icon: TrendingUp,
      title: t("careers.why.items.growth.title"),
      description: t("careers.why.items.growth.description"),
    },
    {
      icon: Calendar,
      title: t("careers.why.items.flexibility.title"),
      description: t("careers.why.items.flexibility.description"),
    },
    {
      icon: CheckCircle2,
      title: t("careers.why.items.benefits.title"),
      description: t("careers.why.items.benefits.description"),
    },
  ];

  return (
    <I18nProvider>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              {t("careers.hero.tag")}
            </span>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">{t("careers.hero.title")}</h1>
            <p className="mb-4 text-xl text-gray-600">{t("careers.hero.subtitle")}</p>
            <p className="mx-auto max-w-3xl text-lg text-gray-700">{t("careers.hero.description")}</p>
          </div>
        </section>

        {/* Why Work With Us Section */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("careers.why.title")}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whyItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="border-gray-200">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture & Roles Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("careers.culture.title")}</h2>
                <p className="mb-6 text-lg text-gray-700">{t("careers.culture.description")}</p>
                <ul className="space-y-3 text-gray-700">
                  {Object.values(t("careers.culture.values", { returnObjects: true }) as Record<string, string>).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{t("careers.roles.title")}</h3>
                  </div>
                  <p className="mb-6 text-gray-700">{t("careers.roles.description")}</p>
                  <a
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    href="mailto:careers@disclosurely.com"
                  >
                    <Mail className="h-4 w-4" />
                    {t("careers.roles.cta")}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default CareersContent;

