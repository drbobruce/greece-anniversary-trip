import { Badge, Card } from "./Card";
import { FavoriteControl } from "./FavoriteControl";
import { ExternalLinkIcon, MapPinIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { formatDistance } from "@/lib/geo";
import { formatDuration, formatMinutesToSpare } from "@/lib/format";
import { mapsDirectionsUrl, telUrl } from "@/lib/maps";
import { PLACE_CATEGORY_LABELS } from "@/lib/types";
import type { ScoredPlace } from "@/lib/recommend";

export function RecommendationCard({
  scored,
  nextEventTitle,
}: {
  scored: ScoredPlace;
  nextEventTitle?: string;
}) {
  const { place, distanceKm, travelMinutes, minutesToSpare } = scored;
  const travelMode = distanceKm != null && distanceKm > 2 ? "drive" : "walk";
  const cuttingItClose = minutesToSpare != null && minutesToSpare < 30;

  return (
    <Card className="flex gap-4">
      <PhotoPlaceholder
        region={place.region}
        category={place.category}
        compact
        className="shrink-0"
      />

      <div className="min-w-0 flex-1">
        <Badge>{PLACE_CATEGORY_LABELS[place.category]}</Badge>

        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink">
          {place.name}
        </h3>
        <p className="text-sm italic leading-relaxed text-aegean-dark">
          {place.whyWeLikeIt}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-soft">
          {distanceKm != null && travelMinutes != null && (
            <span>
              {formatDistance(distanceKm)} · ~{travelMinutes} min {travelMode}
            </span>
          )}
          {place.expectedDurationMinutes != null && (
            <span>~{formatDuration(place.expectedDurationMinutes)} there</span>
          )}
        </div>

        {minutesToSpare != null && (
          <p
            className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              cuttingItClose ? "bg-terracotta/15 text-terracotta" : "bg-aegean/10 text-aegean-dark"
            }`}
          >
            {cuttingItClose ? "⚠ Cutting it close before " : "✓ Fits before "}
            {nextEventTitle ?? "your next reservation"} · {formatMinutesToSpare(minutesToSpare)}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <FavoriteControl slug={place.slug} />
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={mapsDirectionsUrl(place.lat, place.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
          >
            <MapPinIcon className="h-4 w-4" />
            Navigate
          </a>
          {place.websiteUrl && (
            <a
              href={place.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Website
            </a>
          )}
          {place.phone && (
            <a
              href={telUrl(place.phone)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
            >
              📞 Call
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
