type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-5a2 2 0 0 1 4 0v5h3.5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M8 3.5v4M16 3.5v4M4 10.5h16" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function BedIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 18v-7.5A2.5 2.5 0 0 1 5.5 8H11a2 2 0 0 1 2 2v1" />
      <path d="M3 18v2M21 18v2M3 14h18v4H3z" />
      <path d="M13 11h5.5A2.5 2.5 0 0 1 21 13.5V14" />
      <circle cx="7.5" cy="10.5" r="1.2" />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M14 4.5h5.5V10" />
      <path d="M19.5 4.5 10.5 13.5" />
      <path d="M17.5 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m9 5.5 7 6.5-7 6.5" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.55 1.55M17.55 17.55 19.1 19.1M3 12h2.2M18.8 12H21M4.9 19.1l1.55-1.55M17.55 6.45 19.1 4.9" />
    </svg>
  );
}

export function CompassIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.6 4.4-4.4 1.6 1.6-4.4 4.4-1.6Z" />
    </svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m9 12.3 2 2 4.2-4.6" />
      <path d="M12 3.5c.9 1 2.4 1.4 3.7 1 .9 1.1 2.2 1.7 3.6 1.7.2 1.4.9 2.6 2 3.4-.5 1.3-.5 2.8 0 4.1-1.1.8-1.8 2-2 3.4-1.4 0-2.7.6-3.6 1.7-1.3-.4-2.8 0-3.7 1-.9-1-2.4-1.4-3.7-1-.9-1.1-2.2-1.7-3.6-1.7-.2-1.4-.9-2.6-2-3.4.5-1.3.5-2.8 0-4.1 1.1-.8 1.8-2 2-3.4 1.4 0 2.7-.6 3.6-1.7.9.4 2.4 0 3.7-1Z" />
    </svg>
  );
}

export function PlaneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M10.5 13.5 3.5 11l1-1.8 8 1.3 4.3-4.3a1.6 1.6 0 0 1 2.3 2.3l-4.3 4.3 1.3 8-1.8 1-2.5-7-4 4v2.6l-1.6 1.6-1-3.6-3.6-1 1.6-1.6h2.6l4-4Z" />
    </svg>
  );
}

export function AlertTriangleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.8 21.2 19.5a1 1 0 0 1-.86 1.5H3.66a1 1 0 0 1-.86-1.5L12 3.8Z" />
      <path d="M12 10v4.2" />
      <circle cx="12" cy="17.3" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.3" />
    </svg>
  );
}

export function LifeBuoyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.3" />
      <path d="m6.5 6.5 3 3M17.5 6.5l-3 3M6.5 17.5l3-3M17.5 17.5l-3-3" />
    </svg>
  );
}

export function ClipboardListIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5.5" y="4.5" width="13" height="16.5" rx="2" />
      <path d="M9 4.5V3.8A1.3 1.3 0 0 1 10.3 2.5h3.4A1.3 1.3 0 0 1 15 3.8v.7" />
      <path d="M8.5 10.5h7M8.5 13.8h7M8.5 17.1h4.5" />
    </svg>
  );
}
