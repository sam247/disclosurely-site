import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBlogPosts } from "@/lib/contentful";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="bg-white">
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Blog
          </span>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Compliance, security, and product updates</h1>
          <p className="text-lg text-gray-600">Latest insights from the Disclosurely team.</p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{post.title}</CardTitle>
                <CardDescription>
                  {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : "—"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between">
                <p className="mb-6 text-gray-700 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-blue-600 underline-offset-2 hover:underline"
                >
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              No blog posts available. Check back soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

