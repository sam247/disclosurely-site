import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import FeaturesContent from "./FeaturesContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("software", {
    title: "Disclosurely Features",
    description:
      "Explore Disclosurely features: anonymous reporting, secure messaging, AI-powered case management, and compliance workflows.",
    url: "https://disclosurely.com/features",
  });

  return generatePageMetadata({
    pagePath: "/features",
    fallbackTitle: "Features | Disclosurely",
    fallbackDescription:
      "Explore Disclosurely features: anonymous reporting, secure messaging, AI-powered case management, and compliance workflows.",
    keywords: [
      "whistleblowing features",
      "anonymous reporting features",
      "compliance software features",
      "case management",
      "secure messaging",
      "AI case analysis",
    ],
    structuredData: structuredData,
  });
}

export default function FeaturesPage() {
  const softwareSchema = generatePageStructuredData("software", {
    title: "Disclosurely Features",
    description:
      "Explore Disclosurely features: anonymous reporting, secure messaging, AI-powered case management, and compliance workflows.",
    url: "https://disclosurely.com/features",
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <FeaturesContent />
    </>
  );
}
