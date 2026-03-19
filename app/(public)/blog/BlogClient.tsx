"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import type { BlogPost, Category } from "@/lib/contentful";

interface BlogClientProps {
  posts: BlogPost[];
  categories: Category[];
  selectedCategory?: string;
}

function formatPostCardDate(iso: string, siteLang: string) {
  try {
    const loc = siteLang === "en" ? "en-GB" : siteLang;
    return new Intl.DateTimeFormat(loc, { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(iso)
    );
  } catch {
    return new Date(iso).toISOString().slice(0, 10);
  }
}

export default function BlogClient({ posts, categories, selectedCategory }: BlogClientProps) {
  const router = useRouter();
  const { prefix } = useLangPrefix();
  const { currentLanguage } = useLanguageFromUrl();
  const { t } = useTranslation();

  const filteredPosts =
    selectedCategory && selectedCategory !== "latest"
      ? posts.filter((post) => post.categories?.some((cat) => cat.slug === selectedCategory))
      : posts;

  const handleCategoryChange = (categorySlug: string | null) => {
    if (categorySlug) {
      router.push(`${prefix}/blog?category=${categorySlug}`);
    } else {
      router.push(`${prefix}/blog`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pb-20 pt-24">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <aside className="w-full flex-shrink-0 lg:w-80">
              <div className="lg:sticky lg:top-8">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-5xl">{t("blog.title")}</h1>
                <p className="mb-12 text-lg text-gray-600">{t("blog.subtitle")}</p>

                <nav className="space-y-2" aria-label={t("blog.categoriesNavLabel")}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(null)}
                    aria-current={!selectedCategory ? "page" : undefined}
                    className={`block w-full px-0 py-2 text-left text-base transition-colors ${
                      !selectedCategory
                        ? "font-semibold text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t("blog.latest")}
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      aria-current={selectedCategory === category.slug ? "page" : undefined}
                      className={`block w-full px-0 py-2 text-left text-base transition-colors ${
                        selectedCategory === category.slug
                          ? "font-semibold text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {filteredPosts.length === 0 ? (
                <div className="py-16 text-center">
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t("blog.noPostsTitle")}</h2>
                  <p className="mb-8 text-gray-600">{t("blog.noPostsBody")}</p>
                  <Link
                    href={prefix || "/"}
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {t("blog.goHome")}
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {filteredPosts.map((post) => {
                    const imageUrl = post.featuredImage
                      ? post.featuredImage.startsWith("http")
                        ? post.featuredImage
                        : `https:${post.featuredImage}`
                      : null;

                    const categoryName =
                      post.categories && post.categories.length > 0
                        ? post.categories[0].name.toLowerCase()
                        : null;

                    return (
                      <Link
                        key={post.id}
                        href={`${prefix}/blog/${post.slug}`}
                        className="group block"
                      >
                        <Card className="flex h-full flex-col overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md">
                          {imageUrl && (
                            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                              <Image
                                src={imageUrl}
                                alt={post.title}
                                width={700}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            {categoryName && (
                              <div className="mb-3 text-sm font-medium text-gray-500">{categoryName}</div>
                            )}
                            <CardTitle className="mb-3 line-clamp-2 text-2xl font-bold transition-colors group-hover:text-blue-600">
                              {post.title}
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <span>
                                {post.publishDate
                                  ? formatPostCardDate(post.publishDate, currentLanguage)
                                  : "—"}
                              </span>
                              {post.readingTime != null && (
                                <>
                                  <span aria-hidden="true">•</span>
                                  <span>
                                    {t("blog.minRead", { count: post.readingTime })}
                                  </span>
                                </>
                              )}
                            </div>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
