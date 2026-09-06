// Core data model for the trip app.
// Keeping this in one place makes it easy to see everything a "day", "place",
// or "hotel" can carry, and keeps the sample data in lib/data/* type-checked.

export type Region = "athens" | "santorini" | "crete" | "transit";

export type PlaceCategory =
  | "restaurants"
  | "lunch"
  | "coffee-breakfast"
  | "things-to-do"
  | "beaches-swimming"
  | "historical-sites"
  | "shopping"
  | "free-time-ideas";

/** 1 = $, 2 = $$, 3 = $$$, 4 = $$$$ */
export type PriceLevel = 1 | 2 | 3 | 4;

export interface Place {
  slug: string;
  name: string;
  category: PlaceCategory;
  region: Region;
  /** Neighborhood or town, e.g. "Plaka", "Oia", "Chania Old Town" */
  area: string;
  description: string;
  priceLevel?: PriceLevel;
  whyWeMightLikeIt: string;
  mapsUrl?: string;
  websiteUrl?: string;
}

/**
 * "booked" = paid/ticketed and not expected to change.
 * "change-pending" = currently booked, but flagged for a likely change — do
 * NOT treat as final.
 * "planned" = an idea/preference only — nothing has been reserved yet.
 */
export type BookingStatus = "booked" | "change-pending" | "planned";

/**
 * One flight or ferry leg. Covers both so the "Flights & Ferry" view can
 * render them together in chronological order. Only `id`, `mode`, `status`,
 * `carrier`, `origin`, `destination`, and `date` are required — leave
 * everything else out (never guessed) until the real value is known.
 */
export interface TransportLeg {
  id: string;
  mode: "flight" | "ferry";
  status: BookingStatus;
  carrier: string;
  /** Flight number or vessel name, e.g. "AA374" or "Champion Jet 1" */
  number?: string;
  origin: string;
  destination: string;
  /** ISO date, YYYY-MM-DD — the departure date */
  date: string;
  departureTime?: string;
  arrivalTime?: string;
  /** For overnight/next-day arrivals, e.g. "Arrives Fri, Sep 11 · Terminal 5" */
  arrivalNote?: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
  duration?: string;
  cabin?: string;
  /** Aircraft type or vessel name */
  vehicle?: string;
  fareFamily?: string;
  bookingClass?: string;
  passengers?: string[];
  seats?: string[];
  bookingReference?: string;
  secondaryReferenceLabel?: string;
  secondaryReference?: string;
  notes?: string;
}

/** A to-do item that isn't resolved yet — surfaced in the Open Items list. */
export interface OpenItem {
  id: string;
  title: string;
  detail?: string;
  /** ISO date this item relates to, if any — links back to that day */
  relatedDate?: string;
}

/**
 * Research or an alternative that didn't make the main plan but is worth
 * keeping around rather than deleting outright.
 */
export interface BackupIdea {
  id: string;
  title: string;
  detail: string;
  relatedDate?: string;
}

/**
 * A confirmed, paid reservation for an activity/tour/experience (not a
 * flight, ferry, or hotel — see `TransportLeg` and `Hotel`) — visually
 * distinct in the UI from casual plans. Only fill in fields you actually
 * have; everything but `activityName`, `date`, `startTime`, and
 * `referenceNumber` is optional and should be left out (never guessed)
 * until you have the real value.
 */
export interface ConfirmedBooking {
  activityName: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  startTime: string;
  /** Labeled as an approximate finish in the UI, not a guaranteed end time. */
  approximateEndTime?: string;
  /** e.g. "approximately 3 hours" */
  durationLabel?: string;
  /** e.g. "2 adults" */
  travelers?: string;
  language?: string;
  referenceNumber: string;
  /** What the booking confirms is included, e.g. ["BBQ", "Open bar", "Transfer"] */
  included?: string[];
  meetingPoint?: string;
  pickupTime?: string;
  pickupLocation?: string;
  ticketInfo?: string;
  whatToBring?: string;
  cancellationPolicy?: string;
  operatorContact?: string;
  bookingUrl?: string;
  mapsUrl?: string;
  /** Caveats, e.g. that an end time or pickup detail is only approximate/pending. */
  notes?: string;
}

export interface Hotel {
  slug: string;
  name: string;
  region: Region;
  area: string;
  address?: string;
  /** Name the reservation is under, if different/notable, e.g. "Lisa Bruce" */
  guestName?: string;
  guests?: number;
  checkIn: string; // ISO date, YYYY-MM-DD
  checkOut: string; // ISO date, YYYY-MM-DD
  checkInTime?: string;
  checkOutTime?: string;
  roomType?: string;
  bedConfig?: string;
  sizeSqFt?: string;
  view?: string;
  confirmationNumber?: string;
  /** Booking platform's trip/itinerary ID, e.g. a Chase Travel Trip ID */
  tripId?: string;
  /** e.g. "Free Night / Points — 15,000/night (30,000 total)" */
  ratePlan?: string;
  totalCost?: string;
  taxesFeesNote?: string;
  benefits?: string[];
  description?: string;
  notes?: string;
  mapsUrl?: string;
  websiteUrl?: string;
}

export interface TripDay {
  /** ISO date, YYYY-MM-DD — also used as the route param and sort key */
  date: string;
  /** Short tag shown on cards, e.g. "Travel Day", "Arrival" */
  label?: string;
  region: Region;
  /** Human-readable location shown in headers, e.g. "Athens" or "In transit" */
  location: string;
  hotelSlug?: string;
  morningPlan?: string;
  lunch?: string;
  afternoonPlan?: string;
  dinner?: string;
  eveningPlan?: string;
  /** Paid, confirmed reservations for this day — rendered as prominent cards. */
  confirmedBookings?: ConfirmedBooking[];
  notes?: string;
}

export const PLACE_CATEGORY_LABELS: Record<PlaceCategory, string> = {
  restaurants: "Restaurants",
  lunch: "Lunch",
  "coffee-breakfast": "Coffee & Breakfast",
  "things-to-do": "Things to Do",
  "beaches-swimming": "Beaches & Swimming",
  "historical-sites": "Historical Sites",
  shopping: "Shopping",
  "free-time-ideas": "Free-Time Ideas",
};

export const REGION_LABELS: Record<Region, string> = {
  athens: "Athens",
  santorini: "Santorini",
  crete: "Crete",
  transit: "In Transit",
};
