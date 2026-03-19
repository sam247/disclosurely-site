"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import {
  Shield,
  ShieldCheck,
  FileCheck,
  ScrollText,
  ClipboardList,
  CheckCircle,
  CheckCircle2,
  MessageSquare,
  Brain,
  X,
} from "lucide-react";

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
import { trackEvent } from "@/lib/events/trackEvent";

const businessLogos = [
  { src: "/business_logos/page-1.png", alt: "Business Partner 1" },
  { src: "/business_logos/page-2.png", alt: "Business Partner 2" },
  { src: "/business_logos/page-3.png", alt: "Business Partner 3" },
  { src: "/business_logos/page-4.png", alt: "Business Partner 4" },
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

const commitmentCardIcons = [Shield, FileCheck, ScrollText, ClipboardList] as const;

type CommitmentCardItem = {
  name: string;
  description: string;
  status: "inPlace" | "inProgress";
};

/** Split copy at full stops so each sentence can sit in its own block next to feature imagery. */
function splitTextAtFullStops(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Helper function to format bullet points: bold beginning keywords and remove links from them
function formatBulletPoint(point: string | React.ReactNode): React.ReactNode {
  // Extract full text from point (handling JSX with Links)
  let fullText = "";
  if (typeof point === "string") {
    fullText = point;
  } else if (React.isValidElement(point)) {
    // Extract text from JSX, including Link components
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<{ children?: React.ReactNode }>;
        if (element.type === Link) {
          // Extract text from Link children
          return React.Children.toArray(element.props.children || [])
            .map(extractText)
            .join("");
        }
        return React.Children.toArray(element.props.children || [])
          .map(extractText)
          .join("");
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      return "";
    };
    fullText = extractText(point);
  } else {
    return point;
  }

  // Find the first phrase (usually ends at "that", "so", "to", or comma, but not inside parentheses)
  // Try to match common patterns: "keyword that/so/to rest" or "keyword, rest"
  let match = fullText.match(/^([^,]+?)(\s+(?:that|so|to)\s+)(.+)$/);
  if (!match) {
    // Try comma pattern but be careful with parentheses
    match = fullText.match(/^([^,()]+(?:\([^)]*\))?[^,()]*?)(,\s+)(.+)$/);
  }
  if (match) {
    const [, keyword, separator, rest] = match;
    return (
      <>
        <strong>{keyword.trim()}</strong>
        {separator}
        {rest}
      </>
    );
  }

  // If no separator found, try to find first 2-4 words as keywords
  const words = fullText.split(/\s+/);
  if (words.length > 3) {
    const keywordWords = words.slice(0, 3).join(" ");
    const rest = words.slice(3).join(" ");
    return (
      <>
        <strong>{keywordWords}</strong> {rest}
      </>
    );
  }

  return point;
}

function LandingInner() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const { langPrefix } = useLanguageFromUrl();
  useGeographicalLanguage();

  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const pageViewFired = useRef(false);

  useEffect(() => {
    if (pageViewFired.current) return;
    pageViewFired.current = true;
    trackEvent("landing_view", { page: "/" });
  }, []);

  const handleStartTrial = (location: string, plan?: string) => {
    const specLocation =
      location === "landing_hero" || location === "landing_cta" ? "hero" : location === "pricing_plan" ? "pricing" : location;
    trackEvent("signup_click", { location: specLocation });
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
          t("pricing.features.webhooks"),
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
        description: "",
        additionalContent: [t("landing.highlights.anonymousReporting.additionalContent")],
        bullets: [
          t("landing.highlights.anonymousReporting.bullet1"),
          t("landing.highlights.anonymousReporting.bullet2"),
          t("landing.highlights.anonymousReporting.bullet3"),
        ],
        image: "/assets/artwork/new_anonymous_reporting_made_simple.jpeg",
      },
      {
        title: t("landing.encryption.title"),
        description: "",
        additionalContent: [t("landing.highlights.encryption.additionalContent")],
        bullets: [
          t("landing.highlights.encryption.bullet1"),
          t("landing.highlights.encryption.bullet2"),
          t("landing.highlights.encryption.bullet3"),
        ],
        image: "/assets/artwork/new_military_grade_encryption.jpeg",
      },
      {
        title: t("landing.compliance.title"),
        description: "",
        additionalContent: [t("landing.highlights.compliance.additionalContent")],
        bullets: [
          t("landing.highlights.compliance.bullet1"),
          t("landing.highlights.compliance.bullet2"),
          t("landing.highlights.compliance.bullet3"),
        ],
        image: "/assets/artwork/new_compliance_made_easy.jpeg",
      },
      {
        title: t("landing.messaging.title"),
        description: "",
        additionalContent: [t("landing.highlights.messaging.additionalContent")],
        bullets: [
          t("landing.highlights.messaging.bullet1"),
          t("landing.highlights.messaging.bullet2"),
          t("landing.highlights.messaging.bullet3"),
        ],
        image: "/assets/artwork/new_secure_two_way_communication.jpeg",
      },
      {
        title: t("landing.aiPowered.title"),
        description: "",
        additionalContent: [t("landing.highlights.aiPowered.additionalContent")],
        bullets: [
          t("landing.highlights.aiPowered.bullet1"),
          t("landing.highlights.aiPowered.bullet2"),
          t("landing.highlights.aiPowered.bullet3"),
        ],
        image: "/assets/artwork/new_ai_powered_case_analysis.jpeg",
      },
    ],
    [t],
  );

  const commitmentItems = useMemo(() => {
    const raw = t("securityPage.commitments.items", { returnObjects: true });
    if (!Array.isArray(raw)) return [] as CommitmentCardItem[];
    return raw as CommitmentCardItem[];
  }, [t, i18n.language]);

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
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 sm:text-5xl">
              {t("landing.hero.title1")}
              <span className="mt-2 flex w-full justify-center overflow-hidden text-blue-600">
                <span className="flex min-h-[1.4em] w-full items-center justify-center sm:hidden">
                  {t("landing.hero.mobilePhrase")}
                </span>
                <span className="hidden min-h-[1.4em] w-full items-center justify-center overflow-hidden sm:flex">
                  <TypingAnimation
                    phrases={(t("landing.hero.typingPhrases", { returnObjects: true }) as string[]) || []}
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseDuration={2000}
                  />
                </span>
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-3xl px-4 text-lg text-gray-700 sm:text-xl whitespace-pre-line">{t("landing.hero.subtitle")}</p>
            <ul className="mx-auto mb-8 flex max-w-full flex-nowrap justify-start gap-x-4 overflow-x-auto px-4 pb-1 text-left text-sm text-gray-700 sm:justify-center sm:gap-x-5 sm:text-base md:text-lg [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {((t("landing.hero.bullets", { returnObjects: true }) as string[]) || []).map((bullet) => (
                <li key={bullet} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="w-full rounded-lg bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                onClick={() => handleStartTrial("landing_hero")}
              >
                {t("landing.hero.startFreeTrial")}
              </a>
              <Link
                href={`${langPrefix}/contact`}
                className="w-full rounded-lg border border-gray-300 px-8 py-3 text-center text-lg font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
              >
                {t("landing.hero.bookDemo")}
              </Link>
            </div>

            <div className="mt-16">
              <p className="mb-12 text-lg font-medium text-gray-700">{t("landing.trusted")}</p>
              <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-8 overflow-x-auto px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {businessLogos.map((logo) => (
                  <div key={logo.src} className="flex-shrink-0">
                    <Image src={logo.src} alt={logo.alt} width={140} height={48} className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100" loading="lazy" />
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
                      <Image src={feature.icon} alt={feature.title} width={64} height={64} className="h-full w-full object-contain" loading="lazy" />
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.highlights.sectionTitle")}</h2>
              <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">
                {t("landing.highlights.sectionSubtitle")}
              </p>
            </div>
            <div className="space-y-32 sm:space-y-40">
            {highlights.map((item, index) => (
              <div key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{item.title}</h3>
                  {item.description && <p className="mb-4 text-gray-700">{item.description}</p>}
                  {item.additionalContent && (
                    <div className="mb-4 space-y-4 text-gray-700">
                      {item.additionalContent.flatMap((paragraph, idx) =>
                        splitTextAtFullStops(paragraph).map((block, j) => (
                          <p key={`${idx}-${j}`} className="text-base leading-relaxed">
                            {block}
                          </p>
                        )),
                      )}
                    </div>
                  )}
                  <ul className="space-y-2 text-gray-700">
                    {item.bullets.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                    <Image src={item.image} alt={item.title} width={1200} height={720} className="h-full w-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* Custom Branding */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <Image src="/assets/artwork/new_branding.jpeg" alt={t("landing.branding.imageAlt")} width={600} height={600} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.branding.title")}</h2>
                <p className="mb-6 text-lg text-gray-600">
                  {t("landing.branding.description")}
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <span>{formatBulletPoint(t("landing.branding.point1"))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <span>{formatBulletPoint(t("landing.branding.point2"))}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <span>{formatBulletPoint(t("landing.branding.point3"))}</span>
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
                      {plan.highlights.map((item) => {
                        const isComingSoon = item === t("pricing.features.customIntegrations") || item === t("pricing.features.api") || item === t("pricing.features.webhooks");
                        // Extract text in parentheses at the end (for "coming soon" in various languages)
                        const match = item.match(/^(.+?)\s*\(([^)]+)\)$/);
                        const mainText = match ? match[1] : item;
                        const comingSoonText = match ? ` (${match[2]})` : "";
                        return (
                          <div key={item} className="flex items-center space-x-3">
                            <CheckCircle className={`h-5 w-5 ${isComingSoon ? "text-gray-400" : "text-green-600"}`} />
                            <span className="text-sm text-gray-700 sm:text-base">
                              {mainText}
                              {comingSoonText && <span className="text-xs">{comingSoonText}</span>}
                            </span>
                          </div>
                        );
                      })}
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

        {/* Security & compliance status (same structure as security page commitments) */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("securityPage.commitments.title")}</h2>
              <p className="mx-auto max-w-3xl px-4 text-lg text-gray-600 sm:text-xl">{t("securityPage.commitments.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {commitmentItems.map((cert, index) => {
                const inPlace = cert.status === "inPlace";
                const statusLabel = inPlace
                  ? t("securityPage.commitments.statusInPlace")
                  : t("securityPage.commitments.statusInProgress");
                const IconComponent = commitmentCardIcons[index] ?? Shield;
                return (
                  <Card key={`${cert.name}-${index}`} className="border border-gray-200 p-6 text-center shadow-sm">
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

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("landing.faq.title")}</h2>
              <p className="text-lg text-gray-600">{t("landing.faq.subtitle")}</p>
            </div>
            <Accordion type="single" collapsible defaultValue="item-1" className="grid gap-4 md:grid-cols-2 md:gap-x-6">
              {[1, 5, 2, 6, 3, 7, 4, 8].map((n) => (
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

        {/* Blog Section - de-emphasised */}
        <BlogSection compact />

        {/* CTA */}
        <section className="bg-blue-600 py-12 text-white sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t("landing.cta.title")}</h2>
            <p className="mb-6 text-blue-100 sm:mb-8 sm:text-xl">{t("landing.cta.description")}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="w-full rounded-lg bg-white px-6 py-3 text-center text-lg font-semibold text-blue-600 transition hover:bg-gray-100 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleStartTrial("landing_cta");
                }}
              >
                {t("landing.cta.button")}
              </a>
              <Link
                href={`${langPrefix}/contact`}
                className="w-full rounded-lg border-2 border-white px-6 py-3 text-center text-lg font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                {t("landing.cta.bookDemo")}
              </Link>
            </div>
          </div>
        </section>

        <CookieConsentBanner />
      </div>
    </I18nProvider>
  );
}

export default LandingInner;

