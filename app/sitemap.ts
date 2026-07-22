import { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap {
  const paths = ["", "updates", "support", "privacy", "terms", "updates/introducing-fawnly", "updates/how-fawnly-uses-apple-health", "updates/choosing-a-daily-step-goal"];
  return paths.map(path => ({ url: `https://fawnly.app/${path}${path ? "/" : ""}`, lastModified: new Date("2026-07-22") }));
}
