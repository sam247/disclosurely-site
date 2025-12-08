import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { fetchBlogPosts, fetchCategories, type BlogPost, type Category } from "@/lib/contentful";
import BlogClient from "./BlogClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    pagePath: "/blog",
    fallbackTitle: "Blog | Disclosurely",
    fallbackDescription:
      "Read the latest articles about whistleblowing, compliance, security, and best practices for ethical reporting.",
    keywords: ["whistleblowing blog", "compliance articles", "ethics reporting", "GDPR compliance", "security best practices"],
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }> | { category?: string };
}) {
  const [posts, categories, params] = await Promise.all([
    fetchBlogPosts(),
    fetchCategories(),
    Promise.resolve(searchParams),
  ]);

  return <BlogClient posts={posts} categories={categories} selectedCategory={params.category} />;
}
