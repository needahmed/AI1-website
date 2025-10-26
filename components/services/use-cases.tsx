"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionSection, MotionItem } from "@/components/animation";
import { Check } from "lucide-react";
import type { UseCase } from "@/lib/data/services";

interface UseCasesProps {
  useCases: UseCase[];
}

export function UseCases({ useCases }: UseCasesProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Use Cases & <span className="gradient-text">Applications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our solutions can transform your business
          </p>
        </div>

        <MotionSection variant="fade" stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {useCases.map((useCase, index) => (
              <MotionItem key={index}>
                <Card className="h-full border-2 hover:border-electric-blue/50 transition-all duration-300 hover:shadow-ai1-lg glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">
                      {useCase.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {useCase.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-electric-blue mb-3">
                        Key Benefits:
                      </p>
                      {useCase.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
