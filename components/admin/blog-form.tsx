"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createBlogPostAction, updateBlogPostAction } from "@/lib/actions/admin";

type BlogFormData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string | null;
  authorImage?: string | null;
  categories: string[];
  tags: string[];
  publishedAt?: Date | null;
  featured: boolean;
  featuredImage?: string | null;
};

interface BlogFormProps {
  post?: BlogFormData & { id: string };
  isEdit?: boolean;
}

export function BlogForm({ post, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    author: post?.author || "",
    authorBio: post?.authorBio ?? "",
    authorImage: post?.authorImage ?? "",
    categories: post?.categories || [],
    tags: post?.tags || [],
    publishedAt: post?.publishedAt || null,
    featured: post?.featured || false,
    featuredImage: post?.featuredImage ?? "",
  });

  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(!!post?.publishedAt);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        publishedAt: isPublished ? (formData.publishedAt || new Date()) : null,
      };

      const result = isEdit && post
        ? await updateBlogPostAction(post.slug, submitData)
        : await createBlogPostAction(submitData);

      if (result.success) {
        toast.success(isEdit ? "Blog post updated successfully" : "Blog post created successfully");
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to save blog post");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const toggleCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter((c) => c !== category)
        : [...formData.categories, category],
    });
  };

  const categories = [
    "WEB_DEVELOPMENT",
    "AI",
    "GAME_DEV",
    "SEO",
    "INDUSTRY_INSIGHTS",
    "OTHER",
  ];

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
        <Label htmlFor="excerpt">Excerpt *</Label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label htmlFor="content">Content (MDX) *</Label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={20}
          className="mt-1 w-full font-mono text-sm rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          placeholder="Write your blog post content in MDX format..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Use Markdown/MDX syntax for formatting
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="authorImage">Author Image URL</Label>
          <Input
            id="authorImage"
            value={formData.authorImage ?? ""}
            onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="authorBio">Author Bio</Label>
        <textarea
          id="authorBio"
          value={formData.authorBio ?? ""}
          onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />
      </div>

      <div>
        <Label>Categories *</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                formData.categories.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {category.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          value={formData.featuredImage ?? ""}
          onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured Post
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="published" className="cursor-pointer">
            Publish Post
          </Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
