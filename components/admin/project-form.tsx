"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createProjectAction, updateProjectAction } from "@/lib/actions/admin";
import { ProjectCategory } from "@prisma/client";

type ProjectFormData = {
  slug: string;
  title: string;
  description: string;
  overview?: string | null;
  challenges?: string | null;
  solutions?: string | null;
  category: string;
  technologies: string[];
  images: string[];
  client?: string | null;
  results?: string | null;
  ogImage?: string | null;
  featured: boolean;
};

interface ProjectFormProps {
  project?: ProjectFormData & { id: string };
  isEdit?: boolean;
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    slug: project?.slug || "",
    title: project?.title || "",
    description: project?.description || "",
    overview: project?.overview ?? "",
    challenges: project?.challenges ?? "",
    solutions: project?.solutions ?? "",
    category: project?.category || "WEB_DEVELOPMENT",
    technologies: project?.technologies || [],
    images: project?.images || [],
    client: project?.client ?? "",
    results: project?.results ?? "",
    ogImage: project?.ogImage ?? "",
    featured: project?.featured || false,
  });

  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        overview: formData.overview || undefined,
        challenges: formData.challenges || undefined,
        solutions: formData.solutions || undefined,
        client: formData.client || undefined,
        results: formData.results || undefined,
        ogImage: formData.ogImage || undefined,
        category: formData.category as ProjectCategory,
      };
      
      const result = isEdit && project
        ? await updateProjectAction(project.slug, submitData)
        : await createProjectAction(submitData);

      if (result.success) {
        toast.success(isEdit ? "Project updated successfully" : "Project created successfully");
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save project");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            disabled={isEdit}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label htmlFor="overview">Overview</Label>
        <textarea
          id="overview"
          value={formData.overview ?? ""}
          onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label htmlFor="challenges">Challenges</Label>
        <textarea
          id="challenges"
          value={formData.challenges ?? ""}
          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label htmlFor="solutions">Solutions</Label>
        <textarea
          id="solutions"
          value={formData.solutions ?? ""}
          onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WEB_DEVELOPMENT">Web Development</SelectItem>
              <SelectItem value="MOBILE_APP">Mobile App</SelectItem>
              <SelectItem value="ECOMMERCE">E-Commerce</SelectItem>
              <SelectItem value="BRANDING">Branding</SelectItem>
              <SelectItem value="UI_UX_DESIGN">UI/UX Design</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="client">Client</Label>
          <Input
            id="client"
            value={formData.client ?? ""}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Technologies</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnology();
              }
            }}
          />
          <Button type="button" onClick={addTechnology} variant="outline">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label>Images (URLs)</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="Add image URL"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImage();
              }
            }}
          />
          <Button type="button" onClick={addImage} variant="outline">
            Add
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {formData.images.map((image, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md border border-gray-200 p-2 dark:border-gray-800"
            >
              <span className="flex-1 truncate text-sm">{image}</span>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="results">Results</Label>
        <textarea
          id="results"
          value={formData.results ?? ""}
          onChange={(e) => setFormData({ ...formData, results: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label htmlFor="ogImage">OG Image URL</Label>
        <Input
          id="ogImage"
          value={formData.ogImage ?? ""}
          onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Featured Project
        </Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
