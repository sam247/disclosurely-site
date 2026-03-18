"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLangPrefix } from "@/hooks/useLangPrefix";

/**
 * Compliance-software has been merged into whistleblowing-directive.
 * This component redirects any client-side navigation to the canonical page.
 * Server-side requests are 301-redirected by middleware.
 */
export default function ComplianceContent() {
  const router = useRouter();
  const { prefix: langPrefix } = useLangPrefix();

  useEffect(() => {
    router.replace(`${langPrefix}/whistleblowing-directive`);
  }, [router, langPrefix]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-white">
      <p className="text-gray-500">Redirecting…</p>
    </div>
  );
}
