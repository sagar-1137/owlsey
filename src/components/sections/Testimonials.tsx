import React from "react";
import Link from "next/link";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { TESTIMONIALS } from "@/data/testimonials";

/**
 * Client words, one card each. Renders nothing until real testimonials are
 * added to src/data/testimonials.ts.
 */
export const Testimonials: React.FC = () => {
  if (TESTIMONIALS.length === 0) return null;

  // Three quotes sit in one row beside the heading (1 + 3 columns); any
  // other count falls back to a full-width heading and half-width cards.
  const inOneRow = TESTIMONIALS.length === 3;

  return (
    <section id="testimonials" className="section-dark chapter-ink theme-paper" data-chapter="Clients" aria-labelledby="testimonials-title">
      <div className="modular-grid testimonials-grid technical-grid-host">
        <TechnicalGrid className="section-technical-grid" />

        <div className={`modular-box testimonials-lead flex flex-col justify-between md:col-span-2 ${inOneRow ? "lg:col-span-1" : "lg:col-span-4"}`}>
          <p className="display-kicker text-[color:var(--text-dim)]">In their words</p>
          <h2 id="testimonials-title" className="modular-display mt-5 text-[clamp(3rem,4.6vw,5rem)] text-[color:var(--text-strong)]">
            What clients <span className="home-accent-word">say</span><span className="accent-stop">.</span>
          </h2>
        </div>

        {TESTIMONIALS.map((item) => (
          <figure key={item.quote} className={`modular-box testimonial-card flex flex-col justify-between ${inOneRow ? "is-compact" : "lg:col-span-2"}`}>
            <span className="motif-quote" aria-hidden="true">“</span>
            <blockquote className="testimonial-quote">“{item.quote}”</blockquote>
            <figcaption className="testimonial-cite">
              {item.name && <strong>{item.name}</strong>}
              <span>{item.role}</span>
              {item.project && (
                <Link href={`/projects/${item.project}`} data-cursor="VIEW" className="testimonial-link">
                  See the project
                </Link>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
