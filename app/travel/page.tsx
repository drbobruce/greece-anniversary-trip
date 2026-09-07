import Link from "next/link";
import { Card, SectionLabel } from "@/components/Card";
import {
  BadgeCheckIcon,
  CameraIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  CompassIcon,
  LifeBuoyIcon,
  PlaneIcon,
} from "@/components/icons";
import { openItems } from "@/lib/data/openItems";

export const metadata = {
  title: "Travel — Greece, Together",
};

const TILES = [
  {
    href: "/travel/help",
    label: "Travel Help",
    description: "Next flight, hotel, ferry, and important connections — fast",
    Icon: LifeBuoyIcon,
  },
  {
    href: "/travel/flights",
    label: "Flights & Ferry",
    description: "Every leg, in order, with confirmation numbers",
    Icon: PlaneIcon,
  },
  {
    href: "/travel/open-items",
    label: "Open Items",
    description: "What's still left to book, confirm, or decide",
    Icon: ClipboardListIcon,
  },
  {
    href: "/travel/reservations",
    label: "Confirmation Numbers",
    description: "Every reference number in one quick-lookup list",
    Icon: BadgeCheckIcon,
  },
  {
    href: "/travel/ideas",
    label: "Optional / Backup Ideas",
    description: "Alternatives worth keeping, kept out of the main plan",
    Icon: CompassIcon,
  },
  {
    href: "/travel/photos",
    label: "Trip Photos",
    description: "A shared album family can see too",
    Icon: CameraIcon,
  },
];

export default function TravelHubPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Travel</h1>
        <p className="text-ink-soft">Flights, ferry, open items, and reservations.</p>
      </div>

      <div className="flex flex-col gap-3">
        {TILES.map(({ href, label, description, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 rounded-3xl border border-sand-dark/30 bg-white/90 p-4 shadow-sm shadow-ink/5 transition-transform active:scale-[0.99]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-aegean/10">
              <Icon className="h-6 w-6 text-aegean" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-base font-semibold text-ink">{label}</p>
              <p className="text-sm text-ink-soft">{description}</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-sand-dark" />
          </Link>
        ))}
      </div>

      {openItems.length > 0 && (
        <Card className="border-terracotta/40 bg-terracotta/5">
          <SectionLabel>
            <span className="text-terracotta">{openItems.length} Open Items</span>
          </SectionLabel>
          <p className="text-sm leading-relaxed text-ink-soft">
            Including the Crete → Athens return flight change and the Sep 16 buggy rental.{" "}
            <Link href="/travel/open-items" className="font-medium text-aegean hover:text-aegean-dark">
              See the full list →
            </Link>
          </p>
        </Card>
      )}

      <Card>
        <SectionLabel>Our Trip Style</SectionLabel>
        <p className="text-sm leading-relaxed text-ink">
          An active couple who don&apos;t want to sit around all day — but also don&apos;t
          want the trip overscheduled. We&apos;re balancing adventure, romance, scenery,
          local culture, walking, swimming/snorkeling, sailing, buggy/e-bike activities,
          good Greek food, and some intentional luxury/pool time (Canaves Oia is a
          splurge worth lingering in).
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          We&apos;re skipping VIP airport services, expensive private transfers where
          normal transportation works fine, formal wine tours, fine dining at every meal,
          and packing every hour with tours. Lisa leans toward food experiences; Bo
          toward simpler, classic food — we both like authentic local spots and
          memorable settings. The goal isn&apos;t to see everything — it&apos;s an
          exceptional, unrushed 30th anniversary.
        </p>
      </Card>
    </div>
  );
}
