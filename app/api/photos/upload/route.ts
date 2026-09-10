import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

/** Mints a short-lived client token so the browser can upload straight to Blob storage, bypassing this server's body-size limits. */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp", "image/gif"],
        addRandomSuffix: true,
        maximumSizeInBytes: 25 * 1024 * 1024, // 25MB — generous for phone photos
      }),
      onUploadCompleted: async () => {
        // Intentionally empty: this webhook can't reach localhost during
        // development, so the client calls /api/photos/add itself right
        // after upload() resolves instead of relying on this callback.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Photo upload token request failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
