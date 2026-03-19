import type { Metadata } from "next";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import AboutContent from "./AboutContent";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = generatePageStructuredData("organization", {
    title: "Disclosurely",
    description:
      "Disclosurely builds secure whistleblowing software to help organisations launch reporting channels people can trust — with practical workflows and privacy-conscious design.",
    url: "https://disclosurely.com/about",
  });

  return generatePageMetadata({
    pagePath: "/about",
    fallbackTitle: "About Disclosurely | Secure whistleblowing software",
    fallbackDescription:
      "Why Disclosurely exists: mission-led whistleblowing software designed to be easier to launch, manage, and trust — without unnecessary complexity.",
    keywords: [
      "about disclosurely",
      "whistleblowing software UK",
      "EU whistleblowing directive",
      "secure reporting",
      "speak up programme",
    ],
    structuredData: structuredData,
  });
}

export default function AboutPage() {
  const organizationSchema = generatePageStructuredData("organization", {
    title: "Disclosurely",
    description:
      "Disclosurely builds secure whistleblowing software to help organisations launch reporting channels people can trust — with practical workflows and privacy-conscious design.",
    url: "https://disclosurely.com/about",
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <AboutContent />
    </>
  );
}
