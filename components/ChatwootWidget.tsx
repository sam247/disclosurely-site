"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
      toggle?: () => void;
      setUser?: (id: string, user: Record<string, unknown>) => void;
      setLocale?: (locale: string) => void;
    };
    chatwootSettings?: Record<string, unknown>;
  }
}

type Props = {
  locale?: string;
};

/**
 * Lightweight Chatwoot widget loader for the marketing site.
 * Requires env:
 * - NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN
 * - NEXT_PUBLIC_CHATWOOT_BASE_URL (defaults to cloud)
 */
export default function ChatwootWidget({ locale }: Props) {
  useEffect(() => {
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;
    if (!websiteToken) return;

    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "https://app.chatwoot.com";
    const scriptId = "chatwoot-sdk";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `${baseUrl}/packs/js/sdk.js`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({ websiteToken, baseUrl });
          if (locale && window.chatwootSDK.setLocale) {
            window.chatwootSDK.setLocale(locale);
          }
        }
      };
      document.body.appendChild(script);
    } else if (window.chatwootSDK) {
      window.chatwootSDK.run({ websiteToken, baseUrl });
      if (locale && window.chatwootSDK.setLocale) {
        window.chatwootSDK.setLocale(locale);
      }
    }
  }, [locale]);

  return null;
}

