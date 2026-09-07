import { Badge, Card, SectionLabel } from "./Card";
import { CopyableCode } from "./CopyableCode";
import { ExternalLinkIcon, MapPinIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { telUrl } from "@/lib/maps";
import { formatDateShort } from "@/lib/utils";
import type { Hotel } from "@/lib/types";

function roomSummary(hotel: Hotel): string | undefined {
  const parts = [hotel.roomType, hotel.bedConfig, hotel.sizeSqFt, hotel.view].filter(
    Boolean
  );
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const room = roomSummary(hotel);

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
        {(hotel.checkInTime || hotel.checkOutTime) && (
          <p className="text-xs text-ink-soft">
            {hotel.checkInTime && `Check-in ${hotel.checkInTime}`}
            {hotel.checkInTime && hotel.checkOutTime && " · "}
            {hotel.checkOutTime && `Check-out ${hotel.checkOutTime}`}
          </p>
        )}

        {hotel.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {hotel.description}
          </p>
        )}

        {hotel.address && (
          <p className="mt-2 text-sm text-ink-soft">{hotel.address}</p>
        )}

        {hotel.guestName && (
          <p className="mt-2 text-sm text-ink-soft">Booked under: {hotel.guestName}</p>
        )}
        {hotel.guests && (
          <p className="mt-1 text-sm text-ink-soft">Guests: {hotel.guests}</p>
        )}
        {room && <p className="mt-1 text-sm text-ink-soft">Room: {room}</p>}

        {hotel.ratePlan && (
          <p className="mt-2 text-sm text-ink-soft">{hotel.ratePlan}</p>
        )}
        {hotel.totalCost && (
          <p className="mt-1 text-sm text-ink-soft">Total: {hotel.totalCost}</p>
        )}
        {hotel.taxesFeesNote && (
          <p className="mt-1 text-sm text-ink-soft">Taxes & fees: {hotel.taxesFeesNote}</p>
        )}

        {hotel.confirmationNumber && (
          <div className="mt-3 rounded-2xl bg-sand/50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
              Confirmation
            </p>
            <div className="mt-0.5 text-lg font-semibold tracking-wide text-ink">
              <CopyableCode value={hotel.confirmationNumber} />
            </div>
            {hotel.tripId && (
              <p className="mt-1 text-xs text-ink-soft">Trip ID: {hotel.tripId}</p>
            )}
          </div>
        )}

        {hotel.benefits && hotel.benefits.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {hotel.benefits.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-aegean/30 px-3 py-1 text-xs font-medium text-aegean-dark"
              >
                ✓ {benefit}
              </span>
            ))}
          </div>
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
          {hotel.phone && (
            <a
              href={telUrl(hotel.phone)}
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
