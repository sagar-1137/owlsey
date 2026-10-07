import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Target } from "lucide-react";
import { MagneticGsap } from "@/components/common/MagneticGsap";

const capabilities = ["Business platforms", "Internal tools", "Connected workflows"];

type HeroContentCellsProps = {
  /**
   * Attribute used to tag each animated element. The Hero reveals these on its
   * own timeline (`data-hero-reveal`); the intro reuses the same markup but
   * drives the reveal from its travel timeline via a different hook, so the two
   * choreographies never fight over the same elements.
   */
  revealAttr?: string;
};

/**
 * The four bottom-row content cells shared by the hero grid and the intro's
 * resolved grid: RIGHT FIT, SOFTWARE THAT FITS, CORE WORK, OPEN THE BRIEF.
 * Kept in one place so the copy and structure live in a single source — the
 * intro's post-settle reveal and the hero both render the same thing.
 */
export const HeroContentCells: React.FC<HeroContentCellsProps> = ({
  revealAttr = "data-hero-reveal",
}) => {
  const reveal = { [revealAttr]: "" } as Record<string, string>;

  return (
    <>
      <div className="longbow-hero-intro" {...reveal}>
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
        <div {...reveal} className="flex h-full flex-col">
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
        <p {...reveal} className="display-kicker text-[color:var(--text-faint)]">Core work</p>
        <div className="mt-auto">
          {capabilities.map((capability) => (
            <div key={capability} {...reveal} className="longbow-hero-capability">
              <span>{capability}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <Link href="/services" data-cursor="VIEW" data-motion-link className="longbow-hero-route group" {...reveal}>
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
      </Link>
    </>
  );
};
