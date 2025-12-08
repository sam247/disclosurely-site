import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import TermsContent from "./TermsContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/terms",
    fallbackTitle: "Terms of Service | Disclosurely",
    fallbackDescription:
      "Terms and conditions governing your use of Disclosurely's whistleblowing and compliance services.",
    keywords: ["terms of service", "terms and conditions", "legal"],
  });
}

export default function TermsPage() {
  return <TermsContent />;
}
