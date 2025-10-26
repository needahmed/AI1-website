"use client";

import { SectionWrapper, Headline, GradientDivider, CTABanner, StatBadge } from "@/components/ai1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SectionWrapper variant="gradient" className="min-h-[80vh] flex items-center relative">
        <div className="absolute top-8 right-8">
          <Button 
            onClick={toggleDarkMode} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            {darkMode ? "☀️" : "🌙"} Toggle Theme
          </Button>
        </div>
        <div className="text-center space-y-8 w-full">
          <Headline 
            as="h1" 
            className="text-white"
            subtitle="A comprehensive design system built with Next.js, Tailwind CSS, and shadcn/ui"
          >
            AI1 Design System
          </Headline>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-ai1-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View Documentation
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* Brand Colors Section */}
      <SectionWrapper id="colors">
        <Headline as="h2" variant="gradient" subtitle="Our vibrant color palette for building modern AI experiences">
          Brand Colors
        </Headline>
        <GradientDivider className="my-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-deep-blue shadow-lg"></div>
            <p className="text-sm font-medium">Deep Blue</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-electric-blue shadow-lg"></div>
            <p className="text-sm font-medium">Electric Blue</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-cyan shadow-lg"></div>
            <p className="text-sm font-medium">Cyan</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-purple shadow-lg"></div>
            <p className="text-sm font-medium">Purple</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-xl bg-purple-light shadow-lg"></div>
            <p className="text-sm font-medium">Purple Light</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Statistics Section */}
      <SectionWrapper className="bg-muted/30">
        <Headline as="h2" variant="electric" subtitle="Key metrics showcasing our design system's impact">
          By The Numbers
        </Headline>
        <GradientDivider variant="electric" className="my-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <StatBadge 
            value="50+" 
            label="Components" 
            variant="electric"
            trend={{ value: 25, direction: "up" }}
          />
          <StatBadge 
            value="100%" 
            label="Accessible" 
            variant="cyan"
          />
          <StatBadge 
            value="2" 
            label="Theme Modes" 
            variant="purple"
          />
          <StatBadge 
            value="∞" 
            label="Possibilities" 
            variant="default"
            trend={{ value: 100, direction: "up" }}
          />
        </div>
      </SectionWrapper>

      {/* Components Showcase */}
      <SectionWrapper id="components">
        <Headline as="h2" variant="gradient" subtitle="Explore our collection of beautifully designed, accessible components">
          Component Library
        </Headline>
        <GradientDivider variant="purple" className="my-8" />

        {/* Buttons */}
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* Form Elements */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Form Elements</h3>
            <div className="space-y-4 max-w-md">
              <Input placeholder="Email address" type="email" />
              <Textarea placeholder="Your message..." rows={4} />
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>A simple card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is a standard card with header and content.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-electric-blue">Glass Card</CardTitle>
                  <CardDescription>With glassmorphism effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card uses the glass-card utility class.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-ai1-lg hover:shadow-purple transition-shadow">
                <CardHeader>
                  <CardTitle className="gradient-text">Gradient Card</CardTitle>
                  <CardDescription>With custom shadows</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card has AI1-themed shadows.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Accordion */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Accordion</h3>
            <Accordion type="single" collapsible className="max-w-2xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the AI1 Design System?</AccordionTrigger>
                <AccordionContent>
                  The AI1 Design System is a comprehensive collection of design tokens, components, 
                  and guidelines built on Next.js, Tailwind CSS, and shadcn/ui.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What components are included?</AccordionTrigger>
                <AccordionContent>
                  We include all shadcn/ui components plus custom AI1 components like SectionWrapper, 
                  Headline, GradientDivider, CTABanner, and StatBadge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>
                  Yes! All components fully support both light and dark modes with carefully 
                  crafted color palettes for each theme.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Toggles */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Toggles</h3>
            <div className="flex gap-4">
              <Toggle>Toggle 1</Toggle>
              <Toggle>Toggle 2</Toggle>
              <Toggle defaultPressed>Pressed</Toggle>
            </div>
          </div>

          {/* Skeletons */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Loading Skeletons</h3>
            <div className="space-y-4 max-w-md">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Glassmorphism Section */}
      <SectionWrapper className="relative overflow-hidden">
        <div 
          className="absolute inset-0 gradient-ai1 opacity-10" 
          style={{ backgroundSize: "400% 400%", animation: "gradient 15s ease infinite" }}
        />
        <div className="relative">
          <Headline as="h2" variant="gradient" subtitle="Modern translucent UI effects">
            Glassmorphism Effects
          </Headline>
          <GradientDivider className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass p-6 rounded-xl">
              <h4 className="text-lg font-heading font-bold mb-2">Light Glass</h4>
              <p className="text-sm">Subtle transparency with blur effect</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-heading font-bold mb-2">Glass Card</h4>
              <p className="text-sm">Enhanced blur for card elements</p>
            </div>
            <div className="glass-dark p-6 rounded-xl">
              <h4 className="text-lg font-heading font-bold mb-2">Dark Glass</h4>
              <p className="text-sm">Darker variant for overlays</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Typography Section */}
      <SectionWrapper className="bg-muted/30">
        <Headline as="h2" variant="electric" subtitle="Beautiful, scalable typography system">
          Typography
        </Headline>
        <GradientDivider variant="electric" className="my-8" />
        <div className="space-y-6 mt-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Heading 1 - Sora (font-heading)</p>
            <h1 className="text-6xl font-heading font-bold">The quick brown fox</h1>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Heading 2 - Sora</p>
            <h2 className="text-5xl font-heading font-bold">The quick brown fox</h2>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Heading 3 - Sora</p>
            <h3 className="text-4xl font-heading font-bold">The quick brown fox</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Body Text - Inter (font-sans)</p>
            <p className="text-base">
              The quick brown fox jumps over the lazy dog. This is body text using the Inter 
              font family, which provides excellent readability for longer content.
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Gradient Text</p>
            <h2 className="text-5xl font-heading font-bold gradient-text">
              AI-Powered Innovation
            </h2>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper>
        <CTABanner
          title="Ready to Build Amazing Experiences?"
          description="Get started with the AI1 Design System today and create beautiful, accessible applications."
          variant="gradient"
          primaryAction={{
            label: "Get Started Now",
            onClick: () => console.log("Get started clicked")
          }}
          secondaryAction={{
            label: "View Documentation",
            onClick: () => console.log("Docs clicked")
          }}
        />
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            AI1 Design System © 2024 | Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
