import { createClient, type EntryFields, type EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// Support both VITE_ prefix (for backward compatibility) and standard Next.js env vars
const contentfulSpace = process.env.CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID || "rm7hib748uv7";
const contentfulToken = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

export const contentfulClient = contentfulToken
  ? createClient({
      space: contentfulSpace,
      accessToken: contentfulToken,
    })
  : null;

export type AssetWithFile = { fields?: { file?: { url?: string } } };

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  name: string;
  email?: string;
};

export type AuthorSkeleton = EntrySkeletonType<{
  name: EntryFields.Text;
  email?: EntryFields.Text;
}>;

export type CategorySkeleton = EntrySkeletonType<{
  name: EntryFields.Text;
  slug: EntryFields.Text;
  isActive?: EntryFields.Boolean;
}>;

export type BlogPostSkeleton = EntrySkeletonType<{
  title: EntryFields.Text;
  slug: EntryFields.Text;
  excerpt?: EntryFields.Text;
  content?: Document;
  featuredImage?: AssetWithFile;
  publishDate?: EntryFields.Date;
  seoTitle?: EntryFields.Text;
  seoDescription?: EntryFields.Text;
  tags?: EntryFields.Symbol[];
  readingTime?: EntryFields.Number;
  status?: EntryFields.Text;
  author?: EntryFields.EntryLink<AuthorSkeleton>;
  categories?: EntryFields.Array<EntryFields.EntryLink<CategorySkeleton>>;
}>;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Document;
  featuredImage?: AssetWithFile;
  publishDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  readingTime?: number;
  authorName?: string;
  authorEmail?: string;
  categories?: Category[];
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!contentfulClient || !contentfulToken) return [];

  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: "9oYANGj5uBRT6UHsl5LxO",
    limit: 100,
    include: 2, // Include linked assets and entries (for featuredImage)
  });

  // Create a map of asset IDs to assets for resolving featured images
  const assetMap = new Map();
  // Contentful SDK includes structure: response.includes contains { Asset: [...], Entry: [...] }
  // Access includes from the response object
  const responseAny = response as any;
  if (responseAny.includes) {
    const includes = responseAny.includes;
    // The includes object has Asset and Entry arrays
    if (includes.Asset && Array.isArray(includes.Asset)) {
      includes.Asset.forEach((asset: any) => {
        if (asset?.sys?.id) {
          assetMap.set(asset.sys.id, asset);
        }
      });
    }
  }
  
  // Also check if assets are in a different location (some SDK versions)
  // Sometimes assets might be directly accessible
  if (assetMap.size === 0 && responseAny.items) {
    // Try to extract assets from items if includes didn't work
    responseAny.items.forEach((item: any) => {
      const featuredImage = item.fields?.featuredImage;
      if (featuredImage?.fields?.file && featuredImage.sys?.id) {
        assetMap.set(featuredImage.sys.id, featuredImage);
      }
    });
  }

  const posts = response.items
    .filter((item) => {
      // Only include published posts
      const status = item.fields.status;
      return status === 'published' || !status; // Include if published or status not set
    })
    .map((item) => {
      // Extract author
      const authorEntry = item.fields.author as any;
      const authorName = authorEntry?.fields?.name;
      const authorEmail = authorEntry?.fields?.email;

      // Extract categories
      const categoryEntries = (item.fields.categories as any) || [];
      const categories: Category[] = Array.isArray(categoryEntries)
        ? categoryEntries
            .filter((cat: any) => cat?.fields)
            .map((cat: any) => ({
              id: cat.sys?.id || '',
              name: cat.fields?.name || '',
              slug: cat.fields?.slug || '',
            }))
        : [];

      // Resolve featured image from includes if it's a link
      let featuredImage = item.fields.featuredImage as any;
      if (featuredImage) {
        // Handle different Contentful SDK response structures
        // Case 1: Already resolved by SDK (has fields.file)
        if (featuredImage.fields && featuredImage.fields.file) {
          featuredImage = featuredImage;
        }
        // Case 2: Link reference that needs resolution (has sys.id but no fields)
        else if (featuredImage.sys?.id && !featuredImage.fields) {
          const assetId = featuredImage.sys.id;
          const resolvedAsset = assetMap.get(assetId);
          if (resolvedAsset && resolvedAsset.fields && resolvedAsset.fields.file) {
            featuredImage = resolvedAsset;
          } else {
            // Asset not found in map - might be resolved differently by SDK
            // Try accessing it directly from the item if SDK auto-resolved it
            featuredImage = undefined;
          }
        }
        // Case 3: Nested structure (e.g., locale-specific like en-US)
        else if (featuredImage['en-US'] || featuredImage['en'] || typeof featuredImage === 'object') {
          // Try to extract the actual link/asset from nested structure
          const nestedImage = featuredImage['en-US'] || featuredImage['en'] || Object.values(featuredImage)[0];
          if (nestedImage?.fields?.file) {
            featuredImage = nestedImage;
          } else if (nestedImage?.sys?.id) {
            const assetId = nestedImage.sys.id;
            const resolvedAsset = assetMap.get(assetId);
            if (resolvedAsset && resolvedAsset.fields && resolvedAsset.fields.file) {
              featuredImage = resolvedAsset;
            } else {
              featuredImage = undefined;
            }
          } else {
            featuredImage = undefined;
          }
        }
        // Case 4: Invalid structure
        else {
          featuredImage = undefined;
        }
      }

      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        featuredImage,
        publishDate: item.fields.publishDate,
        seoTitle: item.fields.seoTitle,
        seoDescription: item.fields.seoDescription,
        tags: item.fields.tags || [],
        readingTime: item.fields.readingTime,
        authorName,
        authorEmail,
        categories,
      };
    });

  // Sort by publishDate descending (fallback to sys.updatedAt)
  return posts.sort((a, b) => {
    const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return bDate - aDate;
  });
}

export async function fetchBlogPost(slug: string): Promise<BlogPost & { links?: any } | null> {
  if (!contentfulClient || !contentfulToken) return null;

  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: "9oYANGj5uBRT6UHsl5LxO",
    "fields.slug": slug,
    limit: 1,
    include: 10, // Include linked assets and entries (increased to ensure all embedded assets are included)
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  const post = response.items[0];
  if (!post) return null;

  // Extract author
  const authorEntry = post.fields.author as any;
  const authorName = authorEntry?.fields?.name;
  const authorEmail = authorEntry?.fields?.email;

  // Extract categories
  const categoryEntries = (post.fields.categories as any) || [];
  const categories: Category[] = Array.isArray(categoryEntries)
    ? categoryEntries
        .filter((cat: any) => cat?.fields)
        .map((cat: any) => ({
          id: cat.sys?.id || '',
          name: cat.fields?.name || '',
          slug: cat.fields?.slug || '',
        }))
    : [];

  return {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    excerpt: post.fields.excerpt,
    content: post.fields.content,
    featuredImage: post.fields.featuredImage,
    publishDate: post.fields.publishDate,
    seoTitle: post.fields.seoTitle,
    seoDescription: post.fields.seoDescription,
    tags: post.fields.tags || [],
    readingTime: post.fields.readingTime,
    authorName,
    authorEmail,
    categories,
    links: response.includes, // Include the links for resolving embedded assets
  };
}

export async function fetchCategories(): Promise<Category[]> {
  if (!contentfulClient || !contentfulToken) return [];

  try {
    const response = await contentfulClient.getEntries({
      content_type: "1Dn01YZmIbymrxi194Q2xV", // Category content type ID
      limit: 100,
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    return response.items
      .filter((item: any) => item.fields?.isActive !== false)
      .map((item: any) => ({
        id: item.sys.id,
        name: item.fields.name || '',
        slug: item.fields.slug || '',
      }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

