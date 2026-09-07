import { formatTimeInZone, getUtcOffsetHours } from "@/lib/time";

const GREECE_TZ = "Europe/Athens";
const HOME_TZ = "America/New_York";

/** So family back home don't call at 3am your time — computed live, no location needed. */
export function LocalTimeBanner({ now = new Date() }: { now?: Date }) {
  const greeceTime = formatTimeInZone(now, GREECE_TZ);
  const homeTime = formatTimeInZone(now, HOME_TZ);
  const hoursAhead = getUtcOffsetHours(now, GREECE_TZ) - getUtcOffsetHours(now, HOME_TZ);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-sand/50 px-4 py-2.5 text-sm">
      <span>
        <span className="font-semibold text-ink">🇬🇷 {greeceTime}</span>
        <span className="mx-2 text-sand-dark">·</span>
        <span className="text-ink-soft">Charlotte {homeTime}</span>
      </span>
      <span className="text-xs font-medium text-ink-soft">{hoursAhead}h ahead</span>
    </div>
  );
}
