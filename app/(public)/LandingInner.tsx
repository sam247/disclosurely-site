"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { ShieldCheck, CheckCircle, CheckCircle2, MessageSquare, Brain, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import TypingAnimation from "@/components/TypingAnimation";
import I18nProvider from "@/components/I18nProvider";
import BlogSection from "@/components/BlogSection";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";

const businessLogos = [
  { src: "/business_logos/page-1.png", alt: "Business Partner 1" },
  { src: "/business_logos/page-2.png", alt: "Business Partner 2" },
  { src: "/business_logos/page-3.png", alt: "Business Partner 3" },
  { src: "/business_logos/page-4.png", alt: "Business Partner 4" },
  { src: "/business_logos/page-5.png", alt: "Business Partner 5" },
  { src: "/business_logos/page-6.png", alt: "Business Partner 6" },
  { src: "/business_logos/page-7.png", alt: "Business Partner 7" },
  { src: "/business_logos/page-8.png", alt: "Business Partner 8" },
];

const featureIcons = [
  "/assets/icons/anonymous_reporting.png",
  "/assets/icons/secure_messaging.png",
  "/assets/icons/case_management.png",
  "/assets/icons/multi-user_access.png",
  "/assets/icons/regulatory_compliance.png",
  "/assets/icons/enterprise_security.png",
];

const highlightIcons = [
  <ShieldCheck key="shield" className="h-6 w-6 text-blue-600" />,
  <ShieldCheck key="shield2" className="h-6 w-6 text-blue-600" />,
  <CheckCircle2 key="check" className="h-6 w-6 text-blue-600" />,
  <MessageSquare key="msg" className="h-6 w-6 text-blue-600" />,
  <Brain key="brain" className="h-6 w-6 text-blue-600" />,
];

function LandingInner() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const { langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();

  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  const handleStartTrial = (location: string, plan?: string) => {
    track("start_free_trial", { location, plan, billingInterval });
    window.location.href = "https://app.disclosurely.com/auth/signup";
  };

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

  useEffect(() => {
    const langSegment = pathname?.split("/")[1];
    if (langSegment && supportedLanguages.includes(langSegment as Lang)) {
      i18n.changeLanguage(langSegment as Lang);
    } else {
      i18n.changeLanguage("en");
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language || "en";
    }
  }, [pathname, i18n]);

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

  const steps = useMemo(
    () => [
      {
        title: t("landing.howItWorks.step1.title"),
        description: t("landing.howItWorks.step1.description"),
      },
      {
        title: t("landing.howItWorks.step2.title"),
        description: t("landing.howItWorks.step2.description"),
      },
      {
        title: t("landing.howItWorks.step3.title"),
        description: t("landing.howItWorks.step3.description"),
      },
    ],
    [t],
  );

  const highlights = useMemo(
    () => [
      {
        title: t("landing.anonymousReporting.title"),
        description: t("landing.anonymousReporting.description"),
        additionalContent: [
          "Anonymous reports are submitted via a simple, browser-based whistleblower form that works on any device, so people can speak up quickly and safely from anywhere. Behind the scenes, cases are routed into your whistleblower software workspace, giving case handlers a centralised view of every report, clear audit trails, and deadlines for acknowledgement, follow-up, and resolution.",
        ],
        bullets: [
          t("landing.anonymousReporting.benefit1"),
          t("landing.anonymousReporting.benefit2"),
          t("landing.anonymousReporting.benefit3"),
        ],
        image: "/assets/artwork/new_anonymous_reporting_made_simple.jpeg",
      },
      {
        title: t("landing.encryption.title"),
        description: t("landing.encryption.description"),
        bullets: [
          t("landing.encryption.benefit1"),
          t("landing.encryption.benefit2"),
          t("landing.encryption.benefit3"),
        ],
        image: "/assets/artwork/new_military_grade_encryption.jpeg",
      },
      {
        title: t("landing.compliance.title"),
        description: t("landing.compliance.description"),
        bullets: [
          t("landing.compliance.benefit1"),
          t("landing.compliance.benefit2"),
          t("landing.compliance.benefit3"),
        ],
        image: "/assets/artwork/new_compliance_made_easy.jpeg",
      },
      {
        title: t("landing.messaging.title"),
        description: t("landing.messaging.description"),
        bullets: [
          t("landing.messaging.benefit1"),
          t("landing.messaging.benefit2"),
          t("landing.messaging.benefit3"),
        ],
        image: "/assets/artwork/new_secure_two_way_communication.jpeg",
      },
      {
        title: t("landing.aiPowered.title"),
        description: t("landing.aiPowered.description"),
        bullets: [
          t("landing.aiPowered.benefit1"),
          t("landing.aiPowered.benefit2"),
          t("landing.aiPowered.benefit3"),
        ],
        image: "/assets/artwork/new_ai_powered_case_analysis.jpeg",
      },
    ],
    [t],
  );


  return (
    <I18nProvider>
      <div className="bg-white">
        {/* Hero */}
        <section className="px-4 pb-20 pt-[100px] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-medium">{t("landing.hero.badge")}</span>
              </div>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-5xl">
              {t("landing.hero.title1")}
              <span className="mt-2 block text-blue-600">
                <TypingAnimation
                  phrases={(t("landing.hero.typingPhrases", { returnObjects: true }) as string[]) || []}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                />
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">{t("landing.hero.subtitle")}</p>
            <div className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="w-full rounded-lg bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                onClick={() => handleStartTrial("landing_hero")}
              >
                {t("landing.hero.startFreeTrial")}
              </a>
              <Link
                href={`${langPrefix}/pricing`}
                className="w-full rounded-lg border border-gray-300 px-8 py-3 text-center text-lg font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
              >
                {t("landing.hero.viewPricing")}
              </Link>
            </div>

            <div className="mt-16">
              <p className="mb-12 text-lg font-medium text-gray-700">{t("landing.trusted")}</p>
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8">
                {businessLogos.map((logo) => (
                  <div key={logo.src} className="flex-shrink-0">
                    <Image src={logo.src} alt={logo.alt} width={140} height={48} className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.features.title")}</h2>
              <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">{t("landing.features.subtitle")}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16">
                      <Image src={feature.icon} alt={feature.title} width={64} height={64} className="h-full w-full object-contain" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.howItWorks.title")}</h2>
              <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">{t("landing.howItWorks.subtitle")}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl space-y-16 sm:space-y-20 px-4 sm:px-6 lg:px-8">
            {highlights.map((item, index) => (
              <div key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{item.title}</h3>
                  <p className="mb-4 text-gray-700">{item.description}</p>
                  {item.additionalContent && (
                    <div className="mb-4 space-y-4 text-gray-700">
                      {item.additionalContent.map((paragraph, idx) => (
                        <p key={idx} className="text-base leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  <ul className="space-y-2 text-gray-700">
                    {item.bullets.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                    <Image src={item.image} alt={item.title} width={1200} height={720} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Branding */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <Image src="/assets/artwork/new_branding.jpeg" alt={t("landing.branding.imageAlt")} width={600} height={600} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.branding.title")}</h2>
                <p className="mb-6 text-lg text-gray-600">{t("landing.branding.description")}</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>{t("landing.branding.point1")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>{t("landing.branding.point2")}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>{t("landing.branding.point3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.pricing.title")}</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-700">{t("landing.pricing.subtitle")}</p>
            </div>
            <div className="mb-8 flex justify-center">
              <Tabs value={billingInterval} onValueChange={(v) => setBillingInterval(v as "monthly" | "annual")} className="w-auto">
                <TabsList className="inline-flex items-center gap-2 rounded-full bg-gray-100 p-1 shadow-sm">
                  <TabsTrigger value="monthly" className="flex h-11 items-center justify-center rounded-full px-5 text-sm sm:text-base">
                    {t("pricing.billingInterval.monthly")}
                  </TabsTrigger>
                  <TabsTrigger value="annual" className="flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm sm:text-base">
                    <span>{t("pricing.billingInterval.annual")}</span>
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

        {/* Testimonials */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.testimonials.title")}</h2>
              <p className="text-lg text-gray-600 sm:text-xl">{t("landing.testimonials.subtitle")}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {["testimonial1", "testimonial2", "testimonial3"].map((key) => (
                <Card key={key}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mb-4 text-gray-600">{t(`landing.testimonials.${key}.quote`)}</p>
                    <div className="font-medium text-gray-900">{t(`landing.testimonials.${key}.name`)}</div>
                    <div className="text-sm text-gray-500">{t(`landing.testimonials.${key}.role`)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                {t("landing.certifications.title")}
              </h2>
              <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">{t("landing.certifications.subtitle")}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
              {[
                { src: "/lovable-uploads/9762866a-d8d9-4860-bf30-3ffd178885a8.png", title: "ISO 27001", desc: "Information Security Management" },
                { src: "/lovable-uploads/70aa6ac0-c161-4167-921d-79f08f6f4b02.png", title: "GDPR", desc: "Data Protection Compliance" },
                { src: "/lovable-uploads/a9716d48-ff27-4193-b51c-9b035d1692b0.png", title: "AICPA SOC", desc: "Service Organization Controls" },
              ].map((badge) => (
                <div key={badge.title} className="text-center">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                    <Image src={badge.src} alt={badge.title} width={64} height={64} className="mx-auto mb-3 h-16 w-16" />
                    <h3 className="mb-1 font-semibold text-gray-900">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.faq.title")}</h2>
              <p className="text-lg text-gray-600">{t("landing.faq.subtitle")}</p>
            </div>
            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <AccordionItem key={n} value={`item-${n}`} className="rounded-lg border bg-white px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {t(`landing.faq.question${n}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-700">{t(`landing.faq.question${n}.answer`)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-12 text-white sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t("landing.cta.title")}</h2>
            <p className="mb-6 text-blue-100 sm:mb-8 sm:text-xl">{t("landing.cta.description")}</p>
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              {t("landing.cta.button")}
            </a>
          </div>
        </section>

        <CookieConsentBanner />
      </div>
    </I18nProvider>
  );
}

export default LandingInner;

