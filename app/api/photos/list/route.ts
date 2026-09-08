import { NextResponse } from "next/server";
import { readPhotoManifest } from "@/lib/photoManifest";

export async function GET() {
  const photos = await readPhotoManifest();
  return NextResponse.json({ photos });
}
