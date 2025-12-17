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
  featuredImage?: string; // URL string instead of AssetWithFile
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

  // Create a map of asset IDs to assets for resolving featured images if needed
  // Contentful SDK with include: 2 should automatically resolve linked assets,
  // but we keep this as a fallback for link references
  const assetMap = new Map();
  const responseAny = response as any;
  if (responseAny.includes?.Asset && Array.isArray(responseAny.includes.Asset)) {
    responseAny.includes.Asset.forEach((asset: any) => {
      if (asset?.sys?.id) {
        assetMap.set(asset.sys.id, asset);
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

      // Extract featured image URL - Contentful SDK with include: 2 automatically resolves linked assets
      // Extract URL directly like the backup implementation: (item.fields.featuredImage as any)?.fields?.file?.url
      const featuredImage = item.fields.featuredImage as any;
      let featuredImageUrl: string | undefined;
      
      // If already resolved (has fields.file.url)
      if (featuredImage?.fields?.file?.url) {
        featuredImageUrl = featuredImage.fields.file.url;
      }
      // If it's a link reference (has sys.id but no fields), resolve from asset map
      else if (featuredImage?.sys?.id && !featuredImage?.fields) {
        const assetId = featuredImage.sys.id;
        const resolvedAsset = assetMap.get(assetId);
        if (resolvedAsset?.fields?.file?.url) {
          featuredImageUrl = resolvedAsset.fields.file.url;
        }
      }

      return {
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        featuredImage: featuredImageUrl,
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
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c7de66a4-773c-4aba-878d-2e4a4241820f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/contentful.ts:163',message:'fetchBlogPost entry',data:{slug,slugType:typeof slug,hasClient:!!contentfulClient,hasToken:!!contentfulToken},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  if (!contentfulClient || !contentfulToken) return null;

  const queryParams = {
    content_type: "9oYANGj5uBRT6UHsl5LxO",
    "fields.slug": slug,
    limit: 1,
    include: 10, // Include linked assets and entries (increased to ensure all embedded assets are included)
  };
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c7de66a4-773c-4aba-878d-2e4a4241820f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/contentful.ts:170',message:'fetchBlogPost query params',data:{slug,queryParams},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const response = await contentfulClient.getEntries<BlogPostSkeleton>(queryParams as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c7de66a4-773c-4aba-878d-2e4a4241820f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/contentful.ts:173',message:'fetchBlogPost response received',data:{slug,itemsCount:response.items.length,firstItemId:response.items[0]?.sys?.id,firstItemSlug:response.items[0]?.fields?.slug,firstItemTitle:response.items[0]?.fields?.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  const post = response.items[0];
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c7de66a4-773c-4aba-878d-2e4a4241820f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/contentful.ts:175',message:'fetchBlogPost post extracted',data:{slug,hasPost:!!post,postId:post?.sys?.id,postSlug:post?.fields?.slug,postTitle:post?.fields?.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
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

  // Extract featured image URL
  const featuredImage = post.fields.featuredImage as any;
  const featuredImageUrl = featuredImage?.fields?.file?.url;

  const result = {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    excerpt: post.fields.excerpt,
    content: post.fields.content,
    featuredImage: featuredImageUrl,
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
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c7de66a4-773c-4aba-878d-2e4a4241820f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/contentful.ts:212',message:'fetchBlogPost returning result',data:{requestedSlug:slug,resultSlug:result.slug,resultId:result.id,resultTitle:result.title,slugMatch:slug===result.slug},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return result;
}

export async function fetchRelatedBlogPosts(
  currentPostId: string,
  categoryIds: string[],
  limit: number = 3
): Promise<BlogPost[]> {
  if (!contentfulClient || !contentfulToken || categoryIds.length === 0) return [];

  try {
    // Fetch all published posts
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: "9oYANGj5uBRT6UHsl5LxO",
      limit: 100,
      include: 2,
    });

    // Filter posts that:
    // 1. Are not the current post
    // 2. Share at least one category with the current post
    // 3. Are published
    const relatedPosts = response.items
      .filter((item) => {
        // Exclude current post
        if (item.sys.id === currentPostId) return false;
        
        // Only include published posts
        const status = item.fields.status;
        if (status !== 'published' && status) return false;

        // Check if post shares at least one category
        const postCategories = (item.fields.categories as any) || [];
        if (!Array.isArray(postCategories)) return false;

        return postCategories.some((cat: any) => 
          cat?.sys?.id && categoryIds.includes(cat.sys.id)
        );
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

        // Extract featured image URL
        const featuredImage = item.fields.featuredImage as any;
        let featuredImageUrl: string | undefined;
        
        if (featuredImage?.fields?.file?.url) {
          featuredImageUrl = featuredImage.fields.file.url;
        }

        return {
          id: item.sys.id,
          title: item.fields.title,
          slug: item.fields.slug,
          excerpt: item.fields.excerpt,
          content: item.fields.content,
          featuredImage: featuredImageUrl,
          publishDate: item.fields.publishDate,
          seoTitle: item.fields.seoTitle,
          seoDescription: item.fields.seoDescription,
          tags: item.fields.tags || [],
          readingTime: item.fields.readingTime,
          authorName,
          authorEmail,
          categories,
        };
      })
      // Sort by publishDate descending
      .sort((a, b) => {
        const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
        const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
        return bDate - aDate;
      })
      // Limit to requested number
      .slice(0, limit);

    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related blog posts:', error);
    return [];
  }
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

