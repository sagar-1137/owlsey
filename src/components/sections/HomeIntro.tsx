"use client";

import React, { useEffect, useRef } from "react";
import { Mouse } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { HeroContentCells } from "@/components/sections/HeroContentCells";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const lines = ["SOFTWARE SHAPED", "AROUND YOUR", "BUSINESS."];

export const HomeIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Reduced motion: the statement is content, not decoration. Show it
    // resolved immediately, hand the hero its own copy back, and skip the
    // pinned travel entirely so there is no artificial scroll distance.
    if (prefersReducedMotion) {
      root.dataset.introReady = "true";
      root.dataset.introHandoff = "static";
      const navigation = document.querySelector<HTMLElement>(".owlsey-nav-fixed");
      if (navigation) {
        navigation.style.opacity = "1";
        navigation.style.transform = "translateX(-50%)";
      }
      window.dispatchEvent(new Event("owlsey:intro-ready"));
      return;
    }

    const gsap = ensureGsap();
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const chars = root.querySelectorAll<HTMLElement>("[data-intro-char]");
      const scrollCue = root.querySelector<HTMLElement>("[data-intro-scroll]");
      const frame = root.querySelector<HTMLElement>("[data-intro-frame]");
      const framePerimeter = frame?.querySelector<SVGElement>(".technical-grid-perimeter");
      const frameVerticalRails = frame?.querySelectorAll<HTMLElement>(".technical-grid-line--v");
      const frameHorizontalRails = frame?.querySelectorAll<HTMLElement>(".technical-grid-line--h");
      const framePerimeterRegisters = frame?.querySelectorAll<HTMLElement>(
        ".technical-grid-corner, .technical-grid-edge-register"
      );
      const frameInternalRegisters = frame?.querySelectorAll<HTMLElement>(
        ".technical-grid-junction:not(.technical-grid-corner):not(.technical-grid-edge-register)"
      );
      const stage = root.querySelector<HTMLElement>("[data-intro-stage]");
      const title = root.querySelector<HTMLElement>("[data-intro-title]");
      // The bottom-row cells that fill the resolved grid once the statement has
      // settled. Their reveal is staggered at the tail of the travel timeline.
      const cells = root.querySelectorAll<HTMLElement>("[data-intro-cell]");
      const navigation = document.querySelector<HTMLElement>(".owlsey-nav-fixed");
      // The hero reserves an empty slot at the exact place and scale the
      // statement must end at. Flip measures that slot rather than us guessing
      // a scale/offset pair that would drift with viewport and font loading.
      const slot = document.querySelector<HTMLElement>("[data-hero-title-slot]");
      if (!title || !frame || !stage) return;

      // Keep only a narrow glimpse of the neighbouring empty cells around the
      // intro. At large desktop sizes 1.25vw read as page padding (~24px), so
      // the reveal is deliberately capped at 10px.
      const getEmptyCellReveal = () => Math.min(10, Math.max(6, window.innerWidth * 0.005));

      gsap.set(chars, { opacity: 0, yPercent: 115, filter: "blur(8px)" });
      gsap.set(scrollCue, { opacity: 0, y: 8 });
      gsap.set(frame, {
        opacity: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        "--technical-grid-gutter": "0px",
        clipPath: "none",
      });
      if (framePerimeter) gsap.set(framePerimeter, { opacity: 0 });
      if (frameVerticalRails) gsap.set(frameVerticalRails, { scaleY: 0, transformOrigin: "top center" });
      if (frameHorizontalRails) gsap.set(frameHorizontalRails, { scaleX: 0, transformOrigin: "left center" });
      if (framePerimeterRegisters) gsap.set(framePerimeterRegisters, { opacity: 0, scale: 0.86 });
      if (frameInternalRegisters) gsap.set(frameInternalRegisters, { opacity: 0, scale: 0.72 });
      gsap.set(stage, { clipPath: "inset(0px round 0px)" });
      // Cells start hidden and slightly low; the tail of the travel timeline
      // brings them up once the statement has reached the hero.
      gsap.set(cells, { opacity: 0, y: 28 });
      if (navigation) gsap.set(navigation, { opacity: 0, y: -14 });

      const settle = () => {
        if (root.dataset.introReady === "true") return;
        root.dataset.introReady = "true";
        window.dispatchEvent(new Event("owlsey:intro-ready"));
      };

      let failsafe: number | undefined;
      let typeDelay: number | undefined;
      let typeInterval: number | undefined;
      let entranceStarted = false;

      const startEntrance = () => {
        if (entranceStarted) return;
        entranceStarted = true;

        // Reveal one character at a time with browser timers. This must remain
        // independent of the scroll-driven GSAP timeline: a paused or
        // refreshed ScrollTrigger must never turn the typing into one late
        // all-at-once flash.
        let characterIndex = 0;
        typeDelay = window.setTimeout(() => {
          typeInterval = window.setInterval(() => {
            const character = chars.item(characterIndex);
            if (character) {
              gsap.set(character, {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
              });
            }
            characterIndex += 1;

            if (characterIndex < chars.length) return;
            if (typeInterval) window.clearInterval(typeInterval);
            gsap.to(scrollCue, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: 0.25,
              ease: "power3.out",
              onComplete: () => {
                if (failsafe) window.clearTimeout(failsafe);
                settle();
              },
            });
          }, 58);
        }, 180);

        // Start the safety window with the actual entrance, not while the
        // full-screen loader is still covering the page.
        failsafe = window.setTimeout(() => {
          if (root.dataset.introReady === "true") return;
          gsap.set(chars, { opacity: 1, yPercent: 0, filter: "blur(0px)" });
          gsap.set(scrollCue, { opacity: 1, y: 0 });
          settle();
        }, 3600);
      };

      const loader = document.querySelector<HTMLElement>("[data-intro-overlay]");
      const loaderIsVisible = loader && window.getComputedStyle(loader).display !== "none";
      if (loaderIsVisible) {
        window.addEventListener("owlsey:loader-done", startEntrance, { once: true });
        cleanups.push(() => window.removeEventListener("owlsey:loader-done", startEntrance));
      } else {
        startEntrance();
      }
      cleanups.push(() => {
        if (failsafe) window.clearTimeout(failsafe);
        if (typeDelay) window.clearTimeout(typeDelay);
        if (typeInterval) window.clearInterval(typeInterval);
      });

      const travel = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.001) {
              gsap.set(scrollCue, { autoAlpha: 0, y: -12 });
            } else if (root.dataset.introReady === "true") {
              gsap.set(scrollCue, { autoAlpha: 1, y: 0 });
            }
          },
        },
      });

      travel
        // The opening is genuinely edge-to-edge. As the grid is introduced,
        // the viewport softly resolves into the persistent framed shell used
        // by every section that follows.
        .to(
          stage,
          {
            clipPath: () => {
              return "inset(0px)";
            },
            duration: 0.52,
            ease: "power2.inOut",
          },
          0.1
        )
        // Draw the grid while the statement travels upward. The grid and
        // navigation finish at the same moment as the title lands.
        .to(frame, { opacity: 1, duration: 0.08, ease: "none" }, 0.18)
        .to(
          frame,
          {
            // Explicit edges keep the 4×2 content grid rectangular throughout
            // the scrub. Animating the `inset` shorthand caused GSAP to
            // interpolate an uneven box at intermediate scroll positions.
            top: () => `${getEmptyCellReveal()}px`,
            right: () => `${getEmptyCellReveal()}px`,
            bottom: () => `${getEmptyCellReveal()}px`,
            left: () => `${getEmptyCellReveal()}px`,
            "--technical-grid-gutter": () => `${getEmptyCellReveal()}px`,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0.18
        )
      if (framePerimeter) travel.to(framePerimeter, { opacity: 1, duration: 0.12, ease: "none" }, 0.18);
      if (framePerimeterRegisters?.length) travel.to(framePerimeterRegisters, { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0.18);
      if (frameVerticalRails?.length) travel.to(frameVerticalRails, { scaleY: 1, duration: 0.5, stagger: 0.035, ease: "power2.inOut" }, 0.2);
      if (frameHorizontalRails?.length) travel.to(frameHorizontalRails, { scaleX: 1, duration: 0.48, stagger: 0.04, ease: "power2.inOut" }, 0.22);
      if (frameInternalRegisters?.length) travel.to(frameInternalRegisters, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.018, ease: "power2.out" }, 0.34);
      if (navigation) travel.to(navigation, { opacity: 1, y: 0, duration: 0.2 }, 0.58);
      // Once the statement has settled into the hero slot (~0.78), fill the
      // resolved grid's bottom row one cell at a time. This is the second,
      // distinct phase: the criteria arrive only after the headline lands, not
      // during its travel. Finishes before the intro fades so no cell is caught
      // mid-reveal at the handoff.
      if (cells.length) {
        travel.to(
          cells,
          { opacity: 1, y: 0, duration: 0.05, stagger: 0.028, ease: "power2.out" },
          0.79
        );
      }
      // The intro is now the permanent hero — it no longer fades to reveal a
      // separate section beneath it, so the frame and root stay fully visible
      // through the whole scrub. (Previously both faded here to hand off to a
      // duplicate <Hero />, which has been removed.)

      // The intro title travels toward its own locked landing slot. It
      // stays parented to the sticky stage during the scroll so the transform
      // remains stable; the hero copy takes over once its grid reveals.
      //
      // Without a slot there is simply no travel — the statement stays put and
      // the entrance above still runs. Deliberately not an early return: that
      // would skip the failsafe cleanup registered below.
      if (!slot) return;

      // Measured each refresh rather than hard-coded, so the landing stays
      // correct across breakpoints and after fonts swap.
      let deltaX = 0;
      let deltaY = 0;
      let scale = 1;

      const measure = () => {
        // Strip any transform already applied so the two boxes are compared in
        // their natural positions; otherwise each refresh compounds the last.
        gsap.set(title, { x: 0, y: 0, scale: 1 });

        const from = title.getBoundingClientRect();
        const to = slot.getBoundingClientRect();
        if (!from.width || !to.width) return;

        const navigationBox = navigation?.getBoundingClientRect();
        const visibleLineWidth = Math.max(
          ...Array.from(root.querySelectorAll<HTMLElement>(".home-intro-line")).map((line) => {
            const characters = line.querySelectorAll<HTMLElement>("[data-intro-char]");
            const first = characters.item(0)?.getBoundingClientRect();
            const last = characters.item(characters.length - 1)?.getBoundingClientRect();
            return first && last ? last.right - first.left : 0;
          })
        );
        // The landing title must never become narrower than the navigation
        // rail above it. Measure the actual glyph line rather than the 92vw
        // title wrapper; the wrapper is intentionally much wider than its
        // text and previously made the visible heading shrink too far.
        const landingWidth = Math.max(to.width, navigationBox?.width ?? 0);
        scale = Math.min(1, landingWidth / (visibleLineWidth || from.width));

        // The settled statement must sit fully inside the top row's grid box.
        // The width-driven scale alone could leave the scaled block taller
        // than the space between the slot and the mid rail, letting the last
        // line bleed into the bottom row — cap the scale to the available
        // height as well.
        const stageBox = stage.getBoundingClientRect();
        const midRail = stageBox.top + stageBox.height / 2;
        const availableHeight = midRail - to.top - 24;
        if (availableHeight > 0 && from.height * scale > availableHeight) {
          scale = availableHeight / from.height;
        }

        // The slot now lives in the same sticky stage as the title, so their
        // relative offset is constant regardless of scroll — the delta is just
        // slot-minus-title measured at rest. (No document-space conversion is
        // needed anymore; that was for the old below-the-fold hero slot.)
        const landingCenterX = navigationBox
          ? navigationBox.left + navigationBox.width / 2
          : to.left + to.width / 2;
        deltaX = landingCenterX - (from.left + from.width / 2);
        // Account for the shrink pulling the box toward its centre origin.
        const measuredDeltaY =
          to.top - from.top - (from.height * (1 - scale)) / 2;
        deltaY = Math.min(measuredDeltaY, -24);
      };

      travel.to(
        title,
        {
          x: () => deltaX,
          y: () => deltaY,
          scale: () => scale,
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
          duration: 0.7,
        },
        0.08
      );

      ScrollTrigger.addEventListener("refreshInit", measure);
      cleanups.push(() => ScrollTrigger.removeEventListener("refreshInit", measure));
      measure();

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
    }, root);

    return () => {
      // gsap.context() reverts tweens and ScrollTriggers created inside it, but
      // not listeners registered on ScrollTrigger itself.
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="home-intro"
      data-chapter="Direction"
      aria-label="Owlsey introduction"
    >
      <div className="home-intro-stage" data-intro-stage>
        <TechnicalGrid className="home-intro-grid" data-intro-frame />

        {/* The resolved grid's top row holds only the statement's landing slot,
            centred in columns 2–3. It is empty and invisible — a measurement
            target for the travelling headline, nothing rendered. */}
        <div className="home-intro-topbar" data-intro-topbar aria-hidden="true">
          <div className="home-intro-slot" data-hero-title-slot data-hero-locked-title />
        </div>

        <div className="home-intro-title" data-intro-title>
          <h1 className="home-intro-heading">
            {lines.map((line) => (
              <span className="home-intro-line" key={line}>
                {Array.from(line).map((character, index) => (
                  <span
                    className="home-intro-char"
                    data-intro-char
                    aria-hidden="true"
                    key={`${character}-${index}`}
                  >
                    {character === " " ? " " : character}
                  </span>
                ))}
                <span className="sr-only">{line} </span>
              </span>
            ))}
          </h1>
        </div>
        {/* The resolved grid's bottom row. These are the same four cells the
            hero renders; here they occupy the intro's own lower row so they
            fill the blank cells once the statement has settled into place. */}
        <div className="home-intro-cells" data-intro-cells aria-hidden="true">
          <HeroContentCells revealAttr="data-intro-cell" />
        </div>
        <div className="home-intro-scroll" data-intro-scroll>
          <span>Scroll to shape the system</span>
          <span className="home-intro-scroll-mouse" aria-hidden="true">
            <Mouse />
          </span>
          <span className="home-intro-scroll-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
