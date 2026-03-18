/**
 * Google Analytics 4 (gtag.js) – measurement ID and typed custom events.
 * Events are sent via gtag('event', name, params) and optionally via trackEvent() to /api/events.
 */

export const GA_MEASUREMENT_ID = "G-8QLEGTKTCW";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Custom event names we use across the marketing site and docs */
export const GA_EVENTS = {
  // Signup / trial
  SIGNUP_CLICK: "signup_click",
  SIGNUP_COMPLETED: "signup_completed",
  START_FREE_TRIAL: "start_free_trial",

  // Demo / contact
  DEMO_CLICK: "demo_click",
  DEMO_BOOKED: "demo_booked",

  // Page / content engagement
  LANDING_VIEW: "landing_view",
  PRICING_PAGE_VIEW: "pricing_page_view",
  DIRECTIVE_PAGE_VIEW: "directive_page_view",
  DOCS_VIEW: "docs_view",

  // Generic (for future use)
  PAGE_VIEW: "page_view",
  OUTBOUND_CLICK: "outbound_click",
  FILE_DOWNLOAD: "file_download",
  CTA_CLICK: "cta_click",
} as const;

export type GaEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

/** Recommended parameters per event (GA4 custom dimensions / event params) */
export type GaEventParams = {
  [GA_EVENTS.SIGNUP_CLICK]: { location: string };
  [GA_EVENTS.SIGNUP_COMPLETED]: { plan?: string; location?: string };
  [GA_EVENTS.START_FREE_TRIAL]: { location: string; plan?: string; billing_interval?: string };
  [GA_EVENTS.DEMO_CLICK]: { location: string };
  [GA_EVENTS.DEMO_BOOKED]: { location: string };
  [GA_EVENTS.LANDING_VIEW]: { page?: string };
  [GA_EVENTS.PRICING_PAGE_VIEW]: { page?: string };
  [GA_EVENTS.DIRECTIVE_PAGE_VIEW]: { page?: string };
  [GA_EVENTS.DOCS_VIEW]: { path?: string };
  [GA_EVENTS.PAGE_VIEW]: { page_path?: string; page_title?: string };
  [GA_EVENTS.OUTBOUND_CLICK]: { url: string; link_text?: string };
  [GA_EVENTS.FILE_DOWNLOAD]: { file_name: string; file_extension?: string };
  [GA_EVENTS.CTA_CLICK]: { cta_name: string; location?: string };
};

/** Generic param map for events we don’t strictly type */
export type GaParamsGeneric = Record<string, string | number | boolean | undefined>;

/**
 * Send a custom event to Google Analytics 4 via gtag.
 * No-op if gtag is not loaded (e.g. SSR or script not yet ready).
 */
export function sendToGtag(event: string, params?: GaParamsGeneric): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const payload: GaParamsGeneric = {
    ...params,
    page_path: window.location.pathname,
    page_location: window.location.href,
  };

  window.gtag("event", event, payload);
}
