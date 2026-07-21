"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

/**
 * Sequential reveal animation for hero content boxes.
 * Creates a cinematic assembly effect with staggered reveals.
 */
export const HeroAssembly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const gsap = ensureGsap();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Show all content immediately
        gsap.set(container.querySelectorAll("[data-hero-box]"), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Get all hero content boxes
      const boxes = container.querySelectorAll("[data-hero-box]");
      if (boxes.length === 0) return;

      // Create master timeline for sequential reveals
      const tl = gsap.timeline();

      // Fade in container
      tl.from(
        container,
        {
          opacity: 0,
          duration: 0.4,
          ease: MOTION_CONFIG.easing.smooth,
        },
        0
      );

      // Stagger box animations
      tl.from(
        boxes,
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
          duration: MOTION_CONFIG.timing.primaryReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          stagger: {
            amount: MOTION_CONFIG.timing.primaryReveal * 0.8,
            from: "start",
          },
        },
        0.2
      );

      // Add subtle hover animation setup
      boxes.forEach((box) => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(
          box,
          {
            y: MOTION_CONFIG.card.hoverLift,
            duration: MOTION_CONFIG.timing.hover,
            ease: MOTION_CONFIG.easing.hoverEase,
          },
          0
        );

        box.addEventListener("mouseenter", () => hoverTl.play());
        box.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      data-hero-assembly
      className="relative w-full grid gap-6 md:gap-8 auto-rows-max"
    >
      {/* Hero assembly boxes are added via data-hero-box attributes */}
    </div>
  );
};
