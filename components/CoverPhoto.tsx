import Image from "next/image";

const DEFAULT_COVER = "/photos/bo-and-lisa.jpg";

export function CoverPhoto({ src, className = "" }: { src?: string; className?: string }) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${className}`}>
      <Image
        src={src || DEFAULT_COVER}
        alt="Bo and Lisa"
        fill
        priority
        className="object-cover"
        sizes="(min-width: 768px) 640px, 100vw"
      />
    </div>
  );
}
