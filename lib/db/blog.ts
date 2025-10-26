import { prisma } from "@/lib/prisma";
import { PostCategory } from "@prisma/client";

export async function getPublishedBlogPosts(limit?: number) {
  return prisma.blogPost.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: {
      slug,
    },
  });
}

export async function getBlogPostsByCategory(category: PostCategory) {
  return prisma.blogPost.findMany({
    where: {
      categories: {
        has: category,
      },
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function searchBlogPosts(searchTerm: string) {
  return prisma.blogPost.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}
