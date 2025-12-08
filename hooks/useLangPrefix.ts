'use client';

import { usePathname } from 'next/navigation';

const languages = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'no', 'pt', 'it', 'nl', 'da', 'el'];

export const useLangPrefix = () => {
  const pathname = usePathname();
  const segments = (pathname || '/').split('/').filter(Boolean);
  const first = segments[0];
  const lang = languages.includes(first) ? first : null;
  const prefix = lang && lang !== 'en' ? `/${lang}` : '';

  return { lang: lang || 'en', prefix };
};

export const getLangPrefix = (pathname: string) => {
  const segments = (pathname || '/').split('/').filter(Boolean);
  const first = segments[0];
  const lang = languages.includes(first) ? first : null;
  return lang && lang !== 'en' ? `/${lang}` : '';
};

