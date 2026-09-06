import { AlertTriangleIcon, BadgeCheckIcon, PlaneIcon } from "./icons";
import { formatDateLong } from "@/lib/utils";
import type { TransportLeg } from "@/lib/types";

const STATUS_STYLE = {
  booked: {
    card: "border-gold/40 bg-aegean-dark",
    ribbon: "bg-gold/90 text-aegean-dark",
    label: "BOOKED",
    Icon: BadgeCheckIcon,
    heading: "text-cream",
    sub: "text-cream/80",
    accent: "text-gold",
    meta: "text-cream/90",
    ref: "text-cream",
    refWrap: "bg-cream/10",
    notes: "bg-cream/10 text-cream/90",
  },
  "change-pending": {
    card: "border-terracotta/50 bg-terracotta/10",
    ribbon: "bg-terracotta text-cream",
    label: "CURRENTLY BOOKED — CHANGE PENDING",
    Icon: AlertTriangleIcon,
    heading: "text-ink",
    sub: "text-ink-soft",
    accent: "text-terracotta",
    meta: "text-ink-soft",
    ref: "text-ink",
    refWrap: "bg-white/70",
    notes: "bg-white/70 text-ink",
  },
  planned: {
    card: "border-dashed border-sand-dark bg-sand/40",
    ribbon: "bg-sand-dark/60 text-ink",
    label: "PLANNED — NOT BOOKED",
    Icon: PlaneIcon,
    heading: "text-ink",
    sub: "text-ink-soft",
    accent: "text-ink-soft",
    meta: "text-ink-soft",
    ref: "text-ink",
    refWrap: "bg-white/70",
    notes: "bg-white/70 text-ink-soft",
  },
} as const;

export function TransportLegCard({ leg }: { leg: TransportLeg }) {
  const style = STATUS_STYLE[leg.status];
  const Icon = style.Icon;

  const timeRange = [leg.departureTime, leg.arrivalTime]
    .filter(Boolean)
    .join(" – ");

  return (
    <div className={`overflow-hidden rounded-3xl border shadow-sm ${style.card}`}>
      <div className={`flex items-center gap-2 px-5 py-2 ${style.ribbon}`}>
        <Icon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-widest">
          {style.label}
        </span>
      </div>

      <div className="p-5">
        <h3 className={`font-serif text-lg font-semibold leading-snug ${style.heading}`}>
          {leg.carrier}
          {leg.number ? ` ${leg.number}` : ""} — {leg.origin} → {leg.destination}
        </h3>
        <p className={`mt-1 text-sm ${style.sub}`}>{formatDateLong(leg.date)}</p>
        {timeRange && (
          <p className={`mt-0.5 text-sm font-medium ${style.accent}`}>{timeRange}</p>
        )}
        {leg.arrivalNote && <p className={`text-sm ${style.sub}`}>{leg.arrivalNote}</p>}
        {leg.duration && <p className={`text-sm ${style.sub}`}>{leg.duration}</p>}

        {(leg.departureTerminal || leg.arrivalTerminal || leg.cabin || leg.vehicle) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {leg.departureTerminal && (
              <span className={`rounded-full bg-black/5 px-3 py-1 text-xs font-medium ${style.meta}`}>
                Depart: {leg.departureTerminal}
              </span>
            )}
            {leg.arrivalTerminal && (
              <span className={`rounded-full bg-black/5 px-3 py-1 text-xs font-medium ${style.meta}`}>
                Arrive: {leg.arrivalTerminal}
              </span>
            )}
            {leg.cabin && (
              <span className={`rounded-full bg-black/5 px-3 py-1 text-xs font-medium ${style.meta}`}>
                {leg.cabin}
              </span>
            )}
            {leg.vehicle && (
              <span className={`rounded-full bg-black/5 px-3 py-1 text-xs font-medium ${style.meta}`}>
                {leg.vehicle}
              </span>
            )}
          </div>
        )}

        {leg.bookingReference && (
          <div className={`mt-4 rounded-2xl px-4 py-3 ${style.refWrap}`}>
            <p className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
              Booking Reference
            </p>
            <p className={`mt-0.5 font-mono text-xl font-semibold tracking-wide ${style.ref}`}>
              {leg.bookingReference}
            </p>
            {leg.secondaryReference && (
              <p className="mt-1 text-xs opacity-70">
                {leg.secondaryReferenceLabel ?? "Reference"}: {leg.secondaryReference}
              </p>
            )}
          </div>
        )}

        {leg.seats && leg.seats.length > 0 && (
          <p className={`mt-3 text-sm ${style.meta}`}>Seats: {leg.seats.join(", ")}</p>
        )}
        {leg.passengers && leg.passengers.length > 0 && (
          <p className={`mt-1 text-sm ${style.meta}`}>Passengers: {leg.passengers.join(", ")}</p>
        )}
        {(leg.fareFamily || leg.bookingClass) && (
          <p className={`mt-1 text-sm ${style.meta}`}>
            {[leg.fareFamily, leg.bookingClass && `Class ${leg.bookingClass}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}

        {leg.notes && (
          <p className={`mt-4 rounded-xl px-3 py-2 text-sm leading-relaxed ${style.notes}`}>
            {leg.notes}
          </p>
        )}
      </div>
    </div>
  );
}
