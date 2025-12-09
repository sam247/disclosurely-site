"use client";

import React, { useEffect } from "react";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useGeographicalLanguage } from "@/hooks/useGeographicalLanguage";
import { supportedLanguages } from "@/i18n/client";

type Lang = (typeof supportedLanguages)[number];

const termsSections = [
  {
    title: "1. Introduction and Acceptance",
    paragraphs: [
      'These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "you", or "your") and Disclosurely Limited, a company registered in England and Wales with registered office at London, EC1V 2NX, United Kingdom ("Disclosurely", "we", "us", or "our"). By creating an account, accessing, or using the Disclosurely platform and services (collectively, the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are entering into these Terms on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these Terms. If you do not agree to these Terms, you must not use the Service.',
    ],
  },
  {
    title: "2. Definitions",
    paragraphs: [
      'In these Terms: "Customer" means the organisation or individual subscribing to the Service; "Customer Data" means all data, information, and materials submitted, uploaded, or transmitted by Customer or its Authorised Users through the Service; "Authorised Users" means Customer\'s employees, contractors, or agents authorised to use the Service; "Whistleblower" means any individual who submits a report through Customer\'s portal; "Report" means any submission made through the Service; "Subscription Period" means the period for which Customer has subscribed to the Service; "Documentation" means user guides and technical documentation provided by Disclosurely.',
    ],
  },
  {
    title: "3. Service Description and Scope",
    paragraphs: [
      "Disclosurely provides a secure, cloud-based whistleblowing and compliance reporting platform that enables organisations to receive, manage, and investigate reports of misconduct, ethical violations, and other concerns in compliance with applicable laws including the EU Whistleblowing Directive (Directive 2019/1937), GDPR, and UK data protection legislation.",
      "The Service includes: (a) secure anonymous and identified reporting channels; (b) encrypted two-way messaging between Customers and Whistleblowers; (c) case management dashboard and tools; (d) customisable reporting forms and branding; (e) audit trail and compliance reporting; (f) role-based access controls; and (g) such other features as described in the Documentation and made available in your selected subscription plan.",
      "We reserve the right to modify, suspend, or discontinue any feature of the Service with reasonable notice. We will use commercially reasonable efforts to maintain Service availability of 99.5% uptime (excluding scheduled maintenance).",
    ],
  },
  {
    title: "4. Account Registration and Security",
    paragraphs: [
      "To use the Service, you must register for an account and provide accurate, complete, and current information. You agree to maintain and promptly update your account information to keep it accurate and complete.",
      "You are responsible for: (a) maintaining the confidentiality of your login credentials; (b) all activities that occur under your account; (c) ensuring only Authorised Users access the Service; (d) immediately notifying us of any unauthorised access or security breach; and (e) ensuring Authorised Users comply with these Terms.",
      "We reserve the right to suspend or terminate accounts that violate these Terms or pose security risks.",
    ],
  },
  {
    title: "5. Subscription and Payment Terms",
    paragraphs: [
      "Subscription Plans: The Service is provided on a subscription basis according to the plan you select (Starter, Pro, or Enterprise). Features, user limits, and pricing are as described on our website at the time of subscription.",
      "Payment: Subscription fees are payable in advance for the Subscription Period (monthly or annually as selected). All fees are in GBP and exclusive of applicable taxes. You authorise us to charge your payment method on each renewal date. Failure to pay may result in suspension or termination of the Service.",
      "Free Trial: New customers may receive a 7-day free trial. We may require payment information to activate the trial. If you do not cancel before the trial ends, you will be automatically charged for your selected plan.",
      "Price Changes: We may change subscription fees with at least 30 days' notice. Changes will apply from your next renewal date. Continued use after the price change constitutes acceptance.",
      "Refunds: Fees are non-refundable except as required by law or as expressly stated in these Terms. If we terminate for our convenience, we will provide a pro-rata refund.",
    ],
  },
  {
    title: "6. Data Processing and Responsibilities",
    paragraphs: [
      "Controller-Processor Relationship: For Customer Data and Reports, you are the Data Controller and we are the Data Processor as defined under GDPR. We process personal data only according to your documented instructions and our Data Processing Agreement (DPA).",
      "Customer Obligations: You warrant that: (a) you have lawful basis to collect and process data through the Service; (b) you have provided required privacy notices to Whistleblowers and data subjects; (c) your use of the Service complies with all applicable data protection laws; and (d) you have obtained necessary consents where required.",
      "Our Obligations: We will: (a) implement appropriate technical and organisational measures to protect Customer Data; (b) process Customer Data only as instructed by you; (c) assist you in responding to data subject rights requests; (d) notify you of any personal data breaches without undue delay; and (e) make available information necessary to demonstrate compliance.",
      "Data Location: Customer Data is hosted in the European Economic Area (Ireland) using Supabase infrastructure. Data will not be transferred outside the EEA/UK without appropriate safeguards.",
    ],
  },
  {
    title: "7. Customer Obligations and Responsibilities",
    paragraphs: [
      "You agree to: (a) use the Service in compliance with all applicable laws, regulations, and these Terms; (b) not use the Service for any unlawful, fraudulent, or malicious purpose; (c) implement appropriate internal processes for handling Reports received through the Service; (d) maintain confidentiality of Reports and protect Whistleblower identities; (e) not attempt to identify anonymous Whistleblowers; (f) ensure Authorised Users receive appropriate training; (g) promptly investigate Reports in good faith; and (h) not use the Service to infringe third-party rights.",
      "You acknowledge that Disclosurely does not provide legal advice and that you are solely responsible for ensuring your whistleblowing procedures comply with applicable laws.",
    ],
  },
  {
    title: "8. Acceptable Use Policy",
    paragraphs: [
      "You must not: (a) violate any laws or regulations; (b) infringe intellectual property rights; (c) transmit malicious code, viruses, or harmful materials; (d) attempt to gain unauthorised access to the Service or other systems; (e) interfere with or disrupt the Service; (f) use the Service to send spam, unsolicited communications, or harassing content; (g) impersonate any person or entity; (h) use automated means to access the Service except through our official API; (i) reverse engineer, decompile, or disassemble the Service; or (j) remove or modify proprietary notices.",
      "We reserve the right to investigate violations and cooperate with law enforcement authorities. We may suspend or terminate access immediately upon violation.",
    ],
  },
  {
    title: "9. Intellectual Property Rights",
    paragraphs: [
      "Disclosurely Ownership: The Service, including all software, designs, text, graphics, interfaces, trademarks, and other intellectual property, is owned by Disclosurely and protected by copyright, trademark, and other laws. These Terms grant you no ownership rights; only a limited right to use the Service as permitted herein.",
      "Customer Data: You retain all ownership rights in Customer Data. You grant us a limited licence to host, store, process, and transmit Customer Data solely as necessary to provide the Service.",
      "Feedback: If you provide suggestions, ideas, or feedback, we may use them without obligation or compensation to you.",
    ],
  },
  {
    title: "10. Warranties and Disclaimers",
    paragraphs: [
      "Our Warranties: We warrant that: (a) we have the right to provide the Service; (b) the Service will perform materially in accordance with the Documentation; and (c) we will use commercially reasonable efforts to prevent introduction of malicious code.",
      'DISCLAIMER: EXCEPT AS EXPRESSLY STATED, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, SECURITY, OR ACCURACY. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. WE ARE NOT RESPONSIBLE FOR DELAYS, FAILURES, OR DAMAGE RESULTING FROM INTERNET CONNECTIVITY, CUSTOMER SYSTEMS, OR THIRD-PARTY SERVICES.',
      "You acknowledge that no software is free from defects and that you are responsible for implementing backup and business continuity procedures.",
    ],
  },
  {
    title: "11. Limitation of Liability and Indemnification",
    paragraphs: [
      "Liability Cap: TO THE MAXIMUM EXTENT PERMITTED BY LAW, DISCLOSURELY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS, WHETHER IN CONTRACT, TORT, OR OTHERWISE, SHALL NOT EXCEED THE TOTAL FEES PAID BY CUSTOMER IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.",
      "Excluded Damages: IN NO EVENT SHALL DISCLOSURELY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, BUSINESS INTERRUPTION, OR LOSS OF GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      "Exceptions: Nothing in these Terms excludes or limits liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) wilful misconduct; or (d) any other liability that cannot be excluded under applicable law.",
      "Customer Indemnification: You agree to indemnify, defend, and hold harmless Disclosurely from claims, damages, losses, and expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) your violation of applicable laws; (c) Customer Data or your use of the Service; (d) claims that your use infringes third-party rights; or (e) Whistleblower claims related to your internal processes and investigations.",
    ],
  },
  {
    title: "12. Term, Termination, and Suspension",
    paragraphs: [
      "Term: These Terms commence when you first access the Service and continue for the Subscription Period, automatically renewing unless terminated.",
      "Termination by Customer: You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period. No refunds will be provided for partial periods.",
      "Termination by Disclosurely: We may terminate or suspend your account: (a) immediately if you breach these Terms; (b) immediately for non-payment after 15 days' notice; (c) with 30 days' notice for convenience; or (d) immediately if required by law or if your use poses security or legal risks.",
      "Effect of Termination: Upon termination: (a) your right to access the Service immediately ceases; (b) we will cease processing Customer Data; (c) you remain liable for all fees incurred before termination; and (d) provisions that by nature should survive will survive termination.",
      "Data Export and Deletion: Before termination, you may export Customer Data using available tools. Following termination, we will retain Customer Data for 30 days, after which it will be permanently deleted unless longer retention is required by law. We may retain aggregated, anonymised data for analytical purposes.",
    ],
  },
  {
    title: "13. Confidentiality",
    paragraphs: [
      "Confidential Information includes non-public information disclosed by one party to the other, including technical data, business strategies, pricing, and Customer Data. The receiving party must: (a) maintain confidentiality using at least reasonable care; (b) use Confidential Information only for purposes of these Terms; and (c) not disclose except to employees or contractors with a need to know.",
      "Exceptions: Confidentiality obligations do not apply to information that: (a) is or becomes publicly available without breach; (b) was rightfully possessed before disclosure; (c) is independently developed; or (d) must be disclosed by law (with notice if permitted).",
    ],
  },
  {
    title: "14. Regulatory Compliance",
    paragraphs: [
      "The Service is designed to assist with compliance with the EU Whistleblowing Directive (2019/1937), GDPR, UK GDPR, Data Protection Act 2018, and related regulations. However, you are solely responsible for ensuring your use of the Service and your internal procedures comply with all applicable laws in your jurisdiction.",
      "We will maintain appropriate security certifications and comply with our obligations as a Data Processor. We will notify you of any material changes to our compliance posture.",
      "Export Controls: The Service may be subject to UK and international export controls. You must comply with all applicable export and trade sanctions laws.",
    ],
  },
  {
    title: "15. Modifications to Terms",
    paragraphs: [
      "We may modify these Terms from time to time. Material changes will be notified by email or through the Service at least 30 days before taking effect. Non-material changes (e.g., clarifications, corrections) may take effect immediately upon posting.",
      "Your continued use of the Service after changes take effect constitutes acceptance. If you do not agree to changes, you may terminate your subscription before the changes take effect.",
    ],
  },
  {
    title: "16. Dispute Resolution and Governing Law",
    paragraphs: [
      "Governing Law: These Terms are governed by the laws of England and Wales, without regard to conflict of law principles.",
      "Jurisdiction: Subject to the arbitration clause below, the courts of England and Wales have exclusive jurisdiction over disputes arising from these Terms.",
      "Informal Resolution: Before initiating formal proceedings, parties agree to attempt good faith informal resolution for at least 30 days by contacting support@disclosurely.com.",
      "Arbitration: For disputes not resolved informally, either party may elect binding arbitration under LCIA (London Court of International Arbitration) Rules. Arbitration will be conducted in English in London. Each party bears its own costs unless the arbitrator awards costs.",
    ],
  },
  {
    title: "17. General Provisions",
    paragraphs: [
      "Entire Agreement: These Terms, together with our Privacy Policy and DPA, constitute the entire agreement regarding the Service and supersede all prior agreements and understandings.",
      "Assignment: You may not assign these Terms without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets with notice to you.",
      "Severability: If any provision is found unenforceable, the remaining provisions remain in effect and the unenforceable provision will be modified to reflect the parties' intent.",
      "Waiver: Failure to enforce any provision does not constitute a waiver. Waivers must be in writing.",
      "Force Majeure: Neither party is liable for delays or failures due to causes beyond reasonable control, including acts of God, war, terrorism, pandemics, internet failures, or government actions.",
      "Notices: Notices must be sent to the email address associated with your account (for Customer) or to legal@disclosurely.com (for Disclosurely). Notices are deemed received 24 hours after sending.",
      "Third-Party Rights: No third party has rights to enforce these Terms under the Contracts (Rights of Third Parties) Act 1999.",
      "Relationship: The parties are independent contractors. These Terms do not create a partnership, joint venture, or agency relationship.",
    ],
  },
  {
    title: "18. Contact Information",
    paragraphs: [
      "For questions about these Terms, please contact us at: legal@disclosurely.com or Disclosurely Limited, London, EC1V 2NX, United Kingdom. For technical support, contact support@disclosurely.com.",
    ],
  },
];

function TermsContent() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageFromUrl();
  useGeographicalLanguage();

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang as Lang);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage, i18n]);

  return (
    <I18nProvider>
      <div className="bg-white">
        <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Terms of Service
            </span>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Terms &amp; Conditions</h1>
            <p className="text-lg text-gray-600">
              These terms govern your use of Disclosurely&apos;s whistleblowing and compliance platform.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {termsSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">{section.title}</h2>
                <div className="space-y-3 text-gray-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-center text-sm text-gray-500">Last updated: November 2025</p>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default TermsContent;

