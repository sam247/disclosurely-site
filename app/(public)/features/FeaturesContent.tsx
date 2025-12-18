"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Brain,
  BarChart3,
  CheckCircle,
  Smartphone,
  Plug,
  Lock,
  FileText,
  Users,
  HardDrive,
  Activity,
  TrendingUp,
  Upload,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { supportedLanguages } from "@/i18n/client";
import I18nProvider from "@/components/I18nProvider";

type Lang = (typeof supportedLanguages)[number];

function FeaturesContent() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage]);

  return (
    <I18nProvider>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              Anonymous Reporting Platform
            </span>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                Powerful Features for Anonymous Reporting
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              From encrypted submissions to real-time dashboards, Disclosurely gives compliance teams the tools they
              need to manage reports efficiently, protect employee identities, and resolve issues before they escalate.
            </p>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose Disclosurely Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg md:p-12">
            <h3 className="mb-8 text-center text-2xl font-bold md:text-3xl">{t("pricing.benefits.title")}</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat1.title")}</div>
                <div className="text-sm text-blue-100">{t("pricing.benefits.stat1.description")}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat2.title")}</div>
                <div className="text-sm text-blue-100">{t("pricing.benefits.stat2.description")}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="mb-1 text-xl font-semibold">{t("pricing.benefits.stat3.title")}</div>
                <div className="text-sm text-blue-100">{t("pricing.benefits.stat3.description")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="rounded-2xl bg-white p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Anonymous by Default</h3>
              <p className="text-gray-600">
                Every submission is encrypted end-to-end with zero-knowledge architecture. Employees can report concerns
                without revealing their identity, giving them confidence to speak up.
              </p>
            </Card>

            <Card className="rounded-2xl bg-white p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Real-Time Insights</h3>
              <p className="text-gray-600">
                Track case progress, monitor trends, and identify patterns with comprehensive dashboards. Make
                data-driven decisions with AI-powered risk assessment.
              </p>
            </Card>

            <Card className="rounded-2xl bg-white p-8 text-center transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Compliance Ready</h3>
              <p className="text-gray-600">
                Built for GDPR, SOX, ISO 27001, and more. Automated compliance reporting and audit trails ensure
                you&apos;re always ready for regulatory inspections.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Comprehensive Dashboard</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Get a complete view of all whistleblowing reports in one centralized workspace. Our intuitive dashboard gives compliance teams real-time visibility into case status, priorities, and trends, making it easy to manage multiple reports efficiently and ensure nothing falls through the cracks.
            </p>
          </div>

          <Card className="rounded-lg bg-white p-8 shadow-2xl">
            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <FileText className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">9</div>
                    <div className="text-sm text-gray-600">Active Reports</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">9</div>
                    <div className="text-sm text-gray-600">Active Cases</div>
                    <div className="mt-1 text-xs text-green-600">↗ +2 this week</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Archived Reports</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Table Preview */}
            <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
              <div className="flex flex-col border-b border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Reports Overview</h3>
                  <p className="text-xs text-gray-600 sm:text-sm">Manage and review all submitted reports</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
                    Active Reports (9)
                  </div>
                  <div className="rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 sm:px-4 sm:py-2 sm:text-sm">
                    Archived (0)
                  </div>
                </div>
              </div>
              <div className="-mx-4 overflow-x-auto sm:mx-0">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                        Tracking ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                        Title
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                        Status
                      </th>
                      <th className="hidden px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 lg:table-cell">
                        Category
                      </th>
                      <th className="hidden px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 md:table-cell">
                        Assigned To
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-4 text-xs font-medium text-gray-900 sm:px-6 sm:text-sm">DIS-YU3Z4XJ9</td>
                      <td className="max-w-[200px] truncate px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                        Financial Issues With Department Head
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 sm:px-6">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                          investigating
                        </span>
                      </td>
                      <td className="hidden px-3 py-4 sm:px-6 lg:table-cell">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                          Financial Misconduct
                        </span>
                      </td>
                      <td className="hidden px-3 py-4 text-xs text-gray-600 sm:px-6 sm:text-sm md:table-cell">
                        admin@...
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-600 sm:px-6 sm:text-sm">23/10/2025</td>
                      <td className="whitespace-nowrap px-3 py-4 sm:px-6">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-900 sm:text-sm">View</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-4 text-xs font-medium text-gray-900 sm:px-6 sm:text-sm">DIS-5M0B79BF</td>
                      <td className="max-w-[200px] truncate px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                        Discrimination in Promotion Decisions
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 sm:px-6">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                          investigating
                        </span>
                      </td>
                      <td className="hidden px-3 py-4 sm:px-6 lg:table-cell">
                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                          Discrimination
                        </span>
                      </td>
                      <td className="hidden px-3 py-4 text-xs text-gray-600 sm:px-6 sm:text-sm md:table-cell">Unassigned</td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-600 sm:px-6 sm:text-sm">23/10/2025</td>
                      <td className="whitespace-nowrap px-3 py-4 sm:px-6">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-900 sm:text-sm">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
                  <p className="mb-3 text-gray-600">
                    Get instant analysis on case patterns, risk assessment, and compliance trends with our DeepSeek AI
                    integration.
                  </p>
                  <div className="flex gap-3">
                    <Badge className="bg-blue-100 text-blue-700">Risk Analysis</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Category Trends</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Response Time Insights</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Decision-Ready Analytics</h2>
              <p className="mb-4 text-lg text-gray-600">
                Transform raw whistleblowing data into actionable insights with comprehensive analytics and AI-powered recommendations. Track key performance indicators, identify emerging patterns, and make data-driven decisions that improve your compliance program effectiveness.
              </p>
              <p className="mb-8 text-gray-600">
                Our analytics dashboard surfaces critical metrics like resolution rates, average response times, and category distributions, helping you understand organizational risk trends and allocate resources where they're needed most.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <BarChart3 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Performance Metrics</h3>
                    <p className="text-gray-600">Track resolution rates, response times, and escalation metrics in real-time</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Report Trends</h3>
                    <p className="text-gray-600">Identify patterns and spikes in submissions with visual trend analysis</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Category Distribution</h3>
                    <p className="text-gray-600">Visual breakdown of report types to understand organizational risks</p>
                  </div>
                </li>
              </ul>
            </div>
            <Card className="rounded-lg bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-700" />
                      <span className="text-sm text-gray-600">Total Reports</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">9</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Active Cases</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">9</div>
                    <div className="mt-1 text-xs text-green-600">↗ Trending up</div>
                  </div>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-600">Resolution Rate</span>
                          <span className="font-semibold">0%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full bg-gray-400" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-600">Escalation Rate</span>
                          <span className="font-semibold">11.1%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full bg-blue-500" style={{ width: "11%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                      <Brain className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-gray-900">AI Insight</h4>
                      <p className="text-sm text-gray-700">Low Resolution Rate - Consider additional resources or training</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Audit Trail Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Card className="order-2 rounded-lg bg-white p-8 shadow-lg lg:order-1">
              <div className="space-y-4">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
                    <p className="text-sm text-gray-600">Comprehensive system-wide audit log</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700">Refresh</button>
                    <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700">Export</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-xs text-gray-500">2025-10-25 17:44:15</span>
                      <Badge className="bg-green-100 text-green-700">Low</Badge>
                    </div>
                    <div className="mb-1 text-sm font-semibold text-gray-900">Organization sent message</div>
                    <div className="text-xs text-gray-600">report.message_sent • sam@betterranking.co.uk</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-xs text-gray-500">2025-10-24 09:35:22</span>
                      <Badge className="bg-orange-100 text-orange-700">Medium</Badge>
                    </div>
                    <div className="mb-1 text-sm font-semibold text-gray-900">Team member invited</div>
                    <div className="text-xs text-gray-600">user.invite • sam@betterranking.co.uk</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-xs text-gray-500">2025-10-24 09:28:26</span>
                      <Badge className="bg-red-100 text-red-700">High</Badge>
                    </div>
                    <div className="mb-1 text-sm font-semibold text-gray-900">User role revoked</div>
                    <div className="text-xs text-gray-600">role_management • system</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm text-gray-600">Showing 1-25 of 114 records</span>
                  <div className="flex gap-2">
                    <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700">1</button>
                    <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700">2</button>
                    <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700">3</button>
                  </div>
                </div>
              </div>
            </Card>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Comprehensive Audit Trail</h2>
              <p className="mb-4 text-lg text-gray-600">
                Every action taken within Disclosurely is automatically logged with cryptographic verification, creating an immutable record that meets the highest compliance standards. Our tamper-evident audit trail ensures complete transparency and accountability for regulatory inspections, internal reviews, and legal proceedings.
              </p>
              <p className="mb-8 text-gray-600">
                Track user actions, case updates, message exchanges, and system changes with detailed timestamps, user identification, and severity classifications. Export complete audit logs in standard formats for external auditors, regulators, or legal teams.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Chain Verified</h3>
                    <p className="text-gray-600">Cryptographic verification of all audit records</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Severity Levels</h3>
                    <p className="text-gray-600">
                      Color-coded severity indicators (Low, Medium, High) for quick assessment
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Event Categories</h3>
                    <p className="text-gray-600">Organized by case management, user management, and security</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Case Helper Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">AI-Powered Case Analysis</h2>
              <p className="mb-4 text-lg text-gray-600">
                Leverage advanced artificial intelligence to analyze whistleblowing cases, identify risk patterns, and receive actionable recommendations. Our AI assistant reviews case details, company policies, and historical data to provide intelligent risk assessments and prioritization guidance.
              </p>
              <p className="mb-8 text-gray-600">
                Upload company handbooks, policies, and relevant documents to enable context-aware analysis. The AI considers your organization's specific compliance requirements, industry standards, and regulatory obligations when providing insights and recommendations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Brain className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Intelligent Risk Assessment</h3>
                    <p className="text-gray-600">AI evaluates case complexity and assigns risk levels automatically</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Document Analysis</h3>
                    <p className="text-gray-600">
                      Upload company handbooks, policies, and documents for context-aware analysis
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Pattern Recognition</h3>
                    <p className="text-gray-600">Identify trends across multiple cases with advanced pattern matching</p>
                  </div>
                </li>
              </ul>
            </div>
            <Card className="rounded-lg bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Brain className="h-5 w-5 text-blue-600" />
                      AI Case Analysis
                    </h3>
                    <Badge className="bg-blue-600 text-white">∞ Credits</Badge>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    Select a new case and upload company documents for AI-powered analysis
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Select New Case</label>
                      <select
                        className="pointer-events-none w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                        disabled
                      >
                        <option>Choose a new case</option>
                        <option>DIS-YU3Z4XJ9 - Financial Issues</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Company Documents</label>
                      <button
                        className="pointer-events-none flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white"
                        disabled
                      >
                        <Upload className="h-4 w-4" />
                        Upload Files
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="mb-2 text-lg font-semibold text-gray-900">No Analysis Yet</h4>
                    <p className="mb-4 text-sm text-gray-600">
                      Select a case and click &quot;Analyze Case&quot; to get started. You can ask specific questions or leave
                      blank for general analysis.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Essential Features Section from Compliance Page */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Essential Features of Effective Compliance Software
            </h2>
            <p className="mx-auto max-w-4xl text-xl text-gray-600">
              Disclosurely provides everything you need for secure, compliant whistleblowing
            </p>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Secure Anonymous Reporting Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-gray-600">
                  Multiple reporting options protect whistleblowers regardless of location or device:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Web forms, mobile apps, phone lines, SMS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>End-to-end encryption (ISO 27001, SOC Type II)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>True anonymity throughout investigation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Two-Way Anonymous Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-gray-600">
                  Investigators can ask follow-up questions without revealing identity:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Secure messaging with unique case numbers and PINs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Keeps whistleblowers engaged and informed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Maintains anonymity while gathering evidence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multi-Language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-gray-600">Global organisations need global support:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Reporting in 35+ languages via ML and translation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Every employee can report in their native language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Critical for multinational operations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">GDPR-Compliant Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-gray-600">Enterprise-grade security built-in:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Encrypted data storage in certified facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Automated retention period management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span>Full audit trail for regulatory compliance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Sign-Off Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Built for Compliance Teams Who Care About Details
            </h2>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-gray-600">
              Disclosurely isn&apos;t just a platform—it&apos;s your partner in building a culture of integrity. Every feature is
              designed with your compliance team&apos;s workflow in mind, from encrypted submissions to comprehensive audit
              trails.
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-gray-600">
              Whether you're managing a handful of reports or hundreds of cases, our platform scales with your needs while maintaining the same high standards for security, anonymity, and compliance. Join organizations worldwide who trust Disclosurely to protect their employees and maintain regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Military-Grade Security</h3>
              <p className="text-gray-600">
                AES-GCM encryption ensures your data is protected at all times, with zero-knowledge architecture so even
                we can&apos;t access your submissions.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                DeepSeek AI identifies risk patterns and provides actionable insights, helping you resolve issues faster
                and make data-driven compliance decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Team Collaboration</h3>
              <p className="text-gray-600">
                Role-based access control and team assignments ensure the right people see the right information, while
                maintaining complete confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Start your free trial today and experience the power of our comprehensive whistleblowing platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://app.disclosurely.com/auth/signup"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Start Free Trial
            </Link>
            <Link
              href={`${langPrefix}/pricing`}
              className="inline-flex items-center rounded-lg border border-blue-500 bg-blue-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

          </div>
    </I18nProvider>
  );
}

export default FeaturesContent;
