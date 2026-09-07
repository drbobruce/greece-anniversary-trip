"use client";

import Link from "next/link";
import { useMemo } from "react";
import { formatDistance } from "@/lib/geo";
import { getRightNowRecommendations } from "@/lib/recommend";
import { useGeolocation } from "@/lib/useGeolocation";
import { PLACE_CATEGORY_LABELS, type NextEvent, type Region } from "@/lib/types";

const BUCKETS: { key: "eat" | "doSomething" | "relax"; label: string; icon: string }[] = [
  { key: "eat", label: "Eat", icon: "🍽️" },
  { key: "doSomething", label: "Do Something", icon: "🧭" },
  { key: "relax", label: "Relax Nearby", icon: "🌿" },
];

export function RightNowCompact({
  region,
  now,
  minutesUntilNextEvent,
  nextEventKind,
}: {
  region: Region;
  now: Date;
  minutesUntilNextEvent?: number;
  nextEventKind?: NextEvent["kind"];
}) {
  const geo = useGeolocation();

  const recs = useMemo(
    () =>
      getRightNowRecommendations({
        region,
        now,
        coords: geo.coords,
        minutesUntilNextEvent,
        nextEventKind,
      }),
    [region, now, geo.coords, minutesUntilNextEvent, nextEventKind]
  );

  return (
    <div className="rounded-3xl border border-aegean-light/30 bg-gradient-to-br from-aegean/5 to-transparent p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-ink">Right Now</h2>
        <Link href="/right-now" className="text-sm font-medium text-aegean hover:text-aegean-dark">
          Full options →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {BUCKETS.map(({ key, label, icon }) => {
          const top = recs[key][0];
          return (
            <Link
              key={key}
              href="/right-now"
              className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm shadow-ink/5 transition-transform active:scale-[0.99]"
            >
              <span className="text-xl">{icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {label}
                </p>
                {top ? (
                  <p className="truncate text-sm font-medium text-ink">
                    {top.place.name}
                    {top.distanceKm != null && (
                      <span className="text-ink-soft"> · {formatDistance(top.distanceKm)}</span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-ink-soft">
                    {PLACE_CATEGORY_LABELS[key === "eat" ? "restaurant" : key === "relax" ? "beach" : "attraction"]}{" "}
                    ideas nearby
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
