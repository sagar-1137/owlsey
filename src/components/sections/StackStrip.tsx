import React from "react";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCloudflare,
  SiDocker,
  SiFlutter,
  SiGo,
  SiGreensock,
  SiLangchain,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
} from "react-icons/si";
import { Cloud, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";

/**
 * The stack as four readable categories instead of a logo ticker: a buyer can
 * see at a glance what we use for which layer, on any screen size. Brands
 * without a mark in the icon set use a neutral line icon.
 */
type Tool = { name: string; Icon: IconType | LucideIcon };

const categories: Array<{ title: string; note: string; tools: Tool[] }> = [
  {
    title: "Frontend & mobile",
    note: "Fast, accessible interfaces on web, iOS and Android.",
    tools: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Flutter", Icon: SiFlutter },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "GSAP", Icon: SiGreensock },
    ],
  },
  {
    title: "Backend & APIs",
    note: "Services that stay quick under real load.",
    tools: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Rust", Icon: SiRust },
      { name: "Go", Icon: SiGo },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    title: "Data & cloud",
    note: "Reliable storage, caching and deployment.",
    tools: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Supabase", Icon: SiSupabase },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Docker", Icon: SiDocker },
      { name: "AWS", Icon: Cloud },
      { name: "Cloudflare", Icon: SiCloudflare },
    ],
  },
  {
    title: "AI & automation",
    note: "Assistants, document flows and workflows that run themselves.",
    tools: [
      { name: "Claude", Icon: SiClaude },
      { name: "OpenAI", Icon: Sparkles },
      { name: "LangChain", Icon: SiLangchain },
      { name: "n8n", Icon: Workflow },
      { name: "Telegram bots", Icon: SiTelegram },
    ],
  },
];

const principles = ["Proven in production", "Easy to hire for", "Supported for years"];

export const StackStrip: React.FC = () => (
  <section id="tech" className="section-dark chapter-ink home-pin-chapter" data-chapter="Stack" data-pin-chapter data-motion-own aria-labelledby="stack-title">
    <div className="modular-grid stack-grid technical-grid-host">
      <TechnicalGrid className="section-technical-grid" />

      <div className="modular-box stack-lead md:col-span-2 lg:col-span-2 flex flex-col justify-between">
        <span className="pattern pattern--dots pattern--tr" aria-hidden="true" />
        <p className="display-kicker text-[color:var(--text-dim)]">Engineering stack</p>
        <h2 id="stack-title" className="modular-display text-[clamp(3rem,5.4vw,5.8rem)] text-[color:var(--text-strong)]">
          The stack we <span className="home-accent-word">trust</span><span className="accent-stop">.</span>
        </h2>
      </div>

      <div className="modular-box stack-note md:col-span-2 lg:col-span-2 flex flex-col justify-between">
        <p className="display-kicker text-[color:var(--text-faint)]">Chosen for fit, not fashion</p>
        <div>
          <p className="max-w-[40ch] text-[clamp(1.1rem,1.6vw,1.45rem)] leading-[1.35] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            We pick the tools each project needs — and stick to ones your next hire already knows.
          </p>
          <ul className="stack-principles">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {categories.map((category, index) => (
        <article key={category.title} className="modular-box stack-category flex flex-col justify-between">
          <div>
            <span className="stack-category-index">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="modular-display mt-3 text-[clamp(1.7rem,2.3vw,2.3rem)] text-[color:var(--text-strong)]">{category.title}</h3>
            <p className="mt-2 max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">{category.note}</p>
          </div>
          <ul className="stack-tools">
            {category.tools.map(({ name, Icon }) => (
              <li key={name} className="stack-tool">
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);
