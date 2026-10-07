"use client";

import { useEffect } from "react";
import { ensureGsap } from "@/lib/gsap";

/** Same gate as the `.home-pin-chapter` CSS: below it the sections scroll freely. */
export const PIN_CHAPTER_QUERY =
  "(min-width: 1024px) and (min-height: 680px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Gives the home sections after "Proof in production" the same full-screen
 * chapter feel as the ones before it. CSS makes each `[data-pin-chapter]`
 * section taller than the viewport with a sticky, viewport-height grid; this
 * scrubs the cells in while the frame holds — the grammar Projects uses: the
 * lead cell settles, the rest wipe in from the bottom-right corner.
 *
 * The sections carry `data-motion-own`, so the generic MotionLayer leaves them
 * alone. Only cell *content* moves; the measured technical grid never does.
 */
export function PinnedChapters() {
  useEffect(() => {
    const media = window.matchMedia(PIN_CHAPTER_QUERY);
    let revert: (() => void) | undefined;

    const setup = () => {
      revert?.();
      revert = undefined;
      if (!media.matches) return;

      const gsap = ensureGsap();
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-pin-chapter]").forEach((section) => {
          const cells = Array.from(
            section.querySelectorAll<HTMLElement>(".technical-grid-host > .modular-box"),
          );
          if (!cells.length) return;
          const [lead, ...rest] = cells;
          const leadContent = Array.from(lead.children);
          const headingParts = section.querySelectorAll<HTMLElement>("h2 .home-accent-word, h2 .accent-stop");
          // Cells that hold a list mark their rows `data-pin-item`: those rise
          // in one by one from the top. A corner wipe over one tall list block
          // hid the left-aligned text until the very end of the reveal.
          const items = Array.from(section.querySelectorAll<HTMLElement>("[data-pin-item]"));
          const restContent = rest
            .filter((cell) => !cell.querySelector("[data-pin-item]"))
            .flatMap((cell) =>
              Array.from(cell.children).filter((child) => !child.matches("[aria-hidden='true']")),
            );
          const motifs = section.querySelectorAll<HTMLElement>(".motif-glyph, .motif-quote");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(leadContent, { opacity: 0.42, y: 28 }, {
              opacity: 1,
              y: 0,
              stagger: 0.045,
              duration: 0.24,
              ease: "power2.out",
            })
            .fromTo(headingParts, { yPercent: 70, opacity: 0.2 }, {
              yPercent: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.2,
              ease: "power3.out",
            }, 0.04)
            .fromTo(restContent, {
              opacity: 0.08,
              y: 64,
              clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            }, {
              opacity: 1,
              y: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              stagger: { each: 0.4 / Math.max(restContent.length, 1) },
              duration: 0.46,
              ease: "power3.out",
            }, 0.18);

          if (items.length) {
            timeline.fromTo(items, { opacity: 0.08, y: 36 }, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: "power3.out",
            }, 0.08);
          }

          if (motifs.length) {
            timeline.fromTo(motifs, { opacity: 0, y: 30, scale: 0.86 }, {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 0.36,
              ease: "power3.out",
            }, 0.3);
          }

          // Settled by ~70% of the scroll, then the finished frame holds
          // before the next chapter pushes it away.
          timeline.to({}, { duration: 0.45 });
        });
      });
      revert = () => ctx.revert();
    };

    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      revert?.();
    };
  }, []);

  return null;
}
