/**
 * Fire-and-forget event tracking. Sends events to backend /api/events.
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
}
