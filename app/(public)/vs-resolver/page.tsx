import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CompareContent from "./CompareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/vs-resolver",
    fallbackTitle: "Disclosurely vs Resolver - Focused Whistleblowing vs Broad GRC",
    fallbackDescription:
      "Compare Disclosurely and Resolver. Get purpose-built whistleblowing with modern AI at transparent pricing. When Resolver's GRC platform is more than you need.",
    keywords: ["disclosurely vs resolver", "resolver alternative", "whistleblowing comparison", "grc platform"],
  });
}

export default function VsResolverPage() {
  return <CompareContent />;
}
