import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { generateHreflangAlternates } from '@/lib/hreflang';

const BASE_URL = 'https://disclosurely.com';

type PageConfig = {
  title: string;
  subtitle: string;
  highlights?: string[];
};

const pages: Record<string, PageConfig> = {
  '/pricing': {
    title: 'Simple, Transparent Pricing',
    subtitle:
      'Flexible pricing designed around your organisation. Choose the plan that fits your needs and get started with guided setup support.',
    highlights: ['7-day free trial', 'No hidden fees', 'Enterprise support available'],
  },
  '/features': {
    title: 'Features Built for Secure Reporting',
    subtitle:
      'Anonymous reporting, encrypted messaging, AI-powered case analysis, and compliance tooling in one platform.',
    highlights: ['End-to-end encryption', 'Role-based access', 'Real-time analytics'],
  },
  '/about': {
    title: 'Why Disclosurely exists',
    subtitle:
      'Mission-led whistleblowing software — practical secure reporting, clearer rollouts, and trust without fake scale or filler.',
    highlights: ['Grounded security story', 'EU & UK channel context', 'Link through to full Security page'],
  },
  '/contact': {
    title: 'Talk to Disclosurely',
    subtitle:
      'Book a demo, ask about pricing, or get rollout guidance — we aim to reply within one business day.',
    highlights: ['Demo and pricing help', 'EU & UK whistleblowing context', 'No hard sales pressure'],
  },
  '/careers': {
    title: 'Careers at Disclosurely',
    subtitle: 'Join us to build secure, trustworthy compliance technology.',
    highlights: ['Remote-friendly roles', 'Security-focused products', 'Inclusive team culture'],
  },
  '/blog': {
    title: 'Disclosurely Blog',
    subtitle: 'Insights on compliance, whistleblowing, security, and product updates.',
    highlights: ['Compliance guidance', 'Product announcements', 'Security best practices'],
  },
  '/terms': {
    title: 'Terms of Service',
    subtitle: 'Understand the terms that govern your use of Disclosurely.',
    highlights: ['Transparent policies', 'Data protection', 'Customer-first approach'],
  },
  '/privacy': {
    title: 'Privacy Policy',
    subtitle: 'How we protect and handle your data across all Disclosurely products.',
    highlights: ['GDPR aligned', 'Encryption throughout', 'User control and transparency'],
  },
  '/vs-speakup': {
    title: 'Disclosurely vs SpeakUp',
    subtitle: 'Compare pricing models, workflows, and reporting features to see which platform fits your organisation.',
    highlights: ['Balanced vendor comparison', 'AI-assisted case handling', 'Clear trial path'],
  },
  '/vs-whistleblower-software': {
    title: 'Disclosurely vs Whistleblower Software',
    subtitle: 'Compare pricing models, reporting workflows, and platform flexibility for your organisation.',
    highlights: ['Fair pricing-model comparison', 'Decision-focused tables', 'Balanced buyer guidance'],
  },
  '/vs-navex': {
    title: 'Disclosurely vs NAVEX',
    subtitle: 'Compare buying models, rollout complexity, and whistleblowing workflows for your organisation.',
    highlights: ['Balanced enterprise comparison', 'Procurement and fit focus', 'Practical rollout guidance'],
  },
  '/vs-resolver': {
    title: 'Disclosurely vs Resolver',
    subtitle: 'Discover how Disclosurely simplifies secure reporting compared to Resolver.',
    highlights: ['Built-in encryption', 'AI triage', 'UK & EU focus'],
  },
  '/whistleblowing-directive': {
    title: 'EU Whistleblowing Directive',
    subtitle: 'EU Whistleblowing Directive compliance made practical: secure channels, 7-day and 90-day workflows, audit-ready records.',
    highlights: ['Who must comply', 'Directive requirements', 'Compliant system checklist'],
  },
  '/industries': {
    title: 'Industry Solutions',
    subtitle: 'Tailored whistleblowing and compliance solutions across industries.',
    highlights: ['Finance', 'Healthcare', 'Public sector', 'Technology'],
  },
  '/industries/healthcare': {
    title: 'Healthcare Compliance',
    subtitle: 'Protect patient trust and meet healthcare compliance obligations.',
    highlights: ['Secure incident reporting', 'Audit-ready trails', 'PII protection'],
  },
  '/industries/finance': {
    title: 'Financial Services Compliance',
    subtitle: 'Meet regulatory requirements for financial services with encrypted reporting.',
    highlights: ['Anti-fraud workflows', 'Secure messaging', 'Regulatory reporting'],
  },
  '/security': {
    title: 'Security & Trust',
    subtitle: 'How Disclosurely protects sensitive reports with encryption, access controls, and privacy-conscious design.',
    highlights: ['AES-256-GCM encryption', 'Role-based access', 'GDPR-conscious design'],
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers about Disclosurely features, security, and onboarding.',
    highlights: ['Setup guidance', 'Data handling', 'Support coverage'],
  },
  '/anonymous-hotline': {
    title: 'Anonymous Hotline',
    subtitle: 'Offer employees an anonymous, encrypted hotline for safe reporting.',
    highlights: ['Anonymous messaging', 'Secure intake', 'Multi-channel options'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = '/' + (slug?.join('/') ?? '');
  const page = pages[path];

  if (!page) {
    return {
      title: 'Disclosurely',
      description: 'Disclosurely whistleblowing and compliance platform.',
    };
  }

  const headerList = await headers();
  const lang = headerList.get('x-lang');
  const pathForCanonical = lang && lang !== 'en' ? `/${lang}${path}` : path;
  const canonical = `${BASE_URL}${pathForCanonical}`;
  const alternates = generateHreflangAlternates(path);

  return {
    title: `${page.title} | Disclosurely`,
    description: page.subtitle,
    alternates: {
      canonical,
      languages: Object.fromEntries(alternates.map((alt) => [alt.hreflang, alt.url])),
    },
    openGraph: {
      title: page.title,
      description: page.subtitle,
      url: canonical,
      siteName: 'Disclosurely',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.subtitle,
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((path) => ({
    slug: path === '/' ? [] : path.slice(1).split('/'),
  }));
}

export default function MarketingPage({ params }: { params: { slug?: string[] } }) {
  const path = '/' + (params.slug?.join('/') ?? '');
  const page = pages[path];

  if (!page) {
    return notFound();
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            Disclosurely
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">{page.title}</h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-700 sm:text-xl">{page.subtitle}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Get started
            </a>
          <Link
            href="/contact"
            className="w-full rounded-lg border border-gray-200 px-6 py-3 text-center text-gray-700 transition-colors hover:border-gray-300 sm:w-auto"
          >
            Talk to us
          </Link>
          </div>
        </div>

        {page.highlights && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-left shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

