import { Card } from "@/components/Card";
import { CopyableCode } from "@/components/CopyableCode";
import { formatDateShort, getConfirmationEntries } from "@/lib/utils";

export const metadata = {
  title: "Confirmation Numbers — Greece, Together",
};

export default function ReservationsPage() {
  const entries = getConfirmationEntries();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Confirmation Numbers</h1>
        <p className="text-ink-soft">Every reference number, in one place, for quick lookup while traveling.</p>
      </div>

      <div className="flex flex-col gap-3">
        {entries.map((entry, i) => (
          <Card key={i} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-aegean">
                {entry.category}
                {entry.date && ` · ${formatDateShort(entry.date)}`}
              </p>
              <p className="mt-0.5 truncate font-serif text-base font-semibold text-ink">
                {entry.label}
              </p>
              {entry.secondaryReference && (
                <p className="mt-1 text-xs text-ink-soft">
                  {entry.secondaryLabel ?? "Reference"}: {entry.secondaryReference}
                </p>
              )}
            </div>
            <div className="shrink-0 text-lg font-semibold tracking-wide text-ink">
              <CopyableCode value={entry.reference} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
