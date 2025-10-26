# Next.js 16 Full Stack Project

A modern full-stack Next.js 16 application with TypeScript, Tailwind CSS, Prisma, and more.

> 📚 **Documentation:** See [DOCS_INDEX.md](./DOCS_INDEX.md) for complete documentation index.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 with dark mode support
- **Database:** Prisma with MongoDB
- **UI Components:** Lucide React icons, class-variance-authority
- **Validation:** Zod
- **Email:** @react-email/components
- **Theme:** next-themes for dark mode
- **Animation:** GSAP, ScrollTrigger, Framer Motion, Lenis, react-scroll-parallax
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud instance)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.local.example` file to `.env` and update with your actual values:

```bash
cp .env.local.example .env
```

Required environment variables:

- `DATABASE_URL`: MongoDB connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Get your connection string from MongoDB Atlas or your MongoDB instance

### Database Setup

This project uses **MongoDB** with **Prisma ORM** for type-safe database access.

> 📋 **Quick Start:** Follow the [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for a step-by-step setup guide.

#### 1. Set Up MongoDB

You have two options for MongoDB:

**Option A: MongoDB Atlas (Cloud - Recommended for development)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from the "Connect" button

**Option B: Local MongoDB**

1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/your-database-name`

#### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.local.example`):

```bash
cp .env.local.example .env
```

Update the `DATABASE_URL` with your MongoDB connection string:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

⚠️ **Security Best Practices:**
- Never commit `.env` files to version control (already in `.gitignore`)
- Use strong passwords for production databases
- Restrict IP access in production
- Rotate credentials regularly
- Use environment-specific connection strings

#### 3. Generate Prisma Client

Generate the Prisma Client based on your schema:

```bash
npm run db:generate
# or
npx prisma generate
```

This creates a type-safe database client in `node_modules/.prisma/client`.

#### 4. Push Schema to Database

For development, push your schema to MongoDB:

```bash
npm run db:push
# or
npx prisma db push
```

This command:
- Creates collections in your MongoDB database
- Creates indexes as defined in the schema
- Does not create migration history (ideal for prototyping)

⚠️ **Important:** MongoDB with Prisma uses `db push` instead of migrations. MongoDB is schema-less, so traditional migrations don't apply. Always use `prisma db push` for schema changes.

#### 5. Seed the Database (Optional)

Populate your database with sample data for testing:

```bash
npm run db:seed
```

This will create:
- 5 sample projects (e-commerce platform, fitness app, etc.)
- 4 blog posts with full content
- 3 contact submissions with various statuses
- 2 admin users (super admin and editor)
- 4 newsletter subscribers

⚠️ **Note:** The seed script will delete existing data before seeding. Comment out the delete statements in `prisma/seed.ts` if you want to preserve existing data.

#### 6. Explore Your Data (Optional)

Open Prisma Studio to view and edit your data:

```bash
npm run db:studio
# or
npx prisma studio
```

This opens a browser-based GUI at http://localhost:5555

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:generate` - Generate Prisma Client from schema
- `npm run db:push` - Push schema changes to MongoDB
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── playground/         # Animation demos
├── components/             # React components
│   ├── animation/          # Animation components
│   └── ui/                 # UI components (shadcn/ui)
├── hooks/                  # Custom React hooks
│   └── animation/          # Animation hooks (GSAP, ScrollTrigger)
├── lib/                    # Utilities and configurations
│   ├── animation/          # Animation utilities
│   ├── prisma.ts           # Prisma Client singleton
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── public/                 # Static assets
├── .env                    # Environment variables (not in git)
├── .env.local.example      # Environment variables template
├── .gitignore              # Git ignore rules
├── .prettierrc.json        # Prettier configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── prisma.config.ts        # Prisma configuration
└── tsconfig.json           # TypeScript configuration
```

## Features

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/*` for `src/*`)
- Full type safety across the project

### Tailwind CSS

- Tailwind CSS v4 with PostCSS
- Dark mode using class strategy
- CSS reset included
- Utility classes for consistent styling

### Animation Stack

- **Smooth Scrolling:** Global Lenis integration with momentum-based scrolling
- **GSAP & ScrollTrigger:** Advanced scroll-driven animations with SSR safety
- **Framer Motion:** React-first animations with intersection observers
- **Parallax Effects:** Multi-layer parallax scrolling
- **Reusable Hooks:** `useScrollTrigger`, `useGSAPTimeline`, `useGSAPStagger`
- **Pre-built Components:** `MotionSection`, `ParallaxContainer`, `ParallaxLayer`
- **Demo Playground:** Visit `/playground` to see all animations in action

See [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md) for complete documentation.

### Code Quality

- ESLint with Next.js, TypeScript, and Prettier configurations
- Prettier with Tailwind CSS plugin for class sorting
- Husky for git hooks
- lint-staged for pre-commit checks

### Database

- **Prisma ORM** with MongoDB for type-safe database operations
- **Schema-first development** with automatic type generation
- **5 Data Models:**
  - `Project` - Portfolio projects with categories, technologies, and featured flag
  - `BlogPost` - Blog articles with categories, SEO metadata, and publish dates
  - `ContactSubmission` - Contact form submissions with status tracking
  - `AdminUser` - Administrative users with role-based access
  - `NewsletterSubscriber` - Email subscribers with source tracking
- **Optimized Indexes** for common queries (slugs, categories, status, dates)
- **Seed Script** for populating sample data during development
- **Prisma Studio** for visual database management

### Dark Mode

Dark mode is configured with class strategy. To implement it in your components:

1. Wrap your app with `ThemeProvider` from `next-themes`
2. Toggle dark mode by adding/removing the `dark` class on the `<html>` element

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# Add other environment variables as needed
```

See `.env.local.example` for a complete template.

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests and linting pass
4. Submit a pull request

## Database Schema & Usage

For detailed information about the database schema, models, queries, and best practices, see:

📖 **[DATABASE.md](./DATABASE.md)** - Comprehensive database documentation

Quick links:
- Schema overview and all models
- Query examples for each model
- Database commands reference
- Environment variables guide
- Security best practices
- Troubleshooting guide

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB with Prisma](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

[Your License Here]
