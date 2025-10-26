# AI1 Design System

A comprehensive design system built with Next.js, Tailwind CSS, and shadcn/ui, featuring AI-focused brand colors, custom components, and modern UI utilities.

## Features

- 🎨 **AI1 Brand Colors**: Deep Blue, Electric Blue, Cyan/Teal, Purple gradient, and neutrals
- 🔤 **Typography System**: Inter + Sora fonts via next/font with scalable type scale
- 🎭 **Light/Dark Mode**: Full support for both themes with carefully crafted palettes
- ✨ **Glassmorphism**: Modern translucent UI effects and utilities
- 🌈 **Gradient Utilities**: Pre-built gradients for backgrounds and text
- 📦 **50+ Components**: All shadcn/ui components + custom AI1 components
- 🎯 **Accessible**: WCAG 2.1 AA compliant with focus states and semantic HTML
- 📱 **Responsive**: Mobile-first design with responsive utilities

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit [http://localhost:3000](http://localhost:3000) to see the design system showcase.

## Brand Colors

### Primary Palette

- **Deep Blue**: `#0A1929` (light) / `#0F172A` (dark)
- **Electric Blue**: `#2563EB` (light) / `#3B82F6` (dark)
- **Cyan**: `#06B6D4` (light) / `#22D3EE` (dark)
- **Teal**: `#14B8A6` (light) / `#2DD4BF` (dark)
- **Purple**: `#7C3AED` (light) / `#8B5CF6` (dark)
- **Purple Light**: `#A78BFA` (light) / `#C4B5FD` (dark)

### Usage

```tsx
// Tailwind classes
<div className="bg-electric-blue text-white">
  <h1 className="text-deep-blue">Heading</h1>
</div>

// CSS variables
.custom-element {
  background: var(--electric-blue);
  color: var(--cyan);
}
```

## Typography

### Fonts

- **Inter** (Primary): Body text, UI elements
- **Sora** (Headings): Headlines, titles, emphasis

### Usage

```tsx
<h1 className="font-heading text-6xl font-bold">
  Headline with Sora
</h1>

<p className="font-sans text-base">
  Body text with Inter
</p>
```

## Components

### shadcn/ui Components

All standard shadcn/ui components are included and styled with AI1 branding:

- Button, Input, Textarea, Select
- Dialog, Sheet, Dropdown Menu
- Card, Badge, Skeleton
- Toggle, Accordion, Navigation Menu

### AI1 Custom Components

#### SectionWrapper

Container component for consistent section spacing.

```tsx
import { SectionWrapper } from "@/components/ai1";

<SectionWrapper variant="glass" id="features">
  <h2>Features</h2>
</SectionWrapper>
```

#### Headline

Branded headline with gradient and styling options.

```tsx
import { Headline } from "@/components/ai1";

<Headline 
  as="h1" 
  variant="gradient"
  subtitle="Your subtitle here"
>
  Main Headline
</Headline>
```

#### GradientDivider

Visual separator with gradient styling.

```tsx
import { GradientDivider } from "@/components/ai1";

<GradientDivider variant="ai1" height="lg" />
```

#### CTABanner

Call-to-action banner with actions.

```tsx
import { CTABanner } from "@/components/ai1";

<CTABanner
  title="Ready to get started?"
  description="Join thousands using AI1"
  variant="gradient"
  primaryAction={{ label: "Get Started", href: "/signup" }}
  secondaryAction={{ label: "Learn More", href: "/docs" }}
/>
```

#### StatBadge

Display statistics with style.

```tsx
import { StatBadge } from "@/components/ai1";

<StatBadge
  value="99.9%"
  label="Uptime"
  variant="electric"
  trend={{ value: 2.5, direction: "up" }}
/>
```

## Utilities

### Glassmorphism

```tsx
<div className="glass-card p-6 rounded-xl">
  Translucent glass effect
</div>
```

### Gradients

```tsx
// Background gradient
<div className="gradient-ai1 p-8">
  Content with gradient background
</div>

// Text gradient
<h1 className="gradient-text text-6xl">
  Gradient text
</h1>
```

### Shadows

```tsx
<div className="shadow-ai1-lg">
  Element with AI1 shadow
</div>

<div className="glow-cyan">
  Element with cyan glow
</div>
```

## Documentation

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for comprehensive documentation including:

- Complete color palette
- Typography scale
- Spacing system
- Component API
- Usage examples
- Best practices
- Accessibility guidelines

## File Structure

```
/app
  /globals.css         # Theme tokens, utilities
  /layout.tsx          # Root layout with fonts
  /page.tsx            # Showcase page
/components
  /ui                  # shadcn/ui components
  /ai1                 # AI1 custom components
    /section-wrapper.tsx
    /headline.tsx
    /gradient-divider.tsx
    /cta-banner.tsx
    /stat-badge.tsx
    /index.ts
/lib
  /utils.ts            # Utility functions
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Fonts**: next/font (Inter + Sora)
- **TypeScript**: Full type safety
- **React**: 19.2.0

## Dark Mode

Toggle dark mode by adding the `dark` class to the `<html>` element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

All components automatically adapt to the current theme.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For questions or issues, refer to the [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) documentation.
