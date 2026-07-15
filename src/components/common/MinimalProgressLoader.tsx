"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";

/**
 * Minimal progress-based loader with smooth bar animation.
 * Suitable for file uploads and task progress.
 */
export const MinimalProgressLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate progress with easing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        return prev + Math.max(0.5, remaining * 0.08);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!barRef.current) return;

    const gsap = ensureGsap();
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {/* Progress bar container */}
      <div className="relative h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-[color:var(--accent-primary)] via-white to-transparent"
          style={{
            boxShadow: "0 0 12px rgba(255,255,255,0.4)",
            width: "0%",
          }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between text-xs text-white/50">
        <span>Loading</span>
        <span className="font-mono">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default MinimalProgressLoader;
