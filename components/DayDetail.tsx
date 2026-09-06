import Link from "next/link";
import { Badge, Card, SectionLabel } from "./Card";
import { ExternalLinkIcon, MapPinIcon } from "./icons";
import { NearbyIdeas } from "./NearbyIdeas";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { formatDateLong, getHotelBySlug } from "@/lib/utils";
import { REGION_LABELS, type TripDay } from "@/lib/types";

function ScheduleRow({
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

      {day.bookedActivities && day.bookedActivities.length > 0 && (
        <Card>
          <SectionLabel>Booked Activities</SectionLabel>
          <div className="flex flex-col gap-3">
            {day.bookedActivities.map((activity, i) => (
              <div
                key={i}
                className="rounded-2xl bg-sand/50 p-4 first:mt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-serif text-base font-semibold text-ink">
                    {activity.name}
                  </p>
                  {activity.time && (
                    <span className="text-sm font-medium text-aegean">
                      {activity.time}
                    </span>
                  )}
                </div>
                {activity.confirmationNumber && (
                  <p className="mt-1 text-sm text-ink-soft">
                    Confirmation: {activity.confirmationNumber}
                  </p>
                )}
                {activity.notes && (
                  <p className="mt-1 text-sm text-ink-soft">{activity.notes}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
                  {activity.mapsUrl && (
                    <a
                      href={activity.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-aegean hover:text-aegean-dark"
                    >
                      <MapPinIcon className="h-4 w-4" />
                      Map
                    </a>
                  )}
                  {activity.websiteUrl && (
                    <a
                      href={activity.websiteUrl}
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
            ))}
          </div>
        </Card>
      )}

      {(day.confirmationDetails || day.notes) && (
        <Card>
          {day.confirmationDetails && (
            <>
              <SectionLabel>Confirmation Details</SectionLabel>
              <p className="mb-4 text-sm leading-relaxed text-ink">
                {day.confirmationDetails}
              </p>
            </>
          )}
          {day.notes && (
            <>
              <SectionLabel>Notes</SectionLabel>
              <p className="text-sm leading-relaxed text-ink-soft">
                {day.notes}
              </p>
            </>
          )}
        </Card>
      )}

      <NearbyIdeas region={day.region} />
    </div>
  );
}
