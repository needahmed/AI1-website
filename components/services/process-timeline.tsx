"use client";

import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import type { ProcessStep } from "@/lib/data/services";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const setupAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Just show content without animations
        stepsRef.current.forEach((step) => {
          if (step) {
            gsap.set(step, { opacity: 1, x: 0 });
          }
        });
        return;
      }

      // Animate timeline line
      if (timelineRef.current) {
        const line = timelineRef.current.querySelector(".timeline-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
              },
            }
          );
        }
      }

      // Animate steps
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const isEven = index % 2 === 0;
        
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: isEven ? -50 : 50,
            rotateY: isEven ? -10 : 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    };

    setupAnimations();
  }, [steps.length]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that delivers exceptional results, step by step
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-purple to-cyan hidden md:block -translate-x-1/2">
            <div
              className="timeline-line w-full h-full bg-gradient-to-b from-electric-blue via-purple to-cyan origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    stepsRef.current[index] = el;
                  }}
                  className={`flex items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ perspective: "1000px" }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="inline-block glass-card p-6 rounded-2xl border border-electric-blue/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <h3 className="text-2xl font-heading font-bold">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-electric-blue">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-electric-blue to-purple shadow-lg shadow-electric-blue/50" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
