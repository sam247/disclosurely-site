import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-whistleblower-software",
    fallbackTitle: "Disclosurely vs Whistleblower Software",
    fallbackDescription:
      "Compare Disclosurely to traditional whistleblower software: encryption-first, AI automation, Directive-aligned SLAs.",
    keywords: ["disclosurely vs whistleblower software", "whistleblowing software comparison"],
  });
}

export default function VsWhistleblowerSoftwarePage() {
  return <CompareContent />;
}
