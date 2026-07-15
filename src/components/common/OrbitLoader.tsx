"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

/**
 * Orbit-based animated loader with rotating elements.
 * Creates a sophisticated loading indicator.
 */
export const OrbitLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // Outer orbit
      gsap.to("[data-orbit-outer]", {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      // Inner orbit (counter-rotation)
      gsap.to("[data-orbit-inner]", {
        rotation: -360,
        duration: 6,
        ease: "none",
        repeat: -1,
      });

      // Pulsing core
      gsap.to("[data-orbit-core]", {
        scale: 1.1,
        opacity: 0.6,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-24 h-24"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="relative w-20 h-20">
        {/* Outer orbit */}
        <div
          data-orbit-outer
          className="absolute inset-0 border border-white/20 rounded-full"
          style={{
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          {/* Outer dot */}
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/40 rounded-full transform -translate-x-1/2 -translate-y-1" />
        </div>

        {/* Inner orbit */}
        <div
          data-orbit-inner
          className="absolute inset-2 border border-white/10 rounded-full"
          style={{
            boxShadow: "inset 0 0 15px rgba(255,255,255,0.05)",
          }}
        >
          {/* Inner dot */}
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1" />
        </div>

        {/* Core */}
        <div
          data-orbit-core
          className="absolute inset-6 border border-white/30 rounded-full flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default OrbitLoader;
