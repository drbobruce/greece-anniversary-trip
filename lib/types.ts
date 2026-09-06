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

export interface BookedActivity {
  name: string;
  time?: string;
  confirmationNumber?: string;
  notes?: string;
  mapsUrl?: string;
  websiteUrl?: string;
}

export interface Hotel {
  slug: string;
  name: string;
  region: Region;
  area: string;
  checkIn: string; // ISO date, YYYY-MM-DD
  checkOut: string; // ISO date, YYYY-MM-DD
  address?: string;
  confirmationNumber?: string;
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
  bookedActivities?: BookedActivity[];
  confirmationDetails?: string;
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
