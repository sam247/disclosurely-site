'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Moon, Sun, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { DocNavItem, DocPage } from '@/lib/docs';

interface DocsClientProps {
  doc: DocPage;
  navigation: DocNavItem[];
  currentSlug: string[];
  prevPage: DocNavItem | null;
  nextPage: DocNavItem | null;
  flatNav: DocNavItem[];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-');
}

function NavItem({ item, currentSlug, darkMode }: { item: DocNavItem; currentSlug: string[]; darkMode: boolean }) {
  const isActive = JSON.stringify(item.slug) === JSON.stringify(currentSlug);
  const href = `/docs${item.slug.length > 0 ? '/' + item.slug.join('/') : ''}`;
  
  return (
    <li>
      <Link
        href={href}
        className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
          isActive 
            ? darkMode 
              ? 'bg-blue-900/50 text-blue-400 font-medium' 
              : 'bg-blue-50 text-blue-600 font-medium'
            : darkMode
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <NavItem key={child.slug.join('/')} item={child} currentSlug={currentSlug} darkMode={darkMode} />
          ))}
        </ul>
      )}
    </li>
  );
}

function NavSection({ item, currentSlug, darkMode }: { item: DocNavItem; currentSlug: string[]; darkMode: boolean }) {
  const hasChildren = item.children && item.children.length > 0;
  
  if (!hasChildren) {
    return <NavItem item={item} currentSlug={currentSlug} darkMode={darkMode} />;
  }
  
  return (
    <li className="mt-4 first:mt-0">
      <h3 className={`px-3 mb-2 text-xs font-semibold uppercase tracking-wider ${
        darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {item.title}
      </h3>
      <ul className="space-y-1 pl-3">
        {item.children!.map((child) => (
          <NavItem key={child.slug.join('/')} item={child} currentSlug={currentSlug} darkMode={darkMode} />
        ))}
      </ul>
    </li>
  );
}

export default function DocsClient({ doc, navigation, currentSlug, prevPage, nextPage, flatNav }: DocsClientProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem('docs-dark-mode');
    if (stored) {
      setDarkMode(stored === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('docs-dark-mode', String(newValue));
  };
  
  const getPageHref = (item: DocNavItem) => 
    `/docs${item.slug.length > 0 ? '/' + item.slug.join('/') : ''}`;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return flatNav
      .map((item) => ({
        ...item,
        section: item.slug.slice(0, -1).join('/') || '',
      }))
      .filter((item) => item.title.toLowerCase().includes(q) || item.section.toLowerCase().includes(q))
      .slice(0, 10);
  }, [searchQuery, flatNav]);

  const toc = useMemo(() => {
    const lines = doc.content.split('\n');
    const items: { id: string; text: string; level: number }[] = [];
    lines.forEach((line) => {
      const match = /^(#{2,3})\\s+(.*)$/.exec(line.trim());
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = slugify(text);
        items.push({ id, text, level });
      }
    });
    return items;
  }, [doc.content]);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${
        darkMode ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 rounded-md ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/docs" className="flex items-center gap-3">
                <Image
                  src={darkMode ? '/docs-logo-dark.png' : '/docs-logo-light.png'}
                  alt="Disclosurely"
                  width={200}
                  height={200}
                  className="rounded"
                />
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search docs"
                  className={`w-56 rounded-md border px-3 py-2 text-sm outline-none transition-colors ${
                    darkMode
                      ? 'bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500 focus:border-blue-500'
                      : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-blue-500'
                  }`}
                />
                {searchOpen && searchResults.length > 0 && (
                  <div
                    className={`absolute mt-2 w-72 max-h-80 overflow-y-auto rounded-md border shadow-lg z-50 ${
                      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    }`}
                  >
                    <ul className="divide-y divide-gray-800/50">
                      {searchResults.map((item) => (
                        <li key={item.slug.join('/')} className="p-3">
                          <Link
                            href={getPageHref(item)}
                            className={`block text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'} hover:text-blue-500`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="font-medium">{item.title}</div>
                            {item.section && (
                              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                {item.section}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link
                href="/"
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Go to Disclosurely
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className={`
            fixed lg:sticky lg:top-24 inset-y-0 left-0 z-40 w-72 lg:w-64 flex-shrink-0 
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${darkMode ? 'bg-gray-950 lg:bg-transparent' : 'bg-white lg:bg-transparent'}
            lg:h-[calc(100vh-8rem)] overflow-y-auto
            pt-16 lg:pt-0 px-4 lg:px-0
          `}>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 lg:hidden -z-10"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            <nav className="pb-8">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <NavSection 
                    key={item.slug.join('/') || 'index'} 
                    item={item} 
                    currentSlug={currentSlug}
                    darkMode={darkMode}
                  />
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main content + ToC */}
          <div className="flex-1 min-w-0 lg:pl-8 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8">
            <main>
              <article className={`
                prose max-w-none
                ${darkMode ? 'prose-invert' : ''}
                prose-headings:scroll-mt-20
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 ${darkMode ? 'prose-h2:border-gray-800' : 'prose-h2:border-gray-200'}
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:leading-7
                prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm ${darkMode ? 'prose-code:bg-gray-800' : 'prose-code:bg-gray-100'}
                prose-pre:rounded-lg ${darkMode ? 'prose-pre:bg-gray-900' : 'prose-pre:bg-gray-50'}
                prose-ul:my-4 prose-li:my-1
                prose-strong:font-semibold
              `}>
                <h1>{doc.title}</h1>
                {doc.description && (
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {doc.description}
                  </p>
                )}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1({ node, children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h1 id={id} {...props}>{children}</h1>;
                    },
                    h2({ node, children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                    h3({ node, children, ...props }) {
                      const text = String(children);
                      const id = slugify(text);
                      return <h3 id={id} {...props}>{children}</h3>;
                    },
                  }}
                >
                  {doc.content}
                </ReactMarkdown>
              </article>
              
              {/* Pagination */}
              <nav className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  {prevPage ? (
                    <Link
                      href={getPageHref(prevPage)}
                      className={`group flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'border-gray-800 hover:border-gray-700 hover:bg-gray-900' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Previous</div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {prevPage.title}
                        </div>
                      </div>
                    </Link>
                  ) : <div />}
                  
                  {nextPage ? (
                    <Link
                      href={getPageHref(nextPage)}
                      className={`group flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'border-gray-800 hover:border-gray-700 hover:bg-gray-900' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-right">
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Next</div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {nextPage.title}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </Link>
                  ) : <div />}
                </div>
              </nav>
            </main>

            {/* On-page ToC */}
            <aside className="hidden lg:block">
              <div className={`sticky top-24 rounded-lg border p-4 text-sm ${darkMode ? 'border-gray-800 bg-gray-900/60' : 'border-gray-200 bg-gray-50'}`}>
                <div className={`uppercase text-xs font-semibold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  On this page
                </div>
                {toc.length === 0 ? (
                  <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>No headings</div>
                ) : (
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id} className={`${item.level === 3 ? 'pl-4' : ''}`}>
                        <a
                          href={`#${item.id}`}
                          className={`hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`mt-auto border-t ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={darkMode ? '/docs-logo-dark.png' : '/docs-logo-light.png'}
                alt="Disclosurely"
                width={150}
                height={150}
                className="rounded"
              />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Built for compliance and transparency
              </span>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} Disclosurely. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

