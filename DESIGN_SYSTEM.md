# AI1 Design System

## Overview

The AI1 Design System is built on Next.js, Tailwind CSS, and shadcn/ui, providing a comprehensive set of tokens, components, and utilities for building modern AI-focused applications.

## Brand Colors

### Primary Palette

- **Deep Blue** (#0A1929 / #0F172A dark): Main brand color, representing trust and depth
- **Electric Blue** (#2563EB / #3B82F6 dark): Primary action color, energetic and modern
- **Cyan/Teal** (#06B6D4 / #22D3EE dark): Secondary accent, fresh and tech-forward
- **Purple** (#7C3AED / #8B5CF6 dark): Accent color for AI/ML features
- **Purple Light** (#A78BFA / #C4B5FD dark): Subtle accent variant

### Usage in CSS

Brand colors are available as CSS variables and Tailwind utilities:

```css
/* CSS Variables */
var(--deep-blue)
var(--electric-blue)
var(--cyan)
var(--teal)
var(--purple)
var(--purple-light)

/* Tailwind Classes */
.text-deep-blue
.bg-electric-blue
.border-cyan
```

## Typography

### Font Families

- **Primary**: Inter (via next/font)
  - Used for body text, UI elements, and general content
  - Variable: `--font-inter` / `font-sans`
  
- **Headings**: Sora (via next/font)
  - Used for headlines, titles, and emphasis
  - Variable: `--font-sora` / `font-heading`

### Type Scale

| Class | Size | Use Case |
|-------|------|----------|
| `text-xs` | 0.75rem | Fine print, captions |
| `text-sm` | 0.875rem | Secondary text |
| `text-base` | 1rem | Body text |
| `text-lg` | 1.125rem | Lead paragraphs |
| `text-xl` | 1.25rem | Subheadings |
| `text-2xl` | 1.5rem | Section titles |
| `text-3xl` | 1.875rem | Page titles |
| `text-4xl` | 2.25rem | Hero text |
| `text-5xl` | 3rem | Large displays |
| `text-6xl` | 3.75rem | Extra large displays |

## Spacing Scale

Consistent spacing tokens for layout and component spacing:

```css
--spacing-xs: 0.5rem   (8px)
--spacing-sm: 0.75rem  (12px)
--spacing-md: 1rem     (16px)
--spacing-lg: 1.5rem   (24px)
--spacing-xl: 2rem     (32px)
--spacing-2xl: 3rem    (48px)
--spacing-3xl: 4rem    (64px)
```

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-sm` | calc(--radius - 4px) | Small elements |
| `--radius-md` | calc(--radius - 2px) | Default buttons |
| `--radius-lg` | 0.75rem | Cards, dialogs |
| `--radius-xl` | calc(--radius + 4px) | Large containers |
| `--radius-2xl` | calc(--radius + 8px) | Hero sections |

## Shadows

### AI1 Themed Shadows

```css
.shadow-ai1      /* Standard AI1 shadow with blue tint */
.shadow-ai1-lg   /* Large AI1 shadow for elevated elements */
.shadow-electric /* Cyan-tinted shadow */
.shadow-purple   /* Purple-tinted shadow */
```

### Glow Effects

```css
.glow-ai1    /* Electric blue glow */
.glow-cyan   /* Cyan glow */
.glow-purple /* Purple glow */
```

## Glassmorphism Utilities

Create modern, translucent glass effects:

```css
.glass           /* Light glass effect */
.glass-dark      /* Dark glass effect */
.glass-card      /* Glass effect for cards */
```

**Example:**
```jsx
<div className="glass-card p-6 rounded-xl">
  Content with glassmorphism effect
</div>
```

## Gradient Utilities

### Background Gradients

```css
.gradient-ai1      /* Main AI1 gradient: Blue → Purple → Cyan */
.gradient-electric /* Electric gradient: Blue → Cyan */
.gradient-purple   /* Purple gradient: Purple → Purple Light */
```

### Text Gradients

```css
.gradient-text /* Applies AI1 gradient to text */
```

**Example:**
```jsx
<h1 className="gradient-text text-6xl font-bold">
  AI-Powered Solutions
</h1>
```

## shadcn/ui Components

All shadcn components are customized with AI1 brand colors and support both light and dark modes.

### Available Components

- **Button**: Primary, secondary, outline, ghost variants
- **Input**: Text inputs with AI1 styling
- **Textarea**: Multi-line text inputs
- **Select**: Dropdown selection
- **Dialog**: Modal dialogs
- **Sheet**: Slide-out panels
- **Dropdown Menu**: Context menus
- **Card**: Content containers
- **Toggle**: Toggle switches
- **Accordion**: Collapsible sections
- **Navigation Menu**: Navigation components
- **Badge**: Status indicators
- **Skeleton**: Loading states

### Component Import

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
```

## AI1 Custom Components

### SectionWrapper

Container component for consistent section spacing and styling.

```tsx
import { SectionWrapper } from "@/components/ai1";

<SectionWrapper variant="glass" id="features">
  <h2>Features</h2>
</SectionWrapper>
```

**Props:**
- `variant`: "default" | "glass" | "gradient"
- `className`: Additional CSS classes
- `id`: Section ID for anchor links

### Headline

Branded headline component with gradient and styling options.

```tsx
import { Headline } from "@/components/ai1";

<Headline 
  as="h1" 
  variant="gradient"
  subtitle="Build the future with AI"
>
  Welcome to AI1
</Headline>
```

**Props:**
- `as`: h1-h6 (default: h2)
- `variant`: "default" | "gradient" | "electric"
- `subtitle`: Optional subtitle text
- `className`: Additional CSS classes

### GradientDivider

Visual separator with gradient styling.

```tsx
import { GradientDivider } from "@/components/ai1";

<GradientDivider variant="ai1" height="lg" />
```

**Props:**
- `variant`: "ai1" | "electric" | "purple"
- `height`: "sm" | "md" | "lg"
- `className`: Additional CSS classes

### CTABanner

Call-to-action banner with actions.

```tsx
import { CTABanner } from "@/components/ai1";

<CTABanner
  title="Ready to get started?"
  description="Join thousands of users already using AI1"
  variant="gradient"
  primaryAction={{
    label: "Get Started",
    href: "/signup"
  }}
  secondaryAction={{
    label: "Learn More",
    href: "/docs"
  }}
/>
```

**Props:**
- `title`: Main heading
- `description`: Supporting text
- `variant`: "default" | "gradient" | "glass"
- `primaryAction`: { label, onClick?, href? }
- `secondaryAction`: { label, onClick?, href? }
- `children`: Custom content
- `className`: Additional CSS classes

### StatBadge

Display statistics and metrics with style.

```tsx
import { StatBadge } from "@/components/ai1";

<StatBadge
  value="99.9%"
  label="Uptime"
  variant="electric"
  trend={{ value: 2.5, direction: "up" }}
  icon={<TrendingUpIcon />}
/>
```

**Props:**
- `value`: Stat value (string or number)
- `label`: Description
- `variant`: "default" | "electric" | "purple" | "cyan"
- `icon`: Optional React node icon
- `trend`: { value: number, direction: "up" | "down" }
- `className`: Additional CSS classes

## Dark Mode

The design system fully supports dark mode using Tailwind's dark mode utilities.

### Toggling Dark Mode

Add the `dark` class to the `<html>` element:

```tsx
// Add this to your layout or a theme provider
<html className="dark">
```

### Dark Mode Variants

Use Tailwind's `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Content
</div>
```

## Best Practices

### Color Usage

1. **Primary (Electric Blue)**: Use for primary actions, links, and key interactive elements
2. **Secondary (Cyan)**: Use for secondary actions and complementary elements
3. **Accent (Purple)**: Use sparingly for highlighting AI/ML features
4. **Deep Blue**: Use for headers, important text, and grounding elements

### Typography

1. Use **Sora** for all headings and display text
2. Use **Inter** for body text, UI elements, and forms
3. Maintain consistent hierarchy using the type scale
4. Ensure sufficient contrast in both light and dark modes

### Spacing

1. Use the spacing scale tokens for consistency
2. Prefer larger spacing on larger screens (responsive)
3. Maintain consistent padding within component variants

### Components

1. Always use shadcn components for standard UI elements
2. Use AI1 custom components for branded sections
3. Combine glassmorphism with gradients sparingly
4. Ensure all interactive elements have focus states

### Accessibility

1. Maintain WCAG 2.1 AA contrast ratios
2. Include focus indicators on all interactive elements
3. Use semantic HTML elements
4. Provide alt text for images
5. Ensure keyboard navigation works properly

## Examples

### Hero Section

```tsx
import { SectionWrapper, Headline, CTABanner } from "@/components/ai1";
import { Button } from "@/components/ui/button";

<SectionWrapper variant="gradient" className="min-h-screen flex items-center">
  <div className="text-center space-y-8">
    <Headline 
      as="h1" 
      className="text-white"
      subtitle="The next generation of AI-powered tools"
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
```

### Feature Cards with Glass Effect

```tsx
import { Card } from "@/components/ui/card";

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <Card key={feature.id} className="glass-card p-6 hover:shadow-ai1-lg transition-shadow">
      <h3 className="text-xl font-heading font-bold text-electric-blue mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </Card>
  ))}
</div>
```

### Stats Section

```tsx
import { StatBadge } from "@/components/ai1";

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatBadge value="10K+" label="Active Users" variant="electric" />
  <StatBadge value="99.9%" label="Uptime" variant="cyan" />
  <StatBadge value="50M+" label="API Calls" variant="purple" />
  <StatBadge value="24/7" label="Support" variant="default" />
</div>
```

## File Structure

```
/app
  /globals.css         # Global styles, theme tokens, utilities
  /layout.tsx          # Root layout with fonts
/components
  /ui                  # shadcn/ui components
    /button.tsx
    /card.tsx
    /...
  /ai1                 # AI1 custom components
    /section-wrapper.tsx
    /headline.tsx
    /gradient-divider.tsx
    /cta-banner.tsx
    /stat-badge.tsx
    /index.ts
/lib
  /utils.ts            # Utility functions (cn, etc.)
```

## Getting Started

### Installation

The design system is already set up in this project. To use it in a new project:

1. Install dependencies:
```bash
npm install next react react-dom
npm install -D tailwindcss typescript @types/react @types/node
```

2. Copy the following files:
   - `app/globals.css` - Theme tokens and utilities
   - `components/ai1/*` - Custom components
   - `components/ui/*` - shadcn components

3. Configure fonts in `app/layout.tsx`

### Usage

Import and use components:

```tsx
import { Button } from "@/components/ui/button";
import { SectionWrapper, Headline } from "@/components/ai1";

export default function Page() {
  return (
    <SectionWrapper>
      <Headline as="h1" variant="gradient">
        Hello AI1
      </Headline>
      <Button>Get Started</Button>
    </SectionWrapper>
  );
}
```

## Support

For questions or contributions, refer to the project README or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2024
