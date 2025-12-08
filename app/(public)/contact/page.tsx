import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/contact",
    fallbackTitle: "Contact Disclosurely",
    fallbackDescription:
      "Contact Disclosurely for demos, pricing, and support. Secure whistleblowing and compliance solutions for your organisation.",
    keywords: ["contact disclosurely", "whistleblowing support", "compliance consultation"],
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
