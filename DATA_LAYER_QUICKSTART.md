# Data Layer Quick Start Guide

Quick reference for working with the data layer.

## 📦 Import Patterns

```typescript
// Server Actions (use in client components)
import { getProjectsAction, submitContactFormAction } from "@/lib/actions";

// Repositories (use in server components or API routes)
import { getAllProjects, createProject } from "@/lib/repositories/projects";

// Schemas (for validation)
import { createProjectSchema } from "@/lib/schemas";

// Types
import type { ApiResponse, CreateProjectInput } from "@/lib/types";

// Errors
import { NotFoundError, ValidationError } from "@/lib/errors";
```

## 🎯 Common Use Cases

### Fetch Data in Server Component

```typescript
// app/projects/page.tsx
import { getAllProjects } from "@/lib/repositories/projects";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectList projects={projects} />;
}
```

### Fetch Data in Client Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { getProjectsAction } from "@/lib/actions";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const result = await getProjectsAction();
      if (result.success) {
        setProjects(result.data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* Render projects */}</div>;
}
```

### Submit a Form with Validation

```typescript
"use client";

import { submitContactFormAction } from "@/lib/actions";

export function ContactForm() {
  async function handleSubmit(formData: FormData) {
    const result = await submitContactFormAction({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      projectType: formData.get("projectType") as any,
      budgetRange: formData.get("budgetRange") as any,
    });

    if (result.success) {
      console.log("Success!", result.data);
    } else {
      console.error("Error:", result.error);
      if (result.details?.validationErrors) {
        // Show validation errors
        console.log(result.details.validationErrors);
      }
    }
  }

  return <form action={handleSubmit}>{/* Form fields */}</form>;
}
```

### Create Data (Admin/API Route)

```typescript
// app/api/projects/route.ts
import { NextRequest } from "next/server";
import { createProject } from "@/lib/repositories/projects";
import { ValidationError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    
    return Response.json({ success: true, data: project });
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(
        { success: false, error: error.message, errors: error.errors },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## 🔍 Available Actions

### Projects
- `getProjectsAction()` - Get all projects
- `getFeaturedProjectsAction()` - Get featured projects
- `getProjectBySlugAction(slug)` - Get project by slug
- `getProjectsByCategoryAction(category)` - Get projects by category

### Blog
- `getPublishedBlogPostsAction(limit?)` - Get published posts
- `getPublishedBlogPostBySlugAction(slug)` - Get post by slug
- `getBlogPostsByCategoryAction(category)` - Get posts by category
- `searchBlogPostsAction(searchTerm)` - Search posts

### Contact
- `submitContactFormAction(input)` - Submit contact form

### Newsletter
- `subscribeToNewsletterAction(input)` - Subscribe to newsletter
- `checkEmailSubscriptionAction(email)` - Check if email is subscribed

## 🛠️ Available Repositories

### Projects (`lib/repositories/projects.ts`)
- `getAllProjects()`
- `getFeaturedProjects()`
- `getProjectBySlug(slug)`
- `getProjectsByCategory(category)`
- `createProject(input)` ⚠️ Admin only
- `updateProject(slug, input)` ⚠️ Admin only
- `deleteProject(slug)` ⚠️ Admin only

### Blog (`lib/repositories/blog.ts`)
- `getPublishedBlogPosts(limit?)`
- `getBlogPostBySlug(slug)`
- `getPublishedBlogPostBySlug(slug)`
- `getBlogPostsByCategory(category)`
- `searchBlogPosts(searchTerm)`
- `createBlogPost(input)` ⚠️ Admin only
- `updateBlogPost(slug, input)` ⚠️ Admin only
- `deleteBlogPost(slug)` ⚠️ Admin only

### Contact (`lib/repositories/contact.ts`)
- `createContactSubmission(input)`
- `getContactSubmissionsByStatus(status)` ⚠️ Admin only
- `getAllContactSubmissions()` ⚠️ Admin only
- `getContactSubmissionById(id)` ⚠️ Admin only
- `updateContactSubmissionStatus(id, status)` ⚠️ Admin only
- `deleteContactSubmission(id)` ⚠️ Admin only

### Newsletter (`lib/repositories/newsletter.ts`)
- `subscribeToNewsletter(input)`
- `unsubscribeFromNewsletter(email)`
- `isEmailSubscribed(email)`
- `getAllNewsletterSubscribers()` ⚠️ Admin only
- `getNewsletterSubscriberByEmail(email)` ⚠️ Admin only
- `getSubscriberCount()` ⚠️ Admin only

## ✅ Validation Schemas

All schemas are in `lib/schemas/index.ts`:

```typescript
import {
  createProjectSchema,
  createBlogPostSchema,
  createContactSubmissionSchema,
  createNewsletterSubscriberSchema,
} from "@/lib/schemas";

// Manual validation
const result = createProjectSchema.safeParse(data);
if (result.success) {
  // Use result.data
} else {
  // Handle result.error.issues
}
```

## 🚨 Error Handling

```typescript
import {
  NotFoundError,
  ValidationError,
  ConflictError,
  DatabaseError,
} from "@/lib/errors";

try {
  const project = await getProjectBySlug("my-slug");
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle 404
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.log(error.errors); // { field: ["error message"] }
  } else if (error instanceof ConflictError) {
    // Handle conflicts (duplicate email, etc)
  } else {
    // Handle other errors
  }
}
```

## 🔄 Cache Revalidation

Repositories automatically handle revalidation. For manual revalidation:

```typescript
import { revalidateTag, revalidatePath } from "next/cache";
import { PROJECT_CACHE_TAGS } from "@/lib/repositories/projects";

// Revalidate specific cache
revalidateTag(PROJECT_CACHE_TAGS.all);
revalidateTag(PROJECT_CACHE_TAGS.featured);

// Revalidate paths
revalidatePath("/projects");
revalidatePath("/projects/[slug]", "page");
```

## 📝 Response Format

All server actions return:

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
  details?: {
    validationErrors?: Record<string, string[]>
  }
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests once (CI)
npm run test:run

# Run with UI
npm run test:ui
```

Test files are in `__tests__` directories:
- `lib/schemas/__tests__/` - Schema validation tests
- `lib/errors/__tests__/` - Error handling tests
- `lib/repositories/__tests__/` - Repository tests

## 📚 Full Documentation

See [DATA_LAYER.md](./DATA_LAYER.md) for complete documentation.

## 🎓 Examples

Full examples available in [DATA_LAYER.md](./DATA_LAYER.md#usage-examples):
- Creating projects
- Fetching in server components
- Fetching in client components
- Submitting forms
- Newsletter signup
- Error handling patterns
