"use server";

import {
  getPublishedBlogPosts,
  getPublishedBlogPostBySlug,
  getBlogPostsByCategory,
  searchBlogPosts,
} from "@/lib/repositories/blog";
import { PostCategory } from "@prisma/client";
import { logger } from "@/lib/errors";
import type { ApiResponse } from "@/lib/types";

/**
 * Server action to get all published blog posts
 */
export async function getPublishedBlogPostsAction(options?: {
  page?: number;
  limit?: number;
  category?: PostCategory;
}): Promise<ApiResponse<Awaited<ReturnType<typeof getPublishedBlogPosts>>>> {
  try {
    const posts = await getPublishedBlogPosts(options);
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    logger.error("Error in getPublishedBlogPostsAction", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog posts",
    };
  }
}

/**
 * Server action to get a published blog post by slug
 */
export async function getPublishedBlogPostBySlugAction(
  slug: string,
): Promise<ApiResponse<Awaited<ReturnType<typeof getPublishedBlogPostBySlug>>>> {
  try {
    const post = await getPublishedBlogPostBySlug(slug);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    logger.error("Error in getPublishedBlogPostBySlugAction", error, { slug });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog post",
    };
  }
}

/**
 * Server action to get blog posts by category
 */
export async function getBlogPostsByCategoryAction(
  category: PostCategory,
): Promise<ApiResponse<Awaited<ReturnType<typeof getBlogPostsByCategory>>>> {
  try {
    const posts = await getBlogPostsByCategory(category);
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    logger.error("Error in getBlogPostsByCategoryAction", error, { category });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog posts by category",
    };
  }
}

/**
 * Server action to search blog posts
 */
export async function searchBlogPostsAction(
  searchTerm: string,
): Promise<ApiResponse<Awaited<ReturnType<typeof searchBlogPosts>>>> {
  try {
    const posts = await searchBlogPosts(searchTerm);
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    logger.error("Error in searchBlogPostsAction", error, { searchTerm });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search blog posts",
    };
  }
}
