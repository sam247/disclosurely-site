import { sendToGtag } from "@/lib/gtag";

/**
 * Fire-and-forget event tracking. Sends events to backend /api/events and to GA4 (gtag) when available.
 * Does not block UI; errors are logged only.
 * Automatically adds path, referrer, and campaign src (from ?src=) to metadata.
 */
export function trackEvent(event: string, metadata?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const payload = {
    event,
    source: "marketing",
    metadata: {
      ...metadata,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      src: params.get("src") || undefined,
    },
  };

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((err) => {
    console.warn("[trackEvent] failed:", err);
  });

  if (metadata) {
    const gtagParams: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(metadata)) {
      if (v !== undefined && v !== null && typeof v !== "object") {
        gtagParams[k] = v as string | number | boolean;
      }
    }
    sendToGtag(event, gtagParams);
  } else {
    sendToGtag(event);
  }
}
