import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", lastModified: "2026-07-31" },
    { path: "blog", lastModified: "2026-07-31" },
    { path: "blog/how-to-track-steps-on-iphone-without-apple-watch", lastModified: "2026-07-31" },
    { path: "support", lastModified: "2026-07-22" },
    { path: "privacy", lastModified: "2026-07-22" },
    { path: "terms", lastModified: "2026-07-22" },
  ];

  return pages.map(({ path, lastModified }) => ({
    url: "https://getfawnly.com/" + path + (path ? "/" : ""),
    lastModified: new Date(lastModified),
  }));
}
