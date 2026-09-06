import type { Hotel } from "../types";
import { mapsSearchUrl } from "../maps";

// Fill in real confirmation numbers, addresses, and reservation links as you
// get them — every field except the required ones below is optional.
export const hotels: Hotel[] = [
  {
    slug: "grand-hyatt-athens",
    name: "Grand Hyatt Athens",
    region: "athens",
    area: "Athens",
    checkIn: "2026-09-11",
    checkOut: "2026-09-13",
    description:
      "A polished, central base for exploring Athens, within easy reach of the historic center.",
    notes: "Add confirmation number and room type once booked.",
    mapsUrl: mapsSearchUrl("Grand Hyatt Athens"),
  },
  {
    slug: "santanna-luxury-suites",
    name: "SantAnna Luxury Suites",
    region: "santorini",
    area: "Imerovigli, Santorini",
    checkIn: "2026-09-13",
    checkOut: "2026-09-14",
    description:
      "A one-night caldera-view stay in Imerovigli, the quiet clifftop village between Fira and Oia.",
    notes: "Short stay before moving to Oia — pack a light bag for the transfer.",
    mapsUrl: mapsSearchUrl("SantAnna Luxury Suites Imerovigli Santorini"),
  },
  {
    slug: "canaves-oia-suites",
    name: "Canaves Oia Suites",
    region: "santorini",
    area: "Oia, Santorini",
    checkIn: "2026-09-14",
    checkOut: "2026-09-17",
    description:
      "Three nights in Oia, famous for whitewashed caldera views and the classic Santorini sunset.",
    notes: "Add confirmation number and room type once booked.",
    mapsUrl: mapsSearchUrl("Canaves Oia Suites Santorini"),
  },
  {
    slug: "domes-zeen-chania",
    name: "Domes Zeen Chania",
    region: "crete",
    area: "Chania, Crete",
    checkIn: "2026-09-17",
    checkOut: "2026-09-19",
    description:
      "The final stop of the trip, on the coast near Chania on Crete's northwest shore.",
    notes: "Add confirmation number and return-flight details once booked.",
    mapsUrl: mapsSearchUrl("Domes Zeen Chania Crete"),
  },
];
