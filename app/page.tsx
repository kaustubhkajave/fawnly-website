import type { Metadata } from "next";
import { AppStoreButton } from "./components/AppStoreButton";
import { BlogCard } from "./components/BlogCard";
import { Activities, FAQ, Features, HeroScene, Plus, ScreenshotStory, Themes } from "./components/HomeSections";
import { faqItems } from "./content/faqs";
import { posts } from "./content/posts";

export const metadata: Metadata = {
  title: "Fawnly — Calm Walking & Step Tracker for iPhone",
  description: "Fawnly is a calm, local-first walking and step tracker for iPhone with Apple Health activity, outdoor walk recording, private routes, widgets, goals, history, share cards, and beautiful themes.",
  alternates: { canonical: "https://fawnly.app/" },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": "https://fawnly.app/#website", name: "Fawnly", url: "https://fawnly.app/", description: metadata.description },
      {
        "@type": "SoftwareApplication",
        "@id": "https://fawnly.app/#app",
        name: "Fawnly",
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Walking and activity tracker",
        operatingSystem: "iOS",
        downloadUrl: "https://apps.apple.com/in/app/fawnly/id6783288513",
        url: "https://fawnly.app/",
        description: metadata.description,
        featureList: ["Apple Health activity summary", "Outdoor walk recording", "Private GPS route history", "Home Screen widgets", "Live Activities", "Week, Month, and Year history", "Themes and hero fonts", "Share cards"],
        screenshot: ["https://fawnly.app/images/screens/latest/home-warm-green.webp", "https://fawnly.app/images/screens/latest/history-month.webp", "https://fawnly.app/images/screens/latest/themes.webp"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free download with an optional Fawnly Plus subscription." },
      },
      { "@type": "FAQPage", mainEntity: faqItems.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
  };

  return (
    <>
      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">A calm, local-first walking companion</span>
              <h1 className="display font-display">Walk gently.<br /><span className="serif">Track beautifully.</span></h1>
              <p>See your Apple Health activity, record outdoor walks, keep private routes, use widgets, and follow richer walking progress—all in a step tracker designed to feel calm.</p>
              <div className="hero-actions"><AppStoreButton /><a className="btn btn-ghost" href="#features">See what’s new <span aria-hidden="true">↓</span></a></div>
            </div>
            <HeroScene />
          </div>
        </section>

        <div className="wrap trust" aria-label="Fawnly highlights">
          <span>Apple Health, with permission</span><span>No account or cloud sync</span><span>No ads or cross-app tracking</span><span>GPS only when you record</span><span>Built for everyday walking</span>
        </div>

        <Features />
        <ScreenshotStory />
        <Activities />
        <Themes />

        <section className="section privacy-callout">
          <div className="wrap card privacy-card">
            <div className="eyebrow">Private by design</div>
            <h2 className="h2">Your movement stays<br />close to home.</h2>
            <p>Fawnly does not require an account and does not include Fawnly cloud sync. Apple Health activity, recorded sessions, precise routes, widget snapshots, and settings stay on your device. Location is requested only when you start an outdoor activity.</p>
            <div className="inline-links"><a href="/privacy">Read the Privacy Policy ↗</a><a href="/support">Visit Support ↗</a></div>
          </div>
        </section>

        <Plus />

        <section className="section">
          <div className="wrap">
            <div className="section-intro"><div><span className="eyebrow">From the Fawnly journal</span><h2 className="h2">Notes for the<br /><span className="serif">walk ahead.</span></h2></div><a className="btn btn-ghost" href="/updates">See all updates ↗</a></div>
            <div className="blog-grid">{posts.slice(0, 3).map(post => <BlogCard key={post.slug} post={post} />)}</div>
          </div>
        </section>
        <FAQ />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
