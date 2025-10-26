# AI1 Design Tokens Reference

Quick reference for all design tokens in the AI1 Design System.

## Colors

### Brand Colors

| Token | Light Mode | Dark Mode | Tailwind Class |
|-------|-----------|-----------|----------------|
| Deep Blue | `#0A1929` | `#0F172A` | `.bg-deep-blue` `.text-deep-blue` |
| Electric Blue | `#2563EB` | `#3B82F6` | `.bg-electric-blue` `.text-electric-blue` |
| Cyan | `#06B6D4` | `#22D3EE` | `.bg-cyan` `.text-cyan` |
| Teal | `#14B8A6` | `#2DD4BF` | `.bg-teal` `.text-teal` |
| Purple | `#7C3AED` | `#8B5CF6` | `.bg-purple` `.text-purple` |
| Purple Light | `#A78BFA` | `#C4B5FD` | `.bg-purple-light` `.text-purple-light` |

### Semantic Colors

| Token | Purpose | Light | Dark |
|-------|---------|-------|------|
| Primary | Main actions | `#2563EB` | `#3B82F6` |
| Secondary | Secondary actions | `#06B6D4` | `#22D3EE` |
| Accent | Highlights | `#7C3AED` | `#8B5CF6` |
| Destructive | Errors/Delete | `#EF4444` | `#F87171` |
| Muted | Backgrounds | `#F1F5F9` | `#1E293B` |
| Border | Borders | `#E2E8F0` | `#334155` |

## Typography

### Font Families

| Token | Font | CSS Variable | Tailwind |
|-------|------|--------------|----------|
| Sans (Body) | Inter | `--font-inter` | `.font-sans` |
| Heading | Sora | `--font-sora` | `.font-heading` |

### Type Scale

| Name | Size | Rem | Pixels | Use Case |
|------|------|-----|--------|----------|
| `text-xs` | 0.75rem | 0.75 | 12px | Captions, fine print |
| `text-sm` | 0.875rem | 0.875 | 14px | Small text, metadata |
| `text-base` | 1rem | 1 | 16px | Body text (default) |
| `text-lg` | 1.125rem | 1.125 | 18px | Lead paragraphs |
| `text-xl` | 1.25rem | 1.25 | 20px | Small headings |
| `text-2xl` | 1.5rem | 1.5 | 24px | Section headings |
| `text-3xl` | 1.875rem | 1.875 | 30px | Page titles |
| `text-4xl` | 2.25rem | 2.25 | 36px | Large headings |
| `text-5xl` | 3rem | 3 | 48px | Hero text |
| `text-6xl` | 3.75rem | 3.75 | 60px | Extra large displays |

### Font Weights

- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

## Spacing

### Spacing Scale

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `--spacing-xs` | 0.5rem | 8px | Tight spacing |
| `--spacing-sm` | 0.75rem | 12px | Small gaps |
| `--spacing-md` | 1rem | 16px | Standard spacing |
| `--spacing-lg` | 1.5rem | 24px | Large spacing |
| `--spacing-xl` | 2rem | 32px | Section spacing |
| `--spacing-2xl` | 3rem | 48px | Large sections |
| `--spacing-3xl` | 4rem | 64px | Extra large sections |

### Tailwind Spacing

Common padding/margin values:
- `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)
- `m-2` (8px), `m-4` (16px), `m-6` (24px), `m-8` (32px)
- `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-sm` | calc(--radius - 4px) | Small elements, badges |
| `--radius-md` | calc(--radius - 2px) | Buttons, inputs |
| `--radius-lg` | 0.75rem (12px) | Cards, dialogs |
| `--radius-xl` | calc(--radius + 4px) | Large cards |
| `--radius-2xl` | calc(--radius + 8px) | Hero sections |

### Tailwind Classes

- `rounded-sm` - Small radius
- `rounded-md` - Medium radius
- `rounded-lg` - Large radius
- `rounded-xl` - Extra large
- `rounded-2xl` - 2X large
- `rounded-full` - Fully rounded (circles)

## Shadows

### AI1 Custom Shadows

| Class | Effect | Color |
|-------|--------|-------|
| `.shadow-ai1` | Standard shadow | Electric Blue tint |
| `.shadow-ai1-lg` | Large shadow | Electric Blue tint |
| `.shadow-electric` | Medium shadow | Cyan tint |
| `.shadow-purple` | Medium shadow | Purple tint |

### Glow Effects

| Class | Effect |
|-------|--------|
| `.glow-ai1` | Electric Blue glow |
| `.glow-cyan` | Cyan glow |
| `.glow-purple` | Purple glow |

## Gradients

### Background Gradients

| Class | Gradient |
|-------|----------|
| `.gradient-ai1` | Blue → Purple → Cyan (135deg) |
| `.gradient-electric` | Blue → Cyan (90deg) |
| `.gradient-purple` | Purple → Purple Light (135deg) |

### Text Gradient

| Class | Effect |
|-------|--------|
| `.gradient-text` | AI1 gradient applied to text |

## Glassmorphism

| Class | Effect |
|-------|--------|
| `.glass` | Light glass (white with blur) |
| `.glass-dark` | Dark glass (deep blue with blur) |
| `.glass-card` | Enhanced glass for cards |

## Breakpoints

| Breakpoint | Min Width | Tailwind Prefix |
|------------|-----------|-----------------|
| Mobile | < 640px | (default) |
| Tablet | 640px | `sm:` |
| Desktop | 768px | `md:` |
| Large Desktop | 1024px | `lg:` |
| Extra Large | 1280px | `xl:` |
| 2X Large | 1536px | `2xl:` |

## CSS Variables

### Color Variables

```css
/* Brand Colors */
var(--deep-blue)
var(--electric-blue)
var(--cyan)
var(--teal)
var(--purple)
var(--purple-light)

/* Semantic */
var(--primary)
var(--secondary)
var(--accent)
var(--muted)
var(--border)
var(--destructive)

/* Base */
var(--background)
var(--foreground)
var(--card)
var(--card-foreground)
```

### Typography Variables

```css
var(--font-inter)      /* Inter font */
var(--font-sora)       /* Sora font */
var(--text-xs)         /* 0.75rem */
var(--text-sm)         /* 0.875rem */
var(--text-base)       /* 1rem */
/* ... etc */
```

### Spacing Variables

```css
var(--spacing-xs)      /* 0.5rem */
var(--spacing-sm)      /* 0.75rem */
var(--spacing-md)      /* 1rem */
var(--spacing-lg)      /* 1.5rem */
var(--spacing-xl)      /* 2rem */
var(--spacing-2xl)     /* 3rem */
var(--spacing-3xl)     /* 4rem */
```

### Radius Variables

```css
var(--radius)          /* Base radius (0.75rem) */
var(--radius-sm)
var(--radius-md)
var(--radius-lg)
var(--radius-xl)
var(--radius-2xl)
```

## Quick Usage Examples

### Colors

```tsx
<div className="bg-electric-blue text-white">Electric Blue</div>
<div className="bg-gradient-to-r from-cyan to-purple">Gradient</div>
<p className="text-muted-foreground">Muted text</p>
```

### Typography

```tsx
<h1 className="font-heading text-6xl font-bold">Heading</h1>
<p className="font-sans text-base">Body text</p>
<span className="text-sm text-muted-foreground">Caption</span>
```

### Spacing

```tsx
<div className="p-8 space-y-6">
  <div className="mb-4">Section</div>
  <div className="mt-8">Another section</div>
</div>
```

### Shadows & Effects

```tsx
<div className="shadow-ai1-lg rounded-xl">Card</div>
<div className="glass-card p-6">Glass effect</div>
<h1 className="gradient-text">Gradient text</h1>
<div className="glow-cyan">Glowing element</div>
```

### Responsive

```tsx
<div className="text-base md:text-lg lg:text-xl">Responsive text</div>
<div className="p-4 md:p-8 lg:p-12">Responsive padding</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">Grid</div>
```

## Dark Mode

All colors automatically adjust for dark mode. Use `dark:` prefix for custom overrides:

```tsx
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">Text</p>
</div>
```

Toggle dark mode:
```tsx
document.documentElement.classList.toggle("dark");
```

## Component Tokens

### Button Variants

- `default` - Primary electric blue
- `secondary` - Cyan/teal
- `outline` - Transparent with border
- `ghost` - Transparent, no border
- `destructive` - Red for delete actions

### Button Sizes

- `sm` - Small (height: 36px)
- `default` - Medium (height: 40px)
- `lg` - Large (height: 44px)

### Badge Variants

- `default` - Primary
- `secondary` - Muted
- `outline` - Transparent with border
- `destructive` - Error state

---

**Version**: 1.0.0  
**Last Updated**: 2024

For more details, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
