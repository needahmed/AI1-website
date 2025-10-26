# Database Setup Checklist

Use this checklist to ensure your database is properly configured and ready to use.

## Prerequisites

- [ ] Node.js 18.17 or later installed
- [ ] npm, yarn, pnpm, or bun installed
- [ ] MongoDB connection available (Atlas or local)

## Initial Setup

### 1. Environment Configuration

- [ ] Copy `.env.local.example` to `.env`
  ```bash
  cp .env.local.example .env
  ```

- [ ] Update `DATABASE_URL` in `.env` with your MongoDB connection string
  - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - For local MongoDB: `mongodb://localhost:27017/database-name`

- [ ] Verify `.env` is listed in `.gitignore` (it should be)

### 2. Install Dependencies

- [ ] Install all project dependencies
  ```bash
  npm install
  ```

### 3. Database Setup

- [ ] Validate Prisma schema
  ```bash
  npx prisma validate
  ```

- [ ] Generate Prisma Client
  ```bash
  npm run db:generate
  ```

- [ ] Push schema to database
  ```bash
  npm run db:push
  ```

- [ ] Seed database with sample data (optional)
  ```bash
  npm run db:seed
  ```

### 4. Verification

- [ ] Open Prisma Studio to verify database connection
  ```bash
  npm run db:studio
  ```
  - Should open at http://localhost:5555
  - You should see all 5 models: Project, BlogPost, ContactSubmission, AdminUser, NewsletterSubscriber

- [ ] If seeded, verify sample data is present in Prisma Studio

- [ ] Build the application to ensure TypeScript types are correct
  ```bash
  npm run build
  ```

- [ ] Start development server
  ```bash
  npm run dev
  ```

## Troubleshooting

### Cannot connect to MongoDB

**MongoDB Atlas:**
- [ ] Verify username and password are correct
- [ ] Check IP whitelist includes your IP (or use 0.0.0.0/0 for development)
- [ ] Ensure database user has read/write permissions
- [ ] Verify cluster is running and accessible

**Local MongoDB:**
- [ ] Ensure MongoDB service is running
  ```bash
  # macOS (Homebrew)
  brew services start mongodb-community
  
  # Linux (systemd)
  sudo systemctl start mongod
  
  # Windows
  net start MongoDB
  ```
- [ ] Verify MongoDB is listening on port 27017
- [ ] Check firewall settings

### Schema validation errors

- [ ] Run `npx prisma format` to auto-format schema
- [ ] Check for syntax errors in `prisma/schema.prisma`
- [ ] Verify enum values are uppercase with underscores
- [ ] Ensure no duplicate indexes (unique fields don't need @@index)

### TypeScript type errors

- [ ] Run `npm run db:generate` to regenerate client
- [ ] Restart TypeScript server in your IDE
- [ ] Clear `.next` directory and rebuild
  ```bash
  rm -rf .next
  npm run build
  ```

### Seed script fails

- [ ] Verify MongoDB connection is working
- [ ] Check for existing data conflicts (unique constraints)
- [ ] Review error messages in terminal
- [ ] Try clearing database before seeding:
  ```bash
  # In Prisma Studio, manually delete records
  # Or modify seed.ts to skip delete operations
  ```

## Post-Setup

### Development Workflow

When making schema changes:

1. [ ] Edit `prisma/schema.prisma`
2. [ ] Run `npm run db:generate` to update TypeScript types
3. [ ] Run `npm run db:push` to update database
4. [ ] Restart development server if running

### Production Deployment

- [ ] Set `DATABASE_URL` environment variable in production
- [ ] Use a separate production database
- [ ] Enable MongoDB authentication
- [ ] Restrict IP access to production servers only
- [ ] Use strong passwords
- [ ] Enable SSL/TLS for connections
- [ ] Set up database backups
- [ ] Run `npm run db:generate` during build process
- [ ] Run `npm run db:push` after deployment (first time only)

## Resources

- [DATABASE.md](./DATABASE.md) - Comprehensive database documentation
- [PRISMA_USAGE_EXAMPLES.md](./PRISMA_USAGE_EXAMPLES.md) - Code examples
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## Support

If you encounter issues not covered in this checklist:

1. Review error messages carefully
2. Check [DATABASE.md](./DATABASE.md) troubleshooting section
3. Consult [Prisma Discord](https://pris.ly/discord) for community support
4. Review [Prisma GitHub Issues](https://github.com/prisma/prisma/issues)

## Completion

Once all checkboxes are complete, your database is ready for development! 🎉

You can now:
- Query data in Server Components
- Create API routes for mutations
- Use helper functions from `lib/db/`
- Build your application features
