"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Gauge,
  GitMerge,
  Layers3,
  LineChart,
  ListChecks,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GridJunctions } from "@/components/common/GridJunctions";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECT_CASES } from "@/data/projectCases";

const SIGNALS = [
  { label: "Problem", value: "Workflow scattered across tools.", Icon: ListChecks },
  { label: "System", value: "One route around the real operation.", Icon: Gauge },
  { label: "Ownership", value: "Built so the team can keep moving.", Icon: ShieldCheck },
];

const PROJECT_ICONS = {
  "order-control-system": Boxes,
  "client-portal": Layers3,
  "data-bridge": GitMerge,
  "release-framework": Route,
};

export default function ProjectsContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-projects-cell]");

      ScrollTrigger.batch(cells, {
        start: "top 86%",
        once: true,
        onEnter: (elements) => {
          const content = elements.flatMap((cell) => Array.from(cell.children));
          gsap.fromTo(
            content,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.035,
              ease: "power4.out",
              clearProps: "transform,opacity,filter",
            }
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white projects-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          <section className="chapter-obsidian projects-chapter" data-chapter="Projects" aria-labelledby="projects-title">
            <div className="modular-grid projects-hero-grid has-complete-junctions">
              <GridJunctions />

              <div data-projects-cell className="modular-box projects-lead flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">Selected systems</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    <LineChart className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <h1 id="projects-title" className="modular-display max-w-[8ch] text-[clamp(3.8rem,6.4vw,6.9rem)] text-[color:var(--text-strong)]">
                    Work that <span className="projects-accent-word">holds</span><span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[28ch] border-t border-[color:var(--line-strong)] pt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
                  Selected examples of systems shaped around real requirements, not template categories.
                </p>
              </div>

              <div data-projects-cell className="modular-box projects-brief flex flex-col justify-between">
                <div className="text-center">
                  <p className="display-kicker text-[color:var(--projects-accent-soft)]">How we show work</p>
                  <h2 className="modular-display mx-auto mt-4 max-w-[13ch] text-[clamp(3rem,5vw,5.8rem)] text-[color:var(--text-strong)]">
                    Less showcase. More <span className="projects-accent-word">proof</span><span className="accent-stop">.</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-[46ch] text-sm leading-6 text-[color:var(--text-muted)]">
                    Each project is judged by whether the system fits the operation, can be maintained, and keeps improving after launch.
                  </p>
                </div>
                <div className="projects-signal-list" aria-label="Project signals">
                  {SIGNALS.map(({ label, value, Icon }) => (
                    <article key={label}>
                      <span className="projects-small-icon" aria-hidden="true">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <span>
                        <strong>{label}</strong>
                        <small>{value}</small>
                      </span>
                    </article>
                  ))}
                </div>
              </div>

              <Link href="/contact" data-cursor="START" data-motion-link data-projects-cell className="modular-box modular-box-dark projects-start group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Project enquiry</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display max-w-[7ch] text-[clamp(2.9rem,4.8vw,5.2rem)] text-white">
                    Build the <span className="projects-accent-word">next</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
                    <span data-motion-label className="display-kicker text-white/65">Open brief</span>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div data-projects-cell className="modular-box projects-position flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Project logic</p>
                <p className="max-w-[16ch] text-[clamp(1.65rem,2.5vw,2.7rem)] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  Built around the <span className="projects-serif-accent">work</span>, not the screenshot.
                </p>
              </div>

              <div data-projects-cell className="modular-box projects-proof flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">What matters</p>
                <div>
                  <p className="modular-display max-w-[8ch] text-[clamp(2.9rem,4.8vw,5.2rem)] text-[color:var(--text-strong)]">
                    Useful after <span className="projects-accent-word">launch</span><span className="accent-stop">.</span>
                  </p>
                  <p className="mt-6 max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">
                    The best project is the one your team can keep using, improving, and owning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="chapter-steel projects-chapter" data-chapter="Systems" aria-labelledby="selected-systems-title">
            <div className="modular-grid projects-range-grid modular-grid--viewport has-complete-junctions">
              <GridJunctions />

              <div data-projects-cell className="modular-box projects-range-head md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-dim)]">Case patterns</p>
                <h2 id="selected-systems-title" className="modular-display max-w-[9ch] text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
                  Selected <span className="projects-accent-word">systems</span><span className="accent-stop">.</span>
                </h2>
              </div>

              <div data-projects-cell className="modular-box projects-range-note flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Confidential by default</p>
                <p className="max-w-[18ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  Client details stay protected. The pattern is enough.
                </p>
              </div>

              <Link href="/services" data-cursor="SERVICES" data-motion-link data-projects-cell className="modular-box projects-range-cta group flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Capabilities</p>
                <div>
                  <p className="modular-display text-[clamp(2.8rem,4.7vw,5rem)] text-[color:var(--text-strong)]">
                    See the <span className="projects-accent-word">range</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">View services</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {PROJECT_CASES.map(({ slug, index, label, title, summary, result, meta }) => {
                const Icon = PROJECT_ICONS[slug as keyof typeof PROJECT_ICONS] ?? Boxes;

                return (
                <Link key={slug} href={`/projects/${slug}`} data-cursor="OPEN" data-motion-link data-projects-cell className="modular-box projects-case-card group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="modular-copy text-[color:var(--projects-accent-soft)]">.{index}</span>
                      <span className="projects-small-icon" aria-hidden="true">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-6 display-kicker text-[color:var(--text-faint)]">{label}</p>
                    <h3 className="modular-display mt-3 text-[clamp(2.05rem,3.45vw,3.55rem)] text-[color:var(--text-strong)]">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-[31ch] text-sm leading-6 text-[color:var(--text-muted)]">{summary}</p>
                  </div>
                  <div className="mt-8 border-t border-[color:var(--line-subtle)] pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm leading-6 text-[color:var(--text-body)]">{result}</p>
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-[color:var(--projects-accent-soft)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <p data-motion-label className="modular-copy mt-5 text-[color:var(--text-faint)]">{meta}</p>
                  </div>
                </Link>
              );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
