# Data Layer Documentation

This document describes the data access layer implementation for the project, including repositories, server actions, validation, caching, and revalidation strategies.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Validation Schemas](#validation-schemas)
- [Repositories](#repositories)
- [Server Actions](#server-actions)
- [Error Handling](#error-handling)
- [Caching & Revalidation](#caching--revalidation)
- [Testing](#testing)
- [Usage Examples](#usage-examples)

## Overview

The data layer provides a type-safe, validated, and cached interface for interacting with the database through Prisma ORM. It implements the repository pattern with server actions for client-server communication.

### Key Features

- **Type Safety**: Full TypeScript support with Prisma-generated types
- **Validation**: Zod schemas for runtime input validation
- **Error Handling**: Structured error handling with custom error classes
- **Caching**: Next.js cache integration with revalidation
- **Logging**: Comprehensive logging for debugging and monitoring
- **Testing**: Unit tests for all critical functionality

## Architecture

```
┌─────────────────┐
│  Server Actions │  ← Client calls these
└────────┬────────┘
         │
┌────────▼────────┐
│  Repositories   │  ← Business logic & caching
└────────┬────────┘
         │
┌────────▼────────┐
│  Prisma Client  │  ← Database queries
└────────┬────────┘
         │
┌────────▼────────┐
│    MongoDB      │
└─────────────────┘
```

## Directory Structure

```
lib/
├── actions/              # Server actions (client interface)
│   ├── projects.ts
│   ├── blog.ts
│   ├── contact.ts
│   ├── newsletter.ts
│   └── index.ts
├── repositories/         # Repository layer (data access)
│   ├── projects.ts
│   ├── blog.ts
│   ├── contact.ts
│   ├── newsletter.ts
│   ├── index.ts
│   └── __tests__/
├── schemas/             # Zod validation schemas
│   ├── index.ts
│   └── __tests__/
├── types/               # TypeScript type definitions
│   └── index.ts
├── errors/              # Error handling utilities
│   ├── index.ts
│   └── __tests__/
├── db/                  # Legacy database helpers (can be migrated)
└── prisma.ts            # Prisma client instance
```

## Validation Schemas

All input data is validated using Zod schemas before being processed. Schemas are located in `lib/schemas/`.

### Available Schemas

- `createProjectSchema` - Validates project creation
- `updateProjectSchema` - Validates project updates (partial)
- `createBlogPostSchema` - Validates blog post creation
- `updateBlogPostSchema` - Validates blog post updates (partial)
- `createContactSubmissionSchema` - Validates contact form submissions
- `createNewsletterSubscriberSchema` - Validates newsletter subscriptions

### Example Schema

```typescript
import { createProjectSchema } from "@/lib/schemas";

const result = createProjectSchema.safeParse({
  slug: "my-project",
  title: "My Project",
  description: "A detailed description",
  category: "WEB_DEVELOPMENT",
  technologies: ["React", "TypeScript"],
  images: ["https://example.com/image.jpg"],
});

if (result.success) {
  // Use result.data
} else {
  // Handle result.error
}
```

## Repositories

Repositories provide data access functions with caching, logging, and error handling.

### Projects Repository

**File:** `lib/repositories/projects.ts`

#### Functions

- `getAllProjects()` - Get all projects
- `getFeaturedProjects()` - Get featured projects only
- `getProjectBySlug(slug)` - Get a single project by slug
- `getProjectsByCategory(category)` - Get projects by category
- `createProject(input)` - Create a new project
- `updateProject(slug, input)` - Update a project
- `deleteProject(slug)` - Delete a project

#### Cache Tags

```typescript
PROJECT_CACHE_TAGS.all              // "projects"
PROJECT_CACHE_TAGS.featured         // "projects:featured"
PROJECT_CACHE_TAGS.byCategory(cat)  // "projects:category:{cat}"
PROJECT_CACHE_TAGS.bySlug(slug)     // "projects:slug:{slug}"
```

### Blog Repository

**File:** `lib/repositories/blog.ts`

#### Functions

- `getPublishedBlogPosts(limit?)` - Get published posts (with optional limit)
- `getBlogPostBySlug(slug)` - Get any post by slug
- `getPublishedBlogPostBySlug(slug)` - Get only published post by slug
- `getBlogPostsByCategory(category)` - Get posts by category
- `searchBlogPosts(searchTerm)` - Search posts by term
- `createBlogPost(input)` - Create a new post
- `updateBlogPost(slug, input)` - Update a post
- `deleteBlogPost(slug)` - Delete a post

#### Cache Tags

```typescript
BLOG_CACHE_TAGS.all              // "blog"
BLOG_CACHE_TAGS.published        // "blog:published"
BLOG_CACHE_TAGS.byCategory(cat)  // "blog:category:{cat}"
BLOG_CACHE_TAGS.bySlug(slug)     // "blog:slug:{slug}"
```

### Contact Repository

**File:** `lib/repositories/contact.ts`

#### Functions

- `createContactSubmission(input)` - Create a new submission
- `getContactSubmissionsByStatus(status)` - Get submissions by status
- `getAllContactSubmissions()` - Get all submissions
- `getContactSubmissionById(id)` - Get a specific submission
- `updateContactSubmissionStatus(id, status)` - Update submission status
- `deleteContactSubmission(id)` - Delete a submission

### Newsletter Repository

**File:** `lib/repositories/newsletter.ts`

#### Functions

- `subscribeToNewsletter(input)` - Subscribe to newsletter
- `unsubscribeFromNewsletter(email)` - Unsubscribe from newsletter
- `isEmailSubscribed(email)` - Check if email is subscribed
- `getAllNewsletterSubscribers()` - Get all subscribers
- `getNewsletterSubscriberByEmail(email)` - Get subscriber by email
- `getSubscriberCount()` - Get total subscriber count

## Server Actions

Server actions provide the interface for client-side code to interact with the data layer.

### Usage in Components

```typescript
"use client";

import { getProjectsAction } from "@/lib/actions";

export function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjectsAction();
      if (result.success) {
        setProjects(result.data);
      } else {
        console.error(result.error);
      }
    }
    fetchProjects();
  }, []);

  // ... render projects
}
```

### Available Actions

#### Projects

- `getProjectsAction()` - Get all projects
- `getFeaturedProjectsAction()` - Get featured projects
- `getProjectBySlugAction(slug)` - Get project by slug
- `getProjectsByCategoryAction(category)` - Get projects by category

#### Blog

- `getPublishedBlogPostsAction(limit?)` - Get published posts
- `getPublishedBlogPostBySlugAction(slug)` - Get post by slug
- `getBlogPostsByCategoryAction(category)` - Get posts by category
- `searchBlogPostsAction(searchTerm)` - Search posts

#### Contact

- `submitContactFormAction(input)` - Submit a contact form

#### Newsletter

- `subscribeToNewsletterAction(input)` - Subscribe to newsletter
- `checkEmailSubscriptionAction(email)` - Check subscription status

### Response Format

All server actions return a consistent response format:

```typescript
// Success
{
  success: true,
  data: T
}

// Error
{
  success: false,
  error: string,
  details?: Record<string, unknown>
}
```

## Error Handling

### Error Classes

Located in `lib/errors/index.ts`:

- `AppError` - Base error class (500)
- `ValidationError` - Validation failures (400)
- `NotFoundError` - Resource not found (404)
- `ConflictError` - Unique constraint violations (409)
- `DatabaseError` - Database errors (500)

### Error Handling Utilities

#### `formatZodError(error: ZodError)`

Formats Zod validation errors into a structured object:

```typescript
{
  "email": ["Invalid email address"],
  "name": ["Name is required"]
}
```

#### `handlePrismaError(error: unknown)`

Converts Prisma errors to appropriate custom error classes:

- P2002 → ConflictError (unique constraint)
- P2025 → NotFoundError (record not found)
- P2003 → ValidationError (foreign key constraint)
- Other → DatabaseError

### Logger

Structured logging utility:

```typescript
import { logger } from "@/lib/errors";

logger.error("Error message", error, { context: "value" });
logger.warn("Warning message", { context: "value" });
logger.info("Info message", { context: "value" });
logger.debug("Debug message", { context: "value" }); // Development only
```

## Caching & Revalidation

### Strategy Overview

The data layer uses Next.js's built-in caching with manual revalidation through tags and paths.

### Revalidation Approach

1. **Tag-based Revalidation**: Used for related data invalidation
2. **Path-based Revalidation**: Used for page-specific invalidation

### When Data is Revalidated

#### On Create

- All list caches are invalidated
- Category-specific caches are invalidated
- Relevant paths are revalidated

#### On Update

- Specific item cache is invalidated
- If category/featured status changes, old and new caches are invalidated
- All list caches are invalidated
- Relevant paths are revalidated

#### On Delete

- Specific item cache is invalidated
- All related list caches are invalidated
- Relevant paths are revalidated

### Example Revalidation Flow

```typescript
// After creating a project
revalidateTag(PROJECT_CACHE_TAGS.all);
revalidateTag(PROJECT_CACHE_TAGS.byCategory(project.category));
if (project.featured) {
  revalidateTag(PROJECT_CACHE_TAGS.featured);
}
revalidatePath("/projects");
```

### ISR (Incremental Static Regeneration)

Pages that display data from repositories should use ISR:

```typescript
// In a page component
export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectList projects={projects} />;
}
```

For dynamic pages:

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const revalidate = 3600;

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  return <ProjectDetail project={project} />;
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests once (CI mode)
npm run test:run
```

### Test Coverage

Tests are organized in `__tests__` directories alongside the code they test:

- `lib/schemas/__tests__/schemas.test.ts` - Schema validation tests
- `lib/errors/__tests__/errors.test.ts` - Error handling tests
- `lib/repositories/__tests__/*.test.ts` - Repository tests

### Writing Tests

Tests use Vitest with mocked Prisma client:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

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

describe("Repository Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch data", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([/* mock data */]);
    // ... test implementation
  });
});
```

## Usage Examples

### Creating a Project (Admin)

```typescript
import { createProject } from "@/lib/repositories/projects";

async function handleCreateProject() {
  try {
    const project = await createProject({
      slug: "new-project",
      title: "New Project",
      description: "A comprehensive description",
      category: "WEB_DEVELOPMENT",
      technologies: ["React", "TypeScript", "Next.js"],
      images: ["https://example.com/image1.jpg"],
      featured: true,
    });
    
    console.log("Project created:", project.id);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation errors:", error.errors);
    } else if (error instanceof ConflictError) {
      console.error("Slug already exists");
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
```

### Fetching Projects in a Server Component

```typescript
// app/projects/page.tsx
import { getAllProjects } from "@/lib/repositories/projects";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  
  return (
    <div>
      <h1>Our Projects</h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Fetching Projects in a Client Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { getProjectsAction } from "@/lib/actions";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjectsAction();
      if (result.success) {
        setProjects(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Submitting a Contact Form

```typescript
"use client";

import { submitContactFormAction } from "@/lib/actions";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      projectType: formData.get("projectType") as any,
      budgetRange: formData.get("budgetRange") as any,
      message: formData.get("message") as string,
    };

    const result = await submitContactFormAction(data);

    if (result.success) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      if (result.details?.validationErrors) {
        setErrors(result.details.validationErrors as Record<string, string[]>);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {errors.email && <div className="error">{errors.email[0]}</div>}
      {/* ... other fields and error displays */}
      
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
      
      {status === "success" && <div>Thank you! We'll be in touch soon.</div>}
      {status === "error" && <div>Please correct the errors above.</div>}
    </form>
  );
}
```

### Newsletter Subscription

```typescript
"use client";

import { subscribeToNewsletterAction } from "@/lib/actions";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const result = await subscribeToNewsletterAction({
      email,
      source: "homepage",
    });

    if (result.success) {
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Subscribing..." : "Subscribe"}
      </button>
      {message && <div className={status}>{message}</div>}
    </form>
  );
}
```

## Best Practices

1. **Always use repositories** instead of calling Prisma directly
2. **Validate all input** using Zod schemas
3. **Handle errors** gracefully with try-catch blocks
4. **Log important operations** for debugging and monitoring
5. **Use server actions** for client-side data fetching
6. **Leverage caching** with appropriate revalidation strategies
7. **Write tests** for critical business logic
8. **Use TypeScript** for type safety throughout the stack

## Troubleshooting

### Common Issues

#### "Prisma Client not generated"

```bash
npm run db:generate
```

#### "Database connection failed"

Check your `.env` file for correct `DATABASE_URL`.

#### "Validation errors not showing"

Ensure you're checking the `details.validationErrors` field in the response.

#### "Cache not invalidating"

Verify that you're using the correct cache tags and paths in your revalidation calls.

### Debug Mode

Set `NODE_ENV=development` to enable debug logging:

```typescript
logger.debug("Debug message", { context: "value" });
```

## Future Enhancements

Potential improvements to consider:

- [ ] Pagination support for large datasets
- [ ] Advanced search with filters
- [ ] Rate limiting for public endpoints
- [ ] Redis caching layer
- [ ] Query result caching with TTL
- [ ] Optimistic updates in UI
- [ ] Real-time updates with webhooks
- [ ] Data export functionality
- [ ] Audit logging for sensitive operations
- [ ] API versioning

---

For more information, see:
- [DATABASE.md](./DATABASE.md) - Database schema and setup
- [PRISMA_USAGE_EXAMPLES.md](./PRISMA_USAGE_EXAMPLES.md) - Prisma usage examples
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing documentation
