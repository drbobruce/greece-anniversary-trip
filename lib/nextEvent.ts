import { estimateTravelMinutes, haversineKm, type Coords } from "./geo";
import { mapsSearchUrl } from "./maps";
import { findTransitPoint } from "./data/transitPoints";
import { hotels } from "./data/hotels";
import { transportLegs } from "./data/transport";
import { tripDays } from "./data/trip";
import type { NextEvent } from "./types";

/**
 * Fixed arrival buffer — time you need AT the departure point itself
 * (security, check-in, boarding) before wheels-up/departure. Critical
 * transportation gets a much larger buffer than a casual activity.
 */
const ARRIVAL_BUFFER_MINUTES_BY_KIND: Record<NextEvent["kind"], number> = {
  flight: 90,
  ferry: 60,
  activity: 20,
  "hotel-checkin": 15,
};

/**
 * Extra padding applied to the estimated travel time itself, on top of the
 * arrival buffer above — since this is straight-line distance, not live
 * routing/traffic, critical transportation gets padded the most. Be
 * conservative: this is more important than a tight-but-technically-correct
 * estimate.
 */
const TRAVEL_SAFETY_MULTIPLIER_BY_KIND: Record<NextEvent["kind"], number> = {
  flight: 1.3,
  ferry: 1.25,
  activity: 1.1,
  "hotel-checkin": 1.0,
};

/**
 * All display times in this app follow "H:MM AM/PM" (e.g. "8:35 AM"),
 * sometimes with trailing text ("10:30 AM (drop-off)"). This pulls the
 * leading time out of that pattern; anything else (e.g. "Evening (exact
 * time TBD)") is intentionally left unparsed rather than guessed.
 */
function parseTimeOnDate(dateIso: string, timeStr: string | undefined): Date | undefined {
  if (!timeStr) return undefined;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return undefined;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const date = new Date(`${dateIso}T00:00:00`);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/** The single soonest upcoming confirmed thing — flights/ferry, activities, hotel checkout. */
export function getNextEvent(now: Date = new Date()): NextEvent | undefined {
  const candidates: NextEvent[] = [];

  for (const leg of transportLegs) {
    if (leg.status === "planned") continue; // nothing reserved yet — not a real event
    const at = parseTimeOnDate(leg.date, leg.departureTime);
    if (!at || at < now) continue;
    // The departure point (origin) is what matters for "how do I get there" —
    // resolved from the known airports/ferry ports, never guessed.
    const departurePoint = findTransitPoint(leg.origin);
    candidates.push({
      kind: leg.mode,
      title: `${leg.carrier}${leg.number ? " " + leg.number : ""} — ${leg.origin} → ${leg.destination}`,
      at,
      referenceNumber: leg.bookingReference,
      mapsUrl: mapsSearchUrl(leg.origin),
      lat: departurePoint?.lat,
      lng: departurePoint?.lng,
    });
  }

  for (const day of tripDays) {
    for (const booking of day.confirmedBookings ?? []) {
      const at = parseTimeOnDate(booking.date, booking.startTime);
      if (!at || at < now) continue;
      candidates.push({
        kind: "activity",
        title: booking.activityName,
        at,
        referenceNumber: booking.referenceNumber,
        mapsUrl: booking.mapsUrl,
      });
    }

    const hotel = hotels.find((h) => h.slug === day.hotelSlug);
    if (hotel && hotel.checkOut === day.date && hotel.checkOutTime) {
      const at = parseTimeOnDate(day.date, hotel.checkOutTime);
      if (at && at >= now) {
        candidates.push({
          kind: "hotel-checkin",
          title: `Check out — ${hotel.name}`,
          at,
          mapsUrl: hotel.mapsUrl,
        });
      }
    }
  }

  candidates.sort((a, b) => a.at.getTime() - b.at.getTime());
  return candidates[0];
}

export function minutesUntil(at: Date, now: Date = new Date()): number {
  return Math.round((at.getTime() - now.getTime()) / 60000);
}

export interface LeaveByEstimate {
  leaveBy: Date;
  minutesUntilLeaveBy: number;
  /** Estimated travel time, already padded by the safety multiplier below. */
  travelMinutes: number;
  bufferMinutes: number;
  /** True when travelMinutes reflects a real distance rather than the flat fallback. */
  hasRealTravelEstimate: boolean;
}

/**
 * A "leave by" time combining three things: estimated travel time (padded
 * with an extra safety margin for critical transportation), a fixed arrival
 * buffer at the departure point, and — implicitly — the fact that none of
 * this is live routing/traffic. Always estimated; always labeled as such in
 * the UI. Without coordinates for both ends this can only apply the flat
 * buffer, which is intentionally conservative.
 */
export function estimateLeaveBy(event: NextEvent, from: Coords | undefined, now: Date = new Date()): LeaveByEstimate {
  let rawTravelMinutes = 0;
  let hasRealTravelEstimate = false;
  if (from && event.lat != null && event.lng != null) {
    const km = haversineKm(from, { lat: event.lat, lng: event.lng });
    rawTravelMinutes = estimateTravelMinutes(km, km > 2 ? "drive" : "walk");
    hasRealTravelEstimate = true;
  }

  const travelMinutes = Math.round(rawTravelMinutes * TRAVEL_SAFETY_MULTIPLIER_BY_KIND[event.kind]);
  const bufferMinutes = ARRIVAL_BUFFER_MINUTES_BY_KIND[event.kind];
  const leaveBy = new Date(event.at.getTime() - (travelMinutes + bufferMinutes) * 60000);
  const minutesUntilLeaveBy = Math.round((leaveBy.getTime() - now.getTime()) / 60000);

  return { leaveBy, minutesUntilLeaveBy, travelMinutes, bufferMinutes, hasRealTravelEstimate };
}
