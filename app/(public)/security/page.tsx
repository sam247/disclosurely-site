import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import SecurityContent from "./SecurityContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Security & Trust Center | Disclosurely",
    description:
      "AES-256 encryption, zero-knowledge architecture, and GDPR compliance. Learn how we protect whistleblower anonymity with bank-grade security.",
    url: "https://disclosurely.com/security",
  });

  return generatePageMetadata({
    pagePath: "/security",
    fallbackTitle: "Security & Trust Center | Disclosurely",
    fallbackDescription:
      "AES-256 encryption, zero-knowledge architecture, and GDPR compliance. Learn how we protect whistleblower anonymity with bank-grade security.",
    keywords: ["security", "encryption", "GDPR", "compliance", "data protection", "whistleblowing security"],
    structuredData: structuredData,
  });
}

export default function SecurityPage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Security & Trust Center | Disclosurely",
    description:
      "AES-256 encryption, zero-knowledge architecture, and GDPR compliance. Learn how we protect whistleblower anonymity with bank-grade security.",
    url: "https://disclosurely.com/security",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <SecurityContent />
    </>
  );
}
