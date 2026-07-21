"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

let registered = false;
let reducedMotionApplied = false;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ensureGsap() {
  if (typeof window === "undefined") return gsap;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
    registered = true;
  }
  // When the user opts into reduced motion, collapse every tween to its end
  // state instantly. This is the master kill-switch for low-spec PCs.
  if (!reducedMotionApplied && prefersReducedMotion()) {
    gsap.defaults({ duration: 0, delay: 0 });
    gsap.globalTimeline.timeScale(1000);
    reducedMotionApplied = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };

export function splitToWords(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const words = text.split(/(\s+)/);
  const wordEls: HTMLSpanElement[] = [];
  words.forEach((w) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "inline-block overflow-hidden align-baseline";
    const inner = document.createElement("span");
    inner.className = "inline-block will-change-transform";
    inner.textContent = w;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    wordEls.push(inner);
  });
  return wordEls;
}

export function splitToChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const chars: HTMLSpanElement[] = [];
  Array.from(text).forEach((ch) => {
    if (ch === " ") {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const s = document.createElement("span");
    s.className = "inline-block will-change-transform";
    s.textContent = ch;
    el.appendChild(s);
    chars.push(s);
  });
  return chars;
}

export function countUp(
  el: HTMLElement,
  target: number,
  {
    duration = 1.6,
    suffix = "",
    prefix = "",
    decimals = 0,
  }: { duration?: number; suffix?: string; prefix?: string; decimals?: number } = {}
) {
  const obj = { v: 0 };
  return gsap.to(obj, {
    v: target,
    duration,
    ease: "power3.out",
    onUpdate: () => {
      el.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
    },
  });
}
