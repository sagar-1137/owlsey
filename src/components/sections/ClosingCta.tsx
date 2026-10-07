"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { MagneticGsap } from "@/components/common/MagneticGsap";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * The narrative's end-cap: after the stack chapter the page previously fell
 * straight into the footer with no closing beat. This echoes the hero's
 * "Open the brief." invitation as a deliberate final statement before the
 * footer's utility content. Motion follows the StatsBar grammar — cells'
 * children rise once on entry, nothing scroll-scrubbed.
 */
export const ClosingCta: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-cta-cell]");
      const content = Array.from(cells).flatMap((cell) => Array.from(cell.children));
      gsap.set(content, { opacity: 0, y: 16, filter: "blur(2px)" });
      ScrollTrigger.batch(cells, {
        start: "top 86%",
        once: true,
        onEnter: (elements) => {
          const targets = elements.flatMap((cell) => Array.from(cell.children));
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: 0.035,
            ease: "power4.out",
            clearProps: "transform,filter",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-dark chapter-smoke" data-chapter="Talk" aria-labelledby="closing-cta-title">
      <div className="modular-grid home-cta-grid technical-grid-host">
        <TechnicalGrid className="section-technical-grid" />

        <div data-cta-cell className="modular-box md:col-span-2 lg:col-span-3 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">Next step</p>
          <div>
            <h2 id="closing-cta-title" className="modular-display max-w-[11ch] text-[clamp(3.4rem,7vw,7.2rem)] text-[color:var(--text-strong)]">
              Have a brief?
              <br />
              Open <span className="home-accent-word">it</span><span className="accent-stop">.</span>
            </h2>
            <p className="mt-6 max-w-[34ch] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
              One conversation. A clear route. No packaged pitch.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          data-cursor="START"
          data-motion-link
          data-cta-cell
          className="modular-box modular-box-dark group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]"
        >
          <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
          <p className="display-kicker text-white/55">Start a project</p>
          <div>
            <p className="modular-display text-[clamp(2.6rem,4.4vw,4.8rem)] text-white">
              Start
              <br />
              <span className="home-accent-word">now</span><span className="accent-stop">.</span>
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
              <span data-motion-label className="display-kicker text-white/65">Open a brief</span>
              <MagneticGsap
                as="div"
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--line-accent)] text-white transition-colors group-hover:bg-[#242729]"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticGsap>
            </div>
          </div>
        </Link>

        <a
          href="mailto:hello@owlsey.com"
          data-cursor="MAIL"
          data-motion-link
          data-cta-cell
          className="modular-box group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075] lg:col-span-4"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="display-kicker text-[color:var(--text-faint)]">Prefer mail</span>
            <span className="flex items-center gap-3">
              <span data-motion-label className="modular-copy text-[color:var(--text-muted)]">hello@owlsey.com</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--text-strong)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
