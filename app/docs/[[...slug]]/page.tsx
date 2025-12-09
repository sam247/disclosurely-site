import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllDocSlugs, getDocBySlug, getDocsNavigation, DocNavItem } from '@/lib/docs';

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

function NavItem({ item, currentSlug }: { item: DocNavItem; currentSlug: string[] }) {
  const isActive = JSON.stringify(item.slug) === JSON.stringify(currentSlug);
  const href = `/docs${item.slug.length > 0 ? '/' + item.slug.join('/') : ''}`;
  
  return (
    <li>
      <Link
        href={href}
        className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
          isActive 
            ? 'bg-blue-100 text-blue-700 font-medium' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <NavItem key={child.slug.join('/')} item={child} currentSlug={currentSlug} />
          ))}
        </ul>
      )}
    </li>
  );
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
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-8">
              <div className="mb-4">
                <Link href="/docs" className="text-lg font-bold text-gray-900">
                  Documentation
                </Link>
              </div>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <NavItem key={item.slug.join('/') || 'index'} item={item} currentSlug={currentSlug} />
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-blue max-w-none">
              <h1>{doc.title}</h1>
              {doc.description && (
                <p className="lead text-gray-600">{doc.description}</p>
              )}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {doc.content}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
