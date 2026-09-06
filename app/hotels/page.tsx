import { HotelCard } from "@/components/HotelCard";
import { hotels } from "@/lib/data/hotels";

export const metadata = {
  title: "Hotels — Greece, Together",
};

export default function HotelsPage() {
  const sorted = [...hotels].sort((a, b) => a.checkIn.localeCompare(b.checkIn));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Where We&apos;re Staying
        </h1>
        <p className="text-ink-soft">Four stops across Athens, Santorini, and Crete.</p>
      </div>

      <div className="flex flex-col gap-4">
        {sorted.map((hotel) => (
          <HotelCard key={hotel.slug} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
