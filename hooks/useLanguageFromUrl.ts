"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

export const useLanguageFromUrl = () => {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const lang = useMemo(() => {
    const seg = pathname?.split("/")[1];
    return supportedLanguages.includes(seg as Lang) ? (seg as Lang) : "en";
  }, [pathname]);

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const langPrefix = lang === "en" ? "" : `/${lang}`;

  return { currentLanguage: lang, langPrefix };
};

