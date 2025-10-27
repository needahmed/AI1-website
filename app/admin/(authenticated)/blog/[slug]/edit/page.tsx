import { getBlogPostBySlug } from "@/lib/repositories/blog";
import { BlogForm } from "@/components/admin/blog-form";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const post = await getBlogPostBySlug(slug).catch(() => {
    notFound();
  });
  
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update blog post details
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <BlogForm post={post} isEdit />
      </div>
    </div>
  );
}
