"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-links";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-sand-dark/40 bg-cream/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-3xl items-stretch justify-around px-2 pt-1.5">
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors"
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? "text-aegean" : "text-ink-soft"
                }`}
              />
              <span className={isActive ? "text-aegean" : "text-ink-soft"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
