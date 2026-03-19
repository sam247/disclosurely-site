const SITE_HOSTNAMES = new Set([
  "disclosurely.com",
  "www.disclosurely.com",
  "localhost",
  "127.0.0.1",
]);

export type ParsedBlogHref = { internal: boolean; pathnameSearchHash: string; raw: string };

/**
 * Classify a rich-text hyperlink URI for blog rendering.
 * Internal = same site path (relative or recognised hostname).
 */
export function parseBlogHyperlinkUri(uri: string): ParsedBlogHref {
  const raw = uri.trim();
  if (!raw) {
    return { internal: false, pathnameSearchHash: raw, raw };
  }
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    return { internal: true, pathnameSearchHash: raw, raw };
  }
  if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) {
    return { internal: false, pathnameSearchHash: raw, raw };
  }
  try {
    const u = new URL(raw);
    if (SITE_HOSTNAMES.has(u.hostname)) {
      return { internal: true, pathnameSearchHash: `${u.pathname}${u.search}${u.hash}`, raw };
    }
  } catch {
    // not a valid absolute URL
  }
  return { internal: false, pathnameSearchHash: raw, raw };
}

/**
 * Prefix internal paths for locale-prefixed URLs (/fr/pricing). English has no prefix.
 */
export function withLangPathPrefix(pathnameSearchHash: string, siteLang: string): string {
  if (!pathnameSearchHash.startsWith("/")) return pathnameSearchHash;
  if (siteLang === "en" || !siteLang) return pathnameSearchHash;
  if (
    pathnameSearchHash === `/${siteLang}` ||
    pathnameSearchHash.startsWith(`/${siteLang}/`)
  ) {
    return pathnameSearchHash;
  }
  return `/${siteLang}${pathnameSearchHash}`;
}
