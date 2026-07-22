export type PostDetail = {
  title: string;
  description: string;
  date: string;
  displayDate: string;
  slug: string;
  tags: string[];
  paragraphs: string[];
  image?: string;
};

export const posts: PostDetail[] = [
  {
    title: "Introducing the new Fawnly",
    description: "A calmer walking companion with activity recording, private routes, widgets, richer history, and expressive illustrated themes.",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    slug: "introducing-fawnly",
    tags: ["Fawnly", "Product update"],
    image: "/images/screens/latest/home-fawn-pond.webp",
    paragraphs: [
      "Fawnly has grown from a gentle step tracker into a fuller walking companion. Your Apple Health activity still sits at the heart of the app, now joined by outdoor activity recording, local route history, Home Screen widgets, and Live Activities on supported iPhones.",
      "The new illustrated themes bring a little world of their own to your daily movement. You can keep things quiet with Warm Green or walk through Fawn Pond, Honeydew Meadow, Heart Bloom, and Sheep Meadow.",
      "The principle remains the same: useful detail without pressure. No account, no ads, no cross-app tracking, and no Fawnly cloud sync.",
    ],
  },
  {
    title: "How Fawnly uses Apple Health",
    description: "What Fawnly reads, what it can optionally save, and how your health and activity data stays private.",
    date: "2026-07-22",
    displayDate: "July 22, 2026",
    slug: "how-fawnly-uses-apple-health",
    tags: ["Apple Health", "Privacy"],
    paragraphs: [
      "With your permission, Fawnly reads steps, walking and running distance, active energy, and flights climbed from Apple Health. Those values are processed on your device and used to build Home and History views.",
      "If you turn on Save activities to Apple Health, Fawnly can write a completed walking, hiking, or running workout and its recorded route. It does not write steps, calories, or elevation, and the setting is off by default.",
      "Restore from Apple Health can recover eligible workouts and routes previously created by Fawnly. Restored session steps may be unavailable, and restored recorder values are never added to your Apple Health-backed daily totals.",
    ],
  },
  {
    title: "Choosing a daily step goal that feels realistic",
    description: "A kinder way to set a step goal that supports your routine instead of competing with it.",
    date: "2026-07-20",
    displayDate: "July 20, 2026",
    slug: "choosing-a-daily-step-goal",
    tags: ["Walking", "Habits"],
    paragraphs: [
      "A daily step goal works best when it supports your life instead of competing with it. The right number should feel like a useful invitation, not a daily test.",
      "Start with your normal week. Notice your current rhythm, then choose a goal that asks for a little more—perhaps a short walk after lunch or one extra loop on the way home.",
      "Fawnly lets you turn your daily goal on or off and adjust it whenever your routine changes. Progress does not need to be perfect to be meaningful.",
    ],
  },
];

export const postsBySlug = Object.fromEntries(posts.map(post => [post.slug, post]));
