import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
        authorBio: "Full-stack developer and technical writer with 10+ years of experience.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        categories: ["WEB_DEVELOPMENT"],
        tags: ["nextjs", "react", "tutorial"],
        publishedAt: new Date("2024-01-15"),
        featured: true,
        featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "Getting Started with Next.js 16: A Complete Guide",
          description:
            "Complete guide to building modern web applications with Next.js 16",
          keywords: ["Next.js", "React", "Web Development", "Tutorial"],
        },
        readingTime: 8,
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
        authorBio: "UX/UI designer specializing in design systems and component libraries.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        categories: ["WEB_DEVELOPMENT"],
        tags: ["design-systems", "ui-ux", "best-practices"],
        publishedAt: new Date("2024-01-20"),
        featured: false,
        featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "Building Scalable Design Systems: Best Practices",
          description:
            "Learn best practices for creating maintainable design systems",
          keywords: ["Design Systems", "UI/UX", "Design", "Best Practices"],
        },
        readingTime: 6,
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
        authorBio: "Backend engineer with expertise in database optimization and scalability.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        categories: ["WEB_DEVELOPMENT"],
        tags: ["mongodb", "prisma", "database", "production"],
        publishedAt: new Date("2024-02-01"),
        featured: false,
        featuredImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "MongoDB with Prisma: Production-Ready Tips",
          description:
            "Essential tips for running MongoDB with Prisma in production",
          keywords: ["MongoDB", "Prisma", "Database", "Production"],
        },
        readingTime: 7,
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
        authorBio: "Technology analyst and blogger covering web development trends.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        categories: ["INDUSTRY_INSIGHTS", "AI"],
        tags: ["trends", "web-development", "2024", "ai"],
        publishedAt: new Date("2024-02-10"),
        featured: false,
        featuredImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "Top Web Development Trends to Watch in 2024",
          description: "Emerging trends shaping web development in 2024",
          keywords: ["Web Development", "Trends", "2024", "Technology"],
        },
        readingTime: 5,
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "ai-for-seo-optimization",
        title: "Using AI for Advanced SEO Optimization",
        excerpt:
          "Discover how artificial intelligence can revolutionize your SEO strategy with automated insights and optimization.",
        content: `
# AI for SEO Optimization

AI is transforming how we approach SEO...

## Key Benefits

- Automated keyword research
- Content optimization
- Competitor analysis
- Technical SEO audits

## Implementation

Learn how to integrate AI tools into your SEO workflow...
        `,
        author: "Emma Digital",
        authorBio: "Digital marketing expert specializing in AI-powered SEO strategies.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        categories: ["AI", "SEO"],
        tags: ["ai", "seo", "automation", "optimization"],
        publishedAt: new Date("2024-02-15"),
        featured: false,
        featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "Using AI for Advanced SEO Optimization",
          description: "How AI can revolutionize your SEO strategy",
          keywords: ["AI", "SEO", "Automation", "Digital Marketing"],
        },
        readingTime: 6,
      },
    }),
    prisma.blogPost.create({
      data: {
        slug: "unity-webgl-games",
        title: "Building Browser Games with Unity and WebGL",
        excerpt:
          "A comprehensive guide to creating and optimizing browser-based games using Unity and WebGL technology.",
        content: `
# Unity WebGL Games

Unity's WebGL support allows you to publish games directly to the browser...

## Getting Started

1. Set up Unity for WebGL
2. Optimize assets
3. Handle browser compatibility
4. Deploy and test

## Best Practices

Learn optimization techniques for smooth browser performance...
        `,
        author: "Ryan GameDev",
        authorBio: "Indie game developer creating browser-based experiences.",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
        categories: ["GAME_DEV"],
        tags: ["unity", "webgl", "game-development", "browser-games"],
        publishedAt: new Date("2024-02-18"),
        featured: false,
        featuredImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=630&fit=crop",
        seoMeta: {
          title: "Building Browser Games with Unity and WebGL",
          description: "Complete guide to Unity WebGL game development",
          keywords: ["Unity", "WebGL", "Game Development", "Browser Games"],
        },
        readingTime: 9,
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
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const editorPasswordHash = await bcrypt.hash("editor123", 10);
  
  const adminUsers = await Promise.all([
    prisma.adminUser.create({
      data: {
        email: "admin@example.com",
        passwordHash: adminPasswordHash,
        name: "Super Admin",
        role: "SUPER_ADMIN",
        lastLogin: new Date(),
      },
    }),
    prisma.adminUser.create({
      data: {
        email: "editor@example.com",
        passwordHash: editorPasswordHash,
        name: "Content Editor",
        role: "EDITOR",
        lastLogin: new Date("2024-02-15"),
      },
    }),
  ]);
  console.log(`✅ Created ${adminUsers.length} admin users`);
  console.log("   Default credentials:");
  console.log("   - admin@example.com / admin123 (Super Admin)");
  console.log("   - editor@example.com / editor123 (Editor)");

  // Seed Newsletter Subscribers
  console.log("📨 Seeding newsletter subscribers...");
  const newsletterSubscribers = await Promise.all([
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber1@example.com",
        source: "homepage",
        status: "ACTIVE",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber2@example.com",
        source: "blog",
        status: "ACTIVE",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber3@example.com",
        source: "footer",
        status: "ACTIVE",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber4@example.com",
        source: "homepage",
        status: "UNSUBSCRIBED",
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
