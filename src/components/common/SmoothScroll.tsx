"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Shared Lenis instance. Kept on the module so other code (e.g. the loader's
 * scroll-lock, or anchor navigation) can pause/resume the exact same scroll
 * that ScrollTrigger is driven by, instead of fighting native `overflow`.
 */
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Pause/resume smooth scroll — used while the intro overlay is up. */
export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/**
 * Momentum-based smooth scroll (Lenis) wired into GSAP ScrollTrigger.
 *
 * - Desktop, fine-pointer only. Touch devices keep their native scroll (which
 *   already feels great and avoids the classic "sticky" mobile smooth-scroll).
 * - Disabled entirely under `prefers-reduced-motion`.
 * - While active, native CSS `scroll-behavior: smooth` must be off or the two
 *   smoothings fight each other — we toggle a class on <html> for that.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!desktop.matches) return;

    const gsap = ensureGsap();

    lenis = new Lenis({
      // Trackpads already emit momentum-smoothed wheel deltas, so a heavy ease
      // on top produces the "rubber-band" lag that felt broken. A high `lerp`
      // keeps the page glued to the input — light polish, no second momentum
      // layer fighting the OS one.
      lerp: 0.16,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Never smooth actual touch scroll — native is crisper on touchscreens.
      syncTouch: false,
    });

    // Dev-only: expose the instance so scroll feel can be tuned live from the
    // console, e.g. `__lenis.options.lerp = 0.2`. Stripped from production.
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Hand Lenis's scroll position to ScrollTrigger so pinned/scrubbed
    // animations stay perfectly in sync with the eased position.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      // gsap.ticker passes elapsed time in SECONDS, but Lenis.raf expects
      // MILLISECONDS. Without this ×1000 the per-frame delta looks ~1000× too
      // small, so the lerp advances by microscopic steps and scroll crawls.
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    // GSAP's ticker already smooths delta time; disable its lag smoothing so
    // Lenis doesn't get a compensated timestamp that makes it stutter.
    gsap.ticker.lagSmoothing(0);

    // Turn off CSS smooth scrolling while Lenis owns the scroll.
    document.documentElement.classList.add("lenis-active");

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      document.documentElement.classList.remove("lenis-active");
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
};
