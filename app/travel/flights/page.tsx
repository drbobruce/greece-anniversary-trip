import { TransportLegCard } from "@/components/TransportLegCard";
import { formatDateLong } from "@/lib/utils";
import { transportLegs } from "@/lib/data/transport";

export const metadata = {
  title: "Flights & Ferry — Greece, Together",
};

export default function FlightsPage() {
  const sorted = [...transportLegs].sort((a, b) => a.date.localeCompare(b.date));
  const dates = [...new Set(sorted.map((leg) => leg.date))];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Flights & Ferry</h1>
        <p className="text-ink-soft">
          Every leg, in order — booked, change under consideration, and planned.
        </p>
      </div>

      {dates.map((date) => (
        <div key={date} className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {formatDateLong(date)}
          </p>
          {sorted
            .filter((leg) => leg.date === date)
            .map((leg) => (
              <TransportLegCard key={leg.id} leg={leg} />
            ))}
        </div>
      ))}
    </div>
  );
}
