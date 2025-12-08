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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              About Disclosurely
            </span>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
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

      {/* CTA */}
      <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to build a trusted compliance culture?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Start protecting your teams with anonymous reporting, secure messaging, and AI-powered insights.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://app.disclosurely.com/auth/signup"
              className="w-full rounded-lg bg-white px-6 py-3 text-center text-blue-600 transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Start free trial
            </a>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-white/40 px-6 py-3 text-center text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <I18nProvider>
      <AboutContent />
    </I18nProvider>
  );
}

