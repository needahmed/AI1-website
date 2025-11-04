"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const clients = [
  { name: "TechStart Inc", logo: "🚀" },
  { name: "DataFlow Systems", logo: "📊" },
  { name: "InnovateCo", logo: "💡" },
  { name: "GrowthLabs", logo: "📈" },
  { name: "CloudScale", logo: "☁️" },
  { name: "AI Dynamics", logo: "🤖" },
  { name: "FinTech Pro", logo: "💰" },
  { name: "HealthTech", logo: "🏥" },
  { name: "EduStream", logo: "🎓" },
  { name: "RetailNext", logo: "🛍️" },
  { name: "LogiTrack", logo: "📦" },
  { name: "MediaHub", logo: "🎬" },
];

export function ClientLogosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const logos = sectionRef.current.querySelectorAll(".client-logo");
      
      gsap.fromTo(
        logos,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 30 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100",
            end: "center center",
            scrub: 1,
          },
        }
      );
    };

    setupAnimation();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Trusted by <span className="gradient-text">Global Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-0">
            Join 50+ companies worldwide who trust AI1 to power their digital
            transformation
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="client-logo group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="glass-card p-6 rounded-xl border-2 border-border hover:border-electric-blue/50 transition-all duration-300 flex flex-col items-center justify-center h-32 cursor-pointer">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {client.logo}
                </div>
                <div className="text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {client.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
              50+
            </div>
            <div className="text-sm text-muted-foreground">Global Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
              30+
            </div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
              500+
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
              98%
            </div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
