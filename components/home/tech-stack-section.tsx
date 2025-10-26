"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "GraphQL", icon: "◼️" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Prisma", icon: "🔷" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Redis", icon: "🔴" },
];

export function TechStackSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!marqueeRef.current) return;

      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
        }
      );
    };

    setupAnimation();
  }, []);

  return (
    <section
      ref={marqueeRef}
      className="py-16 bg-gradient-to-r from-deep-blue via-electric-blue to-purple relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Powered by Cutting-Edge Technology
          </h2>
          <p className="text-white/80 text-lg">
            We leverage the best tools to deliver exceptional results
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="flex overflow-hidden mb-6">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the array to create seamless loop */}
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 min-w-fit"
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="text-white font-medium text-lg">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [-1920, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the array to create seamless loop */}
            {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map(
              (tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 min-w-fit"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="text-white font-medium text-lg">
                    {tech.name}
                  </span>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
