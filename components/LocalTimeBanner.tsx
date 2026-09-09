import { formatTimeInZone, getUtcOffsetHours } from "@/lib/time";

const GREECE_TZ = "Europe/Athens";
const HOME_TZ = "America/New_York";

/** So family back home don't call at 3am your time — computed live, no location needed. */
export function LocalTimeBanner({ now = new Date() }: { now?: Date }) {
  const greeceTime = formatTimeInZone(now, GREECE_TZ);
  const homeTime = formatTimeInZone(now, HOME_TZ);
  const hoursAhead = getUtcOffsetHours(now, GREECE_TZ) - getUtcOffsetHours(now, HOME_TZ);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-aegean-dark px-4 py-3 text-cream">
      <span>
        <span className="text-lg font-bold">🇬🇷 {greeceTime}</span>
        <span className="mx-2 text-cream/40">·</span>
        <span className="text-sm text-cream/80">Charlotte {homeTime}</span>
      </span>
      <span className="text-xs font-medium text-cream/70">{hoursAhead}h ahead</span>
    </div>
  );
}
