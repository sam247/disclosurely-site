import { supportedLanguages } from "@/i18n/client";

const BASE_URL = "https://disclosurely.com";

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

  // x-default and en both point to English version (without /en prefix)
  urls["x-default"] = `${BASE_URL}${pathWithoutLang}`;
  urls["en"] = `${BASE_URL}${pathWithoutLang}`;

  // Other languages with their prefix
  for (const lang of supportedLanguages) {
    if (lang !== "en") {
      urls[lang] = `${BASE_URL}/${lang}${pathWithoutLang}`;
    }
  }

  return urls;
}

/**
 * Generate hreflang alternates array for Next.js metadata
 * @param path - The page path
 * @returns Array of alternate link objects
 */
export function generateHreflangAlternates(path: string): Array<{ hreflang: string; url: string }> {
  const urls = generateHreflangUrls(path);
  return Object.entries(urls).map(([hreflang, url]) => ({
    hreflang,
    url,
  }));
}

