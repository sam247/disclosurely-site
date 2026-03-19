"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import Script from "next/script";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";
import { trackEvent } from "@/lib/events/trackEvent";
import { cn } from "@/lib/utils";

type Lang = (typeof supportedLanguages)[number];

const ENQUIRY_TYPES = ["demo", "pricing", "compliance", "rollout", "enterprise", "general"] as const;
const ORG_SIZE_OPTIONS = [
  { value: "", labelKey: null as null | "1_50" | "51_250" | "251_1000" | "1000_plus" },
  { value: "1-50", labelKey: "1_50" as const },
  { value: "51-250", labelKey: "51_250" as const },
  { value: "251-1000", labelKey: "251_1000" as const },
  { value: "1000+", labelKey: "1000_plus" as const },
] as const;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const initialForm = {
  name: "",
  email: "",
  company: "",
  enquiryType: "" as string,
  organisationSize: "" as string,
  message: "",
};

function ContactContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang as Lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    if (!recaptchaLoaded || typeof window === "undefined" || !window.grecaptcha) {
      return null;
    }

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!recaptchaSiteKey) {
      return null;
    }

    try {
      return await window.grecaptcha.execute(recaptchaSiteKey, { action: "contact_form" });
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      return null;
    }
  }, [recaptchaLoaded]);

  const helpKeys = ["walkthrough", "pricing", "compliance", "rollout", "enterpriseSetups"] as const;

  const selectClass = cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50"
  );

  return (
    <I18nProvider>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onLoad={() => {
            if (window.grecaptcha) {
              window.grecaptcha.ready(() => {
                setRecaptchaLoaded(true);
              });
            }
          }}
          strategy="lazyOnload"
        />
      )}
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {t("contact.hero.tag")}
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">{t("contact.hero.title")}</h1>
            <p className="text-lg text-gray-600">{t("contact.hero.description")}</p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">
            <div className="space-y-6">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">{t("contact.help.title")}</h2>
                <p className="text-base text-gray-600">{t("contact.help.intro")}</p>
                <button
                  type="button"
                  onClick={() => {
                    window.Calendly?.initPopupWidget({ url: "https://calendly.com/disclosurely/30min" });
                    trackEvent("book_demo_click", { location: "contact_help" });
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700"
                >
                  {t("contact.help.bookDemo")}
                </button>
              </div>

              <ul className="space-y-4">
                {helpKeys.map((key) => (
                  <li key={key} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" aria-hidden />
                    </span>
                    <p className="pt-1 text-base text-gray-700">{t(`contact.help.items.${key}`)}</p>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("contact.enterpriseCard.title")}</h3>
                <p className="text-sm text-gray-600">{t("contact.enterpriseCard.description")}</p>
              </div>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
                <CardDescription>{t("contact.form.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" ? (
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="font-semibold text-green-800">{t("contact.form.success")}</p>
                  </div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      setSubmitStatus("idle");
                      setErrorMessage("");

                      try {
                        const recaptchaToken = await executeRecaptcha();

                        const response = await fetch("/api/contact", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ...formData,
                            recaptchaToken,
                          }),
                        });

                        const data = await response.json();

                        if (!response.ok) {
                          throw new Error(data.error || "Failed to send message");
                        }

                        setSubmitStatus("success");
                        setFormData({ ...initialForm });
                        trackEvent("demo_booked", {
                          location: "contact_page",
                          enquiry_type: formData.enquiryType || undefined,
                        });
                      } catch (error) {
                        setSubmitStatus("error");
                        setErrorMessage(
                          error instanceof Error ? error.message : "Failed to send message. Please try again."
                        );
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="enquiryType">
                        {t("contact.form.enquiryType.label")}
                      </label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        className={selectClass}
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">{t("contact.form.enquiryType.placeholder")}</option>
                        {ENQUIRY_TYPES.map((value) => (
                          <option key={value} value={value}>
                            {t(`contact.form.enquiryType.options.${value}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
                        {t("contact.form.name.label")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("contact.form.name.placeholder")}
                        required
                        disabled={isSubmitting}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
                        {t("contact.form.email.label")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("contact.form.email.placeholder")}
                        required
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="company">
                        {t("contact.form.company.label")}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t("contact.form.company.placeholder")}
                        disabled={isSubmitting}
                        autoComplete="organization"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="organisationSize">
                        {t("contact.form.organisationSize.label")}
                      </label>
                      <select
                        id="organisationSize"
                        name="organisationSize"
                        className={selectClass}
                        value={formData.organisationSize}
                        onChange={(e) => setFormData({ ...formData, organisationSize: e.target.value })}
                        disabled={isSubmitting}
                      >
                        {ORG_SIZE_OPTIONS.map(({ value, labelKey: lk }) => (
                          <option key={value || "unspecified"} value={value}>
                            {lk ? t(`contact.form.organisationSize.options.${lk}`) : t("contact.form.organisationSize.placeholder")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="message">
                        {t("contact.form.message.label")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t("contact.form.message.placeholder")}
                        rows={4}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <ul className="flex flex-col gap-2 rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-gray-700 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                      <li className="flex min-w-0 flex-1 items-start gap-2 sm:min-w-[12rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" aria-hidden />
                        <span className="leading-snug">{t("contact.form.reassurance.response")}</span>
                      </li>
                      <li className="flex min-w-0 flex-1 items-start gap-2 sm:min-w-[12rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" aria-hidden />
                        <span className="leading-snug">{t("contact.form.reassurance.noPressure")}</span>
                      </li>
                      <li className="flex min-w-0 flex-1 items-start gap-2 sm:min-w-[12rem]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" aria-hidden />
                        <span className="leading-snug">{t("contact.form.reassurance.tailored")}</span>
                      </li>
                    </ul>

                    {submitStatus === "error" && errorMessage && (
                      <div className="rounded-lg bg-red-50 p-3">
                        <p className="text-sm text-red-800">{errorMessage}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                    </button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default ContactContent;
