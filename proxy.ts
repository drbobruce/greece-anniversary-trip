import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, hashPasscode } from "@/lib/auth";

const PUBLIC_PATHS = new Set(["/login", "/manifest.webmanifest", "/sw.js", "/apple-icon.png"]);
const PUBLIC_PREFIXES = ["/api/login", "/_next/", "/icons/", "/photos/"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.has(pathname) || PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const passcode = process.env.SITE_PASSCODE;
  // No passcode configured (e.g. local dev without a .env) — don't lock anyone out.
  if (!passcode) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expected = await hashPasscode(passcode);
  if (cookie === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
