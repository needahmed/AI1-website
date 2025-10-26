import readingTime from "reading-time";

/**
 * Calculate reading time for blog post content
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

/**
 * Format category for display
 */
export function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    WEB_DEVELOPMENT: "Web Development",
    AI: "AI",
    GAME_DEV: "Game Dev",
    SEO: "SEO",
    INDUSTRY_INSIGHTS: "Industry Insights",
    OTHER: "Other",
  };
  return categoryMap[category] || category;
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Get sample blog posts when database is empty
 */
export function getSampleBlogPosts() {
  const now = new Date();
  return [
    {
      id: "sample-1",
      slug: "getting-started-with-next-js",
      title: "Getting Started with Next.js 16: A Comprehensive Guide",
      excerpt:
        "Learn how to build modern web applications with Next.js 16, featuring the App Router, Server Components, and more.",
      content: `## Introduction

Next.js 16 is here with exciting new features and improvements. In this guide, we'll explore what's new and how you can leverage these features in your projects.

## What's New

### Server Components

Server Components allow you to render components on the server, reducing JavaScript bundle size and improving performance.

\`\`\`tsx
// Example Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
\`\`\`

### App Router

The new App Router provides a more intuitive file-based routing system with support for layouts, loading states, and error boundaries.

## Getting Started

To create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 16 brings powerful features that make building modern web applications easier than ever. Start exploring today!`,
      author: "Alex Johnson",
      authorBio: "Full-stack developer and tech writer specializing in modern web frameworks.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      categories: ["WEB_DEVELOPMENT"],
      tags: ["nextjs", "react", "tutorial"],
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      featured: true,
      featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop",
      seoMeta: null,
      readingTime: 5,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-2",
      slug: "ai-powered-web-development",
      title: "How AI is Transforming Web Development",
      excerpt:
        "Explore the latest AI tools and techniques that are revolutionizing the way we build web applications.",
      content: `## Introduction

Artificial Intelligence is transforming every industry, and web development is no exception. Let's explore how AI is changing the game.

## AI Code Assistants

Tools like GitHub Copilot and ChatGPT are helping developers write code faster and more efficiently.

## AI in Design

AI-powered design tools can generate layouts, color schemes, and even complete designs based on simple prompts.

## The Future

As AI continues to evolve, we can expect even more innovative tools and techniques to emerge in web development.`,
      author: "Sam Chen",
      authorBio: "AI researcher and developer advocate with a passion for emerging technologies.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      categories: ["AI", "WEB_DEVELOPMENT"],
      tags: ["ai", "machine-learning", "productivity"],
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      featured: false,
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
      seoMeta: null,
      readingTime: 4,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-3",
      slug: "game-dev-webgl-basics",
      title: "WebGL Basics for Game Development",
      excerpt:
        "Learn the fundamentals of WebGL and how to create stunning 3D graphics in the browser.",
      content: `## Getting Started with WebGL

WebGL is a powerful JavaScript API for rendering 3D graphics in web browsers without plugins.

## Creating Your First Scene

Let's start by creating a simple 3D cube with rotating animation.

\`\`\`javascript
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
// Setup WebGL context
\`\`\`

## Advanced Techniques

Once you master the basics, you can create complex game worlds with physics, lighting, and textures.`,
      author: "Jordan Lee",
      authorBio: "Game developer with 10+ years of experience in web-based 3D graphics.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      categories: ["GAME_DEV"],
      tags: ["webgl", "3d", "gaming"],
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      featured: false,
      featuredImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=630&fit=crop",
      seoMeta: null,
      readingTime: 6,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-4",
      slug: "seo-best-practices-2024",
      title: "SEO Best Practices for 2024",
      excerpt:
        "Stay ahead of the curve with these essential SEO strategies for modern websites.",
      content: `## Modern SEO Strategies

Search engine optimization continues to evolve. Here are the key strategies for 2024.

## Core Web Vitals

Google's Core Web Vitals are crucial ranking factors. Focus on LCP, FID, and CLS metrics.

## Content Quality

High-quality, relevant content remains the foundation of good SEO. Focus on user intent and value.

## Technical SEO

Ensure your site is fast, mobile-friendly, and properly structured with semantic HTML.`,
      author: "Taylor Swift",
      authorBio: "SEO specialist and digital marketing consultant.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      categories: ["SEO"],
      tags: ["seo", "marketing", "optimization"],
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      featured: false,
      featuredImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=630&fit=crop",
      seoMeta: null,
      readingTime: 5,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-5",
      slug: "industry-insights-2024",
      title: "Web Development Industry Insights for 2024",
      excerpt:
        "Discover the trends and technologies shaping the future of web development this year.",
      content: `## The State of Web Development

The web development landscape is constantly evolving. Here's what to expect in 2024.

## Key Trends

1. **Server-First Rendering**: A return to server-side logic with enhanced interactivity
2. **AI Integration**: AI-powered features becoming standard
3. **Performance Focus**: Speed and efficiency as top priorities

## Emerging Technologies

Edge computing, serverless architecture, and Web3 are gaining mainstream adoption.

## Career Opportunities

The demand for skilled web developers continues to grow, with new specializations emerging.`,
      author: "Morgan Davis",
      authorBio: "Tech industry analyst and consultant with 15+ years of experience.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
      categories: ["INDUSTRY_INSIGHTS"],
      tags: ["trends", "career", "industry"],
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      featured: false,
      featuredImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop",
      seoMeta: null,
      readingTime: 4,
      createdAt: now,
      updatedAt: now,
    },
  ];
}
