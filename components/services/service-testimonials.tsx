"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MotionSection, MotionItem } from "@/components/animation";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/services";

interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
}

export function ServiceTestimonials({
  testimonials,
}: ServiceTestimonialsProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <MotionSection variant="slideUp" stagger={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <MotionItem key={index}>
                <Card className="h-full border-2 hover:border-purple/50 transition-all duration-300 glass-card hover:shadow-purple">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-purple mb-4 opacity-50" />
                    <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
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
