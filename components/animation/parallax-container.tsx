"use client";

import { ReactNode, forwardRef } from "react";
import { Parallax, ParallaxProvider, useParallax } from "react-scroll-parallax";
import { cn } from "@/lib/utils";

/**
 * ParallaxContainer Component
 * 
 * A wrapper component for creating parallax scroll effects using react-scroll-parallax.
 * Provides easy-to-use parallax animations with customizable speed and direction.
 * 
 * Features:
 * - Parallax scrolling effects
 * - Multiple speed presets (slow, medium, fast)
 * - Custom speed configuration
 * - Horizontal and vertical parallax
 * - TypeScript support
 * 
 * Usage:
 * ```tsx
 * <ParallaxContainer speed="medium">
 *   <img src="/image.jpg" alt="Parallax image" />
 * </ParallaxContainer>
 * ```
 * 
 * Or with custom speed:
 * ```tsx
 * <ParallaxContainer speed={{ y: [-20, 20], x: [10, -10] }}>
 *   <div>Custom parallax content</div>
 * </ParallaxContainer>
 * ```
 */

type SpeedPreset = "slow" | "medium" | "fast";
type CustomSpeed = {
  y?: [number, number];
  x?: [number, number];
};

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  speed?: SpeedPreset | CustomSpeed;
  disabled?: boolean;
}

const speedPresets: Record<SpeedPreset, CustomSpeed> = {
  slow: { y: [-10, 10] },
  medium: { y: [-20, 20] },
  fast: { y: [-40, 40] },
};

function getSpeedConfig(speed: SpeedPreset | CustomSpeed): CustomSpeed {
  if (typeof speed === "string") {
    return speedPresets[speed];
  }
  return speed;
}

/**
 * ParallaxWrapper - Provider wrapper for parallax effects
 * Must wrap all ParallaxContainer components
 */
export function ParallaxWrapper({ children }: { children: ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}

/**
 * ParallaxContainer - Individual parallax element
 */
export const ParallaxContainer = forwardRef<HTMLDivElement, ParallaxContainerProps>(
  ({ children, className, speed = "medium", disabled = false }, ref) => {
    if (disabled) {
      return <div className={cn(className)}>{children}</div>;
    }

    const speedConfig = getSpeedConfig(speed);

    return (
      <Parallax translateY={speedConfig.y} translateX={speedConfig.x}>
        <div ref={ref} className={cn(className)}>
          {children}
        </div>
      </Parallax>
    );
  }
);

ParallaxContainer.displayName = "ParallaxContainer";

/**
 * useParallaxEffect Hook
 * 
 * Hook for accessing parallax controller and creating custom parallax effects.
 * 
 * Usage:
 * ```tsx
 * const parallax = useParallaxEffect({
 *   speed: 20,
 *   rotate: [0, 360],
 * });
 * 
 * return <div ref={parallax.ref}>Content</div>;
 * ```
 */
export function useParallaxEffect(config: {
  speed?: number;
  rotate?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
}) {
  const parallax = useParallax<HTMLDivElement>({
    speed: config.speed,
    rotate: config.rotate,
    scale: config.scale,
    opacity: config.opacity,
  });

  return parallax;
}

/**
 * ParallaxLayer Component
 * 
 * A specialized parallax component for layered parallax effects.
 * Useful for creating depth in hero sections and complex layouts.
 * 
 * Usage:
 * ```tsx
 * <ParallaxLayer depth={1}>
 *   <img src="/background.jpg" alt="Background" />
 * </ParallaxLayer>
 * <ParallaxLayer depth={2}>
 *   <img src="/midground.jpg" alt="Midground" />
 * </ParallaxLayer>
 * <ParallaxLayer depth={3}>
 *   <img src="/foreground.jpg" alt="Foreground" />
 * </ParallaxLayer>
 * ```
 */
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  depth?: 1 | 2 | 3 | 4 | 5;
}

const depthSpeeds: Record<number, [number, number]> = {
  1: [-5, 5],
  2: [-15, 15],
  3: [-25, 25],
  4: [-35, 35],
  5: [-45, 45],
};

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({ children, className, depth = 2 }, ref) => {
    const [startY, endY] = depthSpeeds[depth];

    return (
      <Parallax translateY={[startY, endY]}>
        <div ref={ref} className={cn(className)}>
          {children}
        </div>
      </Parallax>
    );
  }
);

ParallaxLayer.displayName = "ParallaxLayer";
