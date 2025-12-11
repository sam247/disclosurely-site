'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AnalyticsEventsListener from '@/components/AnalyticsEventsListener';
import ChatwootWidget from '@/components/ChatwootWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnalyticsEventsListener />
      <ChatwootWidget />
      <ScrollToTop />
      <Header />
      <main className="min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}

