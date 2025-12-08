import { NextResponse } from 'next/server';
import { createClient, type EntrySkeletonType, type EntryFields } from 'contentful';
import fs from 'fs/promises';
import path from 'path';

type UrlEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: { hreflang: string; href: string }[];
};

interface BlogEntrySkeleton extends EntrySkeletonType {
  contentTypeId: '9oYANGj5uBRT6UHsl5LxO';
  fields: {
    slug: EntryFields.Symbol;
    publishDate?: EntryFields.Date;
    status?: EntryFields.Symbol;
  };
}

const LANGUAGES = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'no', 'pt', 'it', 'nl', 'da', 'el'];
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/features', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/vs-speakup', priority: '0.5', changefreq: 'monthly' },
  { path: '/vs-whistleblower-software', priority: '0.5', changefreq: 'monthly' },
  { path: '/compliance-software', priority: '0.5', changefreq: 'monthly' },
  { path: '/whistleblowing-directive', priority: '0.5', changefreq: 'monthly' },
];

const BASE_URL = 'https://disclosurely.com';
const DOCS_BASE = `${BASE_URL}/docs`;

const contentfulToken = process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const contentfulSpace = process.env.VITE_CONTENTFUL_SPACE_ID || 'rm7hib748uv7';

const client = contentfulToken
  ? createClient({
      space: contentfulSpace,
      accessToken: contentfulToken,
    })
  : null;

function normalizePath(pathname: string) {
  if (pathname === '/' || pathname === '') return '';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function generateStaticEntries(now: string): UrlEntry[] {
  const entries: UrlEntry[] = [];

  STATIC_ROUTES.forEach((route) => {
    const normalizedPath = normalizePath(route.path);
    const basePath = normalizedPath === '' ? '' : normalizedPath;

    entries.push({
      loc: `${BASE_URL}${basePath}`,
      lastmod: now,
      changefreq: route.changefreq,
      priority: route.priority,
      alternates: [
        { hreflang: 'x-default', href: `${BASE_URL}${basePath}` },
        { hreflang: 'en', href: `${BASE_URL}${basePath}` },
        ...LANGUAGES.filter((lang) => lang !== 'en').map((lang) => ({
          hreflang: lang,
          href: `${BASE_URL}/${lang}${basePath}`,
        })),
      ],
    });

    LANGUAGES.filter((lang) => lang !== 'en').forEach((lang) => {
      entries.push({
        loc: `${BASE_URL}/${lang}${basePath}`,
        lastmod: now,
        changefreq: route.changefreq,
        priority: (parseFloat(route.priority) * 0.9).toFixed(1),
        alternates: [
          { hreflang: 'x-default', href: `${BASE_URL}${basePath}` },
          { hreflang: 'en', href: `${BASE_URL}${basePath}` },
          ...LANGUAGES.filter((l) => l !== 'en').map((l) => ({
            hreflang: l,
            href: `${BASE_URL}/${l}${basePath}`,
          })),
        ],
      });
    });
  });

  return entries;
}

async function fetchBlogEntries(now: string): Promise<UrlEntry[]> {
  if (!client) return [];

  try {
    const entries: UrlEntry[] = [];
    const response = await client.getEntries<BlogEntrySkeleton>({
      content_type: '9oYANGj5uBRT6UHsl5LxO',
      limit: 1000,
    });

    response.items.forEach((item) => {
      const slug = item.fields?.slug;
      const publishDate = item.fields?.publishDate
        ? new Date(item.fields.publishDate).toISOString().split('T')[0]
        : now;
      const updatedDate = item.sys?.updatedAt
        ? new Date(item.sys.updatedAt).toISOString().split('T')[0]
        : publishDate;

      if (slug) {
        entries.push({
          loc: `${BASE_URL}/blog/${slug}`,
          lastmod: updatedDate,
          changefreq: 'monthly',
          priority: '0.6',
        });
      }
    });

    return entries;
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

async function generateDocsEntries(now: string): Promise<UrlEntry[]> {
  const entries: UrlEntry[] = [
    {
      loc: DOCS_BASE,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.9',
    },
  ];

  try {
    const hashmapPath = path.join(process.cwd(), 'public', 'docs', 'hashmap.json');
    const raw = await fs.readFile(hashmapPath, 'utf-8');
    const map = JSON.parse(raw) as Record<string, string>;

    Object.keys(map).forEach((key) => {
      const clean = key.replace('.md', '');
      if (clean === 'index') return;
      const parts = clean.split('_');
      const section = parts.shift() || '';
      const slug = parts.join('_');
      const urlPath = slug ? `/${section}/${slug}` : `/${section}`;

      entries.push({
        loc: `${DOCS_BASE}${urlPath}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: '0.7',
      });
    });
  } catch (error) {
    console.error('Error reading docs hashmap for sitemap:', error);
  }

  return entries;
}

function toXml(entries: UrlEntry[]) {
  const urlset = entries
    .map((entry) => {
      const alternates = entry.alternates
        ? entry.alternates
            .map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
            )
            .join('\n')
        : '';

      return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternates ? '\n' + alternates : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlset}
</urlset>`;
}

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const staticEntries = generateStaticEntries(now);
  const blogEntries = await fetchBlogEntries(now);
  const docsEntries = await generateDocsEntries(now);
  const allEntries = [...staticEntries, ...blogEntries, ...docsEntries];

  const sitemap = toXml(allEntries);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

