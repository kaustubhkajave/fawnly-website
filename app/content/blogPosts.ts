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
