import fs from 'node:fs';
// Derive static crawler files from the existing production config and course slugs.
const config = fs.readFileSync('src/config/site.ts', 'utf8');
const origin = config.match(/export const SITE_URL = "([^"]+)"/)[1];
const data = fs.readFileSync('src/data/mockData.ts', 'utf8');
const languageData = data.split('export const LANGUAGE_COURSES')[1].split('export const SMM_COURSES')[0];
const smmData = data.split('export const SMM_COURSES')[1].split('export const TESTIMONIALS')[0];
const slugs = text => [...text.matchAll(/slug: '([^']+)'/g)].map(match => match[1]);
const paths = ['/', '/about', '/services', '/contact', '/privacy', '/terms', '/register', '/nice-exchange', ...slugs(languageData).map(slug => '/courses/' + slug), ...slugs(smmData).map(slug => '/courses/smm/' + slug)];
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('public/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + paths.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log(`Generated robots.txt and sitemap.xml for ${paths.length} public routes.`);
