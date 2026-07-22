"use client";

import React, { useRef } from "react";
import { GridJunctions } from "@/components/common/GridJunctions";
import { ensureGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  SiBlender,
  SiClaude,
  SiCss,
  SiCursor,
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
  SiNotion,
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
      { name: "Go", Icon: GoMark },
      { name: "Rust", Icon: SiRust },
      { name: "PHP", Icon: SiPhp },
      { name: "REST", Icon: RestMark },
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
      { name: "AWS", Icon: AwsMark },
    ],
  },
  {
    id: "D-04",
    label: "Design",
    tools: [
      { name: "Figma", Icon: SiFigma },
      { name: "Framer", Icon: SiFramer },
      { name: "Photoshop", Icon: PsMark },
      { name: "Illustrator", Icon: AiMark },
      { name: "After Effects", Icon: AeMark },
      { name: "Blender", Icon: SiBlender },
      { name: "Penpot", Icon: SiPenpot },
    ],
  },
  {
    id: "A-05",
    label: "AI & ML",
    tools: [
      { name: "OpenAI", Icon: OpenAiMark },
      { name: "Claude", Icon: SiClaude },
      { name: "LangChain", Icon: SiLangchain },
      { name: "Hugging Face", Icon: SiHuggingface },
      { name: "Cursor", Icon: SiCursor },
      { name: "Copilot", Icon: SiGithubcopilot },
      { name: "Vercel AI", Icon: SiVercel },
      { name: "Notion", Icon: SiNotion },
    ],
  },
];

/**
 * Calm partner-logo style stack panel. It keeps the old marquee content but
 * presents it as a premium grid that matches the site's modular language.
 */
export const TechMarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>("ALL");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const gsap = ensureGsap();
      const cards = gsap.utils.toArray<HTMLElement>(".tech-grid-card", section);
      const rules = gsap.utils.toArray<HTMLElement>("[data-tech-rule]", section);

      gsap.set(cards, { opacity: 0, y: 16, scale: 0.96 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 45%",
          scrub: 0.75,
        },
      });

      timeline
        .to(rules, { scaleX: 1, duration: 0.8, stagger: 0.08 }, 0)
        .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: { each: 0.02, from: "start" } }, 0.15);

      return () => ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    },
    { scope: sectionRef },
  );

  const categories = ["ALL", "FRONTEND", "BACKEND", "INFRA & DATA", "AI & ML", "DESIGN"];

  const allTools = techGroups.flatMap((group) =>
    group.tools.map((t) => ({ ...t, groupId: group.id, category: group.label }))
  );

  const filteredTools = activeCategory === "ALL"
    ? allTools
    : allTools.filter((t) => t.category.toUpperCase().includes(activeCategory) || activeCategory.includes(t.category.toUpperCase()));

  return (
    <section
      ref={sectionRef}
      className="section-dark chapter-obsidian tech-logo-section py-16"
      data-chapter="TechMarquee"
      aria-labelledby="tech-marquee-title"
    >
      <div className="tech-logo-panel has-complete-junctions relative max-w-[1400px] mx-auto overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        <GridJunctions />
        <div className="tech-logo-panel-glow pointer-events-none absolute inset-0" />
        <span className="tech-logo-rule tech-logo-rule-top" data-tech-rule aria-hidden="true" />
        <span className="tech-logo-rule tech-logo-rule-header" data-tech-rule aria-hidden="true" />
        <span className="tech-logo-rule tech-logo-rule-bottom" data-tech-rule aria-hidden="true" />

        {/* Section Header */}
        <div className="tech-logo-header relative flex flex-col items-center justify-center px-6 pt-10 text-center">
          <p className="display-kicker text-[color:var(--text-faint)] tracking-[0.2em] mb-2 uppercase">ENGINEERING STACK</p>
          <h2 id="tech-marquee-title" className="text-[clamp(1.8rem,3.2vw,3.2rem)] font-bold tracking-[-0.03em] text-white">
            Technologies we <span className="text-[#8f9cff]">build with.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[54ch] text-xs leading-6 text-white/60 md:text-sm">
            A focused, battle-tested stack selected for fit, ownership, and maintainable production delivery.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="tech-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`tech-filter-tab ${activeCategory === cat ? "tech-filter-tab--active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards Container */}
        <div className="tech-grid-container">
          {filteredTools.map((tech) => {
            const Icon = tech.Icon;
            return (
              <article key={`${tech.groupId}-${tech.name}`} className="tech-grid-card">
                <div className="tech-card-header">
                  <span className="tech-card-badge">{tech.groupId}</span>
                  <span className="tech-card-type">{tech.category}</span>
                </div>
                <div className="tech-card-icon">
                  <Icon size={26} />
                </div>
                <h3 className="tech-card-name">{tech.name}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function GoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 64" fill="none" className={className} aria-hidden="true">
      <path d="M14 25h28M8 34h30M18 43h20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M58.5 49c-10 0-17.5-6.3-17.5-15 0-10.2 9.3-19 21.6-19 7.2 0 12.7 2.8 15.6 7.1M72 34H60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M78 34c0 9-7.9 15-19.5 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function RestMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 64" fill="none" className={className} aria-hidden="true">
      <path d="M16 22h40M16 42h40M56 22l12 12-12 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 18h6v6M80 18 66 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PsMark({ size = 24, className }: { size?: number; className?: string }) {
  return <AdobeMark size={size} className={className} label="Ps" />;
}

function AiMark({ size = 24, className }: { size?: number; className?: string }) {
  return <AdobeMark size={size} className={className} label="Ai" />;
}

function AeMark({ size = 24, className }: { size?: number; className?: string }) {
  return <AdobeMark size={size} className={className} label="Ae" />;
}

function AdobeMark({ size = 24, className, label }: { size?: number; className?: string; label: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="10" width="44" height="44" rx="8" stroke="currentColor" strokeWidth="5" />
      <text x="32" y="38" fill="currentColor" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">
        {label}
      </text>
    </svg>
  );
}

function OpenAiMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M31.6 7.8c5.3-3 12-.9 14.8 4.6 1.6 3.1 1.6 6.6.3 9.6 3.5.8 6.5 3.2 8 6.7 2.4 5.6-.4 12.1-6 14.4-.7.3-1.4.5-2.1.6.3 3.7-1.4 7.5-4.8 9.8-5.1 3.5-12.1 2.1-15.5-3.1-.4-.6-.8-1.3-1.1-1.9-3.4 1.5-7.5 1.2-10.8-1.2-5-3.6-6-10.7-2.3-15.6.4-.5.8-1 1.3-1.4-2.7-2.5-4-6.3-3.2-10.1 1.2-6 7.2-9.9 13.2-8.6.6.1 1.2.3 1.8.5 1.2-1.8 2.7-3.3 4.6-4.4l1.8-.9Z"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinejoin="round"
      />
      <path
        d="M24.9 12.5 42.5 23v19.8M46.8 22.1 29.2 32.3 12.7 22.9M13.3 31l17.4 10.1 17.1-9.9M25.2 48.4V28.8L42 18.9M18.3 45.5V25.7L35.6 15.5"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwsMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 64" fill="none" className={className} aria-hidden="true">
      <path d="M17 28c0-10.5 8.5-19 19-19 7.5 0 14.1 4.4 17.2 10.7A18.6 18.6 0 0 1 61 18c10.5 0 19 8.5 19 19S71.5 56 61 56H31C18.9 56 9 46.1 9 34c0-7.7 4-14.5 10-18.4" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 36h7.5l3.5-12 3.5 12H47M32.5 36l1.2-4.2h4.6M52 25v11M52 25h9.5c3.2 0 5.5 2.2 5.5 5.2S64.7 36 61.5 36H52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
