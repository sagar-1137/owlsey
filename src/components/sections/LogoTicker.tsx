"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const engagementModes = [
  {
    index: "01",
    title: "Build from scratch.",
    body: "Turn a requirement into a focused product, platform, or internal system.",
  },
  {
    index: "02",
    title: "Improve what exists.",
    body: "Reshape an existing product without discarding the parts that already work.",
  },
  {
    index: "03",
    title: "Connect the gaps.",
    body: "Integrate tools, data, and workflows so the operation works as one.",
  },
  {
    index: "04",
    title: "Support and evolve.",
    body: "Keep improving after launch as usage, priorities, and scale change.",
  },
];

export const EngagementModes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-engagement-cell]");
      gsap.set(cells, { opacity: 0, y: 16 });
      ScrollTrigger.batch(cells, {
        start: "top 88%",
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="engagement" aria-labelledby="engagement-title">
      <h2 id="engagement-title" className="sr-only">Ways to work with Owlsey</h2>
      <div className="modular-grid modular-grid--compact">
        {engagementModes.map((mode, index) => (
          <Link
            key={mode.index}
            href="/contact"
            data-engagement-cell
            className={`modular-box group flex min-h-[calc(var(--module-cell)*1.7)] flex-col justify-between ${index === 3 ? "modular-box-dark" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className={`display-kicker ${index === 3 ? "text-white/55" : "text-[color:var(--text-faint)]"}`}>
                Engagement {mode.index}
              </span>
              <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${index === 3 ? "text-white" : "text-[color:var(--text-muted)]"}`} />
            </div>
            <div>
              <h3 className={`modular-display max-w-[9ch] text-[clamp(2.2rem,3.8vw,4rem)] ${index === 3 ? "text-white" : "text-[color:var(--text-strong)]"}`}>
                {mode.title}
              </h3>
              <p className={`mt-5 max-w-[28ch] text-sm leading-6 ${index === 3 ? "text-white/65" : "text-[color:var(--text-muted)]"}`}>
                {mode.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
