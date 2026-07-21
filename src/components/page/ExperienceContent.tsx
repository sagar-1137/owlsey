import Link from "next/link";
import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  LifeBuoy,
  Route,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GridJunctions } from "@/components/common/GridJunctions";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";

/* The engagement runs as an ordered arc, so the phases are numbered — the
   sequence carries meaning the reader uses to place each stage. */
const PHASES = [
  {
    title: "Clarity",
    text: "We translate business intent into a clean technical shape before a line of code is written.",
    metric: "2 weeks",
    metricLabel: "discovery → blueprint",
    Icon: Compass,
  },
  {
    title: "Structure",
    text: "We choose architecture that survives scale, team growth, and the product changing shape.",
    metric: "0 rewrites",
    metricLabel: "in 3 years of delivery",
    Icon: Layers,
  },
  {
    title: "Results",
    text: "We stay accountable past launch — support, iteration, and steady performance refinement.",
    metric: "< 24h",
    metricLabel: "production response SLA",
    Icon: Route,
  },
];

const PRINCIPLES = [
  { label: "Durable", value: "Systems built to be maintained, not just shipped.", Icon: ShieldCheck },
  { label: "On time", value: "Predictable delivery over optimistic estimates.", Icon: Timer },
  { label: "Owned", value: "Handed over so your team keeps moving without us.", Icon: LifeBuoy },
];

export default function ExperienceContent() {
  return (
    <div className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white experience-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          {/* Chapter 1 — the stance */}
          <section className="chapter-obsidian experience-chapter" data-chapter="Experience" aria-labelledby="experience-title">
            <div className="modular-grid experience-hero-grid has-complete-junctions">
              <GridJunctions />

              <div data-exp-cell className="modular-box experience-lead flex flex-col justify-between">
                <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">Track record</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    <Compass className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <h1 id="experience-title" className="modular-display max-w-[9ch] text-[clamp(3.6rem,6.2vw,6.6rem)] text-[color:var(--text-strong)]">
                    Built to <span className="experience-accent-word">last</span><span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[30ch] border-t border-[color:var(--line-strong)] pt-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.13em] text-[color:var(--text-muted)]">
                  Quiet, precise, durable. Intentional systems and dependable delivery over noise.
                </p>
              </div>

              <div data-exp-cell className="modular-box experience-statement flex flex-col justify-between">
                <div className="text-center">
                  <p className="display-kicker text-[color:var(--text-faint)]">How we operate</p>
                  <h2 className="modular-display mx-auto mt-4 max-w-[12ch] text-[clamp(3rem,5vw,5.6rem)] text-[color:var(--text-strong)]">
                    Fewer surprises. More <span className="experience-accent-word">signal</span><span className="accent-stop">.</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-[46ch] text-sm leading-6 text-[color:var(--text-muted)]">
                    Every engagement is judged the same way — did the system fit the operation, hold up under change, and keep improving after we handed it over.
                  </p>
                </div>
                <div className="experience-principle-list" aria-label="Working principles">
                  {PRINCIPLES.map(({ label, value, Icon }) => (
                    <article key={label}>
                      <span className="experience-small-icon" aria-hidden="true">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <span>
                        <strong>{label}</strong>
                        <small>{value}</small>
                      </span>
                    </article>
                  ))}
                </div>
              </div>

              <Link href="/contact" data-cursor="START" data-motion-link data-exp-cell className="modular-box modular-box-dark experience-start group flex flex-col justify-between">
                <span className="footer-glow" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Project enquiry</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display max-w-[7ch] text-[clamp(2.9rem,4.8vw,5.2rem)] text-white">
                    Start the <span className="experience-accent-word">work</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
                    <span data-motion-label className="display-kicker text-white/65">Open brief</span>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div data-exp-cell className="modular-box experience-position flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Delivery logic</p>
                <p className="max-w-[16ch] text-[clamp(1.65rem,2.5vw,2.7rem)] leading-[1.02] tracking-[-0.04em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  Measured by what <span className="experience-serif-accent">ships</span>, not what is promised.
                </p>
              </div>

              <div data-exp-cell className="modular-box experience-proof flex flex-col justify-between">
                <span className="pattern pattern--weave pattern--br" aria-hidden="true" />
                <p className="display-kicker text-[color:var(--text-faint)]">Why it holds</p>
                <div>
                  <p className="modular-display max-w-[9ch] text-[clamp(2.8rem,4.6vw,5rem)] text-[color:var(--text-strong)]">
                    Three years, <span className="experience-accent-word">zero</span> rewrites<span className="accent-stop">.</span>
                  </p>
                  <p className="mt-6 max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">
                    The right shape early is what lets a system grow instead of being rebuilt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 2 — the ordered process */}
          <section className="chapter-steel experience-chapter" data-chapter="Process" aria-labelledby="process-title">
            <div className="modular-grid experience-phase-grid has-complete-junctions">
              <GridJunctions />

              <div data-exp-cell className="modular-box experience-phase-head md:col-span-2 lg:col-span-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">The engagement</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">02</span>
                </div>
                <h2 id="process-title" className="modular-display mt-8 max-w-[16ch] text-[clamp(2.6rem,4.4vw,4.6rem)] text-[color:var(--text-strong)]">
                  From requirement to <span className="experience-accent-word">release</span><span className="accent-stop">.</span>
                </h2>
              </div>

              {PHASES.map(({ title, text, metric, metricLabel, Icon }, index) => (
                <article
                  key={title}
                  data-exp-cell
                  className="modular-box experience-phase group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="experience-phase-index">
                      <span className="text-[color:var(--accent-primary)]">.</span>0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-[color:var(--line-strong)] transition-colors duration-300 group-hover:bg-[color:var(--accent-soft-strong)]" />
                    <span className="experience-small-icon" aria-hidden="true">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div>
                    <h3 className="modular-display text-[clamp(2.2rem,3.6vw,3.4rem)] text-[color:var(--text-strong)] transition-colors duration-300 group-hover:text-[color:var(--accent-strong)]">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-[34ch] text-sm leading-6 text-[color:var(--text-muted)]">
                      {text}
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-[color:var(--line-strong)] pt-4">
                    <span>
                      <span className="block modular-display text-[clamp(1.4rem,2vw,1.8rem)] text-[color:var(--text-strong)]">
                        {metric}
                      </span>
                      <span className="mt-1.5 block text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-faint)]">
                        {metricLabel}
                      </span>
                    </span>
                    <span className="experience-phase-dot" aria-hidden="true" />
                  </div>
                </article>
              ))}

              <Link href="/projects" data-cursor="VIEW" data-motion-link data-exp-cell className="modular-box experience-phase-cta group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-faint)]">Proof of it</p>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display max-w-[8ch] text-[clamp(2.4rem,4vw,4.2rem)] text-[color:var(--text-strong)]">
                    See the <span className="experience-accent-word">systems</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">Selected work</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
