"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedStat } from "@/lib/data/about-data";

interface AnimatedStatsProps {
  stats: AnimatedStat[];
}

function AnimatedStatCard({ stat, index }: { stat: AnimatedStat; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const duration = shouldReduceMotion ? 0 : 2000;
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, stat.value, shouldReduceMotion]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.05,
              transition: { duration: 0.2 },
            }
      }
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/50 p-8 shadow-lg transition-shadow hover:shadow-ai1-lg"
      role="article"
      aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-brand-purple/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Animated Number */}
        <div className="mb-2 text-5xl font-bold md:text-6xl">
          <span className="gradient-text">
            {count}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{stat.description}</p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-brand-electric/20 blur-2xl transition-transform group-hover:translate-x-5 group-hover:-translate-y-5" />
    </motion.div>
  );
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      role="region"
      aria-label="Company statistics"
    >
      {stats.map((stat, index) => (
        <AnimatedStatCard key={stat.id} stat={stat} index={index} />
      ))}
    </motion.div>
  );
}
