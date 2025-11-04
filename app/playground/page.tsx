"use client";

import { useScrollTrigger, useGSAPStagger } from "@/hooks/animation";
import { MotionSection, MotionItem, ParallaxContainer, ParallaxLayer } from "@/components/animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headline } from "@/components/ai1";

/**
 * Animation Playground
 * 
 * Interactive demo showcasing all animation capabilities:
 * - Hero zoom effect with GSAP ScrollTrigger
 * - Service card rotations with stagger
 * - Parallax layers for depth
 * - Text fade and slide animations
 * - Framer Motion variants
 */

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Zoom */}
      <HeroZoomSection />

      {/* Text Fade & Slide Section */}
      <TextAnimationSection />

      {/* Service Card Rotations */}
      <ServiceCardsSection />

      {/* Parallax Layers */}
      <ParallaxSection />

      {/* Stagger Animation Grid */}
      <StaggerGridSection />

      {/* Scroll-triggered Timeline */}
      <TimelineSection />
    </div>
  );
}

/**
 * Hero Section with Zoom Effect
 */
function HeroZoomSection() {
  const heroRef = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    const bg = element.querySelector(".hero-bg");
    const content = element.querySelector(".hero-content");

    if (bg) {
      gsap.to(bg, {
        scale: 1.3,
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (content) {
      gsap.to(content, {
        y: 150,
        opacity: 0.3,
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  });

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero with zoom animation"
    >
      {/* Background with zoom */}
      <div className="hero-bg absolute inset-0 bg-gradient-ai1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(66,165,245,0.2),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <Badge className="mb-4" variant="outline">
            Animation Playground
          </Badge>
          <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-lg">
            Scroll to Explore
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Watch the background zoom as you scroll
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Text Animation Section with Framer Motion
 */
function TextAnimationSection() {
  return (
    <section className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <MotionSection variant="slideUp" stagger={0.15} className="space-y-8">
          <MotionItem>
            <div className="text-center mx-auto">
              <Headline
                subtitle="Each element animates in sequence using Framer Motion"
              >
                Text Fade & Slide
              </Headline>
            </div>
          </MotionItem>

          <MotionItem>
            <p className="mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-center text-lg text-muted-foreground px-2 sm:px-0">
              This section demonstrates staggered text animations. Each paragraph and element
              animates in with a slight delay, creating a smooth cascade effect.
            </p>
          </MotionItem>

          <MotionItem>
            <div className="flex justify-center gap-4">
              <Button variant="default" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </MotionItem>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fade In", desc: "Simple opacity animation" },
              { title: "Slide Up", desc: "Vertical movement with fade" },
              { title: "Scale", desc: "Smooth scaling animation" },
            ].map((item, i) => (
              <MotionItem key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}

/**
 * Service Cards with 3D Rotation
 */
function ServiceCardsSection() {
  const containerRef = useGSAPStagger<HTMLDivElement>({
    selector: ".service-card",
    from: { opacity: 0, rotateY: -15, y: 60, scale: 0.9 },
    to: { opacity: 1, rotateY: 0, y: 0, scale: 1 },
    stagger: 0.12,
    duration: 0.8,
    scrollTrigger: {
      start: "top 75%",
      end: "bottom 25%",
    },
  });

  const services = [
    {
      title: "AI Solutions",
      icon: "🤖",
      description: "Advanced machine learning and AI-powered tools",
    },
    {
      title: "Cloud Services",
      icon: "☁️",
      description: "Scalable cloud infrastructure and deployment",
    },
    {
      title: "Data Analytics",
      icon: "📊",
      description: "Real-time data processing and insights",
    },
    {
      title: "API Development",
      icon: "🔌",
      description: "RESTful and GraphQL API solutions",
    },
    {
      title: "Security",
      icon: "🔒",
      description: "Enterprise-grade security and compliance",
    },
    {
      title: "Support",
      icon: "💬",
      description: "24/7 customer support and consultation",
    },
  ];

  return (
    <section className="min-h-screen bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge className="mb-4">GSAP Stagger</Badge>
          <h2 className="mb-4 text-4xl font-bold">Service Card Rotations</h2>
          <p className="text-lg text-muted-foreground">
            Cards rotate into view with staggered timing
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, i) => (
            <Card
              key={i}
              className="service-card transition-shadow hover:shadow-ai1-lg"
            >
              <CardHeader>
                <div className="mb-2 text-4xl">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Parallax Layers Section
 */
function ParallaxSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Parallax Background Layers */}
      <ParallaxLayer depth={1} className="absolute inset-0">
        <div className="h-full w-full bg-gradient-electric opacity-20" />
      </ParallaxLayer>

      <ParallaxLayer depth={2} className="absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-gradient-purple opacity-30 blur-3xl" />
      </ParallaxLayer>

      <ParallaxLayer depth={3} className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-ai1 opacity-40 blur-2xl" />
      </ParallaxLayer>

      {/* Content */}
      <ParallaxContainer speed="slow" className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4">
          <MotionSection variant="scale" className="text-center">
            <Badge className="mb-4">Parallax Effect</Badge>
            <h2 className="mb-6 text-5xl font-bold">Multi-Layer Parallax</h2>
            <p className="mx-auto mb-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-xl text-muted-foreground px-2 sm:px-0">
              Background layers move at different speeds to create depth. The content moves
              independently from the gradient layers behind it.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">Explore More</Button>
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </div>
          </MotionSection>
        </div>
      </ParallaxContainer>
    </section>
  );
}

/**
 * Stagger Grid with Different Variants
 */
function StaggerGridSection() {
  const variants: Array<"fade" | "slideUp" | "slideLeft" | "scale" | "rotate"> = [
    "fade",
    "slideUp",
    "slideLeft",
    "scale",
    "rotate",
  ];

  return (
    <section className="min-h-screen bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Framer Motion</Badge>
          <h2 className="mb-4 text-4xl font-bold">Animation Variants</h2>
          <p className="text-lg text-muted-foreground">
            Different animation styles using Framer Motion
          </p>
        </div>

        <div className="space-y-16">
          {variants.map((variant) => (
            <div key={variant}>
              <h3 className="mb-6 text-2xl font-semibold capitalize">{variant}</h3>
              <MotionSection variant={variant} stagger={0.08}>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {[1, 2, 3, 4].map((num) => (
                    <MotionItem key={num}>
                      <Card className="p-8 text-center">
                        <p className="text-4xl font-bold text-primary">{num}</p>
                        <p className="mt-2 text-sm text-muted-foreground capitalize">
                          {variant} animation
                        </p>
                      </Card>
                    </MotionItem>
                  ))}
                </div>
              </MotionSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Timeline Section with Complex Sequencing
 */
function TimelineSection() {
  const timelineRef = useScrollTrigger<HTMLDivElement>((element, gsap, ScrollTrigger) => {
    const items = element.querySelectorAll(".timeline-item");

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        rotation: index % 2 === 0 ? -5 : 5,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });
  });

  const timeline = [
    { year: "2024 Q1", title: "Launch", desc: "Platform goes live" },
    { year: "2024 Q2", title: "Expansion", desc: "New features added" },
    { year: "2024 Q3", title: "Growth", desc: "User base doubles" },
    { year: "2024 Q4", title: "Innovation", desc: "AI capabilities enhanced" },
  ];

  return (
    <section className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge className="mb-4">GSAP Timeline</Badge>
          <h2 className="mb-4 text-4xl font-bold">Scroll Timeline</h2>
          <p className="text-lg text-muted-foreground">
            Items animate from alternating sides as you scroll
          </p>
        </div>

        <div ref={timelineRef} className="relative space-y-8">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-purple to-transparent" />

          {timeline.map((item, i) => (
            <div
              key={i}
              className={`timeline-item relative grid gap-8 md:grid-cols-2 ${
                i % 2 === 0 ? "" : "md:grid-flow-dense"
              }`}
            >
              <div className={i % 2 === 0 ? "" : "md:col-start-2"}>
                <Card className="glass-card">
                  <CardHeader>
                    <Badge className="mb-2 w-fit">{item.year}</Badge>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center">
        <MotionSection variant="fade">
          <Badge className="mb-4">End of Demo</Badge>
          <h3 className="mb-4 text-3xl font-bold">Ready to Build?</h3>
          <p className="mb-8 text-muted-foreground">
            Check out the ANIMATION_GUIDE.md for complete documentation
          </p>
          <Button size="lg" className="gap-2">
            View Documentation
          </Button>
        </MotionSection>
      </div>
    </section>
  );
}
