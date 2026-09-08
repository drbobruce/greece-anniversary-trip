import type { ReactNode } from "react";
import Link from "next/link";
import { Badge, Card, SectionLabel } from "./Card";
import { ConfirmedBookingCard } from "./ConfirmedBookingCard";
import { NearbyIdeas } from "./NearbyIdeas";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { TransportLegCard } from "./TransportLegCard";
import { parseTimeOnDate } from "@/lib/nextEvent";
import { formatDateLong, getHotelBySlug, getTransportLegsForDate } from "@/lib/utils";
import { REGION_LABELS, type TripDay } from "@/lib/types";

/** Transport legs and confirmed bookings interleaved in actual time order (e.g. an early drop-off before a later flight), not grouped by type. */
function getTimeOrderedEvents(day: TripDay): { key: string; node: ReactNode }[] {
  const legs = getTransportLegsForDate(day.date).map((leg) => ({
    key: leg.id,
    at: parseTimeOnDate(leg.date, leg.departureTime),
    node: <TransportLegCard leg={leg} />,
  }));
  const bookings = (day.confirmedBookings ?? []).map((booking) => ({
    key: booking.referenceNumber,
    at: parseTimeOnDate(booking.date, booking.startTime),
    node: <ConfirmedBookingCard booking={booking} />,
  }));

  return [...legs, ...bookings]
    .sort((a, b) => (a.at?.getTime() ?? Infinity) - (b.at?.getTime() ?? Infinity))
    .map(({ key, node }) => ({ key, node }));
}

export function ScheduleRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2.5">
      <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-soft pt-0.5">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-ink">{value}</span>
    </div>
  );
}

export function DayDetail({ day }: { day: TripDay }) {
  const hotel = getHotelBySlug(day.hotelSlug);
  const timeOrderedEvents = getTimeOrderedEvents(day);

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden p-0!">
        <PhotoPlaceholder region={day.region} className="rounded-none!" />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{REGION_LABELS[day.region]}</Badge>
            {day.label && <Badge className="bg-gold/20 text-aegean-dark">{day.label}</Badge>}
          </div>
          <h1 className="mt-2 font-serif text-2xl font-semibold text-ink">
            {formatDateLong(day.date)}
          </h1>
          <p className="text-ink-soft">{day.location}</p>

          {hotel && (
            <Link
              href="/hotels"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-sm font-medium text-ink hover:bg-sand-dark/60"
            >
              🛏️ {hotel.name}
            </Link>
          )}
        </div>
      </Card>

      {timeOrderedEvents.length > 0 && (
        <div className="flex flex-col gap-3">
          {timeOrderedEvents.map(({ key, node }) => (
            <div key={key}>{node}</div>
          ))}
        </div>
      )}

      <Card>
        <SectionLabel>Today&apos;s Plan</SectionLabel>
        <div className="divide-y divide-sand">
          <ScheduleRow label="Morning" value={day.morningPlan} />
          <ScheduleRow label="Lunch" value={day.lunch} />
          <ScheduleRow label="Afternoon" value={day.afternoonPlan} />
          <ScheduleRow label="Dinner" value={day.dinner} />
          <ScheduleRow label="Evening" value={day.eveningPlan} />
        </div>
        {!day.morningPlan &&
          !day.lunch &&
          !day.afternoonPlan &&
          !day.dinner &&
          !day.eveningPlan && (
            <p className="text-sm text-ink-soft">
              Nothing planned yet — add a plan for this day anytime.
            </p>
          )}
      </Card>

      {day.notes && (
        <Card>
          <SectionLabel>Notes</SectionLabel>
          <p className="text-sm leading-relaxed text-ink-soft">{day.notes}</p>
        </Card>
      )}

      <NearbyIdeas region={day.region} />
    </div>
  );
}
