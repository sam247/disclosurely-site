const BASE_URL = "https://disclosurely.com";

// Define supported languages here to avoid importing from client-only module
// This must match the languages in i18n/client.ts
export const supportedLanguages = ["en", "es", "fr", "de", "pl", "sv", "no", "pt", "it", "nl", "da", "el"] as const;

export type Lang = (typeof supportedLanguages)[number];

/**
 * Generate hreflang alternate links for a given path
 * @param path - The page path (e.g., "/compliance-software" or "/es/compliance-software")
 * @returns Object mapping language codes to full URLs
 */
export function generateHreflangUrls(path: string): Record<string, string> {
  // Normalize path - remove leading/trailing slashes except for root
  let basePath = path.trim();
  if (basePath !== "/" && basePath.endsWith("/")) {
    basePath = basePath.slice(0, -1);
  }
  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  // Extract base path without language prefix
  let pathWithoutLang = basePath;
  for (const lang of supportedLanguages) {
    if (lang === "en") continue; // English has no prefix
    if (basePath.startsWith(`/${lang}/`)) {
      pathWithoutLang = basePath.substring(lang.length + 1);
      break;
    } else if (basePath === `/${lang}`) {
      pathWithoutLang = "/";
      break;
    }
  }

  // Ensure pathWithoutLang starts with /
  if (!pathWithoutLang.startsWith("/")) {
    pathWithoutLang = `/${pathWithoutLang}`;
  }

  const urls: Record<string, string> = {};

  // x-default: tells Google "if language unknown → use this (English)". Required for EU targeting.
  const englishUrl = `${BASE_URL}${pathWithoutLang}`;
  urls["x-default"] = englishUrl;
  urls["en"] = englishUrl;

  // Other languages with their prefix
  for (const lang of supportedLanguages) {
    if (lang !== "en") {
      urls[lang] = `${BASE_URL}/${lang}${pathWithoutLang}`;
    }
  }

  return urls;
}

/**
 * Generate hreflang alternate links for Next.js metadata.
 * Includes x-default pointing to English so Google uses it when language is unknown (EU targeting).
 * @param path - The page path
 * @returns Array of alternate link objects (x-default first)
 */
export function generateHreflangAlternates(path: string): Array<{ hreflang: string; url: string }> {
  const urls = generateHreflangUrls(path);
  const entries = Object.entries(urls);
  // Ensure x-default is first in output (recommended for crawlers)
  const sorted = entries.sort(([a], [b]) => (a === "x-default" ? -1 : b === "x-default" ? 1 : 0));
  return sorted.map(([hreflang, url]) => ({ hreflang, url }));
}

