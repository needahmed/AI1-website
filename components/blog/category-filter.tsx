"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  { value: "all", label: "All Posts" },
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "AI", label: "AI" },
  { value: "GAME_DEV", label: "Game Dev" },
  { value: "SEO", label: "SEO" },
  { value: "INDUSTRY_INSIGHTS", label: "Industry Insights" },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page"); // Reset to first page when changing category
    const queryString = params.toString();
    router.push(queryString ? `/blog?${queryString}` : "/blog");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentCategory === category.value ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.value)}
          className="transition-all"
        >
          {category.label}
        </Button>
      ))}
    </motion.div>
  );
}
