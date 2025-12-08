import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import LandingInner from "./LandingInner";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/",
    fallbackTitle: "Disclosurely | Secure Whistleblowing & Compliance Platform",
    fallbackDescription:
      "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption. Start your free trial today.",
    keywords: [
      "whistleblowing platform",
      "anonymous reporting",
      "compliance software",
      "EU whistleblowing directive",
      "GDPR compliance",
      "ethics hotline",
      "secure reporting",
    ],
  });
}

export default function HomePage() {
  const organizationSchema = generatePageStructuredData("organization", {
    title: "Disclosurely",
    description: "GDPR-compliant whistleblowing platform for UK & EU organisations",
    url: "https://disclosurely.com",
  });

  const softwareSchema = generatePageStructuredData("software", {
    title: "Disclosurely",
    description:
      "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption.",
    url: "https://disclosurely.com",
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={softwareSchema} />
      <LandingInner />
    </>
  );
}
