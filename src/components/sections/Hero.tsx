"use client";

import React, { useEffect, useRef } from "react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { HeroContentCells } from "@/components/sections/HeroContentCells";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = heroRef.current;
    const lightweightDevice = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (!root) return;

    const gsap = ensureGsap();
    if (prefersReducedMotion || lightweightDevice) {
      gsap.set(root.querySelector("[data-hero-grid]"), { clipPath: "none" });
      gsap.set(root.querySelectorAll("[data-hero-reveal]"), {
        opacity: 1,
        y: 0,
        x: 0,
        clipPath: "none",
        filter: "blur(0px)",
      });
      gsap.set(root.querySelector("[data-hero-locked-title]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // The intro resolves into this grid; cells then assemble in reading order.
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          // Begin exactly when the hero enters beneath the exiting sticky
          // intro. Waiting until 78% left a blank clipped strip between the
          // two states while the intro moved off the viewport.
          start: "top bottom",
          once: true,
        },
      });

      timeline
        .to("[data-hero-grid]", {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.15,
          ease: "power4.inOut",
        })
        .to(
          "[data-hero-reveal]",
          {
            opacity: 1,
            y: 0,
            x: 0,
            clipPath: "inset(0% 0 0 0)",
            filter: "blur(0px)",
            duration: 0.92,
            stagger: 0.09,
          },
          0.5
        )
        .to("[data-hero-locked-title]", { opacity: 1, duration: 0.45 }, 0.72);

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
        <TechnicalGrid measure={false} className="longbow-technical-grid" />

        <div className="longbow-hero-visual" aria-hidden="true">
          <div className="longbow-hero-wash" />
        </div>

        <div className="longbow-hero-center" data-hero-reveal>
          <div className="longbow-hero-center-copy">
            <p className="display-kicker text-[color:var(--text-faint)]">Independent software engineering</p>
            {/* The intro measures this heading as its landing slot. This copy
                stays hidden until the hero reveal, creating a seamless visual
                handoff while keeping the title locked in the hero afterward. */}
            <h1
              className="hero-locked-title hero-locked-title-static"
              data-hero-title-slot
              data-hero-locked-title
            >
              Software shaped
              <br />
              around your
              <br />
              <span>business.</span>
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

        {/* The four bottom-row cells live in a shared component so the intro's
            post-settle reveal and the hero render identical content. In the
            hero they are NOT part of the entrance reveal: the intro has already
            revealed these exact cells just before it fades, so re-animating
            them here read as a duplicate. A non-reveal attribute keeps them
            visible immediately, making the intro→hero fade seamless. */}
        <HeroContentCells revealAttr="data-hero-static-cell" />
      </div>
    </section>
  );
};
