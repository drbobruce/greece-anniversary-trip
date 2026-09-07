import type { TransitPoint } from "../types";

// Airports and ferry ports actually used on this trip. These exist ONLY so
// the trip-aware engine can estimate travel time to a departure point for
// "leave by" math — they are never shown as tourist recommendations. Do not
// add this file's exports to any Places listing.
export const transitPoints: TransitPoint[] = [
  {
    id: "clt",
    name: "Charlotte Douglas International Airport",
    code: "CLT",
    kind: "airport",
    lat: 35.2144,
    lng: -80.9473,
  },
  {
    id: "jfk",
    name: "John F. Kennedy International Airport",
    code: "JFK",
    kind: "airport",
    lat: 40.6413,
    lng: -73.7781,
  },
  {
    id: "lhr",
    name: "London Heathrow Airport",
    code: "LHR",
    kind: "airport",
    lat: 51.47,
    lng: -0.4543,
  },
  {
    id: "ath",
    name: "Athens International Airport (Eleftherios Venizelos)",
    code: "ATH",
    kind: "airport",
    lat: 37.9364,
    lng: 23.9445,
  },
  {
    id: "jtr",
    name: "Santorini (Thira) National Airport",
    code: "JTR",
    kind: "airport",
    lat: 36.3992,
    lng: 25.4793,
  },
  {
    id: "santorini-ferry-port",
    name: "Athinios Ferry Port, Santorini",
    kind: "ferry-port",
    lat: 36.3833,
    lng: 25.4167,
  },
  {
    id: "heraklion-ferry-port",
    name: "Heraklion Port (Ferry)",
    kind: "ferry-port",
    lat: 35.3419,
    lng: 25.1508,
  },
  {
    id: "her",
    name: "Heraklion International Airport (Nikos Kazantzakis)",
    code: "HER",
    kind: "airport",
    lat: 35.3397,
    lng: 25.1803,
  },
  {
    id: "chq",
    name: "Chania International Airport (Ioannis Daskalogiannis)",
    code: "CHQ",
    kind: "airport",
    lat: 35.5317,
    lng: 24.1497,
  },
];

/**
 * Resolves a free-text origin/destination like "Charlotte (CLT)" or
 * "Santorini (Thira)" to its known transit point, for departure-point
 * travel estimates. Matches by IATA code first (word-boundary, so "HER"
 * doesn't match inside another word), then falls back to a couple of known
 * ferry-port name fragments since those legs don't carry a code. Returns
 * undefined rather than guessing when nothing matches.
 */
export function findTransitPoint(text: string): TransitPoint | undefined {
  for (const point of transitPoints) {
    if (point.code && new RegExp(`\\b${point.code}\\b`).test(text)) {
      return point;
    }
  }
  if (/thira/i.test(text)) {
    return transitPoints.find((p) => p.id === "santorini-ferry-port");
  }
  if (/heraklion/i.test(text)) {
    return transitPoints.find((p) => p.id === "heraklion-ferry-port");
  }
  return undefined;
}
