import { prisma } from "@/lib/prisma";
import { PostCategory } from "@prisma/client";
import { revalidateTag, revalidatePath } from "next/cache";
import {
  handlePrismaError,
  NotFoundError,
  logger,
} from "@/lib/errors";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from "@/lib/schemas";

// Cache tags for revalidation
export const BLOG_CACHE_TAGS = {
  all: "blog",
  published: "blog:published",
  byCategory: (category: PostCategory) => `blog:category:${category}`,
  bySlug: (slug: string) => `blog:slug:${slug}`,
} as const;

/**
 * Get all published blog posts with optional limit
 */
export async function getPublishedBlogPosts(limit?: number) {
  try {
    logger.debug("Fetching published blog posts", { limit });
    
    const posts = await prisma.blogPost.findMany({
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
    
    logger.info(`Fetched ${posts.length} published blog posts`);
    return posts;
  } catch (error) {
    logger.error("Error fetching published blog posts", error);
    throw handlePrismaError(error);
  }
}

/**
 * Get blog post by slug with caching
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    logger.debug("Fetching blog post by slug", { slug });
    
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    });
    
    if (!post) {
      throw new NotFoundError("Blog post");
    }
    
    logger.info("Fetched blog post", { slug, id: post.id });
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error fetching blog post by slug", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Get published blog post by slug (only returns if published)
 */
export async function getPublishedBlogPostBySlug(slug: string) {
  try {
    logger.debug("Fetching published blog post by slug", { slug });
    
    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        publishedAt: {
          lte: new Date(),
        },
      },
    });
    
    if (!post) {
      throw new NotFoundError("Blog post");
    }
    
    logger.info("Fetched published blog post", { slug, id: post.id });
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error fetching published blog post by slug", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(category: PostCategory) {
  try {
    logger.debug("Fetching blog posts by category", { category });
    
    const posts = await prisma.blogPost.findMany({
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
    
    logger.info(`Fetched ${posts.length} blog posts in category ${category}`);
    return posts;
  } catch (error) {
    logger.error("Error fetching blog posts by category", error, { category });
    throw handlePrismaError(error);
  }
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(searchTerm: string) {
  try {
    logger.debug("Searching blog posts", { searchTerm });
    
    const posts = await prisma.blogPost.findMany({
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
    
    logger.info(`Found ${posts.length} blog posts matching "${searchTerm}"`);
    return posts;
  } catch (error) {
    logger.error("Error searching blog posts", error, { searchTerm });
    throw handlePrismaError(error);
  }
}

/**
 * Create a new blog post with validation
 */
export async function createBlogPost(input: CreateBlogPostInput) {
  try {
    logger.debug("Creating blog post", { slug: input.slug });
    
    // Validate input
    const validatedData = createBlogPostSchema.parse(input);
    
    const post = await prisma.blogPost.create({
      data: validatedData,
    });
    
    // Revalidate caches
    revalidateTag(BLOG_CACHE_TAGS.all, "default");
    if (post.publishedAt && post.publishedAt <= new Date()) {
      revalidateTag(BLOG_CACHE_TAGS.published, "default");
    }
    post.categories.forEach((category) => {
      revalidateTag(BLOG_CACHE_TAGS.byCategory(category), "default");
    });
    revalidatePath("/blog");
    
    logger.info("Created blog post", { id: post.id, slug: post.slug });
    return post;
  } catch (error) {
    logger.error("Error creating blog post", error, { slug: input.slug });
    throw handlePrismaError(error);
  }
}

/**
 * Update a blog post with validation
 */
export async function updateBlogPost(slug: string, input: UpdateBlogPostInput) {
  try {
    logger.debug("Updating blog post", { slug });
    
    // Validate input
    const validatedData = updateBlogPostSchema.parse(input);
    
    // Get the existing post first to determine what to revalidate
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });
    
    if (!existingPost) {
      throw new NotFoundError("Blog post");
    }
    
    const post = await prisma.blogPost.update({
      where: { slug },
      data: validatedData,
    });
    
    // Revalidate caches
    revalidateTag(BLOG_CACHE_TAGS.all, "default");
    revalidateTag(BLOG_CACHE_TAGS.bySlug(slug), "default");
    revalidateTag(BLOG_CACHE_TAGS.published, "default");
    
    // Revalidate categories
    existingPost.categories.forEach((category) => {
      revalidateTag(BLOG_CACHE_TAGS.byCategory(category), "default");
    });
    post.categories.forEach((category) => {
      revalidateTag(BLOG_CACHE_TAGS.byCategory(category), "default");
    });
    
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    
    logger.info("Updated blog post", { id: post.id, slug });
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error updating blog post", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(slug: string) {
  try {
    logger.debug("Deleting blog post", { slug });
    
    const post = await prisma.blogPost.delete({
      where: { slug },
    });
    
    // Revalidate caches
    revalidateTag(BLOG_CACHE_TAGS.all, "default");
    revalidateTag(BLOG_CACHE_TAGS.bySlug(slug), "default");
    revalidateTag(BLOG_CACHE_TAGS.published, "default");
    post.categories.forEach((category) => {
      revalidateTag(BLOG_CACHE_TAGS.byCategory(category), "default");
    });
    revalidatePath("/blog");
    
    logger.info("Deleted blog post", { slug });
    return post;
  } catch (error) {
    logger.error("Error deleting blog post", error, { slug });
    throw handlePrismaError(error);
  }
}
