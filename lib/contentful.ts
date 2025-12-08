import { createClient, type EntryFields, type EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

const contentfulSpace = process.env.VITE_CONTENTFUL_SPACE_ID || "rm7hib748uv7";
const contentfulToken = process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

export const contentfulClient = contentfulToken
  ? createClient({
      space: contentfulSpace,
      accessToken: contentfulToken,
    })
  : null;

export type AssetWithFile = { fields?: { file?: { url?: string } } };

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
};

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!contentfulClient || !contentfulToken) return [];

  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: "9oYANGj5uBRT6UHsl5LxO",
    limit: 100,
  });

  const posts = response.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    featuredImage: item.fields.featuredImage,
    publishDate: item.fields.publishDate,
    seoTitle: item.fields.seoTitle,
    seoDescription: item.fields.seoDescription,
    tags: item.fields.tags || [],
    readingTime: item.fields.readingTime,
  }));

  // Sort by publishDate descending (fallback to sys.updatedAt)
  return posts.sort((a, b) => {
    const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return bDate - aDate;
  });
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  if (!contentfulClient || !contentfulToken) return null;

  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: "9oYANGj5uBRT6UHsl5LxO",
    "fields.slug": slug,
    limit: 1,
  } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

  const post = response.items[0];
  if (!post) return null;

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
  };
}

