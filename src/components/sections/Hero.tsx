"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Target } from "lucide-react";
import { MagneticGsap } from "@/components/common/MagneticGsap";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const capabilities = ["Business platforms", "Internal tools", "Connected workflows"];
const gridColumns = [0, 25, 50, 75, 100];
const gridRows = [0, 50, 100];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = heroRef.current;
    const lightweightDevice = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (!root || prefersReducedMotion || lightweightDevice) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // PHASE 1: Initial entrance timeline (~2.8s total)
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from("[data-hero-grid]", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.15,
          ease: "power4.inOut",
        })
        .from(
          "[data-hero-reveal]",
          { opacity: 0, y: 24, filter: "blur(6px)", duration: 0.8, stagger: 0.08 },
          0.5
        )
        .fromTo(
          "[data-hero-scan]",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: "power4.inOut" },
          0.72,
        );

      const typeTarget = root.querySelector<HTMLElement>("[data-hero-type]");
      if (typeTarget) {
        const phrases = ["Requirement-led systems", "Designed for real workflows", "Built for long ownership"];
        const typeTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.55 });
        phrases.forEach((phrase, phraseIndex) => {
          const writer = { value: 0 };
          typeTimeline
            .to(writer, {
              value: phrase.length,
              duration: phrase.length * 0.055,
              ease: "none",
              onStart: () => { typeTarget.textContent = ""; },
              onUpdate: () => { typeTarget.textContent = phrase.slice(0, Math.round(writer.value)); },
            })
            .to({}, { duration: phraseIndex === phrases.length - 1 ? 1.4 : 1.05 })
            .to(writer, {
              value: 0,
              duration: 0.42,
              ease: "power2.in",
              onUpdate: () => { typeTarget.textContent = phrase.slice(0, Math.round(writer.value)); },
            });
        });
      }

    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} id="home" className="chapter-smoke relative" data-chapter="Direction">
      <div data-hero-grid className="longbow-hero-grid">
        <div className="longbow-grid-junctions" aria-hidden="true">
          {gridRows.flatMap((row) =>
            gridColumns.map((column) => (
              <span key={`${row}-${column}`} style={{ left: `${column}%`, top: `${row}%` }} />
            ))
          )}
        </div>

        <div className="longbow-hero-visual" aria-hidden="true">
          <div className="longbow-hero-wash" />
          <div className="longbow-hero-scan" data-hero-scan />
        </div>

        <div className="longbow-hero-center" data-hero-reveal>
          <div className="longbow-hero-center-copy">
            <p className="display-kicker text-[color:var(--text-faint)]">Independent software engineering / 01</p>
            <h1>
              Built around
              <br />
              <span>real work.</span>
            </h1>
            <p className="longbow-hero-center-note">
              Custom platforms, internal tools, and connected workflows shaped around how your team actually operates.
            </p>
          </div>
        </div>

        <div className="longbow-hero-meta longbow-hero-meta-left" data-hero-reveal>
          <span className="longbow-hero-meta-mark" aria-hidden="true">◇</span>
          <div className="longbow-hero-meta-brand">
            <span className="longbow-hero-meta-name">Owlsey</span>
            <span className="longbow-hero-meta-role">Custom software studio</span>
          </div>
        </div>

        <div className="longbow-hero-meta longbow-hero-meta-right" data-hero-reveal>
          <span className="longbow-hero-status">
            <span className="longbow-hero-status-dot" aria-hidden="true" />
            Available for projects
          </span>
          <span className="longbow-hero-meta-detail longbow-typewriter">
            <span data-hero-type>Requirement-led systems</span>
          </span>
        </div>

        <div className="longbow-hero-intro" data-hero-reveal>
          <span className="pattern pattern--zigzag pattern--bl" aria-hidden="true" />
          <p className="display-kicker text-[color:var(--text-dim)]">Client context</p>
          <div className="mt-auto">
            <span className="ring-icon mb-7" aria-hidden="true">
              <Target className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <p className="modular-display text-[clamp(2.8rem,4.6vw,5.2rem)] text-[color:var(--text-strong)]">
              Right <span className="home-accent-word">fit</span><span className="accent-stop">.</span>
            </p>
            <p className="mt-6 max-w-[25ch] border-t border-[color:var(--line-strong)] pt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
              Requirement first. Stack second.
            </p>
          </div>
        </div>

        <article className="longbow-hero-statement" id="services">
          <div data-hero-reveal className="flex h-full flex-col">
            <p className="display-kicker text-[color:var(--text-faint)]">Custom software</p>
            <p className="mt-5 text-[clamp(3.25rem,5.2vw,6.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[color:var(--text-strong)]" style={{ fontFamily: "var(--font-impact)" }}>
              Software
              <br />
              that <span className="home-accent-word">fits</span><span className="accent-stop">.</span>
            </p>

            <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-5 pt-8">
              <p className="max-w-[28ch] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
                Your requirement, preferred stack, and our engineering judgement.
              </p>
              <MagneticGsap
                as="a"
                href="/contact"
                data-cursor="START"
                aria-label="Start a project"
                className="group flex h-12 w-12 shrink-0 items-center justify-center border border-[color:var(--line-accent)] text-[color:var(--text-strong)] transition-colors hover:bg-[#242729] hover:text-white"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticGsap>
            </div>
          </div>
        </article>

        <div className="longbow-hero-capabilities">
          <p data-hero-reveal className="display-kicker text-[color:var(--text-faint)]">Core work</p>
          <div className="mt-auto">
            {capabilities.map((capability) => (
              <div key={capability} data-hero-reveal className="longbow-hero-capability">
                <span>{capability}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <a href="/services" data-cursor="VIEW" data-motion-link className="longbow-hero-route group" data-hero-reveal>
          <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
          <p className="display-kicker text-[color:var(--text-faint)]">Start simple</p>
          <div className="mt-auto">
            <p className="modular-display text-[clamp(2.7rem,4.4vw,4.8rem)] text-[color:var(--text-strong)]">
              Open
              <br />
              the <span className="home-accent-word">brief</span><span className="accent-stop">.</span>
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
              <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">Start a project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};
