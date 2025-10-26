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
        <Card className="h-full overflow-hidden hover:shadow-ai1-lg transition-all duration-300 hover:scale-[1.02]">
          {featuredImage && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="secondary">
                  {formatCategory(category)}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-ai1-electric transition-colors">
              {title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
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
