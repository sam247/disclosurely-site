"use client";

import { useState } from "react";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("cookie-consent") !== "accepted";
  });

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:left-1/2 sm:max-w-xl sm:-translate-x-1/2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.
        </p>
        <div className="flex gap-3">
          <button
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-gray-400"
            onClick={() => setVisible(false)}
          >
            Decline
          </button>
          <button
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={() => {
              localStorage.setItem("cookie-consent", "accepted");
              setVisible(false);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

