"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface IntroToHeroTransitionProps {
  onTransitionComplete?: () => void;
}

/**
 * Manages scroll-controlled transformation moving the headline
 * from full-screen opening position into hero position.
 * Handles parallax, scaling, and content reveals during transition.
 */
export const IntroToHeroTransition: React.FC<IntroToHeroTransitionProps> = ({
  onTransitionComplete,
}) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const gsap = ensureGsap();
    const element = transitionRef.current;
    if (!element) return;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Get viewport dimensions for responsive calculations
      const viewportHeight = window.innerHeight;

      // Main scroll-driven timeline for intro-to-hero transformation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom 50%",
          scrub: MOTION_CONFIG.parallax.desktopScrub,
          markers: MOTION_CONFIG.debug,
        },
      });

      // Headline moves from center to top-left
      const headline = element.querySelector("[data-headline]");
      if (headline) {
        tl.to(
          headline,
          {
            y: -viewportHeight * 0.35,
            scale: 0.7,
            opacity: 0.9,
            ease: "none",
          },
          0
        );
      }

      // Supporting text fades and moves
      const supportingText = element.querySelector("[data-supporting-text]");
      if (supportingText) {
        tl.to(
          supportingText,
          {
            opacity: 0,
            y: -20,
            ease: "none",
          },
          0
        );
      }

      // Hero content reveals on scroll
      const heroContent = element.querySelector("[data-hero-content]");
      if (heroContent) {
        tl.from(
          heroContent,
          {
            opacity: 0,
            y: 40,
            ease: "none",
          },
          0.3
        );
      }

      // Callback when transition completes
      ScrollTrigger.create({
        trigger: element,
        start: "bottom 50%",
        onEnter: () => onTransitionComplete?.(),
      });
    }, element);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [prefersReducedMotion, onTransitionComplete]);

  return (
    <div
      ref={transitionRef}
      data-intro-to-hero-transition
      className="relative min-h-screen"
    >
      {/* Transition container for scroll-driven changes */}
    </div>
  );
};
