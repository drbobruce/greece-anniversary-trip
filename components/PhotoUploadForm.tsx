"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { CameraIcon } from "./icons";
import { stripExif } from "@/lib/stripExif";

export function PhotoUploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      for (const rawFile of Array.from(files)) {
        // Strip GPS/EXIF metadata before the photo ever leaves the phone —
        // the original in the Photos app is untouched, only this uploaded
        // copy is re-encoded without it.
        const file = await stripExif(rawFile);
        const blob = await upload(`photos/${Date.now()}-${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/photos/upload",
        });
        await fetch("/api/photos/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: blob.url }),
        });
      }
      onUploaded?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed — try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-aegean px-5 py-3 text-sm font-semibold text-white active:scale-[0.98]">
        <CameraIcon className="h-4 w-4" />
        {uploading ? "Uploading…" : "Add Photos"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {error && <p className="mt-2 text-sm text-terracotta">{error}</p>}
    </div>
  );
}
