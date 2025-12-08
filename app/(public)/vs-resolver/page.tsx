import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-resolver",
    fallbackTitle: "Disclosurely vs Resolver",
    fallbackDescription: "Compare Disclosurely and Resolver: encrypted, AI-enabled whistleblowing with transparent pricing.",
    keywords: ["disclosurely vs resolver", "resolver alternative", "whistleblowing comparison"],
  });
}

export default function VsResolverPage() {
  return <CompareContent />;
}
