"use client";

import { useEffect, useRef } from "react";
import type { Technology } from "@/lib/data/services";

interface TechnologiesGridProps {
  technologies: Technology[];
}

export function TechnologiesGrid({ technologies }: TechnologiesGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

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
        if (gridRef.current) {
          const items = gridRef.current.querySelectorAll(".tech-item");
          items.forEach((item) => {
            gsap.set(item, { opacity: 1, scale: 1, rotateY: 0 });
          });
        }
        return;
      }

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".tech-item");

        gsap.fromTo(
          items,
          {
            opacity: 0,
            scale: 0.8,
            rotateY: -15,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );

        // Hover animations
        items.forEach((item) => {
          const element = item as HTMLElement;
          
          element.addEventListener("mouseenter", () => {
            gsap.to(element, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(element, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    };

    setupAnimations();
  }, [technologies.length]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            <span className="gradient-text">Technologies</span> We Use
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by industry-leading tools and frameworks
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            
            return (
              <div
                key={index}
                className="tech-item glass-card p-6 rounded-xl border border-electric-blue/20 flex flex-col items-center justify-center text-center hover:border-electric-blue/50 transition-all duration-300 hover:shadow-ai1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">
                  {tech.name}
                </h3>
                <p className="text-sm text-muted-foreground">{tech.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
