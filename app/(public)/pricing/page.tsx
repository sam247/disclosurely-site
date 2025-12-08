import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import PricingContent from "./PricingContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("software", {
    title: "Disclosurely Whistleblowing Platform",
    description:
      "Simple, transparent pricing for secure whistleblowing and compliance automation. Choose monthly or annual plans.",
    url: "https://disclosurely.com/pricing",
  });

  return generatePageMetadata({
    pagePath: "/pricing",
    fallbackTitle: "Pricing | Disclosurely",
    fallbackDescription:
      "Simple, transparent pricing for secure whistleblowing and compliance automation. Choose monthly or annual plans.",
    keywords: ["pricing", "whistleblowing pricing", "compliance software pricing", "subscription plans"],
    structuredData: structuredData,
  });
}

export default function PricingPage() {
  const productSchema = generatePageStructuredData("software", {
    title: "Disclosurely Whistleblowing Platform",
    description:
      "Simple, transparent pricing for secure whistleblowing and compliance automation. Choose monthly or annual plans.",
    url: "https://disclosurely.com/pricing",
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <PricingContent />
    </>
  );
}
