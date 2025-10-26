"use server";

import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
} from "@/lib/repositories/projects";
import { ProjectCategory } from "@prisma/client";
import { logger } from "@/lib/errors";
import type { ApiResponse } from "@/lib/types";

/**
 * Server action to get all projects
 */
export async function getProjectsAction(): Promise<ApiResponse<Awaited<ReturnType<typeof getAllProjects>>>> {
  try {
    const projects = await getAllProjects();
    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    logger.error("Error in getProjectsAction", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch projects",
    };
  }
}

/**
 * Server action to get featured projects
 */
export async function getFeaturedProjectsAction(): Promise<ApiResponse<Awaited<ReturnType<typeof getFeaturedProjects>>>> {
  try {
    const projects = await getFeaturedProjects();
    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    logger.error("Error in getFeaturedProjectsAction", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch featured projects",
    };
  }
}

/**
 * Server action to get a project by slug
 */
export async function getProjectBySlugAction(
  slug: string,
): Promise<ApiResponse<Awaited<ReturnType<typeof getProjectBySlug>>>> {
  try {
    const project = await getProjectBySlug(slug);
    return {
      success: true,
      data: project,
    };
  } catch (error) {
    logger.error("Error in getProjectBySlugAction", error, { slug });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch project",
    };
  }
}

/**
 * Server action to get projects by category
 */
export async function getProjectsByCategoryAction(
  category: ProjectCategory,
): Promise<ApiResponse<Awaited<ReturnType<typeof getProjectsByCategory>>>> {
  try {
    const projects = await getProjectsByCategory(category);
    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    logger.error("Error in getProjectsByCategoryAction", error, { category });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch projects by category",
    };
  }
}
