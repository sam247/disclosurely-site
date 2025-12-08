import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, MessageSquare, Shield, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const businessLogos = [
  { src: '/business_logos/page-1.png', alt: 'Business Partner 1' },
  { src: '/business_logos/page-2.png', alt: 'Business Partner 2' },
  { src: '/business_logos/page-3.png', alt: 'Business Partner 3' },
  { src: '/business_logos/page-4.png', alt: 'Business Partner 4' },
  { src: '/business_logos/page-5.png', alt: 'Business Partner 5' },
  { src: '/business_logos/page-6.png', alt: 'Business Partner 6' },
];

const features = [
  {
    title: 'Anonymous Reporting',
    description:
      'Complete anonymity for whistleblowers with encrypted submissions and secure identity protection.',
    icon: '/assets/icons/anonymous_reporting.png',
  },
  {
    title: 'Secure Messaging',
    description: 'Two-way encrypted communication between whistleblowers and investigators while maintaining anonymity.',
    icon: '/assets/icons/secure_messaging.png',
  },
  {
    title: 'Case Management',
    description: 'Comprehensive dashboard to track, investigate, and resolve cases with full audit trails.',
    icon: '/assets/icons/case_management.png',
  },
  {
    title: 'Multi-User Access',
    description: 'Role-based permissions for legal, HR, and compliance teams with controlled access levels.',
    icon: '/assets/icons/multi-user_access.png',
  },
  {
    title: 'Regulatory Compliance',
    description: 'Built-in compliance with GDPR, SOX, and other regulatory requirements across industries.',
    icon: '/assets/icons/regulatory_compliance.png',
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-level encryption, secure hosting, and comprehensive data protection measures.',
    icon: '/assets/icons/enterprise_security.png',
  },
];

const steps = [
  {
    title: 'Set Up Your Portal',
    description:
      'Create your account and customize your reporting portal in minutes. Add your branding, set up notification preferences, and configure your team access.',
  },
  {
    title: 'Share with Your Team',
    description:
      'Distribute your secure reporting link to employees through email, intranet, or QR codes. Reports can be submitted 24/7 from any device, anywhere.',
  },
  {
    title: 'Manage & Resolve Cases',
    description:
      'Receive instant notifications of new reports. Investigate, communicate securely with whistleblowers, and track cases through resolution with complete audit trails.',
  },
];

const highlights = [
  {
    title: 'Anonymous Reporting Made Simple',
    description:
      'Enable employees to report misconduct, ethics violations, or other concerns completely anonymously. Our advanced encryption ensures whistleblower identity protection while maintaining full compliance with regulatory requirements.',
    bullets: [
      'Zero data collection on reporters',
      'Anonymous follow-up messaging',
      'Multiple language support',
    ],
    image: '/assets/artwork/anonymous_reporting_made_simple.png',
    icon: <Shield className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Military-Grade Encryption',
    description:
      'Every report is protected with AES-256 encryption, the same standard used by banks and government agencies. Your sensitive data is secure from submission to resolution.',
    bullets: ['AES-256 end-to-end encryption', 'Encrypted file attachments', 'Secure data storage'],
    image: '/assets/artwork/military_grade_encryption.png',
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Compliance Made Easy',
    description:
      'Stay compliant with UK and EU whistleblowing regulations, including the EU Whistleblowing Directive and UK Employment Rights Act. Built-in audit trails and reporting tools ensure regulatory adherence.',
    bullets: ['EU Whistleblowing Directive compliant', 'GDPR ready', 'Automated compliance reports'],
    image: '/assets/artwork/compliance_made_easy.png',
    icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'Secure Two-Way Communication',
    description:
      'Maintain anonymous dialogue with whistleblowers throughout investigations. Request additional information, provide updates, and ensure transparency while protecting identities.',
    bullets: ['Encrypted messaging', 'Maintain anonymity', 'Real-time notifications'],
    image: '/assets/artwork/secure_two_way_communication.png',
    icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
  },
  {
    title: 'AI-Powered Case Analysis',
    description:
      'Leverage artificial intelligence to analyze case patterns, identify risks, and prioritize investigations. Our AI assistant helps compliance teams work smarter and more efficiently.',
    bullets: ['Automated risk assessment', 'Pattern detection', 'Intelligent case prioritization'],
    image: '/assets/artwork/ai_powered_case_analysis.png',
    icon: <Brain className="h-6 w-6 text-blue-600" />,
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="px-4 pb-20 pt-[90px] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-medium">Military Grade AES-GCM Encryption</span>
            </div>
          </div>
          <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-5xl">
            Transforming Whistleblowing With
            <span className="mt-2 block text-blue-600">AI-Powered Workflows</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">
            Disclosurely helps compliance teams stay ahead by transforming ethics and compliance into a proactive
            advantage—building a culture of integrity, simplifying workflows, and reducing organisational risk.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="w-full rounded-lg bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Start Free Trial
            </a>
            <Link
              href="/pricing"
              className="w-full rounded-lg border border-gray-300 px-8 py-3 text-center text-lg font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
            >
              View Pricing
            </Link>
          </div>

          <div className="mt-16">
            <p className="mb-12 text-lg font-medium text-gray-700">Trusted by hundreds of businesses</p>
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8">
              {businessLogos.map((logo) => (
                <div key={logo.src} className="flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={48}
                    className="h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need for secure reporting</h2>
            <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">
              Our platform provides comprehensive tools to manage whistleblower reports with complete confidentiality and
              compliance.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-16 w-16">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-3xl px-4 text-lg text-gray-700 sm:text-xl">
              Get started with Disclosurely in three simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  {item.icon}
                  <span className="text-sm font-medium">Security & Compliance</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{item.title}</h3>
                <p className="mb-4 text-gray-700">{item.description}</p>
                <ul className="space-y-2 text-gray-700">
                  {item.bullets.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

