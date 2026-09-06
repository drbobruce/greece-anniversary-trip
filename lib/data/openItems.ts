import type { OpenItem } from "../types";

// The action list — things still to book, confirm, or decide. Check items
// off by deleting them once resolved (and move the new info into the real
// itinerary/hotel/transport data).
export const openItems: OpenItem[] = [
  {
    id: "change-crete-athens-flight",
    title: "Change the Crete → Athens flight",
    detail:
      "Current: Aegean A3 301, HER → ATH, Sep 19, 6:00–6:50 AM. Preferred: fly CHQ → ATH the evening of Sep 18 instead. Also reconsidering whether the departure airport should move to one closer to Chania.",
    relatedDate: "2026-09-19",
  },
  {
    id: "book-athens-airport-hotel",
    title: "Book an Athens-airport-area hotel for the night of Sep 18",
    detail: "Only needed if the CHQ → ATH change above is made.",
    relatedDate: "2026-09-18",
  },
  {
    id: "finalize-balos",
    title: "Finalize the Balos Lagoon plan for Sep 18",
    detail: "Boat tour vs. self-drive; timing around it is the primary Crete adventure day.",
    relatedDate: "2026-09-18",
  },
  {
    id: "book-buggy",
    title: "Book the Sep 16 Santorini buggy/Polaris rental",
    detail: "Preferred: a buggy/Polaris rather than a standard rental car or ATV.",
    relatedDate: "2026-09-16",
  },
  {
    id: "finalize-restaurant-reservations",
    title: "Finalize restaurant reservations where actually needed",
  },
  {
    id: "confirm-transfer-airport-santanna",
    title: "Confirm ground transfer: Santorini airport → SantAnna",
    relatedDate: "2026-09-13",
  },
  {
    id: "confirm-transfer-santanna-canaves",
    title: "Confirm transfer: SantAnna → Canaves Oia Suites",
    relatedDate: "2026-09-14",
  },
  {
    id: "confirm-transfer-canaves-ferry",
    title: "Confirm transfer: Canaves Oia Suites → Santorini ferry port",
    relatedDate: "2026-09-17",
  },
  {
    id: "confirm-transfer-heraklion-domes",
    title: "Arrange/confirm transfer: Heraklion ferry port → Domes Zeen Chania",
    detail: "Overland transfer — Domes Zeen is in the Chania area, not Heraklion.",
    relatedDate: "2026-09-17",
  },
  {
    id: "confirmation-numbers-hub",
    title: "Keep all confirmation numbers and booked activities in one easy-to-find place",
    detail: "Done — see the Confirmation Numbers page under Travel.",
  },
];
