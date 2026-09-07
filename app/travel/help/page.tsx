import Link from "next/link";
import { Card, SectionLabel } from "@/components/Card";
import { HotelCard } from "@/components/HotelCard";
import { TransportLegCard } from "@/components/TransportLegCard";
import { contingencyNotes } from "@/lib/data/contingencyNotes";
import { getCurrentOrNextHotel, getUpcomingTransportLeg } from "@/lib/utils";

export const metadata = {
  title: "Travel Help — Greece, Together",
};

export default function TravelHelpPage() {
  const now = new Date();
  const hotel = getCurrentOrNextHotel(now);
  const flight = getUpcomingTransportLeg("flight", now);
  const ferry = getUpcomingTransportLeg("ferry", now);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Travel Help</h1>
        <p className="text-ink-soft">
          A quick-reference screen for when something goes wrong or you just need information
          fast — the essentials in one place, not an alarm.
        </p>
      </div>

      <div>
        <SectionLabel>Flights</SectionLabel>
        {flight ? (
          <TransportLegCard leg={flight} />
        ) : (
          <Card>
            <p className="text-sm text-ink-soft">No upcoming flight on record.</p>
          </Card>
        )}
        <Link
          href="/travel/flights"
          className="mt-2 inline-block text-sm font-medium text-aegean hover:text-aegean-dark"
        >
          See all flights & ferry →
        </Link>
      </div>

      <div>
        <SectionLabel>Hotel</SectionLabel>
        {hotel ? (
          <HotelCard hotel={hotel} />
        ) : (
          <Card>
            <p className="text-sm text-ink-soft">No hotel on record.</p>
          </Card>
        )}
      </div>

      <div>
        <SectionLabel>Ferry</SectionLabel>
        {ferry ? (
          <TransportLegCard leg={ferry} />
        ) : (
          <Card>
            <p className="text-sm text-ink-soft">No ferry booking on record.</p>
          </Card>
        )}
      </div>

      <div>
        <SectionLabel>Important Connections</SectionLabel>
        <div className="flex flex-col gap-3">
          {contingencyNotes.map((note) => (
            <Card key={note.id}>
              <p className="font-serif text-base font-semibold text-ink">{note.question}</p>
              <p className="mt-1 text-sm italic leading-relaxed text-ink-soft">
                {note.answer ?? "Not yet added — add notes here when you have them."}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Link
        href="/travel/reservations"
        className="text-sm font-medium text-aegean hover:text-aegean-dark"
      >
        Full confirmation-number reference →
      </Link>
    </div>
  );
}
