"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Key,
  Server,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Cloud,
  Database,
  Eye,
  Fingerprint,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

function SecurityContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) i18n.changeLanguage(lang as Lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [currentLanguage, i18n]);

  const securityFeatures = [
    {
      icon: Lock,
      title: "AES-256-GCM Encryption",
      description:
        "Military-grade encryption for all data at rest and in transit. Same encryption used by governments and financial institutions.",
    },
    {
      icon: Key,
      title: "Zero-Knowledge Architecture",
      description:
        "We cannot decrypt your reports. Only authorized users in your organization with proper permissions can access submitted reports.",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "Reports are encrypted on the whistleblower's device before transmission. Decrypted only within your organization's secure environment.",
    },
    {
      icon: Fingerprint,
      title: "Multi-Factor Authentication",
      description: "Required for all admin accounts. Additional security layer to prevent unauthorized access to reports.",
    },
    {
      icon: Eye,
      title: "Role-Based Access Control",
      description:
        "Granular permissions ensure only authorized team members can view specific reports. Full audit trail of all access.",
    },
    {
      icon: Server,
      title: "Secure Cloud Infrastructure",
      description:
        "Hosted on enterprise-grade cloud infrastructure with 99.99% uptime SLA. Regular security audits and penetration testing.",
    },
    {
      icon: Database,
      title: "Encrypted Backups",
      description:
        "Automated encrypted backups stored in geographically distributed locations. Disaster recovery tested quarterly.",
    },
    {
      icon: FileCheck,
      title: "Tamper-Evident Audit Logs",
      description:
        "Cryptographic chain verification ensures audit logs cannot be modified. Complete transparency for compliance.",
    },
    {
      icon: Globe,
      title: "GDPR & Data Residency",
      description:
        "Full GDPR compliance with EU data residency options. Right to deletion, data portability, and access controls.",
    },
  ];

  const certifications = [
    { name: "ISO 27001", description: "Information Security Management", status: "In Progress" },
    { name: "SOC 2 Type II", description: "Security, Availability, Confidentiality", status: "In Progress" },
    { name: "GDPR", description: "General Data Protection Regulation", status: "Compliant" },
    { name: "HIPAA", description: "Health Insurance Portability and Accountability Act", status: "Compliant" },
  ];

  const dataProtection = [
    {
      category: "Data Collection",
      practices: [
        "Minimal data collection - only what's necessary for reporting",
        "Anonymous submissions supported by default",
        "Optional contact information stored separately from report content",
        "No tracking cookies or analytics on public reporting forms",
      ],
    },
    {
      category: "Data Storage",
      practices: [
        "All data encrypted at rest using AES-256-GCM",
        "Encryption keys managed in secure hardware security modules (HSMs)",
        "Database backups encrypted and geographically distributed",
        "EU data residency available for GDPR compliance",
      ],
    },
    {
      category: "Data Access",
      practices: [
        "Role-based access controls limit who can view reports",
        "Multi-factor authentication required for all admin accounts",
        "All access logged with tamper-evident audit trails",
        "Automatic session timeout after 30 minutes of inactivity",
      ],
    },
    {
      category: "Data Retention",
      practices: [
        "Customizable retention policies per organization",
        "Automatic deletion after retention period expires",
        "Secure deletion using cryptographic erasure",
        "Right to deletion honored within 30 days for GDPR",
      ],
    },
  ];

  return (
    <I18nProvider>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-white px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">Security & Trust Center</h1>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Your security is our priority. Learn how we protect whistleblower anonymity with military-grade encryption,
                zero-knowledge architecture, and industry-leading security practices.
              </p>
            </div>
          </div>
        </section>

        {/* Security Highlights */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">AES-256-GCM Encryption</h3>
                <p className="text-gray-600">
                  Military-grade encryption protects all data at rest and in transit. Same standard used by banks and
                  governments.
                </p>
              </Card>

              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Zero-Knowledge Architecture</h3>
                <p className="text-gray-600">
                  We cannot decrypt your reports. Only authorized users in your organization can access submitted reports.
                </p>
              </Card>

              <Card className="p-8 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">GDPR Compliant</h3>
                <p className="text-gray-600">
                  Full compliance with GDPR, HIPAA, SOX, and other major privacy and security regulations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Comprehensive Security Features</h2>
              <p className="text-lg text-gray-600">Enterprise-grade security designed to protect whistleblower anonymity</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications & Compliance */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Certifications & Compliance</h2>
              <p className="text-lg text-gray-600">Meeting industry-leading security and compliance standards</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    {cert.status === "Compliant" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{cert.name}</h3>
                  <p className="mb-3 text-sm text-gray-600">{cert.description}</p>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      cert.status === "Compliant" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {cert.status}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Data Protection Practices */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Data Protection Practices</h2>
              <p className="text-lg text-gray-600">How we collect, store, and protect your sensitive data</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {dataProtection.map((section, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 text-blue-600" />
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-gray-600">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Enterprise-Grade Infrastructure</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Built on world-class cloud infrastructure with 99.99% uptime SLA. Your data is secure, available, and
                  protected against disasters.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Cloud className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-gray-900">Global CDN</div>
                      <div className="text-gray-600">Fast, secure access from anywhere in the world</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-gray-900">Encrypted Backups</div>
                      <div className="text-gray-600">Automated backups stored in multiple geographic regions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-gray-900">DDoS Protection</div>
                      <div className="text-gray-600">Advanced protection against distributed denial of service attacks</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <FileCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-gray-900">Regular Audits</div>
                      <div className="text-gray-600">Quarterly penetration testing and security audits</div>
                    </div>
                  </li>
                </ul>
              </div>
              <Card className="border-2 border-gray-200 bg-white p-8">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Security Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Uptime</span>
                      <span className="font-bold text-blue-600">99.99%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600" style={{ width: "99.99%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Encryption Strength</span>
                      <span className="font-bold text-green-600">256-bit</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-green-600" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Response Time</span>
                      <span className="font-bold text-blue-600">&lt;200ms</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-blue-600" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Security Score</span>
                      <span className="font-bold text-green-600">A+</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-green-600" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Responsible Disclosure */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-2 border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">Responsible Disclosure Program</h3>
                  <p className="mb-4 text-gray-600">
                    We welcome security researchers to help us maintain the highest security standards. If you discover a
                    security vulnerability, please email us at{" "}
                    <a href="mailto:security@disclosurely.com" className="text-blue-600 hover:underline">
                      security@disclosurely.com
                    </a>
                    .
                  </p>
                  <p className="text-gray-600">
                    We commit to acknowledging all security reports within 24 hours and providing regular updates on
                    remediation progress.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Security You Can Trust</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Protect your whistleblowers with military-grade encryption and zero-knowledge architecture. Start your free
              trial today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://app.disclosurely.com/auth/signup"
                className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Start Free Trial
              </a>
              <Link
                href={`${langPrefix}/contact`}
                className="inline-flex items-center rounded-lg border border-blue-500 bg-blue-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default SecurityContent;
