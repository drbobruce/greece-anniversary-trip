import { list, put } from "@vercel/blob";
import type { PhotoEntry } from "./types";

// Photo metadata (caption, timestamp) lives in one small JSON file in the
// same Blob store as the photos themselves — no separate database. Fine for
// a small family album; not built for high concurrent write volume.
const MANIFEST_PATH = "photos/manifest.json";

export async function readPhotoManifest(): Promise<PhotoEntry[]> {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const match = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!match) return [];

  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as PhotoEntry[];
}

export async function addPhotoToManifest(entry: PhotoEntry): Promise<PhotoEntry[]> {
  const entries = [entry, ...(await readPhotoManifest())];
  await put(MANIFEST_PATH, JSON.stringify(entries), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return entries;
}
