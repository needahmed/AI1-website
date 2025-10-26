"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic GSAP import for SSR safety
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!heroRef.current || !contentRef.current) return;

      // Zoom effect on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(heroRef.current, {
        scale: 1.2,
        opacity: 0.5,
        ease: "power2.inOut",
      });

      tl.to(
        contentRef.current,
        {
          y: -100,
          opacity: 0,
          ease: "power2.inOut",
        },
        0
      );
    };

    setupAnimation();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-blue via-electric-blue to-purple"
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-white">
              Transforming Ideas into Intelligence
            </span>
          </div>
        </motion.div>

        {/* Dual AI Meaning Headline */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight">
            Where{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan via-purple-light to-cyan animate-gradient">
                AI
              </span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-sans text-cyan/80 whitespace-nowrap">
                Artificial Intelligence
              </span>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-sans text-purple-light/80 whitespace-nowrap">
                Authentic Innovation
              </span>
            </span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white/90 leading-tight">
            Meets Reality
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We don't just build software—we craft intelligent solutions that
          transform businesses, elevate user experiences, and drive measurable
          results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-white text-deep-blue hover:bg-white/90 shadow-ai1-lg text-lg px-8 py-6 group"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
          >
            View Our Work
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "50+", label: "Global Clients" },
            { value: "6hrs", label: "Turnaround" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
