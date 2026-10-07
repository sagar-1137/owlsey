"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsap } from "@/lib/gsap";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { PIN_CHAPTER_QUERY } from "@/components/common/PinnedChapters";
import { TESTIMONIALS } from "@/data/testimonials";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Client words. Renders nothing until real testimonials are added to
 * src/data/testimonials.ts.
 *
 * On a pinned desktop it is a full-screen chapter that gives each client the
 * whole stage: the quote cards share one area beside the heading and the
 * scroll hands over from one to the next while a counter tracks the place —
 * the same batch-swap grammar as the capabilities chapter. Everywhere else
 * the cards simply stack.
 */
export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || count < 2) return;

    const gsap = ensureGsap();
    const mm = gsap.matchMedia();
    mm.add(PIN_CHAPTER_QUERY, () => {
      const leadContent = root.querySelectorAll<HTMLElement>(".testimonials-lead > *");
      const headingParts = root.querySelectorAll<HTMLElement>("h2 .home-accent-word, h2 .accent-stop");
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".testimonial-card"));
      const contentOf = (card: HTMLElement) => Array.from(card.children);
      const track = root.querySelector<HTMLElement>("[data-counter-track]");

      cards.slice(1).forEach((card) => gsap.set(contentOf(card), { autoAlpha: 0, y: 40 }));

      // Positions are in viewport heights of scroll, matching the CSS height
      // (100svh + count × 65svh) with the trigger starting at "top 80%".
      const entrance = 0.8;
      const perQuote = 0.65;
      const total = entrance + count * perQuote;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(leadContent, { opacity: 0.42, y: 28 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: "power2.out" }, 0)
        .fromTo(headingParts, { yPercent: 70, opacity: 0.2 }, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.25 }, 0.05)
        .fromTo(contentOf(cards[0]), { opacity: 0.08, y: 64 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.45 }, 0.15);

      cards.slice(1).forEach((card, index) => {
        const at = entrance + perQuote * (index + 1) - 0.25;
        timeline
          .to(contentOf(cards[index]), { autoAlpha: 0, y: -40, stagger: 0.02, duration: 0.18, ease: "power2.in" }, at)
          .to(contentOf(card), { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.24 }, at + 0.14);
        if (track) {
          timeline.to(track, { yPercent: (-100 * (index + 1)) / count, duration: 0.2, ease: "power2.inOut" }, at + 0.08);
        }
      });

      // Pin the timeline length so the last quote holds until the section ends.
      timeline.set({}, {}, total);
    });

    return () => mm.revert();
  }, [count]);

  if (count === 0) return null;

  // Three quotes sit in one row beside the heading (1 + 3 columns); any
  // other count falls back to a full-width heading and half-width cards.
  const inOneRow = count === 3;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section-dark chapter-ink theme-paper${count > 1 ? " testimonials-pin" : ""}`}
      style={{ "--quote-count": count } as React.CSSProperties}
      data-chapter="Clients"
      data-motion-own
      aria-labelledby="testimonials-title"
    >
      <div className="modular-grid testimonials-grid technical-grid-host">
        <TechnicalGrid className="section-technical-grid" />

        <div className={`modular-box testimonials-lead flex flex-col justify-between md:col-span-2 ${inOneRow ? "lg:col-span-1" : "lg:col-span-4"}`}>
          <p className="display-kicker text-[color:var(--text-dim)]">In their words</p>
          <div>
            <h2 id="testimonials-title" className="modular-display mt-5 text-[clamp(3rem,4.6vw,5rem)] text-[color:var(--text-strong)]">
              What clients <span className="home-accent-word">say</span><span className="accent-stop">.</span>
            </h2>
            {count > 1 && (
              <p className="testimonials-counter" aria-hidden="true">
                <span className="testimonials-counter-mask">
                  <span data-counter-track>
                    {TESTIMONIALS.map((item, index) => (
                      <span key={item.quote}>{pad(index + 1)}</span>
                    ))}
                  </span>
                </span>
                <span>/ {pad(count)}</span>
              </p>
            )}
          </div>
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
