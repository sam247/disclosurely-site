"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

const countryToLanguageMap: Record<string, string> = {
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  FR: "fr",
  BE: "fr",
  CH: "fr",
  CA: "fr",
  DE: "de",
  AT: "de",
  LU: "de",
  PL: "pl",
  SE: "sv",
  NO: "no",
  PT: "pt",
  BR: "pt",
  IT: "it",
  NL: "nl",
  DK: "da",
  GR: "el",
  CY: "el",
};

export const useGeographicalLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  useEffect(() => {
    const hasLang = /^\/(es|fr|de|pl|sv|no|pt|it|nl|da|el)(\/|$)/.test(pathname || "");
    if (hasLang || typeof window === "undefined" || sessionStorage.getItem("language-detected")) {
      return;
    }

    const detect = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Geolocation failed");
        const data = (await response.json()) as { country_code?: string };
        const suggested = countryToLanguageMap[data.country_code as string] as Lang | undefined;
        if (suggested && suggested !== "en") {
          sessionStorage.setItem("language-detected", "true");
          i18n.changeLanguage(suggested);
          const pathParts = (pathname || "/").split("/");
          if (supportedLanguages.includes(pathParts[1] as Lang)) {
            pathParts[1] = suggested;
          } else {
            pathParts.splice(1, 0, suggested);
          }
          const nextPath = pathParts.join("/") || "/";
          router.replace(nextPath);
          return;
        }
      } catch {
        // fall back silently
      } finally {
        sessionStorage.setItem("language-detected", "true");
      }
    };

    detect();
  }, [pathname, router, i18n]);
};

