import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { supportedLanguages } from "@/lib/hreflang";
import ChatWidget from "@/components/ChatWidget";
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QLEGTKTCW');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QLEGTKTCW"
          strategy="afterInteractive"
          async
        />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" crossOrigin="anonymous" />
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="NOZ1bom3LOJmqVM2vVZ51A" strategy="afterInteractive" />
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="1i990Kn7NzGZwPDjo"
          data-version="062024"
          strategy="afterInteractive"
          async
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <ChatWidget />
        <Analytics />
        <Script id="linkedin-partner-id" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8845490";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight-loader" strategy="afterInteractive">
          {`
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8845490&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}
