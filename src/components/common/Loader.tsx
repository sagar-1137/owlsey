"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsap, useGSAP } from "@/lib/gsap";

interface LoaderProps {
  /** Fired once the exit animation finishes so the host can unmount. */
  onDone?: () => void;
}

/** Structural loader: the Owlsey grid draws first, then the mark and wordmark
 * resolve independently at its central crossing. */
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
      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline
        .addLabel("grid", 0.16)
        .to("[data-loader-v-line]", {
          scaleY: 1,
          duration: 1.05,
          stagger: 0.14,
        }, "grid")
        .to("[data-loader-h-line]", {
          scaleX: 1,
          duration: 1.05,
          stagger: 0.14,
        }, "grid+=0.12")
        .addLabel("identity", 0.82)
        .to("[data-loader-mark]", {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "back.out(1.35)",
        }, "identity")
        .to("[data-loader-word]", {
          clipPath: "inset(0 0% 0 0)",
          autoAlpha: 1,
          duration: 0.95,
          ease: "power4.inOut",
        }, "identity+=0.35");
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
    tl.to("[data-loader-identity]", {
      autoAlpha: 0,
      scale: 0.96,
      filter: "blur(5px)",
      duration: 0.45,
      ease: "power2.in",
    }).to("[data-loader-line]", {
      autoAlpha: 0,
      duration: 0.35,
    }, "<0.12").to(
      root,
      { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" },
      "-=0.08"
    );
  }, [progress, onDone]);

  return (
    <div
      ref={rootRef}
      className="owlsey-loader fixed inset-0 z-[100] overflow-hidden"
    >
      <div className="owlsey-loader-noise" aria-hidden />

      <div className="owlsey-loader-grid" aria-hidden>
        <span data-loader-line data-loader-v-line className="owlsey-loader-line owlsey-loader-line--v is-one" />
        <span data-loader-line data-loader-v-line className="owlsey-loader-line owlsey-loader-line--v is-two" />
        <span data-loader-line data-loader-h-line className="owlsey-loader-line owlsey-loader-line--h is-one" />
        <span data-loader-line data-loader-h-line className="owlsey-loader-line owlsey-loader-line--h is-two" />
      </div>

      <div className="owlsey-loader-identity" data-loader-identity>
        <div className="owlsey-loader-lockup" aria-label="Owlsey">
          <div className="owlsey-loader-mark" data-loader-mark>
            <div className="owlsey-loader-mark-crop">
              <Image
                src="/logos/owlsey-mark.svg"
                alt=""
                width={455}
                height={455}
                priority
                className="owlsey-loader-mark-image"
              />
            </div>
          </div>

          <div className="owlsey-loader-word" data-loader-word>
            <Image
              src="/logos/owlsey-wordmark.svg"
              alt=""
              width={1410}
              height={240}
              priority
              className="owlsey-loader-word-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
