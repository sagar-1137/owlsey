"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

/**
 * Full-screen opening experience with typed headline.
 * Displays "SOFTWARE SHAPED AROUND YOUR BUSINESS" with typewriter animation,
 * then transitions to hero on scroll.
 */
export const OpeningExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTyped, setIsTyped] = useState(false);

  useEffect(() => {
    const gsap = ensureGsap();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Fade in container
      gsap.from(container, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      if (!prefersReducedMotion && headlineRef.current) {
        const headline = headlineRef.current;
        const text = headline.textContent || "";
        headline.textContent = "";

        // Create spans for each character
        const chars = Array.from(text).map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.opacity = "0";
          headline.appendChild(span);
          return span;
        });

        // Typewriter animation - reveal characters sequentially
        const duration = MOTION_CONFIG.timing.primaryReveal;
        const charDuration = duration / chars.length;

        gsap.to(chars, {
          opacity: 1,
          duration: charDuration,
          stagger: charDuration,
          ease: "none",
          onComplete: () => setIsTyped(true),
        });
      } else {
        setIsTyped(true);
      }

      // Scroll indicator pulse animation
      if (scrollIndicatorRef.current && !prefersReducedMotion) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          opacity: 0.3,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5, // Start after headline
        });
      }
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
      data-opening-experience
    >
      {/* Background gradient or texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Main headline */}
      <h1
        ref={headlineRef}
        className="relative z-10 max-w-5xl px-6 text-center font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight"
      >
        SOFTWARE SHAPED AROUND YOUR BUSINESS
      </h1>

      {/* Subtitle appears after headline */}
      {isTyped && (
        <p className="relative z-10 mt-8 text-center text-white/60 text-lg max-w-2xl px-6 animate-fade-in">
          Bespoke digital solutions crafted for your unique needs
        </p>
      )}

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
