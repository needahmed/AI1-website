"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/animation/use-isomorphic-layout-effect";

/**
 * useGSAPTimeline Hook
 * 
 * A custom hook for creating GSAP timeline animations with SSR safety.
 * Provides a timeline instance for complex, sequenced animations.
 * 
 * Features:
 * - SSR-safe dynamic imports
 * - Automatic timeline cleanup
 * - TypeScript support
 * - Flexible timeline configuration
 * - Chainable animations
 * 
 * Usage:
 * ```tsx
 * const containerRef = useGSAPTimeline<HTMLDivElement>((element, gsap, tl) => {
 *   tl.from(".item-1", { opacity: 0, y: 50, duration: 0.5 })
 *     .from(".item-2", { opacity: 0, y: 50, duration: 0.5 }, "-=0.3")
 *     .from(".item-3", { opacity: 0, y: 50, duration: 0.5 }, "-=0.3");
 * }, { paused: false });
 * 
 * return (
 *   <div ref={containerRef}>
 *     <div className="item-1">Item 1</div>
 *     <div className="item-2">Item 2</div>
 *     <div className="item-3">Item 3</div>
 *   </div>
 * );
 * ```
 * 
 * @param timelineCallback - Callback function that receives the element, gsap, and timeline
 * @param timelineConfig - Optional timeline configuration
 * @param dependencies - Optional dependency array for re-running the animation
 * @returns Ref to attach to the container element
 */

type TimelineCallback<T extends HTMLElement> = (
  element: T,
  gsap: typeof import("gsap").gsap,
  timeline: import("gsap").core.Timeline
) => void | (() => void);

interface TimelineConfig {
  paused?: boolean;
  repeat?: number;
  repeatDelay?: number;
  yoyo?: boolean;
  delay?: number;
  defaults?: {
    duration?: number;
    ease?: string;
  };
}

export function useGSAPTimeline<T extends HTMLElement = HTMLDivElement>(
  timelineCallback: TimelineCallback<T>,
  timelineConfig?: TimelineConfig,
  dependencies: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const timelineRef = useRef<import("gsap").core.Timeline | null>(null);
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    let isSubscribed = true;

    // Dynamic import of GSAP
    import("gsap").then(({ gsap }) => {
      if (!isSubscribed || !elementRef.current) return;

      // Create timeline
      const tl = gsap.timeline(timelineConfig);
      timelineRef.current = tl;

      // Execute timeline callback
      cleanupRef.current = timelineCallback(elementRef.current, gsap, tl);
    });

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, dependencies);

  return elementRef;
}

/**
 * useGSAPStagger Hook
 * 
 * A specialized hook for creating stagger animations with GSAP.
 * 
 * Usage:
 * ```tsx
 * const containerRef = useGSAPStagger<HTMLDivElement>({
 *   selector: ".card",
 *   from: { opacity: 0, y: 50 },
 *   to: { opacity: 1, y: 0 },
 *   stagger: 0.1,
 *   duration: 0.6,
 * });
 * 
 * return (
 *   <div ref={containerRef}>
 *     <div className="card">Card 1</div>
 *     <div className="card">Card 2</div>
 *     <div className="card">Card 3</div>
 *   </div>
 * );
 * ```
 */
interface StaggerConfig {
  selector: string;
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  stagger?: number | gsap.StaggerVars;
  duration?: number;
  scrollTrigger?: {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  };
}

export function useGSAPStagger<T extends HTMLElement = HTMLDivElement>(
  config: StaggerConfig,
  dependencies: React.DependencyList = []
) {
  const containerRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    let isSubscribed = true;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!isSubscribed || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const elements = containerRef.current.querySelectorAll(config.selector);

      if (config.from) {
        gsap.from(elements, {
          ...config.from,
          duration: config.duration,
          stagger: config.stagger,
          scrollTrigger: config.scrollTrigger
            ? {
                trigger: config.scrollTrigger.trigger || containerRef.current,
                start: config.scrollTrigger.start || "top 80%",
                end: config.scrollTrigger.end || "bottom 20%",
                scrub: config.scrollTrigger.scrub,
                markers: config.scrollTrigger.markers,
              }
            : undefined,
        });
      } else {
        gsap.to(elements, {
          ...config.to,
          duration: config.duration,
          stagger: config.stagger,
          scrollTrigger: config.scrollTrigger
            ? {
                trigger: config.scrollTrigger.trigger || containerRef.current,
                start: config.scrollTrigger.start || "top 80%",
                end: config.scrollTrigger.end || "bottom 20%",
                scrub: config.scrollTrigger.scrub,
                markers: config.scrollTrigger.markers,
              }
            : undefined,
        });
      }
    });

    return () => {
      isSubscribed = false;
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === containerRef.current || 
              containerRef.current?.contains(trigger.trigger as Node)) {
            trigger.kill();
          }
        });
      });
    };
  }, dependencies);

  return containerRef;
}
