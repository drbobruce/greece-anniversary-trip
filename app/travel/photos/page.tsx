import { Card } from "@/components/Card";
import { ExternalLinkIcon } from "@/components/icons";
import { tripMeta } from "@/lib/data/tripMeta";

export const metadata = {
  title: "Trip Photos — Greece, Together",
};

export default function TripPhotosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Trip Photos</h1>
        <p className="text-ink-soft">
          Photos live in a shared album, not in this app — the easiest way for family to see
          them too.
        </p>
      </div>

      <Card>
        {tripMeta.sharedAlbumUrl ? (
          <a
            href={tripMeta.sharedAlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-aegean px-5 py-3 text-sm font-semibold text-white"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            Open the Shared Album
          </a>
        ) : (
          <p className="text-sm leading-relaxed text-ink-soft">
            No shared album linked yet. Create a shared Google Photos or iCloud album, then add
            its link to <code className="font-mono text-xs">lib/data/tripMeta.ts</code>.
          </p>
        )}
      </Card>
    </div>
  );
}
