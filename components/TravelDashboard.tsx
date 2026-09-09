import { Badge, Card, SectionLabel } from "./Card";
import { ConfirmedBookingCard } from "./ConfirmedBookingCard";
import { ScheduleRow } from "./DayDetail";
import { HotelCard } from "./HotelCard";
import { NearbyIdeas } from "./NearbyIdeas";
import { NextUpCard } from "./NextUpCard";
import { RightNowCompact } from "./RightNowCompact";
import { TransportLegCard } from "./TransportLegCard";
import { getNextEvent, minutesUntil, parseTimeOnDate } from "@/lib/nextEvent";
import { formatDateLong, getHotelBySlug, getTransportLegsForDate } from "@/lib/utils";
import { REGION_LABELS, type TripDay } from "@/lib/types";

/** The Today page's live "during the trip" view — a dashboard, not just a day plan. */
export function TravelDashboard({ day }: { day: TripDay }) {
  const now = new Date();
  const hotel = getHotelBySlug(day.hotelSlug);

  const nextEvent = getNextEvent(now);
  // NextUpCard computes its own leave-by client-side (using geolocation when
  // available), so it's the only thing that needs the raw event here.
  const minutesUntilNextEvent = nextEvent ? minutesUntil(nextEvent.at, now) : undefined;

  // Everything else today — legs and bookings interleaved in actual time
  // order — minus whatever is already shown as the Next Up card.
  const otherEventsToday = [
    ...getTransportLegsForDate(day.date).map((leg) => ({
      key: leg.id,
      title: `${leg.carrier}${leg.number ? " " + leg.number : ""} — ${leg.origin} → ${leg.destination}`,
      at: parseTimeOnDate(leg.date, leg.departureTime),
      node: <TransportLegCard leg={leg} />,
    })),
    ...(day.confirmedBookings ?? []).map((booking) => ({
      key: booking.referenceNumber,
      title: booking.activityName,
      at: parseTimeOnDate(booking.date, booking.startTime),
      node: <ConfirmedBookingCard booking={booking} />,
    })),
  ]
    .filter((item) => item.title !== nextEvent?.title)
    .sort((a, b) => (a.at?.getTime() ?? Infinity) - (b.at?.getTime() ?? Infinity));

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest text-aegean">Today</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-ink">
          {formatDateLong(day.date)}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>{REGION_LABELS[day.region]}</Badge>
          <span className="text-sm text-ink-soft">{day.location}</span>
        </div>
      </Card>

      {nextEvent && <NextUpCard event={nextEvent} />}

      {otherEventsToday.length > 0 && (
        <div className="flex flex-col gap-3">
          {otherEventsToday.map(({ key, node }) => (
            <div key={key}>{node}</div>
          ))}
        </div>
      )}

      <RightNowCompact
        region={day.region}
        now={now}
        minutesUntilNextEvent={minutesUntilNextEvent}
        nextEventKind={nextEvent?.kind}
      />

      {hotel && (
        <div>
          <SectionLabel>Tonight&apos;s Hotel</SectionLabel>
          <HotelCard hotel={hotel} />
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
