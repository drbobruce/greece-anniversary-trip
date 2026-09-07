// Core data model for the trip app.
// Keeping this in one place makes it easy to see everything a "day", "place",
// or "hotel" can carry, and keeps the sample data in lib/data/* type-checked.

export type Region = "athens" | "santorini" | "crete" | "transit";

export type PlaceCategory =
  | "restaurant"
  | "cafe"
  | "bar"
  | "attraction"
  | "historic"
  | "viewpoint"
  | "beach"
  | "swimming"
  | "hike"
  | "activity"
  | "shopping"
  | "hotel"
  | "transportation";

/** 1 = $, 2 = $$, 3 = $$$, 4 = $$$$ */
export type PriceLevel = 1 | 2 | 3 | 4;

export type BestTimeOfDay = "morning" | "afternoon" | "evening" | "sunset" | "night" | "any";

/** 1 (low) to 5 (high) */
export type Score = 1 | 2 | 3 | 4 | 5;

export interface Place {
  slug: string;
  name: string;
  category: PlaceCategory;
  /** Free-form refinement, e.g. "lunch", "dinner", "wine bar" */
  subcategory?: string;
  region: Region;
  /** Neighborhood or town, e.g. "Plaka", "Oia", "Chania Old Town" */
  area: string;
  lat: number;
  lng: number;
  description: string;
  whyWeLikeIt: string;
  /** Numeric so it's usable for time-budget matching; format for display. */
  expectedDurationMinutes?: number;
  bestTimeOfDay?: BestTimeOfDay;
  priceLevel?: PriceLevel;
  romanticScore?: Score;
  activityScore?: Score;
  scenicScore?: Score;
  /** Cuisine descriptor — restaurants/cafes/bars only */
  foodStyle?: string;
  reservationRecommended?: boolean;
  phone?: string;
  /** Freeform, e.g. "Daily 11am–11pm" — no live source, keep it simple */
  openingHours?: string;
  tags?: string[];
  mapsUrl?: string;
  websiteUrl?: string;
  notes?: string;
}

export type MoodTag =
  | "romantic"
  | "scenic"
  | "active"
  | "historic"
  | "beach"
  | "shopping"
  | "casual-food"
  | "nice-dinner"
  | "coffee"
  | "drinks"
  | "relax";

export type TimeBudgetMinutes = 30 | 60 | 120 | 240 | 480;

/** Per-device favorite tracking — never stored in the committed trip data. */
export type FavoriteStatus = "favorite" | "maybe-later" | "done";

/** The single soonest upcoming confirmed thing, used for "leave-by" awareness. */
export interface NextEvent {
  kind: "flight" | "ferry" | "activity" | "hotel-checkin";
  title: string;
  at: Date;
  lat?: number;
  lng?: number;
  referenceNumber?: string;
  mapsUrl?: string;
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
 * An airport or ferry port used as a transportation departure point — NOT a
 * recommendation. Used only so the trip-aware engine can estimate travel
 * time from the current location to a critical departure point for a
 * "leave by" calculation. Never surfaced as a place to visit.
 */
export interface TransitPoint {
  id: string;
  name: string;
  /** IATA airport code, when applicable */
  code?: string;
  kind: "airport" | "ferry-port";
  lat: number;
  lng: number;
}

/** A short contingency Q&A for the Travel Help screen — empty until you supply the answer. */
export interface ContingencyNote {
  id: string;
  question: string;
  answer?: string;
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
  phone?: string;
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
  restaurant: "Restaurants",
  cafe: "Cafés",
  bar: "Bars",
  attraction: "Things to Do",
  historic: "Historical Sites",
  viewpoint: "Viewpoints",
  beach: "Beaches",
  swimming: "Swimming",
  hike: "Hikes",
  activity: "Activities",
  shopping: "Shopping",
  hotel: "Hotels",
  transportation: "Transportation",
};

export const REGION_LABELS: Record<Region, string> = {
  athens: "Athens",
  santorini: "Santorini",
  crete: "Crete",
  transit: "In Transit",
};
