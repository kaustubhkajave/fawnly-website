import type { Metadata } from "next";
import { BlogCard } from "../components/BlogCard";
import { posts } from "../content/posts";

export const metadata: Metadata = {
  title: "Fawnly Updates & Walking Journal",
  description: "Product updates and thoughtful notes about Apple Health, outdoor walking, private activity tracking, step goals, and building a gentler walking habit.",
  alternates: { canonical: "https://fawnly.app/updates/" },
  openGraph: { title: "Fawnly Updates & Walking Journal", description: "Product updates and thoughtful notes for the walk ahead.", url: "https://fawnly.app/updates/" },
};

export default function Updates() {
  return <main className="page"><div className="wrap"><div className="page-head"><span className="eyebrow">The Fawnly journal</span><h1 className="display">Updates, ideas,<br /><span className="serif">gentle momentum.</span></h1><p>Notes about the app, everyday walking, Apple Health, local-first activity tracking, and making progress feel a little more human.</p></div><div className="blog-grid">{posts.map(post => <BlogCard key={post.slug} post={post} />)}</div></div></main>;
}
