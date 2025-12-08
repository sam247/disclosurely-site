import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import SecurityContent from "./SecurityContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/security",
    fallbackTitle: "Security | Disclosurely",
    fallbackDescription:
      "Encryption, access controls, monitoring, and auditability built into Disclosurely to protect every disclosure.",
    keywords: ["security", "encryption", "data protection", "ISO 27001", "GDPR security"],
  });
}

export default function SecurityPage() {
  return <SecurityContent />;
}

