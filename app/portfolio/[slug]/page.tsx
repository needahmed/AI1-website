import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/repositories/projects";
import { ProjectCaseStudy } from "./project-case-study";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    // If database is not available during build, return empty array
    // Pages will be generated on-demand
    console.warn("Database not available for static generation:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const project = await getProjectBySlug(resolvedParams.slug);

    return {
      title: `${project.title} - Portfolio Case Study`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.ogImage
          ? [{ url: project.ogImage }]
          : project.images.length > 0
            ? [{ url: project.images[0] }]
            : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: project.ogImage
          ? [project.ogImage]
          : project.images.length > 0
            ? [project.images[0]]
            : [],
      },
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  try {
    const project = await getProjectBySlug(resolvedParams.slug);
    return <ProjectCaseStudy project={project} />;
  } catch {
    notFound();
  }
}
