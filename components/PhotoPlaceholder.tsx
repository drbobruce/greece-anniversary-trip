import type { PlaceCategory, Region } from "@/lib/types";

const REGION_STYLES: Record<Region, { gradient: string; icon: string }> = {
  athens: {
    gradient: "from-[#e9d9bd] via-[#f0e4d3] to-[#fbf7f0]",
    icon: "🏛️",
  },
  santorini: {
    gradient: "from-[#7fb3d5] via-[#bcdcea] to-[#fbf7f0]",
    icon: "🌅",
  },
  crete: {
    gradient: "from-[#1f6f8b] via-[#7fb3d5] to-[#eaf3f6]",
    icon: "🌊",
  },
  transit: {
    gradient: "from-[#dcc9a8] via-[#f0e4d3] to-[#fbf7f0]",
    icon: "✈️",
  },
};

const CATEGORY_ICONS: Record<PlaceCategory, string> = {
  restaurant: "🍽️",
  cafe: "☕",
  bar: "🍸",
  attraction: "🧭",
  historic: "🏛️",
  viewpoint: "🌄",
  beach: "🏖️",
  swimming: "🌊",
  hike: "🥾",
  activity: "🎯",
  shopping: "🛍️",
  hotel: "🛏️",
  transportation: "🚗",
};

interface PhotoPlaceholderProps {
  region?: Region;
  category?: PlaceCategory;
  className?: string;
  compact?: boolean;
}

export function PhotoPlaceholder({
  region = "santorini",
  category,
  className = "",
  compact = false,
}: PhotoPlaceholderProps) {
  const { gradient } = REGION_STYLES[region];
  const icon = category ? CATEGORY_ICONS[category] : REGION_STYLES[region].icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${
        compact ? "h-20 w-20" : "aspect-[4/3] w-full"
      } ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0%, transparent 45%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          compact ? "text-3xl" : "text-5xl"
        }`}
      >
        <span className="drop-shadow-sm">{icon}</span>
      </div>
    </div>
  );
}
