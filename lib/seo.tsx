import React from "react";
import type { Metadata } from "next";
import { generateHreflangAlternates } from "./hreflang";
import { fetchSEOPageData, fetchGlobalSEOData, type SEOData, type GlobalSEOData } from "./contentful-seo";
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateArticleSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  type StructuredDataOptions,
} from "./structured-data";

const BASE_URL = "https://disclosurely.com";
const DEFAULT_OG_IMAGE = "https://images.ctfassets.net/rm7hib748uv7/7xYMw12dKqxkDUPMFQgmpR/c78422d28e231aa14167c2a1c1702068/Screenshot_2025-11-02_at_18.09.30.png";

export interface GenerateMetadataOptions {
  pagePath: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackImage?: string;
  structuredData?: any;
  keywords?: string[];
  noindex?: boolean;
  canonicalUrl?: string;
}

/**
 * Generate comprehensive Next.js metadata for a page
 * Supports Contentful-driven SEO with fallbacks
 */
export async function generatePageMetadata(options: GenerateMetadataOptions): Promise<Metadata> {
  const { pagePath, fallbackTitle, fallbackDescription, fallbackImage, structuredData, keywords, noindex, canonicalUrl } = options;

  // Fetch SEO data from Contentful (with caching)
  const [seoData, globalData] = await Promise.all([fetchSEOPageData(pagePath), fetchGlobalSEOData()]);

  // Determine final values with fallbacks
  const title = seoData?.meta_title || fallbackTitle || globalData?.default_meta_title || "Disclosurely";
  const description = seoData?.meta_description || fallbackDescription || globalData?.default_meta_description || "Secure whistleblowing platform";
  const ogTitle = seoData?.og_title || title;
  const ogDescription = seoData?.og_description || description;
  const ogImage = seoData?.og_image_url || fallbackImage || globalData?.default_og_image_url || DEFAULT_OG_IMAGE;
  const twitterTitle = seoData?.twitter_title || title;
  const twitterDescription = seoData?.twitter_description || description;
  const twitterImage = seoData?.twitter_image_url || ogImage;
  const robots = noindex ? "noindex,nofollow" : seoData?.robots_directive || "index,follow";
  const finalKeywords = keywords || seoData?.meta_keywords || [];

  // Generate canonical URL
  const canonical = canonicalUrl || `${BASE_URL}${pagePath}`;

  // Generate hreflang alternates
  const alternates = generateHreflangAlternates(pagePath);

  // Build metadata object
  const metadata: Metadata = {
    title,
    description,
    keywords: finalKeywords.length > 0 ? finalKeywords : undefined,
    robots,
    alternates: {
      canonical,
      languages: Object.fromEntries(alternates.map((alt) => [alt.hreflang, alt.url])),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: globalData?.site_name || "Disclosurely",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: "en_GB",
      alternateLocale: ["es_ES", "fr_FR", "de_DE", "pl_PL", "sv_SE", "no_NO", "pt_PT", "it_IT", "nl_NL", "da_DK", "el_GR"],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  };

  // Add structured data if provided
  if (structuredData) {
    // Note: Next.js doesn't directly support JSON-LD in metadata
    // We'll need to add it separately in the page component
    (metadata as any).structuredData = structuredData;
  }

  return metadata;
}

/**
 * Generate structured data for a page
 */
export function generatePageStructuredData(
  type: "organization" | "software" | "article" | "faq" | "breadcrumb" | "webpage",
  options: StructuredDataOptions & { headline?: string; faqs?: Array<{ question: string; answer: string }>; breadcrumbs?: Array<{ name: string; url: string }> }
) {
  switch (type) {
    case "organization":
      return generateOrganizationSchema(options);
    case "software":
      return generateSoftwareApplicationSchema(options);
    case "article":
      if (!options.headline) throw new Error("headline is required for article schema");
      return generateArticleSchema({ ...options, headline: options.headline });
    case "faq":
      if (!options.faqs) throw new Error("faqs array is required for FAQ schema");
      return generateFAQPageSchema(options.faqs);
    case "breadcrumb":
      if (!options.breadcrumbs) throw new Error("breadcrumbs array is required for breadcrumb schema");
      return generateBreadcrumbSchema(options.breadcrumbs);
    case "webpage":
      return generateWebPageSchema(options);
    default:
      return generateWebPageSchema(options);
  }
}

/**
 * Component to inject structured data into page
 */
export function StructuredData({ data }: { data: any }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

