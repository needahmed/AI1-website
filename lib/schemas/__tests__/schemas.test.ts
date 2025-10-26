import { describe, it, expect } from "vitest";
import {
  createProjectSchema,
  updateProjectSchema,
  createBlogPostSchema,
  updateBlogPostSchema,
  createContactSubmissionSchema,
  createNewsletterSubscriberSchema,
} from "../index";
import { ProjectCategory, PostCategory, ProjectType, BudgetRange } from "@prisma/client";

describe("Project Schemas", () => {
  describe("createProjectSchema", () => {
    it("should validate a valid project", () => {
      const validProject = {
        slug: "test-project",
        title: "Test Project",
        description: "This is a test project description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React", "TypeScript"],
        images: ["https://example.com/image.jpg"],
        featured: false,
      };

      const result = createProjectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("should reject invalid slug format", () => {
      const invalidProject = {
        slug: "Test Project!",
        title: "Test Project",
        description: "Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: [],
      };

      const result = createProjectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("slug");
      }
    });

    it("should reject empty technologies array", () => {
      const invalidProject = {
        slug: "test-project",
        title: "Test Project",
        description: "Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: [],
        images: [],
      };

      const result = createProjectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("technologies");
      }
    });

    it("should reject invalid image URLs", () => {
      const invalidProject = {
        slug: "test-project",
        title: "Test Project",
        description: "Description",
        category: ProjectCategory.WEB_DEVELOPMENT,
        technologies: ["React"],
        images: ["not-a-url"],
      };

      const result = createProjectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("images");
      }
    });
  });

  describe("updateProjectSchema", () => {
    it("should allow partial updates", () => {
      const partialUpdate = {
        title: "Updated Title",
      };

      const result = updateProjectSchema.safeParse(partialUpdate);
      expect(result.success).toBe(true);
    });

    it("should validate provided fields", () => {
      const invalidUpdate = {
        slug: "Invalid Slug!",
      };

      const result = updateProjectSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
    });
  });
});

describe("Blog Post Schemas", () => {
  describe("createBlogPostSchema", () => {
    it("should validate a valid blog post", () => {
      const validPost = {
        slug: "test-blog-post",
        title: "Test Blog Post",
        excerpt: "This is a test excerpt",
        content: "This is the full content of the blog post",
        author: "John Doe",
        categories: [PostCategory.TECH],
        publishedAt: new Date(),
        featuredImage: "https://example.com/image.jpg",
        seoMeta: { title: "SEO Title" },
      };

      const result = createBlogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
    });

    it("should reject empty categories", () => {
      const invalidPost = {
        slug: "test-post",
        title: "Test Post",
        excerpt: "Excerpt",
        content: "Content",
        author: "Author",
        categories: [],
      };

      const result = createBlogPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("categories");
      }
    });

    it("should coerce date strings to Date objects", () => {
      const postWithDateString = {
        slug: "test-post",
        title: "Test Post",
        excerpt: "Excerpt",
        content: "Content",
        author: "Author",
        categories: [PostCategory.TECH],
        publishedAt: "2024-01-01T00:00:00Z",
      };

      const result = createBlogPostSchema.safeParse(postWithDateString);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.publishedAt).toBeInstanceOf(Date);
      }
    });
  });
});

describe("Contact Submission Schema", () => {
  describe("createContactSubmissionSchema", () => {
    it("should validate a valid contact submission", () => {
      const validSubmission = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1-234-567-8900",
        company: "Acme Corp",
        projectType: ProjectType.WEB_DEVELOPMENT,
        budgetRange: BudgetRange.RANGE_10K_25K,
        message: "I would like to discuss a project with you.",
      };

      const result = createContactSubmissionSchema.safeParse(validSubmission);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidSubmission = {
        name: "John Doe",
        email: "invalid-email",
        projectType: ProjectType.WEB_DEVELOPMENT,
        budgetRange: BudgetRange.RANGE_10K_25K,
        message: "This is a valid message.",
      };

      const result = createContactSubmissionSchema.safeParse(invalidSubmission);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("should reject message that is too short", () => {
      const invalidSubmission = {
        name: "John Doe",
        email: "john@example.com",
        projectType: ProjectType.WEB_DEVELOPMENT,
        budgetRange: BudgetRange.RANGE_10K_25K,
        message: "Short",
      };

      const result = createContactSubmissionSchema.safeParse(invalidSubmission);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("message");
      }
    });

    it("should reject invalid phone format", () => {
      const invalidSubmission = {
        name: "John Doe",
        email: "john@example.com",
        phone: "abc-def-ghij",
        projectType: ProjectType.WEB_DEVELOPMENT,
        budgetRange: BudgetRange.RANGE_10K_25K,
        message: "This is a valid message.",
      };

      const result = createContactSubmissionSchema.safeParse(invalidSubmission);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("phone");
      }
    });

    it("should allow optional fields to be omitted", () => {
      const minimalSubmission = {
        name: "John Doe",
        email: "john@example.com",
        projectType: ProjectType.WEB_DEVELOPMENT,
        budgetRange: BudgetRange.RANGE_10K_25K,
        message: "This is a valid message.",
      };

      const result = createContactSubmissionSchema.safeParse(minimalSubmission);
      expect(result.success).toBe(true);
    });
  });
});

describe("Newsletter Subscriber Schema", () => {
  describe("createNewsletterSubscriberSchema", () => {
    it("should validate a valid newsletter subscription", () => {
      const validSubscription = {
        email: "subscriber@example.com",
        source: "homepage",
      };

      const result = createNewsletterSubscriberSchema.safeParse(validSubscription);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidSubscription = {
        email: "not-an-email",
      };

      const result = createNewsletterSubscriberSchema.safeParse(invalidSubscription);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email");
      }
    });

    it("should allow source to be optional", () => {
      const minimalSubscription = {
        email: "subscriber@example.com",
      };

      const result = createNewsletterSubscriberSchema.safeParse(minimalSubscription);
      expect(result.success).toBe(true);
    });
  });
});
