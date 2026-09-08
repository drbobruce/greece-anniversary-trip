"use client";

import { useState } from "react";
import { PhotoGallery } from "./PhotoGallery";
import { PhotoUploadForm } from "./PhotoUploadForm";

export function PhotosSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <PhotoUploadForm onUploaded={() => setRefreshKey((k) => k + 1)} />
      <PhotoGallery refreshKey={refreshKey} />
    </div>
  );
}
