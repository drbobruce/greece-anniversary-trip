import { Card, SectionLabel } from "@/components/Card";
import { ExternalLinkIcon } from "@/components/icons";
import { PhotosSection } from "@/components/PhotosSection";
import { tripMeta } from "@/lib/data/tripMeta";

export const metadata = {
  title: "Trip Photos — Greece, Together",
};

export default function TripPhotosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Trip Photos</h1>
        <p className="text-ink-soft">Add photos from your phone for the family to see.</p>
      </div>

      <PhotosSection />

      {tripMeta.sharedAlbumUrl && (
        <div>
          <SectionLabel>Full-Resolution Shared Album</SectionLabel>
          <Card>
            <a
              href={tripMeta.sharedAlbumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-aegean px-5 py-3 text-sm font-semibold text-white"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Open the Shared Album
            </a>
          </Card>
        </div>
      )}
    </div>
  );
}
