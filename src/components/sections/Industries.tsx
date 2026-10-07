import React from "react";
import Link from "next/link";
import { ArrowUpRight, Dumbbell, Gamepad2, Megaphone, ShieldCheck, ShoppingBag, Users, Wallet, type LucideIcon } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { PROJECT_CASES } from "@/data/projectCases";

/**
 * Industries, derived from shipped work: every row links to the real case
 * studies behind it, so the list can't claim a sector we haven't delivered in.
 */
const industries: Array<{ name: string; Icon: LucideIcon; slugs: string[] }> = [
  { name: "E-commerce & retail", Icon: ShoppingBag, slugs: ["lakshita-commerce-os", "commerce-sidecar"] },
  { name: "Fitness & wellness", Icon: Dumbbell, slugs: ["gympro"] },
  { name: "Fintech & payments", Icon: Wallet, slugs: ["crypto-gateway-docs"] },
  { name: "Gaming platforms", Icon: Gamepad2, slugs: ["gaming-operator-guide"] },
  { name: "HR & workforce", Icon: Users, slugs: ["hr-project-workspace", "barrierflow"] },
  { name: "Security & access", Icon: ShieldCheck, slugs: ["veilguard"] },
  { name: "Marketing & data", Icon: Megaphone, slugs: ["retention-panel", "mailproof"] },
];

const casesFor = (slugs: string[]) =>
  slugs.flatMap((slug) => PROJECT_CASES.filter((project) => project.slug === slug));

export const Industries: React.FC = () => (
  <section id="industries" className="section-dark chapter-smoke" data-chapter="Industries" aria-labelledby="industries-title">
    <div className="modular-grid industries-grid technical-grid-host">
      <TechnicalGrid className="section-technical-grid" />

      <div className="modular-box industries-lead md:col-span-2 lg:col-span-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="display-kicker text-[color:var(--text-dim)]">Industries</p>
          <h2 id="industries-title" className="modular-display mt-5 max-w-[14ch] text-[clamp(3rem,6vw,6.2rem)] text-[color:var(--text-strong)]">
            Shipped across <span className="home-accent-word">sectors</span><span className="accent-stop">.</span>
          </h2>
        </div>
        <p className="max-w-[36ch] text-sm leading-6 text-[color:var(--text-muted)]">
          Different rules, the same discipline. Each sector below links to the real work behind it.
        </p>
      </div>

      {industries.map(({ name, Icon, slugs }, index) => (
        <article key={name} className="modular-box industry-cell flex flex-col justify-between">
          <Icon className="motif-glyph" aria-hidden="true" strokeWidth={1} />
          <span className="industry-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="modular-display text-[clamp(1.7rem,2.4vw,2.4rem)] text-[color:var(--text-strong)]">{name}</h3>
            <ul className="mt-4 flex flex-col gap-1.5 border-t border-[color:var(--line-subtle)] pt-4">
              {casesFor(slugs).map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} data-cursor="VIEW" className="industry-link group">
                    <span>{project.title}</span>
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      <Link href="/contact" data-cursor="START" data-motion-link className="modular-box modular-box-dark industry-cell group flex flex-col justify-between">
        <span className="display-kicker text-white/55">Not listed?</span>
        <div>
          <p className="modular-display text-[clamp(1.9rem,2.8vw,2.8rem)] text-white">
            Your <span className="home-accent-word">sector</span> next<span className="accent-stop">.</span>
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
            <span data-motion-label className="display-kicker text-white/65">Tell us about it</span>
            <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  </section>
);
