// A single shared family passcode, not real user accounts — just enough to
// keep the itinerary/photos out of search engines and passersby. Uses the
// Web Crypto API (not Node's `crypto` module) so this works in both the
// Edge middleware runtime and regular server routes.
export const AUTH_COOKIE_NAME = "site_auth";

export async function hashPasscode(passcode: string): Promise<string> {
  const data = new TextEncoder().encode(passcode);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
