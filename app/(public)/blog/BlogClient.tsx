"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import type { BlogPost, Category } from "@/lib/contentful";

interface BlogClientProps {
  posts: BlogPost[];
  categories: Category[];
  selectedCategory?: string;
}

export default function BlogClient({ posts, categories, selectedCategory }: BlogClientProps) {
  const router = useRouter();
  const { prefix } = useLangPrefix();

  // Filter posts by category
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
    <div className="bg-white min-h-screen">
      {/* Main Content with Sidebar */}
      <section className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Sidebar - Blog Title and Categories */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-8">
                <h1 className="text-5xl font-bold mb-3 text-gray-900">Blog</h1>
                <p className="text-gray-600 mb-12 text-lg">
                  Compiled notes from the Disclosurely team
                </p>

                <nav className="space-y-2" aria-label="Blog categories">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    aria-label={!selectedCategory ? "Latest posts (selected)" : "Show latest posts"}
                    className={`w-full text-left block px-0 py-2 text-base transition-colors ${
                      !selectedCategory
                        ? "font-semibold text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Latest
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      aria-label={selectedCategory === category.slug ? `${category.name} (selected)` : `Filter by ${category.name}`}
                      className={`w-full text-left block px-0 py-2 text-base transition-colors ${
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

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">No blog posts yet</h2>
                  <p className="text-gray-600 mb-8">
                    Check back soon for insights on compliance, whistleblowing, and industry best practices.
                  </p>
                  <Link
                    href={`${prefix || "/"}`}
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Go to Homepage
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => {
                    const imageUrl = post.featuredImage
                      ? post.featuredImage.startsWith('http')
                        ? post.featuredImage
                        : `https:${post.featuredImage}`
                      : null;

                    // Get category name for display
                    const categoryName = post.categories && post.categories.length > 0 
                      ? post.categories[0].name.toLowerCase() 
                      : null;

                    return (
                      <Link
                        key={post.id}
                        href={`${prefix}/blog/${post.slug}`}
                        className="group block"
                      >
                        <Card className="h-full flex flex-col border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                          {imageUrl && (
                            <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                              <Image
                                src={imageUrl}
                                alt={post.title}
                                width={700}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            {categoryName && (
                              <div className="text-sm text-gray-500 mb-3 font-medium">
                                {categoryName}
                              </div>
                            )}
                            <CardTitle className="text-2xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>
                                {post.publishDate
                                  ? new Date(post.publishDate).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : "—"}
                              </span>
                              {post.readingTime && (
                                <>
                                  <span aria-hidden="true">•</span>
                                  <span>{post.readingTime} min read</span>
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

