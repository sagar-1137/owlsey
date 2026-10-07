import Link from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { PROJECT_CASES } from "@/data/projectCases";
import { SERVICE_PAGES, type ServicePage } from "@/data/servicePages";

/* The same four confirmed steps on every service page. */
const STEPS = [
  { title: "Free discovery", text: "We learn how the business runs, who will use the software and what success looks like." },
  { title: "Written scope & fixed estimate", text: "You know what you get, when, and for how much — before any build work starts." },
  { title: "Weekly demos", text: "Each finished part is tested and handed to you for review as it is built." },
  { title: "Launch & support", text: "The first months of support after launch are included at no cost, as agreed." },
];

export default function ServiceDetailContent({ page }: { page: ServicePage }) {
  const projects = page.projects.flatMap((slug) => PROJECT_CASES.filter((project) => project.slug === slug));
  const parent = page.parent ? SERVICE_PAGES.find((item) => item.slug === page.parent) : undefined;
  const others = SERVICE_PAGES.filter((item) => item.slug !== page.slug && !item.parent);

  return (
    <div className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white experience-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          {/* 1 — what this is */}
          <section className="chapter-obsidian experience-chapter" data-chapter="Service" aria-labelledby="service-title">
            <div className="modular-grid about-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div className="modular-box about-lead md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <nav aria-label="Breadcrumb" className="service-breadcrumb">
                  <Link href="/services">Services</Link>
                  {parent && (
                    <>
                      <span aria-hidden="true">/</span>
                      <Link href={`/services/${parent.slug}`}>{parent.name}</Link>
                    </>
                  )}
                  <span aria-hidden="true">/</span>
                  <span aria-current="page">{page.name}</span>
                </nav>
                <h1 id="service-title" className="modular-display max-w-[13ch] text-[clamp(3.2rem,5.6vw,6rem)] text-[color:var(--text-strong)]">
                  {page.heading.before} <span className="experience-accent-word">{page.heading.accent}</span>
                  {page.heading.after}
                  <span className="accent-stop">.</span>
                </h1>
                <p className="max-w-[48ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                  {page.intro}
                </p>
              </div>

              <div className="modular-box about-lead about-facts-cell md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <span className="pattern pattern--dots pattern--tr" aria-hidden="true" />
                <p className="display-kicker text-[color:var(--text-faint)]">{page.kicker}</p>
                <div>
                  <h2 className="display-kicker text-[color:var(--text-dim)]">A good fit when</h2>
                  <ul className="about-commitments mt-4">
                    {page.fits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 2 — what we build, and the work that proves it */}
          <section className="chapter-steel experience-chapter" data-chapter="Scope" aria-labelledby="scope-title">
            <div className="modular-grid about-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div className="modular-box about-head md:col-span-2 lg:col-span-4 flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-dim)]">What we build</p>
                <h2 id="scope-title" className="modular-display max-w-[18ch] text-[clamp(2.6rem,4.4vw,4.6rem)] text-[color:var(--text-strong)]">
                  Shaped around your <span className="experience-accent-word">operation</span><span className="accent-stop">.</span>
                </h2>
              </div>

              {page.offers.map(({ title, text, href }, index) => {
                const inner = (
                  <>
                    <span className="experience-phase-index">
                      <span className="text-[color:var(--accent-primary)]">.</span>0{index + 1}
                    </span>
                    <div>
                      <h3 className="modular-display text-[clamp(1.9rem,2.8vw,2.7rem)] text-[color:var(--text-strong)]">{title}</h3>
                      <p className="mt-4 max-w-[34ch] text-sm leading-6 text-[color:var(--text-muted)]">{text}</p>
                      {href && (
                        <span className="service-card-link">
                          Learn more <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  </>
                );
                return href ? (
                  <Link key={title} href={href} data-cursor="VIEW" className="modular-box about-card group flex flex-col justify-between">
                    {inner}
                  </Link>
                ) : (
                  <article key={title} className="modular-box about-card flex flex-col justify-between">
                    {inner}
                  </article>
                );
              })}

              {projects.length > 0 && (
                <div className="modular-box about-card md:col-span-2 lg:col-span-4 flex flex-col gap-6">
                  <p className="display-kicker text-[color:var(--text-faint)]">Shipped work</p>
                  <ul className="service-projects">
                    {projects.map((project) => (
                      <li key={project.slug}>
                        <Link href={`/projects/${project.slug}`} data-cursor="VIEW" className="group">
                          <span className="display-kicker text-[color:var(--text-faint)]">{project.label}</span>
                          <strong>{project.title}</strong>
                          <span className="text-sm leading-6 text-[color:var(--text-muted)]">{project.summary}</span>
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 3 — how it runs, questions, next step */}
          <section className="chapter-obsidian experience-chapter" data-chapter="How it works" aria-labelledby="steps-title">
            <div className="modular-grid about-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div className="modular-box about-head md:col-span-2 lg:col-span-4 flex flex-col justify-between">
                <span className="pattern pattern--ticks pattern--tr" aria-hidden="true" />
                <p className="display-kicker text-[color:var(--text-dim)]">How a project runs</p>
                <h2 id="steps-title" className="modular-display max-w-[18ch] text-[clamp(2.6rem,4.4vw,4.6rem)] text-[color:var(--text-strong)]">
                  No surprises on <span className="experience-accent-word">cost</span> or progress<span className="accent-stop">.</span>
                </h2>
              </div>

              {STEPS.map(({ title, text }, index) => (
                <article key={title} className="modular-box about-card about-card--short flex flex-col justify-between">
                  <span className="experience-phase-index">
                    <span className="text-[color:var(--accent-primary)]">.</span>0{index + 1}
                  </span>
                  <div>
                    <h3 className="modular-display text-[clamp(1.7rem,2.4vw,2.3rem)] text-[color:var(--text-strong)]">{title}</h3>
                    <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[color:var(--text-muted)]">{text}</p>
                  </div>
                </article>
              ))}

              <div className="modular-box about-card md:col-span-2 lg:col-span-2 flex flex-col gap-6">
                <h2 className="display-kicker text-[color:var(--text-faint)]">Questions</h2>
                <div className="service-faq">
                  {page.faqs.map(({ q, a }, index) => (
                    <details key={q} name={`faq-${page.slug}`} open={index === 0}>
                      <summary>
                        <span>{q}</span>
                        <Plus aria-hidden="true" className="h-4 w-4 shrink-0" />
                      </summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
              </div>

              <Link href="/contact" data-cursor="START" data-motion-link className="modular-box modular-box-dark about-cta md:col-span-2 lg:col-span-2 group flex flex-col justify-between">
                <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Start a project</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="modular-display text-[clamp(2.6rem,4.2vw,4.6rem)] text-white">
                    Tell us what you <span className="experience-accent-word">need</span><span className="accent-stop">.</span>
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                    <span data-motion-label className="display-kicker text-white/65">Free discovery · reply in 3 business days</span>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <nav aria-label="Other services" className="modular-box about-card about-card--short md:col-span-2 lg:col-span-4 flex flex-col gap-4">
                <p className="display-kicker text-[color:var(--text-faint)]">Other services</p>
                <ul className="service-others">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/services/${item.slug}`} data-cursor="VIEW">
                        {item.name}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
