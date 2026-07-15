"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

interface SkeletonLoaderProps {
  lines?: number;
  showPulse?: boolean;
  className?: string;
}

/**
 * Skeleton loader component with pulsing animation.
 * Used for content placeholders during loading.
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  showPulse = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPulse || !containerRef.current) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to("[data-skeleton-line]", {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [showPulse]);

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          data-skeleton-line
          className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded animate-pulse"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
