"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supportedLanguages, i18n } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

export default function PublicLanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const current: Lang = (() => {
    const seg = pathname?.split("/")[1];
    return supportedLanguages.includes(seg as Lang) ? (seg as Lang) : "en";
  })();

  const handleChange = (lang: Lang) => {
    if (!supportedLanguages.includes(lang)) return;
    const parts = pathname?.split("/") ?? [];
    if (supportedLanguages.includes(parts[1] as Lang)) {
      parts[1] = lang;
    } else if (lang !== "en") {
      parts.splice(1, 0, lang);
    }
    const nextPath = parts.join("/") || "/";
    startTransition(() => {
      i18n.changeLanguage(lang);
      router.push(nextPath);
    });
  };

  return (
    <select
      aria-label="Select language"
      className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      value={current}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value as Lang)}
    >
      {supportedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

