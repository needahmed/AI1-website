"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Twitter, Quote } from "lucide-react";
import { Leader } from "@/lib/data/about-data";
import { Card, CardContent } from "@/components/ui/card";

interface LeadershipSpotlightProps {
  leader: Leader;
}

export function LeadershipSpotlight({ leader }: LeadershipSpotlightProps) {
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

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      x: shouldReduceMotion ? 0 : -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
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
    >
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Image Section */}
            <motion.div variants={imageVariants} className="relative">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-electric/20 via-brand-cyan/20 to-brand-purple/20 shadow-2xl">
                <div className="flex h-full items-center justify-center text-8xl font-bold text-brand-electric">
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {/* Placeholder for actual image */}
                {/* <Image 
                  src={leader.image} 
                  alt={leader.name}
                  fill
                  className="object-cover"
                /> */}

                {/* Decorative Elements */}
                <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-brand-electric/30 blur-3xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-brand-purple/30 blur-3xl" />
              </div>

              {/* Social Links */}
              {(leader.linkedIn || leader.twitter) && (
                <div className="mt-6 flex justify-center gap-4">
                  {leader.linkedIn && (
                    <a
                      href={leader.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-electric to-brand-cyan shadow-lg transition-transform hover:scale-110"
                      aria-label={`${leader.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-6 w-6 text-white" />
                    </a>
                  )}
                  {leader.twitter && (
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-teal shadow-lg transition-transform hover:scale-110"
                      aria-label={`${leader.name}'s Twitter profile`}
                    >
                      <Twitter className="h-6 w-6 text-white" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Content Section */}
            <motion.div variants={contentVariants} className="space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-4xl font-bold text-foreground md:text-5xl">
                  {leader.name}
                </h3>
                <p className="mt-2 text-2xl font-semibold text-brand-electric">
                  {leader.title}
                </p>
              </div>

              {/* Bio */}
              <p className="text-lg leading-relaxed text-muted-foreground">
                {leader.bio}
              </p>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.4,
                }}
                className="relative rounded-2xl bg-gradient-to-br from-brand-electric/10 to-brand-purple/10 p-6"
              >
                <Quote className="mb-4 h-8 w-8 text-brand-electric opacity-50" />
                <blockquote className="text-xl font-medium italic leading-relaxed text-foreground">
                  &ldquo;{leader.quote}&rdquo;
                </blockquote>
                <div className="absolute bottom-4 right-4 opacity-10">
                  <Quote className="h-16 w-16 rotate-180 text-brand-electric" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
