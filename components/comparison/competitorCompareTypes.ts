import type { LucideIcon } from "lucide-react";
import { ClipboardList, DollarSign, Headphones, Lock, Zap } from "lucide-react";

/** Category ids map to `compare.{pageKey}.tables.{id}` in i18n */
export const COMPARE_CATEGORY_ORDER = [
  "pricing",
  "reporting",
  "caseHandling",
  "security",
  "rollout",
] as const;

export type CompareCategoryId = (typeof COMPARE_CATEGORY_ORDER)[number];

export const COMPARE_CATEGORY_ICONS: Record<CompareCategoryId, LucideIcon> = {
  pricing: DollarSign,
  security: Lock,
  caseHandling: ClipboardList,
  reporting: Zap,
  rollout: Headphones,
};

export type CompareTableRow = {
  feature: string;
  disclosurely: string;
  competitor: string;
};
