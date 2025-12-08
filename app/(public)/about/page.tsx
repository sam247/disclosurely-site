import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import AboutContent from "./AboutContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("organization", {
    title: "Disclosurely",
    description:
      "Making compliance simple, secure, and built for trust. We help organizations create safer, more transparent workplaces through secure whistleblowing and compliance software.",
    url: "https://disclosurely.com/about",
  });

  return generatePageMetadata({
    pagePath: "/about",
    fallbackTitle: "About Us | Disclosurely",
    fallbackDescription:
      "Learn about Disclosurely's mission to make whistleblowing simple, secure, and effective. Meet our team and discover our values.",
    keywords: ["about disclosurely", "whistleblowing company", "compliance team", "ethics platform"],
    structuredData: structuredData,
  });
}

export default function AboutPage() {
  const organizationSchema = generatePageStructuredData("organization", {
    title: "Disclosurely",
    description:
      "Making compliance simple, secure, and built for trust. We help organizations create safer, more transparent workplaces through secure whistleblowing and compliance software.",
    url: "https://disclosurely.com/about",
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <AboutContent />
    </>
  );
}
