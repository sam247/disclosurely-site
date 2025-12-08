import { createClient, type EntryFields, type EntrySkeletonType } from "contentful";

// Support both VITE_ prefix (for backward compatibility) and standard Next.js env vars
const contentfulSpace = process.env.CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID || "rm7hib748uv7";
const contentfulToken = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

export const contentfulClient = contentfulToken
  ? createClient({
      space: contentfulSpace,
      accessToken: contentfulToken,
    })
  : null;

export interface SEOData {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_url?: string;
  robots_directive?: string;
  structured_data?: Record<string, any>;
  custom_head_tags?: string;
}

export interface GlobalSEOData {
  site_name?: string;
  site_description?: string;
  default_meta_title?: string;
  default_meta_description?: string;
  default_og_image_url?: string;
  default_twitter_image_url?: string;
  favicon_url?: string;
  logo_url?: string;
  google_analytics_id?: string;
  google_tag_manager_id?: string;
  facebook_pixel_id?: string;
  google_site_verification?: string;
  bing_site_verification?: string;
  custom_head_tags?: string;
}

// Module-level cache
const seoCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute cache

/**
 * Fetch SEO data for a specific page from Contentful
 */
export async function fetchSEOPageData(pageIdentifier: string): Promise<SEOData | null> {
  if (!contentfulClient || !contentfulToken) {
    return null;
  }

  // Check cache
  const cacheKey = `seo-page-${pageIdentifier}`;
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Normalize pageIdentifier - try both with and without leading slash
    const pagePathWithSlash = pageIdentifier.startsWith("/") ? pageIdentifier : `/${pageIdentifier}`;
    const pagePathWithoutSlash = pageIdentifier.startsWith("/") ? pageIdentifier.slice(1) : pageIdentifier;

    const response = await contentfulClient.getEntries({
      content_type: "seoPage",
      "fields.pagePath[in]": `${pagePathWithSlash},${pagePathWithoutSlash}`,
      "fields.isActive": true,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    const fields = item.fields as any;

    // Ensure OG image URL is absolute
    let ogImageUrl = fields.ogImage?.fields?.file?.url;
    if (ogImageUrl && !ogImageUrl.startsWith("http")) {
      ogImageUrl = `https:${ogImageUrl}`;
    }

    const seoData: SEOData = {
      meta_title: fields.pageTitle,
      meta_description: fields.metaDescription,
      meta_keywords: fields.metaKeywords || [],
      og_title: fields.ogTitle,
      og_description: fields.ogDescription,
      og_image_url: ogImageUrl,
      twitter_title: fields.twitterTitle,
      twitter_description: fields.twitterDescription,
      twitter_image_url: fields.twitterImage?.fields?.file?.url
        ? fields.twitterImage.fields.file.url.startsWith("http")
          ? fields.twitterImage.fields.file.url
          : `https:${fields.twitterImage.fields.file.url}`
        : undefined,
      robots_directive: fields.robotsMeta || "index,follow",
      structured_data: fields.structuredData,
      custom_head_tags: fields.customHeadTags,
    };

    // Cache the result
    seoCache.set(cacheKey, { data: seoData, timestamp: Date.now() });

    return seoData;
  } catch (error) {
    console.error("Error fetching SEO page data from Contentful:", error);
    return null;
  }
}

/**
 * Fetch global site settings from Contentful
 */
export async function fetchGlobalSEOData(): Promise<GlobalSEOData | null> {
  if (!contentfulClient || !contentfulToken) {
    return null;
  }

  // Check cache
  const cacheKey = "seo-global";
  const cached = seoCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: "siteSettings",
      "fields.isActive": true,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    const fields = item.fields as any;

    // Ensure default OG image URL is absolute
    let defaultOgImageUrl = fields.defaultOgImage?.fields?.file?.url;
    if (defaultOgImageUrl && !defaultOgImageUrl.startsWith("http")) {
      defaultOgImageUrl = `https:${defaultOgImageUrl}`;
    }

    const globalData: GlobalSEOData = {
      site_name: fields.siteName || "Disclosurely",
      site_description: fields.siteDescription || "Secure whistleblowing platform",
      default_meta_title: fields.siteName || "Disclosurely",
      default_meta_description: fields.siteDescription || "Secure whistleblowing platform",
      default_og_image_url: defaultOgImageUrl,
      default_twitter_image_url: fields.defaultTwitterImage?.fields?.file?.url
        ? fields.defaultTwitterImage.fields.file.url.startsWith("http")
          ? fields.defaultTwitterImage.fields.file.url
          : `https:${fields.defaultTwitterImage.fields.file.url}`
        : undefined,
      favicon_url: fields.faviconUrl,
      logo_url: fields.logoUrl,
      google_analytics_id: fields.googleAnalyticsId,
      google_tag_manager_id: fields.googleTagManagerId,
      facebook_pixel_id: fields.facebookPixelId,
      google_site_verification: fields.googleSiteVerification,
      bing_site_verification: fields.bingSiteVerification,
      custom_head_tags: fields.customHeadTags,
    };

    // Cache the result
    seoCache.set(cacheKey, { data: globalData, timestamp: Date.now() });

    return globalData;
  } catch (error) {
    console.error("Error fetching global SEO data from Contentful:", error);
    return null;
  }
}

/**
 * Fetch structured data for a specific page from Contentful
 */
export async function fetchStructuredData(pageIdentifier: string): Promise<any[]> {
  if (!contentfulClient || !contentfulToken) {
    return [];
  }

  try {
    const pagePathWithSlash = pageIdentifier.startsWith("/") ? pageIdentifier : `/${pageIdentifier}`;
    const pagePathWithoutSlash = pageIdentifier.startsWith("/") ? pageIdentifier.slice(1) : pageIdentifier;

    const response = await contentfulClient.getEntries({
      content_type: "schemaStructuredData",
      "fields.isActive": true,
      "fields.pagePath[in]": `${pagePathWithSlash},${pagePathWithoutSlash}`,
      limit: 10,
    });

    return response.items.map((item: any) => ({
      type: item.fields.schemaType,
      data: item.fields.schemaData,
    }));
  } catch (error) {
    console.error("Error fetching structured data from Contentful:", error);
    return [];
  }
}

