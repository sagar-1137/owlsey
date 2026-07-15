"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { EnhancedMarquee } from "@/components/motion/EnhancedMarquee";
import { GridJunctions } from "@/components/common/GridJunctions";
import {
  row1, row2, row3, row4, row5,
} from "./techIconsData";

// Curated streams from the full tool catalogue
const streams = [
  {
    id: "01",
    label: "Frontend",
    description: "Interfaces",
    tools: [
      row1[0], // React
      row1[1], // Next.js
      row1[3], // CSS3
      row1[5], // Tailwind CSS
      row1[7], // TypeScript
    ],
  },
  {
    id: "02",
    label: "Backend",
    description: "Application logic",
    tools: [
      row2[0], // Node.js
      row2[1], // NestJS
      row2[2], // Python
      row2[4], // Go
      row2[7], // REST API
    ],
  },
  {
    id: "03",
    label: "Infrastructure",
    description: "Data and deployment",
    tools: [
      row3[0], // PostgreSQL
      row3[1], // MySQL
      row3[2], // MongoDB
      row3[3], // Supabase
      row3[6], // Redis
    ],
  },
  {
    id: "04",
    label: "Design & AI",
    description: "Product and automation",
    tools: [
      row4[0], // Figma
      row4[8], // Framer
      row5[0], // OpenAI
      row5[1], // Claude
      row5[5], // Cursor AI
    ],
  },
];

export const TechWeUse: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const gsap = ensureGsap();
    const root = sectionRef.current;
    if (!root || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main heading animation
      const heading = root.querySelector("h2");
      if (heading) {
        gsap.from(heading, {
          yPercent: 20,
          opacity: 0,
          duration: MOTION_CONFIG.timing.primaryReveal,
          ease: MOTION_CONFIG.easing.revealOutStrong,
          scrollTrigger: {
            trigger: heading,
            start: "top 75%",
            markers: MOTION_CONFIG.debug,
            once: true,
          },
        });
      }

      // Subheading and description
      const subheadingBox = root.querySelectorAll(".modular-box")[1];
      if (subheadingBox) {
        gsap.from(subheadingBox, {
          opacity: 0,
          yPercent: 15,
          duration: MOTION_CONFIG.timing.supportingReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          scrollTrigger: {
            trigger: subheadingBox,
            start: "top 70%",
            once: true,
          },
        });
      }

      // Tech stream columns with staggered entrance
      const cols = root.querySelectorAll<HTMLElement>("[data-stream-col]");
      gsap.from(cols, {
        yPercent: 30,
        opacity: 0,
        filter: "blur(8px)",
        duration: MOTION_CONFIG.timing.primaryReveal,
        ease: MOTION_CONFIG.easing.revealOut,
        stagger: MOTION_CONFIG.stagger.minimal,
        scrollTrigger: {
          trigger: ".section-dark.chapter-steel",
          start: "top 65%",
          markers: MOTION_CONFIG.debug,
          once: true,
        },
      });

      // Dividers animation
      const dividers = root.querySelectorAll(".border-t");
      if (dividers.length > 0) {
        gsap.from(dividers, {
          scaleX: 0,
          transformOrigin: "left",
          duration: MOTION_CONFIG.timing.supportingReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".section-dark.chapter-steel",
            start: "top 60%",
          },
        });
      }
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === root)
        .forEach((t) => t.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="section-dark chapter-steel"
      data-chapter="Technology"
    >
      <div className="modular-grid modular-grid--viewport has-complete-junctions">
        <GridJunctions />
        <div className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">Technology</p>
          <div>
            <h2 className="modular-display text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
              Fit before
              <br />
              <span className="home-accent-word">fashion</span>.
            </h2>
          </div>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Selection</p>
          <p className="max-w-[20ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            Preferred stack, tested against the <span className="home-serif-accent">requirement</span>.
          </p>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Our position</p>
          <span className="modular-copy max-w-[22ch]">Practical. Maintainable. Ready.</span>
        </div>

        {streams.map((stream) => (
          <div
            key={stream.id}
            data-stream-col
            className="modular-box flex min-h-[calc(var(--module-cell)*3.2)] flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="modular-copy text-[color:var(--accent-primary)]">.{stream.id}</span>
                <h3 className="modular-copy text-[color:var(--text-strong)]">{stream.label}</h3>
              </div>
              <p className="mt-3 text-[10px] leading-5 tracking-[0.03em] text-[color:var(--text-faint)]">
                {stream.description}
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--line-subtle)] pt-5">
              <p className="max-w-[24ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {stream.tools.map((tool) => tool.name).join(" / ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
