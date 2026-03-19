import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("webpage", {
    title: "Disclosurely vs NAVEX — whistleblowing platform comparison",
    description:
      "Compare buying models, rollout complexity, and whistleblowing workflows. A balanced overview for serious buyers — verify details with each vendor.",
    url: "https://disclosurely.com/vs-navex",
  });

  return generatePageMetadata({
    pagePath: "/vs-navex",
    fallbackTitle: "Disclosurely vs NAVEX — whistleblowing platform comparison",
    fallbackDescription:
      "Compare buying models, rollout complexity, and whistleblowing workflows. A balanced overview for serious buyers — verify details with each vendor.",
    keywords: ["disclosurely vs navex", "navex alternative", "whistleblowing comparison", "ethicspoint alternative"],
    structuredData: structuredData,
  });
}

export default function VsNavexPage() {
  const webpageSchema = generatePageStructuredData("webpage", {
    title: "Disclosurely vs NAVEX — whistleblowing platform comparison",
    description:
      "Compare buying models, rollout complexity, and whistleblowing workflows. A balanced overview for serious buyers — verify details with each vendor.",
    url: "https://disclosurely.com/vs-navex",
  });

  return (
    <>
      <StructuredData data={webpageSchema} />
      <CompareContent />
    </>
  );
}
