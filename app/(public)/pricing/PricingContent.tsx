"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
          t("pricing.features.customIntegrations"),
          t("pricing.features.api"),
        ],
        missing: [],
        cta: null,
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
              Start Free. Get Secure Whistleblowing.
            </h1>
            <p className="mb-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t("pricing.hero.subtitle1")}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("pricing.hero.subtitle2")}
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

        {/* Trust Indicators */}
        <section className="border-b border-gray-200 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-12 sm:w-12">
                  <CheckCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 sm:text-lg">{t("pricing.trustIndicators.guarantee.title")}</div>
                  <div className="text-xs text-gray-600 sm:text-sm">{t("pricing.trustIndicators.guarantee.description")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-12 sm:w-12">
                  <CheckCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 sm:text-lg">{t("pricing.trustIndicators.ukBusiness.title")}</div>
                  <div className="text-xs text-gray-600 sm:text-sm">{t("pricing.trustIndicators.ukBusiness.description")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 sm:h-12 sm:w-12">
                  <CheckCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 sm:text-lg">{t("pricing.trustIndicators.enterpriseSecurity.title")}</div>
                  <div className="text-xs text-gray-600 sm:text-sm">{t("pricing.trustIndicators.enterpriseSecurity.description")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Billing Interval Tabs */}
            <div className="mb-8 flex justify-center">
              <Tabs value={billingInterval} onValueChange={(v) => setBillingInterval(v as "monthly" | "annual")} className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly" className="text-sm sm:text-base">
                    {t("pricing.billingInterval.monthly")}
                  </TabsTrigger>
                  <TabsTrigger value="annual" className="text-sm sm:text-base">
                    {t("pricing.billingInterval.annual")}
                    <Badge className="ml-2 bg-green-600 px-1.5 py-0 text-[10px] text-white">{t("pricing.billingInterval.save")}</Badge>
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
                <span className="font-semibold text-gray-900">7-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold text-gray-900">Cancel Anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials & Benefits Section */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
              {/* Testimonial */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 text-6xl font-bold leading-none text-blue-600">"</div>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Disclosurely has transformed how we handle sensitive reports. The platform is intuitive, secure, and our
                  employees feel confident reporting issues. Implementation was seamless and the support team was
                  excellent.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 font-semibold text-white">
                    SJ
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Chief Compliance Officer</div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg">
                <h3 className="mb-6 text-2xl font-bold">Why Organizations Choose Disclosurely</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="mb-1 text-xl font-semibold">35% Faster Resolution</div>
                      <div className="text-sm text-blue-100">AI-powered case analysis speeds up investigations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="mb-1 text-xl font-semibold">100% Compliance Ready</div>
                      <div className="text-sm text-blue-100">ISO 27001, GDPR, SOX compliant out of the box</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="mb-1 text-xl font-semibold">Enterprise-Grade Security</div>
                      <div className="text-sm text-blue-100">Military-grade encryption and tamper-evident audit logs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Enterprise-grade security for every team
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Your data is protected with industry-leading security standards and compliance certifications.
                </p>
                <Button variant="outline" size="lg" className="border-gray-300">
                  Learn more about security
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">Zero data retention by third-party LLMs</div>
                    <div className="text-sm text-gray-600">Your data never leaves our secure infrastructure</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">Private AI model</div>
                    <div className="text-sm text-gray-600">Dedicated AI processing for enhanced privacy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">SOC 2 Type II & GDPR Ready</div>
                    <div className="text-sm text-gray-600">Certified compliance with industry standards</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">Data encryption in transit and at rest</div>
                    <div className="text-sm text-gray-600">AES-256 encryption for maximum protection</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">Role-based access control</div>
                    <div className="text-sm text-gray-600">Granular permissions for team members</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">SAML-based SSO & SCIM provisioning</div>
                    <div className="text-sm text-gray-600">Enterprise identity management integration</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
                  <div>
                    <div className="mb-1 font-semibold text-gray-900">IP Whitelisting</div>
                    <div className="text-sm text-gray-600">Restrict access to approved IP addresses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Feature Comparison */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Compare All Features</h2>
              <p className="text-lg text-gray-600">See exactly what's included in each plan</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full rounded-lg bg-white shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Reporting
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Reports per Month</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Storage per Report</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Security & Compliance
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Military-Grade Encryption (AES-GCM)</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">GDPR Compliant</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">Audit Trail</td>
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
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      AI Features
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">AI Case Analysis (DeepSeek)</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">AI Risk Assessment</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">AI Chat Support</td>
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
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Communication
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Two-Way Messaging</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">Anonymous Report Submission</td>
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
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Team & Collaboration
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Team Members</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">5</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">20</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Unlimited</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Automated Assignment Rules</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">SLA Management</td>
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
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Customization
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Custom Branding</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">Custom Domain (CNAME)</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">1 domain</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Multiple domains</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Real-time Analytics Dashboard</td>
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
                    <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                      Support
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Email Support</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">Priority Support</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">Dedicated Account Manager</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">SLA Guarantee</td>
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
              <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Explore More</h2>
              <p className="text-gray-600">Learn more about our platform and solutions</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link href={`${langPrefix}/features`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    Platform Features
                  </h3>
                  <p className="text-sm text-gray-600">
                    Explore all features included in your plan - anonymous reporting, AI case analysis, and secure
                    messaging.
                  </p>
                </div>
              </Link>

              <Link href={`${langPrefix}/compliance-software`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    Compliance Software
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover how our compliance software helps you meet GDPR, ISO 27001, and EU Directive
                    requirements.
                  </p>
                </div>
              </Link>

              <Link href={`${langPrefix}/vs-speakup`} className="group block">
                <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    Compare Solutions
                  </h3>
                  <p className="text-sm text-gray-600">
                    See how Disclosurely compares to other whistleblowing platforms like SpeakUp and competitors.
                  </p>
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

