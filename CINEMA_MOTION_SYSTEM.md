# Owlsey Premium Cinema Motion System

Complete implementation of premium cinematic motion design for the Owlsey portfolio. This system transforms the site into a sophisticated, motion-rich experience with full-screen opening sequences, scroll-driven transitions, and choreographed section reveals.

## System Overview

The cinema motion system consists of interconnected components that work together to create a cohesive, premium experience:

1. **Opening Experience** - Full-screen intro with typed headline
2. **Intro-to-Hero Transition** - Scroll-controlled transformation
3. **Chapter Routes** - Full-screen pinned sections
4. **Hero Assembly** - Sequential reveal animations
5. **Page Animations** - Enhanced section choreography

## Key Components

### 1. OpeningExperience Component

**Location:** `src/components/sections/OpeningExperience.tsx`

Creates a full-screen, centered opening experience with typewriter headline animation.

**Features:**
- Typewriter effect on "SOFTWARE SHAPED AROUND YOUR BUSINESS"
- Animated scroll indicator (pulses on loop)
- Subtitle fade-in after headline completes
- 100vh viewport height
- Supports reduced-motion preference
- Automatic cleanup on unmount

**Usage:**
```tsx
import { OpeningExperience } from "@/components/sections/OpeningExperience";

export default function Page() {
  return <OpeningExperience />;
}
```

**Animation Timeline:**
- T+0s: Container fade in (0.6s)
- T+0.4s: Typewriter headline (adjustable per character count)
- T+1.2s: Scroll indicator pulse begins
- T+1.4s: Subtitle fade-in

### 2. IntroToHeroTransition Component

**Location:** `src/components/sections/IntroToHeroTransition.tsx`

Manages scroll-controlled transformation of headline from full-screen to hero position.

**Features:**
- Scroll-driven ScrollTrigger timeline
- Headline moves from center to top-left
- Parallax on supporting elements
- Optional callback on transition completion
- Responsive scrub timing

**Usage:**
```tsx
import { IntroToHeroTransition } from "@/components/sections/IntroToHeroTransition";

export default function Page() {
  return (
    <IntroToHeroTransition 
      onTransitionComplete={() => console.log("Transition complete")}
    />
  );
}
```

**Scroll-Driven Behavior:**
- Headline: Moves -35% viewport height, scales from 1.0 → 0.7
- Supporting text: Fades out and moves up 20px
- Hero content: Reveals with opacity fade

### 3. ChapterRoutes Component

**Location:** `src/components/sections/ChapterRoutes.tsx`

Creates full-screen pinned chapter sections that reveal on scroll.

**Features:**
- Multiple chapter support
- Title and content animation on scroll
- Divider line draws on entrance
- Responsive pinning (desktop only)
- Content stagger animations
- Accessibility-first markup

**Usage:**
```tsx
import { ChapterRoutes } from "@/components/sections/ChapterRoutes";

const chapters = [
  {
    id: "chapter-1",
    title: "ONE CLEAR ROUTE",
    subtitle: "From vision to execution",
    content: <div>Your custom content here</div>,
  },
  // ... more chapters
];

export default function Page() {
  return <ChapterRoutes chapters={chapters} />;
}
```

**Section Heights:**
- Desktop: Full screen (100vh) with optional pinning
- Tablet: Reduced height (80-90vh)
- Mobile: Natural scroll flow, no pinning

### 4. HeroAssembly Component

**Location:** `src/components/sections/HeroAssembly.tsx`

Sequential reveal animation for hero content boxes with hover interactions.

**Features:**
- Box-by-box reveal with stagger
- Hover lift effect on boxes
- Container opacity fade-in
- Scale animation (0.96 → 1.0)
- Cleanup on unmount

**Usage:**
```tsx
import { HeroAssembly } from "@/components/sections/HeroAssembly";

export default function Page() {
  return (
    <HeroAssembly>
      {/* Hero boxes with data-hero-box attributes */}
    </HeroAssembly>
  );
}
```

**Box Reveal Pattern:**
- Duration: 0.85s per box
- Stagger: Automatically distributed across total timeline
- Entry: y: 30px, opacity: 0, scale: 0.96
- Exit: y: -2px on hover (lift effect)

### 5. Hooks & Utilities

#### useScrollTrigger Hook

**Location:** `src/hooks/useScrollTrigger.ts`

Safe wrapper for ScrollTrigger animations with automatic cleanup.

**Usage:**
```tsx
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

export function MyComponent() {
  const ref = useRef<HTMLElement>(null);
  
  useScrollTrigger(
    ref,
    (gsap) => {
      // Animation code here
      gsap.to(target, { opacity: 1 });
    },
    [dependencies]
  );
  
  return <section ref={ref}>...</section>;
}
```

#### useReducedMotion Hook

**Location:** `src/hooks/useReducedMotion.ts`

Detects user's prefers-reduced-motion preference.

**Usage:**
```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <PlainLayout />; // Static layout
  }
  
  return <AnimatedLayout />;
}
```

#### MOTION_CONFIG Object

**Location:** `src/lib/motionConfig.ts`

Centralized configuration for all motion parameters.

**Key Properties:**
```typescript
MOTION_CONFIG = {
  timing: {
    primaryReveal: 1.0,      // 1.0s for main reveals
    supportingReveal: 0.7,   // 0.7s for secondary
    hover: 0.25,             // Quick hover response
  },
  easing: {
    revealOut: "power3.out",
    revealOutStrong: "power4.out",
    smooth: "power2.inOut",
  },
  stagger: {
    minimal: 0.04,    // Tight stagger
    standard: 0.12,   // Normal spacing
  },
  parallax: {
    desktopScrub: 0.8,    // Smooth scroll parallax
    tabletScrub: 0.6,
    mobileScrub: false,   // Disabled on mobile
  },
}
```

## Animation Patterns

### Text Reveal (Line Masks)

```tsx
// Setup: Wrap text in overflow-hidden containers
<div className="overflow-hidden">
  <span className="inline-block">Your text</span>
</div>

// Animation:
gsap.from(textElement, {
  yPercent: 105,
  opacity: 0,
  duration: MOTION_CONFIG.timing.primaryReveal,
  ease: MOTION_CONFIG.easing.revealOutStrong,
});
```

### Parallax Scroll

```tsx
// Desktop only, with scrub timing
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: element,
    start: "top center",
    end: "bottom center",
    scrub: MOTION_CONFIG.parallax.desktopScrub,
  },
});
```

### Staggered Entrance

```tsx
// Sequential reveals with calculated stagger
gsap.from(items, {
  opacity: 0,
  y: 30,
  duration: MOTION_CONFIG.timing.primaryReveal,
  stagger: MOTION_CONFIG.stagger.standard,
  ease: MOTION_CONFIG.easing.revealOut,
});
```

## Accessibility & Performance

### Reduced Motion Support

All components check `useReducedMotion()` and:
- Disable animations entirely
- Show content immediately (no delay)
- Disable parallax/scrub effects
- Maintain all functionality

### Mobile Optimization

- Animations adapted to screen size
- Pinning disabled on mobile
- Reduced parallax speeds
- No horizontal overflow
- Touch-friendly hover states

### Performance Guidelines

**Do:**
- Animate opacity, transform only
- Use `will-change` temporarily
- Batch similar animations
- Cleanup ScrollTrigger on unmount

**Don't:**
- Animate layout properties (width, height)
- Use character-by-character animations
- Leave ScrollTrigger instances hanging
- Animate on every scroll event

## Integration Guide

### Adding to Existing Page

```tsx
import { OpeningExperience } from "@/components/sections/OpeningExperience";
import { ChapterRoutes } from "@/components/sections/ChapterRoutes";
import { HeroAssembly } from "@/components/sections/HeroAssembly";

export default function Home() {
  return (
    <>
      <OpeningExperience />
      <ChapterRoutes chapters={myChapters} />
      <Hero />
      <HeroAssembly />
      {/* Rest of page */}
    </>
  );
}
```

### Creating Custom Animations

```tsx
"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

export function MyAnimatedComponent() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: MOTION_CONFIG.timing.primaryReveal,
        ease: MOTION_CONFIG.easing.revealOut,
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return <section ref={ref}>{/* Content */}</section>;
}
```

## Timing Reference

All timings use MOTION_CONFIG for consistency:

| Purpose | Duration | Ease |
|---------|----------|------|
| Primary Reveal | 1.0s | power3.out |
| Supporting Reveal | 0.7s | power3.out |
| Hover Response | 0.25s | power2.out |
| Logo Entrance | 0.6s | power2.out |
| Typewriter | ~0.055s per char | none |
| Scroll Parallax | 0.6-1.0s scrub | none |

## Debugging

### Enable Debug Markers

Set in `motionConfig.ts`:
```typescript
MOTION_CONFIG.debug = true;  // Shows ScrollTrigger markers
```

### Console Logging

Add console.log statements in animation callbacks:
```typescript
gsap.to(element, {
  opacity: 1,
  onStart: () => console.log("[v0] Animation started"),
  onComplete: () => console.log("[v0] Animation complete"),
});
```

### Check Browser Console

- Verify no React Strict Mode double-calls
- Watch for ScrollTrigger memory leaks
- Monitor 60fps performance via DevTools

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (tested 15+)
- Mobile browsers: Optimized, reduced features
- IE11: Not supported (uses modern APIs)

## Files Modified/Created

**New Files:**
- `src/components/sections/OpeningExperience.tsx`
- `src/components/sections/IntroToHeroTransition.tsx`
- `src/components/sections/ChapterRoutes.tsx`
- `src/components/sections/HeroAssembly.tsx`
- `src/hooks/useScrollTrigger.ts`

**Modified Files:**
- `src/components/page/HomeContent.tsx` - Integrated cinema components
- `src/app/globals.css` - Added fade-in animation keyframe

**Existing (Enhanced):**
- `src/components/sections/Hero.tsx` - Typewriter and entrance animations
- `src/components/sections/Projects.tsx` - Editorial grid choreography
- `src/components/layout/Footer.tsx` - CTA and footer reveals

## Version History

- **v1.0.0** (Current) - Initial cinema motion system
  - Full-screen opening with typed headline
  - Scroll-driven intro-to-hero transition
  - Chapter routes with pinned sections
  - Hero assembly with sequential reveals
  - All sections with reduced-motion support
  - Responsive animations for all devices

## Next Steps

1. **Customize Chapter Content** - Add your specific business chapters
2. **Adjust Timing** - Modify `MOTION_CONFIG` for your brand pace
3. **Add Page-Specific Animations** - Use hooks in new pages
4. **Performance Testing** - Monitor Web Vitals on deployment
5. **User Feedback** - Gather data on animation satisfaction

## Support & Troubleshooting

**Issue: Animations not running**
- Check `prefers-reduced-motion` preference
- Verify component mounting in DOM
- Check browser console for errors
- Ensure GSAP plugins registered

**Issue: Jerky scroll parallax**
- Reduce `scrub` value
- Disable on mobile
- Check for layout thrashing
- Profile with DevTools Performance tab

**Issue: ScrollTrigger memory leaks**
- Verify cleanup in useEffect return
- Check for duplicate animations
- Kill triggers on component unmount
- Use `ctx.revert()` properly

---

**Created:** July 2026  
**Last Updated:** July 2026  
**Status:** Production Ready
