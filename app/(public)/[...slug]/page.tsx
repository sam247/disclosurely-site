import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { generateHreflangAlternates } from '@/lib/hreflang';

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
    title: 'About Disclosurely',
    subtitle:
      'We help organisations build trust with secure whistleblowing, compliance automation, and privacy-first technology.',
    highlights: ['London-based team', 'Security-first culture', 'Serving UK & EU organisations'],
  },
  '/contact': {
    title: 'Contact Our Team',
    subtitle: 'Have questions about Disclosurely? We are here to help with demos, pricing, and support.',
    highlights: ['support@disclosurely.com', 'Fast response times', 'Enterprise onboarding help'],
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
    subtitle: 'Compare Disclosurely with SpeakUp across security, compliance, and usability.',
    highlights: ['Native encryption', 'AI-powered insights', 'Multi-language support'],
  },
  '/vs-whistleblower-software': {
    title: 'Disclosurely vs Whistleblower Software',
    subtitle: 'See how Disclosurely offers deeper security, automation, and analytics.',
    highlights: ['End-to-end encryption', 'Automated workflows', 'Compliance reporting'],
  },
  '/vs-navex': {
    title: 'Disclosurely vs NAVEX',
    subtitle: 'Evaluate Disclosurely against NAVEX for modern whistleblowing and compliance.',
    highlights: ['Faster setup', 'Transparent pricing', 'Modern UX'],
  },
  '/vs-resolver': {
    title: 'Disclosurely vs Resolver',
    subtitle: 'Discover how Disclosurely simplifies secure reporting compared to Resolver.',
    highlights: ['Built-in encryption', 'AI triage', 'UK & EU focus'],
  },
  '/compliance-software': {
    title: 'Compliance Software',
    subtitle: 'Streamline regulatory obligations, protect whistleblowers, and build an ethical workplace culture.',
    highlights: ['Whistleblowing compliant', 'Secure messaging', 'ISO 27001 aligned'],
  },
  '/whistleblowing-directive': {
    title: 'EU Whistleblowing Directive',
    subtitle: 'Stay compliant with EU Whistleblowing Directive requirements using Disclosurely.',
    highlights: ['50+ employee coverage', 'Timely acknowledgment', 'Retaliation safeguards'],
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
    subtitle: 'Security is built into Disclosurely from data storage to communications.',
    highlights: ['AES-256 encryption', 'ISO 27001 alignment', 'Continuous monitoring'],
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

export function generateMetadata({ params }: { params: { slug?: string[] } }): Metadata {
  const path = '/' + (params.slug?.join('/') ?? '');
  const page = pages[path];

  if (!page) {
    return {
      title: 'Disclosurely',
      description: 'Disclosurely whistleblowing and compliance platform.',
    };
  }

  const canonical = `https://disclosurely.com${path}`;
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

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const path = '/' + (params.slug?.join('/') ?? '');
  const page = pages[path];

  if (!page) return {};

  return {
    title: `${page.title} | Disclosurely`,
    description: page.subtitle,
  };
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

