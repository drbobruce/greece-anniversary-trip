import { BadgeCheckIcon, ExternalLinkIcon, MapPinIcon } from "./icons";
import { CopyableCode } from "./CopyableCode";
import { formatDateLong } from "@/lib/utils";
import type { ConfirmedBooking } from "@/lib/types";

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 first:pt-0">
      <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-cream/60">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-cream/95">{value}</span>
    </div>
  );
}

export function ConfirmedBookingCard({ booking }: { booking: ConfirmedBooking }) {
  const timeRange = booking.approximateEndTime
    ? `${booking.startTime} – ~${booking.approximateEndTime} (approximate finish)`
    : booking.startTime;

  const hasMeetingInfo =
    booking.meetingPoint || booking.pickupTime || booking.pickupLocation;
  const hasMoreDetails =
    booking.ticketInfo ||
    booking.whatToBring ||
    booking.cancellationPolicy ||
    booking.operatorContact;

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/40 bg-aegean-dark shadow-md shadow-aegean-dark/20">
      <div className="flex items-center gap-2 bg-gold/90 px-5 py-2">
        <BadgeCheckIcon className="h-4 w-4 text-aegean-dark" />
        <span className="text-xs font-bold uppercase tracking-widest text-aegean-dark">
          Confirmed Booking
        </span>
      </div>

      <div className="p-5 text-cream">
        <h3 className="font-serif text-lg font-semibold leading-snug">
          {booking.activityName}
        </h3>
        <p className="mt-1 text-sm text-cream/80">{formatDateLong(booking.date)}</p>
        <p className="mt-0.5 text-sm font-medium text-gold">{timeRange}</p>
        {booking.durationLabel && (
          <p className="text-sm text-cream/80">{booking.durationLabel}</p>
        )}

        {(booking.travelers || booking.language) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {booking.travelers && (
              <span className="rounded-full bg-cream/10 px-3 py-1 text-xs font-medium text-cream/90">
                {booking.travelers}
              </span>
            )}
            {booking.language && (
              <span className="rounded-full bg-cream/10 px-3 py-1 text-xs font-medium text-cream/90">
                {booking.language}
              </span>
            )}
          </div>
        )}

        {booking.included && booking.included.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {booking.included.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-2xl bg-cream/10 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/60">
            Booking Reference
          </p>
          <div className="mt-0.5 text-xl font-semibold tracking-wide text-cream">
            <CopyableCode value={booking.referenceNumber} />
          </div>
        </div>

        {hasMeetingInfo && (
          <div className="mt-4 border-t border-cream/15 pt-3">
            <DetailRow label="Meeting Point" value={booking.meetingPoint} />
            <DetailRow label="Pickup Time" value={booking.pickupTime} />
            <DetailRow label="Pickup Location" value={booking.pickupLocation} />
          </div>
        )}

        {hasMoreDetails && (
          <div className="mt-4 border-t border-cream/15 pt-3">
            <DetailRow label="Tickets" value={booking.ticketInfo} />
            <DetailRow label="What to Bring" value={booking.whatToBring} />
            <DetailRow label="Cancellation" value={booking.cancellationPolicy} />
            <DetailRow label="Operator" value={booking.operatorContact} />
          </div>
        )}

        {booking.notes && (
          <p className="mt-4 rounded-xl bg-cream/10 px-3 py-2 text-sm leading-relaxed text-cream/90">
            {booking.notes}
          </p>
        )}

        {(booking.mapsUrl || booking.bookingUrl) && (
          <div className="mt-4 flex flex-wrap gap-4">
            {booking.mapsUrl && (
              <a
                href={booking.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80"
              >
                <MapPinIcon className="h-4 w-4" />
                Map
              </a>
            )}
            {booking.bookingUrl && (
              <a
                href={booking.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Booking Details
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
