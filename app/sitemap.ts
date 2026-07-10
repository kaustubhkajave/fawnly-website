import { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','/updates','/support','/privacy','/updates/introducing-fawnly','/updates/how-fawnly-uses-apple-health','/updates/choosing-a-daily-step-goal'].map(path=>({url:`https://fawnly.app${path}`,lastModified:new Date('2026-07-10')}))}
