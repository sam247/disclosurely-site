import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-whistleblower-software",
    fallbackTitle: "Disclosurely vs WhistleblowerSoftware.com - Save €276/Year with Better AI Features",
    fallbackDescription:
      "Compare Disclosurely and WhistleblowerSoftware.com. Get AI case analysis, better pricing (£39.99 vs €70/mo), and faster setup. See why teams are switching.",
    keywords: ["disclosurely vs whistleblower software", "whistleblowing software comparison", "whistleblowersoftware alternative"],
  });
}

export default function VsWhistleblowerSoftwarePage() {
  return <CompareContent />;
}
