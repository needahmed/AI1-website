import { z } from "zod";
import {
  ProjectCategory,
  PostCategory,
  ProjectType,
  BudgetRange,
} from "@prisma/client";

// Helper to create enum schema from Prisma enum
const projectCategorySchema = z.nativeEnum(ProjectCategory);
const postCategorySchema = z.nativeEnum(PostCategory);
const projectTypeSchema = z.nativeEnum(ProjectType);
const budgetRangeSchema = z.nativeEnum(BudgetRange);

// Project schemas
export const createProjectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    ),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description is too long"),
  overview: z.string().max(5000, "Overview is too long").optional(),
  challenges: z.string().max(5000, "Challenges text is too long").optional(),
  solutions: z.string().max(5000, "Solutions text is too long").optional(),
  category: projectCategorySchema,
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(20, "Too many technologies"),
  images: z.array(z.string().url("Invalid image URL")).max(20, "Too many images"),
  client: z.string().max(200, "Client name is too long").optional(),
  results: z.string().max(2000, "Results text is too long").optional(),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        description: z.string().optional(),
      }),
    )
    .max(10, "Too many metrics")
    .optional(),
  testimonial: z
    .object({
      text: z.string(),
      author: z.string(),
      role: z.string(),
      company: z.string().optional(),
    })
    .optional(),
  ogImage: z.string().url("Invalid OG image URL").optional(),
  featured: z.boolean().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

// Blog Post schemas
export const createBlogPostSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    ),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title is too long"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(500, "Excerpt is too long"),
  content: z.string().min(1, "Content is required"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author name is too long"),
  categories: z
    .array(postCategorySchema)
    .min(1, "At least one category is required")
    .max(5, "Too many categories"),
  publishedAt: z.coerce.date().optional(),
  featuredImage: z.string().url("Invalid image URL").optional(),
  seoMeta: z.record(z.string(), z.any()).optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

// Contact Submission schema
export const createContactSubmissionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email is too long"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format")
    .optional(),
  company: z.string().max(200, "Company name is too long").optional(),
  projectType: projectTypeSchema,
  budgetRange: budgetRangeSchema,
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

// Newsletter Subscriber schema
export const createNewsletterSubscriberSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email is too long"),
  source: z.string().max(100, "Source is too long").optional(),
});

// Export types inferred from schemas
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
export type CreateContactSubmissionInput = z.infer<
  typeof createContactSubmissionSchema
>;
export type CreateNewsletterSubscriberInput = z.infer<
  typeof createNewsletterSubscriberSchema
>;
