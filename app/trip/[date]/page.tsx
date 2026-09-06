import { notFound } from "next/navigation";
import { DayDetail } from "@/components/DayDetail";
import { formatDateLong, getDayByDate, getTripDays } from "@/lib/utils";

export function generateStaticParams() {
  return getTripDays().map((day) => ({ date: day.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getDayByDate(date);
  return { title: day ? `${formatDateLong(day.date)} — Greece, Together` : "Trip" };
}

export default async function TripDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getDayByDate(date);

  if (!day) notFound();

  return <DayDetail day={day} />;
}
