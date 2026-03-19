import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import SecurityContent from "./SecurityContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Security & Trust | Disclosurely",
    description:
      "AES-256-GCM encryption, GDPR-conscious design, and controlled access. Learn how Disclosurely protects sensitive whistleblowing reports.",
    url: "https://disclosurely.com/security",
  });

  return generatePageMetadata({
    pagePath: "/security",
    fallbackTitle: "Security & Trust | Disclosurely",
    fallbackDescription:
      "AES-256-GCM encryption, GDPR-conscious design, and controlled access. Learn how Disclosurely protects sensitive whistleblowing reports.",
    keywords: ["security", "encryption", "GDPR", "compliance", "data protection", "whistleblowing security"],
    structuredData: structuredData,
  });
}

export default function SecurityPage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Security & Trust | Disclosurely",
    description:
      "AES-256-GCM encryption, GDPR-conscious design, and controlled access. Learn how Disclosurely protects sensitive whistleblowing reports.",
    url: "https://disclosurely.com/security",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <SecurityContent />
    </>
  );
}
