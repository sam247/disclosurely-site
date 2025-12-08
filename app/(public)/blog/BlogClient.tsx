"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      {/* Hero Section */}
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Blog
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Compliance, security, and product updates
          </h1>
          <p className="text-lg text-gray-600">Latest insights from the Disclosurely team.</p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Sidebar - Categories */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Categories</h2>
                <p className="text-sm text-gray-600 mb-8">Filter posts by topic</p>

                <nav className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`w-full text-left block px-3 py-2 text-sm rounded-md transition-colors ${
                      !selectedCategory
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Latest
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left block px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedCategory === category.slug
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => {
                    const imageUrl = post.featuredImage?.fields?.file?.url
                      ? `https:${post.featuredImage.fields.file.url}`
                      : null;

                    return (
                      <Card
                        key={post.id}
                        className="group h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
                      >
                        {imageUrl && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <Image
                              src={imageUrl}
                              alt={post.title}
                              width={700}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4" />
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
                                <span>•</span>
                                <Clock className="h-4 w-4" />
                                <span>{post.readingTime} min read</span>
                              </>
                            )}
                          </div>
                          <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </CardTitle>
                          {post.authorName && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>By {post.authorName}</span>
                            </div>
                          )}
                          {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {post.categories.map((category) => (
                                <Badge key={category.id} variant="secondary" className="text-xs">
                                  {category.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                            {post.excerpt}
                          </CardDescription>
                          <Link
                            href={`${prefix}/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group-hover:gap-3 transition-all"
                          >
                            Read More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
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

