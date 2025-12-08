"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Check, X, Shield, Zap, DollarSign, Users, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function CompareContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const comparisonPoints = [
    {
      category: "Pricing & Value",
      icon: DollarSign,
      items: [
        { feature: "Starting Price", disclosurely: "£39.99/month", competitor: "$667+/month", winner: "disclosurely" },
        { feature: "Annual Savings", disclosurely: "Save $7,500+/year", competitor: "Enterprise pricing", winner: "disclosurely" },
        { feature: "Transparent Pricing", disclosurely: "Public pricing", competitor: "Contact for quote", winner: "disclosurely" },
        { feature: "Free Trial", disclosurely: "7 days, instant access", competitor: "Custom demo only", winner: "disclosurely" },
        { feature: "Best For", disclosurely: "SMBs to Enterprise", competitor: "Large Enterprise", winner: "tie" },
      ],
    },
    {
      category: "AI & Modern Features",
      icon: Zap,
      items: [
        { feature: "AI Case Analysis", disclosurely: true, competitor: "Basic AI tools", winner: "disclosurely" },
        { feature: "AI Risk Assessment", disclosurely: true, competitor: "Limited", winner: "disclosurely" },
        { feature: "AI Chat Support", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Pattern Detection", disclosurely: true, competitor: "Basic", winner: "disclosurely" },
        { feature: "Automated Assignment Rules", disclosurely: "Advanced", competitor: "Basic", winner: "disclosurely" },
        { feature: "SLA Management", disclosurely: "Automated", competitor: "Manual", winner: "disclosurely" },
      ],
    },
    {
      category: "Security & Compliance",
      icon: Lock,
      items: [
        { feature: "End-to-End Encryption", disclosurely: "AES-256-GCM", competitor: "Yes", winner: "tie" },
        { feature: "GDPR Compliant", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "ISO 27001 Certified", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Data Residency Options", disclosurely: "EU/US", competitor: "Global", winner: "competitor" },
        { feature: "Zero-Knowledge Architecture", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Session Management", disclosurely: true, competitor: false, winner: "disclosurely" },
      ],
    },
    {
      category: "Platform Features",
      icon: Shield,
      items: [
        { feature: "Unlimited Reports", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Unlimited Storage", disclosurely: true, competitor: "Based on plan", winner: "disclosurely" },
        { feature: "Two-Way Messaging", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Custom Branding", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Custom Domain (CNAME)", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Real-time Analytics", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "24/7 Phone Hotline", disclosurely: false, competitor: true, winner: "competitor" },
        { feature: "Modern UI/UX", disclosurely: "Modern", competitor: "Legacy", winner: "disclosurely" },
      ],
    },
    {
      category: "Language & Global",
      icon: Globe,
      items: [
        { feature: "Languages Supported", disclosurely: "40+ languages", competitor: "150+ languages", winner: "competitor" },
        { feature: "AI Translation", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Multi-Channel Reporting", disclosurely: "Web, Mobile", competitor: "Web, Mobile, Phone", winner: "competitor" },
        { feature: "Global Infrastructure", disclosurely: "Growing", competitor: "Extensive", winner: "competitor" },
      ],
    },
    {
      category: "Team & Collaboration",
      icon: Users,
      items: [
        { feature: "Team Members", disclosurely: "Unlimited (Pro)", competitor: "Based on plan", winner: "disclosurely" },
        { feature: "Role-Based Access", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Assignment Automation", disclosurely: "Advanced rules", competitor: "Basic workflows", winner: "disclosurely" },
        { feature: "Case Escalation", disclosurely: "Automated SLA", competitor: "Manual", winner: "disclosurely" },
        { feature: "PowerBI Integration", disclosurely: false, competitor: true, winner: "competitor" },
      ],
    },
  ];

  return (
    <I18nProvider>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-900">Save $7,500+ per year</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Disclosurely vs
              <span className="block mt-2 text-blue-600">NAVEX (EthicsPoint)</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Get enterprise-grade whistleblowing with modern AI at SMB pricing. No enterprise price tag required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Start Free Trial
              </a>
              <Link
                href={`${langPrefix}/pricing`}
                className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Comparison Highlights */}
        <div className="bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">94%</div>
                <div className="mb-1 font-semibold text-gray-900">Lower Cost</div>
                <div className="text-sm text-gray-600">£39.99/mo vs $667/mo</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">Modern</div>
                <div className="mb-1 font-semibold text-gray-900">AI-Powered Platform</div>
                <div className="text-sm text-gray-600">vs Legacy Infrastructure</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">Instant</div>
                <div className="mb-1 font-semibold text-gray-900">Start Today</div>
                <div className="text-sm text-gray-600">No sales calls required</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison by Category */}
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Feature-by-Feature Comparison</h2>
              <p className="text-lg text-gray-600">Enterprise features without the enterprise price tag</p>
            </div>

            <div className="space-y-12">
              {comparisonPoints.map((category, idx) => {
                const IconComponent = category.icon;
                return (
                  <div key={idx} className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                      <div className="flex items-center gap-3 text-white">
                        <IconComponent className="h-6 w-6" />
                        <h3 className="text-xl font-bold">{category.category}</h3>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="w-1/3 px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                            <th className="w-1/3 px-6 py-4 text-center text-sm font-semibold text-blue-600">Disclosurely</th>
                            <th className="w-1/3 px-6 py-4 text-center text-sm font-semibold text-gray-600">NAVEX</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {category.items.map((item, itemIdx) => (
                            <tr
                              key={itemIdx}
                              className={`hover:bg-gray-50 ${item.winner === "disclosurely" ? "bg-blue-50/30" : ""}`}
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{item.feature}</div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                {typeof item.disclosurely === "boolean" ? (
                                  item.disclosurely ? (
                                    <div className="flex items-center justify-center">
                                      <Check className="h-6 w-6 text-green-600" />
                                      {item.winner === "disclosurely" && (
                                        <span className="ml-2 text-xs font-semibold text-blue-600">Winner</span>
                                      )}
                                    </div>
                                  ) : (
                                    <X className="mx-auto h-6 w-6 text-gray-400" />
                                  )
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <span className="font-semibold text-gray-900">{item.disclosurely}</span>
                                    {item.winner === "disclosurely" && (
                                      <span className="mt-1 text-xs font-semibold text-blue-600">Winner</span>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {typeof item.competitor === "boolean" ? (
                                  item.competitor ? (
                                    <div className="flex items-center justify-center">
                                      <Check className="h-6 w-6 text-green-600" />
                                      {item.winner === "competitor" && (
                                        <span className="ml-2 text-xs font-semibold text-gray-600">Winner</span>
                                      )}
                                    </div>
                                  ) : (
                                    <X className="mx-auto h-6 w-6 text-gray-400" />
                                  )
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <span className="font-semibold text-gray-700">{item.competitor}</span>
                                    {item.winner === "competitor" && (
                                      <span className="mt-1 text-xs font-semibold text-gray-600">Winner</span>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why Choose Disclosurely */}
        <div className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Modern Alternative to NAVEX EthicsPoint</h2>
              <p className="mb-8 text-lg text-gray-600">When NAVEX is too expensive and complex for your needs</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Affordable Enterprise Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Get the same compliance features at 94% lower cost. Perfect for growing companies who need enterprise quality
                    without enterprise pricing.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Save $7,500+ annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Transparent, public pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>No hidden fees or add-ons</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Modern AI Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Built-from-scratch with AI at the core, not bolted on. Get advanced case analysis, risk assessment, and
                    automation that NAVEX&apos;s legacy platform can&apos;t match.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>AI analyzes every case</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Pattern detection across reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>24/7 AI chat support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Quick Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Start in minutes, not months. No lengthy sales cycles, complex contracts, or enterprise onboarding. Just sign up
                    and go.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>5-minute setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>No sales calls required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Instant 7-day trial</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Who Should Choose What */}
        <div className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Which Solution is Right for You?</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-blue-900">Choose Disclosurely if you:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Need transparent, affordable pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Want modern AI-powered case analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Prefer self-service setup and onboarding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Are a growing SMB or mid-market company</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Value modern UX and ease of use</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Choose NAVEX if you:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    <span>Are a Fortune 500 with unlimited budget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    <span>Need 150+ language support globally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    <span>Require 24/7 phone hotline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    <span>Have complex multi-national operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    <span>Want established enterprise vendor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Save $7,500+/Year?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Get enterprise-grade whistleblowing with modern AI. No enterprise price tag or sales calls required.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100"
              >
                Start Free Trial
              </a>
              <a
                href="mailto:sales@disclosurely.com"
                className="inline-block rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Schedule Demo
              </a>
            </div>
            <p className="mt-4 text-sm text-blue-100">7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </I18nProvider>
  );
}

export default CompareContent;
