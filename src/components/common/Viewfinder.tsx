"use client";

import React, { useRef } from "react";
import { ensureGsap, useGSAP } from "@/lib/gsap";

/**
 * A camera/blueprint "viewfinder" overlay — corner brackets, a center
 * crosshair, and small registration marks framing the hero. Purely
 * decorative (pointer-events-none) and quiet by design: it should read as a
 * precision instrument, not a gimmick. Inspired by db-longbow.webflow.io,
 * re-cast for Owlsey's engineering register.
 */
export const Viewfinder: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = ensureGsap();

      // Draw the frame on: brackets fade+scale in from their corners, then the
      // crosshair and marks settle. Delayed so it lands after the hero copy.
      gsap
        .timeline({ delay: 0.5 })
        .from("[data-vf-bracket]", {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          transformOrigin: "center",
        })
        .from(
          "[data-vf-mark]",
          { autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          "-=0.4"
        );

      // Faint life: the crosshair breathes very slowly.
      gsap.to("[data-vf-cross]", {
        opacity: 0.5,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: rootRef }
  );

  const bracket = "pointer-events-none absolute h-8 w-8 border-[color:var(--line-strong)]";

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {/* Inset frame so the marks sit just inside the section edges. */}
      <div className="absolute inset-4 sm:inset-6 lg:inset-8">
        {/* Corner brackets */}
        <span data-vf-bracket className={`${bracket} left-0 top-0 border-l border-t`} />
        <span data-vf-bracket className={`${bracket} right-0 top-0 border-r border-t`} />
        <span data-vf-bracket className={`${bracket} bottom-0 left-0 border-b border-l`} />
        <span data-vf-bracket className={`${bracket} bottom-0 right-0 border-b border-r`} />

        {/* Registration labels — dot-prefix motif, true to a build/spec sheet. */}
        <span
          data-vf-mark
          className="absolute left-0 top-0 -translate-y-[calc(100%+8px)] text-[9px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]"
        >
          .frame_01
        </span>
        <span
          data-vf-mark
          className="absolute bottom-0 right-0 translate-y-[calc(100%+8px)] text-[9px] uppercase tracking-[0.28em] text-[color:var(--text-faint)]"
        >
          .owlsey / build
        </span>

        {/* Crosshair — biased toward the hero graphic (right) so it reads as
            "framing the product", not floating in empty space. Hidden on
            narrow screens where the graphic is only a faint watermark. */}
        <div
          data-vf-cross
          className="absolute left-[72%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-30 lg:block"
        >
          <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-[color:var(--line-strong)]" />
          <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[color:var(--line-strong)]" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--accent-primary)]/40" />
        </div>
      </div>
    </div>
  );
};
