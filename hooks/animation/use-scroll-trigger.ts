"use client";

import { useRef, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/animation/use-isomorphic-layout-effect";

/**
 * useScrollTrigger Hook
 * 
 * A custom hook for creating GSAP ScrollTrigger animations with SSR safety.
 * Dynamically imports GSAP and ScrollTrigger to ensure client-side only execution.
 * 
 * Features:
 * - SSR-safe dynamic imports
 * - Automatic cleanup
 * - TypeScript support
 * - Flexible animation configuration
 * 
 * Usage:
 * ```tsx
 * const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
 *   gsap.from(element, {
 *     opacity: 0,
 *     y: 50,
 *     scrollTrigger: {
 *       trigger: element,
 *       start: "top 80%",
 *       end: "top 50%",
 *       scrub: true,
 *     }
 *   });
 * });
 * 
 * return <div ref={ref}>Animated content</div>;
 * ```
 * 
 * @param animationCallback - Callback function that receives the element, gsap, and ScrollTrigger
 * @param dependencies - Optional dependency array for re-running the animation
 * @returns Ref to attach to the element you want to animate
 */

type AnimationCallback<T extends HTMLElement> = (
  element: T,
  gsap: typeof import("gsap").gsap,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
) => void | (() => void);

export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animationCallback: AnimationCallback<T>,
  dependencies: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    let isSubscribed = true;

    // Dynamic import of GSAP and ScrollTrigger
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!isSubscribed || !elementRef.current) return;

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Execute animation callback
      cleanupRef.current = animationCallback(
        elementRef.current,
        gsap,
        ScrollTrigger
      );
    });

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      
      // Import ScrollTrigger to kill instances
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      });
    };
  }, dependencies);

  return elementRef;
}
