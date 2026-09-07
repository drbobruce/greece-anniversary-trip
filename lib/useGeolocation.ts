"use client";

import { useEffect, useState } from "react";
import type { Coords } from "./geo";

export type GeolocationStatus = "idle" | "prompt" | "granted" | "denied" | "error";

export interface GeolocationState {
  coords?: Coords;
  status: GeolocationStatus;
  error?: string;
}

/** One-shot geolocation read. Denial/error just leaves `coords` unset — callers should fall back gracefully. */
export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return { status: "error", error: "Location isn't available on this device." };
    }
    return { status: "prompt" };
  });

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: "granted",
          coords: { lat: position.coords.latitude, lng: position.coords.longitude },
        });
      },
      (error) => {
        setState({
          status: error.code === error.PERMISSION_DENIED ? "denied" : "error",
          error: error.message,
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return state;
}
