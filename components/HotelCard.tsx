import { Badge, Card, SectionLabel } from "./Card";
import { ExternalLinkIcon, MapPinIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { formatDateShort } from "@/lib/utils";
import type { Hotel } from "@/lib/types";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Card className="overflow-hidden p-0!">
      <PhotoPlaceholder region={hotel.region} className="rounded-none!" />
      <div className="p-5">
        <Badge>{hotel.area}</Badge>
        <h2 className="mt-2 font-serif text-xl font-semibold text-ink">
          {hotel.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-aegean">
          {formatDateShort(hotel.checkIn)} – {formatDateShort(hotel.checkOut)}
        </p>

        {hotel.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {hotel.description}
          </p>
        )}

        {hotel.address && (
          <p className="mt-2 text-sm text-ink-soft">{hotel.address}</p>
        )}

        {hotel.confirmationNumber && (
          <p className="mt-2 text-sm text-ink-soft">
            Confirmation: {hotel.confirmationNumber}
          </p>
        )}

        {hotel.notes && (
          <>
            <SectionLabel>
              <span className="mt-3 block">Notes</span>
            </SectionLabel>
            <p className="text-sm leading-relaxed text-ink-soft">
              {hotel.notes}
            </p>
          </>
        )}

        <div className="mt-4 flex flex-wrap gap-4">
          {hotel.mapsUrl && (
            <a
              href={hotel.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
            >
              <MapPinIcon className="h-4 w-4" />
              Map
            </a>
          )}
          {hotel.websiteUrl && (
            <a
              href={hotel.websiteUrl}
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
