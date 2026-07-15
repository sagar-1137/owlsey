"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface MaskedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  triggerPoint?: string;
}

/**
 * MaskedTextReveal Component
 * Wraps text content in overflow-hidden masks for crisp line-by-line reveals
 * Useful for headlines and important copy that deserves attention
 */
export function MaskedTextReveal({
  children,
  className = "",
  staggerDelay = MOTION_CONFIG.stagger.standard,
  duration = MOTION_CONFIG.timing.primaryReveal,
  triggerPoint = "top 70%",
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (!containerRef.current) return;

      // Get all word spans that will be revealed
      const words = containerRef.current.querySelectorAll(
        ".masked-word-wrap span"
      );

      if (words.length === 0) return;

      // If user prefers reduced motion, show immediately
      if (prefersReducedMotion) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      // Create timeline for word reveals
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: MOTION_CONFIG.easing.revealOutStrong,
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerPoint,
          end: `+=${duration * 1000}`,
          markers: MOTION_CONFIG.debug,
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Split text into words and wrap in mask containers
  const textContent = typeof children === "string" ? children : "";
  const words = textContent.split(/(\s+)/);

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, idx) => {
        // Preserve whitespace
        if (/^\s+$/.test(word)) {
          return <span key={`space-${idx}`}>{word}</span>;
        }

        return (
          <span
            key={`word-${idx}`}
            className="masked-word-wrap inline-block overflow-hidden align-baseline"
          >
            <span
              className="inline-block will-change-transform"
              style={{
                transform: "translateY(105%)",
                opacity: 0,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/**
 * MaskedTextRevealLine Component
 * Alternative version for revealing entire lines at once
 * Useful for body text or multi-line content
 */
export function MaskedTextRevealLine({
  children,
  className = "",
  duration = MOTION_CONFIG.timing.supportingReveal,
  triggerPoint = "top 75%",
}: Omit<MaskedTextRevealProps, "staggerDelay">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (!containerRef.current) return;

      const lines = containerRef.current.querySelectorAll(".masked-line-wrap");

      if (lines.length === 0) return;

      // If user prefers reduced motion, show immediately
      if (prefersReducedMotion) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        return;
      }

      // Animate each line with minimal stagger
      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: MOTION_CONFIG.easing.revealOut,
        stagger: MOTION_CONFIG.stagger.minimal,
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerPoint,
          markers: MOTION_CONFIG.debug,
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {typeof children === "string" ? (
        children.split("\n").map((line, idx) => (
          <div
            key={idx}
            className="masked-line-wrap overflow-hidden"
            style={{
              transform: "translateY(105%)",
              opacity: 0,
            }}
          >
            <span className="inline-block will-change-transform">{line}</span>
          </div>
        ))
      ) : (
        <div className="masked-line-wrap">{children}</div>
      )}
    </div>
  );
}
