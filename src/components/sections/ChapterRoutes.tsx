"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface Chapter {
  id: string;
  title: string;
  content: React.ReactNode;
  subtitle?: string;
}

interface ChapterRoutesProps {
  chapters: Chapter[];
}

/**
 * Full-screen pinned chapter sections that reveal on scroll.
 * Creates distinct visual sections with entrance animations.
 * Desktop: Optional pinning; Mobile: Natural scroll flow.
 */
export const ChapterRoutes: React.FC<ChapterRoutesProps> = ({ chapters }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const gsap = ensureGsap();
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const windowWidth = window.innerWidth;
      const isDesktop = windowWidth >= MOTION_CONFIG.breakpoints.desktop;

      // Animate each chapter section
      chapters.forEach((chapter) => {
        const section = container.querySelector(
          `[data-chapter="${chapter.id}"]`
        );
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: isDesktop ? "top center" : "top 80%",
            end: isDesktop ? "+=200" : "+=100",
            scrub: false,
            markers: MOTION_CONFIG.debug,
          },
        });

        // Title entrance
        const title = section.querySelector("[data-chapter-title]");
        if (title) {
          tl.from(
            title,
            {
              opacity: 0,
              y: 40,
              duration: MOTION_CONFIG.timing.primaryReveal,
              ease: MOTION_CONFIG.easing.revealOut,
            },
            0
          );
        }

        // Content entrance with stagger
        const contentItems = section.querySelectorAll(
          "[data-chapter-content] > *"
        );
        if (contentItems.length > 0) {
          tl.from(
            contentItems,
            {
              opacity: 0,
              y: 30,
              duration: MOTION_CONFIG.timing.supportingReveal,
              ease: MOTION_CONFIG.easing.revealOut,
              stagger: MOTION_CONFIG.stagger.minimal,
            },
            0.2
          );
        }

        // Divider line animation (if present)
        const divider = section.querySelector("[data-chapter-divider]");
        if (divider) {
          tl.from(
            divider,
            {
              scaleX: 0,
              duration: MOTION_CONFIG.timing.supportingReveal,
              ease: MOTION_CONFIG.easing.smooth,
              transformOrigin: "left center",
            },
            0
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === container)
        .forEach((t) => t.kill());
    };
  }, [chapters, prefersReducedMotion]);

  return (
    <div ref={containerRef} data-chapter-routes className="relative w-full">
      {chapters.map((chapter, index) => (
        <section
          key={chapter.id}
          data-chapter={chapter.id}
          className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20"
        >
          {/* Divider line above chapter */}
          {index > 0 && (
            <div
              data-chapter-divider
              className="absolute top-0 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-1/2"
            />
          )}

          {/* Chapter header */}
          <div className="relative z-10 max-w-4xl w-full text-center mb-12">
            <h2
              data-chapter-title
              className="font-mono text-5xl md:text-6xl font-bold text-white mb-4"
            >
              {chapter.title}
            </h2>
            {chapter.subtitle && (
              <p className="text-white/60 text-lg md:text-xl">
                {chapter.subtitle}
              </p>
            )}
          </div>

          {/* Chapter content */}
          <div
            data-chapter-content
            className="relative z-10 max-w-4xl w-full grid gap-8"
          >
            {typeof chapter.content === "string" ? (
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {chapter.content}
              </p>
            ) : (
              chapter.content
            )}
          </div>
        </section>
      ))}
    </div>
  );
};
