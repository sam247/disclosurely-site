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
        { feature: "Starting Price", disclosurely: "£39.99/month", competitor: "$99+/month", winner: "disclosurely" },
        { feature: "Annual Savings", disclosurely: "Save $708+/year", competitor: "More expensive", winner: "disclosurely" },
        { feature: "Transparent Pricing", disclosurely: "Public pricing", competitor: "Contact for quote", winner: "disclosurely" },
        { feature: "Free Trial", disclosurely: "7 days", competitor: "Custom demo", winner: "disclosurely" },
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
        { feature: "Automated Assignment Rules", disclosurely: true, competitor: "Basic workflows", winner: "disclosurely" },
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
        { feature: "ISO 27701 Certified", disclosurely: false, competitor: true, winner: "competitor" },
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
        { feature: "Phone Hotline", disclosurely: false, competitor: true, winner: "competitor" },
      ],
    },
    {
      category: "Language & Global",
      icon: Globe,
      items: [
        { feature: "Languages Supported", disclosurely: "40+ languages", competitor: "70+ languages", winner: "competitor" },
        { feature: "AI Voice Reporting", disclosurely: false, competitor: true, winner: "competitor" },
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
        { feature: "Assignment Automation", disclosurely: "Advanced rules", competitor: "Basic workflows", winner: "disclosurely" },
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
              <span className="text-sm font-semibold text-green-900">Save $708+ per year</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Disclosurely vs
              <span className="block mt-2 text-blue-600">SpeakUp</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Get AI-powered case analysis, transparent pricing, and advanced automation—without the enterprise price tag.
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
                <div className="mb-2 text-3xl font-bold text-blue-600">60%</div>
                <div className="mb-1 font-semibold text-gray-900">Lower Cost</div>
                <div className="text-sm text-gray-600">£39.99/mo vs $99+/mo</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">Transparent</div>
                <div className="mb-1 font-semibold text-gray-900">Public Pricing</div>
                <div className="text-sm text-gray-600">No need to contact sales</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">6+</div>
                <div className="mb-1 font-semibold text-gray-900">Exclusive AI Features</div>
                <div className="text-sm text-gray-600">Not available in SpeakUp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison by Category */}
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Feature-by-Feature Comparison</h2>
              <p className="text-lg text-gray-600">See exactly how Disclosurely compares to SpeakUp across all key areas</p>
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
                            <th className="w-1/3 px-6 py-4 text-center text-sm font-semibold text-gray-600">SpeakUp</th>
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
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Teams Choose Disclosurely Over SpeakUp</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Zap className="h-5 w-5 text-blue-600" />
                    AI-Powered Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Exclusive AI features that automatically analyze cases, assess risk, detect patterns, and provide 24/7 chat
                    support.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>AI analyzes every case automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Risk scores with reasoning</span>
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
                    Transparent Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Clear, public pricing at £39.99/month vs SpeakUp&apos;s hidden costs requiring sales contact. Save over
                    $700/year.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>60% lower monthly cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>No surprise add-on fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Start trial without sales call</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Advanced Automation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Sophisticated assignment rules and SLA management that go beyond SpeakUp&apos;s basic workflows.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Multi-condition assignment rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Automated SLA tracking & alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>Smart escalation workflows</span>
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
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Easy Migration from SpeakUp</h2>
            <p className="mb-8 text-lg text-gray-600">Switch in days with our white-glove migration service. Zero downtime, zero hassle.</p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">1</div>
                <h3 className="mb-2 font-semibold text-gray-900">Data Export</h3>
                <p className="text-sm text-gray-600">We securely extract all your historical cases and data from SpeakUp</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">2</div>
                <h3 className="mb-2 font-semibold text-gray-900">Setup & Configuration</h3>
                <p className="text-sm text-gray-600">Configure Disclosurely with your branding and import all data</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-2 text-2xl font-bold text-blue-600">3</div>
                <h3 className="mb-2 font-semibold text-gray-900">Training & Go-Live</h3>
                <p className="text-sm text-gray-600">Comprehensive team training and dedicated onboarding support</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Save $708+/Year?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Get AI-powered case analysis, transparent pricing, and better automation. No sales call required.
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
