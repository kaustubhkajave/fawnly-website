import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhoneMockup } from "../../components/PhoneMockup";
import { posts, postsBySlug } from "../../content/posts";

export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsBySlug[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://getfawnly.com/updates/${slug}/` },
    openGraph: { type: "article", title: post.title, description: post.description, url: `https://getfawnly.com/updates/${slug}/`, publishedTime: `${post.date}T00:00:00+05:30`, tags: post.tags },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsBySlug[slug];
  if (!post) notFound();
  const articleData = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date, mainEntityOfPage: `https://getfawnly.com/updates/${slug}/`, author: { "@type": "Organization", name: "Fawnly" }, publisher: { "@type": "Organization", name: "Fawnly", logo: { "@type": "ImageObject", url: "https://getfawnly.com/images/app-icon.png" } }, image: post.image ? `https://getfawnly.com${post.image}` : "https://getfawnly.com/images/app-icon.png" };

  return <><main className="page"><article className="post"><div className="post-meta"><span>{post.tags.join(" · ")}</span><span>·</span><time dateTime={post.date}>{post.displayDate}</time></div><h1 className="display post-title">{post.title}</h1><p className="post-deck">{post.description}</p>{post.image && <div className="post-cover"><PhoneMockup src={post.image} alt="Fawnly app screen" /></div>}<div className="prose">{post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<h2>A gentler way forward</h2><p>Keep an eye on the moments that feel good. Fawnly is here to make those moments easier to notice.</p></div></article></main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} /></>;
}
