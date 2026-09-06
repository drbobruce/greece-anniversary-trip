import { CompassIcon, MapPinIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { getNearbyIdeas } from "@/lib/utils";
import { PLACE_CATEGORY_LABELS, type Region } from "@/lib/types";

export function NearbyIdeas({ region }: { region: Region }) {
  if (region === "transit") return null;

  const ideas = getNearbyIdeas(region, 4);
  if (ideas.length === 0) return null;

  return (
    <section className="rounded-3xl border border-aegean-light/30 bg-gradient-to-br from-aegean/5 to-transparent p-5">
      <div className="mb-3 flex items-center gap-2">
        <CompassIcon className="h-5 w-5 text-aegean" />
        <h2 className="font-serif text-lg font-semibold text-ink">
          What should we do right now?
        </h2>
      </div>

      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
        {ideas.map((place) => (
          <a
            key={place.slug}
            href={place.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-40 shrink-0 snap-start flex-col gap-2 rounded-2xl bg-white/80 p-3 shadow-sm shadow-ink/5 transition-transform active:scale-[0.98]"
          >
            <PhotoPlaceholder
              region={place.region}
              category={place.category}
              className="aspect-square w-full"
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-aegean">
                {PLACE_CATEGORY_LABELS[place.category]}
              </p>
              <p className="font-serif text-sm font-semibold leading-snug text-ink">
                {place.name}
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
              <MapPinIcon className="h-3.5 w-3.5" />
              {place.area}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
