"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCategory } from "@/lib/blog-utils";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishedAt: Date;
  featuredImage?: string | null;
  readingTime?: number | null;
  index?: number;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  author,
  categories,
  publishedAt,
  featuredImage,
  readingTime,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <Card className="flex h-full flex-col overflow-hidden gap-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-ai1-lg">
          <div className="relative h-48 w-full overflow-hidden bg-muted/40">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground/70">
                Visual coming soon
              </div>
            )}
          </div>
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="secondary">
                  {formatCategory(category)}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-ai1-electric">
              {title}
            </h3>
          </CardHeader>
          <CardContent className="flex-1 px-6 pb-0">
            <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          </CardContent>
          <CardFooter className="mt-auto w-full justify-between px-6 pb-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>
            <span className="font-medium">{author}</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
