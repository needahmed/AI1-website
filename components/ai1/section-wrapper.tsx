import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  variant = "default",
  id,
}: SectionWrapperProps) {
  const variantClasses = {
    default: "",
    glass: "glass-card dark:glass-dark",
    gradient: "gradient-ai1 text-white",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-16 px-4 md:px-8 lg:px-12",
        variantClasses[variant],
        className
      )}
    >
      <div className="container mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
