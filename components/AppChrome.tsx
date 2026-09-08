"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the normal Header/BottomNav on the passcode login screen. */
export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return <>{children}</>;
}
