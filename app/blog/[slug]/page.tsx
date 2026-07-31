import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppStoreButton } from "../../components/AppStoreButton";
import { PhoneMockup } from "../../components/PhoneMockup";
import { blogPosts, blogPostsBySlug } from "../../content/blogPosts";

const SITE_URL = "https://getfawnly.com";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];
  if (!post) return {};

  const canonical = SITE_URL + "/blog/" + post.slug + "/";
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author, url: SITE_URL }],
    keywords: post.tags,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: "Fawnly",
      locale: "en_US",
      publishedTime: post.datePublished + "T00:00:00+05:30",
      modifiedTime: post.dateModified + "T00:00:00+05:30",
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.socialImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.socialImage],
    },
  };
}

function DownloadCallout({ final = false }: { final?: boolean }) {
  return (
    <aside className={"blog-cta" + (final ? " blog-cta-final" : "")} aria-label="Download Fawnly">
      <div>
        <span className="eyebrow">Walk gently. Track beautifully.</span>
        <h2>{final ? "Make your daily steps feel more personal." : "Want a calmer view of your steps?"}</h2>
        <p>{final
          ? "Fawnly turns Apple Health activity into a beautiful daily rhythm with goals, history, widgets, themes, and thoughtful sharing."
          : "Fawnly gives your Apple Health steps a focused home with daily goals, clear progress, and a design made for everyday walking."}</p>
      </div>
      <AppStoreButton />
    </aside>
  );
}

function TrackStepsWithoutWatchArticle() {
  const post = blogPosts[0];
  const canonical = SITE_URL + "/blog/" + post.slug + "/";
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [SITE_URL + post.socialImage, SITE_URL + post.image],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Fawnly",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: SITE_URL + "/images/app-icon.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog/" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><span aria-current="page">iPhone step tracking</span>
          </nav>
          <div className="post-meta">
            <span>By {post.author}</span><span aria-hidden="true">&middot;</span><time dateTime={post.datePublished}>{post.displayDate}</time><span aria-hidden="true">&middot;</span><span>8 min read</span>
          </div>
          <h1 className="display post-title">{post.title}</h1>
          <p className="post-deck">{post.description}</p>

          <div className="quick-answer">
            <span className="eyebrow">The short answer</span>
            <p><strong>Yes. Your iPhone can count your steps without an Apple Watch.</strong> Its built-in motion sensors collect walking data while you carry the phone, and the Health app stores that information for you to review. An Apple Watch can add another data source, but it is not required for basic iPhone step tracking.</p>
          </div>

          <DownloadCallout />

          <div className="post-cover">
            <PhoneMockup priority src={post.image} alt={post.imageAlt} />
          </div>

          <div className="prose blog-prose">
            <p>Step tracking can be surprisingly easy to miss on an iPhone. There is no large step total on the Lock Screen by default, and the information lives inside Apple Health alongside many other measurements. Once you know where to look, though, your phone can give you a useful picture of how much you move each day.</p>

            <h2>How your iPhone counts steps without an Apple Watch</h2>
            <p>Your iPhone includes motion sensors that can recognize movement while the phone is with you. Apple says the Health app automatically counts steps and walking and running distances. The iPhone can also store other walking information captured by its built-in sensors.</p>
            <p>This means you do not need to start a workout, open an app before every walk, or own an Apple Watch just to collect basic daily steps. Put your iPhone in a pocket or carry it with you, and compatible step data can be recorded in the background.</p>
            <p>For Apple's current explanation of how Health gathers and displays this information, see <a href="https://support.apple.com/en-us/104997">Use the Health app on your iPhone or iPad</a>.</p>

            <h2>How to see your steps in Apple Health</h2>
            <p>You can check today's total and make Steps easier to find from the Health app:</p>
            <ol>
              <li><strong>Open the Health app</strong> on your iPhone.</li>
              <li><strong>Choose Summary.</strong> This is the main view for the health categories you use most often.</li>
              <li><strong>Tap Edit next to Pinned.</strong> Your pinned categories appear prominently on the Summary screen.</li>
              <li><strong>Find and pin Steps.</strong> You can then arrange it alongside the other categories that matter to you.</li>
              <li><strong>Tap Done.</strong> Your step total should now be easier to reach whenever you open Health.</li>
              <li><strong>Tap Steps for more detail.</strong> The detail view lets you explore changes over time rather than seeing only today's number.</li>
            </ol>
            <p>If Steps is already pinned, simply open Health, go to Summary, and tap the Steps card. Apple also explains how to pin and arrange categories in its guide to <a href="https://support.apple.com/en-ca/guide/iphone/iphe3d379c32/ios">viewing Health data on iPhone</a>.</p>

            <h2>Why your iPhone step count may look too low</h2>
            <p>A missing or unusually low total does not always mean step counting is broken. Check these common causes first:</p>
            <ul>
              <li><strong>Your iPhone was not with you.</strong> The phone cannot detect steps from a walk when it was left on a desk, in a locker, or at home.</li>
              <li><strong>Fitness Tracking is disabled.</strong> Review Motion &amp; Fitness access in iPhone Settings if Health is not receiving movement data.</li>
              <li><strong>An app does not have Health permission.</strong> In Health, open your profile, choose Apps under Privacy, select the app, and review the categories you have allowed it to read.</li>
              <li><strong>The latest data has not refreshed yet.</strong> Open Health first, then reopen the step-tracking app after the current total appears.</li>
              <li><strong>You use more than one source.</strong> An iPhone, Apple Watch, and compatible apps can all contribute health data. Review the Steps detail screen if you want to understand which sources are present.</li>
            </ul>
            <p>Remember that a phone-based step count is a practical wellness estimate, not a laboratory measurement. How and where you carry your iPhone can affect what its sensors detect.</p>

            <h2>Apple Health or a dedicated step tracker?</h2>
            <p>Apple Health is the underlying home for a wide range of health information. It is useful when you want to inspect categories, sources, trends, and detailed records. A dedicated step tracker can make one small part of that information easier to understand every day.</p>
            <p>The best choice depends on what helps you stay consistent. If you only want to check a number occasionally, the Health app may be enough. If you prefer a focused dashboard, a visible daily goal, faster history, widgets, or a more personal look, a step tracker can create a gentler routine around the same Apple Health data.</p>

            <h2>How Fawnly makes walking progress easier to see</h2>
            <p><a href="/#features">Fawnly</a> is a calm walking and step tracker designed around Apple Health activity. With permission, it reads your steps, walking and running distance, active energy, and flights climbed, then presents them in a quieter view made for everyday walking.</p>
            <p>You can see your daily goal, move through week, month, and year history, keep progress visible with Home Screen widgets, and choose themes that make the app feel like yours. Fawnly can also create polished share cards when you decide a gentle win is worth celebrating.</p>
            <p>Fawnly does not require an account and does not include Fawnly cloud sync. Your activity views, settings, and recorded route history stay local to your device. You can read the details in the <a href="/privacy">Fawnly Privacy Policy</a>.</p>
          </div>

          <DownloadCallout />

          <div className="prose blog-prose">
            <h2>Does step tracking on iPhone need GPS?</h2>
            <p>Basic daily step tracking through Apple Health does not require Fawnly to track your GPS location. Fawnly requests location only when you deliberately start an outdoor activity recording, where location is needed to calculate session distance and pace and draw the route.</p>
            <p>If you never start an outdoor recording, you can still use Fawnly to view supported Apple Health activity. If you do record a walk, the precise route remains local unless you choose to create and share a privacy-conscious route card. Visit <a href="/support">Fawnly Support</a> for current permission and recording details.</p>

            <h2>Choose a step goal that fits your real life</h2>
            <p>A step tracker is most helpful when the goal supports your routine rather than judging it. Start by noticing an ordinary week. Then choose a target that encourages a little more movement without making every low day feel like failure.</p>
            <p>Your goal can change with your schedule, health, weather, travel, or season. A ten-minute walk after lunch may be more useful than chasing an arbitrary number that does not fit your life. Fawnly lets you adjust your daily goal or turn it off whenever you want.</p>

            <h2>Frequently asked questions</h2>
            <h3>Do I need an Apple Watch to count steps on an iPhone?</h3>
            <p>No. Your iPhone can count steps using its own built-in sensors while you carry it. An Apple Watch is another possible source of activity data, not a requirement for basic iPhone step tracking.</p>

            <h3>Will my iPhone count steps if I leave it at home?</h3>
            <p>No. The iPhone must move with you to detect those steps. If you leave it behind, it cannot record that part of your walk. A worn Apple Watch may contribute data separately if you use one.</p>

            <h3>Why does Fawnly need Apple Health permission?</h3>
            <p>Fawnly needs your permission to read the activity categories it displays, including steps, walking and running distance, active energy, and flights climbed. You control those permissions and can change them in the Health app.</p>

            <h3>Does Fawnly change my Apple Health step total?</h3>
            <p>No. Fawnly does not write step samples, calories, or elevation to Apple Health. It reads the supported values you permit and presents them in the app. A completed recorded workout and route can be saved only if you enable that separate option.</p>

            <h3>Is an iPhone step count perfectly accurate?</h3>
            <p>No consumer step counter is perfect. Results can vary with your device, movement, and how you carry the phone. Treat the total as a useful way to notice patterns over time, not as medical or diagnostic information.</p>
          </div>

          <DownloadCallout final />
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!blogPostsBySlug[slug]) notFound();
  return <TrackStepsWithoutWatchArticle />;
}
