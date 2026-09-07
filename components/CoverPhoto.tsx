import Image from "next/image";

export function CoverPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${className}`}>
      <Image
        src="/photos/bo-and-lisa.jpg"
        alt="Bo and Lisa"
        fill
        priority
        className="object-cover"
        sizes="(min-width: 768px) 640px, 100vw"
      />
    </div>
  );
}
