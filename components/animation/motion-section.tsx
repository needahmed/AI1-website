"use client";

import { ReactNode, forwardRef } from "react";
import { motion, MotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MotionSection Component
 * 
 * A reusable wrapper component for scroll-driven animations using Framer Motion.
 * Provides common animation presets and stagger support for children.
 * 
 * Features:
 * - Pre-built animation variants (fade, slide, scale, rotate)
 * - Intersection observer integration
 * - Stagger animation support
 * - Customizable animation timing
 * - TypeScript support with full props typing
 * 
 * Usage:
 * ```tsx
 * <MotionSection variant="fade" stagger={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </MotionSection>
 * ```
 */

export type AnimationVariant = "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "rotate" | "none";

interface MotionSectionProps extends Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const animationVariants: Record<AnimationVariant, Variants> = {
  none: {
    hidden: {},
    visible: {},
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.95 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

/**
 * MotionSection - Animated section with intersection observer
 */
export const MotionSection = forwardRef<HTMLDivElement, MotionSectionProps>(
  (
    {
      children,
      variant = "fade",
      className,
      stagger = 0,
      duration = 0.6,
      delay = 0,
      once = true,
      amount = 0.3,
      ...props
    },
    ref
  ) => {
    const variants = animationVariants[variant];

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
          staggerChildren: stagger,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionSection.displayName = "MotionSection";

/**
 * MotionItem - Child item for stagger animations
 * Use inside MotionSection for staggered animations
 */
export const MotionItem = forwardRef<HTMLDivElement, Omit<MotionProps, "variants"> & { className?: string; children: ReactNode }>(
  ({ children, className, ...props }, ref) => {
    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={itemVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionItem.displayName = "MotionItem";
