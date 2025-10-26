import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SectionWrapper } from "@/components/ai1";
import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SocialSharing } from "@/components/blog/social-sharing";
import { AuthorBio } from "@/components/blog/author-bio";
import { RelatedPosts } from "@/components/blog/related-posts";
import {
  getPublishedBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/repositories/blog";
import {
  formatCategory,
  generateTableOfContents,
  getSampleBlogPosts,
} from "@/lib/blog-utils";
import { Clock, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let post;
  try {
    post = await getPublishedBlogPostBySlug(slug);
  } catch {
    const samplePosts = getSampleBlogPosts();
    post = samplePosts.find((p) => p.slug === slug);
  }

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const seoMeta = post.seoMeta as Record<string, string> | null;

  return {
    title: seoMeta?.title || post.title,
    description: seoMeta?.description || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: seoMeta?.ogTitle || post.title,
      description: seoMeta?.ogDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      url: `/blog/${slug}`,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoMeta?.twitterTitle || post.title,
      description: seoMeta?.twitterDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  let relatedPosts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    featuredImage?: string | null;
    categories: string[];
    readingTime?: number | null;
  }> = [];

  try {
    post = await getPublishedBlogPostBySlug(slug);
    relatedPosts = await getRelatedBlogPosts(slug, 3);
  } catch {
    const samplePosts = getSampleBlogPosts();
    post = samplePosts.find((p) => p.slug === slug);
    
    if (post) {
      // Get related sample posts
      relatedPosts = samplePosts
        .filter((p) => p.slug !== slug)
        .filter((p) => p.categories.some((c) => post!.categories.includes(c)))
        .slice(0, 3);
    }
  }

  if (!post) {
    notFound();
  }

  const tableOfContents = generateTableOfContents(post.content);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`;

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AI1 Design System",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionWrapper className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          <article className="min-w-0">
            {/* Skip to content link for accessibility */}
            <a
              href="#article-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:border"
            >
              Skip to content
            </a>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {formatCategory(category)}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  {post.authorImage && (
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium text-foreground">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt!).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>

              {post.featuredImage && (
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <SocialSharing title={post.title} url={postUrl} />
            </header>

            {/* Article Content */}
            <div id="article-content">
              <MarkdownContent content={post.content} />
            </div>

            {/* Author Bio */}
            <AuthorBio
              name={post.author}
              bio={post.authorBio}
              image={post.authorImage}
            />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </article>

          {/* Table of Contents Sidebar */}
          <aside>
            <TableOfContents headings={tableOfContents} />
          </aside>
        </div>
      </SectionWrapper>
    </>
  );
}
