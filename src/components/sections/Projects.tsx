"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { ArrowUpRight } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { PROJECT_CASES } from "@/data/projectCases";

/* Four featured cases beside the "All projects" cell, placed so the 2×2
   block alternates: screenshot, number / number, screenshot. Real product
   screenshots and measured numbers are the proof — copy comes straight from
   the case-study data so the home never drifts from the detail pages. */
const FEATURED_SLUGS = ["lakshita-commerce-os", "mailproof", "veilguard", "gympro"];

const featuredCases = FEATURED_SLUGS.flatMap((slug) => {
  const project = PROJECT_CASES.find((item) => item.slug === slug);
  if (!project) return [];
  return [{
    slug: project.slug,
    title: project.title,
    category: project.label,
    index: project.index,
    description: project.summary,
    tags: project.meta,
    href: `/projects/${project.slug}`,
    image: project.image,
    metric: project.metric,
    confidential: project.confidential,
  }];
});

const ProjectGlyph: React.FC<{ slug: string }> = ({ slug }) => {
  const commonProps = {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    className: "home-project-glyph",
  } as const;

  if (slug === "lakshita-commerce-os") {
    return (
      <svg {...commonProps}>
        <path d="M8 18 15 9h18l7 9-16 21L8 18Z" />
        <path d="m8 18 16 4 16-4M15 9l9 13 9-13M24 22v17" />
        <circle cx="24" cy="22" r="2.5" className="is-accent" />
      </svg>
    );
  }

  if (slug === "veilguard") {
    return (
      <svg {...commonProps}>
        <path d="M24 6 39 12v11c0 9-5.8 15.2-15 19-9.2-3.8-15-10-15-19V12L24 6Z" />
        <circle cx="24" cy="23" r="7" />
        <path d="M17 23h14M24 16c2 2 3 4.3 3 7s-1 5-3 7c-2-2-3-4.3-3-7s1-5 3-7Z" />
        <path d="m33 34 6 6" className="is-accent" />
      </svg>
    );
  }

  if (slug === "mailproof") {
    return (
      <svg {...commonProps}>
        <rect x="6" y="10" width="36" height="27" rx="2" />
        <path d="m7 13 17 13 17-13" />
        <circle cx="36" cy="35" r="8" className="is-accent-fill" />
        <path d="m32.5 35 2.3 2.3 4.5-5" className="is-check" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="7" y="7" width="19" height="34" rx="2" />
      <circle cx="16.5" cy="16" r="3" className="is-accent" />
      <path d="M26 17h15M33 17v21M29 38h8M10 29h13M10 34h9" />
      <path d="m30 12 3 5-3 5M37 12l-3 5 3 5" className="is-accent" />
    </svg>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion || window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      const introContent = root.querySelectorAll<HTMLElement>("[data-project-intro] > *");
      const cardContent = root.querySelectorAll<HTMLElement>("[data-project-row] > :not(.home-project-glyph)");
      const cardGlyphs = root.querySelectorAll<SVGElement>("[data-project-row] .home-project-glyph");
      const headingParts = root.querySelectorAll<HTMLElement>("h2 .home-accent-word, h2 .accent-stop");
      const dividers = root.querySelectorAll<HTMLElement>("[data-project-row] .border-t");

      gsap.set(introContent, { opacity: 0.42, y: 28 });
      gsap.set(headingParts, { yPercent: 70, opacity: 0.2 });
      gsap.set(cardContent, {
        opacity: 0.08,
        y: 74,
        scale: 0.985,
        clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
        transformOrigin: "right bottom",
      });
      gsap.set(cardGlyphs, {
        opacity: 0,
        y: 34,
        scale: 0.82,
        rotation: 4,
        transformOrigin: "center",
      });
      gsap.set(dividers, { scaleX: 0, transformOrigin: "right" });

      // The section supplies the scroll distance while its grid stays sticky.
      // Only the content cells animate, which keeps the shared technical frame
      // perfectly aligned throughout the pinned sequence.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
          markers: MOTION_CONFIG.debug,
        },
      });

      timeline
        .to(introContent, {
          opacity: 1,
          y: 0,
          stagger: 0.045,
          duration: 0.24,
          ease: "power2.out",
        })
        .to(headingParts, {
          yPercent: 0,
          opacity: 1,
          stagger: MOTION_CONFIG.stagger.minimal,
          duration: 0.2,
          ease: MOTION_CONFIG.easing.revealOutStrong,
        }, 0.04)
        .to(cardContent, {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          stagger: { each: 0.1, from: "end" },
          duration: 0.46,
          ease: "power3.out",
        }, 0.22)
        .to(cardGlyphs, {
          opacity: 0.1,
          y: 0,
          scale: 1,
          rotation: 0,
          stagger: { each: 0.1, from: "end" },
          duration: 0.38,
          ease: "power3.out",
        }, 0.28)
        .to(dividers, {
          scaleX: 1,
          stagger: { each: 0.08, from: "end" },
          duration: 0.22,
          ease: "power2.out",
        }, 0.5);
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
      className="chapter-graphite home-projects-scroll"
      data-chapter="Works"
    >
      <div className="modular-grid modular-grid--viewport home-solutions-grid technical-grid-host">
        <TechnicalGrid className="section-technical-grid" />
        <div data-project-intro className="modular-box home-solutions-lead flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">Selected work</p>
          <div>
            <h2 className="modular-display text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
              Proof in
              <br />
              <span className="home-accent-word">production</span><span className="accent-stop">.</span>
            </h2>
          </div>
        </div>
        <Link
          href="/projects"
          data-project-intro
          data-cursor="VIEW"
          data-motion-link
          className="modular-box home-solutions-cta group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]"
        >
          <span className="display-kicker text-[color:var(--text-faint)]">Explore</span>
          <div>
            <div className="modular-display text-[clamp(2.8rem,4.8vw,5.2rem)] text-[color:var(--text-strong)]">
              All
              <br />
              projects<span className="accent-stop">.</span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
              <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">View all projects</span>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--text-strong)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {featuredCases.map((project, index) => (
          <Link
            key={project.title}
            href={project.href}
            data-cursor="VIEW"
            data-motion-link
            data-project-row
            className={`modular-box home-project-card home-project-card--${index + 1} group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]`}
          >
            {project.image ? (
              <div className="home-project-shot">
                <Image
                  src={project.image}
                  alt={`${project.title} — live product screenshot`}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1024px) 25vw, 100vw"
                />
              </div>
            ) : project.metric ? (
              <div className="home-project-metric">
                <ProjectGlyph slug={project.slug} />
                <span className="home-project-metric-value">{project.metric.value}</span>
                <span className="home-project-metric-label">{project.metric.label}</span>
              </div>
            ) : (
              <ProjectGlyph slug={project.slug} />
            )}
            <div>
              <div className="flex items-center justify-start gap-4">
                <span className="modular-copy text-[color:var(--accent-primary)]">.{project.index}</span>
                <span className="modular-copy">{project.category}</span>
                {project.confidential && <span className="nda-tag">NDA</span>}
              </div>
              <h3 className="modular-display mt-3 text-[clamp(2rem,3.2vw,3.2rem)] text-[color:var(--text-strong)]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-sm leading-6 text-[color:var(--text-muted)] line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="mt-5 border-t border-[color:var(--line-subtle)] pt-4">
              <div data-motion-label className="modular-copy text-[color:var(--text-faint)]">{project.tags}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
