'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguageFromUrl } from '@/hooks/useLanguageFromUrl';
import type { BlogPost } from '@/lib/contentful';

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const { langPrefix } = useLanguageFromUrl();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const allPosts: BlogPost[] = await response.json();
        // Get only published posts and limit to 3
        const publishedPosts = allPosts
          .filter((post) => post.publishDate && new Date(post.publishDate) <= new Date())
          .slice(0, 3);
        setPosts(publishedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFeaturedImageUrl = (post: BlogPost): string | null => {
    if (post.featuredImage?.fields?.file?.url) {
      return `https:${post.featuredImage.fields.file.url}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Latest Insights</h2>
            <p className="mb-8 text-lg text-gray-600">Loading our latest articles...</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 rounded-t-lg bg-gray-200"></div>
                  <CardHeader>
                    <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 rounded bg-gray-200"></div>
                      <div className="h-3 w-5/6 rounded bg-gray-200"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return null; // Don't show section if no posts or error
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Latest Insights</h2>
          <p className="text-lg text-gray-600">
            Stay informed with our latest articles on compliance, security, and whistleblowing best practices.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getFeaturedImageUrl(post);
            return (
              <Card key={post.id} className="group transition-shadow duration-300 hover:shadow-lg">
                {imageUrl && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-blue-600">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3 text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                  <Link
                    href={`${langPrefix}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-medium text-blue-600 transition-all hover:text-blue-700 group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href={`${langPrefix}/blog`}>
            <Button variant="outline" size="lg" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;

