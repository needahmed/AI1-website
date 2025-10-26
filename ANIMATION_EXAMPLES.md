# Animation Examples

Quick copy-paste examples for common animation patterns.

## Basic Imports

```tsx
// Providers (already in layout.tsx)
import { SmoothScrollProvider, ParallaxWrapper } from "@/components/animation";

// Components
import { MotionSection, MotionItem, ParallaxContainer, ParallaxLayer } from "@/components/animation";

// Hooks
import { useScrollTrigger, useGSAPTimeline, useGSAPStagger } from "@/hooks/animation";
```

---

## 1. Simple Fade In on Scroll

```tsx
import { MotionSection } from "@/components/animation";

export function FadeInSection() {
  return (
    <MotionSection variant="fade">
      <h2>This fades in when scrolled into view</h2>
      <p>Content here...</p>
    </MotionSection>
  );
}
```

---

## 2. Slide Up Animation

```tsx
import { MotionSection } from "@/components/animation";

export function SlideUpSection() {
  return (
    <MotionSection variant="slideUp" duration={0.8}>
      <h2>This slides up from bottom</h2>
      <p>With smooth animation</p>
    </MotionSection>
  );
}
```

---

## 3. Staggered Card Grid

```tsx
import { MotionSection, MotionItem } from "@/components/animation";
import { Card } from "@/components/ui/card";

export function StaggeredCards() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <MotionSection variant="slideUp" stagger={0.1}>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((num) => (
          <MotionItem key={num}>
            <Card className="p-6">
              <h3>Card {num}</h3>
            </Card>
          </MotionItem>
        ))}
      </div>
    </MotionSection>
  );
}
```

---

## 4. Hero Zoom with GSAP

```tsx
import { useScrollTrigger } from "@/hooks/animation";

export function HeroZoom() {
  const heroRef = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
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
    <div ref={heroRef} className="h-screen overflow-hidden">
      <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover" />
    </div>
  );
}
```

---

## 5. Parallax Background

```tsx
import { ParallaxContainer } from "@/components/animation";

export function ParallaxHero() {
  return (
    <div className="relative h-screen">
      <ParallaxContainer speed="fast" className="absolute inset-0">
        <img src="/background.jpg" alt="Background" className="w-full h-full object-cover" />
      </ParallaxContainer>

      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-6xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  );
}
```

---

## 6. Multi-Layer Parallax

```tsx
import { ParallaxLayer } from "@/components/animation";

export function LayeredParallax() {
  return (
    <div className="relative h-screen">
      <ParallaxLayer depth={1} className="absolute inset-0">
        <div className="bg-gradient-to-b from-blue-500 to-purple-500 h-full" />
      </ParallaxLayer>

      <ParallaxLayer depth={3} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white">Deep Layer</h1>
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth={5} className="absolute bottom-0 left-0 right-0 p-8">
        <button className="bg-white text-black px-6 py-3 rounded-lg">
          Foreground Button
        </button>
      </ParallaxLayer>
    </div>
  );
}
```

---

## 7. Rotating Cards on Scroll

```tsx
import { useGSAPStagger } from "@/hooks/animation";
import { Card } from "@/components/ui/card";

export function RotatingCards() {
  const containerRef = useGSAPStagger<HTMLDivElement>({
    selector: ".card",
    from: { opacity: 0, rotateY: -15, y: 50 },
    to: { opacity: 1, rotateY: 0, y: 0 },
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
      start: "top 75%",
    },
  });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
      <Card className="card p-6">Card 1</Card>
      <Card className="card p-6">Card 2</Card>
      <Card className="card p-6">Card 3</Card>
    </div>
  );
}
```

---

## 8. Timeline Sequence

```tsx
import { useGSAPTimeline } from "@/hooks/animation";

export function TimelineAnimation() {
  const containerRef = useGSAPTimeline<HTMLDivElement>((element, gsap, tl) => {
    tl.from(".title", { opacity: 0, y: -50, duration: 0.6 })
      .from(".subtitle", { opacity: 0, y: -30, duration: 0.5 }, "-=0.3")
      .from(".cta", { opacity: 0, scale: 0.8, duration: 0.4 }, "-=0.2");
  });

  return (
    <div ref={containerRef} className="text-center">
      <h1 className="title text-4xl font-bold">Welcome</h1>
      <p className="subtitle text-xl text-muted-foreground">To our platform</p>
      <button className="cta mt-4 px-6 py-3 bg-primary text-white rounded-lg">
        Get Started
      </button>
    </div>
  );
}
```

---

## 9. Pin Section While Scrolling

```tsx
import { useScrollTrigger } from "@/hooks/animation";

export function PinnedSection() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "+=1000",
      pin: true,
      pinSpacing: true,
    });
  });

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <h2 className="text-4xl font-bold text-white">Pinned Content</h2>
    </div>
  );
}
```

---

## 10. Text Split and Stagger

```tsx
import { MotionSection, MotionItem } from "@/components/animation";

export function StaggeredText() {
  const words = ["Build", "amazing", "experiences", "with", "animations"];

  return (
    <MotionSection variant="fade" stagger={0.1}>
      <div className="flex flex-wrap gap-4 text-4xl font-bold">
        {words.map((word, i) => (
          <MotionItem key={i}>
            <span>{word}</span>
          </MotionItem>
        ))}
      </div>
    </MotionSection>
  );
}
```

---

## 11. Scale on Hover with Framer Motion

```tsx
import { motion } from "framer-motion";

export function ScaleCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-card rounded-lg shadow-lg cursor-pointer"
    >
      <h3>Hover me!</h3>
      <p>I scale on hover</p>
    </motion.div>
  );
}
```

---

## 12. Scroll Progress Indicator

```tsx
import { useScrollTrigger } from "@/hooks/animation";

export function ScrollProgress() {
  const progressRef = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    gsap.to(element, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        ref={progressRef}
        className="h-full bg-primary origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
```

---

## 13. Reveal on Scroll (Mask Effect)

```tsx
import { useScrollTrigger } from "@/hooks/animation";

export function RevealSection() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    gsap.from(element, {
      clipPath: "inset(0 100% 0 0)",
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });
  });

  return (
    <div ref={ref} className="py-20 px-8 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h2 className="text-4xl font-bold text-white">Revealed with mask effect</h2>
    </div>
  );
}
```

---

## 14. Number Counter Animation

```tsx
import { useScrollTrigger } from "@/hooks/animation";

export function CounterAnimation() {
  const ref = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    const counter = element.querySelector(".counter");
    if (counter) {
      gsap.to(counter, {
        innerHTML: 1000,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      });
    }
  });

  return (
    <div ref={ref} className="text-center">
      <div className="counter text-6xl font-bold text-primary">0</div>
      <p className="text-lg text-muted-foreground">Happy Customers</p>
    </div>
  );
}
```

---

## 15. Image Gallery with Stagger

```tsx
import { useGSAPStagger } from "@/hooks/animation";

export function ImageGallery() {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];
  
  const containerRef = useGSAPStagger<HTMLDivElement>({
    selector: ".gallery-item",
    from: { opacity: 0, scale: 0.8, rotation: -5 },
    to: { opacity: 1, scale: 1, rotation: 0 },
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: {
      start: "top 80%",
    },
  });

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4">
      {images.map((src, i) => (
        <div key={i} className="gallery-item aspect-square overflow-hidden rounded-lg">
          <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
```

---

## Tips

1. **Performance**: Use `scrub` for smooth scroll-linked animations
2. **Accessibility**: Add `prefers-reduced-motion` support for users who prefer less motion
3. **Mobile**: Consider disabling complex animations on mobile with `smoothTouch: false`
4. **Debugging**: Set `markers: true` in ScrollTrigger to see trigger points
5. **Cleanup**: Animations clean up automatically when components unmount

---

For complete documentation, see [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)
