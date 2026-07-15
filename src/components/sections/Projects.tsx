"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { GridJunctions } from "@/components/common/GridJunctions";

const solutions = [
  {
    title: "Business platforms",
    category: "Core product",
    index: "01",
    description: "Software shaped around how your business actually works.",
    tags: ["Portals", "SaaS", "Customer systems"],
    href: "/services",
  },
  {
    title: "Operations tools",
    category: "Internal systems",
    index: "02",
    description: "Tools that replace repeated handoffs and spreadsheet work.",
    tags: ["Dashboards", "Workflows", "Admin"],
    href: "/services",
  },
  {
    title: "Connected workflows",
    category: "Automation",
    index: "03",
    description: "Clean links between the products, data, and teams you already use.",
    tags: ["APIs", "Data flows", "Automation"],
    href: "/services",
  },
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>("[data-project-row]");
      const content = Array.from(rows).flatMap((row) => Array.from(row.children));
      gsap.set(content, { opacity: 0, y: 16, filter: "blur(2px)" });

      ScrollTrigger.batch(rows, {
        start: "top 84%",
        onEnter: (els) => {
          const targets = els.flatMap((row) => Array.from(row.children));
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.04,
            ease: "power4.out",
            clearProps: "transform,filter",
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
      id="projects"
      className="chapter-graphite"
      data-chapter="Solutions"
    >
      <div className="modular-grid modular-grid--viewport has-complete-junctions">
        <GridJunctions />
        <div className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">What we build</p>
          <div>
            <h2 className="modular-display text-[clamp(3.4rem,7vw,7rem)] text-[color:var(--text-strong)]">
              Systems
              <br />
              that <span className="home-accent-word">fit</span><span className="accent-stop">.</span>
            </h2>
          </div>
        </div>
        <div className="modular-box flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Custom by default</p>
          <p className="max-w-[20ch] text-[clamp(1.4rem,2.1vw,2.15rem)] leading-[1.08] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            Requirement-led. <span className="home-serif-accent">Not packaged</span>.
          </p>
        </div>
        <a
          href="/services"
          data-cursor="VIEW"
          data-motion-link
          className="modular-box group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]"
        >
          <span className="display-kicker text-[color:var(--text-faint)]">Explore</span>
          <div>
            <div className="modular-display text-[clamp(2.8rem,4.8vw,5.2rem)] text-[color:var(--text-strong)]">
              View
              <br />
              services<span className="accent-stop">.</span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
              <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">View services</span>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--text-strong)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </a>

        {solutions.map((project, index) => (
          <a
            key={project.title}
            href={project.href}
            data-cursor="VIEW"
            data-motion-link
            data-project-row
            className={`modular-box group flex min-h-[calc(var(--module-cell)*2.45)] flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075] ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="modular-copy text-[color:var(--accent-primary)]">.{project.index}</span>
                <span className="modular-copy">{project.category}</span>
              </div>
              <h3 className="modular-display mt-6 text-[clamp(2.2rem,4vw,3.9rem)] text-[color:var(--text-strong)]">
                {project.title}
              </h3>
              <p className="mt-4 max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {project.description}
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--line-subtle)] pt-4">
              <div data-motion-label className="modular-copy text-[color:var(--text-faint)]">{project.tags.join(" / ")}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
