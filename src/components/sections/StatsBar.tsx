"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { ensureGsap } from "@/lib/gsap";

// The process is already told by the chapter above; this section answers the
// buyer's next question — "how would we actually work together?"
const operatingLayers = [
  {
    label: "Start here",
    title: "Discovery.",
    body: "A free scoping session: requirements, user flows, architecture, and a fixed estimate you can take anywhere. Scheduled as soon as our workload allows.",
  },
  {
    label: "Clear scope",
    title: "Fixed build.",
    body: "Defined scope, milestones, and price. Best when the requirement is known and the deadline matters.",
  },
  {
    label: "Ongoing product",
    title: "Dedicated team.",
    body: "Engineers and a lead who work as your product team, month to month, with a shared roadmap.",
  },
  {
    label: "After launch",
    title: "Support.",
    body: "Monitoring, fixes, updates, and new features on a monthly plan — the first months after launch included at no cost, as set in your agreement.",
  },
];

export const StatsBar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    // Desktop + fine pointer only, same gate as the pinned chapters around it.
    if (!root || !window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const kicker = root.querySelector<HTMLElement>("[data-method-kicker]");
      const lines = root.querySelectorAll<HTMLElement>("[data-method-line]");
      const side = root.querySelectorAll<HTMLElement>("[data-method-side]");
      const steps = root.querySelectorAll<HTMLElement>("[data-method-step]");
      const stepContent = root.querySelectorAll<HTMLElement>("[data-method-step] > *");

      gsap.set(kicker, { opacity: 0, y: 14, letterSpacing: "0.28em" });
      gsap.set(lines, { yPercent: 115 });
      gsap.set(side, { opacity: 0, y: 28, clipPath: "inset(18% 0% 0% 0%)" });
      // Same corner-wipe the process chapter uses for its cards.
      gsap.set(steps, {
        clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      });
      gsap.set(stepContent, { opacity: 0, y: 24 });

      // The section supplies the scroll distance; its grid stays sticky, so
      // the reveal reads as a chapter like the pinned ones either side of it.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(kicker, { opacity: 1, y: 0, letterSpacing: "0.18em", duration: 0.12, ease: "power2.out" }, 0)
        .to(lines, { yPercent: 0, stagger: 0.08, duration: 0.2, ease: "power3.out" }, 0.04)
        .to(side, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.07, duration: 0.2, ease: "power3.out" }, 0.18)
        .to(steps, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          stagger: 0.08,
          duration: 0.3,
          ease: "power3.out",
        }, 0.36)
        .to(stepContent, { opacity: 1, y: 0, stagger: 0.025, duration: 0.24, ease: "power3.out" }, 0.44);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-dark chapter-ink theme-paper home-method-pin" data-chapter="Method" data-motion-own aria-labelledby="operating-system-title">
      <div className="modular-grid modular-grid--viewport home-method-grid technical-grid-host">
        <TechnicalGrid className="section-technical-grid" />
        <div className="modular-box home-method-lead md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <span className="pattern pattern--ticks pattern--tr" aria-hidden="true" />
          <p data-method-kicker className="display-kicker text-[color:var(--text-dim)]">Engagement models</p>
          <h2 id="operating-system-title" className="modular-display max-w-[9ch] text-[clamp(3.4rem,7vw,7.2rem)] text-[color:var(--text-strong)]">
            <span className="home-method-line-mask"><span data-method-line>Work</span></span>
            <span className="home-method-line-mask">
              <span data-method-line>your <span className="home-accent-word">way</span><span className="accent-stop">.</span></span>
            </span>
          </h2>
        </div>

        <div data-method-side className="modular-box home-method-balance flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">What you get</p>
          <p className="max-w-[20ch] text-[clamp(1.45rem,2.2vw,2.25rem)] leading-[1.05] tracking-[-0.035em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
            Your code. Your IP. Weekly <span className="home-serif-accent">demos</span>.
          </p>
        </div>

        <a href="/contact" data-cursor="START" data-motion-link data-method-side className="modular-box modular-box-dark home-method-route group flex flex-col justify-between">
          <p className="display-kicker text-white/55">Not sure which?</p>
          <div>
            <p className="modular-display text-[clamp(2.8rem,4.8vw,5.2rem)] text-white">
              Ask
              <br />
              <span className="home-accent-word">us</span><span className="accent-stop">.</span>
            </p>
            <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
              <span data-motion-label className="display-kicker text-white/65">Get a recommendation</span>
              <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </a>

        {operatingLayers.map((layer) => (
          <article key={layer.label} data-method-step className="modular-box home-method-step group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]">
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
