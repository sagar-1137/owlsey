"use client";

import React, { useRef, useEffect } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedMarqueeProps {
  children: React.ReactNode;
  duration?: number;
  direction?: "left" | "right";
  speed?: number;
  gap?: string;
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Infinite scrolling marquee with GSAP animation.
 * Duplicates content to create seamless loop.
 */
export const AnimatedMarquee: React.FC<AnimatedMarqueeProps> = ({
  children,
  duration = 30,
  direction = "left",
  speed = 1,
  gap = "2rem",
  className = "",
  pauseOnHover = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const content = contentRef.current;

    // Clone content for seamless loop
    const clone = content.cloneNode(true) as HTMLDivElement;
    content.parentElement?.appendChild(clone);

    const timeline = gsap.timeline({ repeat: -1 });
    const distance = direction === "left" ? -100 : 100;
    const actualDuration = duration / speed;

    timeline.to([content, clone], {
      x: direction === "left" ? -content.offsetWidth : content.offsetWidth,
      duration: actualDuration,
      ease: "none",
    });

    if (pauseOnHover) {
      const parent = containerRef.current;
      parent.addEventListener("mouseenter", () => timeline.pause());
      parent.addEventListener("mouseleave", () => timeline.play());

      return () => {
        parent.removeEventListener("mouseenter", () => timeline.pause());
        parent.removeEventListener("mouseleave", () => timeline.play());
      };
    }

    return () => {
      timeline.kill();
      clone.remove();
    };
  }, [direction, duration, speed, pauseOnHover, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        mask: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMask: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{
          gap,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};
