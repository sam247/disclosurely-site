import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-navex",
    fallbackTitle: "Disclosurely vs NAVEX",
    fallbackDescription: "See how Disclosurely compares to NAVEX with modern UX, encrypted whistleblowing, and AI automation.",
    keywords: ["disclosurely vs navex", "navex alternative", "whistleblowing comparison"],
  });
}

export default function VsNavexPage() {
  return <CompareContent />;
}
