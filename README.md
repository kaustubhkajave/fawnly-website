# Fawnly marketing website

The official marketing site for Fawnly, a calm step tracker for iPhone.

## Setup

```bash
npm install
```

Current optimized app assets live in `public/images/`:

- `app-icon.png`
- `screens/latest/home-warm-green.webp`
- `screens/latest/history-month.webp`
- `screens/latest/settings.webp`
- `screens/latest/themes.webp`
- `screens/latest/share-card.webp`
- illustrated Home screens for Fawn Pond, Honeydew Meadow, Sheep Meadow, and Heart Bloom

The screenshots include their iPhone frames. If you replace them, keep the same transparent portrait format and paths or update `app/components/HomeSections.tsx`.

`PhoneMockup` serves resized copies (`-400w`, `-640w`, `-960w`) through `srcset`, and the favicons (`public/favicon.ico`, `public/apple-touch-icon.png`, `images/icon-192.png`, `images/app-icon-128.png`) are generated from `app-icon.png`. After replacing a screenshot or the icon, regenerate them:

```bash
npm run images
```

The default social sharing image is `public/images/og/fawnly-og.png` (1200×630). Pages that set their own `openGraph` metadata should spread `sharedOpenGraph` and include `defaultSocialImage` from `app/content/site.ts`, because Next.js replaces the layout’s `openGraph` object rather than merging it.

## Local development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Build and deployment

```bash
npm run typecheck
npm run build
```

The project uses Next.js static export (`output: "export"`) and can be deployed to any static host. The generated output is in `out/`.

### GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys `out/` whenever changes are pushed to `main`. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions** rather than **Deploy from a branch**.

The root custom domain is preserved by `public/CNAME`, and `public/.nojekyll` prevents GitHub Pages from applying Jekyll processing to the exported Next.js files.

## Adding blog posts

Blog metadata is defined in `app/content/blogPosts.ts` in newest-first order and feeds the homepage preview, blog index, static post routes, metadata, sitemap, and BlogPosting structured data. Add each post there, include its semantic article content under `app/blog/[slug]/page.tsx`, and map its slug to the article in that page’s route switch. Give each post a 1200×630 PNG `socialImage` in `public/images/blog/`, and use trailing slashes in internal links (for example `/blog/`) so they don’t redirect.

## Notes

- Privacy, Support, and Terms reflect the July 22, 2026 source documents. Keep them synchronized with the app and store listing when behavior changes.
- Production URLs, canonical metadata, sitemap entries, and `public/CNAME` use `https://getfawnly.com`.
- The App Store CTA points to the India App Store URL supplied for Fawnly.
