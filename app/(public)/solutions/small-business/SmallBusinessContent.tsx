"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Shield, Lock, Users, TrendingUp, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import I18nProvider from "@/components/I18nProvider";
import { useLanguageFromUrl } from "@/hooks/useLanguageFromUrl";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { supportedLanguages } from "@/i18n/client";
import { track } from "@vercel/analytics";
import type { BlogPost } from "@/lib/contentful";

type Lang = (typeof supportedLanguages)[number];

function SmallBusinessContent() {
  const { currentLanguage } = useLanguageFromUrl();
  const { prefix: langPrefix } = useLangPrefix();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);

  useEffect(() => {
    const lang = currentLanguage || "en";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [currentLanguage]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingBlog(true);
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const allPosts: BlogPost[] = await response.json();
        // Filter by "Small Businesses" category (checking both slug and name)
        const smallBusinessPosts = allPosts
          .filter((post) => {
            if (!post.publishDate || new Date(post.publishDate) > new Date()) return false;
            return post.categories?.some(
              (cat) =>
                cat.slug?.toLowerCase().includes("small-business") ||
                cat.name?.toLowerCase().includes("small business") ||
                cat.slug?.toLowerCase() === "small-businesses"
            );
          })
          .slice(0, 3);
        setBlogPosts(smallBusinessPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleStartTrial = (location: string) => {
    track("start_free_trial", { location, plan: "small_business" });
    window.location.href = "https://app.disclosurely.com/auth/signup";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFeaturedImageUrl = (post: BlogPost): string | null => {
    if (typeof post.featuredImage === "string") {
      return post.featuredImage.startsWith("http") ? post.featuredImage : `https:${post.featuredImage}`;
    }
    if (post.featuredImage && typeof post.featuredImage === "object" && "fields" in post.featuredImage) {
      const asset = post.featuredImage as any;
      if (asset.fields?.file?.url) {
        return `https:${asset.fields.file.url}`;
      }
    }
    return null;
  };

  return (
    <I18nProvider>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-white px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                Whistleblowing Systems for UK Small Businesses
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 sm:text-xl">
                You don&apos;t need 50+ employees to benefit from secure anonymous reporting. Disclosurely helps small teams spot fraud, resolve issues early, and protect your hard-earned profits.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => handleStartTrial("small_business_hero")}
                  className="w-full rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                >
                  Start Free Trial
                </button>
                <Link
                  href={`${langPrefix}/pricing`}
                  className="w-full rounded-lg border border-gray-300 px-8 py-3 text-center text-lg font-semibold text-gray-700 transition-colors hover:border-gray-400 sm:w-auto"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section - 2 Column Layout */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                  Small Businesses Can&apos;t Afford Fraud or Drama
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    UK SMEs lose millions annually to employee theft, expense fraud, and unresolved workplace issues. One bad actor can wipe out a quarter&apos;s profit. Messy HR disputes drain time and morale. Without a proper speak-up channel, problems fester until they explode – costing you money, reputation, and good people.
                  </p>
                  <p>
                    Disclosurely gives your team a safe, anonymous way to report concerns before they become crises. No compliance complexity, no big IT setup – just fast, secure reporting that protects your business.
                  </p>
                </div>
              </div>
              <div>
                <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <Image
                    src="/assets/artwork/small_business_image.jpg"
                    alt="Whistleblowing software for small UK businesses"
                    width={1200}
                    height={720}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Key Benefits */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                What Disclosurely Delivers for Small Businesses
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Cut Financial Losses</h3>
                  <p className="text-gray-600">
                    Spot theft, fraud, and expense abuse early through anonymous tips that help you catch problems before they escalate.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Reduce HR Headaches</h3>
                  <p className="text-gray-600">
                    Structured reporting prevents grievances escalating to tribunals, saving time, legal costs, and team morale.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Protect Your Reputation</h3>
                  <p className="text-gray-600">
                    Show customers and partners you take ethics seriously with a professional whistleblowing system that builds trust.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Build Team Trust</h3>
                  <p className="text-gray-600">
                    Safe channels make people feel valued and heard, improving workplace culture and employee retention.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">Future-Proof</h3>
                  <p className="text-gray-600">
                    Ready when you hit 50 employees or expand into EU markets – no need to switch platforms as you grow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4: Why SMEs Choose Disclosurely */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">
                Built for Small Teams, Serious Protection
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <Link href="/blog/what-is-aes-gcm-encryption/" className="text-blue-600 hover:text-blue-700 underline">
                      <strong>AES-256 encryption</strong>
                    </Link>{" "}
                    (military-grade, no tech skills needed)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <strong>Zero setup</strong> – browser-based, works on any device, no IT department required
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <strong>One price covers everything</strong> –{" "}
                    <Link href={`${langPrefix}/pricing`} className="text-blue-600 hover:text-blue-700 underline">
                      transparent pricing
                    </Link>{" "}
                    with no hidden fees or per-user charges
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <strong>UK-based, GDPR-ready by design</strong> – built for UK businesses with data protection built in
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Social Proof */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Small Businesses Using Disclosurely
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl bg-white p-8">
                <CardContent className="p-0">
                  <div className="mb-4 text-4xl font-bold text-blue-600">80%</div>
                  <p className="mb-4 text-gray-700">
                    &quot;Reduced fraud incidents by 80% in first quarter. The anonymous reporting gave us early warning we never had before.&quot;
                  </p>
                  <p className="font-semibold text-gray-900">— Retail SME, 35 employees</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8">
                <CardContent className="p-0">
                  <div className="mb-4 text-4xl font-bold text-blue-600">£12K</div>
                  <p className="mb-4 text-gray-700">
                    &quot;Caught expense fraud that would have cost us £12,000. Setup took 10 minutes, and it&apos;s already paid for itself.&quot;
                  </p>
                  <p className="font-semibold text-gray-900">— Professional Services, 28 employees</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white p-8">
                <CardContent className="p-0">
                  <div className="mb-4 text-4xl font-bold text-blue-600">0</div>
                  <p className="mb-4 text-gray-700">
                    &quot;Zero HR disputes escalated to tribunals since we launched. Employees feel heard, and we catch issues early.&quot;
                  </p>
                  <p className="font-semibold text-gray-900">— Manufacturing SME, 42 employees</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        {!loadingBlog && blogPosts.length > 0 && (
          <section className="bg-gray-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Latest Insights for Small Businesses</h2>
                <p className="text-lg text-gray-600">
                  Stay informed with articles specifically tailored for UK SMEs and small business owners.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {blogPosts.map((post) => {
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
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                          {post.publishDate && (
                            <>
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(post.publishDate)}</span>
                            </>
                          )}
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
          </section>
        )}

        {/* Section 6: CTA Section */}
        <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              Protect Your Business in Minutes
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Start your 14-day free trial. No credit card, no commitment.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => handleStartTrial("small_business_cta")}
                className="w-full rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto"
              >
                Start Free Trial
              </button>
              <Link
                href={`${langPrefix}/contact`}
                className="w-full rounded-lg border border-blue-500 bg-blue-700 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-800 sm:w-auto"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </I18nProvider>
  );
}

export default SmallBusinessContent;

