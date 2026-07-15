"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !label || !canHover.matches || reducedMotion.matches) return;

    const gsap = ensureGsap();
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.24, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.24, ease: "power3.out" });
    let hasPosition = false;
    let lastX = 0;
    let lastY = 0;
    let scrollFrame = 0;

    const setTarget = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest<HTMLElement>("[data-cursor], a, button");
      const cursorLabel = interactive?.dataset.cursor?.trim() ?? "";
      const onDarkSurface = Boolean(element?.closest(".palette-white, .section-dark, .modular-box-dark"));

      cursor.classList.toggle("is-active", Boolean(interactive));
      cursor.classList.toggle("has-label", Boolean(cursorLabel));
      cursor.classList.toggle("is-on-dark", onDarkSurface);
      label.textContent = cursorLabel;
    };

    const onPointerMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;

      if (!hasPosition) {
        gsap.set(cursor, { x: lastX, y: lastY });
        hasPosition = true;
      } else {
        moveX(lastX);
        moveY(lastY);
      }

      cursor.classList.add("is-visible");
      setTarget(event.target);
    };
    const onPointerOver = (event: PointerEvent) => setTarget(event.target);
    const onScroll = () => {
      if (!hasPosition || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        setTarget(document.elementFromPoint(lastX, lastY));
      });
    };
    const onPointerDown = () => cursor.classList.add("is-pressed");
    const onPointerUp = () => cursor.classList.remove("is-pressed");
    const onPointerLeave = () => {
      hasPosition = false;
      cursor.classList.remove("is-visible", "is-active", "has-label", "is-pressed");
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="owlsey-cursor" aria-hidden="true">
      <div className="owlsey-cursor-shell">
        <span ref={labelRef} className="owlsey-cursor-label" />
      </div>
      <span className="owlsey-cursor-dot" />
    </div>
  );
};
