"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type SignupMessage =
  | {
      type: "signup_completed";
      plan?: string;
      location?: string;
    }
  | Record<string, unknown>;

export default function AnalyticsEventsListener() {
  useEffect(() => {
    // Capture signup completion via query param ?signup=success&plan=pro
    const search = new URLSearchParams(window.location.search);
    const signupStatus = search.get("signup");
    if (signupStatus === "success") {
      const plan = search.get("plan") || undefined;
      const location = search.get("loc") || "unknown";
      track("signup_completed", { plan, location });
      // Clean the URL so the event is not re-fired on reload
      search.delete("signup");
      search.delete("plan");
      search.delete("loc");
      const newQuery = search.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", newUrl);
    }

    // Capture signup completion via postMessage from the app shell
    const onMessage = (event: MessageEvent<SignupMessage>) => {
      if (!event?.data || typeof event.data !== "object") return;
      if ((event.data as SignupMessage).type === "signup_completed") {
        const { plan, location } = event.data as SignupMessage;
        track("signup_completed", { plan, location });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}

