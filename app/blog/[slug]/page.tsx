import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppStoreButton } from "../../components/AppStoreButton";
import { BlogArticleCard } from "../../components/BlogArticleCard";
import { PhoneMockup } from "../../components/PhoneMockup";
import { blogPosts, blogPostsBySlug, type BlogPost } from "../../content/blogPosts";
import { SITE_URL } from "../../content/site";

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

function BlogStructuredData({ post }: { post: BlogPost }) {
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
      "@id": SITE_URL + "/#organization",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  );
}

function RelatedPosts({ slug }: { slug: string }) {
  const related = blogPosts.filter((post) => post.slug !== slug).slice(0, 3);

  return (
    <section className="post blog-post related-posts" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="eyebrow">Keep reading</h2>
      <div className="blog-grid">{related.map((post) => <BlogArticleCard key={post.slug} post={post} />)}</div>
    </section>
  );
}

function TrackStepsWithoutWatchArticle() {
  const post = blogPostsBySlug["how-to-track-steps-on-iphone-without-apple-watch"];

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">iPhone step tracking</span>
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
            <p>Fawnly does not require an account and does not include Fawnly cloud sync. Your activity views, settings, and recorded route history stay local to your device. You can read the details in the <a href="/privacy/">Fawnly Privacy Policy</a>.</p>
          </div>

          <DownloadCallout />

          <div className="prose blog-prose">
            <h2>Does step tracking on iPhone need GPS?</h2>
            <p>Basic daily step tracking through Apple Health does not require Fawnly to track your GPS location. Fawnly requests location only when you deliberately start an outdoor activity recording, where location is needed to calculate session distance and pace and draw the route.</p>
            <p>If you never start an outdoor recording, you can still use Fawnly to view supported Apple Health activity. If you do record a walk, the precise route remains local unless you choose to create and share a privacy-conscious route card. Visit <a href="/support/">Fawnly Support</a> for current permission and recording details.</p>

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
        <RelatedPosts slug={post.slug} />
      </main>
      <BlogStructuredData post={post} />
    </>
  );
}

function WidgetDownloadCallout({ final = false }: { final?: boolean }) {
  return (
    <aside className={"blog-cta" + (final ? " blog-cta-final" : "")} aria-label="Get Fawnly’s free step widget">
      <div>
        <span className="eyebrow">Free Home Screen widget</span>
        <h2>{final ? "Keep your next small win in sight." : "Your daily steps, a glance away."}</h2>
        <p>See today’s steps and goal progress with Fawnly. Download the app, connect Apple Health, and add your widget. No account required; no Plus subscription needed for Home Screen widgets.</p>
      </div>
      <AppStoreButton />
    </aside>
  );
}

function HomeScreenStepsArticle() {
  const post = blogPostsBySlug["how-to-show-step-count-on-iphone-home-screen"];

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Home Screen steps</span>
          </nav>
          <div className="post-meta">
            <span>By {post.author}</span><span aria-hidden="true">&middot;</span><time dateTime={post.datePublished}>{post.displayDate}</time><span aria-hidden="true">&middot;</span><span>5 min read</span>
          </div>
          <h1 className="display post-title">{post.title}</h1>
          <p className="post-deck">See how your day is moving without opening an app every time. Here’s how to put your steps and daily goal progress on your iPhone Home Screen with Fawnly.</p>

          <div className="quick-answer">
            <span className="eyebrow">The short answer</span>
            <p><strong>Use a step-count widget such as Fawnly’s free Today widget.</strong> Install and open Fawnly, allow it to read Steps from Apple Health, then touch and hold an empty part of your Home Screen. Choose Edit → Add Widget, search for Fawnly, and add the Today widget.</p>
          </div>

          <WidgetDownloadCallout />

          <div className="prose blog-prose">
            <p>A step total is easier to notice when it’s beside the apps you already use. You might glance at it before lunch, after a walk, or at the end of the day. It’s a small way to keep your progress visible without making walking another task to manage.</p>
            <p>This guide uses Fawnly’s Home Screen widget. You’ll need your iPhone, Fawnly, and permission to read your Apple Health steps. An Apple Watch isn’t required.</p>

            <h2 id="connect-health">1. Open Fawnly and connect Apple Health</h2>
            <p>Download Fawnly using the App Store button above, then open it and follow the setup prompts. When asked for Health access, allow Fawnly to read <strong>Steps</strong>. You can choose which other activity categories to share.</p>
            <p>If you previously skipped that permission, open <strong>Health → Summary → your profile picture → Apps</strong> under Privacy. Select Fawnly and enable access to Steps. Return to Fawnly and check that your daily summary has data.</p>
            <p>Fawnly displays activity from Apple Health. Apple explains how automatic step counting and app permissions work in its guide to <a href="https://support.apple.com/en-us/104997">using the Health app</a>.</p>

            <h2 id="add-widget">2. Add the step widget to your Home Screen</h2>
            <ol>
              <li><strong>Return to your iPhone Home Screen.</strong> Press and hold a blank space until the icons start moving.</li>
              <li><strong>Open the widget gallery.</strong> Tap Edit, then Add Widget. On older iOS versions, use the + button instead.</li>
              <li><strong>Search for Fawnly.</strong> Select it to see its available widgets.</li>
              <li><strong>Choose the Today widget.</strong> Browse the available layouts, then tap Add Widget.</li>
              <li><strong>Place it where you’ll notice it.</strong> Drag it into position and tap Done.</li>
            </ol>
            <p>You should now have a view of today’s steps and goal progress on your Home Screen. Apple’s <a href="https://support.apple.com/en-us/118610">widget setup guide</a> also covers adding and rearranging widgets.</p>
          </div>

          <figure className="blog-app-figure">
            <img className="blog-widget" src="/images/widgets/sheep-meadow-520w.webp" srcSet="/images/widgets/sheep-meadow-520w.webp 520w, /images/widgets/sheep-meadow.webp 1030w" sizes="(max-width: 850px) 90vw, 420px" width={1030} height={484} loading="lazy" decoding="async" alt="Fawnly medium Home Screen widget in the Sheep Meadow theme showing today’s steps, goal progress, distance, calories, and floors" />
            <figcaption>The medium Fawnly widget shows today’s steps, goal progress, distance, calories, and floors. With Fawnly Plus, it can match your illustrated theme.</figcaption>
          </figure>

          <div className="prose blog-prose">

            <h2 id="make-it-useful">3. Make it useful for your day</h2>
            <p>Try keeping the widget on your first Home Screen, near something you open often. If you tuck it inside a rotating widget stack, your steps may not always be the item you see.</p>
            <p>In Fawnly, choose a daily goal that fits your routine. The widget gives you a quick check-in; open the app when you want your activity summary and recent progress. Home Screen widgets are free, while Fawnly Plus is optional for additional features.</p>
          </div>

          <figure className="blog-app-figure">
            <div className="post-cover">
              <PhoneMockup src={post.image} alt={post.imageAlt} />
            </div>
            <figcaption>Inside Fawnly: your daily activity summary. The Home Screen widget gives you a separate, smaller view of today’s steps and goal progress.</figcaption>
          </figure>

          <div className="prose blog-prose">
            <h2 id="troubleshooting">If your step widget is missing or not updating</h2>
            <h3>Fawnly doesn’t appear in the widget gallery</h3>
            <p>Make sure Fawnly has finished installing, then open it and complete setup before checking the gallery again. If it still doesn’t appear, check the App Store for an update and try restarting your iPhone.</p>

            <h3>The widget is blank or shows no steps</h3>
            <p>First check whether Apple Health has steps for today. If it does, review Fawnly’s Steps permission using the path above, then reopen Fawnly. If Health itself has no steps, check Fitness Tracking under <strong>Settings → Privacy &amp; Security → Motion &amp; Fitness</strong>, and remember to carry your phone while walking.</p>

            <h3>The widget shows an older total than the app</h3>
            <p>A Home Screen widget is a periodic snapshot, so it may lag behind your latest activity. iOS controls widget refreshes; it won’t necessarily update with every step. Open Fawnly to check the latest available data and give the widget time to refresh. If it stays stuck, try removing and adding the widget again, or visit <a href="/support/">Fawnly Support</a>.</p>

            <h2>Frequently asked questions</h2>
            <h3>Do I need an Apple Watch?</h3>
            <p>No. Your iPhone can supply step data while you carry it. Our guide to <a href="/blog/how-to-track-steps-on-iphone-without-apple-watch/">tracking steps without an Apple Watch</a> explains how that works and what to check when steps are missing.</p>

            <h3>Do I need Fawnly Plus for the widget?</h3>
            <p>No. Fawnly’s Home Screen widgets are free. You can try the step widget without subscribing or creating an account.</p>

            <h3>Does the step widget need my location?</h3>
            <p>No. Viewing Apple Health steps doesn’t require Fawnly to use GPS. Location is requested separately when you choose to record an outdoor activity. See our <a href="/privacy/">Privacy Policy</a> for details.</p>

            <h3>Is this the same as a Lock Screen widget?</h3>
            <p>No. These instructions add a widget beside your app icons on the Home Screen. Fawnly’s Live Activity during an outdoor recording is a separate feature; it isn’t an always-visible daily step widget on the Lock Screen.</p>
          </div>

          <WidgetDownloadCallout final />
        </article>
        <RelatedPosts slug={post.slug} />
      </main>
      <BlogStructuredData post={post} />
    </>
  );
}

function NotCountingStepsArticle() {
  const post = blogPostsBySlug["iphone-not-counting-steps"];

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Step count fixes</span>
          </nav>
          <div className="post-meta">
            <span>By {post.author}</span><span aria-hidden="true">&middot;</span><time dateTime={post.datePublished}>{post.displayDate}</time><span aria-hidden="true">&middot;</span><span>6 min read</span>
          </div>
          <h1 className="display post-title">{post.title}</h1>
          <p className="post-deck">If your step count is stuck, missing, or lower than you expected, the cause is usually a setting, a permission, or where your phone was during the day. Work through these checks in order.</p>

          <div className="quick-answer">
            <span className="eyebrow">The short answer</span>
            <p><strong>Start with Settings → Privacy &amp; Security → Motion &amp; Fitness and make sure Fitness Tracking is on.</strong> Then open the Health app, go to Steps, and check Data Sources &amp; Access to confirm your iPhone is recording. If Health shows your steps but another app doesn’t, that app needs permission to read Steps.</p>
          </div>

          <div className="prose blog-prose">
            <h2 id="where-steps-are-missing">First, find out where the steps are missing</h2>
            <p>Two different problems can look the same. Either your iPhone isn’t recording steps at all, or it is recording them and an app or widget isn’t showing them yet. Checking Apple Health first tells you which one you have.</p>
            <p>Open the Health app, tap Browse (or search for “Steps”), then choose <strong>Activity → Steps</strong>.</p>
            <ul>
              <li><strong>Health is missing steps too:</strong> start with fixes 1 to 5 below.</li>
              <li><strong>Health has steps, but another app or widget doesn’t:</strong> skip to fixes 6 to 9.</li>
            </ul>

            <h2 id="health-missing-steps">If Apple Health is missing steps</h2>
            <h3>1. Turn on Fitness Tracking</h3>
            <p>Your iPhone records steps only when Fitness Tracking is on. Open <strong>Settings → Privacy &amp; Security → Motion &amp; Fitness</strong> and turn on Fitness Tracking. On the same screen, make sure Health is allowed to use motion data.</p>

            <h3>2. Carry your iPhone with you</h3>
            <p>Your iPhone counts steps with its built-in motion sensors, so it only counts the steps it travels with. A pocket, hand, or bag works. A phone on a desk, on a charger, or in a shopping cart won’t see your walk.</p>

            <h3>3. Check Data Sources &amp; Access</h3>
            <p>In Health, open Steps, scroll down, and tap <strong>Data Sources &amp; Access</strong>. Your iPhone should be listed under Data Sources. If an Apple Watch or another app also records steps, Health uses the source at the top of the list when they overlap, so the same steps aren’t counted twice. Tap Edit to reorder sources or turn one off.</p>
            <p>Tap <strong>Show All Data</strong> on the Steps screen to see individual records and where each one came from. Apple explains source priority in its guide to <a href="https://support.apple.com/en-us/108779">managing Health data</a>.</p>

            <h3>4. Restart and update your iPhone</h3>
            <p>A restart clears many temporary glitches. If steps still don’t appear afterward, install the latest version of iOS from <strong>Settings → General → Software Update</strong>.</p>

            <h3>5. Check your Apple Watch connection, if you use one</h3>
            <p>Steps from an Apple Watch sync to Health on your iPhone. If watch steps are missing, make sure Bluetooth is on and the watch is paired and nearby, then give it a few minutes to sync. You don’t need a watch for step counting at all; our guide to <a href="/blog/how-to-track-steps-on-iphone-without-apple-watch/">tracking steps without an Apple Watch</a> explains how the iPhone does it alone.</p>
          </div>

          <DownloadCallout />

          <div className="prose blog-prose">
            <h2 id="app-missing-steps">If Health has steps but your app or widget doesn’t</h2>
            <h3>6. Give the app permission to read Steps</h3>
            <p>Apps can only read the Health categories you allow. In the Health app, tap your profile picture, then tap <strong>Apps</strong> under Privacy. Choose the app and turn on Steps, along with any other categories it uses. For Fawnly, allow Steps, Walking + Running Distance, Active Energy, and Flights Climbed.</p>

            <h3>7. Unlock your iPhone and open the app</h3>
            <p>To protect your privacy, iOS keeps Health data encrypted while your iPhone is locked, so apps may not be able to read your newest steps until you unlock it. Unlock your phone, open the app, and give it a moment to refresh.</p>

            <h3>8. Turn off Low Power Mode</h3>
            <p>Low Power Mode reduces background activity, including Background App Refresh, so apps and widgets may update less often while it’s on. If you rely on an app updating in the background, also check <strong>Settings → General → Background App Refresh</strong>.</p>

            <h3>9. Give widgets time to refresh</h3>
            <p>Home Screen widgets show snapshots that iOS refreshes on its own schedule, so a widget can trail the app by a while. Open the app to see the latest total. Our guide to <a href="/blog/how-to-show-step-count-on-iphone-home-screen/">showing your step count on the Home Screen</a> has more widget troubleshooting.</p>

            <h2 id="still-low">Why your step count may still look low</h2>
            <p>A phone-based step count is an estimate, and some everyday situations produce fewer counted steps than you might expect:</p>
            <ul>
              <li>Your phone rode in a stroller, cart, or bike basket instead of on you.</li>
              <li>You walked on a treadmill with the phone resting on the console.</li>
              <li>You took short, shuffling steps around the house or office.</li>
              <li>You cycled, swam, or did other exercise that doesn’t involve steps.</li>
            </ul>
            <p>Small differences between devices and apps are normal. Look for patterns over days and weeks rather than worrying about a single total.</p>
          </div>

          <figure className="blog-app-figure">
            <div className="post-cover">
              <PhoneMockup src={post.image} alt={post.imageAlt} />
            </div>
            <figcaption>Fawnly’s Month history. A day that’s far below your usual average is often the first sign that a setting or permission has changed.</figcaption>
          </figure>

          <div className="prose blog-prose">
            <h2 id="fawnly">Spot missing days sooner with Fawnly</h2>
            <p><a href="/#features">Fawnly</a> reads your step totals from Apple Health, using the same source priority as the Health app, and shows them alongside your daily goal and recent history. If Fawnly can’t confirm it has readable Health data, it shows a calm <strong>Needs attention</strong> status rather than a misleading zero.</p>
            <p>Fawnly doesn’t need an account, and your activity history stays on your iPhone. See <a href="/support/">Fawnly Support</a> for permission details.</p>

            <h2>Frequently asked questions</h2>
            <h3>Why did my iPhone suddenly stop counting steps?</h3>
            <p>Most often, Fitness Tracking was turned off, the phone wasn’t carried, or Health needed a restart after an update. Work through fixes 1 to 4 first.</p>

            <h3>Why does another app show a different step count than Health?</h3>
            <p>Apps can combine sources differently or update at different times. Apple Health uses your source priority to avoid counting the same steps twice. Apps that read Health’s combined total, like Fawnly, should match it once they refresh.</p>

            <h3>Can I add missing steps manually?</h3>
            <p>Yes. In Health, open Steps and tap <strong>Add Data</strong>. Health labels manually entered data, and by default it takes priority over data recorded by your devices.</p>

            <h3>Do I need an Apple Watch to count steps?</h3>
            <p>No. Your iPhone counts steps on its own while you carry it. An Apple Watch is an extra source, not a requirement.</p>
          </div>

          <DownloadCallout final />
        </article>
        <RelatedPosts slug={post.slug} />
      </main>
      <BlogStructuredData post={post} />
    </>
  );
}

function StepsADayArticle() {
  const post = blogPostsBySlug["how-many-steps-a-day"];

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Daily step goals</span>
          </nav>
          <div className="post-meta">
            <span>By {post.author}</span><span aria-hidden="true">&middot;</span><time dateTime={post.datePublished}>{post.displayDate}</time><span aria-hidden="true">&middot;</span><span>6 min read</span>
          </div>
          <h1 className="display post-title">{post.title}</h1>
          <p className="post-deck">Ten thousand steps is the number everyone knows, but it didn’t come from a study. Here’s what larger research now suggests, and how to turn it into a goal that fits your week.</p>

          <div className="quick-answer">
            <span className="eyebrow">The short answer</span>
            <p><strong>For many adults, research links roughly 7,000 to 8,000 steps a day with most of the measured benefits.</strong> More steps may still help, but the gains get smaller. If you walk much less than that today, any steady increase is a good place to start. Ten thousand is a fine goal, not a magic threshold.</p>
          </div>

          <div className="prose blog-prose">
            <h2 id="ten-thousand">Where 10,000 steps came from</h2>
            <p>The number goes back to a pedometer sold in Japan in 1965 called the <em>manpo-kei</em>, which translates to “10,000-step meter.” It was a memorable round number for a new product, not a target taken from health research. It stuck because it’s easy to remember.</p>

            <h2 id="research">What the research says</h2>
            <h3>Benefits rise quickly, then level off</h3>
            <p>In 2022, researchers pooled data from 15 studies covering about 47,000 adults. People who took more steps each day had a lower risk of death during follow-up, up to a point. The benefit leveled off at roughly <strong>6,000 to 8,000 steps a day for adults 60 and older</strong>, and <strong>8,000 to 10,000 for younger adults</strong>.</p>

            <h3>About 7,000 steps is linked with large benefits</h3>
            <p>A 2025 review of 57 studies compared people taking about 7,000 steps a day with people taking about 2,000. The 7,000-step group had a <strong>47% lower risk of death from any cause</strong>, along with lower rates of heart disease, dementia, depressive symptoms, and falls. For several outcomes, the benefit curve began to flatten somewhere between 5,000 and 7,000 steps.</p>

            <h3>How many steps mattered more than how fast</h3>
            <p>A 2020 study followed about 4,800 US adults aged 40 and older. Compared with 4,000 steps a day, taking 8,000 steps was associated with a <strong>51% lower risk of death</strong> from any cause. After accounting for total steps, the researchers saw no link between walking intensity and risk.</p>

            <p>These are observational studies. They show that people who walk more tend to have better health outcomes, not proof that steps alone cause the difference. Still, the same pattern shows up across many groups of people, and it points the same way: more movement helps, and you don’t need an extreme number to benefit.</p>
          </div>

          <DownloadCallout />

          <div className="prose blog-prose">
            <h2 id="how-many">So how many steps should you aim for?</h2>
            <ul>
              <li><strong>Under about 5,000 a day:</strong> build up gradually. Even 1,000 extra steps a day is a meaningful change.</li>
              <li><strong>Around 7,000 to 8,000:</strong> research suggests many of the benefits are within reach here.</li>
              <li><strong>10,000 or more:</strong> great if you enjoy it. Additional steps may still help, with smaller gains.</li>
            </ul>
            <p>Steps aren’t the only measure. The CDC recommends that adults get at least 150 minutes of moderate-intensity activity, such as brisk walking, each week. A daily step goal is one simple way to work toward that.</p>
            <p>If you have a health condition, are pregnant, or are recovering from an injury, ask your doctor what level of activity is right for you.</p>

            <h2 id="set-a-goal">How to set a step goal you’ll actually keep</h2>
            <ol>
              <li><strong>Find your baseline.</strong> Look at your daily average over the last two to four weeks rather than a single day. In Apple Health, open Steps and switch to the week or month view to see it.</li>
              <li><strong>Add a little.</strong> Set your goal 500 to 1,000 steps above your current average.</li>
              <li><strong>Give it two weeks.</strong> If you reach it most days, raise it. If it feels like a chore, lower it.</li>
              <li><strong>Plan for low days.</strong> Travel, weather, and busy weeks happen. Your weekly pattern matters more than any one day.</li>
              <li><strong>Make steps easy to add.</strong> A brisk 10-minute walk is often around 1,000 steps. A walk after lunch or a phone call on foot adds up.</li>
            </ol>
          </div>

          <figure className="blog-app-figure">
            <div className="post-cover">
              <PhoneMockup src={post.image} alt={post.imageAlt} />
            </div>
            <figcaption>Fawnly’s Home screen with a 10,000-step goal. You can change the goal at any time, or turn it off.</figcaption>
          </figure>

          <div className="prose blog-prose">
            <h2 id="fawnly">Set and adjust your goal in Fawnly</h2>
            <p><a href="/#features">Fawnly</a> shows your Apple Health steps next to a daily goal you choose. Set the number in Settings and change it whenever your routine changes, or turn the goal off if you’d rather just watch your progress. History shows your daily averages, best days, and goal streaks, and the free Home Screen widget keeps today’s progress in view.</p>

            <h2>Frequently asked questions</h2>
            <h3>Is 10,000 steps a day too many?</h3>
            <p>Not for most healthy adults. It’s a perfectly good goal. It just isn’t required to see meaningful benefits.</p>

            <h3>Do steps from chores and errands count?</h3>
            <p>Yes. Steps count wherever you take them, as long as your iPhone or watch is with you to record them.</p>

            <h3>How many steps are in a mile?</h3>
            <p>Roughly 2,000 to 2,500 steps per mile, or about 1,300 to 1,500 per kilometre, depending on your height and stride.</p>

            <h3>Should older adults aim for fewer steps?</h3>
            <p>Research suggests the benefit levels off sooner for adults 60 and older, at about 6,000 to 8,000 steps a day. Choose a goal that’s comfortable and safe for you.</p>

            <h2 id="sources">Sources</h2>
            <ul>
              <li>Paluch AE, et al. <a href="https://doi.org/10.1016/S2468-2667(21)00302-9">Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts</a>. <em>The Lancet Public Health</em>, 2022.</li>
              <li>Ding D, et al. <a href="https://doi.org/10.1016/S2468-2667(25)00164-1">Daily steps and health outcomes in adults: a systematic review and dose-response meta-analysis</a>. <em>The Lancet Public Health</em>, 2025.</li>
              <li>National Cancer Institute. <a href="https://www.cancer.gov/news-events/press-releases/2020/daily-step-count-mortality">Higher daily step count linked with lower mortality</a>, on Saint-Maurice PF, et al., <em>JAMA</em>, 2020.</li>
              <li>Centers for Disease Control and Prevention. <a href="https://www.cdc.gov/physical-activity-basics/guidelines/adults.html">Adult Activity: An Overview</a>.</li>
            </ul>
            <p>This article is general information, not medical advice.</p>
          </div>

          <DownloadCallout final />
        </article>
        <RelatedPosts slug={post.slug} />
      </main>
      <BlogStructuredData post={post} />
    </>
  );
}

function RecordWalkArticle() {
  const post = blogPostsBySlug["how-to-record-a-walk-on-iphone"];

  return (
    <>
      <main className="page">
        <article className="post blog-post">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Walk recording</span>
          </nav>
          <div className="post-meta">
            <span>By {post.author}</span><span aria-hidden="true">&middot;</span><time dateTime={post.datePublished}>{post.displayDate}</time><span aria-hidden="true">&middot;</span><span>5 min read</span>
          </div>
          <h1 className="display post-title">{post.title}</h1>
          <p className="post-deck">Daily steps tell you how much you moved. Recording a walk shows the rest: distance, pace, time, and the route you took. Here’s how to record one on iPhone with Fawnly and keep the route to yourself.</p>

          <div className="quick-answer">
            <span className="eyebrow">The short answer</span>
            <p><strong>Open Fawnly, go to Activities, and choose Walk.</strong> Allow location access when asked, then tap Start activity. Fawnly shows time, GPS distance, pace, and your route on a map, with Pause, Resume, and Finish controls. Walk recording is free and doesn’t need an Apple Watch.</p>
          </div>

          <DownloadCallout />

          <div className="post-cover">
            <PhoneMockup priority width={1310} height={2710} src={post.image} alt={post.imageAlt} />
          </div>

          <div className="prose blog-prose">
            <h2 id="record">How to record a walk</h2>
            <ol>
              <li><strong>Open the Activities tab</strong> in Fawnly.</li>
              <li><strong>Choose Walk.</strong> It’s the free, everyday option for an outdoor walk.</li>
              <li><strong>Allow location access.</strong> Fawnly asks only when you start your first activity. It uses GPS to measure distance and pace and to draw your route.</li>
              <li><strong>Tap Start activity.</strong> Starting outdoors, away from tall buildings, helps Fawnly find a GPS signal quickly.</li>
              <li><strong>Walk.</strong> The recorder shows active time, distance, current pace, and your route on an Apple Maps view. If you allow Motion &amp; Fitness access, it can also show steps for the session.</li>
              <li><strong>Pause or resume as needed.</strong> Paused time isn’t counted as active time.</li>
              <li><strong>Tap Finish.</strong> Your walk appears under Recent, where you can review the route, average pace, and splits.</li>
            </ol>
            <p>If you go back while recording, the walk keeps going and an <strong>Activity in progress</strong> card takes you back to the recorder.</p>

            <h2 id="lock-screen">Keep recording with your phone locked</h2>
            <p>To keep recording while your phone is in your pocket or you’re using another app, Fawnly needs background location access. When iOS asks, allow Fawnly to use your location even when you’re not using the app. You can change this later in <strong>Settings → Privacy &amp; Security → Location Services → Fawnly</strong>.</p>
            <p>On supported iPhones, an active walk also appears as a Live Activity on the Lock Screen and in the Dynamic Island, with elapsed time, distance, and pace. Tap it to jump back to the recorder.</p>
            <p>If you’d rather not allow background location, you can still record. Fawnly will remind you to keep the app open while you walk.</p>

            <h2 id="accuracy">Tips for a more accurate route</h2>
            <ul>
              <li><strong>Keep Precise Location on</strong> for Fawnly in Location Services. Without it, distance and the route can be rough.</li>
              <li><strong>Start in the open</strong> and give GPS a moment before you set off.</li>
              <li><strong>Expect some drift</strong> in dense cities, under heavy tree cover, or in tunnels. GPS accuracy varies with signal and surroundings.</li>
              <li><strong>Pause during long stops</strong> so your average pace reflects your walking.</li>
            </ul>

            <h2 id="daily-steps">Recording doesn’t change your daily steps</h2>
            <p>Your daily totals on Fawnly’s Home and History screens come from Apple Health, which already counts the steps from your walk. A recorded walk is kept separately, so those steps aren’t counted twice.</p>

            <h2 id="privacy">Keep your routes private</h2>
            <p>Recorded walks and precise routes stay on your iPhone. Fawnly has no account and no Fawnly cloud sync, and location is used only while you’re recording.</p>
            <p>If you want your walks in Apple Health too, turn on <strong>Save activities to Apple Health</strong> in Fawnly’s Settings. It’s off by default, and it saves the finished workout and route, not steps or calories.</p>
            <p>With Fawnly Plus, you can share a walk as a card that’s generated on your iPhone. Review the preview before you share: a familiar route shape can reveal where you walk. Read the <a href="/privacy/">Privacy Policy</a> for details.</p>

            <h2 id="more-activities">Paced Walk, Hike, and Run</h2>
            <p>Fawnly Plus adds more ways to record. <strong>Paced Walk</strong> plays a gentle cadence beat at an Easy, Steady, Brisk, or custom steps-per-minute target. <strong>Hike</strong> is made for longer trails and shows an elevation profile. <strong>Run</strong> records faster outings. Walk recording stays free.</p>

            <h2>Frequently asked questions</h2>
            <h3>Is recording a walk free?</h3>
            <p>Yes. Walk recording is free. Paced Walk, Hike, and Run are part of Fawnly Plus.</p>

            <h3>Does Fawnly track my location all the time?</h3>
            <p>No. Fawnly uses location only while you’re recording an activity. Viewing your daily steps doesn’t use GPS.</p>

            <h3>Do I need an Apple Watch?</h3>
            <p>No. Fawnly records walks with your iPhone’s GPS. See our guide to <a href="/blog/how-to-track-steps-on-iphone-without-apple-watch/">tracking steps without an Apple Watch</a>.</p>

            <h3>Will my walk show up in Apple Health?</h3>
            <p>Only if you turn on Save activities to Apple Health. Fawnly then saves the completed workout and its route. Your daily steps in Health are recorded by your iPhone either way.</p>
          </div>

          <DownloadCallout final />
        </article>
        <RelatedPosts slug={post.slug} />
      </main>
      <BlogStructuredData post={post} />
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  switch (slug) {
    case "iphone-not-counting-steps":
      return <NotCountingStepsArticle />;
    case "how-many-steps-a-day":
      return <StepsADayArticle />;
    case "how-to-record-a-walk-on-iphone":
      return <RecordWalkArticle />;
    case "how-to-show-step-count-on-iphone-home-screen":
      return <HomeScreenStepsArticle />;
    case "how-to-track-steps-on-iphone-without-apple-watch":
      return <TrackStepsWithoutWatchArticle />;
    default:
      notFound();
  }
}
