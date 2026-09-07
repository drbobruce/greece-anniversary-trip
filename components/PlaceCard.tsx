import { Badge, Card } from "./Card";
import { FavoriteControl } from "./FavoriteControl";
import { ExternalLinkIcon, MapPinIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { PLACE_CATEGORY_LABELS, type Place } from "@/lib/types";

function PriceLevel({ level }: { level: number }) {
  return (
    <span className="text-sm font-medium text-ink-soft">
      {"$".repeat(level)}
      <span className="text-sand-dark">{"$".repeat(4 - level)}</span>
    </span>
  );
}

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="flex gap-4">
      <PhotoPlaceholder
        region={place.region}
        category={place.category}
        compact
        className="shrink-0"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{PLACE_CATEGORY_LABELS[place.category]}</Badge>
          {place.priceLevel && <PriceLevel level={place.priceLevel} />}
        </div>

        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink">
          {place.name}
        </h3>
        <p className="text-sm text-ink-soft">{place.area}</p>

        <p className="mt-2 text-sm leading-relaxed text-ink">
          {place.description}
        </p>
        <p className="mt-1.5 text-sm italic leading-relaxed text-aegean-dark">
          {place.whyWeLikeIt}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <FavoriteControl slug={place.slug} />
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          {place.mapsUrl && (
            <a
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
            >
              <MapPinIcon className="h-4 w-4" />
              Map
            </a>
          )}
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
        </div>
      </div>
    </Card>
  );
}
