"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Script from "next/script";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function ContactContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
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

  return (
    <I18nProvider>
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
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{t("contact.info.title")}</h2>
                <p className="text-lg text-gray-600">{t("contact.info.description")}</p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t("contact.info.email.title")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.email.response")}</p>
                    <a href="mailto:team@disclosurely.com" className="text-blue-600 underline">
                      team@disclosurely.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t("contact.info.phone.title")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.phone.hours")}</p>
                    <span className="text-gray-700">+44 (0)20 1234 5678</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t("contact.info.address.title")}</h3>
                    <p className="text-gray-600">
                      {t("contact.info.address.line1")}
                      <br />
                      {t("contact.info.address.line2")}
                      <br />
                      {t("contact.info.address.line3")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{t("contact.info.enterprise.title")}</h3>
                <p className="text-gray-600 text-sm">{t("contact.info.enterprise.description")}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("contact.form.title")}</CardTitle>
                <CardDescription>{t("contact.form.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" ? (
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-green-800 font-semibold">
                      {t("contact.form.success") || "Thank you! Your message has been sent. We'll get back to you within 24 hours."}
                    </p>
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
                        // Execute reCAPTCHA
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
                        setFormData({ name: "", email: "", company: "", message: "" });
                      } catch (error) {
                        setSubmitStatus("error");
                        setErrorMessage(
                          error instanceof Error
                            ? error.message
                            : "Failed to send message. Please try again."
                        );
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
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
                      />
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
                    {submitStatus === "error" && errorMessage && (
                      <div className="rounded-lg bg-red-50 p-3">
                        <p className="text-sm text-red-800">{errorMessage}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting
                        ? t("contact.form.submitting") || "Sending..."
                        : t("contact.form.submit")}
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

