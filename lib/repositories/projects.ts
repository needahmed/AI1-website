import { prisma } from "@/lib/prisma";
import { ProjectCategory } from "@prisma/client";
import { revalidateTag, revalidatePath } from "next/cache";
import {
  handlePrismaError,
  NotFoundError,
  logger,
  ValidationError,
} from "@/lib/errors";
import {
  createProjectSchema,
  updateProjectSchema,
  type CreateProjectInput,
  type UpdateProjectInput,
} from "@/lib/schemas";

// Cache tags for revalidation
export const PROJECT_CACHE_TAGS = {
  all: "projects",
  featured: "projects:featured",
  byCategory: (category: ProjectCategory) => `projects:category:${category}`,
  bySlug: (slug: string) => `projects:slug:${slug}`,
} as const;

/**
 * Get all projects with optional caching
 */
export async function getAllProjects() {
  try {
    logger.debug("Fetching all projects");
    
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${projects.length} projects`);
    return projects;
  } catch (error) {
    logger.error("Error fetching all projects", error);
    throw handlePrismaError(error);
  }
}

/**
 * Get featured projects with caching
 */
export async function getFeaturedProjects() {
  try {
    logger.debug("Fetching featured projects");
    
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${projects.length} featured projects`);
    return projects;
  } catch (error) {
    logger.error("Error fetching featured projects", error);
    throw handlePrismaError(error);
  }
}

/**
 * Get project by slug with caching
 */
export async function getProjectBySlug(slug: string) {
  try {
    logger.debug("Fetching project by slug", { slug });
    
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
    });
    
    if (!project) {
      throw new NotFoundError("Project");
    }
    
    logger.info("Fetched project", { slug, id: project.id });
    return project;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error fetching project by slug", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Get projects by category with caching
 */
export async function getProjectsByCategory(category: ProjectCategory) {
  try {
    logger.debug("Fetching projects by category", { category });
    
    const projects = await prisma.project.findMany({
      where: {
        category,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${projects.length} projects in category ${category}`);
    return projects;
  } catch (error) {
    logger.error("Error fetching projects by category", error, { category });
    throw handlePrismaError(error);
  }
}

/**
 * Create a new project with validation
 */
export async function createProject(input: CreateProjectInput) {
  try {
    logger.debug("Creating project", { slug: input.slug });
    
    // Validate input
    const validatedData = createProjectSchema.parse(input);
    
    const project = await prisma.project.create({
      data: validatedData,
    });
    
    // Revalidate caches
    revalidateTag(PROJECT_CACHE_TAGS.all, "default");
    if (project.featured) {
      revalidateTag(PROJECT_CACHE_TAGS.featured, "default");
    }
    revalidateTag(PROJECT_CACHE_TAGS.byCategory(project.category), "default");
    revalidatePath("/projects");
    
    logger.info("Created project", { id: project.id, slug: project.slug });
    return project;
  } catch (error) {
    logger.error("Error creating project", error, { slug: input.slug });
    throw handlePrismaError(error);
  }
}

/**
 * Update a project with validation
 */
export async function updateProject(slug: string, input: UpdateProjectInput) {
  try {
    logger.debug("Updating project", { slug });
    
    // Validate input
    const validatedData = updateProjectSchema.parse(input);
    
    // Get the existing project first to determine what to revalidate
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });
    
    if (!existingProject) {
      throw new NotFoundError("Project");
    }
    
    const project = await prisma.project.update({
      where: { slug },
      data: validatedData,
    });
    
    // Revalidate caches
    revalidateTag(PROJECT_CACHE_TAGS.all, "default");
    revalidateTag(PROJECT_CACHE_TAGS.bySlug(slug), "default");
    
    // If featured status changed, revalidate featured cache
    if (existingProject.featured !== project.featured) {
      revalidateTag(PROJECT_CACHE_TAGS.featured, "default");
    }
    
    // If category changed, revalidate both old and new category caches
    if (existingProject.category !== project.category) {
      revalidateTag(PROJECT_CACHE_TAGS.byCategory(existingProject.category), "default");
      revalidateTag(PROJECT_CACHE_TAGS.byCategory(project.category), "default");
    }
    
    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`);
    
    logger.info("Updated project", { id: project.id, slug });
    return project;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error updating project", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Delete a project
 */
export async function deleteProject(slug: string) {
  try {
    logger.debug("Deleting project", { slug });
    
    const project = await prisma.project.delete({
      where: { slug },
    });
    
    // Revalidate caches
    revalidateTag(PROJECT_CACHE_TAGS.all, "default");
    revalidateTag(PROJECT_CACHE_TAGS.bySlug(slug), "default");
    if (project.featured) {
      revalidateTag(PROJECT_CACHE_TAGS.featured, "default");
    }
    revalidateTag(PROJECT_CACHE_TAGS.byCategory(project.category), "default");
    revalidatePath("/projects");
    
    logger.info("Deleted project", { slug });
    return project;
  } catch (error) {
    logger.error("Error deleting project", error, { slug });
    throw handlePrismaError(error);
  }
}

/**
 * Project Repository
 * Collection of all project-related database operations
 */
export const projectRepository = {
  findAll: async (options?: { featured?: boolean; limit?: number }) => {
    if (options?.featured) {
      const projects = await getFeaturedProjects();
      return options?.limit ? projects.slice(0, options.limit) : projects;
    }
    const projects = await getAllProjects();
    return options?.limit ? projects.slice(0, options.limit) : projects;
  },
  findBySlug: getProjectBySlug,
  findByCategory: getProjectsByCategory,
  create: createProject,
  update: updateProject,
  delete: deleteProject,
};
