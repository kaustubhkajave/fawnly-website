export const SITE_URL = "https://getfawnly.com";

export const defaultSocialImage = {
  url: "/images/og/fawnly-og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Fawnly, a calm step tracker for iPhone, showing today’s steps and weekly progress",
};

// A page that sets its own `openGraph` replaces the layout's entirely, so spread this in.
export const sharedOpenGraph = { siteName: "Fawnly", locale: "en_US", type: "website" } as const;
