import Link from "next/link";
import { Badge } from "./Card";
import { ChevronRightIcon } from "./icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { formatDateShort, getHotelBySlug } from "@/lib/utils";
import type { TripDay } from "@/lib/types";

export function DaySummaryCard({
  day,
  isToday = false,
}: {
  day: TripDay;
  isToday?: boolean;
}) {
  const hotel = getHotelBySlug(day.hotelSlug);
  const summary =
    day.morningPlan || day.afternoonPlan || day.eveningPlan || day.notes;

  return (
    <Link
      href={`/trip/${day.date}`}
      className={`flex items-center gap-4 rounded-3xl border bg-white/90 p-4 shadow-sm shadow-ink/5 transition-transform active:scale-[0.99] ${
        isToday ? "border-aegean/50 ring-1 ring-aegean/30" : "border-sand-dark/30"
      }`}
    >
      <PhotoPlaceholder region={day.region} compact className="shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink">
            {formatDateShort(day.date)}
          </span>
          {isToday && <Badge className="bg-aegean/15 text-aegean">Today</Badge>}
          {day.label && <Badge>{day.label}</Badge>}
        </div>
        <p className="mt-0.5 truncate font-serif text-base font-semibold text-ink">
          {day.location}
        </p>
        {hotel && <p className="truncate text-xs text-ink-soft">{hotel.name}</p>}
        {summary && (
          <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{summary}</p>
        )}
      </div>

      <ChevronRightIcon className="h-5 w-5 shrink-0 text-sand-dark" />
    </Link>
  );
}
