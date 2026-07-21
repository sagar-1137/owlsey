"use client";

import { useEffect } from "react";
import { ensureGsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export const MotionLayer = () => {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !finePointer) return;

    const gsap = ensureGsap();
    const headingSplits: SplitText[] = [];
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".palette-white .modular-box:not([data-motion-static]):not([data-no-card-motion])"
      )
    );
    cards.forEach((card) => card.classList.add("motion-card"));

    const cardChildren = (card: HTMLElement) =>
      Array.from(card.children).filter((child): child is HTMLElement => child instanceof HTMLElement);

    let activeCard: HTMLElement | null = null;

    const leaveCard = (card: HTMLElement) => {
      const children = cardChildren(card);
      card.classList.remove("is-motion-hovered");
      gsap.killTweensOf(children);
      gsap.to(children, {
        y: 0,
        filter: "blur(0px)",
        duration: 0.32,
        stagger: 0.012,
        ease: "power3.out",
        clearProps: "transform,filter",
      });
    };

    /** Snap the light to a position without easing — used on enter so the glow
     *  doesn't sweep across the panel from wherever it was left. */
    const placeLight = (card: HTMLElement, x: number, y: number) => {
      gsap.killTweensOf(card);
      gsap.set(card, { "--motion-x": `${x}%`, "--motion-y": `${y}%` });
    };

    const enterCard = (card: HTMLElement) => {
      if (activeCard === card) return;
      if (activeCard) leaveCard(activeCard);

      activeCard = card;
      const children = cardChildren(card);
      card.classList.add("is-motion-hovered");
      gsap.killTweensOf(children);
      gsap.fromTo(
        children,
        { filter: "blur(1px)" },
        {
          y: -2,
          filter: "blur(0px)",
          duration: 0.42,
          stagger: 0.018,
          ease: "power3.out",
        }
      );
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!finePointer) return;
      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>(".motion-card");
      const previous = event.relatedTarget instanceof Node ? event.relatedTarget : null;

      if (card && (!previous || !card.contains(previous))) {
        enterCard(card);
      }

      const link = target?.closest<HTMLElement>("[data-motion-link]");
      const label = link?.querySelector<HTMLElement>("[data-motion-label]");
      if (link && label && (!previous || !link.contains(previous))) {
        gsap.killTweensOf(label);
        gsap.timeline()
          .to(label, { y: -7, opacity: 0, filter: "blur(2px)", duration: 0.12, ease: "power2.in" })
          .fromTo(
            label,
            { y: 7, opacity: 0, filter: "blur(2px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.3, ease: "power3.out" }
          );
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!finePointer) return;
      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>(".motion-card");
      const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
      if (!card || (next && card.contains(next))) return;

      leaveCard(card);
      if (activeCard === card) activeCard = null;
    };

    let pointerFrame = 0;
    let pendingCard: HTMLElement | null = null;
    let pendingX = 50;
    let pendingY = 50;
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const target = event.target instanceof Element ? event.target : null;
      pendingCard = target?.closest<HTMLElement>(".motion-card") ?? null;
      if (!pendingCard) {
        if (activeCard) leaveCard(activeCard);
        activeCard = null;
        return;
      }

      const isNewCard = activeCard !== pendingCard;
      enterCard(pendingCard);

      const rect = pendingCard.getBoundingClientRect();
      pendingX = ((event.clientX - rect.left) / rect.width) * 100;
      pendingY = ((event.clientY - rect.top) / rect.height) * 100;

      // On entry the light appears under the cursor; afterwards it eases along.
      if (isNewCard) {
        placeLight(pendingCard, pendingX, pendingY);
        return;
      }
      if (pointerFrame) return;

      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const card = pendingCard;
        if (!card) return;
        // Tween the custom properties rather than writing them straight through,
        // so the light eases toward the cursor and trails it slightly. `overwrite`
        // keeps a single tween per card as the pointer keeps moving.
        gsap.to(card, {
          "--motion-x": `${pendingX}%`,
          "--motion-y": `${pendingY}%`,
          duration: 0.55,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const headings = chapter.querySelectorAll<HTMLElement>(".modular-display");
        if (headings.length) {
          ScrollTrigger.create({
            trigger: chapter,
            start: "top bottom",
            end: "bottom top",
            animation: gsap.fromTo(
              headings,
              { yPercent: 3.5 },
              { yPercent: -3.5, ease: "none", stagger: 0.025 }
            ),
            scrub: 0.85,
          });
        }

        const sceneHeading = chapter.querySelector<HTMLElement>("h2.modular-display");
        if (sceneHeading) {
          const split = SplitText.create(sceneHeading, {
            type: "words",
            wordsClass: "motion-split-word",
          });
          headingSplits.push(split);

          gsap.fromTo(
            split.words,
            { yPercent: 112, rotation: 2.5, filter: "blur(5px)", autoAlpha: 0 },
            {
              yPercent: 0,
              rotation: 0,
              filter: "blur(0px)",
              autoAlpha: 1,
              stagger: 0.035,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top 88%",
                end: "top 42%",
                scrub: 0.7,
              },
            },
          );

          const chapterIndex = Array.from(document.querySelectorAll("[data-chapter]")).indexOf(chapter);
          gsap.fromTo(
            sceneHeading,
            {
              xPercent: chapterIndex % 2 === 0 ? -9 : 7,
              scale: 0.96,
              transformOrigin: chapterIndex % 2 === 0 ? "left center" : "right center",
            },
            {
              xPercent: chapterIndex % 2 === 0 ? 5 : -5,
              scale: 1.035,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        // Reference-study finding: the premium feel comes from one continuous
        // scroll-linked composition, not isolated entrance tweens. Unowned
        // grid cells therefore settle into the stage as the chapter crosses
        // the viewport. Components with bespoke motion keep their own timing.
        if (chapter.matches(".tech-logo-section")) return;
        const stageCells = Array.from(
          chapter.querySelectorAll<HTMLElement>(
            ".modular-box:not([data-operating-cell]):not([data-project-row])"
          )
        );
        if (!stageCells.length) return;

        const stage = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 92%",
            end: "top 30%",
            scrub: 0.75,
          },
        });
        stageCells.forEach((cell, index) => {
          const cellContent = Array.from(cell.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement,
          );
          if (!cellContent.length) return;

          const entersFromLeft = index % 2 === 0;

          stage.fromTo(
            cellContent,
            {
              x: entersFromLeft ? -38 : 38,
              y: 52 + Math.min(index, 3) * 6,
              rotation: entersFromLeft ? -1.2 : 1.2,
              transformOrigin: entersFromLeft ? "left bottom" : "right bottom",
              opacity: 0.2,
              filter: "blur(4px)",
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              duration: 1,
              stagger: 0.025,
            },
            index * 0.11,
          );
        });
      });
    });

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointermove", onPointerMove);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      cards.forEach((card) => card.classList.remove("motion-card", "is-motion-hovered"));
      ctx.revert();
      headingSplits.forEach((split) => split.revert());
    };
  }, []);

  return null;
};
