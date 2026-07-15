"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GridJunctions } from "@/components/common/GridJunctions";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const operatingLayers = [
  {
    label: "Listen",
    title: "Understand.",
    body: "Need, users, constraints.",
  },
  {
    label: "Shape",
    title: "Resolve.",
    body: "Route, scope, stack.",
  },
  {
    label: "Build",
    title: "Build.",
    body: "Useful releases.",
  },
  {
    label: "Evolve",
    title: "Improve.",
    body: "Support after launch.",
  },
];

export const StatsBar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-operating-cell]");
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
    <section ref={sectionRef} className="section-dark chapter-ink" data-chapter="Method" aria-labelledby="operating-system-title">
      <div className="modular-grid modular-grid--viewport has-complete-junctions">
        <GridJunctions />
        <div data-operating-cell className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">Delivery model</p>
          <h2 id="operating-system-title" className="modular-display max-w-[9ch] text-[clamp(3.4rem,7vw,7.2rem)] text-[color:var(--text-strong)]">
            Brief
            <br />
            to <span className="home-accent-word">release</span><span className="accent-stop">.</span>
          </h2>
        </div>

        <div data-operating-cell className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">The balance</p>
          <p className="max-w-[20ch] text-[clamp(1.45rem,2.2vw,2.25rem)] leading-[1.05] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            Your context. Our <span className="home-serif-accent">judgement</span>.
          </p>
        </div>

        <a href="/experience" data-cursor="PROCESS" data-motion-link data-operating-cell className="modular-box modular-box-dark group flex flex-col justify-between">
          <p className="display-kicker text-white/55">One route</p>
          <div>
            <p className="modular-display text-[clamp(2.8rem,4.8vw,5.2rem)] text-white">
              Clear
              <br />
              <span className="home-accent-word">route</span><span className="accent-stop">.</span>
            </p>
            <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
              <span data-motion-label className="display-kicker text-white/65">See how we work</span>
              <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </a>

        {operatingLayers.map((layer) => (
          <article key={layer.label} data-operating-cell className="modular-box group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]">
            <p className="display-kicker text-[color:var(--text-faint)]">{layer.label}</p>
            <div>
              <h3 className="modular-display max-w-[8ch] text-[clamp(2.35rem,4vw,4.4rem)] text-[color:var(--text-strong)]">
                {layer.title}
              </h3>
              <p className="mt-6 max-w-[28ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {layer.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
