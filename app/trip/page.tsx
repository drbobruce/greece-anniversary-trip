import { DaySummaryCard } from "@/components/DaySummaryCard";
import { getTodayInfo, getTripDays } from "@/lib/utils";

export const metadata = {
  title: "Trip — Greece, Together",
};

export default function TripPage() {
  const days = getTripDays();
  const today = getTodayInfo();
  const todayDate = today.status === "during" ? today.day?.date : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          The Full Itinerary
        </h1>
        <p className="text-ink-soft">September 10–19, 2026</p>
      </div>

      <div className="flex flex-col gap-3">
        {days.map((day) => (
          <DaySummaryCard
            key={day.date}
            day={day}
            isToday={day.date === todayDate}
          />
        ))}
      </div>
    </div>
  );
}
