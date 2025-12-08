'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '@/hooks/useLanguageFromUrl';
import PublicLanguageSelector from '@/components/PublicLanguageSelector';
import { AnnouncementBar } from '@/components/AnnouncementBar';

export function Header() {
  const { t } = useTranslation();
  const { langPrefix } = useLanguageFromUrl();

  return (
    <>
      <AnnouncementBar />
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link href={langPrefix || '/'} className="flex items-center">
              <Image
                src="/lovable-uploads/c46ace0e-df58-4119-b5e3-8dcfa075ea2f.png"
                alt="Disclosurely"
                width={180}
                height={48}
                priority
                className="h-5 w-auto sm:h-6 md:h-8"
              />
            </Link>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <PublicLanguageSelector />
            <Link href={`${langPrefix}/pricing`} className="text-gray-700 transition-colors hover:text-gray-900">
              {t('nav.pricing')}
            </Link>
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              {t('nav.getStarted')}
            </a>
          </div>
          <div className="flex items-center gap-1.5 md:hidden">
            <PublicLanguageSelector />
            <a
              href="https://app.disclosurely.com/auth/login"
              className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
            >
              {t('nav.signin')}
            </a>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

