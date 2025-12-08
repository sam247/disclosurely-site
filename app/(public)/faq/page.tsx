import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData } from "@/lib/seo";
import { StructuredData } from "@/lib/seo";
import FaqContent from "./FaqContent";

const faqs = [
  {
    question: "How does anonymous reporting work?",
    answer: "Reports are end-to-end encrypted. Identities are hidden; investigators respond via secure two-way messaging.",
  },
  {
    question: "Is Disclosurely GDPR compliant?",
    answer:
      "Yes. Data processing, retention, and access controls are designed to meet GDPR and EU Whistleblowing Directive requirements.",
  },
  {
    question: "Can we use our own domain and branding?",
    answer: "Custom branding and custom domains are supported on higher tiers for a fully white-labeled experience.",
  },
  {
    question: "Do you support multi-language portals?",
    answer: "Yes. Intake, notifications, and UI can be localized for supported languages.",
  },
  {
    question: "What about security certifications?",
    answer: "We align to ISO 27001 controls with encryption, audit logs, and continuous monitoring.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const faqSchema = generatePageStructuredData("faq", { faqs });
  
  return generatePageMetadata({
    pagePath: "/faq",
    fallbackTitle: "FAQ | Disclosurely",
    fallbackDescription: "Common questions about Disclosurely's whistleblowing, security, and compliance platform.",
    keywords: ["FAQ", "frequently asked questions", "whistleblowing questions"],
    structuredData: faqSchema,
  });
}

export default function FAQPage() {
  const faqSchema = generatePageStructuredData("faq", { faqs });
  return (
    <>
      <StructuredData data={faqSchema} />
      <FaqContent />
    </>
  );
}
