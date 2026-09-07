import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bo & Lisa — Greece 30",
    short_name: "Greece 30",
    description: "A private day-by-day guide to Bo & Lisa's 30th anniversary trip to Greece.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#fbf7f0",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
