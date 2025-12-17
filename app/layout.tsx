import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { supportedLanguages } from "@/lib/hreflang";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://disclosurely.com"),
  title: "Disclosurely - GDPR Compliant Whistleblowing Platform | Secure Anonymous Reporting",
  description:
    "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption. Complies with EU Whistleblowing Directive 2019/1937.",
  keywords: [
    "whistleblowing software",
    "GDPR compliance",
    "EU whistleblowing directive",
    "anonymous reporting",
    "secure reporting",
    "UK whistleblower protection",
    "compliance software",
    "speak up platform",
    "ethics hotline",
  ],
  openGraph: {
    type: "website",
    url: "https://disclosurely.com",
    siteName: "Disclosurely",
    locale: "en_GB",
    title: "Disclosurely - GDPR Compliant Whistleblowing Platform",
    description:
      "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption.",
    images: [
      {
        url: "https://disclosurely.com/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Disclosurely - Secure Whistleblowing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclosurely - GDPR Compliant Whistleblowing Platform",
    description:
      "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption.",
    images: ["https://disclosurely.com/ogimage.png"],
  },
  themeColor: "#2563eb",
};

async function getPreferredLang() {
  const headerList = await headers();
  const headerLang = headerList.get("x-lang");
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;

  const lang = headerLang || cookieLang;
  return supportedLanguages.includes((lang as any) || "") ? (lang as typeof supportedLanguages[number]) : "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getPreferredLang();

  return (
    <html lang={lang}>
      <head>
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" crossOrigin="anonymous" />
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="NOZ1bom3LOJmqVM2vVZ51A" strategy="afterInteractive" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
