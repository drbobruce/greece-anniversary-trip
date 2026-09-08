import { NextResponse } from "next/server";
import { addPhotoToManifest } from "@/lib/photoManifest";

/** Called right after a client upload finishes, to record it in the shared manifest. */
export async function POST(request: Request) {
  const { url, caption } = (await request.json().catch(() => ({}))) as {
    url?: string;
    caption?: string;
  };

  if (!url) {
    return NextResponse.json({ error: "Missing photo url" }, { status: 400 });
  }

  const entries = await addPhotoToManifest({
    url,
    caption,
    uploadedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, count: entries.length });
}
