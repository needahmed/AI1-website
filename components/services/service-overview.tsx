"use client";

import { MotionSection } from "@/components/animation";
import { Check } from "lucide-react";

interface ServiceOverviewProps {
  title: string;
  description: string;
  highlights: string[];
}

export function ServiceOverview({
  title,
  description,
  highlights,
}: ServiceOverviewProps) {
  return (
    <section id="overview" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <MotionSection variant="slideUp" className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            {description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-foreground font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
