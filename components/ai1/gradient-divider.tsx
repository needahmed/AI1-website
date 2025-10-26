import { cn } from "@/lib/utils";

interface GradientDividerProps {
  className?: string;
  variant?: "ai1" | "electric" | "purple";
  height?: "sm" | "md" | "lg";
}

export function GradientDivider({
  className,
  variant = "ai1",
  height = "md",
}: GradientDividerProps) {
  const variantClasses = {
    ai1: "gradient-ai1",
    electric: "gradient-electric",
    purple: "gradient-purple",
  };

  const heightClasses = {
    sm: "h-0.5",
    md: "h-1",
    lg: "h-2",
  };

  return (
    <div
      className={cn(
        "w-full",
        variantClasses[variant],
        heightClasses[height],
        className
      )}
      role="separator"
    />
  );
}
