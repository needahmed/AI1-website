import { getProjectBySlug } from "@/lib/repositories/projects";
import { ProjectForm } from "@/components/admin/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const project = await getProjectBySlug(slug).catch(() => {
    notFound();
  });
  
  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update project details
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <ProjectForm project={project} isEdit />
      </div>
    </div>
  );
}
