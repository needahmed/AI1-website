import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CTABannerProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  variant?: "default" | "gradient" | "glass";
  className?: string;
  children?: ReactNode;
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "gradient",
  className,
  children,
}: CTABannerProps) {
  const variantClasses = {
    default: "bg-card border border-border",
    gradient: "gradient-ai1 text-white",
    glass: "glass-card dark:glass-dark",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-8 md:p-12 text-center space-y-6",
        variantClasses[variant],
        className
      )}
    >
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-lg md:text-xl max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-0",
              variant === "gradient" ? "text-white/90" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {children}

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryAction && (
            <Button
              size="lg"
              variant={variant === "gradient" ? "secondary" : "default"}
              onClick={primaryAction.onClick}
              asChild={!!primaryAction.href}
              className="shadow-ai1-lg hover:scale-105 transition-transform"
            >
              {primaryAction.href ? (
                <a href={primaryAction.href}>{primaryAction.label}</a>
              ) : (
                primaryAction.label
              )}
            </Button>
          )}
          {secondaryAction && (
            <Button
              size="lg"
              variant="outline"
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
              className={cn(
                "hover:scale-105 transition-transform",
                variant === "gradient" && "border-white/30 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              {secondaryAction.href ? (
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              ) : (
                secondaryAction.label
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
