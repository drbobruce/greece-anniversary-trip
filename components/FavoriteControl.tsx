"use client";

import { useFavorites } from "@/lib/favorites";
import type { FavoriteStatus } from "@/lib/types";

const OPTIONS: { status: FavoriteStatus; icon: string; label: string }[] = [
  { status: "maybe-later", icon: "♡", label: "Maybe Later" },
  { status: "favorite", icon: "♥", label: "Favorite" },
  { status: "done", icon: "✓", label: "Done" },
];

/** Favorite/Maybe Later/Done toggle — per-device only, never touches the itinerary. */
export function FavoriteControl({ slug }: { slug: string }) {
  const { statuses, setStatus } = useFavorites();
  const current = statuses[slug];

  return (
    <div className="flex gap-1.5" role="group" aria-label="Save this place">
      {OPTIONS.map(({ status, icon, label }) => {
        const active = current === status;
        return (
          <button
            key={status}
            type="button"
            aria-pressed={active}
            aria-label={label}
            onClick={() => setStatus(slug, active ? undefined : status)}
            className={`flex h-9 min-w-9 items-center justify-center gap-1 rounded-full px-2.5 text-sm font-medium transition-colors ${
              active
                ? status === "favorite"
                  ? "bg-terracotta text-cream"
                  : status === "done"
                    ? "bg-aegean text-cream"
                    : "bg-sand-dark/70 text-ink"
                : "bg-sand/60 text-ink-soft hover:bg-sand"
            }`}
          >
            <span aria-hidden="true">{icon}</span>
          </button>
        );
      })}
    </div>
  );
}
