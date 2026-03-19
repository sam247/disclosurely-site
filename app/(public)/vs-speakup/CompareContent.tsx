"use client";

import CompetitorComparePage from "@/components/comparison/CompetitorComparePage";
import { useLangPrefix } from "@/hooks/useLangPrefix";

export default function CompareContent() {
  const { prefix: langPrefix } = useLangPrefix();

  return (
    <CompetitorComparePage pageKey="speakup" signupUrl="https://app.disclosurely.com/auth/signup" langPrefix={langPrefix} />
  );
}
