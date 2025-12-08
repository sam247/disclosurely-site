import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

import { Card } from "@/components/ui/card";
import { fetchBlogPost } from "@/lib/contentful";

type Params = { slug: string };

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) return notFound();

  const content = post.content as Document | undefined;
  const imageUrl = post.featuredImage?.fields?.file?.url
    ? `https:${post.featuredImage.fields.file.url}`
    : null;

  return (
    <div className="bg-white">
      <section className="px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="text-sm font-semibold text-blue-600 underline-offset-2 hover:underline">
            ← Back to blog
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">{post.title}</h1>
          <p className="mt-2 text-gray-600">
            {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : ""}
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {imageUrl && (
            <Card className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={post.title} className="h-auto w-full" />
            </Card>
          )}

          <article className="prose prose-lg prose-gray max-w-none">
            {content ? documentToReactComponents(content) : <p>{post.excerpt || "No content available."}</p>}
          </article>
        </div>
      </section>
    </div>
  );
}

