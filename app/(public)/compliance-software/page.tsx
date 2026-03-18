import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import ComplianceContent from "./ComplianceContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/compliance-software",
    fallbackTitle: "Compliance Software | Disclosurely",
    fallbackDescription:
      "This page has moved. See EU Whistleblowing Directive compliance with Disclosurely.",
    keywords: ["compliance software", "whistleblowing compliance", "EU whistleblowing directive"],
  });
}

export default function ComplianceSoftwarePage() {
  return <ComplianceContent />;
}
