"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc",
    content:
      "AI1 transformed our business completely. Their team delivered a cutting-edge solution that exceeded all expectations. The 6-hour turnaround time is not just marketing—it's real.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    content:
      "Working with AI1 was an absolute pleasure. Their expertise in AI and machine learning helped us implement features we thought were years away. Highly recommended!",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateCo",
    content:
      "The attention to detail and quality of work from AI1 is unmatched. They didn't just build what we asked for—they improved upon it with innovative solutions.",
    rating: 5,
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Founder",
    company: "GrowthLabs",
    content:
      "AI1's team is incredibly responsive and professional. They delivered a complex e-commerce platform ahead of schedule and it's been performing flawlessly.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.5, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            end: "top center-=100",
            scrub: 1,
          },
        }
      );
    };

    setupAnimation();
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden w-full max-w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the businesses we've
            helped transform.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-3 w-3 rounded-full" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                className="relative min-h-[400px] flex items-center"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute w-full"
                  >
                    <Card className="glass-card border-2 border-border hover:border-electric-blue/50 transition-colors">
                      <CardContent className="p-8 md:p-12">
                        <Quote className="w-12 h-12 text-electric-blue mb-6" />
                        
                        <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                          "{testimonials[currentIndex].content}"
                        </p>

                        <div className="flex items-center gap-2 mb-6">
                          {Array.from({ length: testimonials[currentIndex].rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>

                        <div>
                          <div className="font-heading font-bold text-xl mb-1">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-muted-foreground">
                            {testimonials[currentIndex].role} at{" "}
                            {testimonials[currentIndex].company}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 -translate-x-1/2 z-10 rounded-full w-12 h-12 bg-background shadow-lg"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 translate-x-1/2 z-10 rounded-full w-12 h-12 bg-background shadow-lg"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-electric-blue"
                        : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
