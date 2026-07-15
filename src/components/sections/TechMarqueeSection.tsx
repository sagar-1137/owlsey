"use client";

import React from "react";
import { EnhancedMarquee } from "@/components/motion/EnhancedMarquee";

const techLogos = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "🎨" },
  { name: "PostgreSQL", icon: "🗄️" },
  { name: "Node.js", icon: "⬢" },
  { name: "GSAP", icon: "✨" },
  { name: "Figma", icon: "F" },
  { name: "Git", icon: "𝗚" },
  { name: "AWS", icon: "☁️" },
];

/**
 * Infinite scrolling marquee displaying tech stack logos.
 * Used to showcase the technologies we work with.
 */
export const TechMarqueeSection: React.FC = () => {
  return (
    <section className="section-dark chapter-obsidian py-16 md:py-24" data-chapter="TechMarquee" aria-labelledby="tech-marquee-title">
      <div className="modular-shell">
        <div className="mb-12 text-center">
          <h2 id="tech-marquee-title" className="display-kicker text-[color:var(--text-dim)]">
            Technologies we use
          </h2>
          <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)] md:text-base">
            A carefully curated stack of modern tools and frameworks for building scalable systems.
          </p>
        </div>

        <EnhancedMarquee
          items={techLogos.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="font-medium text-sm text-white/80 hidden sm:inline">{tech.name}</span>
            </div>
          ))}
          duration={40}
          direction="left"
          gap={16}
          speed={1}
          pauseOnHover
        />

        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-widest text-white/40">
            Plus PostgreSQL, Supabase, Redis, Docker, Vercel, and more
          </p>
        </div>
      </div>
    </section>
  );
};
