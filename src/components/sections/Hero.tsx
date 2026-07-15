"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Target } from "lucide-react";
import { MagneticGsap } from "@/components/common/MagneticGsap";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { OwlseyMainGraphic } from "./OwlseyMainGraphic";

const capabilities = ["Business platforms", "Internal tools", "Connected workflows"];
const gridColumns = [0, 25, 50, 75, 100];
const gridRows = [0, 50, 100];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = heroRef.current;
    if (!root || prefersReducedMotion) return;

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
          "[data-hero-visual]",
          { opacity: 0, scale: 1.04, duration: 1.2, ease: "power2.out" },
          0.3
        )
        .from(
          "[data-hero-reveal]",
          { opacity: 0, y: 24, filter: "blur(6px)", duration: 0.8, stagger: 0.08 },
          0.5
        );

      // PHASE 2: Hero parallax - art element continuous scroll
      gsap.to("[data-hero-art]", {
        yPercent: 10,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // PHASE 3: Hero scroll choreography - emblem and metadata parallax
      const isDesktop = window.innerWidth >= MOTION_CONFIG.breakpoints.desktop;
      
      if (isDesktop) {
        // Emblem expansion and lift
        gsap.to("[data-hero-visual]", {
          scale: 1.1,
          yPercent: -15,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "center center",
            end: "bottom 30%",
            scrub: 1,
            markers: MOTION_CONFIG.debug,
          },
        });

        // Metadata left (slower parallax)
        gsap.to(".longbow-hero-meta-left", {
          xPercent: -12,
          opacity: 0.5,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "center center",
            end: "bottom 30%",
            scrub: 1,
          },
        });

        // Metadata right (faster parallax)
        gsap.to(".longbow-hero-meta-right", {
          xPercent: 20,
          opacity: 0.5,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "center center",
            end: "bottom 30%",
            scrub: 1,
          },
        });

        // Supporting text fade and movement
        gsap.to(".longbow-hero-intro p:last-of-type", {
          yPercent: 15,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "bottom 40%",
            end: "bottom 20%",
            scrub: 0.6,
            markers: MOTION_CONFIG.debug,
          },
        });
      }

      // PHASE 4: Hero exit sequence - upward movement and dispersion
      if (isDesktop) {
        gsap.to("[data-hero-visual]", {
          yPercent: -80,
          scale: 0.9,
          opacity: 0.3,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "bottom 60%",
            end: "bottom 20%",
            scrub: 0.8,
            markers: MOTION_CONFIG.debug,
          },
        });

        // Metadata disperses outward
        gsap.to(".longbow-hero-meta-left", {
          xPercent: -40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "bottom 55%",
            end: "bottom 25%",
            scrub: 0.7,
          },
        });

        gsap.to(".longbow-hero-meta-right", {
          xPercent: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "bottom 55%",
            end: "bottom 25%",
            scrub: 0.7,
          },
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
          <div data-hero-visual className="longbow-hero-emblem">
            <div data-hero-art>
              <OwlseyMainGraphic />
            </div>
          </div>
          <div className="longbow-hero-wash" />
        </div>

        <div className="longbow-hero-meta longbow-hero-meta-left" data-hero-reveal>
          <span>Owlsey</span>
        </div>

        <div className="longbow-hero-meta longbow-hero-meta-right" data-hero-reveal>
          <span>Requirements / judgement / delivery</span>
        </div>

        <div className="longbow-hero-intro" data-hero-reveal>
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
            <h1 className="mt-5 text-[clamp(3.25rem,5.2vw,6.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.055em] text-[color:var(--text-strong)]" style={{ fontFamily: "var(--font-impact)" }}>
              Software
              <br />
              that <span className="home-accent-word">fits</span><span className="accent-stop">.</span>
            </h1>

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
