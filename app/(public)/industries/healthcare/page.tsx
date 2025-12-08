import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import HealthcareContent from "./HealthcareContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/industries/healthcare",
    fallbackTitle: "Healthcare Compliance | Disclosurely",
    fallbackDescription:
      "Anonymous, encrypted reporting for healthcare with strict access controls, audit trails, and compliance workflows.",
    keywords: ["healthcare compliance", "healthcare whistleblowing", "PHI protection", "clinical compliance"],
  });
}

export default function HealthcarePage() {
  return <HealthcareContent />;
}
