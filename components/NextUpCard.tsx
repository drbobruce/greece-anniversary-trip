"use client";

import { CopyableCode } from "./CopyableCode";
import { AlertTriangleIcon, MapPinIcon, PlaneIcon } from "./icons";
import { estimateLeaveBy } from "@/lib/nextEvent";
import { useGeolocation } from "@/lib/useGeolocation";
import type { NextEvent } from "@/lib/types";

const KIND_LABEL: Record<NextEvent["kind"], string> = {
  flight: "Next Flight",
  ferry: "Next Ferry",
  activity: "Next Booked Activity",
  "hotel-checkin": "Next: Hotel Checkout",
};

function formatClock(d: Date): string {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** Live "next up" card — computes leave-by client-side so it can use real geolocation when available. */
export function NextUpCard({ event }: { event: NextEvent }) {
  const geo = useGeolocation();
  const leaveBy = estimateLeaveBy(event, geo.coords);
  const isUrgent = leaveBy.minutesUntilLeaveBy <= 30;

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/40 bg-aegean-dark shadow-md shadow-aegean-dark/20">
      <div className="flex items-center gap-2 bg-gold/90 px-5 py-2">
        <PlaneIcon className="h-4 w-4 text-aegean-dark" />
        <span className="text-xs font-bold uppercase tracking-widest text-aegean-dark">
          {KIND_LABEL[event.kind]}
        </span>
      </div>

      <div className="p-5 text-cream">
        <h3 className="font-serif text-lg font-semibold leading-snug">{event.title}</h3>
        <p className="mt-1 text-sm font-medium text-gold">{formatClock(event.at)}</p>

        {event.referenceNumber && (
          <div className="mt-3 rounded-2xl bg-cream/10 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/60">
              Confirmation
            </p>
            <div className="mt-0.5 text-lg font-semibold tracking-wide text-cream">
              <CopyableCode value={event.referenceNumber} />
            </div>
          </div>
        )}

        <div
          className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
            isUrgent ? "bg-terracotta/90 text-cream" : "bg-cream/10 text-cream/90"
          }`}
        >
          {isUrgent && <AlertTriangleIcon className="h-4 w-4 shrink-0" />}
          <span>
            Leave by <strong>{formatClock(leaveBy.leaveBy)}</strong> (estimated
            {leaveBy.travelMinutes > 0 && `: ~${formatMinutes(leaveBy.travelMinutes)} travel +`}
            {leaveBy.travelMinutes === 0 && ":"} {leaveBy.bufferMinutes}m buffer)
          </span>
        </div>
        {!leaveBy.hasRealTravelEstimate && (event.kind === "flight" || event.kind === "ferry") && (
          <p className="mt-1.5 text-xs text-cream/60">
            Turn on location for a real travel-time estimate — this only reflects the arrival
            buffer right now.
          </p>
        )}

        {event.mapsUrl && (
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80"
          >
            <MapPinIcon className="h-4 w-4" />
            Navigate
          </a>
        )}
      </div>
    </div>
  );
}
