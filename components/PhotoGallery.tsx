"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { PhotoEntry } from "@/lib/types";

async function setCover(url: string | null): Promise<boolean> {
  const res = await fetch("/api/config/cover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return res.ok;
}

export function PhotoGallery({ refreshKey }: { refreshKey: number }) {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [justSet, setJustSet] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/photos/list", { cache: "no-store" });
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as { photos: PhotoEntry[] };
      setPhotos(data.photos ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on mount/refresh; setState happens after the awaited response, not synchronously in the effect body
    void load();
  }, [load, refreshKey]);

  async function handleSetCover(url: string) {
    setJustSet(url);
    const ok = await setCover(url);
    if (!ok) setJustSet(null);
  }

  async function handleResetCover() {
    await setCover(null);
    setJustSet("__reset__");
  }

  if (loading) return <p className="text-sm text-ink-soft">Loading photos…</p>;
  if (error) {
    return (
      <p className="text-sm text-ink-soft">
        Couldn&apos;t load photos right now — this needs the app deployed with a Blob store
        connected.
      </p>
    );
  }
  if (photos.length === 0) {
    return <p className="text-sm text-ink-soft">No photos yet — be the first to add one!</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.url}
            className="relative aspect-square overflow-hidden rounded-2xl bg-sand/40"
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? "Trip photo"}
              fill
              sizes="(min-width: 768px) 300px, 50vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleSetCover(photo.url)}
              className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur active:scale-95"
            >
              {justSet === photo.url ? "✓ Cover set" : "Set as Cover"}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleResetCover}
        className="self-start text-sm font-medium text-aegean hover:text-aegean-dark"
      >
        {justSet === "__reset__" ? "✓ Back to the original cover photo" : "Use the original cover photo instead"}
      </button>
    </div>
  );
}
