import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import ComplianceContent from "./ComplianceContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("software", {
    title: "Disclosurely Compliance Software",
    description:
      "Streamline whistleblowing and compliance with encrypted intake, audit trails, and AI-powered workflows aligned to EU Directive and GDPR.",
    url: "https://disclosurely.com/compliance-software",
  });

  return generatePageMetadata({
    pagePath: "/compliance-software",
    fallbackTitle: "Compliance Software | Disclosurely",
    fallbackDescription:
      "Streamline whistleblowing and compliance with encrypted intake, audit trails, and AI-powered workflows aligned to EU Directive and GDPR.",
    keywords: [
      "compliance software",
      "whistleblowing compliance",
      "EU whistleblowing directive",
      "GDPR compliance",
      "anonymous reporting software",
      "regulatory compliance",
    ],
    structuredData: structuredData,
  });
}

export default function ComplianceSoftwarePage() {
  const softwareSchema = generatePageStructuredData("software", {
    title: "Disclosurely Compliance Software",
    description:
      "Streamline whistleblowing and compliance with encrypted intake, audit trails, and AI-powered workflows aligned to EU Directive and GDPR.",
    url: "https://disclosurely.com/compliance-software",
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <ComplianceContent />
    </>
  );
}
