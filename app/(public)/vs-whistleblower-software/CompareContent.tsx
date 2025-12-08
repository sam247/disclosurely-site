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
        { feature: "Starting Price", disclosurely: "£39.99/month (~€47)", competitor: "€70/month", winner: "disclosurely" },
        { feature: "Annual Savings", disclosurely: "Save €276/year", competitor: "More expensive", winner: "disclosurely" },
        { feature: "Free Trial", disclosurely: "7 days", competitor: "14 days", winner: "disclosurely" },
        { feature: "Setup Complexity", disclosurely: "5 minutes", competitor: "45 minutes", winner: "disclosurely" },
      ],
    },
    {
      category: "AI & Automation",
      icon: Zap,
      items: [
        { feature: "AI Case Analysis", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "AI Risk Assessment", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "AI Chat Support", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Pattern Detection", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Automated Workflows", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "SLA Management", disclosurely: true, competitor: false, winner: "disclosurely" },
      ],
    },
    {
      category: "Security & Compliance",
      icon: Lock,
      items: [
        { feature: "End-to-End Encryption", disclosurely: "AES-256-GCM", competitor: "ISAE 3000", winner: "tie" },
        { feature: "GDPR Compliant", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "ISO 27001 Certified", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "EU Data Residency", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Zero-Knowledge Architecture", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Session Management", disclosurely: true, competitor: false, winner: "disclosurely" },
      ],
    },
    {
      category: "Platform Features",
      icon: Shield,
      items: [
        { feature: "Unlimited Reports", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Unlimited Storage", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Two-Way Messaging", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Custom Branding", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Custom Domain (CNAME)", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Mobile Optimized", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Real-time Analytics", disclosurely: true, competitor: false, winner: "disclosurely" },
      ],
    },
    {
      category: "Language & Global",
      icon: Globe,
      items: [
        { feature: "Languages Supported", disclosurely: "40+ languages", competitor: "80+ languages", winner: "competitor" },
        { feature: "Auto Translation", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Multi-Region Support", disclosurely: true, competitor: true, winner: "tie" },
      ],
    },
    {
      category: "Team & Collaboration",
      icon: Users,
      items: [
        { feature: "Team Members", disclosurely: "Unlimited (Pro)", competitor: "Based on plan", winner: "disclosurely" },
        { feature: "Role-Based Access", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Assignment Rules", disclosurely: "Automated", competitor: "Manual", winner: "disclosurely" },
        { feature: "Case Escalation", disclosurely: "Automated SLA", competitor: "Manual", winner: "disclosurely" },
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
              <span className="text-sm font-semibold text-green-900">Save €276 per year</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Disclosurely vs
              <span className="block mt-2 text-blue-600">WhistleblowerSoftware.com</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Get more features, including AI case analysis, for 40% less. Setup in 5 minutes instead of 45.
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
                <div className="mb-2 text-3xl font-bold text-blue-600">40%</div>
                <div className="mb-1 font-semibold text-gray-900">Lower Cost</div>
                <div className="text-sm text-gray-600">£39.99/mo vs €70/mo</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">5 min</div>
                <div className="mb-1 font-semibold text-gray-900">Setup Time</div>
                <div className="text-sm text-gray-600">vs 45 minutes for competitors</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">6+</div>
                <div className="mb-1 font-semibold text-gray-900">Exclusive AI Features</div>
                <div className="text-sm text-gray-600">Not available elsewhere</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison by Category */}
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Feature-by-Feature Comparison</h2>
              <p className="text-lg text-gray-600">See exactly how Disclosurely compares across all key areas</p>
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
                            <th className="w-1/3 px-6 py-4 text-center text-sm font-semibold text-gray-600">
                              WhistleblowerSoftware
                            </th>
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
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Teams Are Switching to Disclosurely</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Exclusive AI Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    AI case analysis, risk assessment, pattern detection, and chat support—features not available in
                    WhistleblowerSoftware.com.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>AI analyzes cases automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Risk scores assigned instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Pattern detection across reports</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Better Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Save €276 per year with Disclosurely&apos;s £39.99/month pricing vs €70/month for
                    WhistleblowerSoftware.com.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>40% lower monthly cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>More features included</span>
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
                    <Shield className="h-5 w-5 text-purple-600" />
                    Superior Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    ISO 27001 certified with zero-knowledge architecture and session management for maximum security.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Zero-knowledge encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Multi-session detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Advanced audit trails</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Migration Section */}
        <div className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Easy Migration from WhistleblowerSoftware.com
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Switch in days, not weeks. Our team handles the entire migration process with zero downtime.
            </p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">1</div>
                <h3 className="mb-2 font-semibold text-gray-900">Data Export</h3>
                <p className="text-sm text-gray-600">We securely export all your cases and historical data</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">2</div>
                <h3 className="mb-2 font-semibold text-gray-900">Setup & Import</h3>
                <p className="text-sm text-gray-600">Configure Disclosurely and import all data within hours</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">3</div>
                <h3 className="mb-2 font-semibold text-gray-900">Team Training</h3>
                <p className="text-sm text-gray-600">Free training and dedicated support for your team</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Save €276/Year?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Get more features, better security, and AI-powered insights for 40% less. Start your free trial today.
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
