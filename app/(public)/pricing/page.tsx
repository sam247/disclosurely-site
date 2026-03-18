import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import PricingContent from "./PricingContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("software", {
    title: "Disclosurely Whistleblowing Platform",
    description:
      "Whistleblowing software pricing for teams of all sizes. Secure anonymous reporting, case management, and compliance tools. Free trial, no credit card required.",
    url: "https://disclosurely.com/pricing",
  });

  return generatePageMetadata({
    pagePath: "/pricing",
    fallbackTitle: "Whistleblowing Software Pricing | Disclosurely",
    fallbackDescription:
      "Whistleblowing software pricing for teams of all sizes. Secure anonymous reporting, case management, and compliance tools. Free trial, no credit card required.",
    keywords: ["pricing", "whistleblowing pricing", "compliance software pricing", "subscription plans"],
    structuredData: structuredData,
  });
}

export default function PricingPage() {
  const productSchema = generatePageStructuredData("software", {
    title: "Disclosurely Whistleblowing Platform",
    description:
      "Whistleblowing software pricing for teams of all sizes. Secure anonymous reporting, case management, and compliance tools. Free trial, no credit card required.",
    url: "https://disclosurely.com/pricing",
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <PricingContent />
    </>
  );
}
