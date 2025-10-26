"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";
import { TeamMember } from "@/lib/data/about-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TeamCarouselProps {
  members: TeamMember[];
  autoPlayInterval?: number;
}

export function TeamCarousel({
  members,
  autoPlayInterval = 5000,
}: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const slideVariants = {
    enter: (direction: number) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: shouldReduceMotion ? 0 : direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + members.length) % members.length
    );
  }, [members.length]);

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && !shouldReduceMotion) {
      const interval = setInterval(() => {
        paginate(1);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, shouldReduceMotion, autoPlayInterval, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        paginate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const currentMember = members[currentIndex];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Team member carousel"
      aria-roledescription="carousel"
    >
      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: shouldReduceMotion ? 0 : 0.3 },
              scale: { duration: shouldReduceMotion ? 0 : 0.4 },
            }}
            drag={!shouldReduceMotion ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentIndex + 1} of ${members.length}`}
          >
            <Card className="glass-card mx-auto w-full max-w-4xl">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  {/* Image */}
                  <div className="relative">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand-electric/20 to-brand-purple/20">
                      <div className="flex h-full items-center justify-center text-6xl font-bold text-brand-electric">
                        {currentMember.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {/* Placeholder for actual image */}
                      {/* <Image 
                        src={currentMember.image} 
                        alt={currentMember.name}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                    {/* Social Links */}
                    {(currentMember.linkedIn || currentMember.twitter) && (
                      <div className="mt-4 flex justify-center gap-3">
                        {currentMember.linkedIn && (
                          <a
                            href={currentMember.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-brand-electric/10 p-2 transition-colors hover:bg-brand-electric/20"
                            aria-label={`${currentMember.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5 text-brand-electric" />
                          </a>
                        )}
                        {currentMember.twitter && (
                          <a
                            href={currentMember.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-brand-cyan/10 p-2 transition-colors hover:bg-brand-cyan/20"
                            aria-label={`${currentMember.name}'s Twitter profile`}
                          >
                            <Twitter className="h-5 w-5 text-brand-cyan" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">
                        {currentMember.name}
                      </h3>
                      <p className="mt-1 text-xl font-semibold text-brand-electric">
                        {currentMember.role}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {currentMember.expertise}
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {currentMember.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          aria-label="Previous team member"
          className="h-12 w-12 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Choose team member"
        >
          {members.map((member, index) => (
            <button
              key={member.id}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-brand-electric"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to ${member.name}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          aria-label="Next team member"
          className="h-12 w-12 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {currentMember.name}, {currentMember.role}. Slide {currentIndex + 1} of {members.length}.
      </div>
    </div>
  );
}
