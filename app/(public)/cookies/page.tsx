import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CookiesContent from "./CookiesContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/cookies",
    fallbackTitle: "Cookie Policy | Disclosurely",
    fallbackDescription: "Understand how Disclosurely uses cookies and similar technologies across the platform.",
    keywords: ["cookie policy", "cookies", "privacy"],
  });
}

export default function CookiesPage() {
  return <CookiesContent />;
}
