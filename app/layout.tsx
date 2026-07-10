import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://fawnly.app"),
  title: { default: "Fawnly — Calm Step Tracker for iPhone", template: "%s — Fawnly" },
  description: "Fawnly is a calm step tracker for iPhone that helps you follow your steps, distance, goals, and walking progress with beautiful themes powered by Apple Health.",
  alternates: { canonical: "https://fawnly.app" },
  openGraph: { title: "Fawnly — Calm Step Tracker for iPhone", description: "Walk gently. Track beautifully.", url: "https://fawnly.app", siteName: "Fawnly", type: "website", images: [{ url: "/images/app-icon.png", width: 1024, height: 1024, alt: "Fawnly app icon" }] },
  twitter: { card: "summary_large_image", title: "Fawnly — Calm Step Tracker for iPhone", description: "Walk gently. Track beautifully." },
  icons: { icon: "/images/app-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
