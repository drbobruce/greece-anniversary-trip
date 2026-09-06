import type { Place } from "../types";
import { mapsSearchUrl } from "../maps";

// Starter recommendations to get the app populated. These are well-known
// spots worth researching further — verify hours, prices, and whether a
// reservation is needed before you go, and add/replace freely.
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
      "A must-see on any first trip to Athens — go early to beat the heat and the crowds.",
    mapsUrl: mapsSearchUrl("Acropolis of Athens"),
  },
  {
    slug: "ancient-agora",
    name: "Ancient Agora of Athens",
    category: "historical-sites",
    region: "athens",
    area: "Monastiraki",
    description:
      "The marketplace and civic heart of ancient Athens, with the well-preserved Temple of Hephaestus.",
    priceLevel: 2,
    whyWeMightLikeIt:
      "Quieter than the Acropolis and an easy, scenic walk from Plaka.",
    mapsUrl: mapsSearchUrl("Ancient Agora of Athens"),
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
    whyWeMightLikeIt: "Lovely for an unhurried evening stroll hand in hand.",
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
    slug: "national-garden-athens",
    name: "National Garden",
    category: "free-time-ideas",
    region: "athens",
    area: "Syntagma",
    description:
      "A shaded, green escape behind the Greek Parliament, with quiet paths and a small duck pond.",
    priceLevel: 1,
    whyWeMightLikeIt: "A calm midday break from the sun and the crowds.",
    mapsUrl: mapsSearchUrl("National Garden Athens"),
  },
  {
    slug: "lycabettus-hill",
    name: "Mount Lycabettus",
    category: "things-to-do",
    region: "athens",
    area: "Kolonaki",
    description:
      "The highest point in Athens, reachable by funicular, with sweeping sunset views over the whole city.",
    priceLevel: 2,
    whyWeMightLikeIt: "A memorable, low-effort sunset for two.",
    mapsUrl: mapsSearchUrl("Mount Lycabettus Athens"),
  },
  {
    slug: "varvakios-market",
    name: "Varvakios Central Market",
    category: "shopping",
    region: "athens",
    area: "Central Athens",
    description:
      "Athens's historic covered market — fish, meat, spices, and produce stalls in full swing.",
    priceLevel: 1,
    whyWeMightLikeIt: "Fun for people-watching and a taste of local life.",
    mapsUrl: mapsSearchUrl("Varvakios Central Market Athens"),
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
    whyWeMightLikeIt: "Pick any highly-rated terrace table and relax over lunch.",
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
    whyWeMightLikeIt: "A special first-night dinner to kick off the trip.",
    mapsUrl: mapsSearchUrl("Rooftop restaurant Acropolis view Athens"),
  },
  {
    slug: "syntagma-coffee",
    name: "Coffee Near Syntagma Square",
    category: "coffee-breakfast",
    region: "athens",
    area: "Syntagma",
    description:
      "Central Athens has excellent coffee culture — pick a café near the square to start the day.",
    priceLevel: 1,
    whyWeMightLikeIt: "An easy, unhurried start before a day of sightseeing.",
    mapsUrl: mapsSearchUrl("Best coffee near Syntagma Square Athens"),
  },

  // ------------------------------------------------------------ Santorini
  {
    slug: "oia-castle-sunset",
    name: "Oia Castle Sunset Point",
    category: "things-to-do",
    region: "santorini",
    area: "Oia",
    description:
      "The ruins of a Venetian castle in Oia, and the most famous sunset-watching spot on the island.",
    priceLevel: 1,
    whyWeMightLikeIt:
      "The classic Santorini sunset — arrive early to claim a good spot together.",
    mapsUrl: mapsSearchUrl("Oia Castle Sunset Point Santorini"),
  },
  {
    slug: "skaros-rock",
    name: "Skaros Rock",
    category: "things-to-do",
    region: "santorini",
    area: "Imerovigli",
    description:
      "A dramatic volcanic rock outcrop near Imerovigli with a walking trail and caldera views.",
    priceLevel: 1,
    whyWeMightLikeIt:
      "A scenic walk right from Imerovigli — nice for the one morning based there.",
    mapsUrl: mapsSearchUrl("Skaros Rock Imerovigli Santorini"),
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
    whyWeMightLikeIt: "Worth the detour if the island-exploration day allows time.",
    mapsUrl: mapsSearchUrl("Akrotiri Archaeological Site Santorini"),
  },
  {
    slug: "red-beach",
    name: "Red Beach",
    category: "beaches-swimming",
    region: "santorini",
    area: "Akrotiri",
    description:
      "A striking beach beneath red volcanic cliffs, near the Akrotiri site.",
    priceLevel: 1,
    whyWeMightLikeIt: "One of the most photogenic beaches on the island.",
    mapsUrl: mapsSearchUrl("Red Beach Santorini"),
  },
  {
    slug: "ammoudi-bay",
    name: "Ammoudi Bay",
    category: "beaches-swimming",
    region: "santorini",
    area: "Below Oia",
    description:
      "A small harbor at the foot of Oia's cliffs, reached by a stepped path, with clear water for swimming.",
    priceLevel: 2,
    whyWeMightLikeIt:
      "A quieter, more intimate swim spot than the main beaches — pair with the sunset.",
    mapsUrl: mapsSearchUrl("Ammoudi Bay Oia Santorini"),
  },
  {
    slug: "ammoudi-seafood",
    name: "Seafood Taverna at Ammoudi Bay",
    category: "restaurants",
    region: "santorini",
    area: "Below Oia",
    description:
      "Waterfront tavernas right on the small harbor, serving fresh fish with the caldera rising above.",
    priceLevel: 3,
    whyWeMightLikeIt: "A romantic, unforgettable dinner setting.",
    mapsUrl: mapsSearchUrl("Seafood tavernas Ammoudi Bay Santorini"),
  },
  {
    slug: "imerovigli-lunch",
    name: "Caldera-View Lunch in Imerovigli",
    category: "lunch",
    region: "santorini",
    area: "Imerovigli",
    description:
      "Imerovigli's restaurants sit right on the caldera rim with some of the island's quietest views.",
    priceLevel: 3,
    whyWeMightLikeIt: "Convenient for the one day based at SantAnna.",
    mapsUrl: mapsSearchUrl("Best restaurants Imerovigli Santorini"),
  },
  {
    slug: "oia-breakfast",
    name: "Cliffside Breakfast in Oia",
    category: "coffee-breakfast",
    region: "santorini",
    area: "Oia",
    description:
      "Several cafés in Oia serve breakfast on caldera-view terraces before the day-trip crowds arrive.",
    priceLevel: 2,
    whyWeMightLikeIt: "A peaceful way to start the day at Canaves Oia.",
    mapsUrl: mapsSearchUrl("Best breakfast caldera view Oia Santorini"),
  },
  {
    slug: "oia-shopping-street",
    name: "Oia's Main Shopping Lane",
    category: "shopping",
    region: "santorini",
    area: "Oia",
    description:
      "Boutiques, jewelry, and art galleries line Oia's pedestrian main street.",
    priceLevel: 3,
    whyWeMightLikeIt: "Nice for browsing on the way to or from sunset.",
    mapsUrl: mapsSearchUrl("Oia shopping street Santorini"),
  },
  {
    slug: "fira-oia-coastal-walk",
    name: "Fira to Oia Caldera Walk",
    category: "free-time-ideas",
    region: "santorini",
    area: "Fira to Oia",
    description:
      "A roughly 3-4 hour trail along the caldera rim connecting Fira and Oia through Imerovigli.",
    priceLevel: 1,
    whyWeMightLikeIt:
      "A rewarding, scenic walk if you want an active, unstructured day.",
    mapsUrl: mapsSearchUrl("Fira to Oia hiking trail Santorini"),
  },

  // ----------------------------------------------------------------- Crete
  {
    slug: "chania-venetian-harbor",
    name: "Venetian Harbor & Lighthouse",
    category: "historical-sites",
    region: "crete",
    area: "Chania Old Town",
    description:
      "Chania's postcard waterfront, ringed by Venetian and Ottoman architecture and a centuries-old lighthouse.",
    priceLevel: 1,
    whyWeMightLikeIt: "A beautiful, easy evening walk right from Domes Zeen.",
    mapsUrl: mapsSearchUrl("Venetian Harbor Chania Crete"),
  },
  {
    slug: "chania-old-town",
    name: "Chania Old Town",
    category: "things-to-do",
    region: "crete",
    area: "Chania Old Town",
    description:
      "A maze of Venetian-era lanes, courtyards, and hidden squares just back from the harbor.",
    priceLevel: 1,
    whyWeMightLikeIt: "Made for wandering without a plan.",
    mapsUrl: mapsSearchUrl("Chania Old Town Crete"),
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
    whyWeMightLikeIt: "One of Crete's most spectacular swimming spots.",
    mapsUrl: mapsSearchUrl("Balos Lagoon Crete"),
  },
  {
    slug: "elafonisi-beach",
    name: "Elafonisi Beach",
    category: "beaches-swimming",
    region: "crete",
    area: "Southwest Crete",
    description:
      "A shallow lagoon beach known for pink-tinted sand, about a 1.5-2 hour drive from Chania.",
    priceLevel: 2,
    whyWeMightLikeIt: "Worth it if you'd like a full beach day during the Crete stay.",
    mapsUrl: mapsSearchUrl("Elafonisi Beach Crete"),
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
  {
    slug: "chania-harbor-dinner",
    name: "Waterfront Dinner on the Old Harbor",
    category: "restaurants",
    region: "crete",
    area: "Chania Old Town",
    description:
      "Tavernas line the harbor with tables right at the water's edge, especially lovely after sunset.",
    priceLevel: 3,
    whyWeMightLikeIt: "A relaxed final dinner to close out the trip.",
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
    whyWeMightLikeIt: "Escape the harbor crowds for a quieter, local meal.",
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
    whyWeMightLikeIt: "A calm start before exploring Chania.",
    mapsUrl: mapsSearchUrl("Best coffee Chania harbor"),
  },
  {
    slug: "chania-botanical-park",
    name: "Chania Botanical Park",
    category: "free-time-ideas",
    region: "crete",
    area: "Chania",
    description:
      "A quiet garden and small farm on the edge of town, with fruit trees, animals, and a taverna.",
    priceLevel: 1,
    whyWeMightLikeIt: "A relaxed, green change of pace from the harbor.",
    mapsUrl: mapsSearchUrl("Chania Botanical Park Crete"),
  },
];
