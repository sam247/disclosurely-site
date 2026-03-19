import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Disclosurely vs SpeakUp — whistleblowing platform comparison",
    description:
      "A balanced comparison of pricing models, security controls, case workflows, and reporting channels. Use it alongside each vendor's documentation to decide what fits your organisation.",
    url: "https://disclosurely.com/vs-speakup",
  });

  return generatePageMetadata({
    pagePath: "/vs-speakup",
    fallbackTitle: "Disclosurely vs SpeakUp — whistleblowing platform comparison",
    fallbackDescription:
      "A balanced comparison of pricing models, security controls, case workflows, and reporting channels. Use it alongside each vendor's documentation to decide what fits your organisation.",
    keywords: ["disclosurely vs speakup", "whistleblowing comparison", "speakup alternative"],
    structuredData: structuredData,
  });
}

export default function VsSpeakUpPage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Disclosurely vs SpeakUp — whistleblowing platform comparison",
    description:
      "A balanced comparison of pricing models, security controls, case workflows, and reporting channels. Use it alongside each vendor's documentation to decide what fits your organisation.",
    url: "https://disclosurely.com/vs-speakup",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <CompareContent />
    </>
  );
}
