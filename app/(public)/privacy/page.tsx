import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import PrivacyContent from "./PrivacyContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/privacy",
    fallbackTitle: "Privacy Policy | Disclosurely",
    fallbackDescription:
      "Learn how Disclosurely collects, processes, and protects data in line with GDPR and security best practices.",
    keywords: ["privacy policy", "data protection", "GDPR", "privacy"],
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}

