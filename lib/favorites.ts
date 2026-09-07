"use client";

import { useCallback, useEffect, useState } from "react";
import type { FavoriteStatus } from "./types";

// Per-device favorite tracking, stored in localStorage — never written into
// the committed trip data. Marking a favorite here does NOT add it to the
// formal itinerary. Intentionally lightweight: no sync, no history, just a
// slug -> status map.
const STORAGE_KEY = "greece-trip:favorites";
const CHANGE_EVENT = "greece-trip:favorites-changed";

type FavoritesMap = Record<string, FavoriteStatus>;

function readAll(): FavoritesMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoritesMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: FavoritesMap): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // localStorage unavailable (private browsing, storage full, etc.) —
    // nothing to persist to, fail silently.
  }
}

export function getPlaceStatus(slug: string): FavoriteStatus | undefined {
  return readAll()[slug];
}

export function setPlaceStatus(slug: string, status: FavoriteStatus | undefined): void {
  const all = readAll();
  if (status) {
    all[slug] = status;
  } else {
    delete all[slug];
  }
  writeAll(all);
}

export function getAllStatuses(): FavoritesMap {
  return readAll();
}

/** Reactive access to the favorites map — updates when any component changes a status. */
export function useFavorites() {
  // Starts empty (not `readAll()`) so server and client render the same
  // thing on first paint — localStorage doesn't exist on the server, and
  // reading it in the initializer would mismatch during hydration. The
  // real values load in the effect below, immediately after mount.
  const [statuses, setStatuses] = useState<FavoritesMap>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial localStorage read; must happen post-hydration, not in the render-safe initializer above
    setStatuses(readAll());
    const handler = () => setStatuses(readAll());
    window.addEventListener(CHANGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setStatus = useCallback((slug: string, status: FavoriteStatus | undefined) => {
    setPlaceStatus(slug, status);
  }, []);

  return { statuses, setStatus };
}
