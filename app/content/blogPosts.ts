export type BlogPost = {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  displayDate: string;
  slug: string;
  tags: string[];
  author: string;
  image: string;
  imageAlt: string;
  socialImage: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "iPhone Not Counting Steps? 9 Fixes for Apple Health",
    description: "iPhone not counting steps, or Apple Health stuck on an old total? Check Fitness Tracking, data sources, and app permissions with this step-by-step fix list.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    displayDate: "October 5, 2026",
    slug: "iphone-not-counting-steps",
    tags: ["Apple Health", "Troubleshooting", "Step count"],
    author: "Fawnly Team",
    image: "/images/screens/latest/history-month.webp",
    imageAlt: "Fawnly Month history showing total steps, daily average, best day, goal streak, and distance",
    socialImage: "/images/blog/iphone-not-counting-steps-og.png",
  },
  {
    title: "How Many Steps a Day Do You Really Need?",
    description: "Is 10,000 steps a day necessary? Large studies link about 7,000 to 8,000 steps with major benefits. See what the research says and how to set a realistic goal.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    displayDate: "October 5, 2026",
    slug: "how-many-steps-a-day",
    tags: ["Step goals", "Walking", "Health research"],
    author: "Fawnly Team",
    image: "/images/screens/latest/home-honeydew-meadow.webp",
    imageAlt: "Fawnly Honeydew Meadow theme showing 9,280 steps, 116% of an 8,000-step daily goal, and a weekly chart",
    socialImage: "/images/blog/how-many-steps-a-day-og.png",
  },
  {
    title: "How to Record a Walk on iPhone and See Your Route",
    description: "Record an outdoor walk on iPhone with GPS distance, pace, and a route map. Set up location access, keep recording from the Lock Screen, and keep routes private.",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
    displayDate: "October 5, 2026",
    slug: "how-to-record-a-walk-on-iphone",
    tags: ["Walk recording", "GPS", "Privacy"],
    author: "Fawnly Team",
    image: "/images/screens/latest/activity-recording.webp",
    imageAlt: "Fawnly recording an outdoor walk with an Apple Maps route, time, distance, pace, and Pause and Finish buttons",
    socialImage: "/images/blog/record-a-walk-on-iphone-og.png",
  },
  {
    title: "How to Show Your Step Count on Your iPhone Home Screen",
    description: "Put your daily steps on your iPhone Home Screen with Fawnly’s free widget. Follow the setup guide, connect Apple Health, and fix missing or delayed counts.",
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
    displayDate: "September 20, 2026",
    slug: "how-to-show-step-count-on-iphone-home-screen",
    tags: ["iPhone widgets", "Step count", "Apple Health"],
    author: "Fawnly Team",
    image: "/images/screens/latest/home-warm-green.webp",
    imageAlt: "Fawnly’s in-app daily summary showing steps, a daily goal, and weekly progress",
    socialImage: "/images/blog/iphone-home-screen-steps-og.png",
  },
  {
    title: "How to Track Steps on iPhone Without an Apple Watch",
    description: "Your iPhone can count steps without an Apple Watch. Learn how to view steps in Apple Health, fix missing data, and track progress with Fawnly.",
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    displayDate: "July 31, 2026",
    slug: "how-to-track-steps-on-iphone-without-apple-watch",
    tags: ["iPhone step tracking", "Apple Health", "Walking"],
    author: "Fawnly Team",
    image: "/images/screens/latest/home-warm-green.webp",
    imageAlt: "Fawnly on iPhone showing 9,280 steps, distance, active calories, floors, a daily goal, and a weekly chart",
    socialImage: "/images/blog/how-to-track-steps-iphone-og.png",
  },
];

export const blogPostsBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
