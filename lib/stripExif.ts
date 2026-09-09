/**
 * Re-encodes an image through a canvas, which drops all embedded metadata —
 * GPS location, timestamp, camera info — since only the decoded pixels get
 * redrawn, not the original file bytes. `imageOrientation: "from-image"`
 * makes the browser apply the original EXIF rotation to the pixels first,
 * so photos still come out right-side-up even though the orientation tag
 * itself is gone afterward.
 *
 * Runs entirely in the browser before the file ever leaves the phone — the
 * original in your Photos app is never touched.
 *
 * Falls back to the original file if canvas processing fails for any
 * reason (e.g. an unsupported format), so an upload never gets blocked —
 * but in that rare case, the original's metadata would still be intact.
 */
export async function stripExif(file: File, quality = 0.92): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}
