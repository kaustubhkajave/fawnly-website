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

Posts are defined once in `app/content/posts.ts` and feed the home preview, updates index, static post routes, metadata, and Article structured data. Add a post object there, ensure the slug is included by `generateStaticParams`, and add its route to the sitemap.

## Notes

- Privacy, Support, and Terms reflect the July 22, 2026 source documents. Keep them synchronized with the app and store listing when behavior changes.
- Production URLs, canonical metadata, sitemap entries, and `public/CNAME` use `https://getfawnly.com`.
- The App Store CTA points to the India App Store URL supplied for Fawnly.
