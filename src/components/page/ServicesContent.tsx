"use client";

import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  Compass,
  DatabaseZap,
  FileText,
  GitBranch,
  LayoutDashboard,
  Workflow,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GridJunctions } from "@/components/common/GridJunctions";
import { MotionLayer } from "@/components/common/MotionLayer";
import { ScrollDirector } from "@/components/common/ScrollDirector";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const SERVICE_TYPES = [
  "Custom platforms",
  "Internal tools",
  "Integrations",
  "Delivery architecture",
];

const SERVICE_RANGE = [
  {
    index: "01",
    label: "Core systems",
    title: "Product platforms",
    body: "Customer portals, SaaS products, and business platforms shaped around your actual workflow.",
    meta: "Portals / SaaS / Web platforms",
    Icon: Blocks,
  },
  {
    index: "02",
    label: "Team systems",
    title: "Internal tools",
    body: "Dashboards, admin panels, approval flows, and operational tools that remove repeated manual work.",
    meta: "Dashboards / Workflows / Admin",
    Icon: LayoutDashboard,
  },
  {
    index: "03",
    label: "Connected systems",
    title: "Integrations",
    body: "APIs, automations, and data flows that make the tools you already use work as one system.",
    meta: "APIs / Data flows / Automation",
    Icon: Workflow,
  },
  {
    index: "04",
    label: "Delivery system",
    title: "Architecture",
    body: "Technical direction, stack selection, releases, and support planned around long-term ownership.",
    meta: "Stack / Releases / Support",
    Icon: GitBranch,
  },
];

const DECISION_POINTS = [
  { label: "Requirement", value: "Business fit before technical commitment.", Icon: FileText },
  { label: "Recommendation", value: "Preferred technology tested against cost, scale, and ownership.", Icon: Compass },
  { label: "Delivery", value: "Useful releases shipped in a route that can evolve.", Icon: Braces },
];

export default function ServicesContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = pageRef.current;
    if (!root || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // Main hero grid cells with staggered entrance
      const heroGridCells = root.querySelectorAll<HTMLElement>(".services-hero-grid [data-services-cell]");
      gsap.from(heroGridCells, {
        yPercent: 30,
        opacity: 0,
        filter: "blur(8px)",
        duration: MOTION_CONFIG.timing.primaryReveal,
        ease: MOTION_CONFIG.easing.revealOutStrong,
        stagger: MOTION_CONFIG.stagger.minimal,
        scrollTrigger: {
          trigger: ".services-hero-grid",
          start: "top 75%",
          markers: MOTION_CONFIG.debug,
          once: true,
        },
      });

      // Service pill animations
      gsap.from(".services-pill-list span", {
        opacity: 0,
        scale: 0.92,
        duration: MOTION_CONFIG.timing.supportingReveal,
        ease: MOTION_CONFIG.easing.revealOut,
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".services-pill-list",
          start: "top 80%",
          once: true,
        },
      });

      // Service range grid with alternating animations
      const rangeGridCells = root.querySelectorAll<HTMLElement>(".services-range-grid [data-services-cell]");
      rangeGridCells.forEach((cell, index) => {
        if (index === 0) {
          // Header cell enters from top-left
          gsap.from(cell, {
            xPercent: -10,
            yPercent: 20,
            opacity: 0,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: ".services-range-grid",
              start: "top 70%",
              once: true,
            },
          });
        } else if (index === 1) {
          // Second cell fades in
          gsap.from(cell, {
            opacity: 0,
            yPercent: 15,
            duration: MOTION_CONFIG.timing.supportingReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: ".services-range-grid",
              start: "top 68%",
              once: true,
            },
          });
        } else {
          // Capability cards with scale entrance
          gsap.from(cell, {
            yPercent: 40,
            opacity: 0,
            scale: 0.95,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".services-range-grid",
              start: "top 65%",
              once: true,
            },
          });
        }
      });

      // CTA buttons hover effect
      gsap.set("[data-motion-link]", { "--rotate": 0 });
      gsap.to("[data-motion-link]", {
        "--rotate": -5,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-motion-link]",
          start: "top 70%",
          onEnter: () => {
            gsap.to("[data-motion-link]", { "--rotate": -5 });
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <ScrollDirector />
      <SmoothScroll />
      <MotionLayer />
      <div className="modular-shell palette-white services-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          <section className="chapter-obsidian services-chapter" data-chapter="Services" aria-labelledby="services-title">
            <div className="modular-grid services-hero-grid has-complete-junctions">
              <GridJunctions />

              <div data-services-cell className="modular-box services-lead flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">Capabilities</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    <DatabaseZap className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <h1 id="services-title" className="modular-display max-w-[8ch] text-[clamp(3.7rem,6.4vw,6.9rem)] text-[color:var(--text-strong)]">
                    Build what <span className="services-accent-word">fits</span><span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[28ch] border-t border-[color:var(--line-strong)] pt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
                  Requirement-led software for teams that need a system, not another workaround.
                </p>
              </div>

              <div data-services-cell className="modular-box services-brief flex flex-col justify-between">
                <div className="text-center">
                  <p className="display-kicker text-[color:var(--services-accent-soft)]">Service direction</p>
                  <h2 className="modular-display mx-auto mt-4 max-w-[12ch] text-[clamp(3rem,5vw,5.8rem)] text-[color:var(--text-strong)]">
                    Custom systems. Clear <span className="services-accent-word">route</span><span className="accent-stop">.</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-[46ch] text-sm leading-6 text-[color:var(--text-muted)]">
                    We turn client requirements, preferred technology, and practical engineering judgement into software that can be owned after launch.
                  </p>
                </div>
                <div className="services-pill-list" aria-label="Service categories">
                  {SERVICE_TYPES.map((type) => (
                    <span key={type}>{type}</span>
                  ))}
                </div>
              </div>

              <a href="/contact" data-cursor="START" data-motion-link data-services-cell className="modular-box modular-box-dark services-start group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Project enquiry</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display max-w-[7ch] text-[clamp(2.9rem,4.8vw,5.2rem)] text-white">
                    Open the <span className="services-accent-word">brief</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
                    <span data-motion-label className="display-kicker text-white/65">Start a project</span>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>

              <div data-services-cell className="modular-box services-position flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Our position</p>
                <p className="max-w-[15ch] text-[clamp(1.65rem,2.5vw,2.7rem)] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  Your demand, improved by <span className="services-serif-accent">judgement</span>.
                </p>
              </div>

              <div data-services-cell className="modular-box services-decisions">
                {DECISION_POINTS.map(({ label, value, Icon }) => (
                  <article key={label} className="services-decision-row">
                    <span className="services-small-icon" aria-hidden="true">
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
          </section>

          <section className="chapter-steel services-chapter" data-chapter="Range" aria-labelledby="service-range-title">
            <div className="modular-grid services-range-grid modular-grid--viewport has-complete-junctions">
              <GridJunctions />

              <div data-services-cell className="modular-box services-range-head md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-dim)]">Service range</p>
                <h2 id="service-range-title" className="modular-display max-w-[9ch] text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
                  What we <span className="services-accent-word">build</span><span className="accent-stop">.</span>
                </h2>
              </div>

              <div data-services-cell className="modular-box flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Custom by default</p>
                <p className="max-w-[18ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  No forced stack. No fixed package.
                </p>
              </div>

              <a href="/contact" data-cursor="BRIEF" data-motion-link data-services-cell className="modular-box services-range-cta group flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Next step</p>
                <div>
                  <p className="modular-display text-[clamp(2.8rem,4.7vw,5rem)] text-[color:var(--text-strong)]">
                    Start with <span className="services-accent-word">context</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">Open brief</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>

              {SERVICE_RANGE.map(({ index, label, title, body, meta, Icon }) => (
                <article key={title} data-services-cell className="modular-box services-capability-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="modular-copy text-[color:var(--services-accent-soft)]">.{index}</span>
                      <span className="services-small-icon" aria-hidden="true">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-6 display-kicker text-[color:var(--text-faint)]">{label}</p>
                    <h3 className="modular-display mt-3 text-[clamp(2.1rem,3.6vw,3.65rem)] text-[color:var(--text-strong)]">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-[31ch] text-sm leading-6 text-[color:var(--text-muted)]">{body}</p>
                  </div>
                  <div className="mt-8 border-t border-[color:var(--line-subtle)] pt-4">
                    <p className="modular-copy text-[color:var(--text-faint)]">{meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
