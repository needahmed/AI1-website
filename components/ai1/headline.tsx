import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadlineProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "gradient" | "electric";
  className?: string;
  subtitle?: string;
}

export function Headline({
  children,
  as: Component = "h2",
  variant = "default",
  className,
  subtitle,
}: HeadlineProps) {
  const sizeClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl",
    h2: "text-3xl md:text-4xl lg:text-5xl",
    h3: "text-2xl md:text-3xl lg:text-4xl",
    h4: "text-xl md:text-2xl lg:text-3xl",
    h5: "text-lg md:text-xl lg:text-2xl",
    h6: "text-base md:text-lg lg:text-xl",
  };

  const variantClasses = {
    default: "text-foreground",
    gradient: "gradient-text",
    electric: "text-electric-blue",
  };

  return (
    <div className="space-y-4">
      <Component
        className={cn(
          "font-heading font-bold tracking-tight",
          sizeClasses[Component],
          variantClasses[variant],
          className
        )}
      >
        {children}
      </Component>
      {subtitle && (
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0"
          style={{ display: "block", width: "100%", whiteSpace: "normal", wordBreak: "normal" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
