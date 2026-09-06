import { hotels } from "./data/hotels";
import { places } from "./data/places";
import { tripDays } from "./data/trip";
import type { Place, PlaceCategory, Region, TripDay } from "./types";

export { mapsSearchUrl } from "./maps";

function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function formatDateLong(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return toDate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getTripDays(): TripDay[] {
  return [...tripDays].sort((a, b) => a.date.localeCompare(b.date));
}

export function getDayByDate(date: string): TripDay | undefined {
  return tripDays.find((day) => day.date === date);
}

export function getHotelBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return hotels.find((hotel) => hotel.slug === slug);
}

export function getPlacesByRegion(region: Region): Place[] {
  return places.filter((place) => place.region === region);
}

export function getPlacesByCategory(category: PlaceCategory): Place[] {
  return places.filter((place) => place.category === category);
}

/**
 * Picks a small, varied set of ideas for a region — one per category where
 * possible — for the "What should we do right now?" widget.
 */
export function getNearbyIdeas(region: Region, count = 4): Place[] {
  const candidates = getPlacesByRegion(region);
  const seenCategories = new Set<PlaceCategory>();
  const picks: Place[] = [];

  for (const place of candidates) {
    if (picks.length >= count) break;
    if (seenCategories.has(place.category)) continue;
    seenCategories.add(place.category);
    picks.push(place);
  }

  if (picks.length < count) {
    for (const place of candidates) {
      if (picks.length >= count) break;
      if (!picks.includes(place)) picks.push(place);
    }
  }

  return picks;
}

export type TodayStatus = "before" | "during" | "after";

export interface TodayInfo {
  status: TodayStatus;
  /** The matching trip day, when status is "during" */
  day?: TripDay;
  /** The next upcoming day, when status is "before" */
  nextDay?: TripDay;
  /** The final day, when status is "after" */
  lastDay?: TripDay;
  daysUntilTrip?: number;
}

export function getTodayInfo(now: Date = new Date()): TodayInfo {
  const days = getTripDays();
  const todayIso = now.toISOString().slice(0, 10);

  const day = days.find((d) => d.date === todayIso);
  if (day) {
    return { status: "during", day };
  }

  const firstDay = days[0];
  const lastDay = days[days.length - 1];

  if (firstDay && todayIso < firstDay.date) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntilTrip = Math.ceil(
      (toDate(firstDay.date).getTime() - toDate(todayIso).getTime()) /
        msPerDay
    );
    return { status: "before", nextDay: firstDay, daysUntilTrip };
  }

  return { status: "after", lastDay };
}
