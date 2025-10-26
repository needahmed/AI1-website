# Database Documentation

This document provides comprehensive information about the database setup, schema, and usage for this project.

## Overview

- **Database:** MongoDB (NoSQL document database)
- **ORM:** Prisma (Type-safe database client)
- **Environment:** Works with MongoDB Atlas (cloud) or local MongoDB
- **Schema Location:** `prisma/schema.prisma`
- **Client Location:** `lib/prisma.ts`

## Quick Start

### 1. Setup MongoDB Connection

Create a `.env` file with your MongoDB connection string:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Push Schema to Database

```bash
npm run db:push
```

### 4. Seed Sample Data

```bash
npm run db:seed
```

### 5. Open Prisma Studio (Optional)

```bash
npm run db:studio
```

## Schema Overview

### Data Models

#### 1. Project

Stores portfolio projects and case studies.

**Fields:**
- `id` (String, ObjectId) - Unique identifier
- `slug` (String, unique) - URL-friendly identifier
- `title` (String) - Project title
- `description` (String) - Project description
- `category` (ProjectCategory) - Project category enum
- `technologies` (String[]) - Array of technologies used
- `images` (String[]) - Array of image URLs
- `client` (String?) - Optional client name
- `results` (String?) - Optional project results/outcome
- `featured` (Boolean) - Featured project flag
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

**Indexes:**
- `category` - For filtering by category
- `featured` - For querying featured projects
- `createdAt` - For sorting by date

**Categories:**
- `WEB_DEVELOPMENT`
- `MOBILE_APP`
- `ECOMMERCE`
- `BRANDING`
- `UI_UX_DESIGN`
- `OTHER`

#### 2. BlogPost

Stores blog articles and content.

**Fields:**
- `id` (String, ObjectId) - Unique identifier
- `slug` (String, unique) - URL-friendly identifier
- `title` (String) - Post title
- `excerpt` (String) - Short summary
- `content` (String) - Full post content (supports Markdown)
- `author` (String) - Author name
- `categories` (PostCategory[]) - Array of categories
- `publishedAt` (DateTime?) - Optional publish date
- `featuredImage` (String?) - Optional featured image URL
- `seoMeta` (Json?) - SEO metadata object
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

**Indexes:**
- `publishedAt` - For sorting by publish date
- `createdAt` - For sorting by creation date

**Categories:**
- `TECH`
- `DESIGN`
- `BUSINESS`
- `TUTORIAL`
- `NEWS`
- `OTHER`

**SEO Meta Example:**
```json
{
  "title": "Page Title",
  "description": "Page description",
  "keywords": ["keyword1", "keyword2"]
}
```

#### 3. ContactSubmission

Stores contact form submissions.

**Fields:**
- `id` (String, ObjectId) - Unique identifier
- `name` (String) - Contact name
- `email` (String) - Contact email
- `phone` (String?) - Optional phone number
- `company` (String?) - Optional company name
- `projectType` (ProjectType) - Type of project inquiry
- `budgetRange` (BudgetRange) - Budget range enum
- `message` (String) - Message content
- `status` (SubmissionStatus) - Submission status
- `createdAt` (DateTime) - Creation timestamp

**Indexes:**
- `status` - For filtering by status
- `createdAt` - For sorting by date
- `email` - For finding submissions by email

**Project Types:**
- `WEB_DEVELOPMENT`
- `MOBILE_APP`
- `ECOMMERCE`
- `BRANDING`
- `CONSULTATION`
- `OTHER`

**Budget Ranges:**
- `UNDER_5K` - Under $5,000
- `RANGE_5K_10K` - $5,000 - $10,000
- `RANGE_10K_25K` - $10,000 - $25,000
- `RANGE_25K_50K` - $25,000 - $50,000
- `ABOVE_50K` - Above $50,000

**Submission Statuses:**
- `PENDING` - New submission (default)
- `CONTACTED` - Contact has been made
- `IN_PROGRESS` - Project in progress
- `COMPLETED` - Project completed
- `ARCHIVED` - Archived submission

#### 4. AdminUser

Stores administrative user accounts.

**Fields:**
- `id` (String, ObjectId) - Unique identifier
- `email` (String, unique) - User email (login)
- `passwordHash` (String) - Hashed password (use bcrypt)
- `name` (String) - User's full name
- `role` (AdminRole) - User role enum
- `lastLogin` (DateTime?) - Last login timestamp
- `createdAt` (DateTime) - Account creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

**Indexes:**
- `role` - For filtering by role

**Roles:**
- `SUPER_ADMIN` - Full system access
- `ADMIN` - Administrative access
- `EDITOR` - Content editing access

**Security Note:** Always hash passwords using bcrypt or similar before storing.

#### 5. NewsletterSubscriber

Stores newsletter email subscribers.

**Fields:**
- `id` (String, ObjectId) - Unique identifier
- `email` (String, unique) - Subscriber email
- `source` (String?) - Optional subscription source
- `createdAt` (DateTime) - Subscription timestamp

**Indexes:**
- `createdAt` - For sorting by subscription date

**Source Examples:**
- `homepage` - Subscribed from homepage
- `blog` - Subscribed from blog
- `footer` - Subscribed from footer form

## Usage Examples

### Importing Prisma Client

```typescript
import { prisma } from "@/lib/prisma";
```

### Query Examples

#### Get All Featured Projects

```typescript
const featuredProjects = await prisma.project.findMany({
  where: {
    featured: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});
```

#### Get Project by Slug

```typescript
const project = await prisma.project.findUnique({
  where: {
    slug: "ecommerce-platform",
  },
});
```

#### Get Published Blog Posts

```typescript
const publishedPosts = await prisma.blogPost.findMany({
  where: {
    publishedAt: {
      lte: new Date(), // Published date is less than or equal to now
    },
  },
  orderBy: {
    publishedAt: "desc",
  },
  take: 10, // Limit to 10 posts
});
```

#### Create Contact Submission

```typescript
const submission = await prisma.contactSubmission.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    company: "Acme Inc",
    projectType: "WEB_DEVELOPMENT",
    budgetRange: "RANGE_10K_25K",
    message: "We need a new website...",
    status: "PENDING",
  },
});
```

#### Update Submission Status

```typescript
const updated = await prisma.contactSubmission.update({
  where: {
    id: submissionId,
  },
  data: {
    status: "CONTACTED",
  },
});
```

#### Get Pending Submissions

```typescript
const pendingSubmissions = await prisma.contactSubmission.findMany({
  where: {
    status: "PENDING",
  },
  orderBy: {
    createdAt: "desc",
  },
});
```

#### Create Newsletter Subscriber

```typescript
const subscriber = await prisma.newsletterSubscriber.create({
  data: {
    email: "subscriber@example.com",
    source: "homepage",
  },
});
```

#### Search Blog Posts

```typescript
const searchResults = await prisma.blogPost.findMany({
  where: {
    OR: [
      {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        excerpt: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ],
    publishedAt: {
      lte: new Date(),
    },
  },
});
```

#### Get Projects by Category

```typescript
const webProjects = await prisma.project.findMany({
  where: {
    category: "WEB_DEVELOPMENT",
  },
  orderBy: {
    createdAt: "desc",
  },
});
```

## Database Commands

### Generate Prisma Client

Generates TypeScript types and client from schema:

```bash
npm run db:generate
```

**When to use:**
- After modifying `prisma/schema.prisma`
- After pulling schema changes from git
- When types are out of sync

### Push Schema to Database

Pushes schema changes to MongoDB without migrations:

```bash
npm run db:push
```

**When to use:**
- During development when prototyping schema
- After adding new models or fields
- After changing indexes

**Important:** This command can result in data loss. Always backup production data before running.

### Seed Database

Runs the seed script to populate sample data:

```bash
npm run db:seed
```

**What it does:**
- Deletes all existing data (optional)
- Creates sample projects, blog posts, contacts, admin users, and subscribers
- Useful for development and testing

**Warning:** Default seed script deletes all data first. Modify `prisma/seed.ts` if you need to preserve data.

### Open Prisma Studio

Opens visual database editor in browser:

```bash
npm run db:studio
```

**Features:**
- View all data in tables
- Edit records visually
- Run queries
- Explore relationships

**Access:** Opens at http://localhost:5555

## Environment Variables

### Required Variables

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

### Connection String Format

**MongoDB Atlas:**
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority
```

**Local MongoDB:**
```
mongodb://localhost:27017/[database]
```

### Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong passwords** - Generate secure passwords for production
3. **Restrict IP access** - Use MongoDB Atlas IP whitelist in production
4. **Rotate credentials** - Change passwords regularly
5. **Use separate databases** - Different databases for dev, staging, production
6. **Enable SSL** - Always use SSL in production (`ssl=true`)
7. **Monitor access** - Enable MongoDB Atlas monitoring and alerts

## MongoDB vs SQL Migrations

**Important Difference:**

MongoDB with Prisma does **not** use traditional migrations. Instead:

- Use `prisma db push` to sync schema changes
- MongoDB is schema-less at the database level
- Prisma enforces schema at the application level
- No migration history is created

**Why?**
- MongoDB doesn't have a fixed schema
- Collections and fields are created dynamically
- Traditional migrations don't make sense for document databases

**Best Practice:**
- Use `db push` during development
- Test schema changes thoroughly before deploying
- Consider data migration scripts for complex changes
- Always backup before pushing schema changes to production

## Troubleshooting

### Connection Issues

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Check connection string format
2. Verify username/password
3. Check IP whitelist (MongoDB Atlas)
4. Ensure MongoDB service is running (local)
5. Check firewall settings
6. Verify network connectivity

### Schema Validation Errors

**Problem:** Prisma schema validation fails

**Solutions:**
1. Check for duplicate indexes
2. Verify enum values
3. Ensure ObjectId fields use correct syntax
4. Check for typos in field names
5. Run `npx prisma format` to auto-format schema

### Type Generation Issues

**Problem:** TypeScript types not updating

**Solutions:**
1. Run `npm run db:generate` to regenerate client
2. Restart TypeScript server in your IDE
3. Clear node_modules and reinstall
4. Check for syntax errors in schema

### Seed Script Failures

**Problem:** Seed script fails to run

**Solutions:**
1. Verify MongoDB connection
2. Check for unique constraint violations
3. Ensure database is accessible
4. Review error messages in seed.ts
5. Verify data types match schema

## Performance Tips

### Indexing

Indexes are already defined in the schema for common queries:
- Slug fields (unique indexes)
- Category fields
- Status fields
- Date fields (createdAt, publishedAt)

### Query Optimization

1. **Use `select`** to limit returned fields:
```typescript
const projects = await prisma.project.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
  },
});
```

2. **Use `take` and `skip`** for pagination:
```typescript
const posts = await prisma.blogPost.findMany({
  take: 10,
  skip: page * 10,
});
```

3. **Avoid N+1 queries** - Use `include` for relations when needed

4. **Use `findUnique`** when querying by unique fields (faster than `findFirst`)

### Connection Pooling

The Prisma client in `lib/prisma.ts` uses singleton pattern to reuse connections in development, preventing connection exhaustion.

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
