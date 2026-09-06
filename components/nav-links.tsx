import type { ComponentType } from "react";
import { BedIcon, CalendarIcon, HomeIcon, MapPinIcon, PlaneIcon } from "./icons";

export interface NavLink {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Today", Icon: HomeIcon },
  { href: "/trip", label: "Trip", Icon: CalendarIcon },
  { href: "/travel", label: "Travel", Icon: PlaneIcon },
  { href: "/places", label: "Places", Icon: MapPinIcon },
  { href: "/hotels", label: "Hotels", Icon: BedIcon },
];
