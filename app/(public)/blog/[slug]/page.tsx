import Link from "next/link";
import { notFound } from "next/navigation";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { CalendarDays, Calendar, Clock } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { fetchBlogPost, fetchRelatedBlogPosts } from "@/lib/contentful";
import { resolveContentfulLocale } from "@/lib/contentful-locale";
import { generatePageMetadata, generatePageStructuredData, StructuredData } from "@/lib/seo";
import { getBlogChrome, resolveSiteLang } from "@/lib/blog-chrome";
import { headers } from "next/headers";

type Params = { slug: string } | Promise<{ slug: string }>;

export const revalidate = 60;

function langPrefixFromSiteLang(siteLang: string) {
  return siteLang === "en" ? "" : `/${siteLang}`;
}

function formatBlogListDate(iso: string, siteLang: string) {
  try {
    const loc = siteLang === "en" ? "en-GB" : siteLang;
    return new Intl.DateTimeFormat(loc, { year: "numeric", month: "short", day: "numeric" }).format(
      new Date(iso)
    );
  } catch {
    return new Date(iso).toISOString().slice(0, 10);
  }
}

function formatBlogHeroDate(iso: string, siteLang: string) {
  try {
    const loc = siteLang === "en" ? "en-GB" : siteLang;
    return new Intl.DateTimeFormat(loc, { dateStyle: "long" }).format(new Date(iso));
  } catch {
    return new Date(iso).toISOString().slice(0, 10);
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await Promise.resolve(params);
  const slugValue = resolvedParams.slug;
  const headerList = await headers();
  const siteLang = resolveSiteLang(headerList.get("x-lang"));
  const cfLocale = resolveContentfulLocale(siteLang);
  const post = await fetchBlogPost(slugValue, { locale: cfLocale });
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
    pagePath: `/blog/${slugValue}`,
    fallbackTitle: post.seoTitle || post.title,
    fallbackDescription: post.seoDescription || post.excerpt || "",
    fallbackImage: imageUrl,
    keywords: post.tags || [],
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const resolvedParams = await Promise.resolve(params);
  const slugValue = resolvedParams.slug;
  const headerList = await headers();
  const siteLang = resolveSiteLang(headerList.get("x-lang"));
  const langPrefix = langPrefixFromSiteLang(siteLang);
  const cfLocale = resolveContentfulLocale(siteLang);
  const chrome = getBlogChrome(headerList.get("x-lang"));

  const post = await fetchBlogPost(slugValue, { locale: cfLocale });
  if (!post) return notFound();

  const categoryIds = post.categories?.map((cat) => cat.id) || [];
  const relatedPosts = await fetchRelatedBlogPosts(post.id, categoryIds, 3, { locale: cfLocale });

  const content = post.content as Document | undefined;
  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `https:${post.featuredImage}`
    : null;

  const assetMap = new Map<string, unknown>();
  if (post.links) {
    const assets = post.links.Asset || [];
    assets.forEach((asset: { sys?: { id?: string } }) => {
      if (asset?.sys?.id) {
        assetMap.set(asset.sys.id, asset);
      }
    });
  }

  const articleSchema = generatePageStructuredData("article", {
    headline: post.title,
    description: post.excerpt || "",
    url: `https://disclosurely.com${langPrefix || ""}/blog/${slugValue}`,
    image: imageUrl,
    datePublished: post.publishDate || undefined,
    dateModified: post.publishDate || undefined,
    author: post.authorName
      ? {
          name: post.authorName,
        }
      : undefined,
  } as any);

  const byline = post.authorName
    ? chrome.byAuthor.replace(/\{\{name\}\}/g, post.authorName)
    : null;

  return (
    <>
      <StructuredData data={articleSchema} />
      <div className="bg-white">
        <section className="px-4 pb-10 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href={`${langPrefix}/blog`}
              className="text-sm font-semibold text-blue-600 underline-offset-2 hover:underline"
            >
              {chrome.backToBlog}
            </Link>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">{post.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-600">
              <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {post.publishDate
                  ? formatBlogHeroDate(post.publishDate, siteLang)
                  : chrome.noDate}
              </span>
              {post.readingTime != null && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>{chrome.minRead.replace(/\{\{count\}\}/g, String(post.readingTime))}</span>
                </>
              )}
            </div>
            {byline && <p className="mt-2 text-gray-600">{byline}</p>}
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

            {content ? (
              <BlogPostBody content={content} assetMap={assetMap} siteLang={siteLang} />
            ) : (
              <p className="text-gray-700">{post.excerpt || "No content available."}</p>
            )}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="mt-4 mb-4 text-lg font-bold text-gray-900">{chrome.relatedArticles}</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => {
                  const relatedImageUrl = relatedPost.featuredImage
                    ? relatedPost.featuredImage.startsWith("http")
                      ? relatedPost.featuredImage
                      : `https:${relatedPost.featuredImage}`
                    : null;

                  const readAria = chrome.readArticleAria.replace(/\{\{title\}\}/g, relatedPost.title);

                  return (
                    <Card
                      key={relatedPost.id}
                      className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                    >
                      {relatedImageUrl && (
                        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                          <Image
                            src={relatedImageUrl}
                            alt={relatedPost.title}
                            width={375}
                            height={281}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader className="p-3">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>
                            {relatedPost.publishDate
                              ? formatBlogListDate(relatedPost.publishDate, siteLang)
                              : "—"}
                          </span>
                          {relatedPost.readingTime != null && (
                            <>
                              <span aria-hidden="true">•</span>
                              <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                              <span>
                                {chrome.minRead.replace(/\{\{count\}\}/g, String(relatedPost.readingTime))}
                              </span>
                            </>
                          )}
                        </div>
                        <Link href={`${langPrefix}/blog/${relatedPost.slug}`}>
                          <CardTitle className="line-clamp-2 cursor-pointer text-base font-semibold transition-colors group-hover:text-blue-600">
                            {relatedPost.title}
                          </CardTitle>
                        </Link>
                        {relatedPost.authorName && (
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                            <span>
                              {chrome.byAuthor.replace(/\{\{name\}\}/g, relatedPost.authorName)}
                            </span>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-between p-3 pt-0">
                        <CardDescription className="mb-2 line-clamp-2 text-xs text-gray-600">
                          {relatedPost.excerpt}
                        </CardDescription>
                        <Link
                          href={`${langPrefix}/blog/${relatedPost.slug}`}
                          className="inline-flex min-h-[2.25rem] items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                          aria-label={readAria}
                        >
                          {chrome.readArticle}
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
