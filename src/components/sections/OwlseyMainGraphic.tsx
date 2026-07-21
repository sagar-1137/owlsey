"use client";

import React, { useRef } from "react";
import { ensureGsap, useGSAP } from "@/lib/gsap";

/**
 * Minimal hero composition built around the Owlsey owl emblem.
 * The approved simplified emblem settles into a slow ambient ring + pulse.
 */
export const OwlseyMainGraphic: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = ensureGsap();
      const root = rootRef.current;
      if (!root) return;

      // --- Ambient loops (start immediately, independent of the reveal) ---
      gsap.to("[data-ring]", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 90,
        ease: "none",
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>("[data-pulse]").forEach((el, i) => {
        gsap.set(el, { transformOrigin: "50% 50%", scale: 0.5, opacity: 0 });
        gsap.to(el, {
          keyframes: [
            { opacity: 0.22, scale: 0.55, duration: 0 },
            { opacity: 0, scale: 1.05, duration: 1 },
          ],
          duration: 7,
          repeat: -1,
          delay: i * 3.5,
          ease: "power2.out",
        });
      });

      // --- Signature reveal ---
      const mark = root.querySelector<SVGImageElement>("[data-owl-mark]");
      const emblem = root.querySelector<HTMLElement>("[data-emblem]");
      if (!mark || !emblem) return;

      const tl = gsap.timeline({ delay: 0.15 });

      tl.from("[data-draw-ring]", {
        drawSVG: "0%",
        duration: 1.35,
        stagger: 0.16,
        ease: "power3.inOut",
      }).from(emblem, {
        scale: 1.08,
        filter: "blur(6px)",
        transformOrigin: "50% 50%",
        duration: 0.9,
        ease: "power3.out",
      }, "<0.28").fromTo(
        mark,
        { opacity: 0, scale: 0.84, filter: "blur(5px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.15, ease: "power4.out" },
        "<0.08",
      );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative mx-auto flex aspect-square w-full max-w-[520px] select-none items-center justify-center xl:max-w-[580px]"
    >
      {/* Soft floor halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-[70px] w-[50%] -translate-x-1/2 rounded-[100%] blur-2xl"
        style={{
          background: "var(--owl-halo-gradient)",
        }}
      />

      <svg
        viewBox="0 0 600 600"
        className="relative z-10 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Owlsey emblem"
      >
        <defs>
          <radialGradient id="hgInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--owl-core-start)" stopOpacity="0.08" />
            <stop offset="60%" stopColor="var(--owl-core-end)" stopOpacity="0.025" />
            <stop offset="100%" stopColor="var(--owl-core-end)" stopOpacity="0" />
          </radialGradient>

        </defs>

        {/* Pulse wave — single, very slow */}
        <circle
          data-pulse
          data-draw-ring
          cx="300"
          cy="300"
          r="170"
          fill="none"
          stroke="var(--accent-soft-strong)"
          strokeWidth="1"
        />

        {/* Single outer ring — dashed, slow rotation */}
        <g data-ring opacity="0.85">
          <circle
            data-draw-ring
            cx="300"
            cy="300"
            r="220"
            fill="none"
            stroke="var(--line-subtle)"
            strokeWidth="0.8"
            strokeDasharray="2 8"
          />
          {/* Single accent dot on the ring */}
          <circle cx="520" cy="300" r="3" fill="var(--accent-primary)" />
        </g>

        {/* Inner thin ring around the emblem */}
        <circle
          data-draw-ring
          cx="300"
          cy="300"
          r="140"
          fill="none"
          stroke="var(--line-subtle)"
          strokeWidth="0.6"
        />

        {/* Center: inner glow + owl emblem */}
        <g data-emblem>
          <circle cx="300" cy="300" r="115" fill="url(#hgInner)" />

          <image
            data-owl-mark
            href="/logos/owlsey_generated_emblem.svg"
            x="174"
            y="174"
            width="252"
            height="252"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>
    </div>
  );
};
