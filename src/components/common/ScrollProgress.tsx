"use client";

import React, { useEffect, useRef } from "react";

export const ScrollProgress: React.FC = () => {
  // We write `width` straight to the DOM via a ref so React never re-renders
  // on scroll. rAF guarantees one paint per frame regardless of how many
  // scroll events fire.
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let rafId = 0;
    let scheduled = false;

    const flush = () => {
      scheduled = false;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50 pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-blue-400 via-white to-blue-400 shadow-[0_0_8px_#63b3ed]"
        style={{ width: "0%" }}
      />
    </div>
  );
};
