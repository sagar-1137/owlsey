"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { ProjectIllustration } from "@/components/common/ProjectIllustration";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECT_CASES, type ProjectCase } from "@/data/projectCases";

type ProjectDetailContentProps = {
  project: ProjectCase;
};

const typeLabel = (project: ProjectCase) =>
  project.kind === "product" ? "Our product" : project.confidential ? "Client · NDA" : "Client project";

/** The case's visual: the real screenshot when shareable, otherwise a schematic. */
const CaseVisual: React.FC<{ project: ProjectCase; priority?: boolean; sizes: string }> = ({ project, priority, sizes }) =>
  project.image ? (
    <Image
      src={project.image}
      alt={`${project.title} — live product screenshot`}
      width={1440}
      height={900}
      sizes={sizes}
      priority={priority}
    />
  ) : (
    <ProjectIllustration visual={project.visual} title={project.title} />
  );

/**
 * One case-study template that every project fits: hero facts, a visual
 * band (screenshot or illustration), the story in three beats, what was
 * built, and the next case. All headings come from the project's own data,
 * so no two pages read the same.
 */
export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const index = PROJECT_CASES.findIndex((item) => item.slug === project.slug);
  const next = PROJECT_CASES[(index + 1) % PROJECT_CASES.length];
  // The headline is split into a plain lead and an accented tail; the accent
  // stop supplies the full stop, so drop the one in the data.
  const resultWords = project.result.replace(/\.$/, "").split(" ");
  const liveHost = project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-case-cell]");
      ScrollTrigger.batch(cells, {
        start: "top 88%",
        once: true,
        onEnter: (elements) => {
          const content = elements.flatMap((cell) => Array.from(cell.children));
          gsap.fromTo(
            content,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: "power4.out", clearProps: "transform,opacity" }
          );
        },
      });

      // The visual band rises and un-scales as it enters, like a slide
      // being placed — the one moment on the page that should feel physical.
      const frame = root.querySelector<HTMLElement>("[data-case-frame]");
      if (frame) {
        gsap.fromTo(
          frame,
          { y: 60, scale: 0.94, clipPath: "inset(6% 4% 0% 4% round 18px)" },
          {
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 35%", scrub: 0.8 },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white projects-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          {/* 1 — Hero: what it is, at a glance. */}
          <section className="chapter-obsidian projects-chapter case-hero" data-chapter={project.label} data-motion-own aria-labelledby="case-title">
            <div className="modular-grid case-hero-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div data-case-cell className="modular-box case-hero-main md:col-span-2 lg:col-span-3 flex flex-col justify-between">
                <span className="pattern pattern--weave pattern--br pattern--lg" aria-hidden="true" />
                <nav className="case-breadcrumb" aria-label="Breadcrumb">
                  <Link href="/projects" data-cursor="BACK">Projects</Link>
                  <span aria-hidden="true">/</span>
                  <span>{project.label}</span>
                  <span className="case-index">{project.index}</span>
                </nav>
                <div>
                  <h1 id="case-title" className="modular-display case-title">
                    {project.title}<span className="accent-stop">.</span>
                  </h1>
                  <p className="case-summary">{project.summary}</p>
                </div>
              </div>

              <aside data-case-cell className="modular-box case-hero-meta md:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <dl className="case-facts">
                  <div>
                    <dt>Industry</dt>
                    <dd>{project.label}</dd>
                  </div>
                  <div>
                    <dt>Type</dt>
                    <dd>{typeLabel(project)}</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>{project.eyebrow}</dd>
                  </div>
                  {project.metric && (
                    <div>
                      <dt>{project.metric.label}</dt>
                      <dd className="case-facts-metric">{project.metric.value}</dd>
                    </div>
                  )}
                </dl>
                <div className="case-hero-actions">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="VISIT" className="case-button case-button--primary group">
                      Visit live product
                      <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : project.confidential ? (
                    <p className="case-nda-note">Built under NDA — the client&apos;s name and screens are withheld; the visual below is illustrative.</p>
                  ) : null}
                  <Link href="/projects" data-cursor="BACK" className="case-button group">
                    <ArrowLeft aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                    All projects
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          {/* 2 — The product itself. */}
          <section className="case-visual" data-chapter="Visual" data-motion-own aria-label={`${project.title} visual`}>
            <figure data-case-frame className="case-frame">
              <div className="case-frame-bar" aria-hidden="true">
                <span /><span /><span />
                <em>{liveHost ?? (project.image ? project.title : `${project.title} · illustration`)}</em>
              </div>
              <div className="case-frame-media">
                <CaseVisual project={project} priority sizes="(min-width: 1024px) 90vw, 100vw" />
                {project.metric && (
                  <div className="case-frame-metric">
                    <strong>{project.metric.value}</strong>
                    <span>{project.metric.label}</span>
                  </div>
                )}
              </div>
            </figure>
          </section>

          {/* 3 — The story in three beats, opened by the case's own result. */}
          <section className="chapter-steel projects-chapter case-story" data-chapter="Story" data-motion-own aria-labelledby="case-result">
            <div className="modular-grid case-story-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div data-case-cell className="modular-box case-result md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <span className="pattern pattern--ticks pattern--tr" aria-hidden="true" />
                <p className="display-kicker text-[color:var(--text-dim)]">The result</p>
                <h2 id="case-result" className="modular-display case-result-title">
                  {resultWords.slice(0, 3).join(" ")} <span className="projects-accent-word">{resultWords.slice(3).join(" ")}</span><span className="accent-stop">.</span>
                </h2>
              </div>

              <div data-case-cell className="modular-box case-body md:col-span-2 lg:col-span-2 flex flex-col justify-end">
                <p className="case-body-text">{project.body}</p>
              </div>

              {[
                { step: "01", title: "The challenge", text: project.challenge },
                { step: "02", title: "What we built", text: project.system },
                { step: "03", title: "The outcome", text: project.outcome },
              ].map((beat) => (
                <article key={beat.step} data-case-cell className="modular-box case-beat flex flex-col justify-between">
                  <span className="case-beat-step">{beat.step}</span>
                  <div>
                    <h3 className="case-beat-title">{beat.title}</h3>
                    <p className="case-beat-text">{beat.text}</p>
                  </div>
                </article>
              ))}

              <article data-case-cell className="modular-box case-proof flex flex-col justify-between">
                <span className="case-beat-step">At a glance</span>
                <dl className="case-proof-list">
                  {project.proof.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          </section>

          {/* 4 — What was built, and with what. */}
          <section className="chapter-obsidian projects-chapter case-build" data-chapter="Build" data-motion-own aria-label="Scope and stack">
            <div className="modular-grid case-build-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div data-case-cell className="modular-box case-build-cell md:col-span-1 lg:col-span-2">
                <p className="display-kicker text-[color:var(--text-dim)]">Scope</p>
                <ul className="case-scope">
                  {project.scope.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" strokeWidth={1.75} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-case-cell className="modular-box case-build-cell md:col-span-1 lg:col-span-2">
                <p className="display-kicker text-[color:var(--text-dim)]">Stack</p>
                <ul className="case-stack">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 5 — Keep going: the next case, or start one. */}
          <section className="chapter-steel projects-chapter case-next" data-chapter="Next" data-motion-own aria-label="Next project">
            <div className="modular-grid case-next-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <Link href={`/projects/${next.slug}`} data-cursor="NEXT" data-case-cell className="modular-box case-next-card md:col-span-2 lg:col-span-3 group">
                <div className="case-next-copy">
                  <p className="display-kicker text-[color:var(--text-dim)]">Next case · {next.index}</p>
                  <p className="modular-display case-next-title">
                    {next.title}<span className="accent-stop">.</span>
                  </p>
                  <p className="case-next-summary">{next.summary}</p>
                  <span className="case-next-cta">
                    View case
                    <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="case-next-thumb">
                  <CaseVisual project={next} sizes="(min-width: 1024px) 30vw, 100vw" />
                </div>
              </Link>

              <Link href="/contact" data-cursor="START" data-case-cell className="modular-box modular-box-dark case-start md:col-span-2 lg:col-span-1 group flex flex-col justify-between">
                <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
                <p className="display-kicker text-white/55">Need something similar?</p>
                <div>
                  <p className="modular-display text-[clamp(2.4rem,3.6vw,3.8rem)] text-white">
                    Start a <span className="projects-accent-word">project</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="display-kicker text-white/65">Free discovery</span>
                    <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
