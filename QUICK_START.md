# AI1 Design System - Quick Start Guide

Get up and running with the AI1 Design System in 5 minutes.

## 1. Installation & Setup

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Visit http://localhost:3000 to see the design system showcase.

## 2. Your First Page

Create a new page in `app/your-page/page.tsx`:

```tsx
import { SectionWrapper, Headline, CTABanner } from "@/components/ai1";
import { Button } from "@/components/ui/button";

export default function YourPage() {
  return (
    <>
      {/* Hero section with gradient background */}
      <SectionWrapper variant="gradient" className="min-h-screen flex items-center">
        <div className="text-center space-y-8">
          <Headline 
            as="h1" 
            className="text-white"
            subtitle="Your page subtitle"
          >
            Your Page Title
          </Headline>
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </SectionWrapper>

      {/* Content section */}
      <SectionWrapper>
        <Headline as="h2" variant="gradient">
          Your Section
        </Headline>
        <p className="mt-4">Your content here...</p>
      </SectionWrapper>

      {/* CTA section */}
      <SectionWrapper>
        <CTABanner
          title="Ready to start?"
          primaryAction={{ label: "Sign Up", href: "/signup" }}
        />
      </SectionWrapper>
    </>
  );
}
```

## 3. Essential Components

### Use shadcn/ui components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

<Button>Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
<Input placeholder="Enter text" />
<Badge>New</Badge>
```

### Use AI1 custom components

```tsx
import { 
  SectionWrapper, 
  Headline, 
  GradientDivider, 
  CTABanner, 
  StatBadge 
} from "@/components/ai1";

<SectionWrapper variant="glass">
  <Headline as="h2" variant="gradient">Title</Headline>
  <GradientDivider />
  <StatBadge value="100+" label="Users" variant="electric" />
  <CTABanner title="CTA" primaryAction={{ label: "Action", href: "/link" }} />
</SectionWrapper>
```

## 4. Style with Utility Classes

### Brand colors

```tsx
<div className="bg-electric-blue text-white">Electric Blue</div>
<div className="bg-cyan text-white">Cyan</div>
<div className="bg-purple text-white">Purple</div>
```

### Glassmorphism

```tsx
<div className="glass-card p-6 rounded-xl">
  Glass effect
</div>
```

### Gradients

```tsx
<div className="gradient-ai1 p-8 text-white">
  Gradient background
</div>

<h1 className="gradient-text text-6xl">
  Gradient text
</h1>
```

### Shadows & Glows

```tsx
<div className="shadow-ai1-lg">AI1 shadow</div>
<div className="glow-cyan">Cyan glow</div>
```

## 5. Dark Mode

Add a theme toggle button:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <Button 
      onClick={() => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
      }}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}
```

## 6. Common Patterns

### Hero Section

```tsx
<SectionWrapper variant="gradient" className="min-h-screen flex items-center">
  <div className="text-center space-y-8">
    <Headline as="h1" className="text-white" subtitle="Subtitle">
      Hero Title
    </Headline>
    <div className="flex gap-4 justify-center">
      <Button size="lg" variant="secondary">Primary CTA</Button>
      <Button size="lg" variant="outline" className="border-white text-white">
        Secondary CTA
      </Button>
    </div>
  </div>
</SectionWrapper>
```

### Feature Grid

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <Card key={feature.id} className="glass-card hover:shadow-ai1-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-electric-blue">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Stats Display

```tsx
import { StatBadge } from "@/components/ai1";

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <StatBadge value="10K+" label="Users" variant="electric" />
  <StatBadge value="99.9%" label="Uptime" variant="cyan" />
  <StatBadge value="50M+" label="API Calls" variant="purple" />
  <StatBadge value="24/7" label="Support" />
</div>
```

### Form Section

```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

<form className="space-y-4 max-w-md">
  <Input type="email" placeholder="Email address" />
  <Input type="password" placeholder="Password" />
  <Textarea placeholder="Your message" rows={4} />
  <Button type="submit" className="w-full">Submit</Button>
</form>
```

## 7. Typography Best Practices

```tsx
{/* Use font-heading for all headings */}
<h1 className="font-heading text-6xl font-bold">Main Heading</h1>
<h2 className="font-heading text-4xl font-bold">Section Heading</h2>
<h3 className="font-heading text-2xl font-semibold">Subsection</h3>

{/* Use font-sans (default) for body text */}
<p className="text-base">Body text automatically uses Inter</p>
<p className="text-lg text-muted-foreground">Large supporting text</p>

{/* Use gradient-text for emphasis */}
<h2 className="font-heading text-5xl font-bold gradient-text">
  Emphasized Heading
</h2>
```

## 8. Responsive Design

```tsx
{/* Mobile-first responsive classes */}
<div className="
  grid 
  grid-cols-1           /* 1 column on mobile */
  md:grid-cols-2        /* 2 columns on tablet */
  lg:grid-cols-3        /* 3 columns on desktop */
  gap-4 md:gap-6 lg:gap-8
">
  {/* Content */}
</div>

{/* Responsive text sizes */}
<h1 className="text-3xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>

{/* Responsive padding */}
<div className="p-4 md:p-8 lg:p-12">
  Content
</div>
```

## 9. Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start

# Or export static site (if configured)
npm run build && npm run export
```

## 10. Next Steps

- Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation
- Check [COMPONENT_USAGE.md](./COMPONENT_USAGE.md) for detailed component examples
- Explore [app/page.tsx](./app/page.tsx) to see all components in action
- Visit the showcase at http://localhost:3000 for interactive examples

## Tips

✅ **Do:**
- Use the custom AI1 components for consistent branding
- Combine glassmorphism with gradients for modern effects
- Test in both light and dark modes
- Use the gradient-text utility for hero headings
- Leverage StatBadge for metrics and KPIs

❌ **Don't:**
- Mix too many gradient variants on one page
- Overuse glassmorphism (use sparingly for impact)
- Forget to test responsive behavior
- Ignore dark mode styling
- Skip semantic HTML elements

## Need Help?

- 📚 Full documentation: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- 🔧 Component API: [COMPONENT_USAGE.md](./COMPONENT_USAGE.md)
- 🎨 Live examples: http://localhost:3000
- 💻 shadcn/ui docs: https://ui.shadcn.com
- 🎨 Tailwind docs: https://tailwindcss.com

Happy building! 🚀
