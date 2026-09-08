import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, hashPasscode } from "@/lib/auth";

export async function POST(request: Request) {
  const expected = process.env.SITE_PASSCODE;
  if (!expected) {
    return NextResponse.json({ error: "No passcode configured on the server." }, { status: 500 });
  }

  const { passcode } = (await request.json().catch(() => ({}))) as { passcode?: string };
  if (!passcode || passcode !== expected) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, await hashPasscode(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: "/",
  });
  return response;
}
