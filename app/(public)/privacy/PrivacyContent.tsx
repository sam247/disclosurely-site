"use client";

import React, { useEffect, useMemo } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

const PERSONAL_SUBSECTIONS = ["customer", "whistleblower", "technical", "marketing"] as const;
const LEGAL_BASE_KEYS = [
  "contractual",
  "legitimate",
  "legal",
  "consent",
  "vitalInterests",
  "publicInterest",
  "whistleblowing",
] as const;
const USAGE_ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
const DISCLOSURE_ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7"] as const;
const SECURITY_ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
const RIGHTS_ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const DATA_RETENTION_KEYS = ["content2", "content3", "content4", "content5", "content6", "content7"] as const;
const ANONYMOUS_KEYS = ["content2", "content3", "content4", "content5"] as const;
const COOKIE_KEYS = ["content2", "content3", "content4", "content5"] as const;
const CHANGES_KEYS = ["content2", "content3", "content4", "content5", "content6"] as const;
const EU_WB_KEYS = ["content2", "content3", "content4", "content5", "content6", "content7", "content8"] as const;

function PrivacyContent() {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang as Lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  const heroBadge = useMemo(() => t("privacy.hero.badge", { defaultValue: t("privacy.hero.title") }), [t, i18n.language]);

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl break-words">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {heroBadge}
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {t("privacy.hero.mainTitle", { defaultValue: t("privacy.hero.title") })}
            </h1>
            <p className="text-lg text-gray-600">{t("privacy.hero.description")}</p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6 break-words">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-sm text-gray-800 shadow-sm">
              <div className="space-y-2">
                <p>
                  <strong>{t("privacy.info.effectiveDate.label")}</strong> {t("privacy.info.effectiveDate.value")}
                </p>
                <p>
                  <strong>{t("privacy.info.company.label")}</strong> {t("privacy.info.company.value")}
                </p>
                <p>
                  <strong>{t("privacy.info.website.label")}</strong>{" "}
                  {t("privacy.info.website.value", { defaultValue: "disclosurely.com" })}
                </p>
                <p>
                  <strong>{t("privacy.info.contact.label")}</strong>{" "}
                  <a href="mailto:privacy@disclosurely.com" className="text-blue-700 underline">
                    privacy@disclosurely.com
                  </a>
                </p>
                <p>
                  <strong>{t("privacy.info.office.label")}</strong> {t("privacy.info.office.value")}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.introduction.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.introduction.content1")}</p>
                  <p>{t("privacy.sections.introduction.content2")}</p>
                  <p>{t("privacy.sections.introduction.content3")}</p>
                  <p>{t("privacy.sections.introduction.content4")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.dataController.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.dataController.content1")}</p>
                  <p>{t("privacy.sections.dataController.content2")}</p>
                  <p>{t("privacy.sections.dataController.content3")}</p>
                  <p>{t("privacy.sections.dataController.content4")}</p>
                  <p>{t("privacy.sections.dataController.content5")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.personalData.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.personalData.content1")}</p>
                <div className="space-y-4 text-gray-700">
                  {PERSONAL_SUBSECTIONS.map((key) => {
                    const items = t(`privacy.sections.personalData.subsections.${key}.items`, {
                      returnObjects: true,
                    }) as Record<string, string>;
                    const itemKeys = Object.keys(items).sort((a, b) => Number(a) - Number(b));
                    return (
                      <div key={key}>
                        <h3 className="font-semibold text-gray-900">
                          {t(`privacy.sections.personalData.subsections.${key}.title`)}
                        </h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {itemKeys.map((itemKey) => (
                            <li key={itemKey}>{items[itemKey]}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.usage.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.usage.content1")}</p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {USAGE_ITEM_KEYS.map((k) => (
                    <li key={k}>{t(`privacy.sections.usage.items.${k}`)}</li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.legalBases.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.legalBases.content1")}</p>
                <div className="space-y-2 text-gray-700">
                  {LEGAL_BASE_KEYS.map((k) => (
                    <p key={k}>
                      <strong>{t(`privacy.sections.legalBases.items.${k}.label`)}</strong>{" "}
                      {t(`privacy.sections.legalBases.items.${k}.content`)}
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.dataHosting.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.dataHosting.content1")}</p>
                  <p>{t("privacy.sections.dataHosting.content2")}</p>
                  <p>{t("privacy.sections.dataHosting.content3")}</p>
                  <p>{t("privacy.sections.dataHosting.content4")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.dataRetention.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.dataRetention.content1")}</p>
                  <ul className="list-disc space-y-2 pl-5">
                    {DATA_RETENTION_KEYS.map((k) => (
                      <li key={k}>{t(`privacy.sections.dataRetention.${k}`)}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.disclosure.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.disclosure.content1")}</p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {DISCLOSURE_ITEM_KEYS.map((k) => (
                    <li key={k}>{t(`privacy.sections.disclosure.items.${k}`)}</li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.security.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.security.content1")}</p>
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  {SECURITY_ITEM_KEYS.map((k) => (
                    <li key={k}>{t(`privacy.sections.security.items.${k}`)}</li>
                  ))}
                </ul>
                <p className="mt-3 text-gray-700">{t("privacy.sections.security.content2")}</p>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.yourRights.title")}
                </h2>
                <p className="mb-3 text-gray-700">{t("privacy.sections.yourRights.content1")}</p>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  {RIGHTS_ITEM_KEYS.map((k) => (
                    <li key={k}>{t(`privacy.sections.yourRights.items.${k}`)}</li>
                  ))}
                </ul>
                <div className="mt-3 space-y-2 text-gray-700">
                  <p>{t("privacy.sections.yourRights.content2")}</p>
                  <p>{t("privacy.sections.yourRights.content3")}</p>
                  <p>{t("privacy.sections.yourRights.content4")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.thirdPartyServices.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.thirdPartyServices.content1")}</p>
                  <p>{t("privacy.sections.thirdPartyServices.content2")}</p>
                  <p>{t("privacy.sections.thirdPartyServices.content3")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.childrenPrivacy.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.childrenPrivacy.content1")}</p>
                  <p>{t("privacy.sections.childrenPrivacy.content2")}</p>
                  <p>{t("privacy.sections.childrenPrivacy.content3")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.anonymousReporting.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.anonymousReporting.content1")}</p>
                  {ANONYMOUS_KEYS.map((k) => (
                    <p key={k}>{t(`privacy.sections.anonymousReporting.${k}`)}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.cookies.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.cookies.content1")}</p>
                  {COOKIE_KEYS.map((k) => (
                    <p key={k}>{t(`privacy.sections.cookies.${k}`)}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.changes.title")}
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>{t("privacy.sections.changes.content1")}</p>
                  {CHANGES_KEYS.map((k) => (
                    <p key={k}>{t(`privacy.sections.changes.${k}`)}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.contact.title")}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>{t("privacy.sections.contact.content1")}</p>
                  <p className="font-medium text-gray-900">{t("privacy.sections.contact.company")}</p>
                  <p>{t("privacy.sections.contact.address")}</p>
                  <p>{t("privacy.sections.contact.content2")}</p>
                  <p>{t("privacy.sections.contact.content3")}</p>
                  <p>{t("privacy.sections.contact.content4")}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                  {t("privacy.sections.euWhistleblowing.title")}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>{t("privacy.sections.euWhistleblowing.content1")}</p>
                  {EU_WB_KEYS.map((k) => (
                    <p key={k}>{t(`privacy.sections.euWhistleblowing.${k}`)}</p>
                  ))}
                </div>
              </section>
            </div>

            <p className="text-center text-sm text-gray-500">{t("privacy.lastUpdated")}</p>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default PrivacyContent;
