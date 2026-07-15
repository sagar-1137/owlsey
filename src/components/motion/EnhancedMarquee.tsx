"use client";

import React, { useRef, useEffect, useState } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EnhancedMarqueeProps {
  items: React.ReactNode[];
  duration?: number;
  direction?: "left" | "right";
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
  speed?: number;
}

/**
 * Enhanced infinite scrolling marquee with GSAP.
 * Seamlessly loops content with smooth animations.
 */
export const EnhancedMarquee: React.FC<EnhancedMarqueeProps> = ({
  items,
  duration = 30,
  direction = "left",
  gap = 24,
  className = "",
  pauseOnHover = true,
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const container = containerRef.current;
    const content = contentRef.current;

    // Clone content for seamless loop
    const items = Array.from(content.children) as HTMLElement[];
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      content.appendChild(clone);
    });

    const getDistance = () => {
      const firstItem = content.children[0] as HTMLElement;
      return firstItem ? (firstItem.offsetWidth + gap) * items.length : 0;
    };

    const distance = getDistance();
    const actualDuration = duration / speed;

    // Create animation timeline
    const tl = gsap.timeline({ repeat: -1, paused: false });

    if (direction === "left") {
      tl.to(content, {
        x: -distance,
        duration: actualDuration,
        ease: "none",
      });

      // Reset position for seamless loop
      tl.set(content, { x: 0 }, actualDuration);
    } else {
      tl.to(content, {
        x: distance,
        duration: actualDuration,
        ease: "none",
      });

      tl.set(content, { x: 0 }, actualDuration);
    }

    timelineRef.current = tl;

    // Pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => {
        setIsHovering(true);
        tl.pause();
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
        tl.play();
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      tl.kill();
    };
  }, [direction, duration, gap, pauseOnHover, speed, prefersReducedMotion, items.length]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        mask: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMask: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          willChange: "transform",
        }}
      >
        {items.map((item, idx) => (
          <div key={`item-${idx}`} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
