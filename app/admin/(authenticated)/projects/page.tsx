"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjectsAdminAction, deleteProjectAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredProjects(projects);
    } else if (categoryFilter === "featured") {
      setFilteredProjects(projects.filter((p) => p.featured));
    } else {
      setFilteredProjects(projects.filter((p) => p.category === categoryFilter));
    }
  }, [categoryFilter, projects]);

  const loadProjects = async () => {
    setIsLoading(true);
    const result = await getAllProjectsAdminAction();
    if (result.success && result.data) {
      setProjects(result.data);
      setFilteredProjects(result.data);
    } else {
      toast.error("Failed to load projects");
    }
    setIsLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    const result = await deleteProjectAction(slug);
    if (result.success) {
      toast.success("Project deleted successfully");
      loadProjects();
    } else {
      toast.error(result.error || "Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="WEB_DEVELOPMENT">Web Development</SelectItem>
            <SelectItem value="MOBILE_APP">Mobile App</SelectItem>
            <SelectItem value="ECOMMERCE">E-Commerce</SelectItem>
            <SelectItem value="BRANDING">Branding</SelectItem>
            <SelectItem value="UI_UX_DESIGN">UI/UX Design</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Table */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                        <span className="font-medium">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {project.category.replace(/_/g, " ")}
                    </td>
                    <td className="px-6 py-4">
                      {project.featured ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/projects/${project.slug}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(project.slug)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
