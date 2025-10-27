"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const promises = [
  {
    icon: Zap,
    title: "Lightning Fast Response",
    description: "6-hour turnaround during business hours",
  },
  {
    icon: Clock,
    title: "No Waiting Games",
    description: "Direct access to decision makers",
  },
  {
    icon: CheckCircle2,
    title: "Guaranteed Follow-up",
    description: "We'll never leave you hanging",
  },
];

export function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to scale (zoom effect)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-20">
      <motion.div
        style={{
          scale: scale,
          opacity: opacity,
        }}
        className="container mx-auto px-4 md:px-8 lg:px-12"
      >
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-cyan/5 p-8 shadow-xl lg:p-12">
          {/* Animated background gradient */}
          <motion.div
            animate={{
              backgroundPosition: isInView ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent bg-[length:200%_100%]"
          />

          <div className="relative">
            {/* Main CTA Content */}
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white shadow-lg"
              >
                <Zap className="h-5 w-5" />
                <span className="text-lg font-bold">6-Hour Turnaround</span>
              </motion.div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Don't waste time with slow agencies. We respond fast because your time is valuable.
              </p>
            </div>

            {/* Promise Cards */}
            <div className="grid gap-6 sm:grid-cols-3">
              {promises.map((promise, index) => {
                const Icon = promise.icon;
                return (
                  <motion.div
                    key={promise.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="h-full bg-background/80 p-6 backdrop-blur-sm transition-all hover:shadow-lg">
                      <Icon className="mb-3 h-8 w-8 text-primary" />
                      <h3 className="mb-2 font-semibold">{promise.title}</h3>
                      <p className="text-sm text-muted-foreground">{promise.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Reduce motion alternative */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
