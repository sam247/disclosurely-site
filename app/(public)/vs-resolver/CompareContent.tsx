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
        { feature: "Starting Price", disclosurely: "£39.99/month", competitor: "Custom enterprise", winner: "disclosurely" },
        { feature: "Transparent Pricing", disclosurely: "Public pricing", competitor: "Contact for quote", winner: "disclosurely" },
        { feature: "Free Trial", disclosurely: "7 days, instant", competitor: "Custom demo", winner: "disclosurely" },
        { feature: "Best For", disclosurely: "SMB to mid-market", competitor: "Large enterprise", winner: "tie" },
      ],
    },
    {
      category: "Focus & Scope",
      icon: Shield,
      items: [
        { feature: "Platform Focus", disclosurely: "Whistleblowing-first", competitor: "Broad GRC platform", winner: "tie" },
        { feature: "Ease of Use", disclosurely: "Simple, focused", competitor: "Complex, comprehensive", winner: "disclosurely" },
        { feature: "Setup Time", disclosurely: "5 minutes", competitor: "Weeks to months", winner: "disclosurely" },
        { feature: "Risk Management Tools", disclosurely: "Focused on cases", competitor: "Comprehensive GRC", winner: "competitor" },
      ],
    },
    {
      category: "AI & Automation",
      icon: Zap,
      items: [
        { feature: "AI Case Analysis", disclosurely: true, competitor: "Limited", winner: "disclosurely" },
        { feature: "AI Risk Assessment", disclosurely: true, competitor: "Basic AI", winner: "disclosurely" },
        { feature: "AI Chat Support", disclosurely: true, competitor: false, winner: "disclosurely" },
        { feature: "Pattern Detection", disclosurely: true, competitor: "Basic", winner: "disclosurely" },
        { feature: "Assignment Automation", disclosurely: "Advanced rules", competitor: "Basic workflows", winner: "disclosurely" },
        { feature: "SLA Management", disclosurely: "Automated", competitor: "Manual", winner: "disclosurely" },
      ],
    },
    {
      category: "Platform Features",
      icon: Lock,
      items: [
        { feature: "Anonymous Reporting", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Two-Way Messaging", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Custom Branding", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "GDPR Compliance", disclosurely: true, competitor: true, winner: "tie" },
        { feature: "Unlimited Reports", disclosurely: true, competitor: "Based on plan", winner: "disclosurely" },
        { feature: "Session Management", disclosurely: true, competitor: false, winner: "disclosurely" },
      ],
    },
  ];

  return (
    <I18nProvider>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              Disclosurely vs
              <span className="block mt-2 text-blue-600">Resolver</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Purpose-built whistleblowing with modern AI vs. comprehensive GRC platform. Sometimes simpler is better.
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

        {/* Quick Comparison */}
        <div className="bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">£39.99</div>
                <div className="mb-1 font-semibold text-gray-900">Transparent Pricing</div>
                <div className="text-sm text-gray-600">vs Custom enterprise quotes</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">Focused</div>
                <div className="mb-1 font-semibold text-gray-900">Whistleblowing-First</div>
                <div className="text-sm text-gray-600">vs Broad GRC platform</div>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mb-2 text-3xl font-bold text-blue-600">5 min</div>
                <div className="mb-1 font-semibold text-gray-900">Setup Time</div>
                <div className="text-sm text-gray-600">vs Weeks of implementation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Feature-by-Feature Comparison</h2>
              <p className="text-lg text-gray-600">Focused whistleblowing solution vs. comprehensive GRC platform</p>
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
                            <th className="w-1/3 px-6 py-4 text-center text-sm font-semibold text-gray-600">Resolver</th>
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

        {/* Why Choose Section */}
        <div className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">When to Choose Disclosurely Over Resolver</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Whistleblowing-First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Resolver is a broad GRC platform. Disclosurely is purpose-built for whistleblowing. If you just need secure
                    reporting, why pay for features you won&apos;t use?
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Zap className="h-5 w-5 text-green-600" />
                    Modern AI Built-In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI analyzes every case automatically, assesses risk, detects patterns, and provides 24/7 support—capabilities
                    Resolver&apos;s platform doesn&apos;t offer.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    Transparent Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    £39.99/month. No hidden fees, no surprise costs, no enterprise negotiations. Know exactly what you&apos;ll pay
                    before you start.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Get Purpose-Built Whistleblowing</h2>
            <p className="mb-8 text-xl text-blue-100">
              Sometimes you don&apos;t need a comprehensive GRC platform. You just need great whistleblowing software.
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
