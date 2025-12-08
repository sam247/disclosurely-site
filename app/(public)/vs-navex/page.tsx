import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-navex",
    fallbackTitle: "Disclosurely vs NAVEX (EthicsPoint) - Save $7,500/Year with Modern AI",
    fallbackDescription:
      "Compare Disclosurely and NAVEX EthicsPoint. Get enterprise features at SMB pricing (£39.99 vs $667+/mo). Modern AI, better automation, transparent pricing.",
    keywords: ["disclosurely vs navex", "navex alternative", "whistleblowing comparison", "ethicspoint alternative"],
  });
}

export default function VsNavexPage() {
  return <CompareContent />;
}
