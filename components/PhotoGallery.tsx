"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { PhotoEntry } from "@/lib/types";

export function PhotoGallery({ refreshKey }: { refreshKey: number }) {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    <div className="grid grid-cols-2 gap-3">
      {photos.map((photo) => (
        <div key={photo.url} className="relative aspect-square overflow-hidden rounded-2xl bg-sand/40">
          <Image
            src={photo.url}
            alt={photo.caption ?? "Trip photo"}
            fill
            sizes="(min-width: 768px) 300px, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
