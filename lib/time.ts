export function formatTimeInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(
    date
  );
}

/** Current UTC offset in hours for a timezone, e.g. 3 for Athens in summer — computed live so it tracks DST on both ends. */
export function getUtcOffsetHours(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }).formatToParts(
    date
  );
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const match = offsetPart.match(/GMT([+-]\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
