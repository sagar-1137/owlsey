"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";

/**
 * Page Transition Loader — shows during route navigation, provides
 * visual feedback that the next page is loading. Automatically appears
 * on route change and disappears when the new page content is ready.
 */
export const PageTransitionLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastUrlRef = useRef<string>("");

  // Detect navigation via URL changes
  useEffect(() => {
    const handleNavigation = () => {
      const currentUrl = window.location.pathname + window.location.search;
      
      if (lastUrlRef.current && currentUrl !== lastUrlRef.current) {
        setIsLoading(true);
        
        // Auto-hide loader after content settles
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
      }
      
      lastUrlRef.current = currentUrl;
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", handleNavigation);
    
    // Also detect through window.history changes via MutationObserver on document title
    const observer = new MutationObserver(() => {
      handleNavigation();
    });

    observer.observe(document.head, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      observer.disconnect();
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!isLoading || !rootRef.current) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("[data-transition-bar]", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.35,
        ease: "power2.out",
      })
        .from(
          "[data-transition-label]",
          {
            opacity: 0,
            y: 8,
            filter: "blur(4px)",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to("[data-transition-dots]", {
          opacity: 1,
          duration: 0.2,
        }, "-=0.15");
    }, rootRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Exit animation
  useEffect(() => {
    if (isLoading || !rootRef.current) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to("[data-transition-label]", {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
      })
        .to(
          "[data-transition-bar]",
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "-=0.1"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={rootRef}
      className="fixed top-0 left-0 right-0 z-[95] h-1 bg-transparent"
      aria-hidden="true"
    >
      {/* Animated progress bar */}
      <div
        data-transition-bar
        className="absolute inset-0 h-full bg-gradient-to-r from-[color:var(--accent-primary)] via-white to-transparent"
        style={{
          boxShadow: "0 0 12px rgba(255,255,255,0.4)",
        }}
      />

      {/* Loading indicator with label and dots */}
      <div
        data-transition-label
        className="absolute top-4 left-6 flex items-center gap-3"
      >
        <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
          Loading
        </span>
        <div data-transition-dots className="flex gap-1 opacity-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
