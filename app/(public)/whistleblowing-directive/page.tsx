import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import DirectiveContent from "./DirectiveContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/whistleblowing-directive",
    fallbackTitle: "EU Whistleblowing Directive | Disclosurely",
    fallbackDescription:
      "Meet EU Whistleblowing Directive requirements with anonymous reporting, encrypted messaging, SLAs, and audit-ready workflows.",
    keywords: ["EU whistleblowing directive", "whistleblowing directive compliance", "EU directive 2019/1937"],
  });
}

export default function WhistleblowingDirectivePage() {
  return <DirectiveContent />;
}
