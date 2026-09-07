import { estimateTravelMinutes, haversineKm, type Coords } from "./geo";
import { hotels } from "./data/hotels";
import { transportLegs } from "./data/transport";
import { tripDays } from "./data/trip";
import type { NextEvent } from "./types";

const TRAVEL_BUFFER_MINUTES = 20;

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
    candidates.push({
      kind: leg.mode,
      title: `${leg.carrier}${leg.number ? " " + leg.number : ""} — ${leg.origin} → ${leg.destination}`,
      at,
      referenceNumber: leg.bookingReference,
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

export interface LeaveByEstimate {
  leaveBy: Date;
  minutesUntilLeaveBy: number;
  travelMinutes: number;
  bufferMinutes: number;
}

/**
 * A rough "leave by" time for a next event. Without coordinates for both
 * ends this can only apply a flat buffer — it's always an estimate, never
 * real routing/traffic.
 */
export function estimateLeaveBy(event: NextEvent, from: Coords | undefined, now: Date = new Date()): LeaveByEstimate {
  let travelMinutes = 0;
  if (from && event.lat != null && event.lng != null) {
    const km = haversineKm(from, { lat: event.lat, lng: event.lng });
    travelMinutes = estimateTravelMinutes(km, km > 2 ? "drive" : "walk");
  }

  const bufferMinutes = TRAVEL_BUFFER_MINUTES;
  const leaveBy = new Date(event.at.getTime() - (travelMinutes + bufferMinutes) * 60000);
  const minutesUntilLeaveBy = Math.round((leaveBy.getTime() - now.getTime()) / 60000);

  return { leaveBy, minutesUntilLeaveBy, travelMinutes, bufferMinutes };
}
