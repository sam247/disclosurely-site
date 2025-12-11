'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AnalyticsEventsListener from '@/components/AnalyticsEventsListener';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnalyticsEventsListener />
      <ScrollToTop />
      <Header />
      <main className="min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}

