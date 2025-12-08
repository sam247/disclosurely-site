import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import { fetchBlogPost } from "@/lib/contentful";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";

type Params = { slug: string };

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = post.featuredImage?.fields?.file?.url
    ? `https:${post.featuredImage.fields.file.url}`
    : undefined;

  return generatePageMetadata({
    pagePath: `/blog/${params.slug}`,
    fallbackTitle: post.seoTitle || post.title,
    fallbackDescription: post.seoDescription || post.excerpt || "",
    fallbackImage: imageUrl,
    keywords: post.tags || [],
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) return notFound();

  const content = post.content as Document | undefined;
  const imageUrl = post.featuredImage?.fields?.file?.url
    ? `https:${post.featuredImage.fields.file.url}`
    : null;

  // Generate Article structured data
  const articleSchema = generatePageStructuredData("article", {
    headline: post.title,
    description: post.excerpt || "",
    url: `https://disclosurely.com/blog/${params.slug}`,
    image: imageUrl,
    datePublished: post.publishDate || undefined,
    dateModified: post.publishDate || undefined,
    author: post.authorName
      ? {
          name: post.authorName,
        }
      : undefined,
  } as any);

  return (
    <>
      <StructuredData data={articleSchema} />
      <div className="bg-white">
        <section className="px-4 pb-10 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="text-sm font-semibold text-blue-600 underline-offset-2 hover:underline">
              ← Back to blog
            </Link>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">{post.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <CalendarDays className="h-4 w-4" />
              <span>{post.publishDate ? format(new Date(post.publishDate), "PPP") : "No date"}</span>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
            {post.authorName && (
              <p className="mt-2 text-gray-600">By {post.authorName}</p>
            )}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {imageUrl && (
              <Card className="overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
              </Card>
            )}

            <article className="prose prose-lg prose-gray max-w-none">
              {content ? documentToReactComponents(content) : <p>{post.excerpt || "No content available."}</p>}
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

