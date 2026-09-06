import Link from "next/link";
import { Card } from "@/components/Card";
import { formatDateShort } from "@/lib/utils";
import { openItems } from "@/lib/data/openItems";

export const metadata = {
  title: "Open Items — Greece, Together",
};

export default function OpenItemsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Open Items</h1>
        <p className="text-ink-soft">
          Things still to book, confirm, or decide. Resolve one by updating the real
          itinerary/hotel/flight data — this list isn&apos;t saved anywhere else.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {openItems.map((item, i) => (
          <Card key={item.id} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-sm font-semibold text-terracotta">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-base font-semibold text-ink">{item.title}</p>
              {item.detail && (
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
              )}
              {item.relatedDate && (
                <Link
                  href={`/trip/${item.relatedDate}`}
                  className="mt-2 inline-block text-sm font-medium text-aegean hover:text-aegean-dark"
                >
                  {formatDateShort(item.relatedDate)} →
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
