"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Milestone } from "@/lib/data/about-data";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
      role="list"
      aria-label="Company timeline"
    >
      {/* Timeline line */}
      <div className="pointer-events-none absolute left-8 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-brand-electric via-brand-cyan to-brand-purple md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            variants={itemVariants}
            className={`relative flex items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            role="listitem"
          >
            {/* Year Badge */}
            <div
              className="absolute left-0 md:left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-electric to-brand-cyan shadow-lg shadow-brand-electric/50 ring-4 ring-background md:-translate-x-1/2"
            >
              <span className="text-sm font-bold text-white">
                {milestone.year}
              </span>
            </div>

            {/* Content Card */}
            <div className="ml-24 w-full md:ml-0 md:w-[calc(50%-4rem)]">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { scale: 1.03, transition: { duration: 0.2 } }
                }
              >
                <Card className="glass-card hover:shadow-ai1-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
