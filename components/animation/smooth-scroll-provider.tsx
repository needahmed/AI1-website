"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useIsomorphicLayoutEffect } from "@/lib/animation/use-isomorphic-layout-effect";

/**
 * SmoothScrollProvider
 * 
 * Provides smooth scrolling using Lenis library with GSAP ScrollTrigger integration.
 * 
 * Features:
 * - Smooth momentum-based scrolling
 * - Automatically syncs with GSAP ScrollTrigger
 * - SSR-safe implementation
 * - Proper cleanup on unmount
 * 
 * Usage:
 * Wrap your app layout or specific sections with this provider:
 * 
 * ```tsx
 * <SmoothScrollProvider>
 *   <YourContent />
 * </SmoothScrollProvider>
 * ```
 * 
 * @param children - React children to be wrapped
 * @param options - Optional Lenis configuration options
 */

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
  };
}

export function SmoothScrollProvider({
  children,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      ...options,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    const syncScrollTrigger = () => {
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    };

    lenis.on("scroll", syncScrollTrigger);

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, [options]);

  return <>{children}</>;
}

/**
 * Type augmentation for GSAP ScrollTrigger on window object
 */
declare global {
  interface Window {
    ScrollTrigger?: {
      update: () => void;
      refresh: () => void;
      getAll: () => unknown[];
    };
  }
}
