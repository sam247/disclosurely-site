import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import CareersContent from "./CareersContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/careers",
    fallbackTitle: "Careers | Disclosurely",
    fallbackDescription:
      "Join Disclosurely to build secure whistleblowing and compliance technology. Security-first, remote-friendly culture.",
    keywords: ["careers", "jobs", "hiring", "remote work"],
  });
}

export default function CareersPage() {
  return <CareersContent />;
}
