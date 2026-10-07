import Link from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight, Compass, Layers, MapPin, MessagesSquare } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";

/* Every line here is a confirmed fact (see CLAUDE.md → Content honesty).
   This page is what search engines and AI assistants read when someone asks
   "who is Owlsey?", so it states the identity plainly: name, place, since
   when, team, and how the studio works. */
const FACTS = [
  { label: "Based in", value: "Surat, Gujarat, India" },
  { label: "Building since", value: "2020" },
  { label: "Projects delivered", value: "28+" },
  { label: "Team", value: "7–8 core engineers + a specialist network" },
];

const BELIEFS = [
  {
    title: "Hard problems welcome",
    text: "We don't start with no. A difficult requirement is usually where the most useful software is, so we work out how it can be done before deciding whether it should.",
    Icon: Compass,
  },
  {
    title: "No fixed stack",
    text: "We don't limit ourselves to one technology. Each project gets the tools that fit its users, its scale and the team that will run it after us.",
    Icon: Layers,
  },
  {
    title: "We suggest, not just follow",
    text: "Sometimes a better result needs a different technology or approach than the one first asked for. When it does, we say so — with the reason — before anything is built.",
    Icon: MessagesSquare,
  },
];

const COMMITMENTS = [
  "Free discovery, then a written scope and a fixed estimate",
  "A demo every week while we build",
  "Code, designs and IP belong to you",
  "NDA signed on request",
  "First months of support after launch at no cost, as agreed",
  "Replies within three business days",
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white experience-shell w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          {/* Chapter 1 — who we are */}
          <section className="chapter-obsidian experience-chapter" data-chapter="About" aria-labelledby="about-title">
            <div className="modular-grid about-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div className="modular-box about-lead md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">About Owlsey</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01</span>
                </div>
                <div>
                  <span className="ring-icon mb-7" aria-hidden="true">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <h1 id="about-title" className="modular-display max-w-[11ch] text-[clamp(3.6rem,6.2vw,6.6rem)] text-[color:var(--text-strong)]">
                    Software studio from <span className="experience-accent-word">Surat</span><span className="accent-stop">.</span>
                  </h1>
                </div>
                <p className="max-w-[44ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                  Owlsey is a custom software studio based in Surat, Gujarat, India. Since 2020 we have designed, built and supported web applications, mobile apps, internal tools, integrations and SaaS products for growing businesses.
                </p>
              </div>

              <div className="modular-box about-lead about-facts-cell md:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <span className="pattern pattern--dots pattern--tr" aria-hidden="true" />
                <p className="display-kicker text-[color:var(--text-faint)]">At a glance</p>
                <dl className="about-facts">
                  {FACTS.map(({ label, value }) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Chapter 2 — how we think */}
          <section className="chapter-steel experience-chapter" data-chapter="Approach" aria-labelledby="approach-title">
            <div className="modular-grid about-grid technical-grid-host">
              <TechnicalGrid className="section-technical-grid" />

              <div className="modular-box about-head md:col-span-2 lg:col-span-4 flex flex-col justify-between">
                <span className="pattern pattern--ticks pattern--tr" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">How we think</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">02</span>
                </div>
                <h2 id="approach-title" className="modular-display mt-8 max-w-[16ch] text-[clamp(2.6rem,4.4vw,4.6rem)] text-[color:var(--text-strong)]">
                  Difficult is where the <span className="experience-accent-word">work</span> is<span className="accent-stop">.</span>
                </h2>
              </div>

              {BELIEFS.map(({ title, text, Icon }, index) => (
                <article key={title} className="modular-box about-card group flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <span className="experience-phase-index">
                      <span className="text-[color:var(--accent-primary)]">.</span>0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-[color:var(--line-strong)]" />
                    <span className="experience-small-icon" aria-hidden="true">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div>
                    <h3 className="modular-display text-[clamp(2rem,3.2vw,3rem)] text-[color:var(--text-strong)]">{title}</h3>
                    <p className="mt-5 max-w-[36ch] text-sm leading-6 text-[color:var(--text-muted)]">{text}</p>
                  </div>
                </article>
              ))}

              <div className="modular-box about-card flex flex-col justify-between">
                <p className="display-kicker text-[color:var(--text-faint)]">What you can count on</p>
                <ul className="about-commitments">
                  {COMMITMENTS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <Link href="/contact" data-cursor="START" data-motion-link className="modular-box modular-box-dark about-cta md:col-span-2 lg:col-span-4 group flex flex-col justify-between">
                <span className="pattern pattern--cross pattern--tr" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Have something difficult?</p>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <p className="modular-display text-[clamp(2.9rem,4.8vw,5.2rem)] text-white">
                    Bring it to <span className="experience-accent-word">us</span><span className="accent-stop">.</span>
                  </p>
                  <span className="flex items-center gap-3 border-t border-white/15 pt-4">
                    <span data-motion-label className="display-kicker text-white/65">Open a brief</span>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
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
