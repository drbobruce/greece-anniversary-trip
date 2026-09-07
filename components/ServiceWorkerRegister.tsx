"use client";

import { useEffect } from "react";

/** Registers the offline service worker — silent no-op if unsupported. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // offline support just won't be available — nothing else depends on it
    });
  }, []);

  return null;
}
