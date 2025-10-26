import { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/repositories/blog";
import { getAllProjects } from "@/lib/repositories/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/web-app-development`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ai-solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/seo-services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/branding-uiux`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/game-development`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const result = await getPublishedBlogPosts({ limit: 1000 });
    blogPosts = result.posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn("Could not fetch blog posts for sitemap:", error);
  }

  // Dynamic portfolio projects
  let portfolioProjects: MetadataRoute.Sitemap = [];
  try {
    const projects = await getAllProjects();
    portfolioProjects = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn("Could not fetch projects for sitemap:", error);
  }

  return [...staticRoutes, ...blogPosts, ...portfolioProjects];
}
