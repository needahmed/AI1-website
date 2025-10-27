"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Zap } from "lucide-react";

export function TurnaroundCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !contentRef.current) return;

      // Dramatic zoom effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      tl.fromTo(
        contentRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
        }
      );

      // Pulsing animation for the clock icon
      gsap.to(".pulse-icon", {
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    setupAnimation();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-deep-blue via-electric-blue to-purple w-full max-w-full"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-light/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="pulse-icon w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              6-Hour
              <br />
              <span className="text-cyan">Turnaround Time</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed"
          >
            Need it fast? We deliver production-ready solutions in record time
            without compromising quality.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
          >
            From concept to deployment, our agile team works around the clock to
            bring your vision to life. When you need speed without sacrifice,
            we're here.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="glass p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-heading font-bold text-white mb-2">
                6
              </div>
              <div className="text-white/80">Hours Average</div>
            </div>
            <div className="glass p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-heading font-bold text-white mb-2">
                100%
              </div>
              <div className="text-white/80">On-Time Delivery</div>
            </div>
            <div className="glass p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-heading font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-white/80">Support Available</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-white text-deep-blue hover:bg-white/90 shadow-ai1-lg text-lg px-10 py-6 group"
            >
              Start Your Rush Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-lg px-10 py-6"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/70 mt-8 text-sm"
          >
            ⚡ Over 200 rush projects delivered on time
          </motion.p>
        </div>
      </div>
    </section>
  );
}
