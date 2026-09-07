import { places } from "./data/places";
import { estimateTravelMinutes, haversineKm, type Coords } from "./geo";
import type { MoodTag, Place, PlaceCategory, Region } from "./types";

export interface RecommendationContext {
  region: Region;
  now: Date;
  coords?: Coords;
  /** Minutes available for the activity itself (not counting travel). Omit for "no limit". */
  timeBudgetMinutes?: number;
  mood?: MoodTag;
  /** Minutes until the next confirmed event, if known — used to suppress risky picks. */
  minutesUntilNextEvent?: number;
}

export interface ScoredPlace {
  place: Place;
  score: number;
  distanceKm?: number;
  travelMinutes?: number;
  /** True if fitting this in would risk being late for the next confirmed event. */
  risksLateness: boolean;
}

export interface RightNowRecommendations {
  eat: ScoredPlace[];
  doSomething: ScoredPlace[];
  relax: ScoredPlace[];
}

const CATEGORY_BUCKET: Record<PlaceCategory, "eat" | "do" | "relax" | null> = {
  restaurant: "eat",
  cafe: "eat",
  bar: "eat",
  attraction: "do",
  historic: "do",
  activity: "do",
  hike: "do",
  shopping: "do",
  viewpoint: "relax",
  beach: "relax",
  swimming: "relax",
  hotel: null,
  transportation: null,
};

const MOOD_MATCH: Record<MoodTag, (p: Place) => number> = {
  romantic: (p) => (p.romanticScore ?? 0) * 2,
  scenic: (p) => (p.scenicScore ?? 0) * 2,
  active: (p) => (p.activityScore ?? 0) * 2,
  historic: (p) => (p.category === "historic" ? 8 : 0),
  beach: (p) => (p.category === "beach" || p.category === "swimming" ? 8 : 0),
  shopping: (p) => (p.category === "shopping" ? 8 : 0),
  "casual-food": (p) =>
    p.category === "restaurant" ? ((p.priceLevel ?? 2) <= 2 ? 8 : 2) : 0,
  "nice-dinner": (p) => (p.category === "restaurant" && (p.priceLevel ?? 0) >= 3 ? 8 : 0),
  coffee: (p) => (p.category === "cafe" ? 8 : 0),
  drinks: (p) => (p.category === "bar" ? 8 : 0),
  relax: (p) => (p.scenicScore ?? 0) + (p.category === "beach" || p.category === "cafe" ? 4 : 0),
};

type TimeOfDayBucket = "morning" | "afternoon" | "evening" | "sunset" | "night";

/** Approximate — Greek sunset in September falls roughly 7:15–7:30 PM. */
function currentTimeBucket(now: Date): TimeOfDayBucket {
  const hour = now.getHours();
  if (hour < 11) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 19) return "evening";
  if (hour < 21) return "sunset";
  return "night";
}

function scorePlace(place: Place, ctx: RecommendationContext): ScoredPlace {
  let score = (place.romanticScore ?? 0) + (place.activityScore ?? 0) + (place.scenicScore ?? 0);

  if (ctx.mood) {
    score += MOOD_MATCH[ctx.mood](place);
  }

  let distanceKm: number | undefined;
  let travelMinutes: number | undefined;
  if (ctx.coords) {
    distanceKm = haversineKm(ctx.coords, { lat: place.lat, lng: place.lng });
    travelMinutes = estimateTravelMinutes(distanceKm, distanceKm > 2 ? "drive" : "walk");
    score += Math.max(0, 10 - distanceKm * 2); // closer is better, tapers off past ~5km
  }

  if (ctx.timeBudgetMinutes && place.expectedDurationMinutes) {
    const roundTripTravel = (travelMinutes ?? 15) * 2;
    const totalMinutes = place.expectedDurationMinutes + roundTripTravel;
    score += totalMinutes <= ctx.timeBudgetMinutes ? 6 : -6;
  }

  if (place.bestTimeOfDay === currentTimeBucket(ctx.now) || place.bestTimeOfDay === "any") {
    score += 3;
  }

  let risksLateness = false;
  if (ctx.minutesUntilNextEvent != null && place.expectedDurationMinutes != null) {
    const roundTripTravel = (travelMinutes ?? 15) * 2;
    const totalNeeded = place.expectedDurationMinutes + roundTripTravel;
    if (totalNeeded > ctx.minutesUntilNextEvent) {
      risksLateness = true;
      score -= 25;
    }
  }

  return { place, score, distanceKm, travelMinutes, risksLateness };
}

/**
 * Picks 3–5 strong ideas per bucket for the current moment — never a big
 * list. Places that would risk being late for the next confirmed event are
 * suppressed by default rather than shown with a warning.
 */
export function getRightNowRecommendations(ctx: RecommendationContext): RightNowRecommendations {
  const scored = places
    .filter((p) => p.region === ctx.region)
    .map((p) => scorePlace(p, ctx))
    .filter((sp) => !sp.risksLateness);

  const bucket = (name: "eat" | "do" | "relax") =>
    scored
      .filter((sp) => CATEGORY_BUCKET[sp.place.category] === name)
      .sort((a, b) => b.score - a.score || (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
      .slice(0, 5);

  return {
    eat: bucket("eat"),
    doSomething: bucket("do"),
    relax: bucket("relax"),
  };
}
