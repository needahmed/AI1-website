import { prisma } from "@/lib/prisma";
import { Prisma, AdminRole, SubscriberStatus } from "@prisma/client";
import { logger } from "@/lib/errors";
import bcrypt from "bcryptjs";

// Analytics functions
export async function getAnalytics() {
  try {
    const [
      totalProjects,
      featuredProjects,
      publishedPosts,
      draftPosts,
      pendingLeads,
      totalLeads,
      activeSubscribers,
      recentLeads,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.blogPost.count({ where: { publishedAt: { not: null } } }),
      prisma.blogPost.count({ where: { publishedAt: null } }),
      prisma.contactSubmission.count({ where: { status: "PENDING" } }),
      prisma.contactSubmission.count(),
      prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
      prisma.contactSubmission.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      projects: {
        total: totalProjects,
        featured: featuredProjects,
      },
      blog: {
        published: publishedPosts,
        drafts: draftPosts,
      },
      leads: {
        pending: pendingLeads,
        total: totalLeads,
      },
      subscribers: {
        active: activeSubscribers,
      },
      recentActivity: recentLeads.map((lead) => ({
        id: lead.id,
        type: "lead" as const,
        title: `New lead from ${lead.name}`,
        description: lead.email,
        createdAt: lead.createdAt,
      })),
    };
  } catch (error) {
    logger.error("Failed to fetch analytics", error);
    throw error;
  }
}

// Lead management functions
export async function getAllLeads() {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch all leads", error);
    throw error;
  }
}

export async function getLeadsByStatus(status: string) {
  try {
    return await prisma.contactSubmission.findMany({
      where: { status: status as any },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch leads by status", error);
    throw error;
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    return await prisma.contactSubmission.update({
      where: { id },
      data: { status: status as any },
    });
  } catch (error) {
    logger.error("Failed to update lead status", error);
    throw error;
  }
}

export async function updateLeadNotes(id: string, notes: string) {
  try {
    return await prisma.contactSubmission.update({
      where: { id },
      data: { notes },
    });
  } catch (error) {
    logger.error("Failed to update lead notes", error);
    throw error;
  }
}

export async function deleteLead(id: string) {
  try {
    return await prisma.contactSubmission.delete({
      where: { id },
    });
  } catch (error) {
    logger.error("Failed to delete lead", error);
    throw error;
  }
}

// Subscriber management functions
export async function getAllSubscribers() {
  try {
    return await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch all subscribers", error);
    throw error;
  }
}

export async function updateSubscriberStatus(
  id: string,
  status: SubscriberStatus
) {
  try {
    return await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    logger.error("Failed to update subscriber status", error);
    throw error;
  }
}

export async function deleteSubscriber(id: string) {
  try {
    return await prisma.newsletterSubscriber.delete({
      where: { id },
    });
  } catch (error) {
    logger.error("Failed to delete subscriber", error);
    throw error;
  }
}

// Admin user management
export async function getAdminUsers() {
  try {
    return await prisma.adminUser.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch admin users", error);
    throw error;
  }
}

export async function createAdminUser(data: {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}) {
  try {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return await prisma.adminUser.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role,
      },
    });
  } catch (error) {
    logger.error("Failed to create admin user", error);
    throw error;
  }
}

export async function updateAdminUser(
  id: string,
  data: {
    email?: string;
    name?: string;
    role?: AdminRole;
    password?: string;
  }
) {
  try {
    const updateData: Prisma.AdminUserUpdateInput = {
      ...(data.email && { email: data.email }),
      ...(data.name && { name: data.name }),
      ...(data.role && { role: data.role }),
    };

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    return await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    logger.error("Failed to update admin user", error);
    throw error;
  }
}

export async function deleteAdminUser(id: string) {
  try {
    return await prisma.adminUser.delete({
      where: { id },
    });
  } catch (error) {
    logger.error("Failed to delete admin user", error);
    throw error;
  }
}

// Projects admin functions (for admin-specific operations)
export async function getAllProjectsAdmin() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch all projects (admin)", error);
    throw error;
  }
}

// Blog admin functions
export async function getAllBlogPostsAdmin() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Failed to fetch all blog posts (admin)", error);
    throw error;
  }
}
