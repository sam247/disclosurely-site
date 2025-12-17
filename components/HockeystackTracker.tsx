'use client';

import { useEffect } from 'react';

export default function HockeystackTracker() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('wphs')) {
      return;
    }

    const hsscript = document.createElement('script');
    hsscript.id = 'wphs';
    hsscript.src = 'https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js';
    hsscript.async = true;
    // Use dataset property to ensure correct attribute names (auto-converts camelCase to kebab-case)
    hsscript.dataset.apikey = 'cdf5d6ce7ab794038a5cd0ba4e333e';
    hsscript.dataset.cookieless = '1';
    hsscript.dataset.autoIdentify = '1';
    document.getElementsByTagName('head')[0].appendChild(hsscript);
  }, []);

  return null;
}

