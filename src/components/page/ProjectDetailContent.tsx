"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, CircleDot, Layers3, Route, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GridJunctions } from "@/components/common/GridJunctions";
import { MotionLayer } from "@/components/common/MotionLayer";
import { ScrollDirector } from "@/components/common/ScrollDirector";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import type { ProjectCase } from "@/data/projectCases";

type ProjectDetailContentProps = {
  project: ProjectCase;
};

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-project-detail-cell]");

      ScrollTrigger.batch(cells, {
        start: "top 86%",
        once: true,
        onEnter: (elements) => {
          const content = elements.flatMap((cell) => Array.from(cell.children));
          gsap.fromTo(
            content,
            { opacity: 0, y: 14, filter: "blur(2px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.72,
              stagger: 0.035,
              ease: "power4.out",
              clearProps: "transform,filter",
            }
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <ScrollDirector />
      <SmoothScroll />
      <MotionLayer />
      <div className="modular-shell palette-white projects-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          <section className="chapter-obsidian projects-chapter project-detail-chapter" data-chapter={project.label} aria-labelledby="project-detail-title">
            <div className="modular-grid project-detail-hero-grid has-complete-junctions">
              <GridJunctions />

              <div data-project-detail-cell className="modular-box project-detail-lead flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">Case / {project.label}</p>
                  <span className="display-kicker text-[color:var(--projects-accent-soft)]">{project.index}</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    <CircleDot className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <h1 id="project-detail-title" className="modular-display max-w-[9ch] text-[clamp(3.5rem,6.2vw,6.7rem)] text-[color:var(--text-strong)]">
                    {project.title}<span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[29ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                  {project.summary}
                </p>
              </div>

              <div data-project-detail-cell className="modular-box project-detail-brief flex flex-col justify-between">
                <div className="text-center">
                  <p className="display-kicker text-[color:var(--projects-accent-soft)]">{project.eyebrow}</p>
                  <h2 className="modular-display mx-auto mt-4 max-w-[13ch] text-[clamp(3rem,5vw,5.7rem)] text-[color:var(--text-strong)]">
                    Built around the <span className="projects-accent-word">real route</span><span className="accent-stop">.</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-[44ch] text-sm leading-6 text-[color:var(--text-muted)]">{project.body}</p>
                </div>
                <div className="project-detail-proof-row" aria-label="Project proof points">
                  {project.proof.map((item) => (
                    <article key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </article>
                  ))}
                </div>
              </div>

              <Link href="/projects" data-cursor="BACK" data-motion-link data-project-detail-cell className="modular-box project-detail-back group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-faint)]">Back to work</p>
                  <ArrowLeft className="h-4 w-4 text-[color:var(--projects-accent-soft)] transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
                <div>
                  <p className="modular-display text-[clamp(2.6rem,4.5vw,4.8rem)] text-[color:var(--text-strong)]">
                    Selected <span className="projects-accent-word">systems</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">View all cases</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div data-project-detail-cell className="modular-box project-detail-challenge flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Before</p>
                <p className="max-w-[23ch] text-[clamp(1.35rem,2vw,2.1rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  {project.challenge}
                </p>
              </div>

              <div data-project-detail-cell className="modular-box modular-box-dark project-detail-outcome flex flex-col justify-between">
                <p className="display-kicker text-white/60">After</p>
                <div>
                  <p className="modular-display max-w-[11ch] text-[clamp(2.7rem,4.7vw,5.1rem)] text-white">
                    {project.result.split(" ").slice(0, 3).join(" ")} <span className="projects-accent-word">{project.result.split(" ").slice(3, 5).join(" ")}</span><span className="accent-stop">.</span>
                  </p>
                  <p className="mt-6 max-w-[36ch] text-sm leading-6 text-white/72">{project.outcome}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="chapter-steel projects-chapter project-detail-chapter" data-chapter="Inside" aria-labelledby="project-system-title">
            <div className="modular-grid project-detail-system-grid modular-grid--viewport has-complete-junctions">
              <GridJunctions />

              <div data-project-detail-cell className="modular-box project-detail-system-head md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-dim)]">System shape</p>
                <h2 id="project-system-title" className="modular-display max-w-[10ch] text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
                  Inside the <span className="projects-accent-word">build</span><span className="accent-stop">.</span>
                </h2>
              </div>

              <div data-project-detail-cell className="modular-box project-detail-system-note flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">System route</p>
                <p className="max-w-[22ch] text-[clamp(1.35rem,2vw,2.05rem)] leading-[1.1] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  {project.system}
                </p>
              </div>

              <Link href="/contact" data-cursor="START" data-motion-link data-project-detail-cell className="modular-box project-detail-start group flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Need something similar?</p>
                <div>
                  <p className="modular-display text-[clamp(2.8rem,4.7vw,5rem)] text-[color:var(--text-strong)]">
                    Open a <span className="projects-accent-word">brief</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">Start project</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <article data-project-detail-cell className="modular-box project-detail-card flex flex-col justify-between">
                <ProjectDetailList title="Scope" icon={<Layers3 className="h-3.5 w-3.5" strokeWidth={1.5} />} items={project.scope} />
              </article>

              <article data-project-detail-cell className="modular-box project-detail-card flex flex-col justify-between">
                <ProjectDetailList title="Stack" icon={<Route className="h-3.5 w-3.5" strokeWidth={1.5} />} items={project.stack} />
              </article>

              <article data-project-detail-cell className="modular-box project-detail-card project-detail-card-wide md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="projects-small-icon" aria-hidden="true">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <p className="mt-6 display-kicker text-[color:var(--text-faint)]">Decision logic</p>
                  <h3 className="modular-display mt-3 max-w-[11ch] text-[clamp(2.1rem,3.7vw,3.9rem)] text-[color:var(--text-strong)]">
                    Fit before <span className="projects-accent-word">fashion</span><span className="accent-stop">.</span>
                  </h3>
                </div>
                <p className="mt-8 max-w-[44ch] border-t border-[color:var(--line-subtle)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                  Requested technology is respected, then tested against cost, maintainability, performance, and long-term ownership.
                </p>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function ProjectDetailList({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <>
      <div>
        <span className="projects-small-icon" aria-hidden="true">
          {icon}
        </span>
        <p className="mt-6 display-kicker text-[color:var(--text-faint)]">{title}</p>
      </div>
      <ul className="project-detail-list">
        {items.map((item, index) => (
          <li key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </>
  );
}
