import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greece, Together — 30th Anniversary",
  description:
    "A private day-by-day guide to our 30th anniversary trip to Athens, Santorini, and Crete.",
  appleWebApp: {
    capable: true,
    title: "Greece 30",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf7f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-4 md:pb-12">
          {children}
        </main>
        <BottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
