# Fawnly marketing website

The official marketing site for Fawnly, a calm step tracker for iPhone.

## Setup

```bash
npm install
```

Place app assets in `public/images/`. The current site uses the supplied files:

- `app-icon.png`
- `home-green.PNG`, `home-blue.PNG`
- `history-month.PNG`, `themes.PNG`, `share-card.PNG`

If you replace the screenshots, keep the same paths or update `app/components/HomeSections.tsx`.

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

## Adding blog posts

Starter posts are defined in `app/updates/[slug]/page.tsx` and listed in `app/updates/page.tsx` plus the home page preview. Add a new entry to the data object with a slug, title, description, date, tag, and body paragraphs, then add it to the listing arrays and sitemap if needed.

## Notes

- Replace the placeholder privacy policy in `app/privacy/page.tsx` with the final approved policy before launch.
- Update `https://fawnly.app` in metadata and sitemap if the production domain changes.
- The App Store CTA points to the India App Store URL supplied for Fawnly.
