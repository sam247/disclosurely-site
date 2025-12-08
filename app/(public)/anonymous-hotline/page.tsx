import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import HotlineContent from "./HotlineContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/anonymous-hotline",
    fallbackTitle: "Anonymous Hotline | Disclosurely",
    fallbackDescription:
      "Provide a secure, anonymous whistleblowing hotline with encrypted two-way messaging and audit trails.",
    keywords: ["anonymous hotline", "whistleblowing hotline", "ethics hotline"],
  });
}

export default function AnonymousHotlinePage() {
  return <HotlineContent />;
}
