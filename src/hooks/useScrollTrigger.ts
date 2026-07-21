"use client";

import { useEffect } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Safe wrapper for ScrollTrigger animations with automatic cleanup.
 * Ensures proper context management and prevents memory leaks.
 */
export function useScrollTrigger(
  ref: React.RefObject<HTMLElement | null>,
  animationCallback: (gsap: ReturnType<typeof ensureGsap>) => void,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      animationCallback(gsap);
    }, element);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === element)
        .forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
}
