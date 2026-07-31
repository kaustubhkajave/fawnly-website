import type { Metadata } from "next";
import { BlogArticleCard } from "../components/BlogArticleCard";
import { blogPosts } from "../content/blogPosts";

const description = "Practical iPhone walking guides from Fawnly about Apple Health, step tracking, realistic goals, privacy, and building a gentler walking habit.";

export const metadata: Metadata = {
  title: { absolute: "Fawnly Blog | iPhone Walking & Apple Health Guides" },
  description,
  alternates: { canonical: "https://getfawnly.com/blog/" },
  openGraph: {
    type: "website",
    title: "Fawnly Blog | iPhone Walking & Apple Health Guides",
    description,
    url: "https://getfawnly.com/blog/",
    siteName: "Fawnly",
    locale: "en_US",
    images: [{
      url: "/images/blog/how-to-track-steps-iphone-og.png",
      width: 1200,
      height: 630,
      alt: "Fawnly guide to tracking steps on iPhone without an Apple Watch",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fawnly Blog | iPhone Walking & Apple Health Guides",
    description,
    images: ["/images/blog/how-to-track-steps-iphone-og.png"],
  },
};

export default function Blog() {
  return (
    <main className="page">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">The Fawnly blog</span>
          <h1 className="display">Helpful guides.<br /><span className="serif">Gentler progress.</span></h1>
          <p>Clear, practical notes about iPhone step tracking, Apple Health, everyday walking, and making movement feel more personal.</p>
        </div>
        <div className="blog-grid blog-grid-featured">
          {blogPosts.map((post) => <BlogArticleCard key={post.slug} post={post} />)}
        </div>
      </div>
    </main>
  );
}
