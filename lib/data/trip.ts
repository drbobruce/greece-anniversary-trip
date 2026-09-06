import type { TripDay } from "../types";
import { mapsSearchUrl } from "../maps";

// The full day-by-day itinerary. Every field is optional except `date`,
// `region`, and `location` — leave anything blank until it's booked, and
// fill in confirmation numbers as they come in. Items marked `status:
// "pending"` are not yet finalized — don't treat them as booked.
export const tripDays: TripDay[] = [
  {
    date: "2026-09-10",
    label: "Travel Day",
    region: "transit",
    location: "In Transit — Charlotte → JFK → London Heathrow",
    bookedActivities: [
      {
        name: "American Airlines AA374 — Charlotte (CLT) → JFK",
        time: "~12:32 PM departure",
      },
      {
        name: "British Airways BA112 — JFK → London Heathrow (LHR)",
        time: "6:30 PM departure",
      },
    ],
    eveningPlan: "Overnight flight to London, connecting onward to Athens.",
    notes: "Add booking confirmation codes for AA374 and BA112 once available.",
  },
  {
    date: "2026-09-11",
    label: "Arrival",
    region: "athens",
    location: "London → Athens",
    hotelSlug: "grand-hyatt-athens",
    bookedActivities: [
      {
        name: "British Airways BA628 — London Heathrow (LHR) → Athens (ATH)",
        notes: "Add departure time and confirmation code once available.",
      },
    ],
    morningPlan: "Land in Athens, clear customs, and transfer to the hotel.",
    afternoonPlan: "Check in to Grand Hyatt Athens, freshen up, and rest after the long journey.",
    eveningPlan:
      "Possible walk up Mars Hill (Areopagus) for sunset views over the Acropolis and the city, if energy allows.",
    notes: "Expect to be tired from the overnight journey — keep today light.",
  },
  {
    date: "2026-09-12",
    label: "Athens",
    region: "athens",
    location: "Athens",
    hotelSlug: "grand-hyatt-athens",
    bookedActivities: [
      {
        name: "Private licensed-expert Acropolis & Acropolis Museum tour",
        time: "~3 hours",
        status: "pending",
        notes: "Priority activity for today. Add confirmation number and start time once booked.",
        mapsUrl: mapsSearchUrl("Acropolis of Athens"),
      },
    ],
    morningPlan:
      "Private licensed-expert guided tour of the Acropolis and the Acropolis Museum, about 3 hours.",
    lunch: "Casual lunch while wandering Plaka, Anafiotika, and Monastiraki.",
    afternoonPlan: "Walking through Plaka, Anafiotika, and Monastiraki.",
    dinner: "Rooftop or Acropolis-view dinner.",
    notes: "Main Athens sightseeing day — the Acropolis tour is the priority; keep the rest unhurried.",
  },
  {
    date: "2026-09-13",
    label: "Fly to Santorini",
    region: "santorini",
    location: "Athens → Santorini (Imerovigli)",
    hotelSlug: "santanna-luxury-suites",
    bookedActivities: [
      {
        name: "Aegean Airlines A3 356 — Athens (ATH) → Santorini (JTR)",
        confirmationNumber: "9XW6ZH",
        notes: "Departure time not yet confirmed — update once available.",
      },
    ],
    morningPlan: "Last Athens coffee and any final sightseeing before heading to the airport.",
    afternoonPlan:
      "Flight to Santorini (Aegean A3 356, confirmation 9XW6ZH); transfer to SantAnna Luxury Suites in Imerovigli.",
    eveningPlan: "Settle in, enjoy Imerovigli, pool and hotel time, then a sunset dinner nearby.",
    notes: "One-night stay in Imerovigli before moving to Oia tomorrow.",
  },
  {
    date: "2026-09-14",
    label: "Oia Day",
    region: "santorini",
    location: "Santorini (Oia)",
    hotelSlug: "canaves-oia-suites",
    morningPlan:
      "Breakfast at SantAnna, then transfer to Canaves Oia Suites to drop luggage. Late morning: wander Oia's pedestrian streets — blue-domed churches, windmills, and viewpoints.",
    lunch:
      "Around noon, walk down to Ammoudi Bay for a swim/snorkel near the rocks, then a waterfront seafood lunch — Dimitris Ammoudi Taverna is one good option. Taxi back up to Oia around 2:30 PM.",
    afternoonPlan:
      "3:00–5:00 PM: pool and suite time at Canaves. 5:00–7:00 PM: explore Oia again — shops, viewpoints, Oia Castle / Agios Nikolaos Castle ruins, and the windmills.",
    dinner: "Roka Oia recommended; Melitini as an alternate.",
    eveningPlan: "Sunset from a scenic viewpoint or over a cocktail, then a walk through Oia at night.",
  },
  {
    date: "2026-09-15",
    label: "Catamaran Day",
    region: "santorini",
    location: "Santorini (Oia)",
    hotelSlug: "canaves-oia-suites",
    bookedActivities: [
      {
        name: "Luxury Small-Group Catamaran Cruise with BBQ, Open Bar & Transfer",
        time: "3:00 PM",
        confirmationNumber: "1405255523",
        notes: "Approximately 5 hours, 2 adults. Includes BBQ, open bar, and transfer.",
      },
    ],
    morningPlan: "Keep the morning flexible — relax in Oia rather than a full hike.",
    afternoonPlan: "3:00 PM catamaran cruise (~5 hours) with BBQ, open bar, and transfer for two.",
    eveningPlan: "The cruise includes an on-board sunset — dinner can be light once back on land.",
    confirmationDetails: "Catamaran cruise confirmation: 1405255523.",
  },
  {
    date: "2026-09-16",
    label: "Island Adventure",
    region: "santorini",
    location: "Santorini",
    hotelSlug: "canaves-oia-suites",
    morningPlan: "Pick up a rented buggy / side-by-side to explore the island at our own pace.",
    afternoonPlan:
      "Suggested route: Oia → Pyrgos → Megalochori → Akrotiri / lighthouse area → Red Beach area → Vlychada / Perissa black-sand beach, with swim stops along the way.",
    lunch: "Lunch along the route, likely near Vlychada or Perissa.",
    dinner: "Dinner back in Oia.",
    eveningPlan: "One more Oia sunset before the ferry to Crete tomorrow.",
    notes: "Confirm buggy/side-by-side rental pickup and drop-off location and whether a car license is required.",
  },
  {
    date: "2026-09-17",
    label: "Ferry to Crete",
    region: "crete",
    location: "Santorini → Crete (Chania)",
    hotelSlug: "domes-zeen-chania",
    bookedActivities: [
      {
        name: "Ferry — Santorini → Crete",
        status: "pending",
        notes: "Company, departure time, and confirmation number are not yet booked.",
      },
    ],
    morningPlan: "Check out of Canaves Oia and transfer to the ferry port.",
    afternoonPlan: "Ferry from Santorini to Crete; transfer from the hotel to the ferry port.",
    dinner: "Relaxed dinner in Chania after checking in.",
    eveningPlan: "Explore Chania Old Town and the Venetian Harbor.",
    confirmationDetails:
      "Ferry booking is PENDING — company, time, and confirmation number to be added once booked.",
  },
  {
    date: "2026-09-18",
    label: "Chania",
    region: "crete",
    location: "Crete (Chania)",
    hotelSlug: "domes-zeen-chania",
    morningPlan: "Balos Lagoon — the primary must-do activity for the Crete stay.",
    lunch: "Lunch near Balos or back in Chania, depending on timing.",
    afternoonPlan: "Return from Balos; relax or continue exploring Chania.",
    dinner: "Dinner in Chania Old Town.",
    notes:
      "CHANGE PENDING: if the preferred return plan is adopted, this evening may instead include a flight from Chania to Athens rather than an overnight stay here — see the Sep 19 return plan.",
  },
  {
    date: "2026-09-19",
    label: "Return (Change Pending)",
    region: "crete",
    location: "Crete → Athens → London",
    hotelSlug: "domes-zeen-chania",
    bookedActivities: [
      {
        name: "Aegean Airlines A3 301 — Heraklion (HER) → Athens (ATH) [currently booked]",
        time: "6:00 AM → 6:50 AM",
        notes:
          "This is the current booked flight. Note it departs from Heraklion (HER), not Chania — a drive from Chania is required if this plan stands.",
      },
      {
        name: "PREFERRED (pending): Chania (CHQ) → Athens (ATH) evening flight — Sep 18",
        status: "pending",
        notes: "Alternate plan: fly from Chania the evening of Sep 18 and sleep near Athens airport.",
      },
      {
        name: "PREFERRED (pending): British Airways BA641 — Athens (ATH) → London Heathrow (LHR)",
        time: "8:15 AM departure",
        status: "pending",
        notes: "Part of the preferred alternate return plan; not yet booked.",
      },
    ],
    notes:
      "CHANGE PENDING: currently booked to fly HER → ATH on the morning of Sep 19, but the preferred plan is to reposition to Chania airport (CHQ) the evening of Sep 18, stay overnight near Athens, then fly BA641 to London the morning of Sep 19. Update once finalized.",
  },
];
