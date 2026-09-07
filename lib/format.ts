/** e.g. 45 -> "45 min", 90 -> "1.5 hours", 180 -> "3 hours" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  const rounded = Math.round(hours * 2) / 2; // nearest half hour
  return `${rounded % 1 === 0 ? rounded : rounded.toFixed(1)} hour${rounded === 1 ? "" : "s"}`;
}

/** e.g. 45 -> "45m", 130 -> "2h 10m to spare" */
export function formatMinutesToSpare(minutes: number): string {
  if (minutes < 60) return `${minutes} min to spare`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hours}h to spare` : `${hours}h ${mins}m to spare`;
}
