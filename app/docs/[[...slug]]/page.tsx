import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllDocSlugs, getDocBySlug, getDocsNavigation, DocNavItem } from '@/lib/docs';
import DocsClient from './DocsClient';

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug || []);
  
  if (!doc) {
    return { title: 'Documentation' };
  }
  
  return {
    title: `${doc.title} | Disclosurely Docs`,
    description: doc.description,
  };
}

// Flatten navigation for pagination
function flattenNav(items: DocNavItem[], result: DocNavItem[] = []): DocNavItem[] {
  for (const item of items) {
    result.push(item);
    if (item.children) {
      flattenNav(item.children, result);
    }
  }
  return result;
}

export default async function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const currentSlug = slug || [];
  
  // If no slug, show index page
  const doc = getDocBySlug(currentSlug.length === 0 ? ['index'] : currentSlug);
  
  if (!doc) {
    notFound();
  }
  
  const navigation = getDocsNavigation();
  const flatNav = flattenNav(navigation);
  
  // Find current page index for pagination
  const currentIndex = flatNav.findIndex(
    item => JSON.stringify(item.slug) === JSON.stringify(currentSlug)
  );
  const prevPage = currentIndex > 0 ? flatNav[currentIndex - 1] : null;
  const nextPage = currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null;
  
  return (
    <DocsClient
      doc={doc}
      navigation={navigation}
      currentSlug={currentSlug}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  );
}
