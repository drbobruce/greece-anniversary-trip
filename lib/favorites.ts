import type { FavoriteStatus } from "./types";

// Per-device favorite tracking, stored in localStorage — never written into
// the committed trip data. Marking a favorite here does NOT add it to the
// formal itinerary.
const STORAGE_KEY = "greece-trip:favorites";

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
