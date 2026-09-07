import type { Region } from "./types";

export interface Coords {
  lat: number;
  lng: number;
}

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Straight-line ("as the crow flies") distance in kilometers. */
export function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type TravelMode = "walk" | "drive";

/** Rough travel time from straight-line distance — always an estimate, never live traffic. */
export function estimateTravelMinutes(km: number, mode: TravelMode = "walk"): number {
  const speedKmh = mode === "walk" ? 4.5 : 40;
  return Math.max(1, Math.round((km / speedKmh) * 60));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(km < 10 ? 1 : 0)} km`;
}

/** e.g. "1.2 km · ~15 min walk" */
export function formatTravelEstimate(km: number, mode: TravelMode = "walk"): string {
  const minutes = estimateTravelMinutes(km, mode);
  return `${formatDistance(km)} · ~${minutes} min ${mode}`;
}

const REGION_BOUNDS: Partial<Record<Region, { latMin: number; latMax: number; lngMin: number; lngMax: number }>> = {
  athens: { latMin: 37.85, latMax: 38.05, lngMin: 23.6, lngMax: 23.85 },
  santorini: { latMin: 36.3, latMax: 36.5, lngMin: 25.3, lngMax: 25.5 },
  crete: { latMin: 34.9, latMax: 35.7, lngMin: 23.5, lngMax: 26.3 },
};

/**
 * Coarse region lookup from coordinates using fixed bounding boxes — the
 * three trip regions are far enough apart that this needs no geocoding API.
 * Returns undefined if the coordinates don't fall in any known region.
 */
export function inferRegionFromCoords(lat: number, lng: number): Region | undefined {
  for (const region of Object.keys(REGION_BOUNDS) as Region[]) {
    const bounds = REGION_BOUNDS[region];
    if (!bounds) continue;
    if (lat >= bounds.latMin && lat <= bounds.latMax && lng >= bounds.lngMin && lng <= bounds.lngMax) {
      return region;
    }
  }
  return undefined;
}
