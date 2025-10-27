"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPostsAdminAction, deleteBlogPostAction } from "@/lib/actions/admin";
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

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredPosts(posts);
    } else if (statusFilter === "published") {
      setFilteredPosts(posts.filter((p) => p.publishedAt));
    } else if (statusFilter === "draft") {
      setFilteredPosts(posts.filter((p) => !p.publishedAt));
    } else if (statusFilter === "featured") {
      setFilteredPosts(posts.filter((p) => p.featured));
    }
  }, [statusFilter, posts]);

  const loadPosts = async () => {
    setIsLoading(true);
    const result = await getAllBlogPostsAdminAction();
    if (result.success && result.data) {
      setPosts(result.data);
      setFilteredPosts(result.data);
    } else {
      toast.error("Failed to load blog posts");
    }
    setIsLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    const result = await deleteBlogPostAction(slug);
    if (result.success) {
      toast.success("Blog post deleted successfully");
      loadPosts();
    } else {
      toast.error(result.error || "Failed to delete blog post");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your blog content
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Table */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Categories
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Published
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        )}
                        <span className="font-medium">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {post.categories.slice(0, 2).join(", ")}
                      {post.categories.length > 2 && "..."}
                    </td>
                    <td className="px-6 py-4">
                      {post.publishedAt ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blog/${post.slug}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.slug)}
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
                    No blog posts found
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
