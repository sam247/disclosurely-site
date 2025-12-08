'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLangPrefix } from '@/hooks/useLangPrefix';
import PublicLanguageSelector from '@/components/PublicLanguageSelector';

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const { prefix } = useLangPrefix();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <Link href={`${prefix || '/'}`} className="flex items-center">
          <Image
            src="/lovable-uploads/c46ace0e-df58-4119-b5e3-8dcfa075ea2f.png"
            alt="Disclosurely"
            width={180}
            height={48}
            priority
            className="h-5 w-auto sm:h-6 md:h-8"
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={`${prefix}${item.href}`}
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <PublicLanguageSelector />
          <a
            href="https://app.disclosurely.com/auth/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="https://app.disclosurely.com/auth/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <PublicLanguageSelector />
          <a
            href="https://app.disclosurely.com/auth/login"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="https://app.disclosurely.com/auth/signup"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white transition-colors hover:bg-blue-700"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}

