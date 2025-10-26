"use client";

import { ProjectCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PortfolioFiltersProps {
  selectedCategory: ProjectCategory | "ALL";
  onCategoryChange: (category: ProjectCategory | "ALL") => void;
  showFeaturedOnly: boolean;
  onFeaturedToggle: () => void;
}

const categoryLabels: Record<ProjectCategory | "ALL", string> = {
  ALL: "All Projects",
  WEB_DEVELOPMENT: "Web Development",
  MOBILE_APP: "Mobile Apps",
  ECOMMERCE: "E-Commerce",
  BRANDING: "Branding",
  UI_UX_DESIGN: "UI/UX Design",
  OTHER: "Other",
};

export function PortfolioFilters({
  selectedCategory,
  onCategoryChange,
  showFeaturedOnly,
  onFeaturedToggle,
}: PortfolioFiltersProps) {
  const categories: (ProjectCategory | "ALL")[] = [
    "ALL",
    "WEB_DEVELOPMENT",
    "MOBILE_APP",
    "ECOMMERCE",
    "BRANDING",
    "UI_UX_DESIGN",
    "OTHER",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant={showFeaturedOnly ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={onFeaturedToggle}
          >
            ⭐ Featured
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "transition-all",
              selectedCategory === category && "shadow-ai1"
            )}
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>
    </div>
  );
}
