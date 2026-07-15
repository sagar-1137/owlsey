"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

export const ScrollDirector: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const current = currentRef.current;
    const label = labelRef.current;
    const progress = progressRef.current;
    if (!root || !current || !label || !progress) return;

    const gsap = ensureGsap();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!chapters.length) return;

    let activeIndex = -1;

    const setChapter = (index: number) => {
      if (index === activeIndex) return;
      activeIndex = index;

      chapters.forEach((chapter, chapterIndex) => {
        chapter.classList.toggle("is-chapter-active", chapterIndex === index);
      });

      const chapterColor = window.getComputedStyle(chapters[index]).backgroundColor;
      if (chapterColor && chapterColor !== "rgba(0, 0, 0, 0)") {
        document.documentElement.style.setProperty("--page-frame-color", chapterColor);
      }

      if (reducedMotion) {
        current.textContent = String(index + 1).padStart(2, "0");
        label.textContent = chapters[index].dataset.chapter ?? "Chapter";
        return;
      }

      gsap.killTweensOf([current, label]);
      gsap.to([current, label], {
        opacity: 0,
        y: -7,
        duration: 0.16,
        ease: "power2.in",
        onComplete: () => {
          current.textContent = String(index + 1).padStart(2, "0");
          label.textContent = chapters[index].dataset.chapter ?? "Chapter";
          gsap.fromTo(
            [current, label],
            { opacity: 0, y: 7 },
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.04, ease: "power3.out" }
          );
        },
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      setChapter(0);

      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 56%",
          end: "bottom 44%",
          onEnter: () => setChapter(index),
          onEnterBack: () => setChapter(index),
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
      });
    }, root);

    return () => {
      document.documentElement.style.removeProperty("--page-frame-color");
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-director" aria-hidden="true">
      <div className="scroll-director-readout">
        <span ref={currentRef} className="scroll-director-current">01</span>
        <span ref={labelRef} className="scroll-director-label">Direction</span>
        <span className="scroll-director-total">/ 05</span>
        <div className="scroll-director-track">
          <span ref={progressRef} className="scroll-director-progress" />
        </div>
      </div>
    </div>
  );
};
