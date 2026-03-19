import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/contact",
    fallbackTitle: "Contact Disclosurely — book a demo or ask a question",
    fallbackDescription:
      "Talk to Disclosurely about secure whistleblowing: demos, pricing, EU and UK requirements, and rollout support for your organisation.",
    keywords: [
      "contact disclosurely",
      "whistleblowing demo",
      "whistleblowing software UK",
      "EU whistleblowing directive",
    ],
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
