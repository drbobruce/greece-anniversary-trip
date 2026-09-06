import Link from "next/link";
import { NAV_LINKS } from "./nav-links";

export function Header() {
  return (
    <header className="safe-top sticky top-0 z-40 border-b border-sand-dark/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl leading-none">🕊️</span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-ink">
              Greece, Together
            </span>
            <span className="text-[11px] uppercase tracking-wide text-ink-soft">
              30th Anniversary · Sept 2026
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-sand/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
