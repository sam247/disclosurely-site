"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Eye, CheckCircle, Headphones, BarChart3, Users, Lock, Zap, TrendingUp, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";

function AboutContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  return (
    <I18nProvider>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                About Disclosurely
              </span>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                Making Compliance Simple, Secure, and Built for Trust
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Disclosurely helps organisations create safer, more transparent workplaces. We believe that ethical reporting should be effortless — not intimidating. Our platform makes it easy for employees to speak up, and for businesses to respond quickly, prevent risks, and build lasting cultures of integrity.
              </p>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Image
                  src="/abouthero.jpeg"
                  alt="Our team working together"
                  width={1200}
                  height={800}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <Card className="rounded-2xl bg-blue-600 p-8 text-white">
                <h3 className="mb-4 text-3xl font-bold">On a Mission to Make Whistleblowing Easier, Safer, and More Effective</h3>
                <p className="mb-4 text-lg text-gray-200 leading-relaxed">
                  At Disclosurely, we&apos;re redefining how businesses handle ethics and compliance. Our mission is simple — to help organisations save time, reduce risk, and cut costs by making anonymous reporting faster, more secure, and easier for employees to adopt.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  By empowering employees to speak up with confidence, we help companies detect issues early, prevent costly risks, and build stronger cultures of trust and accountability.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Success by Numbers */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">Our success by the numbers</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="rounded-2xl p-8 text-center">
                <div className="mb-2 text-5xl font-bold text-gray-900">500+</div>
                <div className="mb-2 text-xl font-semibold text-gray-900">Organizations Trust Us</div>
                <p className="text-gray-600">Leading companies worldwide rely on our secure reporting platform</p>
              </Card>
              <Card className="rounded-2xl p-8 text-center">
                <div className="mb-2 text-5xl font-bold text-gray-900">99.9%</div>
                <div className="mb-2 text-xl font-semibold text-gray-900">Uptime Guarantee</div>
                <p className="text-gray-600">Military-grade security ensuring your platform is always available</p>
              </Card>
              <Card className="rounded-2xl p-8 text-center">
                <div className="mb-2 text-5xl font-bold text-gray-900">50+</div>
                <div className="mb-2 text-xl font-semibold text-gray-900">Countries Served</div>
                <p className="text-gray-600">Supporting global compliance with multi-language capabilities</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">Our company&apos;s values</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="rounded-2xl p-8 transition-shadow hover:shadow-lg">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Industry Leading Security</h3>
                <p className="text-gray-600">
                  Military-grade AES-GCM encryption ensures that every report is protected with the highest security standards. Your data is encrypted at rest and in transit, with zero-knowledge architecture.
                </p>
              </Card>

              <Card className="rounded-2xl p-8 transition-shadow hover:shadow-lg">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                  <Users className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Enhanced Collaboration</h3>
                <p className="text-gray-600">
                  Streamlined workflows connect your team seamlessly. Built-in case management, real-time notifications, and AI-powered insights help you resolve issues faster and more effectively.
                </p>
              </Card>

              <Card className="rounded-2xl p-8 transition-shadow hover:shadow-lg">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Instant Compliance</h3>
                <p className="text-gray-600">
                  Automated compliance reporting built for GDPR, SOX, ISO 27001, and more. Stay audit-ready with comprehensive reporting tools and dashboard analytics.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Dashboard Feature */}
        <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  Dashboard Overview
                </span>
                <h2 className="mb-6 text-4xl font-bold text-gray-900">Intuitive Dashboard</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Our comprehensive dashboard provides real-time insights into your reporting activities. Track case resolution times, monitor trends, and manage your compliance requirements all from one central location.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-semibold text-gray-900">Personalized Analytics</h4>
                      <p className="text-gray-600">
                        Track metrics that matter to your organization with customizable dashboards and automated reports.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-xl font-semibold text-gray-900">Case Resolution Overview</h4>
                      <p className="text-gray-600">
                        Monitor case status, assignment, and resolution progress with our comprehensive case management system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="transform rotate-2 rounded-2xl bg-white p-6 shadow-2xl">
                  <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-white/20" />
                      <div>
                        <div className="font-semibold">John Anderson</div>
                        <div className="text-sm text-blue-100">Security Manager</div>
                      </div>
                    </div>
                    <div className="mb-2 text-3xl font-bold">156</div>
                    <div className="text-blue-100">Active Reports</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-64 transform -rotate-2 rounded-xl bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Recent Activity</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>New case #2476 assigned</div>
                    <div>Incident resolved: Data access</div>
                    <div>New anonymous report submitted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Trust */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                  Security & Trust
                </span>
                <h2 className="mb-6 text-4xl font-bold text-gray-900">Built for the highest security standards</h2>
                <p className="mb-6 text-lg text-gray-600">
                  We protect your data with encryption everywhere, zero-knowledge design, and continuous monitoring. Compliance teams get audit-ready visibility with privacy-first controls.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">End-to-end encryption</h4>
                      <p className="text-gray-600">AES-GCM encryption for data in transit and at rest with strict access controls.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Compliance-first design</h4>
                      <p className="text-gray-600">Built for GDPR, SOX, and ISO 27001 with audit logs and retention policies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Trusted operations</h4>
                      <p className="text-gray-600">Uptime SLAs, continuous monitoring, and incident response best practices.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="rounded-2xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Zero-knowledge architecture</h4>
                  </div>
                  <p className="text-gray-600">
                    Data is encrypted before it leaves the device, ensuring only authorized reviewers can decrypt reports and messages.
                  </p>
                </Card>

                <Card className="rounded-2xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Headphones className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Support that knows compliance</h4>
                  </div>
                  <p className="text-gray-600">
                    Work with a team that understands whistleblowing, ethics hotlines, and regulatory requirements across industries.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Meet our team</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                The passionate people behind Disclosurely, dedicated to creating the most secure and compliant
                whistleblowing platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { name: "Sarah Johnson", role: "CRO & Founder", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces" },
                { name: "Emily Kim", role: "VP of Product", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces" },
                { name: "David Lee", role: "CEO & Co-Founder", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces" },
                { name: "Michael Chen", role: "VP of Marketing", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces" },
                { name: "Michael Brown", role: "VP of Engineering", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces" },
                { name: "Sophia Williams", role: "Head of Design", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces" },
                { name: "James Rodriguez", role: "VP of Sales", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces" },
                { name: "Lisa Anderson", role: "Head of Customer Success", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces" },
              ].map((person, idx) => (
                <div key={idx} className="text-center">
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-200">
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 font-bold text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">What our users say</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Don&apos;t just take our word for it. See what organizations using Disclosurely have to say about their
                experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  stars: 5,
                  title: "Best-in-class security and compliance",
                  review:
                    "The level of security and compliance features exceeded our expectations. Disclosurely has been a game-changer for our organization.",
                  author: "Lisa Thompson",
                  role: "Compliance Officer",
                },
                {
                  stars: 5,
                  title: "Incredible ease of use",
                  review:
                    "The intuitive dashboard and automated reporting make managing whistleblower reports effortless. Our team loves it!",
                  author: "James Wilson",
                  role: "HR Director",
                },
                {
                  stars: 5,
                  title: "Outstanding customer support",
                  review:
                    "The support team is incredibly responsive and helpful. They helped us customize the platform perfectly for our needs.",
                  author: "Maria Garcia",
                  role: "Operations Manager",
                },
              ].map((testimonial, idx) => (
                <Card key={idx} className="rounded-2xl p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">{testimonial.title}</h3>
                  <p className="mb-4 text-gray-600">{testimonial.review}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                View all reviews
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold text-white">Build a culture of trust and compliance</h2>
                <p className="mb-8 text-lg text-blue-100">
                  Join hundreds of organizations worldwide who trust Disclosurely for secure, compliant whistleblowing.
                  Start your free trial today.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://app.disclosurely.com/auth/signup"
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Start Free Trial
                  </a>
                  <Link
                    href="/features"
                    className="inline-flex items-center rounded-lg border border-blue-500 bg-blue-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
                  >
                    View Features
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                    <div className="mb-2 text-4xl font-bold text-white">500+</div>
                    <div className="text-blue-100">Organizations</div>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                    <div className="mb-2 text-4xl font-bold text-white">99.9%</div>
                    <div className="text-blue-100">Uptime</div>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                    <div className="mb-2 text-4xl font-bold text-white">50+</div>
                    <div className="text-blue-100">Countries</div>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                    <div className="mb-2 text-4xl font-bold text-white">24/7</div>
                    <div className="text-blue-100">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Explore More</h2>
              <p className="text-gray-600">Learn more about our platform and solutions</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/features" className="group block">
                <div className="h-full rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    Platform Features
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover our comprehensive whistleblowing features including anonymous reporting, AI-powered case
                    analysis, and secure messaging.
                  </p>
                </div>
              </Link>

              <Link href="/pricing" className="group block">
                <div className="h-full rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">Pricing Plans</h3>
                  <p className="text-sm text-gray-600">
                    View our transparent pricing starting at £19.99/month. All plans include unlimited reports and
                    military-grade encryption.
                  </p>
                </div>
              </Link>

              <Link href="/whistleblowing-directive" className="group block">
                <div className="h-full rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    EU Whistleblowing Directive
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about compliance requirements under the EU Whistleblowing Directive and how Disclosurely helps
                    you stay compliant.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default AboutContent;
