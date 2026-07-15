"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const experience = [
  {
    title: "Requirements",
    text: "We map business goals, users, workflows, constraints, and the decisions the product must support.",
    metric: "Business fit",
    metricLabel: "before technical commitment",
  },
  {
    title: "Recommendation",
    text: "We balance your preferred technology with maintainability, cost, performance, and long-term ownership.",
    metric: "Technical fit",
    metricLabel: "explained before it is selected",
  },
  {
    title: "Delivery",
    text: "We release useful increments with visible progress, practical quality, and room to evolve.",
    metric: "Working software",
    metricLabel: "released around real priorities",
  },
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cells = root.querySelectorAll<HTMLElement>("[data-exp-cell]");
      // Pin GSAP start values to match CSS pre-hide rule.
      gsap.set(cells, { y: 20, opacity: 0 });

      ScrollTrigger.batch(cells, {
        start: "top 82%",
        onEnter: (els) => {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.075,
            ease: "power3.out",
          });

          els.forEach((el) => {
            const underline = el.querySelector<HTMLElement>("[data-exp-underline]");
            if (underline) {
              gsap.fromTo(
                underline,
                { scaleX: 0, transformOrigin: "left" },
                { scaleX: 1, duration: 0.9, ease: "expo.out", delay: 0.35 }
              );
            }
          });
        },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === root)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
    >
      <div className="modular-grid modular-grid--viewport">
        <div className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">A shared technical route</p>
          <div>
            <h2 className="modular-display text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
              Your context.
              <br />
              Our judgement<span className="accent-stop">.</span>
            </h2>
          </div>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">How decisions are made</p>
          <p className="max-w-[20ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            We do not ignore your tech preference or follow it blindly. We find the strongest route together.
          </p>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Working principles</p>
          <div className="modular-number text-[clamp(3rem,6vw,5rem)] text-[color:var(--text-faint)]">04</div>
        </div>

        {experience.map((item, index) => (
          <article
            key={item.title}
            data-exp-cell
            className="modular-box group flex min-h-[calc(var(--module-cell)*2.3)] flex-col justify-between transition-colors duration-300 hover:bg-black/[0.02]"
          >
            <div>
              <div className="display-kicker text-[color:var(--text-faint)]">Delivery principle {index + 1}</div>
              <h3 className="mt-5 text-[clamp(2rem,3.8vw,3.5rem)] leading-[0.9] tracking-[-0.05em] text-[color:var(--text-strong)]" style={{ fontFamily: "var(--font-impact)" }}>
                {item.title}
              </h3>
              <span data-exp-underline className="mt-4 block h-px w-16 bg-[color:var(--accent-primary)]" />
              <p className="mt-5 max-w-[28ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {item.text}
              </p>
            </div>
            <div className="border-t border-[color:var(--line-subtle)] pt-4">
              <div className="modular-number text-[clamp(1.7rem,3vw,2.4rem)] text-[color:var(--text-strong)]">{item.metric}</div>
              <div className="modular-copy mt-2">{item.metricLabel}</div>
            </div>
          </article>
        ))}

        <article
          data-exp-cell
          className="modular-box modular-box-dark flex min-h-[calc(var(--module-cell)*2.3)] flex-col justify-between"
        >
          <div>
            <div className="modular-copy text-white/58">04 Evolution</div>
            <h3 className="mt-5 text-[clamp(2rem,3.8vw,3.4rem)] leading-[0.9] tracking-[-0.05em] text-white" style={{ fontFamily: "var(--font-impact)" }}>
              Built to
              <br />
              keep moving.
            </h3>
            <p className="mt-5 max-w-[28ch] text-sm leading-6 text-white/68">
              Support, refinement, and new capability after launch, without losing the original logic.
            </p>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="modular-number text-[clamp(1.7rem,3vw,2.4rem)] text-white">After launch</div>
            <div className="modular-copy mt-2 text-white/58">support, improve, scale</div>
          </div>
        </article>
      </div>
    </section>
  );
};
