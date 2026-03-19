"use client";

import CompetitorComparePage from "@/components/comparison/CompetitorComparePage";
import { useLangPrefix } from "@/hooks/useLangPrefix";

export default function CompareContent() {
  const { prefix: langPrefix } = useLangPrefix();

  return (
    <CompetitorComparePage
      pageKey="navex"
      signupUrl="https://app.disclosurely.com/auth/signup"
      langPrefix={langPrefix}
      heroShowPricingAndDemo
    />
  );
}
