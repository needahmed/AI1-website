# AI1 Component Usage Guide

Quick reference for using AI1 Design System components.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [shadcn/ui Components](#shadcnui-components)
- [AI1 Custom Components](#ai1-custom-components)
- [Utility Classes](#utility-classes)
- [Dark Mode](#dark-mode)

## Installation

Already set up! Just import and use:

```tsx
import { Button } from "@/components/ui/button";
import { SectionWrapper, Headline } from "@/components/ai1";
```

## Basic Usage

### Page Layout Example

```tsx
import { SectionWrapper, Headline, CTABanner } from "@/components/ai1";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <SectionWrapper variant="gradient">
        <Headline as="h1" className="text-white">
          Welcome to AI1
        </Headline>
      </SectionWrapper>
      
      <SectionWrapper>
        <h2 className="text-3xl font-heading">Content Section</h2>
        <p>Your content here...</p>
      </SectionWrapper>
      
      <SectionWrapper>
        <CTABanner
          title="Get Started Today"
          primaryAction={{ label: "Sign Up", href: "/signup" }}
        />
      </SectionWrapper>
    </>
  );
}
```

## shadcn/ui Components

### Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input & Textarea

```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Textarea placeholder="Message" rows={4} />
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Dialog

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
  </DialogContent>
</Dialog>
```

### Accordion

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Sheet (Side Panel)

```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Panel</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
      <SheetDescription>Panel description</SheetDescription>
    </SheetHeader>
    <div>Panel content</div>
  </SheetContent>
</Sheet>
```

### Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Toggle

```tsx
import { Toggle } from "@/components/ui/toggle";

<Toggle>Toggle Me</Toggle>
<Toggle defaultPressed>Pressed</Toggle>
```

### Skeleton (Loading States)

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-24 w-24 rounded-full" />
```

## AI1 Custom Components

### SectionWrapper

Container for page sections with consistent spacing.

```tsx
import { SectionWrapper } from "@/components/ai1";

// Default variant
<SectionWrapper id="features">
  <h2>Features</h2>
</SectionWrapper>

// Glass effect
<SectionWrapper variant="glass">
  <h2>Glass Section</h2>
</SectionWrapper>

// Gradient background
<SectionWrapper variant="gradient">
  <h2 className="text-white">Gradient Section</h2>
</SectionWrapper>
```

**Props:**
- `variant`: "default" | "glass" | "gradient"
- `id`: string (for anchor links)
- `className`: string (additional classes)

### Headline

Branded headlines with optional subtitles.

```tsx
import { Headline } from "@/components/ai1";

// Default headline
<Headline as="h1">
  Main Title
</Headline>

// Gradient text
<Headline as="h2" variant="gradient">
  Gradient Headline
</Headline>

// With subtitle
<Headline 
  as="h1" 
  variant="electric"
  subtitle="This is a subtitle explaining the headline"
>
  Main Headline
</Headline>
```

**Props:**
- `as`: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" (default: "h2")
- `variant`: "default" | "gradient" | "electric"
- `subtitle`: string (optional)
- `className`: string

### GradientDivider

Visual separator with gradient styling.

```tsx
import { GradientDivider } from "@/components/ai1";

// Default AI1 gradient
<GradientDivider />

// Different variants
<GradientDivider variant="electric" />
<GradientDivider variant="purple" />

// Different heights
<GradientDivider height="sm" />
<GradientDivider height="lg" />
```

**Props:**
- `variant`: "ai1" | "electric" | "purple"
- `height`: "sm" | "md" | "lg"
- `className`: string

### CTABanner

Call-to-action banner with primary and secondary actions.

```tsx
import { CTABanner } from "@/components/ai1";

// Basic usage
<CTABanner
  title="Ready to Get Started?"
  description="Join thousands of users already using AI1"
  primaryAction={{
    label: "Get Started",
    href: "/signup"
  }}
/>

// With both actions
<CTABanner
  title="Explore Our Features"
  description="See what makes AI1 special"
  variant="gradient"
  primaryAction={{
    label: "Start Free Trial",
    onClick: () => console.log("Start trial")
  }}
  secondaryAction={{
    label: "Learn More",
    href: "/docs"
  }}
/>

// Glass variant
<CTABanner
  title="Contact Us"
  variant="glass"
  primaryAction={{ label: "Get in Touch", href: "/contact" }}
/>

// With custom content
<CTABanner
  title="Special Offer"
  description="Limited time only"
  variant="gradient"
>
  <div className="flex gap-2 justify-center">
    <Badge>50% OFF</Badge>
    <Badge>New Users</Badge>
  </div>
</CTABanner>
```

**Props:**
- `title`: string (required)
- `description`: string
- `variant`: "default" | "gradient" | "glass"
- `primaryAction`: { label: string, onClick?: () => void, href?: string }
- `secondaryAction`: { label: string, onClick?: () => void, href?: string }
- `children`: ReactNode (custom content)
- `className`: string

### StatBadge

Display statistics and metrics.

```tsx
import { StatBadge } from "@/components/ai1";

// Basic stat
<StatBadge value="1,000+" label="Users" />

// With color variant
<StatBadge 
  value="99.9%" 
  label="Uptime" 
  variant="electric" 
/>

// With trend indicator
<StatBadge
  value="$50M"
  label="Revenue"
  variant="cyan"
  trend={{ value: 25, direction: "up" }}
/>

// With icon
<StatBadge
  value="24/7"
  label="Support"
  variant="purple"
  icon={<SupportIcon />}
/>

// Grid of stats
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatBadge value="10K+" label="Active Users" variant="electric" />
  <StatBadge value="99.9%" label="Uptime" variant="cyan" />
  <StatBadge value="50M+" label="API Calls" variant="purple" />
  <StatBadge value="24/7" label="Support" />
</div>
```

**Props:**
- `value`: string | number (required)
- `label`: string (required)
- `variant`: "default" | "electric" | "purple" | "cyan"
- `icon`: ReactNode
- `trend`: { value: number, direction: "up" | "down" }
- `className`: string

## Utility Classes

### Glassmorphism

```tsx
// Light glass effect
<div className="glass p-6 rounded-xl">
  Content
</div>

// Dark glass effect
<div className="glass-dark p-6 rounded-xl">
  Content
</div>

// Glass card (enhanced blur)
<div className="glass-card p-6 rounded-xl">
  Content
</div>
```

### Gradients

```tsx
// Background gradients
<div className="gradient-ai1 p-8 text-white">
  AI1 Gradient Background
</div>

<div className="gradient-electric p-8 text-white">
  Electric Gradient
</div>

<div className="gradient-purple p-8 text-white">
  Purple Gradient
</div>

// Text gradient
<h1 className="text-6xl font-bold gradient-text">
  Gradient Text
</h1>
```

### Custom Shadows

```tsx
// AI1 shadows
<div className="shadow-ai1 p-6 rounded-xl">
  Standard AI1 shadow
</div>

<div className="shadow-ai1-lg p-6 rounded-xl">
  Large AI1 shadow
</div>

// Colored shadows
<div className="shadow-electric p-6 rounded-xl">
  Electric shadow
</div>

<div className="shadow-purple p-6 rounded-xl">
  Purple shadow
</div>
```

### Glow Effects

```tsx
// Glow effects
<div className="glow-ai1 p-6 rounded-xl">
  AI1 Glow
</div>

<div className="glow-cyan p-6 rounded-xl">
  Cyan Glow
</div>

<div className="glow-purple p-6 rounded-xl">
  Purple Glow
</div>
```

### Brand Colors

```tsx
// Background colors
<div className="bg-deep-blue">Deep Blue</div>
<div className="bg-electric-blue">Electric Blue</div>
<div className="bg-cyan">Cyan</div>
<div className="bg-teal">Teal</div>
<div className="bg-purple">Purple</div>
<div className="bg-purple-light">Purple Light</div>

// Text colors
<p className="text-deep-blue">Deep Blue Text</p>
<p className="text-electric-blue">Electric Blue Text</p>
<p className="text-cyan">Cyan Text</p>
<p className="text-purple">Purple Text</p>

// Border colors
<div className="border border-electric-blue">Border</div>
```

### Typography

```tsx
// Heading font (Sora)
<h1 className="font-heading text-6xl font-bold">
  Heading with Sora
</h1>

// Body font (Inter)
<p className="font-sans text-base">
  Body text with Inter
</p>

// Type scale
<p className="text-xs">Extra small</p>
<p className="text-sm">Small</p>
<p className="text-base">Base</p>
<p className="text-lg">Large</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2X large</p>
<p className="text-3xl">3X large</p>
<p className="text-4xl">4X large</p>
<p className="text-5xl">5X large</p>
<p className="text-6xl">6X large</p>
```

## Dark Mode

### Toggle Dark Mode

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <Button onClick={toggleTheme}>
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}
```

### Dark Mode Variants

Use Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">
    Adapts to theme
  </p>
</div>
```

## Complete Page Example

```tsx
"use client";

import { useState } from "react";
import { SectionWrapper, Headline, GradientDivider, CTABanner, StatBadge } from "@/components/ai1";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ExamplePage() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div>
      {/* Hero Section */}
      <SectionWrapper variant="gradient" className="min-h-screen flex items-center">
        <div className="absolute top-8 right-8">
          <Button 
            onClick={() => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle("dark");
            }}
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            {darkMode ? "☀️" : "🌙"}
          </Button>
        </div>
        
        <div className="text-center space-y-8">
          <Headline 
            as="h1" 
            className="text-white"
            subtitle="Build amazing AI-powered experiences"
          >
            Welcome to AI1
          </Headline>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">Get Started</Button>
            <Button size="lg" variant="outline" className="border-white text-white">
              Learn More
            </Button>
          </div>
        </div>
      </SectionWrapper>
      
      {/* Stats Section */}
      <SectionWrapper>
        <Headline as="h2" variant="gradient">
          Our Impact
        </Headline>
        <GradientDivider className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatBadge value="10K+" label="Users" variant="electric" />
          <StatBadge value="99.9%" label="Uptime" variant="cyan" />
          <StatBadge value="50M+" label="API Calls" variant="purple" />
          <StatBadge value="24/7" label="Support" />
        </div>
      </SectionWrapper>
      
      {/* Features Section */}
      <SectionWrapper className="bg-muted/30">
        <Headline as="h2" variant="electric">
          Features
        </Headline>
        <GradientDivider variant="electric" className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card">
              <CardHeader>
                <CardTitle>Feature {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature description goes here</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      
      {/* CTA Section */}
      <SectionWrapper>
        <CTABanner
          title="Ready to Get Started?"
          description="Join thousands using AI1 today"
          variant="gradient"
          primaryAction={{ label: "Start Free Trial", href: "/signup" }}
          secondaryAction={{ label: "View Documentation", href: "/docs" }}
        />
      </SectionWrapper>
    </div>
  );
}
```

## Tips

1. **Use variants consistently**: Stick to the same variant throughout a section for visual coherence
2. **Combine utilities**: Mix glassmorphism with shadows and gradients for depth
3. **Responsive design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
4. **Accessibility**: Always include proper semantic HTML and ARIA attributes
5. **Dark mode**: Test components in both themes before deployment

For more detailed information, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
