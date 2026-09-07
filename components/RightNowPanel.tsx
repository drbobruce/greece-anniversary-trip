"use client";

import { useMemo, useState } from "react";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { RecommendationCard } from "./RecommendationCard";
import { inferRegionFromCoords } from "@/lib/geo";
import { getNextEvent, minutesUntil } from "@/lib/nextEvent";
import { getRightNowRecommendations } from "@/lib/recommend";
import { useGeolocation } from "@/lib/useGeolocation";
import { REGION_LABELS, type MoodTag, type Region } from "@/lib/types";

const TIME_OPTIONS: { label: string; minutes: number | undefined }[] = [
  { label: "30 min", minutes: 30 },
  { label: "1 hour", minutes: 60 },
  { label: "2 hours", minutes: 120 },
  { label: "Half day", minutes: 240 },
  { label: "Rest of day", minutes: undefined },
];

const MOOD_OPTIONS: { value: MoodTag; label: string }[] = [
  { value: "romantic", label: "Romantic" },
  { value: "scenic", label: "Scenic" },
  { value: "active", label: "Active" },
  { value: "historic", label: "Historic" },
  { value: "beach", label: "Beach / Swim" },
  { value: "shopping", label: "Shopping" },
  { value: "casual-food", label: "Casual Food" },
  { value: "nice-dinner", label: "Nice Dinner" },
  { value: "coffee", label: "Coffee" },
  { value: "drinks", label: "Drinks" },
  { value: "relax", label: "Relax" },
];

const MANUAL_REGIONS: Region[] = ["athens", "santorini", "crete"];

const BUCKETS: { key: "eat" | "do" | "relax"; label: string; icon: string }[] = [
  { key: "eat", label: "Eat", icon: "🍽️" },
  { key: "do", label: "Do Something", icon: "🧭" },
  { key: "relax", label: "Relax Nearby", icon: "🌿" },
];

export function RightNowPanel() {
  const geo = useGeolocation();
  const [manualRegion, setManualRegion] = useState<Region | null>(null);
  const [timeBudget, setTimeBudget] = useState<number | undefined | "unset">("unset");
  const [mood, setMood] = useState<MoodTag | undefined>(undefined);
  const [activeBucket, setActiveBucket] = useState<"eat" | "do" | "relax" | null>(null);

  const now = useMemo(() => new Date(), []);
  const nextEvent = useMemo(() => getNextEvent(now), [now]);
  const minutesUntilNextEvent = nextEvent ? minutesUntil(nextEvent.at, now) : undefined;

  const detectedRegion = geo.coords
    ? inferRegionFromCoords(geo.coords.lat, geo.coords.lng)
    : undefined;
  const region = manualRegion ?? detectedRegion;

  const timeBudgetMinutes = timeBudget === "unset" ? undefined : timeBudget;

  const recs = useMemo(() => {
    if (!region) return null;
    return getRightNowRecommendations({
      region,
      now,
      coords: geo.coords,
      timeBudgetMinutes,
      mood,
      minutesUntilNextEvent,
      nextEventKind: nextEvent?.kind,
    });
  }, [region, now, geo.coords, timeBudgetMinutes, mood, minutesUntilNextEvent, nextEvent?.kind]);

  if (!region) {
    const waiting = geo.status === "idle" || geo.status === "prompt";
    return (
      <Card>
        <h2 className="font-serif text-xl font-semibold text-ink">Where are you?</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {waiting
            ? "Finding your location…"
            : "We couldn't get your location — pick where you are:"}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {MANUAL_REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setManualRegion(r)}
              className="rounded-2xl bg-sand/60 px-4 py-3 text-left text-base font-medium text-ink hover:bg-sand"
            >
              {REGION_LABELS[r]}
            </button>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            What should we do right now?
          </h2>
          <p className="text-sm text-ink-soft">
            Near you in {REGION_LABELS[region]}
            {!geo.coords && manualRegion ? " (set manually)" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setManualRegion(manualRegion ? null : (region as Region))}
          className="shrink-0 text-xs font-medium text-aegean hover:text-aegean-dark"
        >
          Change
        </button>
      </div>

      {nextEvent && (
        <p className="rounded-2xl bg-aegean/10 px-4 py-2.5 text-sm text-aegean-dark">
          Next up: {nextEvent.title} at{" "}
          {nextEvent.at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Time available
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
          {TIME_OPTIONS.map((opt) => (
            <Chip
              key={opt.label}
              active={timeBudget !== "unset" ? timeBudget === opt.minutes : false}
              onClick={() => setTimeBudget(timeBudget === opt.minutes ? "unset" : opt.minutes)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Mood (optional)
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
          {MOOD_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={mood === opt.value}
              onClick={() => setMood(mood === opt.value ? undefined : opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {BUCKETS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveBucket(activeBucket === key ? null : key)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-4 text-center transition-colors ${
              activeBucket === key
                ? "bg-aegean text-cream"
                : "bg-white/90 text-ink shadow-sm shadow-ink/5"
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {activeBucket && recs && (
        <div className="flex flex-col gap-3">
          {recs[activeBucket === "do" ? "doSomething" : activeBucket].length === 0 ? (
            <p className="rounded-2xl bg-sand/50 px-4 py-3 text-sm text-ink-soft">
              Nothing quite fits right now — try a different time or mood.
            </p>
          ) : (
            recs[activeBucket === "do" ? "doSomething" : activeBucket].map((scored) => (
              <RecommendationCard
                key={scored.place.slug}
                scored={scored}
                nextEventTitle={nextEvent?.title}
              />
            ))
          )}
        </div>
      )}

      {!activeBucket && (
        <p className="text-center text-sm text-ink-soft">Pick one above to see ideas.</p>
      )}
    </div>
  );
}
