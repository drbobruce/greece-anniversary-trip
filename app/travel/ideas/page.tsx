import Link from "next/link";
import { Card } from "@/components/Card";
import { formatDateShort } from "@/lib/utils";
import { backupIdeas } from "@/lib/data/backupIdeas";

export const metadata = {
  title: "Optional & Backup Ideas — Greece, Together",
};

export default function BackupIdeasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Optional / Backup Ideas</h1>
        <p className="text-ink-soft">
          Research and alternatives that didn&apos;t make the main plan — kept here instead
          of deleted, in case plans change.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {backupIdeas.map((idea) => (
          <Card key={idea.id}>
            <p className="font-serif text-base font-semibold text-ink">{idea.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{idea.detail}</p>
            {idea.relatedDate && (
              <Link
                href={`/trip/${idea.relatedDate}`}
                className="mt-2 inline-block text-sm font-medium text-aegean hover:text-aegean-dark"
              >
                {formatDateShort(idea.relatedDate)} →
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
