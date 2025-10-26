"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Smartphone,
  Globe,
  Database,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Custom AI solutions that learn, adapt, and deliver intelligent insights for your business.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "High-performance web applications built with cutting-edge technologies and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that users love and businesses rely on.",
  },
  {
    icon: Database,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and serverless architectures for modern applications.",
  },
  {
    icon: Zap,
    title: "API Development",
    description:
      "Robust, secure APIs that power seamless integrations and data flow.",
  },
  {
    icon: Rocket,
    title: "Digital Transformation",
    description:
      "End-to-end digital transformation strategies that modernize your business operations.",
  },
];

export function ServicesSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const setupAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            rotateY: -15,
            opacity: 0.5,
            scale: 0.95,
          },
          {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              scrub: 1,
            },
          }
        );

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    };

    setupAnimations();
  }, []);

  return (
    <section className="py-24 bg-background w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Services</span> That Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions designed to meet your business needs, from
            conception to deployment and beyond.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                style={{ perspective: "1000px" }}
              >
                <Card className="h-full border-2 hover:border-electric-blue/50 transition-all duration-300 bg-card hover:shadow-ai1-lg">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
