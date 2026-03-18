"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Shield,
  Lock,
  Users,
  Globe,
  FileText,
  MessageSquare,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";
import { trackEvent } from "@/lib/events/trackEvent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Lang = (typeof supportedLanguages)[number];

const SIGNUP_URL = "https://app.disclosurely.com/auth/signup";

function DirectiveContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
  useGeographicalLanguage();
  const pageViewFired = useRef(false);

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (pageViewFired.current) return;
    pageViewFired.current = true;
    trackEvent("directive_page_view", { page: "/whistleblowing-directive" });
  }, []);

  const handleSignupClick = () => {
    trackEvent("signup_click", { location: "directive_page" });
  };

  const handleDemoClick = () => {
    trackEvent("demo_click", { location: "directive_page" });
  };

  const contactHref = `${langPrefix}/contact`;

  return (
    <I18nProvider>
      <div className="bg-white">
        {/* 1. Hero */}
        <section className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {t("directive.hero.badge")}
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {t("directive.hero.title")}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
              {t("directive.hero.subtitle")}
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignupClick();
                  window.location.href = SIGNUP_URL;
                }}
              >
                {t("directive.hero.startFreeTrial")}
              </a>
              <Link
                href={contactHref}
                className="w-full rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
                onClick={handleDemoClick}
              >
                {t("directive.hero.bookDemo")}
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 sm:gap-6">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                {t("directive.hero.reassurance.anonymous")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                {t("directive.hero.reassurance.secureCase")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                {t("directive.hero.reassurance.sevenDay")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                {t("directive.hero.reassurance.ninetyDay")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                {t("directive.hero.reassurance.multilingual")}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Who needs to comply */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.whoComplies.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.whoComplies.card1Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.whoComplies.card1Desc")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.whoComplies.card2Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.whoComplies.card2Desc")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.whoComplies.card3Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.whoComplies.card3Desc")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.whoComplies.card4Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.whoComplies.card4Desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. What the Directive requires */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.requirements.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-gray-600">
              {t("directive.requirements.subtitle")}
            </p>
            <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">{t(`directive.requirements.item${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Risk of non-compliance */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.risks.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { titleKey: "item1Title", descKey: "item1Desc" },
                { titleKey: "item2Title", descKey: "item2Desc" },
                { titleKey: "item3Title", descKey: "item3Desc" },
                { titleKey: "item4Title", descKey: "item4Desc" },
                { titleKey: "item5Title", descKey: "item5Desc" },
              ].map(({ titleKey, descKey }, idx) => (
                <div key={idx} className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{t(`directive.risks.${titleKey}`)}</h3>
                    <p className="mt-1 text-gray-600">{t(`directive.risks.${descKey}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What a compliant system needs */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.systemNeeds.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-gray-600">
              {t("directive.systemNeeds.subtitle")}
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card1Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card1Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card1Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card1Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card1Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card2Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card2Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card2Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card2Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card2Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card3Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card3Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card3Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card3Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card3Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card4Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card4Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card4Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card4Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card4Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card5Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card5Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card5Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card5Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card5Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.systemNeeds.card6Title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{t("directive.systemNeeds.card6Desc")}</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card6Bullet1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card6Bullet2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      {t("directive.systemNeeds.card6Bullet3")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. How Disclosurely helps */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.howWeHelp.title")}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-gray-600">
              {t("directive.howWeHelp.subtitle")}
            </p>
            <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">{t(`directive.howWeHelp.item${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Mid-page CTA */}
        <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">{t("directive.midCta.title")}</h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-blue-600 transition-colors hover:bg-gray-100 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignupClick();
                  window.location.href = SIGNUP_URL;
                }}
              >
                {t("directive.midCta.startFreeTrial")}
              </a>
              <Link
                href={contactHref}
                className="w-full rounded-lg border border-white/30 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                onClick={handleDemoClick}
              >
                {t("directive.midCta.talkToTeam")}
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Business impact */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.impact.title")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.impact.card1Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.impact.card1Desc")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.impact.card2Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.impact.card2Desc")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{t("directive.impact.card3Title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t("directive.impact.card3Desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 9. Getting started checklist */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("directive.gettingStarted.title")}
            </h2>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-gray-700">{t(`directive.gettingStarted.item${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="bg-blue-600 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t("directive.finalCta.title")}</h2>
            <p className="mb-6 text-lg text-blue-100">{t("directive.finalCta.subtitle")}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-blue-600 transition-colors hover:bg-gray-100 sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignupClick();
                  window.location.href = SIGNUP_URL;
                }}
              >
                {t("directive.finalCta.startFreeTrial")}
              </a>
              <Link
                href={contactHref}
                className="w-full rounded-lg border border-white/30 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                onClick={handleDemoClick}
              >
                {t("directive.finalCta.bookDemo")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default DirectiveContent;
