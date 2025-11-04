"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";

export function ClosingCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0.7,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
            end: "center center",
            scrub: 1,
          },
        }
      );
    };

    setupAnimation();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-deep-blue via-electric-blue to-purple dark:from-deep-blue dark:via-electric-blue dark:to-purple relative overflow-hidden w-full max-w-full"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-light/40 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                Ready to Build
                <br />
                Something <span className="text-cyan">Extraordinary</span>?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0 mb-12 leading-relaxed">
                Let's transform your vision into reality. Get started with a free
                consultation and see why leading companies choose AI1.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Button
                size="lg"
                className="bg-white text-deep-blue hover:bg-white/90 shadow-ai1-lg text-lg px-10 py-7 group min-w-[240px]"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm text-lg px-10 py-7 min-w-[240px]"
              >
                Schedule a Call
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/70 text-sm"
            >
              No credit card required • Free consultation • 6-hour response time
            </motion.p>
          </div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="glass-card p-6 rounded-xl border border-white/20 dark:border-white/20 text-center">
              <div className="w-12 h-12 rounded-full bg-electric-blue/20 dark:bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-electric-blue dark:text-white" />
              </div>
              <h3 className="text-foreground dark:text-white font-heading font-bold mb-2">
                Email Us
              </h3>
              <p className="text-muted-foreground dark:text-white/80 text-sm mb-3">
                Get a response within 6 hours
              </p>
              <a
                href="mailto:hello@ai1.com"
                className="text-cyan hover:text-cyan/80 transition-colors text-sm font-medium"
              >
                hello@ai1.com
              </a>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/20 dark:border-white/20 text-center">
              <div className="w-12 h-12 rounded-full bg-electric-blue/20 dark:bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-electric-blue dark:text-white" />
              </div>
              <h3 className="text-foreground dark:text-white font-heading font-bold mb-2">
                Call Us
              </h3>
              <p className="text-muted-foreground dark:text-white/80 text-sm mb-3">
                Speak with our team directly
              </p>
              <a
                href="tel:+1234567890"
                className="text-cyan hover:text-cyan/80 transition-colors text-sm font-medium"
              >
                +1 (234) 567-890
              </a>
            </div>

            <div className="glass-card p-6 rounded-xl border border-white/20 dark:border-white/20 text-center">
              <div className="w-12 h-12 rounded-full bg-electric-blue/20 dark:bg-white/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-electric-blue dark:text-white" />
              </div>
              <h3 className="text-foreground dark:text-white font-heading font-bold mb-2">
                Live Chat
              </h3>
              <p className="text-muted-foreground dark:text-white/80 text-sm mb-3">
                Chat with us in real-time
              </p>
              <button className="text-cyan hover:text-cyan/80 transition-colors text-sm font-medium">
                Start Chat
              </button>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="glass-card p-8 rounded-2xl border border-white/20 dark:border-white/20 w-full">
              <h3 className="text-2xl font-heading font-bold text-foreground dark:text-white mb-2 text-center">
                Stay Updated
              </h3>
              <p className="text-muted-foreground dark:text-white/80 text-center mb-6">
                Get the latest insights on AI, development, and digital
                transformation
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-muted/50 dark:bg-white/10 border-border dark:border-white/20 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 focus:border-primary dark:focus:border-white/40 w-full"
                />
                <Button className="bg-white text-deep-blue hover:bg-white/90 dark:bg-white dark:text-deep-blue dark:hover:bg-white/90 px-8 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-muted-foreground/80 dark:text-white/60 text-xs text-center mt-4">
                Join 10,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
