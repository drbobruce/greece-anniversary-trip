import type { Place } from "../types";
import { mapsSearchUrl } from "../maps";

// Curated recommendations tied to the actual itinerary. Verify hours,
// prices, and whether a reservation is needed before you go, and add or
// adjust freely as plans firm up.
export const places: Place[] = [
  // ---------------------------------------------------------------- Athens
  {
    slug: "acropolis-parthenon",
    name: "Acropolis & Parthenon",
    category: "historical-sites",
    region: "athens",
    area: "Acropolis",
    description:
      "The iconic hilltop citadel above Athens, home to the Parthenon and one of the world's great ancient sites.",
    priceLevel: 2,
    whyWeMightLikeIt:
      "The priority activity for Sep 12 — booked as a private licensed-expert tour of the Acropolis and museum together.",
    mapsUrl: mapsSearchUrl("Acropolis of Athens"),
  },
  {
    slug: "acropolis-museum",
    name: "Acropolis Museum",
    category: "historical-sites",
    region: "athens",
    area: "Acropolis / Makrygianni",
    description:
      "A modern museum at the foot of the Acropolis holding the sculptures and artifacts recovered from the site.",
    priceLevel: 2,
    whyWeMightLikeIt:
      "Paired with the Acropolis on the private guided tour — the glass floor over the ancient ruins is a highlight.",
    mapsUrl: mapsSearchUrl("Acropolis Museum Athens"),
  },
  {
    slug: "mars-hill-areopagus",
    name: "Mars Hill (Areopagus)",
    category: "historical-sites",
    region: "athens",
    area: "Acropolis",
    description:
      "A rocky outcrop just below the Acropolis with sweeping views over Athens — also the site of Paul's sermon to the Areopagus.",
    priceLevel: 1,
    whyWeMightLikeIt: "A free, quiet sunset spot for our first evening in Athens.",
    mapsUrl: mapsSearchUrl("Areopagus Mars Hill Athens"),
  },
  {
    slug: "plaka-old-town",
    name: "Plaka",
    category: "things-to-do",
    region: "athens",
    area: "Plaka",
    description:
      "Athens's oldest neighborhood — narrow lanes, neoclassical houses, and views up to the Acropolis.",
    priceLevel: 2,
    whyWeMightLikeIt: "Lovely for an unhurried walk and casual lunch after the Acropolis tour.",
    mapsUrl: mapsSearchUrl("Plaka Athens"),
  },
  {
    slug: "anafiotika",
    name: "Anafiotika",
    category: "free-time-ideas",
    region: "athens",
    area: "Plaka",
    description:
      "A tiny, whitewashed pocket of Plaka built by island workers in the 1800s — it feels like a Cycladic village in the city.",
    whyWeMightLikeIt:
      "A quiet, romantic detour that previews the island look before Santorini.",
    mapsUrl: mapsSearchUrl("Anafiotika Athens"),
  },
  {
    slug: "monastiraki",
    name: "Monastiraki",
    category: "shopping",
    region: "athens",
    area: "Monastiraki",
    description:
      "A lively square and flea market district next to Plaka, packed with shops, stalls, and street life.",
    priceLevel: 1,
    whyWeMightLikeIt: "Good for browsing on the same walk as Plaka and Anafiotika.",
    mapsUrl: mapsSearchUrl("Monastiraki Athens"),
  },
  {
    slug: "plaka-taverna-lunch",
    name: "A Taverna in Plaka",
    category: "lunch",
    region: "athens",
    area: "Plaka",
    description:
      "Classic Athenian taverna fare — moussaka, souvlaki, and Greek salad on a shaded terrace.",
    priceLevel: 2,
    whyWeMightLikeIt: "An easy, casual lunch stop while wandering Plaka and Monastiraki.",
    mapsUrl: mapsSearchUrl("Best tavernas in Plaka Athens"),
  },
  {
    slug: "acropolis-view-rooftop",
    name: "Rooftop Dinner with Acropolis Views",
    category: "restaurants",
    region: "athens",
    area: "Monastiraki / Plaka",
    description:
      "Athens has several rooftop restaurants and bars with the floodlit Acropolis as the backdrop.",
    priceLevel: 3,
    whyWeMightLikeIt: "The planned dinner spot for the evening of the Acropolis tour.",
    mapsUrl: mapsSearchUrl("Rooftop restaurant Acropolis view Athens"),
  },

  // ------------------------------------------------------------ Santorini
  {
    slug: "oia-castle-sunset",
    name: "Oia Castle",
    category: "things-to-do",
    region: "santorini",
    area: "Oia",
    description:
      "The ruins of a Venetian castle in Oia — also known as Agios Nikolaos Castle — and the island's most famous sunset-watching spot.",
    priceLevel: 1,
    whyWeMightLikeIt:
      "Part of the Sep 14 evening plan — sunset from the castle before dinner.",
    mapsUrl: mapsSearchUrl("Oia Castle Agios Nikolaos Santorini"),
  },
  {
    slug: "ammoudi-bay",
    name: "Ammoudi Bay",
    category: "beaches-swimming",
    region: "santorini",
    area: "Below Oia",
    description:
      "A small harbor at the foot of Oia's cliffs, reached by a stepped path, with clear water for swimming and snorkeling near the rocks.",
    priceLevel: 2,
    whyWeMightLikeIt: "The Sep 14 midday plan — swim, then lunch right on the water.",
    mapsUrl: mapsSearchUrl("Ammoudi Bay Oia Santorini"),
  },
  {
    slug: "dimitris-ammoudi-taverna",
    name: "Dimitris Ammoudi Taverna",
    category: "restaurants",
    region: "santorini",
    area: "Ammoudi Bay",
    description:
      "A waterfront taverna right on Ammoudi Bay's small harbor, known for fresh fish and a caldera-side setting.",
    priceLevel: 3,
    whyWeMightLikeIt: "Our recommended option for lunch after swimming at Ammoudi on Sep 14.",
    mapsUrl: mapsSearchUrl("Dimitris Ammoudi Taverna Santorini"),
  },
  {
    slug: "roka-oia",
    name: "Roka",
    category: "restaurants",
    region: "santorini",
    area: "Oia",
    description: "A well-regarded restaurant in Oia for a relaxed, quality dinner.",
    priceLevel: 3,
    whyWeMightLikeIt: "Our recommended dinner spot for Sep 14 in Oia.",
    mapsUrl: mapsSearchUrl("Roka restaurant Oia Santorini"),
  },
  {
    slug: "melitini-oia",
    name: "Melitini",
    category: "restaurants",
    region: "santorini",
    area: "Oia",
    description: "An alternate dinner option in Oia if Roka isn't available or a change of pace sounds good.",
    priceLevel: 3,
    whyWeMightLikeIt: "Backup dinner plan for Sep 14.",
    mapsUrl: mapsSearchUrl("Melitini restaurant Oia Santorini"),
  },
  {
    slug: "oia-shopping-street",
    name: "Oia's Main Shopping Lane",
    category: "shopping",
    region: "santorini",
    area: "Oia",
    description:
      "Boutiques, jewelry, and art galleries line Oia's pedestrian main street, past the blue-domed churches and windmills.",
    priceLevel: 3,
    whyWeMightLikeIt: "Part of the Sep 14 late-morning and early-evening walks through Oia.",
    mapsUrl: mapsSearchUrl("Oia shopping street Santorini"),
  },
  {
    slug: "akrotiri-site",
    name: "Akrotiri Archaeological Site",
    category: "historical-sites",
    region: "santorini",
    area: "Akrotiri",
    description:
      "A remarkably preserved Bronze Age settlement, buried and protected by volcanic ash.",
    priceLevel: 2,
    whyWeMightLikeIt: "An important historic-site option along the Sep 16 buggy route.",
    mapsUrl: mapsSearchUrl("Akrotiri Archaeological Site Santorini"),
  },
  {
    slug: "pyrgos-village",
    name: "Pyrgos",
    category: "things-to-do",
    region: "santorini",
    area: "Pyrgos",
    description:
      "A hilltop village and Santorini's former capital, with a maze of stone lanes climbing to a Venetian-era kastro.",
    priceLevel: 1,
    whyWeMightLikeIt: "A scenic stop on the Sep 16 island-exploration route.",
    mapsUrl: mapsSearchUrl("Pyrgos Santorini"),
  },
  {
    slug: "megalochori-village",
    name: "Megalochori",
    category: "free-time-ideas",
    region: "santorini",
    area: "Megalochori",
    description:
      "A quiet, traditional wine village with whitewashed lanes and old cellars, away from the busier towns.",
    priceLevel: 1,
    whyWeMightLikeIt: "A relaxed wander along the Sep 16 buggy route.",
    mapsUrl: mapsSearchUrl("Megalochori Santorini"),
  },
  {
    slug: "red-beach",
    name: "Red Beach",
    category: "beaches-swimming",
    region: "santorini",
    area: "Akrotiri",
    description:
      "A striking beach beneath red volcanic cliffs, near the Akrotiri archaeological site.",
    priceLevel: 1,
    whyWeMightLikeIt: "A swim stop on the Sep 16 route, near Akrotiri.",
    mapsUrl: mapsSearchUrl("Red Beach Santorini"),
  },
  {
    slug: "perissa-black-sand-beach",
    name: "Perissa / Black-Sand Beach",
    category: "beaches-swimming",
    region: "santorini",
    area: "Perissa / Vlychada",
    description:
      "A long stretch of dark volcanic-sand beach on the island's south coast, with beach bars and clear water.",
    priceLevel: 2,
    whyWeMightLikeIt: "The final beach/lunch stop on the Sep 16 buggy route before heading back to Oia.",
    mapsUrl: mapsSearchUrl("Perissa black sand beach Santorini"),
  },

  // ----------------------------------------------------------------- Crete
  {
    slug: "chania-old-town",
    name: "Chania Old Town",
    category: "things-to-do",
    region: "crete",
    area: "Chania Old Town",
    description:
      "A maze of Venetian-era lanes, courtyards, and hidden squares just back from the harbor.",
    priceLevel: 1,
    whyWeMightLikeIt: "The Sep 17 evening plan after checking into Domes Zeen Chania.",
    mapsUrl: mapsSearchUrl("Chania Old Town Crete"),
  },
  {
    slug: "chania-venetian-harbor",
    name: "Venetian Harbor & Lighthouse",
    category: "historical-sites",
    region: "crete",
    area: "Chania Old Town",
    description:
      "Chania's postcard waterfront, ringed by Venetian and Ottoman architecture and a centuries-old lighthouse.",
    priceLevel: 1,
    whyWeMightLikeIt: "Paired with the Sep 17 Old Town walk and relaxed dinner.",
    mapsUrl: mapsSearchUrl("Venetian Harbor Chania Crete"),
  },
  {
    slug: "balos-lagoon",
    name: "Balos Lagoon",
    category: "beaches-swimming",
    region: "crete",
    area: "Kissamos",
    description:
      "A turquoise lagoon on Crete's northwest tip, reachable by boat tour or a scenic drive plus hike.",
    priceLevel: 2,
    whyWeMightLikeIt: "The primary must-do activity for the Crete stay, planned for Sep 18.",
    mapsUrl: mapsSearchUrl("Balos Lagoon Crete"),
  },
  {
    slug: "chania-harbor-dinner",
    name: "Waterfront Dinner on the Old Harbor",
    category: "restaurants",
    region: "crete",
    area: "Chania Old Town",
    description:
      "Tavernas line the harbor with tables right at the water's edge, especially lovely after sunset.",
    priceLevel: 3,
    whyWeMightLikeIt: "A relaxed dinner option for Sep 17 or Sep 18.",
    mapsUrl: mapsSearchUrl("Best waterfront restaurants Chania harbor"),
  },
  {
    slug: "chania-cretan-lunch",
    name: "Cretan Lunch in the Old Town",
    category: "lunch",
    region: "crete",
    area: "Chania Old Town",
    description:
      "Cretan specialties like dakos, staka, and fresh grilled fish, tucked into the old town's back streets.",
    priceLevel: 2,
    whyWeMightLikeIt: "A good option after returning from Balos on Sep 18.",
    mapsUrl: mapsSearchUrl("Best Cretan food Chania Old Town"),
  },
  {
    slug: "chania-harbor-coffee",
    name: "Coffee on the Old Harbor",
    category: "coffee-breakfast",
    region: "crete",
    area: "Chania Old Town",
    description: "Harbor-front cafés perfect for a slow morning coffee with a view.",
    priceLevel: 1,
    whyWeMightLikeIt: "A calm start before the Balos day-trip.",
    mapsUrl: mapsSearchUrl("Best coffee Chania harbor"),
  },
  {
    slug: "chania-agora",
    name: "Chania Municipal Market",
    category: "shopping",
    region: "crete",
    area: "Chania",
    description:
      "A cross-shaped covered market from 1913 selling local cheese, olive oil, herbs, and souvenirs.",
    priceLevel: 1,
    whyWeMightLikeIt: "Good for picking up gifts and Cretan olive oil to take home.",
    mapsUrl: mapsSearchUrl("Chania Municipal Market Crete"),
  },
];
