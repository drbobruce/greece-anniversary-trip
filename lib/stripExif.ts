/**
 * Re-encodes an image through a canvas, which drops all embedded metadata —
 * GPS location, timestamp, camera info — since only the decoded pixels get
 * redrawn, not the original file bytes. `imageOrientation: "from-image"`
 * makes the browser apply the original EXIF rotation to the pixels first,
 * so photos still come out right-side-up even though the orientation tag
 * itself is gone afterward.
 *
 * Downscaled to fit within `maxDimension` — modern phone cameras produce
 * images (48MP+) that exceed mobile Safari's canvas size limits, which
 * causes the browser to hang rather than throw, so capping the size here
 * avoids that entirely (and keeps uploads quick over cellular).
 *
 * Runs entirely in the browser before the file ever leaves the phone — the
 * original in your Photos app is never touched.
 *
 * Falls back to the original file if canvas processing fails for any
 * reason (e.g. an unsupported format), so an upload never gets blocked —
 * but in that rare case, the original's metadata would still be intact.
 */
export async function stripExif(file: File, quality = 0.92, maxDimension = 2400): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
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
