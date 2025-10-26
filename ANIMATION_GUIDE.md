# Animation Tooling Guide

Complete guide for using GSAP, ScrollTrigger, Framer Motion, Lenis, and react-scroll-parallax in the AI1 Design System.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [SSR Safety](#ssr-safety)
4. [Smooth Scrolling (Lenis)](#smooth-scrolling-lenis)
5. [GSAP & ScrollTrigger](#gsap--scrolltrigger)
6. [Framer Motion](#framer-motion)
7. [Parallax Effects](#parallax-effects)
8. [Common Patterns](#common-patterns)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The animation stack provides a comprehensive set of tools for creating engaging scroll-driven animations, smooth scrolling, and parallax effects.

### Libraries Included

- **GSAP** - Industry-standard animation library with ScrollTrigger
- **Framer Motion** - React animation library with great DX
- **Lenis** - Smooth scroll library
- **react-scroll-parallax** - Parallax scrolling effects

### Key Features

- ✅ SSR-safe implementation for Next.js App Router
- ✅ Smooth scrolling with Lenis integrated globally
- ✅ GSAP ScrollTrigger synced with Lenis
- ✅ Pre-built animation hooks and components
- ✅ TypeScript support throughout
- ✅ Accessible and performant

---

## Installation

All dependencies are already installed:

```bash
npm install gsap @gsap/react lenis framer-motion react-scroll-parallax
npm install --save-dev @types/gsap
```

---

## SSR Safety

All animation utilities use **SSR-safe patterns** to work with Next.js App Router:

### useIsomorphicLayoutEffect

Use this instead of `useLayoutEffect` for DOM measurements and animations:

```tsx
import { useIsomorphicLayoutEffect } from "@/lib/animation/use-isomorphic-layout-effect";

useIsomorphicLayoutEffect(() => {
  // DOM measurements and animations
}, []);
```

### Dynamic Imports

GSAP and ScrollTrigger are dynamically imported on the client:

```tsx
// ✅ Good - Dynamic import
useEffect(() => {
  import("gsap").then(({ gsap }) => {
    // Use GSAP here
  });
}, []);

// ❌ Bad - Static import (will cause SSR errors)
import gsap from "gsap";
```

---

## Smooth Scrolling (Lenis)

### SmoothScrollProvider

Already integrated in `app/layout.tsx` for global smooth scrolling.

**Features:**
- Momentum-based smooth scrolling
- Auto-syncs with GSAP ScrollTrigger
- Configurable easing and duration

**Basic Setup** (already done):

```tsx
// app/layout.tsx
import { SmoothScrollProvider } from "@/components/animation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

**Custom Configuration:**

```tsx
<SmoothScrollProvider
  options={{
    duration: 1.5,        // Animation duration
    easing: (t) => t,     // Custom easing function
    smooth: true,         // Enable smooth scrolling
    smoothTouch: false,   // Disable on touch devices
    touchMultiplier: 2,   // Touch scroll multiplier
  }}
>
  {children}
</SmoothScrollProvider>
```

---

## GSAP & ScrollTrigger

### useScrollTrigger Hook

Create scroll-triggered GSAP animations with ease.

**Basic Example:**

```tsx
import { useScrollTrigger } from "@/hooks/animation";

function AnimatedSection() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    gsap.from(element, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  });

  return <div ref={ref}>Animated Content</div>;
}
```

**Advanced Example with Cleanup:**

```tsx
const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false, // Set to true for debugging
    },
  });

  tl.from(".item-1", { x: -100, opacity: 0 })
    .from(".item-2", { x: 100, opacity: 0 }, "-=0.3")
    .from(".item-3", { y: 50, opacity: 0 }, "-=0.2");

  // Return cleanup function
  return () => {
    tl.kill();
  };
}, [/* dependencies */]);
```

### useGSAPTimeline Hook

Create complex sequenced animations.

```tsx
import { useGSAPTimeline } from "@/hooks/animation";

function AnimatedSequence() {
  const containerRef = useGSAPTimeline<HTMLDivElement>(
    (element, gsap, tl) => {
      tl.from(".title", { opacity: 0, y: -50, duration: 0.6 })
        .from(".subtitle", { opacity: 0, y: -30, duration: 0.5 }, "-=0.3")
        .from(".button", { opacity: 0, scale: 0.8, duration: 0.4 }, "-=0.2");
    },
    {
      paused: false,
      repeat: 0,
      yoyo: false,
    }
  );

  return (
    <div ref={containerRef}>
      <h1 className="title">Title</h1>
      <p className="subtitle">Subtitle</p>
      <button className="button">Click Me</button>
    </div>
  );
}
```

### useGSAPStagger Hook

Create stagger animations easily.

```tsx
import { useGSAPStagger } from "@/hooks/animation";

function CardGrid() {
  const containerRef = useGSAPStagger<HTMLDivElement>({
    selector: ".card",
    from: { opacity: 0, y: 50, rotation: -5 },
    to: { opacity: 1, y: 0, rotation: 0 },
    stagger: 0.1,
    duration: 0.6,
    scrollTrigger: {
      start: "top 80%",
      end: "bottom 20%",
      scrub: false,
    },
  });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

---

## Framer Motion

### MotionSection Component

Pre-built component for common scroll animations.

**Available Variants:**
- `fade` - Simple fade in
- `slideUp` - Slide up and fade
- `slideDown` - Slide down and fade
- `slideLeft` - Slide from right
- `slideRight` - Slide from left
- `scale` - Scale up and fade
- `rotate` - Rotate and scale with fade
- `none` - No animation

**Basic Example:**

```tsx
import { MotionSection } from "@/components/animation";

function MySection() {
  return (
    <MotionSection variant="slideUp" duration={0.8}>
      <h2>This slides up on scroll</h2>
      <p>Content here...</p>
    </MotionSection>
  );
}
```

**Stagger Children:**

```tsx
import { MotionSection, MotionItem } from "@/components/animation";

function StaggeredCards() {
  return (
    <MotionSection variant="fade" stagger={0.1}>
      <MotionItem>
        <div>Card 1</div>
      </MotionItem>
      <MotionItem>
        <div>Card 2</div>
      </MotionItem>
      <MotionItem>
        <div>Card 3</div>
      </MotionItem>
    </MotionSection>
  );
}
```

**Custom Configuration:**

```tsx
<MotionSection
  variant="slideUp"
  duration={1.2}
  delay={0.2}
  once={true}          // Animate only once
  amount={0.3}         // Trigger when 30% visible
  className="my-class"
>
  Content
</MotionSection>
```

---

## Parallax Effects

### ParallaxWrapper

Already integrated in `app/layout.tsx` for global parallax support.

### ParallaxContainer

Create parallax scrolling effects.

**Speed Presets:**

```tsx
import { ParallaxContainer } from "@/components/animation";

function Hero() {
  return (
    <>
      <ParallaxContainer speed="slow">
        <img src="/bg.jpg" alt="Background" />
      </ParallaxContainer>

      <ParallaxContainer speed="medium">
        <div>Medium speed content</div>
      </ParallaxContainer>

      <ParallaxContainer speed="fast">
        <div>Fast moving element</div>
      </ParallaxContainer>
    </>
  );
}
```

**Custom Speed:**

```tsx
<ParallaxContainer speed={{ y: [-50, 50], x: [10, -10] }}>
  <div>Custom parallax movement</div>
</ParallaxContainer>
```

### ParallaxLayer

Multi-layer parallax for depth effects.

```tsx
import { ParallaxLayer } from "@/components/animation";

function LayeredHero() {
  return (
    <div className="relative h-screen">
      <ParallaxLayer depth={1} className="absolute inset-0">
        <img src="/background.jpg" alt="Background" />
      </ParallaxLayer>

      <ParallaxLayer depth={3} className="absolute inset-0">
        <img src="/midground.png" alt="Midground" />
      </ParallaxLayer>

      <ParallaxLayer depth={5} className="absolute inset-0">
        <h1>Foreground Content</h1>
      </ParallaxLayer>
    </div>
  );
}
```

### useParallaxEffect Hook

For custom parallax animations.

```tsx
import { useParallaxEffect } from "@/components/animation";

function CustomParallax() {
  const parallax = useParallaxEffect({
    speed: 20,
    rotate: [0, 360],
    scale: [1, 1.2],
    opacity: [1, 0.5],
  });

  return (
    <div ref={parallax.ref}>
      Custom animated element
    </div>
  );
}
```

---

## Common Patterns

### Hero Zoom on Scroll

```tsx
function HeroZoom() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    gsap.to(element, {
      scale: 1.2,
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <div ref={ref} className="h-screen overflow-hidden">
      <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover" />
    </div>
  );
}
```

### Service Card Rotations

```tsx
function ServiceCards() {
  const containerRef = useGSAPStagger<HTMLDivElement>({
    selector: ".service-card",
    from: { opacity: 0, rotateY: -15, y: 50 },
    to: { opacity: 1, rotateY: 0, y: 0 },
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
      start: "top 75%",
    },
  });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6">
      <div className="service-card">Service 1</div>
      <div className="service-card">Service 2</div>
      <div className="service-card">Service 3</div>
    </div>
  );
}
```

### Text Fade and Slide

```tsx
function TextReveal() {
  return (
    <MotionSection variant="slideUp" stagger={0.05}>
      <MotionItem>
        <h1>Welcome to AI1</h1>
      </MotionItem>
      <MotionItem>
        <p>Building the future of AI</p>
      </MotionItem>
      <MotionItem>
        <button>Get Started</button>
      </MotionItem>
    </MotionSection>
  );
}
```

### Pin Section While Scrolling

```tsx
function PinnedSection() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "+=1000",
      pin: true,
      pinSpacing: true,
    });

    gsap.to(element.querySelector(".inner"), {
      rotation: 360,
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "+=1000",
        scrub: 1,
      },
    });
  });

  return (
    <div ref={ref} className="h-screen">
      <div className="inner">Pinned content that rotates</div>
    </div>
  );
}
```

---

## Best Practices

### 1. Performance

- **Use `will-change` sparingly**: Only for elements actively animating
- **Prefer transforms and opacity**: Hardware-accelerated properties
- **Use `scrub` for scroll-linked animations**: Smoother than discrete animations
- **Debounce resize events**: If you're recalculating animations

```tsx
// Good - hardware accelerated
gsap.to(element, { x: 100, opacity: 0.5 });

// Avoid - not hardware accelerated
gsap.to(element, { left: 100, width: 200 });
```

### 2. Accessibility

- **Respect `prefers-reduced-motion`**:

```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

<MotionSection variant={prefersReducedMotion ? "none" : "slideUp"}>
  Content
</MotionSection>
```

- **Ensure content is accessible without animations**
- **Don't rely on animation for critical information**

### 3. Code Organization

```tsx
// ✅ Good - Separate animation logic
const useHeroAnimation = () => {
  return useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    // Animation logic
  });
};

function Hero() {
  const ref = useHeroAnimation();
  return <div ref={ref}>Hero</div>;
}

// ❌ Bad - Mixing concerns
function Hero() {
  const ref = useScrollTrigger((el, gsap) => { /* lots of code */ });
  return <div ref={ref}>Hero</div>;
}
```

### 4. Cleanup

Always clean up animations to prevent memory leaks:

```tsx
useScrollTrigger((element, gsap, ScrollTrigger) => {
  const animation = gsap.to(element, { /* ... */ });

  return () => {
    animation.kill();
  };
});
```

---

## Troubleshooting

### Smooth Scroll Not Working

**Issue**: Page doesn't scroll smoothly

**Solutions**:
1. Ensure `SmoothScrollProvider` wraps your content
2. Check for `overflow: hidden` on body/html
3. Verify no JavaScript errors in console
4. Try disabling on touch devices: `smoothTouch: false`

### ScrollTrigger Not Syncing with Lenis

**Issue**: ScrollTrigger animations don't trigger at right position

**Solution**: The sync is automatic. If issues persist:

```tsx
// Manual refresh after content loads
useEffect(() => {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}, []);
```

### Parallax Not Working

**Issue**: Parallax effects not visible

**Solutions**:
1. Ensure `ParallaxWrapper` is in your layout
2. Check that content has sufficient height to scroll
3. Verify no `overflow: hidden` on parent containers

### TypeScript Errors

**Issue**: Type errors with GSAP or animation hooks

**Solution**: Install type definitions:

```bash
npm install --save-dev @types/gsap
```

### Animations Not Triggering on Page Load

**Issue**: Scroll-triggered animations don't work on initial page load

**Solution**: Set `once={false}` or trigger on mount:

```tsx
<MotionSection variant="slideUp" once={false}>
  Content
</MotionSection>
```

---

## Quick Reference

### Import Paths

```tsx
// Providers
import { SmoothScrollProvider } from "@/components/animation";
import { ParallaxWrapper } from "@/components/animation";

// Components
import { MotionSection, MotionItem } from "@/components/animation";
import { ParallaxContainer, ParallaxLayer } from "@/components/animation";

// Hooks
import { useScrollTrigger } from "@/hooks/animation";
import { useGSAPTimeline, useGSAPStagger } from "@/hooks/animation";
import { useParallaxEffect } from "@/components/animation";

// Utilities
import { useIsomorphicLayoutEffect } from "@/lib/animation/use-isomorphic-layout-effect";
```

### Common ScrollTrigger Config

```tsx
scrollTrigger: {
  trigger: element,           // Element to watch
  start: "top 80%",          // When animation starts
  end: "top 20%",            // When animation ends
  scrub: true,               // Link to scroll position
  markers: false,            // Debug markers
  pin: false,                // Pin element
  pinSpacing: true,          // Add spacing when pinned
  toggleActions: "play none none reverse", // onEnter onLeave onEnterBack onLeaveBack
}
```

---

## Additional Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [react-scroll-parallax](https://react-scroll-parallax.damnthat.tv/)

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
