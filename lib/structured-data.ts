const BASE_URL = "https://disclosurely.com";

export interface StructuredDataOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  organization?: {
    name: string;
    url: string;
    logo?: string;
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(options?: StructuredDataOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options?.organization?.name || "Disclosurely",
    url: options?.organization?.url || BASE_URL,
    logo: options?.organization?.logo || `${BASE_URL}/lovable-uploads/c46ace0e-df58-4119-b5e3-8dcfa075ea2f.png`,
    description: options?.description || "GDPR-compliant whistleblowing platform for UK & EU organisations",
    sameAs: [
      "https://www.linkedin.com/company/disclosurely",
      "https://www.facebook.com/disclosurely",
      "https://www.instagram.com/disclosurely",
    ],
  };
}

/**
 * Generate SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema(options?: StructuredDataOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: options?.title || "Disclosurely",
    description:
      options?.description ||
      "GDPR-compliant whistleblowing platform for UK & EU organisations. Anonymous reporting, AI case analysis, end-to-end encryption.",
    url: options?.url || BASE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(options: StructuredDataOptions & { headline: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    image: options.image,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: options.author
      ? {
          "@type": "Person",
          name: options.author.name,
          url: options.author.url,
        }
      : {
          "@type": "Organization",
          name: "Disclosurely",
          url: BASE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: "Disclosurely",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/lovable-uploads/c46ace0e-df58-4119-b5e3-8dcfa075ea2f.png`,
      },
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(options: StructuredDataOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.title,
    description: options.description,
    url: options.url,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Disclosurely",
      url: BASE_URL,
    },
  };
}

