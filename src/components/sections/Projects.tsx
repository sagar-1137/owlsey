"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { ArrowUpRight } from "lucide-react";
import { GridJunctions } from "@/components/common/GridJunctions";

const solutions = [
  {
    title: "Business platforms",
    category: "Core product",
    index: "01",
    description: "Software shaped around how your business actually works.",
    tags: ["Portals", "SaaS", "Customer systems"],
    href: "/services",
  },
  {
    title: "Operations tools",
    category: "Internal systems",
    index: "02",
    description: "Tools that replace repeated handoffs and spreadsheet work.",
    tags: ["Dashboards", "Workflows", "Admin"],
    href: "/services",
  },
  {
    title: "Connected workflows",
    category: "Automation",
    index: "03",
    description: "Clean links between the products, data, and teams you already use.",
    tags: ["APIs", "Data flows", "Automation"],
    href: "/services",
  },
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const gsap = ensureGsap();
    const root = sectionRef.current;
    if (!root || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title reveal animation
      const heading = root.querySelector("h2");
      if (heading) {
        const words = heading.querySelectorAll(".home-accent-word, .accent-stop");
        gsap.from(words, {
          yPercent: 105,
          opacity: 0,
          duration: MOTION_CONFIG.timing.primaryReveal,
          ease: MOTION_CONFIG.easing.revealOutStrong,
          stagger: MOTION_CONFIG.stagger.minimal,
          scrollTrigger: {
            trigger: heading,
            start: "top 75%",
            markers: MOTION_CONFIG.debug,
            once: true,
          },
        });
      }

      // Card entrance animations with alternating directions
      const rows = root.querySelectorAll<HTMLElement>("[data-project-row]");
      rows.forEach((row, idx) => {
        const children = Array.from(row.children);
        
        // Determine if desktop for more complex animations
        const isDesktop = window.innerWidth >= MOTION_CONFIG.breakpoints.desktop;

        if (isDesktop && idx === 0) {
          // Card 0: Enter from left
          gsap.from(row, {
            xPercent: -8,
            opacity: 0,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scale: 0.97,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              markers: MOTION_CONFIG.debug,
              once: true,
            },
          });
        } else if (isDesktop && idx === 1) {
          // Card 1: Enter from bottom
          gsap.from(row, {
            yPercent: 70,
            opacity: 0,
            scale: 0.97,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              markers: MOTION_CONFIG.debug,
              once: true,
            },
          });
        } else if (isDesktop && idx === 2) {
          // Card 2: Enter from right
          gsap.from(row, {
            xPercent: 8,
            opacity: 0,
            scale: 0.97,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              markers: MOTION_CONFIG.debug,
              once: true,
            },
          });
        } else {
          // Fallback for mobile or unspecified indices
          gsap.from(row, {
            yPercent: 45,
            opacity: 0,
            duration: MOTION_CONFIG.timing.supportingReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              markers: MOTION_CONFIG.debug,
              once: true,
            },
          });
        }
      });

      // Divider lines animation
      const dividers = root.querySelectorAll("[data-project-row] .border-t");
      if (dividers.length > 0) {
        gsap.from(dividers, {
          scaleX: 0,
          transformOrigin: "left",
          duration: MOTION_CONFIG.timing.supportingReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          stagger: 0.15,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            markers: MOTION_CONFIG.debug,
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
      id="projects"
      className="chapter-graphite"
      data-chapter="Solutions"
    >
      <div className="modular-grid modular-grid--viewport has-complete-junctions">
        <GridJunctions />
        <div className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">What we build</p>
          <div>
            <h2 className="modular-display text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
              Systems
              <br />
              that <span className="home-accent-word">fit</span><span className="accent-stop">.</span>
            </h2>
          </div>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Custom by default</p>
          <p className="max-w-[20ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            Requirement-led. <span className="home-serif-accent">Not packaged</span>.
          </p>
        </div>
        <a
          href="/services"
          data-cursor="VIEW"
          data-motion-link
          className="modular-box group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]"
        >
          <span className="display-kicker text-[color:var(--text-faint)]">Explore</span>
          <div>
            <div className="modular-display text-[clamp(2.8rem,4.8vw,5.2rem)] text-[color:var(--text-strong)]">
              View
              <br />
              services<span className="accent-stop">.</span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
              <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">View services</span>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--text-strong)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </a>

        {solutions.map((project, index) => (
          <a
            key={project.title}
            href={project.href}
            data-cursor="VIEW"
            data-motion-link
            data-project-row
            className={`modular-box group flex min-h-[calc(var(--module-cell)*2.45)] flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075] ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="modular-copy text-[color:var(--accent-primary)]">.{project.index}</span>
                <span className="modular-copy">{project.category}</span>
              </div>
              <h3 className="modular-display mt-6 text-[clamp(2.2rem,4vw,3.9rem)] text-[color:var(--text-strong)]">
                {project.title}
              </h3>
              <p className="mt-4 max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {project.description}
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--line-subtle)] pt-4">
              <div data-motion-label className="modular-copy text-[color:var(--text-faint)]">{project.tags.join(" / ")}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
