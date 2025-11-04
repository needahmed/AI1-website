"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function ContactHero() {
  return (
    <div className="relative overflow-hidden py-20 lg:py-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <Zap className="h-4 w-4" />
            6-Hour Response Guarantee
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Let's Build Something{" "}
            <span className="gradient-text">Amazing</span> Together
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl text-lg text-muted-foreground sm:text-xl px-2 sm:px-0"
          >
            Have a project in mind? We're here to help. Fill out the form below or reach out
            through any of our contact channels. Our team is ready to turn your vision into
            reality.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
