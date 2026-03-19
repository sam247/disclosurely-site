import type { Lang } from "@/lib/hreflang";
import { supportedLanguages } from "@/lib/hreflang";

/**
 * Map middleware `x-lang` to Contentful Delivery API locale codes.
 * Align codes with locales configured in your Contentful space (Settings → Locales).
 * When a locale has no translated fields, Contentful falls back per space settings.
 *
 * English uses `undefined` so the API applies the space default locale (often en-US or en-GB).
 */
const SITE_LANG_TO_CONTENTFUL: Partial<Record<Lang, string>> = {
  es: "es",
  fr: "fr",
  de: "de",
  pl: "pl",
  sv: "sv",
  no: "no",
  pt: "pt",
  it: "it",
  nl: "nl",
  da: "da",
  el: "el",
};

export function resolveContentfulLocale(siteLang: string | null | undefined): string | undefined {
  if (!siteLang || siteLang === "en") {
    return undefined;
  }
  if (!supportedLanguages.includes(siteLang as Lang)) {
    return undefined;
  }
  return SITE_LANG_TO_CONTENTFUL[siteLang as Lang];
}
