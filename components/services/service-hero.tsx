"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export function ServiceHero({ title, subtitle, ctaText }: ServiceHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Hero zoom effect
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Content fade and slide
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
      }
    };

    setupAnimations();
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-deep-blue via-electric-blue to-purple">
      {/* Background with zoom effect */}
      <div
        ref={heroRef}
        className="absolute inset-0 bg-gradient-to-br from-deep-blue/90 via-electric-blue/80 to-purple/90"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-center">
        <div ref={contentRef} className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-deep-blue hover:bg-white/90 font-semibold text-lg px-8"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#overview">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
