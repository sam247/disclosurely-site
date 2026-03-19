import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Disclosurely vs Whistleblower Software — platform comparison",
    description:
      "Compare pricing models, reporting workflows, and platform flexibility. A balanced overview to help you decide what fits your organisation — verify details with each vendor.",
    url: "https://disclosurely.com/vs-whistleblower-software",
  });

  return generatePageMetadata({
    pagePath: "/vs-whistleblower-software",
    fallbackTitle: "Disclosurely vs Whistleblower Software — platform comparison",
    fallbackDescription:
      "Compare pricing models, reporting workflows, and platform flexibility. A balanced overview to help you decide what fits your organisation — verify details with each vendor.",
    keywords: [
      "disclosurely vs whistleblower software",
      "whistleblowing software comparison",
      "whistleblower software alternative",
    ],
    structuredData: structuredData,
  });
}

export default function VsWhistleblowerSoftwarePage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Disclosurely vs Whistleblower Software — platform comparison",
    description:
      "Compare pricing models, reporting workflows, and platform flexibility. A balanced overview to help you decide what fits your organisation — verify details with each vendor.",
    url: "https://disclosurely.com/vs-whistleblower-software",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <CompareContent />
    </>
  );
}
