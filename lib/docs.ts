import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface DocPage {
  slug: string[];
  title: string;
  description?: string;
  content: string;
}

export interface DocNavItem {
  title: string;
  slug: string[];
  children?: DocNavItem[];
}

// Prefix internal links in markdown to include /docs when missing
function normalizeDocLinks(markdown: string): string {
  let output = markdown;
  // Markdown links: [text](/path) -> [text](/docs/path) when not already /docs/
  output = output.replace(/\]\(\/(?!docs\/|#|\))/g, '](\/docs/');
  // HTML anchors: href="/path" -> href="/docs/path" when not already /docs/
  output = output.replace(/href="\/(?!docs\/)/g, 'href="/docs/');
  return output;
}

// Get all markdown files recursively
function getMarkdownFiles(dir: string, basePath: string[] = []): string[][] {
  const files: string[][] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(path.join(dir, entry.name), [...basePath, entry.name]));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      const slug = entry.name === 'index.md' 
        ? basePath 
        : [...basePath, entry.name.replace('.md', '')];
      files.push(slug);
    }
  }
  
  return files;
}

export function getAllDocSlugs(): string[][] {
  return getMarkdownFiles(contentDirectory);
}

export function getDocBySlug(slug: string[]): DocPage | null {
  // Try exact path first
  let filePath = path.join(contentDirectory, ...slug) + '.md';
  
  // If not found, try index.md in directory
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDirectory, ...slug, 'index.md');
  }
  
  // If still not found, return null
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const normalizedContent = normalizeDocLinks(content);
  
  return {
    slug,
    title: data.title || slug[slug.length - 1] || 'Documentation',
    description: data.description,
    content: normalizedContent,
  };
}

// Build navigation structure from _meta.json files and directory structure
export function getDocsNavigation(): DocNavItem[] {
  const nav: DocNavItem[] = [];
  
  if (!fs.existsSync(contentDirectory)) {
    return nav;
  }
  
  // Check for root _meta.json
  const metaPath = path.join(contentDirectory, '_meta.json');
  let metaOrder: Record<string, string> = {};
  
  if (fs.existsSync(metaPath)) {
    try {
      metaOrder = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch {
      // Ignore parse errors
    }
  }
  
  const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });
  
  // Process based on meta order if available
  const orderedKeys = Object.keys(metaOrder);
  const processedEntries = orderedKeys.length > 0 
    ? orderedKeys.map(key => entries.find(e => e.name === key || e.name === key + '.md')).filter(Boolean)
    : entries;
  
  for (const entry of processedEntries) {
    if (!entry) continue;
    
    if (entry.isDirectory()) {
      const children = getDirectoryNav(path.join(contentDirectory, entry.name), [entry.name]);
      nav.push({
        title: metaOrder[entry.name] || formatTitle(entry.name),
        slug: [entry.name],
        children,
      });
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      const baseName = entry.name.replace('.md', '');
      nav.push({
        title: metaOrder[baseName] || formatTitle(baseName),
        slug: baseName === 'index' ? [] : [baseName],
      });
    }
  }
  
  return nav;
}

function getDirectoryNav(dir: string, basePath: string[]): DocNavItem[] {
  const nav: DocNavItem[] = [];
  
  if (!fs.existsSync(dir)) {
    return nav;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const children = getDirectoryNav(path.join(dir, entry.name), [...basePath, entry.name]);
      nav.push({
        title: formatTitle(entry.name),
        slug: [...basePath, entry.name],
        children,
      });
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      const baseName = entry.name.replace('.md', '');
      nav.push({
        title: formatTitle(baseName),
        slug: baseName === 'index' ? basePath : [...basePath, baseName],
      });
    }
  }
  
  return nav;
}

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

