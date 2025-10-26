import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data (optional - comment out if you want to preserve existing data)
  console.log("🧹 Cleaning existing data...");
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // Seed Projects
  console.log("📦 Seeding projects...");
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: "ecommerce-platform",
        title: "Modern E-Commerce Platform",
        description:
          "A full-featured e-commerce platform built with Next.js and MongoDB, featuring real-time inventory management, secure payment processing, and advanced analytics.",
        category: "ECOMMERCE",
        technologies: [
          "Next.js",
          "TypeScript",
          "MongoDB",
          "Stripe",
          "Tailwind CSS",
        ],
        images: [
          "/projects/ecommerce-1.jpg",
          "/projects/ecommerce-2.jpg",
          "/projects/ecommerce-3.jpg",
        ],
        client: "TechRetail Inc.",
        results:
          "Increased conversion rate by 45% and reduced cart abandonment by 30%",
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        slug: "fitness-tracking-app",
        title: "Fitness Tracking Mobile App",
        description:
          "Cross-platform mobile application for tracking workouts, nutrition, and progress with AI-powered recommendations.",
        category: "MOBILE_APP",
        technologies: [
          "React Native",
          "Node.js",
          "MongoDB",
          "TensorFlow",
          "AWS",
        ],
        images: [
          "/projects/fitness-1.jpg",
          "/projects/fitness-2.jpg",
          "/projects/fitness-3.jpg",
        ],
        client: "FitLife Solutions",
        results:
          "50,000+ downloads in first month, 4.8 star rating on app stores",
        featured: true,
      },
    }),
    prisma.project.create({
      data: {
        slug: "corporate-website-redesign",
        title: "Corporate Website Redesign",
        description:
          "Complete redesign of corporate website with focus on modern UI/UX, accessibility, and performance optimization.",
        category: "WEB_DEVELOPMENT",
        technologies: ["Next.js", "TypeScript", "Prisma", "Vercel", "Figma"],
        images: ["/projects/corporate-1.jpg", "/projects/corporate-2.jpg"],
        client: "Global Tech Corp",
        results:
          "90+ Lighthouse score, 60% improvement in page load times, 35% increase in user engagement",
        featured: false,
      },
    }),
    prisma.project.create({
      data: {
        slug: "brand-identity-refresh",
        title: "Brand Identity Refresh",
        description:
          "Complete brand identity redesign including logo, color palette, typography, and brand guidelines for a sustainable fashion company.",
        category: "BRANDING",
        technologies: ["Adobe Illustrator", "Figma", "Adobe Photoshop"],
        images: ["/projects/brand-1.jpg", "/projects/brand-2.jpg"],
        client: "EcoWear Fashion",
        results:
          "Increased brand recognition by 70%, successfully launched across 5 countries",
        featured: false,
      },
    }),
    prisma.project.create({
      data: {
        slug: "saas-dashboard-design",
        title: "SaaS Dashboard UI/UX Design",
        description:
          "User-centered design for a complex analytics dashboard with focus on data visualization and intuitive navigation.",
        category: "UI_UX_DESIGN",
        technologies: ["Figma", "Adobe XD", "Principle", "UserTesting"],
        images: [
          "/projects/saas-1.jpg",
          "/projects/saas-2.jpg",
          "/projects/saas-3.jpg",
        ],
        client: "DataInsights Pro",
        results:
          "Reduced user onboarding time by 50%, improved user satisfaction score from 6.5 to 9.2/10",
        featured: true,
      },
    }),
  ]);
  console.log(`✅ Created ${projects.length} projects`);

  // Seed Blog Posts
  console.log("📝 Seeding blog posts...");
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        slug: "getting-started-with-nextjs-16",
        title: "Getting Started with Next.js 16: A Complete Guide",
        excerpt:
          "Learn how to build modern web applications with Next.js 16, featuring the latest App Router improvements and server components.",
        content: `
# Getting Started with Next.js 16

Next.js 16 brings exciting new features and improvements...

## Key Features

- Enhanced App Router
- Improved Server Components
- Better Performance
- Simplified Data Fetching

## Getting Started

First, create a new Next.js application...

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Then navigate to your project and start the development server...
        `,
        author: "Jane Developer",
        categories: ["TECH", "TUTORIAL"],
        publishedAt: new Date("2024-01-15"),
        featuredImage: "/blog/nextjs-guide.jpg",
        seoMeta: {
          title: "Getting Started with Next.js 16: A Complete Guide",
          description:
            "Complete guide to building modern web applications with Next.js 16",
          keywords: ["Next.js", "React", "Web Development", "Tutorial"],
        },
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "design-systems-best-practices",
        title: "Building Scalable Design Systems: Best Practices",
        excerpt:
          "Explore the key principles and best practices for creating maintainable and scalable design systems for modern applications.",
        content: `
# Building Scalable Design Systems

A well-designed design system can significantly improve development velocity...

## Core Principles

1. Consistency
2. Reusability
3. Scalability
4. Documentation

Learn how to implement these principles in your organization...
        `,
        author: "John Designer",
        categories: ["DESIGN", "BUSINESS"],
        publishedAt: new Date("2024-01-20"),
        featuredImage: "/blog/design-systems.jpg",
        seoMeta: {
          title: "Building Scalable Design Systems: Best Practices",
          description:
            "Learn best practices for creating maintainable design systems",
          keywords: ["Design Systems", "UI/UX", "Design", "Best Practices"],
        },
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "mongodb-prisma-production-tips",
        title: "MongoDB with Prisma: Production-Ready Tips",
        excerpt:
          "Essential tips and best practices for running MongoDB with Prisma in production environments.",
        content: `
# MongoDB with Prisma in Production

Running a production MongoDB database with Prisma requires careful consideration...

## Performance Optimization

- Index strategy
- Connection pooling
- Query optimization

## Security Best Practices

- Secure connection strings
- Environment variable management
- Access control

Learn more about production-ready MongoDB setups...
        `,
        author: "Alex Backend",
        categories: ["TECH", "TUTORIAL"],
        publishedAt: new Date("2024-02-01"),
        featuredImage: "/blog/mongodb-prisma.jpg",
        seoMeta: {
          title: "MongoDB with Prisma: Production-Ready Tips",
          description:
            "Essential tips for running MongoDB with Prisma in production",
          keywords: ["MongoDB", "Prisma", "Database", "Production"],
        },
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "2024-web-development-trends",
        title: "Top Web Development Trends to Watch in 2024",
        excerpt:
          "Discover the emerging trends shaping the future of web development in 2024, from AI integration to edge computing.",
        content: `
# Web Development Trends 2024

The web development landscape is constantly evolving...

## Emerging Trends

1. AI-Powered Development Tools
2. Edge Computing and CDN Evolution
3. Web3 and Decentralization
4. Progressive Web Apps (PWA) 2.0
5. WebAssembly Adoption

Stay ahead of the curve with these insights...
        `,
        author: "Sarah Tech",
        categories: ["TECH", "NEWS"],
        publishedAt: new Date("2024-02-10"),
        featuredImage: "/blog/2024-trends.jpg",
        seoMeta: {
          title: "Top Web Development Trends to Watch in 2024",
          description: "Emerging trends shaping web development in 2024",
          keywords: ["Web Development", "Trends", "2024", "Technology"],
        },
      },
    }),
  ]);
  console.log(`✅ Created ${blogPosts.length} blog posts`);

  // Seed Contact Submissions
  console.log("📧 Seeding contact submissions...");
  const contactSubmissions = await Promise.all([
    prisma.contactSubmission.create({
      data: {
        name: "Michael Johnson",
        email: "michael.j@example.com",
        phone: "+1-555-0123",
        company: "Startup Innovations",
        projectType: "WEB_DEVELOPMENT",
        budgetRange: "RANGE_10K_25K",
        message:
          "We're looking to build a new web platform for our SaaS product. Would love to discuss the project with your team.",
        status: "PENDING",
      },
    }),
    prisma.contactSubmission.create({
      data: {
        name: "Emily Chen",
        email: "emily.chen@example.com",
        phone: "+1-555-0456",
        company: "Fashion Forward",
        projectType: "ECOMMERCE",
        budgetRange: "RANGE_25K_50K",
        message:
          "Need help building an e-commerce platform with custom features for our fashion brand.",
        status: "CONTACTED",
      },
    }),
    prisma.contactSubmission.create({
      data: {
        name: "David Smith",
        email: "david.smith@example.com",
        projectType: "CONSULTATION",
        budgetRange: "UNDER_5K",
        message:
          "Interested in a consultation session to discuss our digital transformation strategy.",
        status: "COMPLETED",
      },
    }),
  ]);
  console.log(`✅ Created ${contactSubmissions.length} contact submissions`);

  // Seed Admin Users
  console.log("👤 Seeding admin users...");
  const adminUsers = await Promise.all([
    prisma.adminUser.create({
      data: {
        email: "admin@example.com",
        passwordHash:
          "$2a$10$examplehashthiswouldbearealhashinproduction123456",
        name: "Super Admin",
        role: "SUPER_ADMIN",
        lastLogin: new Date(),
      },
    }),
    prisma.adminUser.create({
      data: {
        email: "editor@example.com",
        passwordHash:
          "$2a$10$examplehashthiswouldbearealhashinproduction789012",
        name: "Content Editor",
        role: "EDITOR",
        lastLogin: new Date("2024-02-15"),
      },
    }),
  ]);
  console.log(`✅ Created ${adminUsers.length} admin users`);

  // Seed Newsletter Subscribers
  console.log("📨 Seeding newsletter subscribers...");
  const newsletterSubscribers = await Promise.all([
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber1@example.com",
        source: "homepage",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber2@example.com",
        source: "blog",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber3@example.com",
        source: "footer",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber4@example.com",
        source: "homepage",
      },
    }),
  ]);
  console.log(
    `✅ Created ${newsletterSubscribers.length} newsletter subscribers`,
  );

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
