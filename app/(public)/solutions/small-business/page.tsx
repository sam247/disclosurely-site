import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import SmallBusinessContent from "./SmallBusinessContent";

// Force rebuild - page should be accessible at /solutions/small-business

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Whistleblowing for Small Businesses | Disclosurely",
    description:
      "Simple whistleblower software for UK SMEs. Reduce fraud, theft, and HR issues with secure anonymous reporting. No complex setup – start protecting your business today.",
    url: "https://disclosurely.com/solutions/small-business",
  });

  return generatePageMetadata({
    pagePath: "/solutions/small-business",
    fallbackTitle: "Whistleblowing for Small Businesses | Disclosurely",
    fallbackDescription:
      "Simple whistleblower software for UK SMEs. Reduce fraud, theft, and HR issues with secure anonymous reporting. No complex setup – start protecting your business today.",
    keywords: [
      "whistleblowing for small businesses",
      "whistleblower software UK SMEs",
      "anonymous reporting small business",
      "SME whistleblowing",
      "small business compliance",
      "fraud prevention small business",
    ],
    structuredData: structuredData,
    canonicalUrl: "https://disclosurely.com/solutions/small-business/",
  });
}

export default function SmallBusinessPage() {
  const serviceSchema = generatePageStructuredData("webpage", {
    title: "Whistleblowing for Small Businesses | Disclosurely",
    description:
      "Simple whistleblower software for UK SMEs. Reduce fraud, theft, and HR issues with secure anonymous reporting. No complex setup – start protecting your business today.",
    url: "https://disclosurely.com/solutions/small-business",
  });

  return (
    <>
      <StructuredData data={serviceSchema} />
      <SmallBusinessContent />
    </>
  );
}

