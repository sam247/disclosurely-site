import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import TermsContent from "./TermsContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/terms",
    fallbackTitle: "Terms of Service | Disclosurely",
    fallbackDescription:
      "Terms governing use of the Disclosurely whistleblowing and compliance reporting platform.",
    keywords: ["terms of service", "terms and conditions", "legal"],
  });
}

export default function TermsPage() {
  return <TermsContent />;
}
