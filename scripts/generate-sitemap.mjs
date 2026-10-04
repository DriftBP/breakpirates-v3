import { writeFile } from 'node:fs/promises';

const siteUrl = 'https://www.breakpirates.com';
const apiUrl = `${siteUrl}/api`;

async function getCollection(path) {
  const response = await fetch(`${apiUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Could not fetch ${path}: HTTP ${response.status}`);
  }

  const collection = await response.json();
  if (!Array.isArray(collection)) {
    throw new Error(`Expected ${path} to return an array`);
  }

  return collection;
}

function addIdUrls(urls, path, collection) {
  for (const item of collection) {
    const id = Number(item.id);
    if (Number.isInteger(id) && id > 0) {
      urls.add(`${siteUrl}${path}/${id}`);
    }
  }
}

const urls = new Set([
  `${siteUrl}/radio`,
  `${siteUrl}/news`,
  `${siteUrl}/music`,
  `${siteUrl}/schedule`,
  `${siteUrl}/profiles`,
  `${siteUrl}/video`,
  `${siteUrl}/tools`,
  `${siteUrl}/tools/technics-1200-lookup`,
  `${siteUrl}/tools/808`
]);

const [articles, hosts, genres, videos, days] = await Promise.all([
  getCollection('/news'),
  getCollection('/hosts'),
  getCollection('/music'),
  getCollection('/videos'),
  getCollection('/days')
]);

addIdUrls(urls, '/news', articles);
addIdUrls(urls, '/profiles', hosts);
addIdUrls(urls, '/music', genres);
addIdUrls(urls, '/video', videos);

const schedules = await Promise.all(days.map(async day => {
  const id = Number(day.id);
  if (!Number.isInteger(id) || id <= 0) {
    return [];
  }

  urls.add(`${siteUrl}/schedule/${id}`);
  return getCollection(`/schedule/${id}`);
}));

for (const shows of schedules) {
  addIdUrls(urls, '/schedule/shows', shows);
}

const xmlUrls = [...urls]
  .sort()
  .map(url => `  <url><loc>${url}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>\n`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
console.log(`Wrote ${urls.size} URLs to public/sitemap.xml`);
