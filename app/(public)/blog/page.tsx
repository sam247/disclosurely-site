import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchBlogPosts, fetchCategories, type BlogPost, type Category } from "@/lib/contentful";
import BlogClient from "./BlogClient";

export const revalidate = 60;

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
