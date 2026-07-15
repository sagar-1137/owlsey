"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsap, useGSAP } from "@/lib/gsap";

interface LoaderProps {
  /** Fired once the exit animation finishes so the host can unmount. */
  onDone?: () => void;
}

/**
 * Cinematic intro loader — a soft steel gradient "develops" in, a
 * minimal `.LOADING` pill and the wordmark focus from blur, and once the
 * progress reaches 100 the whole overlay dissolves up into the page.
 * Inspired by db-longbow.webflow.io, tuned to the Owlsey brand.
 */
export const Loader: React.FC<LoaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const exitedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease toward 100 — quick early, slower near the end.
        const remaining = 100 - prev;
        return prev + Math.max(1.5, remaining * 0.12);
      });
    }, 130);

    return () => clearInterval(interval);
  }, []);

  // Intro choreography.
  useGSAP(
    () => {
      const gsap = ensureGsap();
      gsap
        .timeline()
        .from("[data-loader-wash]", { autoAlpha: 0, duration: 0.8, ease: "power2.out" })
        .from(
          "[data-loader-logo]",
          { autoAlpha: 0, scale: 1.14, filter: "blur(10px)", duration: 0.9, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          "[data-loader-rise]",
          { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.45"
        );
    },
    { scope: rootRef }
  );

  // Exit: when progress completes, dissolve the overlay up and unmount.
  useEffect(() => {
    if (progress < 100 || exitedRef.current) return;
    exitedRef.current = true;
    const gsap = ensureGsap();
    const root = rootRef.current;
    if (!root) {
      onDone?.();
      return;
    }
    const tl = gsap.timeline({ onComplete: () => onDone?.() });
    tl.to("[data-loader-content]", {
      autoAlpha: 0,
      y: -18,
      filter: "blur(6px)",
      duration: 0.5,
      ease: "power2.in",
    }).to(
      root,
      { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" },
      "-=0.2"
    );
  }, [progress, onDone]);

  const shown = Math.min(Math.round(progress), 100);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[color:var(--surface-base)]"
    >
      {/* Gradient wash — steel top, darker horizon at the base. */}
      <div
        aria-hidden
        data-loader-wash
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #8a8d90 0%, #666a6d 22%, #262729 58%, #030303 100%)",
        }}
      />
      {/* Faint neutral bloom rising from the bottom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-20%] h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.16), rgba(3,3,3,0) 70%)",
        }}
      />

      <div
        data-loader-content
        className="relative flex flex-col items-center gap-9"
      >
        {/* Logo */}
        <div className="relative" data-loader-logo>
          <Image
            src="/logos/owlsey_horizontal.svg"
            alt="Owlsey"
            width={170}
            height={42}
            priority
            className="h-10 w-auto"
          />
        </div>

        {/* Thin progress line with a running count. */}
        <div
          data-loader-rise
          className="flex w-[220px] flex-col gap-3"
        >
          <div className="h-px w-full overflow-hidden bg-white/12">
            <div
              className="h-full bg-gradient-to-r from-[color:var(--accent-primary)] to-white transition-[width] duration-200 ease-out"
              style={{ width: `${shown}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            {/* Dot-prefix motif — the Longbow-style `.LOADING` signature. */}
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/45">
              .loading
            </span>
            <span
              className="text-[10px] tabular-nums tracking-[0.1em] text-white/60"
              style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              {String(shown).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
