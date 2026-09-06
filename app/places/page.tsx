"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/Chip";
import { PlaceCard } from "@/components/PlaceCard";
import { places } from "@/lib/data/places";
import {
  PLACE_CATEGORY_LABELS,
  REGION_LABELS,
  type PlaceCategory,
  type Region,
} from "@/lib/types";

const CATEGORIES = Object.keys(PLACE_CATEGORY_LABELS) as PlaceCategory[];
const REGIONS: Region[] = ["athens", "santorini", "crete"];

export default function PlacesPage() {
  const [region, setRegion] = useState<Region | "all">("all");
  const [category, setCategory] = useState<PlaceCategory | "all">("all");

  const filtered = useMemo(() => {
    return places.filter(
      (place) =>
        (region === "all" || place.region === region) &&
        (category === "all" || place.category === category)
    );
  }, [region, category]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Places & Recommendations
        </h1>
        <p className="text-ink-soft">
          Restaurants, sights, beaches, and ideas across the trip.
        </p>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
        <Chip active={region === "all"} onClick={() => setRegion("all")}>
          All Regions
        </Chip>
        {REGIONS.map((r) => (
          <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
            {REGION_LABELS[r]}
          </Chip>
        ))}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All Categories
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            active={category === c}
            onClick={() => setCategory(c)}
          >
            {PLACE_CATEGORY_LABELS[c]}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((place) => (
          <PlaceCard key={place.slug} place={place} />
        ))}
        {filtered.length === 0 && (
          <p className="text-ink-soft">No places match those filters yet.</p>
        )}
      </div>
    </div>
  );
}
