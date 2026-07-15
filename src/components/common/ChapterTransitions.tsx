"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface ChapterTransitionsProps {
  /**
   * Chapters to animate (selectors like '.chapter-smoke', '.chapter-ink')
   */
  chapters: string[];
  /**
   * Whether to enable pinning on desktop
   */
  enablePinning?: boolean;
  /**
   * Distance to scroll for animation (defaults to 120vh on desktop)
   */
  pinDistance?: string;
}

/**
 * ChapterTransitions Component
 * Manages entrance animations for major sections (chapters)
 * Handles boundary transitions with staggered reveals and divider animations
 */
export function ChapterTransitions({
  chapters,
  enablePinning = true,
  pinDistance = MOTION_CONFIG.pinning.desktopStandard,
}: ChapterTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !chapters.length || prefersReducedMotion)
      return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // Get window width to determine responsive behavior
      const isDesktop = window.innerWidth >= MOTION_CONFIG.breakpoints.desktop;
      const isTablet =
        window.innerWidth >= MOTION_CONFIG.breakpoints.mobile &&
        window.innerWidth < MOTION_CONFIG.breakpoints.desktop;

      // Create entrance animation for each chapter
      chapters.forEach((chapter, idx) => {
        const el = document.querySelector(chapter) as HTMLElement;
        if (!el) return;

        // Don't animate first chapter (Hero handles its own entrance)
        if (idx === 0) return;

        // Determine trigger element (usually the previous chapter)
        const triggerEl =
          idx > 0 ? document.querySelector(chapters[idx - 1]) : el;

        // Mobile: no pinning, simple entrance
        if (!isDesktop && !isTablet) {
          gsap.from(el, {
            yPercent: 30,
            opacity: 0,
            duration: MOTION_CONFIG.timing.supportingReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: triggerEl || el,
              start: "bottom 90%",
              end: `+=${MOTION_CONFIG.timing.supportingReveal * 1000}`,
              markers: MOTION_CONFIG.debug,
              once: true,
            },
          });
          return;
        }

        // Tablet/Desktop: optional pinning with entrance
        const pinConfig = enablePinning && isDesktop ? { pin: true } : {};
        const pinDistanceValue = isTablet
          ? MOTION_CONFIG.pinning.tabletStandard
          : pinDistance;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl || el,
            start: "bottom 80%",
            end: `+=${pinDistanceValue}`,
            scrub: 1,
            markers: MOTION_CONFIG.debug,
            anticipatePin: 1,
            ...pinConfig,
          },
        });

        // Animate entrance
        timeline.from(
          el,
          {
            yPercent: 30,
            opacity: 0,
            duration: 1,
            ease: MOTION_CONFIG.easing.revealOut,
          },
          0
        );

        // Optional: animate divider line if it exists
        const dividerLine = el.querySelector(".chapter-divider");
        if (dividerLine) {
          timeline.from(
            dividerLine,
            {
              scaleX: 0,
              duration: 0.8,
              ease: MOTION_CONFIG.easing.revealOut,
              transformOrigin: "left",
            },
            0.1
          );
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [chapters, enablePinning, pinDistance, prefersReducedMotion]);

  // This component doesn't render visible content, just manages animations
  return <div ref={containerRef} style={{ display: "none" }} />;
}
