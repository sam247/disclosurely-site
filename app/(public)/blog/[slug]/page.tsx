import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
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

  const imageUrl = post.featuredImage
    ? `https:${post.featuredImage}`
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
  const imageUrl = post.featuredImage
    ? `https:${post.featuredImage}`
    : null;

  // Create a map of asset IDs to assets for resolving embedded assets
  const assetMap = new Map();
  if (post.links) {
    // Contentful includes structure: { Asset: [...], Entry: [...] }
    const assets = post.links.Asset || [];
    assets.forEach((asset: any) => {
      if (asset?.sys?.id) {
        assetMap.set(asset.sys.id, asset);
      }
    });
  }

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
              {content
                ? documentToReactComponents(content, {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (node, children) => (
                        <p className="mb-4 leading-7 text-gray-700">{children}</p>
                      ),
                      [BLOCKS.HEADING_1]: (node, children) => (
                        <h1 className="mb-6 mt-8 text-3xl font-bold text-gray-900">{children}</h1>
                      ),
                      [BLOCKS.HEADING_2]: (node, children) => (
                        <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">{children}</h2>
                      ),
                      [BLOCKS.HEADING_3]: (node, children) => (
                        <h3 className="mb-3 mt-6 text-xl font-bold text-gray-900">{children}</h3>
                      ),
                      [BLOCKS.HEADING_4]: (node, children) => (
                        <h4 className="mb-2 mt-4 text-lg font-bold text-gray-900">{children}</h4>
                      ),
                      [BLOCKS.HEADING_5]: (node, children) => (
                        <h5 className="mb-2 mt-4 text-base font-bold text-gray-900">{children}</h5>
                      ),
                      [BLOCKS.HEADING_6]: (node, children) => (
                        <h6 className="mb-2 mt-4 text-sm font-bold text-gray-900">{children}</h6>
                      ),
                      [BLOCKS.UL_LIST]: (node, children) => (
                        <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
                      ),
                      [BLOCKS.OL_LIST]: (node, children) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
                      ),
                      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
                      [BLOCKS.QUOTE]: (node, children) => (
                        <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
                          {children}
                        </blockquote>
                      ),
                      [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
                      [BLOCKS.EMBEDDED_ASSET]: (node) => {
                        // Get asset ID from node
                        const assetId = node.data.target?.sys?.id;
                        if (!assetId) {
                          console.warn('Embedded asset node missing sys.id:', node);
                          return null;
                        }

                        // Try to get asset from assetMap
                        const asset = assetMap.get(assetId);
                        if (!asset) {
                          console.warn('Embedded asset not found in assetMap:', assetId, 'Available assets:', Array.from(assetMap.keys()));
                          return null;
                        }

                        const file = asset.fields?.file;
                        if (!file) {
                          console.warn('Asset missing file field:', asset);
                          return null;
                        }

                        const imageUrl = file.url?.startsWith("//") ? `https:${file.url}` : file.url;
                        if (!imageUrl) {
                          console.warn('Asset file missing URL:', file);
                          return null;
                        }

                        const alt = asset.fields?.title || asset.fields?.description || "Blog post image";
                        const width = file.details?.image?.width || 1200;
                        const height = file.details?.image?.height || 600;

                        return (
                          <div className="my-8">
                            <Image
                              src={imageUrl}
                              alt={alt}
                              width={width}
                              height={height}
                              className="h-auto w-full rounded-lg object-cover"
                            />
                            {asset.fields?.description && (
                              <p className="mt-2 text-center text-sm text-gray-500">{asset.fields.description}</p>
                            )}
                          </div>
                        );
                      },
                      [INLINES.HYPERLINK]: (node, children) => {
                        const uri = node.data.uri;
                        return (
                          <a
                            href={uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline-offset-2 hover:underline"
                          >
                            {children}
                          </a>
                        );
                      },
                      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                        // Handle entry hyperlinks if needed
                        return <span className="text-blue-600">{children}</span>;
                      },
                    },
                    renderMark: {
                      [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
                      [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
                      [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
                      [MARKS.CODE]: (text) => (
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">{text}</code>
                      ),
                    },
                  })
                : post.excerpt || "No content available."}
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

