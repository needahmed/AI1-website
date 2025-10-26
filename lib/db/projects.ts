import { prisma } from "@/lib/prisma";
import { ProjectCategory } from "@prisma/client";

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: {
      slug,
    },
  });
}

export async function getProjectsByCategory(category: ProjectCategory) {
  return prisma.project.findMany({
    where: {
      category,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
