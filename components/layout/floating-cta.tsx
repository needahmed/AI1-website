"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400 && !isDismissed;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "relative glass-card shadow-ai1-lg rounded-2xl",
              "border-2 border-electric-blue/20",
              "overflow-hidden"
            )}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-purple/10 pointer-events-none" />
            
            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 z-10 p-1 rounded-md hover:bg-background/50 transition-colors"
              aria-label="Dismiss"
            >
              <X className="size-3 text-muted-foreground" />
            </button>

            <div className="relative p-4 pr-8 space-y-3">
              <div className="flex items-start space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-electric-blue to-purple"
                >
                  <Sparkles className="size-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-heading font-bold text-sm mb-1">
                    Start Your Project
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Get expert consultation within 6 hours
                  </p>
                </div>
              </div>

              <Link href="/contact" className="block">
                <Button
                  size="sm"
                  className="w-full gradient-electric border-0 font-semibold group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Get Started Now →
                  </span>
                </Button>
              </Link>

              {/* Trust Indicator */}
              <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border/50">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="size-6 rounded-full bg-gradient-to-br from-electric-blue to-purple border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Trusted by 500+ clients
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
