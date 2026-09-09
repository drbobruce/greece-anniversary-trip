import { NextResponse } from "next/server";
import { writeSiteConfig } from "@/lib/siteConfig";

/** Sets (or, with `url: null`, clears back to the default) the Today-page cover photo. */
export async function POST(request: Request) {
  const { url } = (await request.json().catch(() => ({}))) as { url?: string | null };

  try {
    const config = await writeSiteConfig({ coverPhotoUrl: url ?? undefined });
    return NextResponse.json({ ok: true, config });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update cover photo" },
      { status: 500 }
    );
  }
}
