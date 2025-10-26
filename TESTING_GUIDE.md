# Testing Guide - Prisma & MongoDB Setup

This guide helps you verify that your Prisma and MongoDB setup is working correctly.

## Pre-Test Checklist

Before testing, ensure:

- [ ] MongoDB connection string is configured in `.env`
- [ ] Dependencies are installed (`npm install`)
- [ ] Prisma Client is generated (`npm run db:generate`)
- [ ] Schema is pushed to database (`npm run db:push`)

## Test 1: Schema Validation

Verify that the Prisma schema is valid:

```bash
npx prisma validate
```

**Expected Output:**
```
✓ The schema at prisma/schema.prisma is valid 🚀
```

**If it fails:**
- Check for syntax errors in `prisma/schema.prisma`
- Run `npx prisma format` to auto-format
- Review error messages for specific issues

## Test 2: Prisma Client Generation

Verify Prisma Client is generated:

```bash
npm run db:generate
```

**Expected Output:**
```
✓ Generated Prisma Client (v6.x.x) to ./node_modules/.prisma/client
```

**Verify files exist:**
```bash
ls -la node_modules/.prisma/client/
```

Should show multiple files including `index.d.ts` and `index.js`.

## Test 3: Database Connection

Push schema to database (this also tests connection):

```bash
npm run db:push
```

**Expected Output:**
```
✓ Your database is now in sync with your Prisma schema.
```

**If it fails:**
- Verify `DATABASE_URL` in `.env` is correct
- Check MongoDB is running (local) or accessible (Atlas)
- Verify IP whitelist (MongoDB Atlas)
- Check username/password are correct

## Test 4: TypeScript Compilation

Verify TypeScript types are correct:

```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Generating static pages
```

**If it fails:**
- Run `npm run db:generate` to regenerate types
- Check for TypeScript errors in console
- Verify path aliases in `tsconfig.json`

## Test 5: Seed Database (Optional)

Populate database with sample data:

```bash
npm run db:seed
```

**Expected Output:**
```
🌱 Starting database seed...
🧹 Cleaning existing data...
📦 Seeding projects...
✅ Created 5 projects
📝 Seeding blog posts...
✅ Created 4 blog posts
📧 Seeding contact submissions...
✅ Created 3 contact submissions
👤 Seeding admin users...
✅ Created 2 admin users
📨 Seeding newsletter subscribers...
✅ Created 4 newsletter subscribers
🎉 Database seed completed successfully!
```

**If it fails:**
- Check database connection
- Verify schema is pushed (`npm run db:push`)
- Check for unique constraint violations
- Review error messages in seed script

## Test 6: Prisma Studio

Open Prisma Studio to visually verify data:

```bash
npm run db:studio
```

**Expected Behavior:**
- Opens browser at http://localhost:5555
- Shows all 5 models in left sidebar
- Can click each model to view data
- If seeded, should show sample records

**Manual Verification:**
1. Click on "Project" model
   - Should see 5 projects if seeded
   - Check fields match schema
2. Click on "BlogPost" model
   - Should see 4 blog posts if seeded
   - Verify categories array works
3. Click on "ContactSubmission" model
   - Should see 3 submissions if seeded
4. Click on "AdminUser" model
   - Should see 2 admin users if seeded
5. Click on "NewsletterSubscriber" model
   - Should see 4 subscribers if seeded

## Test 7: Health Check API

Test database connection via API endpoint:

```bash
# Start dev server
npm run dev

# In another terminal, test health endpoint
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Database connection successful",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

**If it fails:**
- Check database connection
- Review console for errors
- Verify `.env` file is loaded

## Test 8: Query Test (Manual)

Create a test file to query data:

```typescript
// test-db.ts
import { prisma } from "./lib/prisma";

async function testQueries() {
  console.log("Testing database queries...\n");

  // Test 1: Count projects
  const projectCount = await prisma.project.count();
  console.log(`✓ Projects in database: ${projectCount}`);

  // Test 2: Get featured projects
  const featured = await prisma.project.findMany({
    where: { featured: true },
  });
  console.log(`✓ Featured projects: ${featured.length}`);

  // Test 3: Get published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { publishedAt: { lte: new Date() } },
  });
  console.log(`✓ Published blog posts: ${posts.length}`);

  // Test 4: Get pending contact submissions
  const pending = await prisma.contactSubmission.findMany({
    where: { status: "PENDING" },
  });
  console.log(`✓ Pending submissions: ${pending.length}`);

  // Test 5: Get newsletter subscribers
  const subscribers = await prisma.newsletterSubscriber.count();
  console.log(`✓ Newsletter subscribers: ${subscribers}`);

  console.log("\n✅ All queries executed successfully!");
}

testQueries()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run with:
```bash
npx tsx test-db.ts
```

**Expected Output:**
```
Testing database queries...

✓ Projects in database: 5
✓ Featured projects: 3
✓ Published blog posts: 4
✓ Pending submissions: 1
✓ Newsletter subscribers: 4

✅ All queries executed successfully!
```

## Test 9: CRUD Operations Test

Test Create, Read, Update, Delete operations:

```typescript
// test-crud.ts
import { prisma } from "./lib/prisma";

async function testCRUD() {
  console.log("Testing CRUD operations...\n");

  // CREATE
  const project = await prisma.project.create({
    data: {
      slug: "test-project",
      title: "Test Project",
      description: "This is a test",
      category: "WEB_DEVELOPMENT",
      technologies: ["Test"],
      images: [],
      featured: false,
    },
  });
  console.log("✓ CREATE: Project created", project.id);

  // READ
  const found = await prisma.project.findUnique({
    where: { slug: "test-project" },
  });
  console.log("✓ READ: Project found", found?.title);

  // UPDATE
  const updated = await prisma.project.update({
    where: { slug: "test-project" },
    data: { featured: true },
  });
  console.log("✓ UPDATE: Project updated, featured:", updated.featured);

  // DELETE
  await prisma.project.delete({
    where: { slug: "test-project" },
  });
  console.log("✓ DELETE: Project deleted");

  // VERIFY DELETE
  const deleted = await prisma.project.findUnique({
    where: { slug: "test-project" },
  });
  console.log("✓ VERIFY: Project is null:", deleted === null);

  console.log("\n✅ All CRUD operations successful!");
}

testCRUD()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run with:
```bash
npx tsx test-crud.ts
```

**Expected Output:**
```
Testing CRUD operations...

✓ CREATE: Project created [ObjectId]
✓ READ: Project found Test Project
✓ UPDATE: Project updated, featured: true
✓ DELETE: Project deleted
✓ VERIFY: Project is null: true

✅ All CRUD operations successful!
```

## Test 10: Helper Functions Test

Test the helper functions in `lib/db/`:

```typescript
// test-helpers.ts
import { getFeaturedProjects, getProjectBySlug } from "./lib/db/projects";
import { getPublishedBlogPosts, getBlogPostBySlug } from "./lib/db/blog";
import { subscribeToNewsletter, isEmailSubscribed } from "./lib/db/newsletter";

async function testHelpers() {
  console.log("Testing helper functions...\n");

  // Test project helpers
  const featured = await getFeaturedProjects();
  console.log(`✓ getFeaturedProjects: ${featured.length} projects`);

  const project = await getProjectBySlug("ecommerce-platform");
  console.log(`✓ getProjectBySlug: ${project?.title || "Not found"}`);

  // Test blog helpers
  const posts = await getPublishedBlogPosts(5);
  console.log(`✓ getPublishedBlogPosts: ${posts.length} posts`);

  const post = await getBlogPostBySlug("getting-started-with-nextjs-16");
  console.log(`✓ getBlogPostBySlug: ${post?.title || "Not found"}`);

  // Test newsletter helpers
  const testEmail = `test-${Date.now()}@example.com`;
  const subscriber = await subscribeToNewsletter(testEmail, "test");
  console.log(`✓ subscribeToNewsletter: ${subscriber.email}`);

  const isSubscribed = await isEmailSubscribed(testEmail);
  console.log(`✓ isEmailSubscribed: ${isSubscribed}`);

  console.log("\n✅ All helper functions work correctly!");
}

testHelpers()
  .catch(console.error)
  .finally(() => process.exit(0));
```

Run with:
```bash
npx tsx test-helpers.ts
```

## Test Results Summary

After running all tests, you should have:

- [ ] ✅ Schema validated successfully
- [ ] ✅ Prisma Client generated
- [ ] ✅ Database connection successful
- [ ] ✅ TypeScript compilation passed
- [ ] ✅ Seed script completed (if run)
- [ ] ✅ Prisma Studio accessible
- [ ] ✅ Health check API responds
- [ ] ✅ Database queries work
- [ ] ✅ CRUD operations work
- [ ] ✅ Helper functions work

## Troubleshooting Failed Tests

### Connection Issues

If connection tests fail:

1. Verify `.env` file exists and has `DATABASE_URL`
2. Check MongoDB Atlas IP whitelist
3. Verify username/password are correct
4. Test connection string format
5. Check MongoDB service is running (local)

### Type Errors

If TypeScript fails:

1. Run `npm run db:generate`
2. Delete `.next` folder and rebuild
3. Restart TypeScript server in IDE
4. Check `tsconfig.json` path aliases

### Query Errors

If queries fail:

1. Verify schema is pushed: `npm run db:push`
2. Check data exists (run seed script)
3. Verify field names match schema
4. Check for typos in model names

### Seed Errors

If seed fails:

1. Check database connection
2. Look for unique constraint violations
3. Try clearing database first
4. Review error messages carefully

## Next Steps After Testing

Once all tests pass:

1. **Start Development**
   - Use helper functions from `lib/db/`
   - Create API routes for your features
   - Build Server Components that query data

2. **Build Features**
   - Projects page/listing
   - Blog with posts
   - Contact form with submissions
   - Newsletter signup
   - Admin dashboard

3. **Add More Tests**
   - Write unit tests for helper functions
   - Add integration tests for API routes
   - Test edge cases and error handling

## Automated Testing Script

Create a comprehensive test script:

```bash
#!/bin/bash
# test-setup.sh

echo "🧪 Testing Prisma & MongoDB Setup"
echo "=================================="
echo ""

echo "Test 1: Validating schema..."
npx prisma validate
echo ""

echo "Test 2: Generating client..."
npm run db:generate
echo ""

echo "Test 3: Checking TypeScript..."
npm run build
echo ""

echo "✅ All tests passed! Setup is complete."
```

Make executable and run:
```bash
chmod +x test-setup.sh
./test-setup.sh
```

## Continuous Testing

For ongoing development:

```bash
# Before committing
npm run build          # Verify TypeScript
npx prisma validate    # Verify schema
npm run lint           # Check code quality

# After schema changes
npm run db:generate    # Regenerate types
npm run db:push        # Update database

# For testing new features
npm run db:seed        # Reset to sample data
npm run db:studio      # View data visually
```

---

**All tests passing?** ✅ Your Prisma & MongoDB setup is production-ready!

**Having issues?** 📚 Check [DATABASE.md](./DATABASE.md) troubleshooting section.
