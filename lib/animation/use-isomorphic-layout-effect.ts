import { useEffect, useLayoutEffect } from "react";

/**
 * useIsomorphicLayoutEffect
 * 
 * SSR-safe version of useLayoutEffect that falls back to useEffect on the server.
 * Use this for GSAP animations and other DOM measurements that need layout effects.
 * 
 * @see https://github.com/react-spring/react-spring/blob/main/packages/shared/src/hooks/useIsomorphicLayoutEffect.ts
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
