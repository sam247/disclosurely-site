import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import FinanceContent from "./FinanceContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/industries/finance",
    fallbackTitle: "Financial Services Compliance | Disclosurely",
    fallbackDescription:
      "Secure whistleblowing and compliance workflows for banks and financial firms with encryption, audit trails, and SLAs.",
    keywords: ["financial services compliance", "bank compliance", "AML compliance", "fraud reporting"],
  });
}

export default function FinancePage() {
  return <FinanceContent />;
}
