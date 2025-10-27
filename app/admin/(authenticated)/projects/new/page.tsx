import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Project</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add a new project to your portfolio
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <ProjectForm />
      </div>
    </div>
  );
}
