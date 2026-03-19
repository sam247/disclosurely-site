import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import PrivacyContent from "./PrivacyContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/privacy",
    fallbackTitle: "Privacy Policy | Disclosurely",
    fallbackDescription:
      "How we collect, process, and protect personal data when you use Disclosurely, in line with applicable data protection law.",
    keywords: ["privacy policy", "data protection", "GDPR", "privacy"],
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}

