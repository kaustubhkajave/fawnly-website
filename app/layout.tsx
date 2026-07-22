import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fawnly.app"),
  title: { default: "Fawnly — Calm Walking & Step Tracker for iPhone", template: "%s — Fawnly" },
  description: "Fawnly is a calm, local-first walking and step tracker for iPhone with Apple Health activity, outdoor walk recording, private routes, widgets, goals, history, share cards, and beautiful themes.",
  keywords: ["step tracker for iPhone", "walking tracker app", "Apple Health step tracker", "walk recording app", "daily step goal app", "walking progress tracker", "pedometer", "private route tracker"],
  category: "health and fitness",
  applicationName: "Fawnly",
  alternates: { canonical: "https://fawnly.app/" },
  openGraph: { title: "Fawnly — Calm Walking & Step Tracker for iPhone", description: "See your Apple Health activity, record outdoor walks, keep private routes, and follow richer progress in a calm, local-first app.", url: "https://fawnly.app/", siteName: "Fawnly", locale: "en_US", type: "website", images: [{ url: "/images/app-icon.png", width: 1024, height: 1024, type: "image/png", alt: "Fawnly deer app icon on deep forest green" }] },
  twitter: { card: "summary", title: "Fawnly — Calm Walking & Step Tracker for iPhone", description: "Walk gently. Track beautifully—with Apple Health activity, outdoor recordings, private routes, widgets, and expressive themes.", images: ["/images/app-icon.png"] },
  appleWebApp: { capable: true, title: "Fawnly", statusBarStyle: "default" },
  icons: { icon: "/images/app-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}><body><Header />{children}<Footer /></body></html>;
}
