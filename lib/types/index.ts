import {
  Project,
  BlogPost,
  ContactSubmission,
  NewsletterSubscriber,
  ProjectCategory,
  PostCategory,
  ProjectType,
  BudgetRange,
  SubmissionStatus,
} from "@prisma/client";

// Re-export Prisma types
export type {
  Project,
  BlogPost,
  ContactSubmission,
  NewsletterSubscriber,
  ProjectCategory,
  PostCategory,
  ProjectType,
  BudgetRange,
  SubmissionStatus,
};

// Domain types for creation and updates
export type CreateProjectInput = {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  images: string[];
  client?: string;
  results?: string;
  featured?: boolean;
};

export type UpdateProjectInput = Partial<CreateProjectInput>;

export type CreateBlogPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  categories: PostCategory[];
  publishedAt?: Date;
  featuredImage?: string;
  seoMeta?: Record<string, unknown>;
};

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;

export type CreateContactSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: ProjectType;
  budgetRange: BudgetRange;
  message: string;
};

export type CreateNewsletterSubscriberInput = {
  email: string;
  source?: string;
};

// Response types
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  details?: Record<string, unknown>;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
