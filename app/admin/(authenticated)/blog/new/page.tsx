import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Write a new blog post
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <BlogForm />
      </div>
    </div>
  );
}
