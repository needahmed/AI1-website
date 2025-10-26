import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatBadgeProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "electric" | "purple" | "cyan";
  className?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export function StatBadge({
  value,
  label,
  icon,
  variant = "default",
  className,
  trend,
}: StatBadgeProps) {
  const variantClasses = {
    default: "bg-card border-border text-foreground",
    electric: "bg-electric-blue/10 border-electric-blue/20 text-electric-blue",
    purple: "bg-purple/10 border-purple/20 text-purple",
    cyan: "bg-cyan/10 border-cyan/20 text-cyan",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 border backdrop-blur-sm space-y-2",
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        {icon && <div className="text-2xl opacity-80">{icon}</div>}
        {trend && (
          <div
            className={cn(
              "text-sm font-medium flex items-center gap-1",
              trend.direction === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.direction === "up" ? "↑" : "↓"}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-heading font-bold">
          {value}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}
