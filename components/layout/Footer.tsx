import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { useLanguageFromUrl } from '@/hooks/useLanguageFromUrl';

export function Footer() {
  const { langPrefix } = useLanguageFromUrl();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <div className="mb-4 flex items-center space-x-3">
              <Image
                src="/lovable-uploads/416d39db-53ff-402e-a2cf-26d1a3618601.png"
                alt="Disclosurely"
                width={180}
                height={56}
                className="h-7 w-auto"
              />
            </div>
            <p className="mb-4 text-gray-400">
              Secure whistleblowing platform for organizations. Anonymous reporting, end-to-end encryption, and
              compliance features.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${langPrefix}/features`} className="text-gray-400 transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/pricing`} className="text-gray-400 transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/industries`} className="text-gray-400 transition-colors hover:text-white">
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href={`${langPrefix}/compliance-software`}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Compliance Software
                </Link>
              </li>
              <li>
                <a
                  href="https://status.disclosurely.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  System Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${langPrefix}/about`} className="text-gray-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/careers`} className="text-gray-400 transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/blog`} className="text-gray-400 transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/contact`} className="text-gray-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${langPrefix}/faq`} className="text-gray-400 transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.disclosurely.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Documentation
                </a>
              </li>
              <li>
                <Link href={`${langPrefix}/security`} className="text-gray-400 transition-colors hover:text-white">
                  Security & Trust
                </Link>
              </li>
              <li>
                <Link
                  href={`${langPrefix}/whistleblowing-directive`}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  EU Whistleblowing Directive
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/privacy`} className="text-gray-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/terms`} className="text-gray-400 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">© 2025 Disclosurely. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/company/disclosurely"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Disclosurely on LinkedIn"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com/disclosurely"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Disclosurely on Facebook"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com/disclosurely"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Disclosurely on Instagram"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

