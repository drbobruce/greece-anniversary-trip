import { list, put } from "@vercel/blob";

// Small shared settings that aren't trip content — currently just which
// photo is the Today-page cover. Same Blob store as the photo manifest, no
// separate database. Wrapped defensively since this is read on every Today
// page load — a missing Blob token (e.g. local dev) should just fall back
// to the default cover, never break the page.
const CONFIG_PATH = "config/site.json";

export interface SiteConfig {
  coverPhotoUrl?: string;
}

export async function readSiteConfig(): Promise<SiteConfig> {
  try {
    const { blobs } = await list({ prefix: CONFIG_PATH });
    const match = blobs.find((b) => b.pathname === CONFIG_PATH);
    if (!match) return {};

    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return {};
    return (await res.json()) as SiteConfig;
  } catch {
    return {};
  }
}

export async function writeSiteConfig(patch: Partial<SiteConfig>): Promise<SiteConfig> {
  const next = { ...(await readSiteConfig()), ...patch };
  await put(CONFIG_PATH, JSON.stringify(next), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return next;
}
