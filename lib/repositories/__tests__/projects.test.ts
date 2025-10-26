import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProjectCategory } from "@prisma/client";
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject,
} from "../projects";
import { NotFoundError } from "@/lib/errors";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

// Mock Next.js cache functions
vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

import { prisma } from "@/lib/prisma";

describe("Projects Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllProjects", () => {
    it("should fetch all projects", async () => {
      const mockProjects = [
        {
          id: "1",
          slug: "project-1",
          title: "Project 1",
          description: "Description 1",
          category: ProjectCategory.WEB_DEVELOPMENT,
          technologies: ["React"],
          images: [],
          client: null,
          results: null,
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects);

      const result = await getAllProjects();

      expect(result).toEqual(mockProjects);
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("getFeaturedProjects", () => {
    it("should fetch only featured projects", async () => {
      const mockProjects = [
        {
          id: "1",
          slug: "featured-project",
          title: "Featured Project",
          description: "Description",
          category: ProjectCategory.WEB_DEVELOPMENT,
          technologies: ["React"],
          images: [],
          client: null,
          results: null,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects);

      const result = await getFeaturedProjects();

      expect(result).toEqual(mockProjects);
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("getProjectBySlug", () => {
    it("should fetch a project by slug", async () => {
      const mockProject = {
        id: "1",
        slug: "test-project",
        title: "Test Project",
        description: "Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: [],
        client: null,
        results: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.project.findUnique).mockResolvedValue(mockProject);

      const result = await getProjectBySlug("test-project");

      expect(result).toEqual(mockProject);
      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { slug: "test-project" },
      });
    });

    it("should throw NotFoundError if project does not exist", async () => {
      vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

      await expect(getProjectBySlug("non-existent")).rejects.toThrow(NotFoundError);
    });
  });

  describe("getProjectsByCategory", () => {
    it("should fetch projects by category", async () => {
      const mockProjects = [
        {
          id: "1",
          slug: "web-project",
          title: "Web Project",
          description: "Description",
          category: ProjectCategory.WEB_DEVELOPMENT,
          technologies: ["React"],
          images: [],
          client: null,
          results: null,
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects);

      const result = await getProjectsByCategory(ProjectCategory.WEB_DEVELOPMENT);

      expect(result).toEqual(mockProjects);
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { category: ProjectCategory.WEB_DEVELOPMENT },
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("createProject", () => {
    it("should create a new project with valid data", async () => {
      const input = {
        slug: "new-project",
        title: "New Project",
        description: "A new project description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React", "TypeScript"],
        images: ["https://example.com/image.jpg"],
      };

      const mockProject = {
        id: "1",
        ...input,
        client: null,
        results: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.project.create).mockResolvedValue(mockProject);

      const result = await createProject(input);

      expect(result).toEqual(mockProject);
      expect(prisma.project.create).toHaveBeenCalled();
    });

    it("should reject invalid data", async () => {
      const input = {
        slug: "Invalid Slug!",
        title: "Test",
        description: "Test",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: [],
      };

      await expect(createProject(input)).rejects.toThrow();
    });
  });

  describe("updateProject", () => {
    it("should update a project with valid data", async () => {
      const existingProject = {
        id: "1",
        slug: "test-project",
        title: "Old Title",
        description: "Old Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: [],
        client: null,
        results: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedProject = {
        ...existingProject,
        title: "New Title",
      };

      vi.mocked(prisma.project.findUnique).mockResolvedValue(existingProject);
      vi.mocked(prisma.project.update).mockResolvedValue(updatedProject);

      const result = await updateProject("test-project", { title: "New Title" });

      expect(result.title).toBe("New Title");
      expect(prisma.project.update).toHaveBeenCalled();
    });

    it("should throw NotFoundError if project does not exist", async () => {
      vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

      await expect(updateProject("non-existent", { title: "Test" })).rejects.toThrow(NotFoundError);
    });
  });

  describe("deleteProject", () => {
    it("should delete a project", async () => {
      const mockProject = {
        id: "1",
        slug: "test-project",
        title: "Test Project",
        description: "Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: [],
        client: null,
        results: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.project.delete).mockResolvedValue(mockProject);

      const result = await deleteProject("test-project");

      expect(result).toEqual(mockProject);
      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: { slug: "test-project" },
      });
    });
  });
});
