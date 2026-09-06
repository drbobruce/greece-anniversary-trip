import type { ReactNode } from "react";

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-aegean text-white"
          : "bg-white/90 text-ink-soft hover:bg-sand"
      }`}
    >
      {children}
    </button>
  );
}
