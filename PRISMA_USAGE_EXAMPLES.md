# Prisma Usage Examples

This document provides practical examples of using Prisma in your Next.js application.

## Import the Prisma Client

```typescript
import { prisma } from "@/lib/prisma";
```

## Using in Server Components (Recommended)

Next.js 16 App Router supports Server Components by default. You can use Prisma directly in these components:

```typescript
// app/projects/page.tsx
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Featured Projects</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Using in API Routes

```typescript
// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        category: body.category,
        technologies: body.technologies,
        images: body.images || [],
        client: body.client,
        results: body.results,
        featured: body.featured || false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
```

## Using Helper Functions

Create reusable database functions in `lib/db/` for cleaner code:

```typescript
// lib/db/projects.ts
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
```

Then use in your components:

```typescript
// app/page.tsx
import { getFeaturedProjects } from "@/lib/db/projects";

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return <div>{/* Render projects */}</div>;
}
```

## Blog Post Examples

### Get Published Posts

```typescript
const publishedPosts = await prisma.blogPost.findMany({
  where: {
    publishedAt: {
      lte: new Date(),
    },
  },
  orderBy: {
    publishedAt: "desc",
  },
  take: 10,
});
```

### Get Post by Slug

```typescript
const post = await prisma.blogPost.findUnique({
  where: {
    slug: "getting-started-with-nextjs-16",
  },
});

if (!post) {
  notFound(); // Next.js 16 helper
}
```

### Create Blog Post

```typescript
const post = await prisma.blogPost.create({
  data: {
    slug: "new-post",
    title: "New Blog Post",
    excerpt: "This is a new post",
    content: "Full content here...",
    author: "John Doe",
    categories: ["TECH", "TUTORIAL"],
    publishedAt: new Date(),
    featuredImage: "/images/post.jpg",
    seoMeta: {
      title: "SEO Title",
      description: "SEO Description",
      keywords: ["keyword1", "keyword2"],
    },
  },
});
```

### Update Blog Post

```typescript
const updated = await prisma.blogPost.update({
  where: {
    slug: "existing-post",
  },
  data: {
    title: "Updated Title",
    publishedAt: new Date(),
  },
});
```

## Contact Form Example

### Create Submission (API Route)

```typescript
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        projectType: body.projectType,
        budgetRange: body.budgetRange,
        message: body.message,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
```

### Get Pending Submissions (Admin Page)

```typescript
// app/admin/submissions/page.tsx
import { prisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    where: {
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Pending Submissions</h1>
      {submissions.map((submission) => (
        <div key={submission.id}>
          <h3>{submission.name}</h3>
          <p>Email: {submission.email}</p>
          <p>Type: {submission.projectType}</p>
          <p>Budget: {submission.budgetRange}</p>
          <p>{submission.message}</p>
        </div>
      ))}
    </div>
  );
}
```

## Newsletter Examples

### Subscribe (API Route)

```typescript
// app/api/newsletter/subscribe/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        source: source || "unknown",
      },
    });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique constraint violation
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 },
    );
  }
}
```

## Pagination Example

```typescript
export async function getPaginatedProjects(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.project.count(),
  ]);

  return {
    projects,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
```

## Search Example

```typescript
export async function searchContent(query: string) {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 5,
    }),
    prisma.blogPost.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        publishedAt: {
          lte: new Date(),
        },
      },
      take: 5,
    }),
  ]);

  return { projects, posts };
}
```

## Error Handling

### Handling Unique Constraint Violations

```typescript
try {
  await prisma.newsletterSubscriber.create({
    data: { email: "test@example.com" },
  });
} catch (error: any) {
  if (error.code === "P2002") {
    // Unique constraint failed
    console.log("Email already exists");
  }
}
```

### Handling Not Found

```typescript
const project = await prisma.project.findUnique({
  where: { slug: "non-existent" },
});

if (!project) {
  // Handle not found case
  throw new Error("Project not found");
}
```

## Transaction Example

```typescript
// Create blog post and increment author's post count atomically
const result = await prisma.$transaction(async (tx) => {
  const post = await tx.blogPost.create({
    data: {
      slug: "new-post",
      title: "New Post",
      // ... other fields
    },
  });

  // Other operations in the same transaction
  // All succeed or all fail together

  return post;
});
```

## Aggregation Examples

### Count Projects by Category

```typescript
const categoryCounts = await prisma.project.groupBy({
  by: ["category"],
  _count: {
    category: true,
  },
});
```

### Count Total Records

```typescript
const totalProjects = await prisma.project.count();
const featuredCount = await prisma.project.count({
  where: { featured: true },
});
```

## Best Practices

### 1. Use Server Components for Data Fetching

```typescript
// ✅ Good - Server Component
export default async function Page() {
  const data = await prisma.project.findMany();
  return <div>{/* ... */}</div>;
}
```

### 2. Use API Routes for Client-Side Mutations

```typescript
// ✅ Good - API Route for mutations from client
// app/api/projects/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  return await prisma.project.create({ data });
}
```

### 3. Create Helper Functions

```typescript
// ✅ Good - Reusable helper function
// lib/db/projects.ts
export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}
```

### 4. Handle Errors Gracefully

```typescript
// ✅ Good - Proper error handling
try {
  const result = await prisma.project.create({ data });
  return { success: true, data: result };
} catch (error) {
  console.error("Database error:", error);
  return { success: false, error: "Failed to create project" };
}
```

### 5. Use Select to Limit Fields

```typescript
// ✅ Good - Only fetch needed fields
const projects = await prisma.project.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
  },
});
```

## Type Safety

Prisma provides full TypeScript type safety:

```typescript
import { Project, ProjectCategory } from "@prisma/client";

// Fully typed
const project: Project = await prisma.project.findUnique({
  where: { slug: "test" },
});

// Enum types
const category: ProjectCategory = "WEB_DEVELOPMENT";
```

## Next Steps

- See [DATABASE.md](./DATABASE.md) for comprehensive schema documentation
- See [Prisma Docs](https://www.prisma.io/docs) for more advanced usage
- Explore `lib/db/` directory for more helper function examples
