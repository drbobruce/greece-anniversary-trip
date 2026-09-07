import Link from "next/link";
import { Card, SectionLabel } from "@/components/Card";
import { ChevronRightIcon } from "@/components/icons";
import { CoverPhoto } from "@/components/CoverPhoto";
import { TravelDashboard } from "@/components/TravelDashboard";
import { formatDateLong, getTodayInfo } from "@/lib/utils";

// "Today" depends on the real-world date, so always render it fresh.
export const dynamic = "force-dynamic";

export default function TodayPage() {
  const info = getTodayInfo();

  if (info.status === "during" && info.day) {
    return <TravelDashboard day={info.day} />;
  }

  if (info.status === "before" && info.nextDay) {
    return (
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden p-0!">
          <CoverPhoto />
          <div className="p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-aegean">
              Countdown to Greece
            </p>
            <p className="mt-2 font-serif text-5xl font-bold text-ink">
              {info.daysUntilTrip}
            </p>
            <p className="text-ink-soft">
              {info.daysUntilTrip === 1 ? "day to go" : "days to go"}
            </p>
          </div>
        </Card>

        <Card>
          <SectionLabel>First Up</SectionLabel>
          <p className="font-serif text-lg font-semibold text-ink">
            {formatDateLong(info.nextDay.date)}
          </p>
          <p className="text-ink-soft">{info.nextDay.location}</p>
          <Link
            href={`/trip/${info.nextDay.date}`}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-aegean hover:text-aegean-dark"
          >
            View the plan
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/trip"
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/90 p-4 text-center shadow-sm shadow-ink/5"
          >
            <span className="text-2xl">🗓️</span>
            <span className="text-sm font-medium text-ink">Full Trip</span>
          </Link>
          <Link
            href="/places"
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/90 p-4 text-center shadow-sm shadow-ink/5"
          >
            <span className="text-2xl">📍</span>
            <span className="text-sm font-medium text-ink">Places</span>
          </Link>
          <Link
            href="/hotels"
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/90 p-4 text-center shadow-sm shadow-ink/5"
          >
            <span className="text-2xl">🛏️</span>
            <span className="text-sm font-medium text-ink">Hotels</span>
          </Link>
        </div>
      </div>
    );
  }

  // status === "after"
  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden p-0!">
        <CoverPhoto />
        <div className="p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-aegean">
            Efharisto, Greece
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold text-ink">
            Here&apos;s to thirty more years.
          </p>
          <p className="mt-2 text-ink-soft">
            The trip has wrapped up — the full itinerary is still here anytime
            you want to relive it.
          </p>
          <Link
            href={info.lastDay ? `/trip/${info.lastDay.date}` : "/trip"}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-aegean hover:text-aegean-dark"
          >
            Revisit the last day
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
