import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Must stay in sync with i18n/client.ts
const SUPPORTED_LANGUAGES = ["en", "es", "fr", "de", "pl", "sv", "no", "pt", "it", "nl", "da", "el"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals and assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/docs/public")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!SUPPORTED_LANGUAGES.includes(first)) {
    return NextResponse.next();
  }

  // Rewrite /{lang}/... -> /...
  const newPath = "/" + segments.slice(1).join("/");
  const url = request.nextUrl.clone();
  url.pathname = newPath === "/" ? "/" : newPath;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", first);

  const response = NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set("lang", first, { path: "/" });

  return response;
}


