"use server";

import { revalidatePath } from "next/cache";
import * as adminRepo from "@/lib/repositories/admin";
import * as projectRepo from "@/lib/repositories/projects";
import * as blogRepo from "@/lib/repositories/blog";
import { auth } from "@/lib/auth";
import { AdminRole, SubscriberStatus } from "@prisma/client";
import { CreateProjectInput, UpdateProjectInput, CreateBlogPostInput, UpdateBlogPostInput } from "@/lib/schemas";

// Helper to ensure user is authenticated
async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

// Analytics
export async function getAnalyticsAction() {
  try {
    await requireAuth();
    const data = await adminRepo.getAnalytics();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch analytics",
    };
  }
}

// Leads management
export async function getAllLeadsAction() {
  try {
    await requireAuth();
    const data = await adminRepo.getAllLeads();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch leads",
    };
  }
}

export async function updateLeadStatusAction(id: string, status: string) {
  try {
    await requireAuth();
    const data = await adminRepo.updateLeadStatus(id, status);
    revalidatePath("/admin/leads");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update lead status",
    };
  }
}

export async function updateLeadNotesAction(id: string, notes: string) {
  try {
    await requireAuth();
    const data = await adminRepo.updateLeadNotes(id, notes);
    revalidatePath("/admin/leads");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update lead notes",
    };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    await requireAuth();
    await adminRepo.deleteLead(id);
    revalidatePath("/admin/leads");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete lead",
    };
  }
}

// Subscribers management
export async function getAllSubscribersAction() {
  try {
    await requireAuth();
    const data = await adminRepo.getAllSubscribers();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch subscribers",
    };
  }
}

export async function updateSubscriberStatusAction(
  id: string,
  status: SubscriberStatus
) {
  try {
    await requireAuth();
    const data = await adminRepo.updateSubscriberStatus(id, status);
    revalidatePath("/admin/subscribers");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update subscriber status",
    };
  }
}

export async function deleteSubscriberAction(id: string) {
  try {
    await requireAuth();
    await adminRepo.deleteSubscriber(id);
    revalidatePath("/admin/subscribers");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete subscriber",
    };
  }
}

// Projects CRUD (admin versions with revalidation)
export async function createProjectAction(data: CreateProjectInput) {
  try {
    await requireAuth();
    const project = await projectRepo.createProject(data);
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    return { success: true, data: project };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export async function updateProjectAction(slug: string, data: UpdateProjectInput) {
  try {
    await requireAuth();
    const project = await projectRepo.updateProject(slug, data);
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${slug}`);
    return { success: true, data: project };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProjectAction(slug: string) {
  try {
    await requireAuth();
    await projectRepo.deleteProject(slug);
    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

export async function getAllProjectsAdminAction() {
  try {
    await requireAuth();
    const data = await adminRepo.getAllProjectsAdmin();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch projects",
    };
  }
}

// Blog CRUD (admin versions with revalidation)
export async function createBlogPostAction(data: CreateBlogPostInput) {
  try {
    await requireAuth();
    const post = await blogRepo.createBlogPost(data);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, data: post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
}

export async function updateBlogPostAction(slug: string, data: UpdateBlogPostInput) {
  try {
    await requireAuth();
    const post = await blogRepo.updateBlogPost(slug, data);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return { success: true, data: post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update blog post",
    };
  }
}

export async function deleteBlogPostAction(slug: string) {
  try {
    await requireAuth();
    await blogRepo.deleteBlogPost(slug);
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog post",
    };
  }
}

export async function getAllBlogPostsAdminAction() {
  try {
    await requireAuth();
    const data = await adminRepo.getAllBlogPostsAdmin();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch blog posts",
    };
  }
}

// Admin user management
export async function getAdminUsersAction() {
  try {
    const user = await requireAuth();
    if (user.role !== "SUPER_ADMIN") {
      throw new Error("Insufficient permissions");
    }
    const data = await adminRepo.getAdminUsers();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch admin users",
    };
  }
}

export async function createAdminUserAction(data: {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}) {
  try {
    const user = await requireAuth();
    if (user.role !== "SUPER_ADMIN") {
      throw new Error("Insufficient permissions");
    }
    const newUser = await adminRepo.createAdminUser(data);
    revalidatePath("/admin/settings");
    return { success: true, data: newUser };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create admin user",
    };
  }
}

export async function updateAdminUserAction(
  id: string,
  data: Record<string, unknown>
) {
  try {
    const user = await requireAuth();
    if (user.role !== "SUPER_ADMIN" && user.id !== id) {
      throw new Error("Insufficient permissions");
    }
    const updatedUser = await adminRepo.updateAdminUser(id, data as {
      email?: string;
      name?: string;
      role?: AdminRole;
      password?: string;
    });
    revalidatePath("/admin/settings");
    return { success: true, data: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update admin user",
    };
  }
}

export async function deleteAdminUserAction(id: string) {
  try {
    const user = await requireAuth();
    if (user.role !== "SUPER_ADMIN") {
      throw new Error("Insufficient permissions");
    }
    if (user.id === id) {
      throw new Error("Cannot delete yourself");
    }
    await adminRepo.deleteAdminUser(id);
    revalidatePath("/admin/settings");
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete admin user",
    };
  }
}
