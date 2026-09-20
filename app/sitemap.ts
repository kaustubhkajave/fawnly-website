import { MetadataRoute } from "next";
import { blogPosts } from "./content/blogPosts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", lastModified: "2026-09-20" },
    { path: "blog", lastModified: "2026-09-20" },
    ...blogPosts.map((post) => ({ path: "blog/" + post.slug, lastModified: post.dateModified })),
    { path: "support", lastModified: "2026-07-22" },
    { path: "privacy", lastModified: "2026-07-22" },
    { path: "terms", lastModified: "2026-07-22" },
  ];

  return pages.map(({ path, lastModified }) => ({
    url: "https://getfawnly.com/" + path + (path ? "/" : ""),
    lastModified: new Date(lastModified),
  }));
}
