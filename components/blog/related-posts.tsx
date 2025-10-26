import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCategory } from "@/lib/blog-utils";
import { Clock } from "lucide-react";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string | null;
  categories: string[];
  readingTime?: number | null;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden hover:shadow-ai1 transition-shadow">
              {post.featuredImage && (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.slice(0, 2).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {formatCategory(category)}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-bold line-clamp-2 group-hover:text-ai1-electric transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                {post.readingTime && (
                  <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
