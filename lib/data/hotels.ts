import type { Hotel } from "../types";
import { mapsSearchUrl } from "../maps";

// Every hotel is currently booked and confirmed. Fill in anything still
// missing (websites, extra notes) as it comes in — never guess a
// confirmation number or address.
export const hotels: Hotel[] = [
  {
    slug: "grand-hyatt-athens",
    name: "Grand Hyatt Athens",
    region: "athens",
    area: "Athens",
    address: "115 Syngrou Avenue, Athens 11745, Greece",
    guests: 2,
    checkIn: "2026-09-11",
    checkOut: "2026-09-13",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    roomType: "Standard Room, 1 King Bed",
    ratePlan: "Free Night / Points — 15,000 points/night (30,000 points total)",
    confirmationNumber: "65027792",
    description:
      "A polished, central base for exploring Athens, within easy reach of the historic center.",
    mapsUrl: mapsSearchUrl("Grand Hyatt Athens"),
  },
  {
    slug: "santanna-luxury-suites",
    name: "SantAnna Luxury Suites",
    region: "santorini",
    area: "Imerovigli, Santorini",
    address: "Imerovigli, Santorini 84700, Greece",
    guests: 2,
    checkIn: "2026-09-13",
    checkOut: "2026-09-14",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    roomType: "Junior Suite Pool Front",
    bedConfig: "1 bed",
    confirmationNumber: "436-7110689",
    tripId: "1012145466",
    totalCost: "$326.96",
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
    address: "Oia, Santorini 84702, Greece",
    guests: 2,
    checkIn: "2026-09-14",
    checkOut: "2026-09-17",
    checkInTime: "3:00 PM",
    checkOutTime: "11:00 AM",
    roomType: "Junior Suite",
    bedConfig: "1 King Bed",
    sizeSqFt: "approximately 376 sq ft",
    view: "Caldera view",
    confirmationNumber: "78762SF009125-",
    tripId: "1009827134",
    benefits: [
      "Daily breakfast for 2",
      "$100 property credit",
      "Room upgrade at check-in if available",
      "Early check-in/late checkout benefit",
      "Wi-Fi",
      "Welcome amenity",
    ],
    description:
      "Three nights in Oia, famous for whitewashed caldera views and the classic Santorini sunset — one of the major luxury splurges of the trip.",
    mapsUrl: mapsSearchUrl("Canaves Oia Suites Santorini"),
  },
  {
    slug: "domes-zeen-chania",
    name: "Domes Zeen Chania, a Luxury Collection Resort",
    region: "crete",
    area: "Chania, Crete",
    guestName: "Lisa Bruce",
    checkIn: "2026-09-17",
    checkOut: "2026-09-19",
    confirmationNumber: "H-KB9G3VQPB958",
    totalCost: "$508.37/night before taxes/fees",
    taxesFeesNote: "$67.81/night",
    description:
      "The final stop of the trip, on the coast near Chania on Crete's northwest shore. Stay: 2 nights, 1 room.",
    notes:
      "The currently booked return flight (A3 301, confirmation 9Y3G2J) departs from Heraklion (HER), not Chania — see the Sep 19 return plan under Open Items. A change to Chania (CHQ) is under consideration but not booked.",
    mapsUrl: mapsSearchUrl("Domes Zeen Chania Crete"),
  },
];
