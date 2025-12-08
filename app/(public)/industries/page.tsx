import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import IndustriesContent from "./IndustriesContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/industries",
    fallbackTitle: "Industries | Disclosurely",
    fallbackDescription: "Whistleblowing and compliance solutions for finance, healthcare, public sector, technology, and more.",
    keywords: ["whistleblowing by industry", "compliance by industry", "financial services compliance", "healthcare compliance"],
  });
}

export default function IndustriesPage() {
  return <IndustriesContent />;
}
