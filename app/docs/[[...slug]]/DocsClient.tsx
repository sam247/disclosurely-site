'use client';

import { useState, useEffect } from 'react';
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

export default function DocsClient({ doc, navigation, currentSlug, prevPage, nextPage }: DocsClientProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
                  width={64}
                  height={64}
                  className="rounded"
                />
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-3">
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
          
          {/* Main content */}
          <main className="flex-1 min-w-0 lg:pl-8">
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                width={48}
                height={48}
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

