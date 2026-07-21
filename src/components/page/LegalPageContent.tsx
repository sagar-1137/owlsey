"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, LockKeyhole, Mail, Scale, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GridJunctions } from "@/components/common/GridJunctions";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsap } from "@/lib/gsap";
import { MOTION_CONFIG } from "@/lib/motionConfig";

type LegalClause = {
  title: string;
  body: string;
};

type LegalPageContentProps = {
  kind: "privacy" | "terms";
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  updated: string;
  primaryNote: string;
  supportNote: string;
  clauses: LegalClause[];
};

const LEGAL_MARKERS = [
  { label: "Plain", value: "Direct language", Icon: FileText },
  { label: "Limited", value: "Only what is needed", Icon: LockKeyhole },
  { label: "Responsible", value: "Handled with care", Icon: ShieldCheck },
];

export function LegalPageContent({
  kind,
  eyebrow,
  title,
  accent,
  summary,
  updated,
  primaryNote,
  supportNote,
  clauses,
}: LegalPageContentProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = pageRef.current;
    if (!root || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-legal-cell]", {
        opacity: 0,
        yPercent: 20,
        filter: "blur(8px)",
        duration: MOTION_CONFIG.timing.primaryReveal,
        ease: MOTION_CONFIG.easing.revealOutStrong,
        stagger: 0.07,
      });

      gsap.from("[data-legal-clause]", {
        opacity: 0,
        y: 26,
        duration: MOTION_CONFIG.timing.supportingReveal,
        ease: MOTION_CONFIG.easing.revealOut,
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".legal-clause-grid",
          start: "top 78%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white legal-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          <section className="chapter-obsidian legal-chapter" data-chapter={kind === "privacy" ? "Privacy" : "Terms"} aria-labelledby="legal-title">
            <div className="modular-grid legal-hero-grid modular-grid--viewport has-complete-junctions">
              <GridJunctions />

              <div data-legal-cell className="modular-box legal-lead md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <p className="display-kicker text-[color:var(--text-dim)]">{eyebrow}</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01 / legal</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    {kind === "privacy" ? <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Scale className="h-3.5 w-3.5" strokeWidth={1.5} />}
                  </span>
                  <h1 id="legal-title" className="modular-display max-w-[9ch] text-[clamp(3.8rem,7vw,7.2rem)] text-[color:var(--text-strong)]">
                    {title} <span className="legal-accent-word">{accent}</span><span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[31ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                  {summary}
                </p>
              </div>

              <div data-legal-cell className="modular-box legal-brief flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Last updated</p>
                <div>
                  <p className="legal-date text-[color:var(--text-strong)]">{updated}</p>
                  <p className="mt-5 max-w-[24ch] text-sm leading-6 text-[color:var(--text-muted)]">{primaryNote}</p>
                </div>
              </div>

              <Link href="/contact" data-cursor="CONTACT" data-motion-link data-legal-cell className="modular-box modular-box-dark legal-contact group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Need clarity?</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display max-w-[7ch] text-[clamp(2.8rem,4.8vw,5.1rem)] text-white">
                    Ask before <span className="legal-accent-word">signing</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="display-kicker text-white/65">Contact Owlsey</span>
                    <Mail className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div data-legal-cell className="modular-box legal-position flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Our position</p>
                <p className="max-w-[16ch] text-[clamp(1.7rem,2.6vw,2.8rem)] leading-[1.02] tracking-[-0.045em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  Clear terms. No hidden operational surprises.
                </p>
              </div>

              <div data-legal-cell className="modular-box legal-markers">
                {LEGAL_MARKERS.map(({ label, value, Icon }) => (
                  <article key={label} className="legal-marker-row">
                    <span className="legal-small-icon" aria-hidden="true">
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
          </section>

          <section className="chapter-steel legal-chapter" data-chapter="Details" aria-labelledby="legal-details-title">
            <div className="modular-grid modular-grid--viewport legal-clause-grid has-complete-junctions">
              <GridJunctions />

              <div data-legal-clause className="modular-box legal-clause-intro flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-dim)]">Document details</p>
                <h2 id="legal-details-title" className="modular-display max-w-[8ch] text-[clamp(3.2rem,6vw,6.4rem)] text-[color:var(--text-strong)]">
                  Read the <span className="legal-accent-word">shape</span><span className="accent-stop">.</span>
                </h2>
              </div>

              <div data-legal-clause className="modular-box legal-support-note flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">Plain summary</p>
                <p className="max-w-[18ch] text-[clamp(1.5rem,2.3vw,2.4rem)] leading-[1.05] tracking-[-0.04em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
                  {supportNote}
                </p>
              </div>

              {clauses.map((clause, index) => (
                <article key={clause.title} data-legal-clause className="modular-box legal-clause-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="modular-copy text-[color:var(--legal-accent-soft)]">.{String(index + 1).padStart(2, "0")}</span>
                      <span className="legal-small-icon" aria-hidden="true">
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                    </div>
                    <h3 className="modular-display mt-7 text-[clamp(2.05rem,3.2vw,3.35rem)] text-[color:var(--text-strong)]">
                      {clause.title}
                    </h3>
                  </div>
                  <p className="mt-8 border-t border-[color:var(--line-subtle)] pt-5 text-sm leading-6 text-[color:var(--text-muted)]">
                    {clause.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
