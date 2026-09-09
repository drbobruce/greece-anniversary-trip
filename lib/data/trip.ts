import type { TripDay } from "../types";
import { mapsSearchUrl } from "../maps";

// The full day-by-day itinerary. Flights and the ferry live in
// lib/data/transport.ts and are shown automatically on their date — don't
// duplicate them here. `confirmedBookings` is for paid activities/tours
// (not transport or hotels). Every field besides `date`, `region`, and
// `location` is optional — leave anything blank until it's decided, and
// never invent a time, price, or confirmation number.
export const tripDays: TripDay[] = [
  {
    date: "2026-09-10",
    label: "Travel Day",
    region: "transit",
    location: "In Transit — Charlotte → JFK → London Heathrow",
    confirmedBookings: [
      {
        activityName: "Airport Parking — The Parking Spot (Charlotte/CLT, Covered Self-Park)",
        date: "2026-09-10",
        startTime: "10:30 AM (drop-off)",
        referenceNumber: "127918656",
        meetingPoint: "6210 Wilkinson Blvd., Charlotte, NC 28214",
        operatorContact: "(704) 398-3776",
        notes:
          "Return pick-up (check-out): Saturday, September 19 at 9:00 PM.",
        mapsUrl: mapsSearchUrl("The Parking Spot 6210 Wilkinson Blvd Charlotte NC"),
      },
    ],
    morningPlan: "Drop off the car at The Parking Spot (CLT) around 10:30 AM before heading to check-in.",
    afternoonPlan:
      "Long layover at JFK — land at 2:30 PM on AA374, don't leave until 6:30 PM on BA112 (~4 hours). Plan: the Sapphire Lounge by The Club (Chase x Etihad Airways), Terminal 4, Level 4, after security. Made-to-order dining, cocktails, shower suites — a good place to reset before the overnight flight.",
    eveningPlan: "Overnight flight to London, connecting onward to Athens tomorrow.",
    notes:
      "Sapphire Lounge: open daily 5:00 AM–11:00 PM, though actual hours may not always match what's listed. chase.com/sapphireairportlounge. This is the plan, not a confirmed reservation — lounges like this don't take bookings.",
  },
  {
    date: "2026-09-11",
    label: "Arrival",
    region: "athens",
    location: "London → Athens",
    hotelSlug: "grand-hyatt-athens",
    morningPlan: "Land in Athens at 2:20 PM; clear customs and transfer to the Grand Hyatt.",
    afternoonPlan: "Check in to Grand Hyatt Athens and rest after the long journey. Keep this evening relatively easy.",
    eveningPlan:
      "Mars Hill (Areopagus) is an option for sunset over the Acropolis, depending on energy. A dinner with an Acropolis/Athens view is the goal either way.",
    notes: "Expect to be tired from the overnight journey — keep today light.",
  },
  {
    date: "2026-09-12",
    label: "Athens",
    region: "athens",
    location: "Athens",
    hotelSlug: "grand-hyatt-athens",
    confirmedBookings: [
      {
        activityName:
          "Acropolis and Acropolis Museum Private Tour with Licensed Expert — Acropolis & Museum 3-hr 08:00",
        date: "2026-09-12",
        startTime: "8:00 AM",
        approximateEndTime: "11:00 AM",
        durationLabel: "approximately 3 hours",
        travelers: "2 adults",
        language: "English",
        referenceNumber: "1441079581",
        notes:
          "Booking reference from our Viator planning records. 11:00 AM finish time is approximate, not confirmed. Admission tickets, transportation, hotel pickup, and a specific meeting location have not been provided yet.",
        mapsUrl: mapsSearchUrl("Acropolis of Athens"),
      },
    ],
    morningPlan:
      "Breakfast and get ready, then the private Acropolis & Acropolis Museum tour (see confirmed booking below), approximately 8:00–11:00 AM with a licensed expert.",
    lunch: "Relaxed Greek lunch in the Plaka / Monastiraki area, after exploring Plaka and Anafiotika on foot.",
    afternoonPlan:
      "Monastiraki — shops, cafés, sightseeing, and flexible free time. Hotel rest time if it feels good. Ancient Agora only if there's extra time (see Optional Ideas) — don't overschedule the afternoon.",
    eveningPlan: "Acropolis-view rooftop dinner or drinks.",
    notes:
      "This is the primary Athens sightseeing day — the Acropolis tour anchors the morning; avoid overscheduling the afternoon/evening.",
  },
  {
    date: "2026-09-13",
    label: "Fly to Santorini",
    region: "santorini",
    location: "Athens → Santorini (Imerovigli)",
    hotelSlug: "santanna-luxury-suites",
    morningPlan: "Last Athens coffee and any final packing before heading to the airport.",
    afternoonPlan:
      "Fly to Santorini (Aegean A3 356, 11:00 AM–11:50 AM — see Flights). Arrive at 11:50 AM and transfer to SantAnna Luxury Suites in Imerovigli.",
    eveningPlan: "Relax and enjoy the hotel/pool, explore Imerovigli, then a romantic sunset dinner nearby.",
    notes: "Keep this afternoon/evening relatively relaxed after a full day of travel. One night in Imerovigli before moving to Oia tomorrow.",
  },
  {
    date: "2026-09-14",
    label: "Oia Day",
    region: "santorini",
    location: "Santorini (Oia)",
    hotelSlug: "canaves-oia-suites",
    morningPlan:
      "8:00–9:00 AM: breakfast at SantAnna. 9:30–10:30 AM: transfer to Canaves Oia Suites (leave luggage with Canaves if the room isn't ready). 10:30 AM–12:00 PM: explore Oia on foot — pedestrian streets, shops, boutiques, galleries, blue-domed churches, windmills, and caldera viewpoints, unstructured.",
    lunch:
      "~12:00 PM: walk down to Ammoudi Bay. 12:15–1:15 PM: swim/snorkel at the rocky swimming area beyond the harbor (not a sandy beach — bring swimsuits, water shoes, and snorkel gear if desired). 1:15–2:30 PM: waterfront lunch at Ammoudi — Dimitris Ammoudi Taverna is the preferred option for relaxed Greek seafood on the water. ~2:30 PM: taxi back up to Oia rather than climbing the steps.",
    afternoonPlan:
      "3:00–5:00 PM: check in and intentionally enjoy Canaves Oia Suites — pool, caldera views, suite, and drinks. This is scheduled relaxation, not downtime to rush through. 5:00–7:00 PM: explore Oia again — Oia Castle ruins, windmills, the western side of the village, shops, and viewpoints.",
    dinner:
      "~8:00 PM dinner in Oia. First choice: Roka Oia (relaxed, authentic Greek). Alternate: Melitini (casual Greek meze/shareable plates).",
    eveningPlan:
      "Sunset: a cocktail or scenic viewpoint — no need to fight the biggest crowds at Oia Castle. After dinner: a nighttime walk through Oia once the day-trip crowds have thinned.",
  },
  {
    date: "2026-09-15",
    label: "Catamaran Day",
    region: "santorini",
    location: "Santorini (Oia)",
    hotelSlug: "canaves-oia-suites",
    confirmedBookings: [
      {
        activityName:
          "Luxury Small-Group Catamaran Cruise with BBQ, Open Bar & Transfer — Sunset Cruise 15:00",
        date: "2026-09-15",
        startTime: "3:00 PM",
        approximateEndTime: "8:00 PM",
        durationLabel: "approximately 5 hours",
        travelers: "2 adults",
        language: "English",
        referenceNumber: "1405255523",
        included: ["BBQ", "Open bar", "Transfer", "Swimming/snorkeling opportunities"],
        notes: "Pickup details/time to be confirmed from operator instructions. End time is approximate.",
      },
    ],
    morningPlan:
      "Leisurely breakfast at Canaves Oia Suites. Keep the morning intentionally flexible — do not schedule a full Fira-to-Oia hike; we want plenty of time for breakfast, the hotel, and being ready for cruise pickup.",
    lunch: "Light lunch in Oia.",
    afternoonPlan:
      "Late morning into early afternoon: easy Oia exploring — shopping, coffee, pool or suite time. Return to Canaves in the early afternoon to change and get ready, allowing plenty of time for the included transfer. 3:00 PM–approximately 8:00 PM: confirmed sunset catamaran cruise (see confirmed booking below).",
    eveningPlan: "After returning: keep the evening flexible — no dinner reservation or additional activity scheduled.",
    notes: "Morning and evening are intentionally left open around the five-hour afternoon/evening cruise.",
  },
  {
    date: "2026-09-16",
    label: "Island Adventure (Planned)",
    region: "santorini",
    location: "Santorini",
    hotelSlug: "canaves-oia-suites",
    morningPlan:
      "PLANNED, NOT YET BOOKED: pick up a self-drive buggy/Polaris (preferred over a standard rental car or ATV) to explore the island at our own pace.",
    afternoonPlan:
      "Potential route: Oia → Pyrgos → Megalochori → Akrotiri area → lighthouse → Red Beach area → Vlychada and/or Perissa/Perivolos black-sand beach → lunch → return to Oia. An active, fun day rather than a formal guided tour.",
    lunch: "Lunch along the route, likely near Vlychada or Perissa/Perivolos.",
    dinner: "Dinner back in Oia.",
    eveningPlan: "One more Oia sunset before the ferry to Crete tomorrow.",
    notes:
      "The buggy/Polaris rental is not booked yet — see Open Items. Do not treat this route as confirmed until an actual reservation is made.",
  },
  {
    date: "2026-09-17",
    label: "Ferry to Crete",
    region: "crete",
    location: "Santorini → Crete (Heraklion → Chania)",
    hotelSlug: "domes-zeen-chania",
    morningPlan: "Check out of Canaves Oia and transfer to the Santorini ferry port (transfer not yet confirmed — see Open Items).",
    afternoonPlan:
      "SeaJets ferry from Santorini (Thira) to Heraklion, Crete, 3:30–5:05 PM (see Flights & Ferry). After arrival, transfer overland to Domes Zeen Chania — Domes Zeen is in the Chania area, not Heraklion, so allow time for the drive (transfer not yet confirmed).",
    dinner: "Relaxed dinner in Chania after checking in.",
    eveningPlan: "Explore Chania Old Town and the Venetian Harbor.",
  },
  {
    date: "2026-09-18",
    label: "Chania",
    region: "crete",
    location: "Crete (Chania)",
    hotelSlug: "domes-zeen-chania",
    morningPlan: "Balos Lagoon — the major must-do activity for the Crete stay (plan not yet finalized — see Open Items).",
    lunch: "Lunch near Balos or back in Chania, depending on timing.",
    afternoonPlan: "Return from Balos; relax or continue exploring Chania Old Town.",
    dinner: "Romantic dinner/seafood in Chania Old Town.",
    notes:
      "This is the primary Crete adventure day. We only have a short Crete stay, so Samaria Gorge is intentionally not on the plan. CHANGE UNDER CONSIDERATION: if the possible return-flight change is made, this evening may instead include a flight from Chania to Athens rather than an overnight stay here — see the Sep 19 return plan and Open Items. Nothing is booked for tonight beyond the current hotel stay.",
  },
  {
    date: "2026-09-19",
    label: "Return (Change Under Consideration)",
    region: "crete",
    location: "Crete → Athens → London → New York → Charlotte",
    hotelSlug: "domes-zeen-chania",
    notes:
      "CHANGE UNDER CONSIDERATION — see Flights & Ferry and Open Items for full detail: CURRENTLY BOOKED to fly Aegean A3 301 from Heraklion (HER) to Athens at 6:00–6:50 AM, confirmation 9Y3G2J — this booking is accurate and unchanged. We are considering switching the departure airport to Chania (CHQ) instead, since Domes Zeen is near Chania and the tight connection to the 8:15 AM BA641 is risky with checked luggage, but no replacement flight has been booked. Do not treat CHQ or an Athens-airport hotel as booked. Once home in Charlotte: pick up the car at The Parking Spot (CLT), confirmation 127918656, by 9:00 PM.",
  },
];
