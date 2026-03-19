import type { Metadata } from "next";
import { headers } from "next/headers";
import { generatePageMetadata } from "@/lib/seo";
import { fetchBlogPosts, fetchCategories } from "@/lib/contentful";
import { resolveContentfulLocale } from "@/lib/contentful-locale";
import { getBlogChrome, resolveSiteLang } from "@/lib/blog-chrome";
import BlogClient from "./BlogClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const chrome = getBlogChrome(headerList.get("x-lang"));
  return generatePageMetadata({
    pagePath: "/blog",
    fallbackTitle: chrome.metaTitle,
    fallbackDescription: chrome.metaDescription,
    keywords: ["whistleblowing blog", "compliance articles", "ethics reporting", "GDPR compliance", "security best practices"],
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }> | { category?: string };
}) {
  const headerList = await headers();
  const siteLang = resolveSiteLang(headerList.get("x-lang"));
  const cfLocale = resolveContentfulLocale(siteLang);
  const [posts, categories, params] = await Promise.all([
    fetchBlogPosts({ locale: cfLocale }),
    fetchCategories(),
    Promise.resolve(searchParams),
  ]);

  return <BlogClient posts={posts} categories={categories} selectedCategory={params.category} />;
}
