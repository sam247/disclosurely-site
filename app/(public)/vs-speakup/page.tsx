import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Disclosurely vs SpeakUp - Save $708/Year with Advanced AI Features",
    description:
      "Compare Disclosurely and SpeakUp whistleblowing platforms. Get AI case analysis, transparent pricing (£39.99 vs $99+/mo), and better automation. See the difference.",
    url: "https://disclosurely.com/vs-speakup",
  });

  return generatePageMetadata({
    pagePath: "/vs-speakup",
    fallbackTitle: "Disclosurely vs SpeakUp - Save $708/Year with Advanced AI Features",
    fallbackDescription:
      "Compare Disclosurely and SpeakUp whistleblowing platforms. Get AI case analysis, transparent pricing (£39.99 vs $99+/mo), and better automation. See the difference.",
    keywords: ["disclosurely vs speakup", "whistleblowing comparison", "speakup alternative"],
    structuredData: structuredData,
  });
}

export default function VsSpeakUpPage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Disclosurely vs SpeakUp - Save $708/Year with Advanced AI Features",
    description:
      "Compare Disclosurely and SpeakUp whistleblowing platforms. Get AI case analysis, transparent pricing (£39.99 vs $99+/mo), and better automation. See the difference.",
    url: "https://disclosurely.com/vs-speakup",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <CompareContent />
    </>
  );
}
