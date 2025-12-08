"use client";

import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CheckCircle, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function PricingContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage, langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang as Lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  const plans = useMemo(
    () => [
      {
        name: t("pricing.plans.starter.name"),
        priceMonthly: "£19.99",
        priceAnnual: "£199.90",
        description: t("pricing.plans.starter.description"),
        highlights: [
          t("pricing.features.unlimitedCases"),
          t("pricing.features.unlimitedStorage"),
          t("pricing.features.emailSupport"),
        ],
        missing: [
          t("pricing.features.messaging"),
          t("pricing.features.aiHelper"),
          t("pricing.features.customBranding"),
          t("pricing.features.cname"),
          t("pricing.features.workflows"),
        ],
        cta: () => alert("Subscribe starter"),
        featured: false,
      },
      {
        name: t("pricing.plans.pro.name"),
        priceMonthly: "£39.99",
        priceAnnual: "£399.90",
        description: t("pricing.plans.pro.description"),
        highlights: [
          t("pricing.features.unlimitedCases"),
          t("pricing.features.unlimitedStorage"),
          t("pricing.features.emailSupport"),
          t("pricing.features.messaging"),
          t("pricing.features.aiHelper"),
          t("pricing.features.customBranding"),
          t("pricing.features.cname"),
          t("pricing.features.workflows"),
        ],
        missing: [],
        cta: () => alert("Subscribe pro"),
        featured: true,
      },
      {
        name: t("pricing.plans.enterprise.name"),
        priceMonthly: t("pricing.plans.enterprise.price"),
        priceAnnual: t("pricing.plans.enterprise.price"),
        description: t("pricing.plans.enterprise.description"),
        highlights: [
          t("pricing.features.everythingPro"),
          t("pricing.features.teamManagement"),
          "Multiple custom domains",
          t("pricing.features.dedicatedSupport"),
          t("pricing.features.slaGuarantee"),
        ],
        missing: [t("pricing.features.customIntegrations"), t("pricing.features.api")],
        cta: null,
        featured: false,
      },
    ],
    [t],
  );

  return (
    <div className="bg-white">
      <Head>
        <title>Pricing | Disclosurely</title>
        <meta
          name="description"
          content="Simple, transparent pricing for secure whistleblowing and compliance automation. Choose monthly or annual plans."
        />
      </Head>
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {t("landing.pricing.title")}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            {t("landing.pricing.subtitle")}
          </h1>
          <p className="text-lg text-gray-600">
            Transparent plans built for secure whistleblowing and compliance automation.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="https://app.disclosurely.com/auth/signup"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {t("landing.hero.startFreeTrial")}
            </Link>
            <Link
              href={`${langPrefix}/contact`}
              className="rounded-lg border border-gray-200 px-6 py-3 text-gray-700 transition-colors hover:border-gray-300"
            >
              {t("landing.cta.button")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <Tabs value={billingInterval} onValueChange={(v) => setBillingInterval(v as "monthly" | "annual")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" className="text-sm sm:text-base">
                  {t("pricing.billingInterval.monthly")}
                </TabsTrigger>
                <TabsTrigger value="annual" className="text-sm sm:text-base">
                  {t("pricing.billingInterval.annual")}
                  <Badge className="ml-2 bg-green-600 text-[10px] text-white">{t("pricing.billingInterval.save")}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.featured ? "relative border-blue-200 shadow-lg" : ""}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-medium text-white sm:text-sm">
                      {t("pricing.plans.mostPopular")}
                    </span>
                  </div>
                )}
                <CardHeader className="pb-6 text-center">
                  <CardTitle className="text-xl font-bold sm:text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold sm:text-4xl">
                      {billingInterval === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                    </span>
                    <span className="text-sm text-gray-600 sm:text-base">
                      {plan.name === t("pricing.plans.enterprise.name")
                        ? ""
                        : billingInterval === "monthly"
                        ? "/month"
                        : "/year"}
                    </span>
                  </div>
                  <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.highlights.map((item) => (
                      <div key={item} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700 sm:text-base">{item}</span>
                      </div>
                    ))}
                    {plan.missing.map((item) => (
                      <div key={item} className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-red-500" />
                        <span className="text-sm text-gray-500 sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  {plan.cta ? (
                    <button
                      type="button"
                      className={`mt-6 w-full rounded-md px-4 py-2 text-sm shadow-sm transition-colors ${
                        plan.featured
                          ? "bg-blue-600 font-semibold text-white hover:bg-blue-700"
                          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={plan.cta}
                    >
                      {t("pricing.cta.startTrial")}
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="mt-6 block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {t("pricing.cta.contactSales")}
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <I18nProvider>
      <PricingContent />
    </I18nProvider>
  );
}

