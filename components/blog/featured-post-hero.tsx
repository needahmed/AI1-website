"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCategory } from "@/lib/blog-utils";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedPostHeroProps {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  categories: string[];
  publishedAt: Date;
  featuredImage?: string | null;
  readingTime?: number | null;
}

export function FeaturedPostHero({
  slug,
  title,
  excerpt,
  author,
  categories,
  publishedAt,
  featuredImage,
  readingTime,
}: FeaturedPostHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-12 mb-12"
    >
      {featuredImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-ai1-electric text-white">Featured</Badge>
          {categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary">
              {formatCategory(category)}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">By {author}</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(publishedAt).toLocaleDateString("en-US", {
                month: "long",
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

        <Link href={`/blog/${slug}`}>
          <Button size="lg" className="group">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
