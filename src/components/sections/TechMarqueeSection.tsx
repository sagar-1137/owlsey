"use client";

import React, { useRef } from "react";
import { GridJunctions } from "@/components/common/GridJunctions";
import { ensureGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  SiBlender,
  SiClaude,
  SiCss,
  SiFigma,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithubcopilot,
  SiGreensock,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPenpot,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRedis,
  SiReact,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TechLogo = { name: string; Icon: React.ComponentType<any> };

const techGroups = [
  {
    id: "F-01",
    label: "Frontend",
    tools: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
      { name: "Flutter", Icon: SiFlutter },
      { name: "GSAP", Icon: SiGreensock },
    ],
  },
  {
    id: "B-02",
    label: "Backend",
    tools: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Python", Icon: SiPython },
      { name: "Rust", Icon: SiRust },
      { name: "PHP", Icon: SiPhp },
    ],
  },
  {
    id: "I-03",
    label: "Infra & Data",
    tools: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Redis", Icon: SiRedis },
      { name: "Git", Icon: SiGit },
    ],
  },
  {
    id: "D-04",
    label: "Design",
    tools: [
      { name: "Figma", Icon: SiFigma },
      { name: "Framer", Icon: SiFramer },
      { name: "Blender", Icon: SiBlender },
      { name: "Penpot", Icon: SiPenpot },
    ],
  },
  {
    id: "A-05",
    label: "AI & ML",
    tools: [
      { name: "Claude", Icon: SiClaude },
      { name: "LangChain", Icon: SiLangchain },
      { name: "Hugging Face", Icon: SiHuggingface },
      { name: "Copilot", Icon: SiGithubcopilot },
      { name: "Vercel AI", Icon: SiVercel },
    ],
  },
];

const techRows = createBalancedOddEvenRows(
  techGroups.flatMap((group) => group.tools),
);

/**
 * Calm partner-logo style stack panel. It keeps the old marquee content but
 * presents it as a premium grid that matches the site's modular language.
 */
export const TechMarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const gsap = ensureGsap();
      const rows = gsap.utils.toArray<HTMLElement>(".tech-logo-row", section);
      const cells = gsap.utils.toArray<HTMLElement>(".tech-logo-cell:not(.tech-logo-cell-empty)", section);
      const rules = gsap.utils.toArray<HTMLElement>("[data-tech-rule]", section);

      gsap.set(rows, { opacity: 0, y: 18 });
      gsap.set(cells, { opacity: 0, y: 10 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 92%",
          end: "top 42%",
          scrub: 0.75,
        },
      });

      timeline
        .to(rules, { scaleX: 1, duration: 0.9, stagger: 0.08 }, 0)
        .to(rows, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.08)
        .to(cells, { opacity: 1, y: 0, duration: 0.5, stagger: { each: 0.018, from: "start" } }, 0.18);

      const sheen = section.querySelector<HTMLElement>(".tech-logo-sheen");
      if (sheen && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.fromTo(
          sheen,
          { xPercent: -125 },
          {
            xPercent: 125,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      return () => ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="section-dark chapter-obsidian tech-logo-section"
      data-chapter="TechMarquee"
      aria-labelledby="tech-marquee-title"
    >
      <div className="tech-logo-panel has-complete-junctions relative overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        <GridJunctions />
        <div className="tech-logo-panel-glow pointer-events-none absolute inset-0" />
        <div className="tech-logo-sheen pointer-events-none absolute inset-y-0 left-0 z-[2] w-[42%]" aria-hidden="true" />
        <span className="tech-logo-rule tech-logo-rule-top" data-tech-rule aria-hidden="true" />
        <span className="tech-logo-rule tech-logo-rule-header" data-tech-rule aria-hidden="true" />
        <span className="tech-logo-rule tech-logo-rule-bottom" data-tech-rule aria-hidden="true" />

        <div className="tech-logo-header relative flex flex-col items-center justify-center px-6 text-center">
          <h2 id="tech-marquee-title" className="text-[clamp(1.05rem,1.45vw,1.45rem)] font-semibold tracking-[-0.04em] text-white/68">
            Technologies we <span className="text-white">build with.</span>
          </h2>
          <p className="mx-auto mt-1 max-w-[48ch] text-xs leading-5 text-white/46 md:text-sm">
            A focused stack selected for fit, ownership, and maintainable delivery.
          </p>
        </div>

        <div className="tech-logo-grid relative" style={{ "--tech-row-count": techRows.length } as React.CSSProperties}>
          {techRows.map((row, index) => (
            <TechLogoRow key={`tech-row-${index}`} index={index} tools={row} />
          ))}
        </div>
      </div>
    </section>
  );
};

function createBalancedOddEvenRows(items: TechLogo[]) {
  const rows: TechLogo[][] = [];
  let cursor = 0;
  let rowIndex = 0;

  while (cursor < items.length) {
    const preferredSize = rowIndex % 2 === 0 ? 7 : 6;
    const remaining = items.length - cursor;

    if (remaining < 5 && rows.length > 0) {
      rows[rows.length - 1].push(...items.slice(cursor));
      break;
    }

    rows.push(items.slice(cursor, cursor + Math.min(preferredSize, remaining)));
    cursor += preferredSize;
    rowIndex += 1;
  }

  return rows;
}

function TechLogoRow({ index, tools }: { index: number; tools: TechLogo[] }) {
  const emptyCells = Array.from({ length: Math.max(0, 7 - tools.length) });

  return (
    <div className="tech-logo-row">
      <div className="tech-logo-label">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{index % 2 === 0 ? "Build stack" : "Delivery stack"}</strong>
      </div>
      <div className="tech-logo-tools">
        {tools.map((tech) => (
          <TechCell key={tech.name} tech={tech} />
        ))}
        {emptyCells.map((_, emptyIndex) => (
          <div key={`empty-${emptyIndex}`} className="tech-logo-cell tech-logo-cell-empty" aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}

function TechCell({ tech }: { tech: TechLogo }) {
  const Icon = tech.Icon;

  return (
    <div className="tech-logo-cell group relative flex items-center justify-center gap-2.5 px-4 transition-colors duration-300 hover:bg-white/[0.035]">
      <span className="grid size-6 place-items-center text-white/72 transition-colors duration-300 group-hover:text-white" aria-hidden="true">
        <Icon size={21} />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-[-0.03em] text-white/82 transition-colors duration-300 group-hover:text-white md:text-base">
        {tech.name}
      </span>
    </div>
  );
}
