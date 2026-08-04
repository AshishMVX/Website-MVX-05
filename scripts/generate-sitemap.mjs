/** Regenerates public/sitemap.xml from the routes + content data. Run automatically before every build. */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { caseStudies, posts } from '../src/data/content.js';

const BASE_URL = 'https://mervixtechnology.com';

const staticRoutes = ['/', '/careers', '/case-studies', '/insights', '/terms-and-conditions', '/privacy-policy'];
const dynamicRoutes = [
  ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  ...posts.map((p) => `/insights/${p.slug}`),
];

const urls = [...staticRoutes, ...dynamicRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;

const outPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(outPath, xml);
console.log(`sitemap.xml generated with ${urls.length} URLs`);
