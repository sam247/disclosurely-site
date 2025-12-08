import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
