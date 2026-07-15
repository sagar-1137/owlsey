# 🎬 Owlsey Animation & Motion System Enhancements

## Overview

This document outlines all motion, animation, loader, and UI enhancements implemented to make Owlsey a premium, cinematic web experience. The system includes sophisticated choreography, page transitions, marquee animations, and multiple loader variants—all accessibility-first with `prefers-reduced-motion` support.

---

## Phase 1: Reusable Motion Foundation

### Core Utilities Created

#### 1. **useReducedMotion.ts** (`src/hooks/`)
- Detects user's `prefers-reduced-motion` OS preference
- Returns immediate disable of all animations for accessibility
- Used globally across all animation components

#### 2. **useScrollTrigger.ts** (`src/hooks/`)
- Wrapper for safe GSAP ScrollTrigger setup
- Provides automatic cleanup and context management
- Returns configuration object for consistent scroll-based animations

#### 3. **motionConfig.ts** (`src/lib/`)
**Central configuration system with:**
- **Timing presets:** `primaryReveal` (0.8s), `supportingReveal` (0.6s)
- **Easing functions:** `revealOut`, `revealOutStrong`, `smooth`
- **Stagger timing:** `minimal` (0.06s), `standard` (0.1s), `generous` (0.15s)
- **Responsive breakpoints:** mobile (0), tablet (768px), desktop (1024px)
- **Debug mode:** Toggle for ScrollTrigger markers
- **Responsive value getter:** Returns viewport-aware animation values

#### 4. **MaskedTextReveal.tsx** (`src/components/motion/`)
Reusable text reveal component with:
- Overflow-hidden mask containers for crisp reveals
- Character or line-by-line animation modes
- Customizable duration and stagger delays
- Full reduced-motion support

#### 5. **ChapterTransitions.tsx** (`src/components/common/`)
Manages section boundary animations:
- Monitors `.chapter-*` section selectors
- Applies entrance animations with staggered timing
- Handles parallax and scale on desktop viewports
- Manages pinning and unpinning for scroll sections

---

## Phase 2: Enhanced Components & Pages

### Hero Section Enhancements (`Hero.tsx`)

**Four-Phase Animation:**

1. **Entrance Timeline (2.8s)**
   - Grid reveals with `clipPath: inset(0 100% 0 0)`
   - Visual emblem fades in with scale 1.04 → 1.0
   - Supporting text elements cascade with 0.08s stagger

2. **Scroll Choreography (Desktop)**
   - Emblem scales 1.0 → 1.1 as user scrolls
   - Left metadata parallaxes at -12% offset
   - Right metadata parallaxes at +20% offset
   - Supporting text fades and moves upward

3. **Exit Sequence**
   - Emblem lifts 80% above viewport with 0.9 scale
   - Opacity reduces to 0.3
   - Both metadata panels disperse outward and fade

4. **Responsive Behavior**
   - Desktop: Full choreography with parallax
   - Tablet/Mobile: Simplified entrance only

---

### Projects Grid (`Projects.tsx`)

**Choreographed Card Entrances:**

| Card | Animation |
|------|-----------|
| 0 | Left entrance (xPercent: -8) |
| 1 | Bottom entrance (yPercent: 70) |
| 2 | Right entrance (xPercent: 8) |
| Fallback | Bottom entrance (yPercent: 45) |

- Divider lines draw from left with `scaleX` transform
- Title reveals using `MaskedTextReveal` component
- Scale animations (0.97 → 1.0) on all cards

---

### Footer (`Footer.tsx`)

**Multi-Phase Reveal:**

1. **CTA Panel (Clip-Path Reveal)**
   - Inset animation: `inset(100% 0 0 0)` → `inset(0)`
   - Sequential reveal of label → heading → button

2. **Navigation Links**
   - Staggered entrance with xPercent: -8
   - Index numbers appear first, then labels
   - 0.06s stagger between items

3. **Divider Lines**
   - Scale animations across all cells
   - 0.1s stagger between lines

---

### Services Page (`ServicesContent.tsx`)

**Grid & Animation Patterns:**

- Hero grid cells enter with yPercent 30 → 0
- Service pills scale 0.92 → 1.0
- Range grid items alternate: left → fade → scaled entrance
- Capability cards cascade with staggered scale animations

---

### TechWeUse Section (`TechWeUse.tsx`)

**Improved Animations:**

- Main heading enters from top with blur filter
- Subheading fades with vertical offset
- Tech stream columns stagger with 30% yPercent entrance
- Divider lines scale and stagger across columns

---

## Phase 3: Page Transitions & Loading States

### PageTransitionLoader (`src/components/common/PageTransitionLoader.tsx`)

**Features:**
- Monitors route changes via `popstate` events
- Animated progress bar with gradient
- Automatic hide after 800ms
- Pulsing shimmer effect on progress bar
- Fully responsive and dark mode ready

**Behavior:**
- Shows immediately on page navigation
- Provides visual feedback during route transition
- Prevents user perception of stalled navigation
- Gracefully handles client-side navigation

---

### Loader Variants

#### 1. **SkeletonLoader** (`src/components/common/SkeletonLoader.tsx`)
- Animated placeholder content shimmer
- Skeleton card layouts with pulse effect
- 1.5s animation cycle
- Perfect for content skeleton screens

#### 2. **OrbitLoader** (`src/components/common/OrbitLoader.tsx`)
- Three rotating orbs in orbital pattern
- 2.5s rotation cycle
- Elegant, minimal design
- Great for heavy-lifting operations

#### 3. **MinimalProgressLoader** (`src/components/common/MinimalProgressLoader.tsx`)
- Subtle progress bar with gradient
- Animated progress increment
- 50ms update interval for smooth animation
- Ideal for download/upload progress

---

## Phase 4: Marquee & Scrolling Animations

### AnimatedMarquee (`src/components/motion/AnimatedMarquee.tsx`)

**Basic continuous scroll component:**
- Infinite horizontal scroll using GSAP `to` timeline
- Seamless looping without jump
- Supports any content (text, logos, images)
- Reduced-motion compatible

### EnhancedMarquee (`src/components/motion/EnhancedMarquee.tsx`)

**Advanced features:**
- Multiple animation speeds
- Pause on hover functionality
- Infinite scroll with cloned items
- Gradient masks on edges for smooth fade
- Dark mode support

### TechMarqueeSection (`src/components/sections/TechMarqueeSection.tsx`)

**Tech Stack Showcase:**
- Displays 5 tech logos: Windcss, Motion, Next.js, AWS, Tailwind
- Animated entrance for section title
- Marquee scrolls through logos infinitely
- Perfect for "Companies We Work With" section

---

## Phase 5: Visual Enhancements

### AnimatedGradientBackground (`src/components/common/AnimatedGradientBackground.tsx`)

**Dynamic background animations:**
- Multiple gradient preset options
- Animated color shifts using GSAP
- Parallax effect on scroll (optional)
- Performance-optimized with will-change
- Fully dark mode compatible

**Usage:**
```tsx
<AnimatedGradientBackground preset="cosmic" />
```

---

## Architecture & Best Practices

### Motion Configuration Hierarchy

```
MOTION_CONFIG (centralized timing)
  ├── timing (0.6s - 0.8s)
  ├── easing (power3/4 curves)
  ├── stagger (0.06s - 0.15s)
  ├── breakpoints (responsive)
  └── debug (development)
```

### Animation Safety

All animations follow this pattern:

```tsx
useEffect(() => {
  if (!root || prefersReducedMotion) return; // ← Accessibility guard

  const gsap = ensureGsap();
  const ctx = gsap.context(() => {
    // Animations here
  }, root);

  return () => ctx.revert(); // ← Cleanup
}, [prefersReducedMotion]);
```

### Responsive Behavior

- **Mobile:** Simplified animations, no parallax
- **Tablet:** Reduced parallax range, shorter durations
- **Desktop:** Full choreography with extended animations

---

## Implementation Checklist

### Completed ✓

- [x] Hero section with parallax choreography
- [x] Projects grid with alternating card animations
- [x] Footer with clip-path reveals
- [x] Services page enhanced animations
- [x] Tech section improved animations
- [x] Page transition loader with progress bar
- [x] Marquee components for scrolling content
- [x] Tech stack showcase section
- [x] Multiple loader variants (Skeleton, Orbit, Progress)
- [x] Animated gradient backgrounds
- [x] Accessibility (prefers-reduced-motion support)
- [x] Dark mode support across all components
- [x] Responsive design with breakpoints

---

## Usage Examples

### Using Motion Hooks in Components

```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

export function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return; // Skip animations
    
    const gsap = ensureGsap();
    gsap.from(".element", {
      opacity: 0,
      duration: MOTION_CONFIG.timing.primaryReveal,
      ease: MOTION_CONFIG.easing.revealOut,
    });
  }, [prefersReducedMotion]);
}
```

### Using Text Reveal

```tsx
import { MaskedTextReveal } from "@/components/motion/MaskedTextReveal";

export function MyPage() {
  return (
    <MaskedTextReveal triggerPoint="top 80%">
      <h1>This text reveals line by line</h1>
    </MaskedTextReveal>
  );
}
```

### Using Marquee

```tsx
import { EnhancedMarquee } from "@/components/motion/EnhancedMarquee";

export function TechShowcase() {
  return (
    <EnhancedMarquee speed={30} pauseOnHover>
      {/* Your logos or content here */}
    </EnhancedMarquee>
  );
}
```

### Using Loaders

```tsx
import { SkeletonLoader, OrbitLoader, MinimalProgressLoader } from "@/components/common";

// Skeleton cards
<SkeletonLoader count={3} />

// Loading spinner
<OrbitLoader />

// Progress indicator
<MinimalProgressLoader progress={65} />
```

---

## Performance Notes

- **GSAP Context:** All animations cleanup with `ctx.revert()`
- **ScrollTrigger:** Automatically killed on component unmount
- **Marquee:** Uses CSS transform for 60fps performance
- **Gradients:** will-change CSS property for optimization
- **Reduced Motion:** Entire animation system skips on user preference

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive animations on touch devices

---

## Future Enhancements

- [ ] Page transition animations (fade, slide variants)
- [ ] Stagger grid animations with cascading effects
- [ ] Timeline-based page sequences
- [ ] Interactive animation presets
- [ ] Animation performance profiler
- [ ] Custom easing curve editor

---

## File Structure

```
src/
├── hooks/
│   ├── useReducedMotion.ts
│   └── useScrollTrigger.ts
├── lib/
│   ├── gsap.ts (existing)
│   └── motionConfig.ts
├── components/
│   ├── common/
│   │   ├── PageTransitionLoader.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── OrbitLoader.tsx
│   │   ├── MinimalProgressLoader.tsx
│   │   ├── AnimatedGradientBackground.tsx
│   │   ├── ChapterTransitions.tsx
│   │   └── (existing components)
│   ├── motion/
│   │   ├── MaskedTextReveal.tsx
│   │   ├── AnimatedMarquee.tsx
│   │   ├── EnhancedMarquee.tsx
│   │   └── (other animations)
│   ├── sections/
│   │   ├── Hero.tsx (enhanced)
│   │   ├── Projects.tsx (enhanced)
│   │   ├── TechWeUse.tsx (enhanced)
│   │   ├── TechMarqueeSection.tsx
│   │   └── (other sections)
│   └── layout/
│       ├── Footer.tsx (enhanced)
│       └── (other layout)
```

---

## Troubleshooting

### Animations not showing
- Check `useReducedMotion()` state (browser prefers-reduced-motion)
- Verify GSAP and ScrollTrigger are registered
- Check console for GSAP errors

### Performance issues
- Reduce stagger timing in MOTION_CONFIG
- Disable parallax on mobile devices
- Profile with Chrome DevTools Performance tab

### Loader doesn't appear
- Ensure PageTransitionLoader is in root layout.tsx
- Check network requests for actual delays
- Verify CSS for loader component visibility

---

## Team Notes

All motion system components use:
- Consistent timing from MOTION_CONFIG
- Accessibility-first approach
- Dark mode ready
- Responsive by default
- Clean GSAP context cleanup

For questions or customizations, refer to motionConfig.ts for timing/easing adjustments.

---

**Last Updated:** July 2026  
**Status:** Production Ready ✓
