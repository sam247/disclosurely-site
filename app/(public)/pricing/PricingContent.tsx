"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, X, Star } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function PricingContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage, langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const handleStartTrial = (location: string, plan?: string) => {
    track("start_free_trial", { location, plan, billingInterval });
    window.location.href = "https://app.disclosurely.com/auth/signup";
  };

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
        ctaPlan: "starter",
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
        ctaPlan: "pro",
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
          t("pricing.features.multipleCustomDomains"),
          t("pricing.features.dedicatedSupport"),
          t("pricing.features.slaGuarantee"),
          t("pricing.features.customIntegrations"),
          t("pricing.features.api"),
        ],
        missing: [],
        ctaPlan: null,
        featured: false,
      },
    ],
    [t],
  );

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="bg-white px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              {t("pricing.hero.tagline")}
            </span>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              {t("pricing.hero.title")}
            </h1>
            <p className="mb-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t("pricing.hero.subtitle1")}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("pricing.hero.subtitle2")}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center">
              <Link
                href="https://app.disclosurely.com/auth/signup"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                onClick={() => handleStartTrial("pricing_hero")}
              >
                {t("landing.hero.startFreeTrial")}
              </Link>
            </div>
          </div>
        </section>


        {/* Pricing Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Billing Interval Tabs */}
            <div className="mb-8 flex justify-center">
              <Tabs value={billingInterval} onValueChange={(v) => setBillingInterval(v as "monthly" | "annual")} className="w-auto">
                <TabsList className="inline-flex items-center gap-2 rounded-full bg-gray-100 p-1 shadow-sm">
                  <TabsTrigger value="monthly" className="flex h-11 items-center justify-center rounded-full px-5 text-sm sm:text-base">
                    {t("pricing.billingInterval.monthly")}
                  </TabsTrigger>
                  <TabsTrigger value="annual" className="flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm sm:text-base">
                    {t("pricing.billingInterval.annual")}
                    <Badge className="rounded-full bg-green-600 px-2 py-1 text-[11px] font-semibold leading-none text-white">
                      {t("pricing.billingInterval.save")}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
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
                          ? t("pricing.plans.perMonth")
                          : t("pricing.plans.perYear")}
                      </span>
                    </div>
                    <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.highlights.map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${item === t("pricing.features.customIntegrations") || item === t("pricing.features.api") ? "text-gray-400" : "text-green-600"}`} />
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
                    {plan.ctaPlan ? (
                      <button
                        type="button"
                        className={`mt-6 w-full rounded-md px-4 py-2 text-sm shadow-sm transition-colors ${
                          plan.featured
                            ? "bg-blue-600 font-semibold text-white hover:bg-blue-700"
                            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => handleStartTrial("pricing_plan", plan.ctaPlan || plan.name)}
                      >
                        {t("pricing.cta.startTrial")}
                      </button>
                    ) : (
                      <Link
                        href={`${langPrefix}/contact`}
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

        {/* Second Trust Indicators */}
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-center justify-center gap-8 md:flex-row">
              <div className="flex items-center gap-2 text-blue-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold text-gray-900">{t("pricing.trustIndicators.badgeTrial")}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold text-gray-900">{t("pricing.trustIndicators.badgeCancel")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Trusted by companies */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Trusted by companies in all industries</h2>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  {t("pricing.testimonial.quote")}
                </p>
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 font-semibold text-white text-xl">
                    {t("pricing.testimonial.initials")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t("pricing.testimonial.name")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.testimonial.role")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg md:p-12">
              <h3 className="mb-8 text-center text-2xl font-bold md:text-3xl">{t("pricing.benefits.title")}</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat1.title")}</div>
                  <div className="text-sm text-blue-100">{t("pricing.benefits.stat1.description")}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat2.title")}</div>
                  <div className="text-sm text-blue-100">{t("pricing.benefits.stat2.description")}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat3.title")}</div>
                  <div className="text-sm text-blue-100">{t("pricing.benefits.stat3.description")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features Section - Two Columns */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t("pricing.security.title")}</h2>
              <p className="text-lg text-gray-600">{t("pricing.security.description")}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.0.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.0.description")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.1.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.1.description")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.2.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.2.description")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.3.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.3.description")}</div>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.4.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.4.description")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.5.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.5.description")}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">{t("pricing.security.points.6.title")}</div>
                    <div className="text-sm text-gray-600">{t("pricing.security.points.6.description")}</div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href={`${langPrefix}/security`}>
                    <Button variant="outline" size="lg" className="border-gray-300">
                      {t("pricing.security.cta")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Feature Comparison */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t("pricing.compare.title")}</h2>
              <p className="text-lg text-gray-600">{t("pricing.compare.subtitle")}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full rounded-lg bg-white shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t("pricing.compare.headers.features")}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{t("pricing.compare.headers.starter")}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">{t("pricing.compare.headers.pro")}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{t("pricing.compare.headers.enterprise")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.reporting")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.reportsPerMonth")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.storagePerReport")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.unlimited")}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.security")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.encryption")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.gdpr")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.auditTrail")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.ai")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{t("pricing.compare.rows.aiCaseAnalysis")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.aiRiskAssessment")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.aiChatSupport")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.communication")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.twoWayMessaging")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.anonymousReports")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.team")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.teamMembers")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.teamMembers.starter")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.teamMembers.pro")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.teamMembers.enterprise")}</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.assignmentRules")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.slaManagement")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.customization")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.customBranding")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.customDomain")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">{t("pricing.compare.values.oneDomain")}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">{t("pricing.compare.values.multipleDomains")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.analyticsDashboard")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">{t("pricing.compare.groups.support")}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.emailSupport")}</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.prioritySupport")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.dedicatedManager")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{t("pricing.compare.rows.slaGuarantee")}</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="mx-auto h-5 w-5 text-blue-600" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">{t("pricing.faq.title")}</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="rounded-lg border bg-white px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {t("pricing.faq.trial.question")}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-600">
                  {t("pricing.faq.trial.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-lg border bg-white px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {t("pricing.faq.limit.question")}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-600">
                  {t("pricing.faq.limit.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-lg border bg-white px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {t("pricing.faq.change.question")}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-600">
                  {t("pricing.faq.change.answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-lg border bg-white px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {t("pricing.faq.security.question")}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-600">
                  {t("pricing.faq.security.answer")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">{t("pricing.cta.ready")}</h2>
            <p className="mb-6 px-4 text-lg text-blue-100 sm:mb-8 sm:text-xl">{t("pricing.cta.join")}</p>
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100 sm:px-8"
            >
              {t("pricing.cta.startTrial")}
            </a>
          </div>
        </div>

        {/* Related Pages */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{t("pricing.related.title")}</h2>
              <p className="text-gray-600">{t("pricing.related.subtitle")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link href={`${langPrefix}/features`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("pricing.related.cards.features.title")}</h3>
                  <p className="text-sm text-gray-600">{t("pricing.related.cards.features.description")}</p>
                </div>
              </Link>

              <Link href={`${langPrefix}/compliance-software`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("pricing.related.cards.compliance.title")}</h3>
                  <p className="text-sm text-gray-600">{t("pricing.related.cards.compliance.description")}</p>
                </div>
              </Link>

              <Link href={`${langPrefix}/vs-speakup`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{t("pricing.related.cards.compare.title")}</h3>
                  <p className="text-sm text-gray-600">{t("pricing.related.cards.compare.description")}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default PricingContent;

