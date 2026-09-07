/** Builds a Google Maps search link from a free-text query — no API key needed. */
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

/** Builds a turn-by-turn Google Maps directions link to a coordinate — no API key needed. */
export function mapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** Builds a `tel:` link from a phone number, stripping display formatting. */
export function telUrl(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
