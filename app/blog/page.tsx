import { Suspense } from "react";
import { Metadata } from "next";
import { SectionWrapper, Headline } from "@/components/ai1";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedPostHero } from "@/components/blog/featured-post-hero";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Pagination } from "@/components/blog/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPublishedBlogPosts,
  getFeaturedBlogPost,
} from "@/lib/repositories/blog";
import { getSampleBlogPosts } from "@/lib/blog-utils";
import { PostCategory } from "@prisma/client";

export const metadata: Metadata = {
  title: "Blog - AI1 Design System",
  description:
    "Explore articles on web development, AI, game development, SEO, and industry insights.",
  openGraph: {
    title: "Blog - AI1 Design System",
    description:
      "Explore articles on web development, AI, game development, SEO, and industry insights.",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

async function BlogContent({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category as PostCategory | undefined;

  let result;
  let featuredPost = null;

  try {
    // Try to fetch from database
    result = await getPublishedBlogPosts({ page, limit: 9, category });
    
    // Only fetch featured post on first page without category filter
    if (page === 1 && !category) {
      featuredPost = await getFeaturedBlogPost();
    }
  } catch {
    // Fallback to sample posts if database is empty or unavailable
    console.log("Using sample blog posts");
    const samplePosts = getSampleBlogPosts();
    
    // Filter by category if provided
    const filteredPosts = category
      ? samplePosts.filter((post) => post.categories.includes(category))
      : samplePosts;

    // Implement pagination
    const limit = 9;
    const skip = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(skip, skip + limit);

    result = {
      posts: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPosts.length / limit),
    };

    // Set featured post from samples
    if (page === 1 && !category) {
      featuredPost = samplePosts.find((post) => post.featured) || null;
    }
  }

  const { posts, totalPages } = result;

  return (
    <>
      {/* Featured Post Hero */}
      {featuredPost && (
        <FeaturedPostHero
          slug={featuredPost.slug}
          title={featuredPost.title}
          excerpt={featuredPost.excerpt}
          author={featuredPost.author}
          categories={featuredPost.categories}
          publishedAt={featuredPost.publishedAt!}
          featuredImage={featuredPost.featuredImage}
          readingTime={featuredPost.readingTime}
        />
      )}

      {/* Category Filter */}
      <CategoryFilter />

      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                categories={post.categories}
                publishedAt={post.publishedAt!}
                featuredImage={post.featuredImage}
                readingTime={post.readingTime}
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No blog posts found in this category.
          </p>
        </div>
      )}
    </>
  );
}

function BlogLoadingSkeleton() {
  return (
    <>
      <div className="glass-card p-8 md:p-12 mb-12 rounded-2xl">
        <Skeleton className="h-8 w-24 mb-4" />
        <Skeleton className="h-16 w-full max-w-3xl mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-6" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <SectionWrapper>
      <Headline
        as="h1"
        subtitle="Insights on web development, AI, game development, SEO, and industry trends"
      >
        Blog
      </Headline>

      <Suspense fallback={<BlogLoadingSkeleton />}>
        <BlogContent searchParams={resolvedSearchParams} />
      </Suspense>
    </SectionWrapper>
  );
}
