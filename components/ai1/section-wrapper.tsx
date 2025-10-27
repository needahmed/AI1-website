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
    gradient:
      "gradient-ai1 text-white [--foreground:#F8FAFF] [--muted-foreground:rgba(255,255,255,0.78)] [--card:rgba(15,23,42,0.55)] [--card-foreground:#F8FAFF] [--border:rgba(255,255,255,0.2)] [--input:rgba(255,255,255,0.25)] [--ring:rgba(180,198,255,0.45)]",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-16 px-6 md:px-10 lg:px-16",
        variantClasses[variant],
        className
      )}
    >
      <div className="w-full max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
