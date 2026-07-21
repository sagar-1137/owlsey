"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { lockScroll } from "./SmoothScroll";

/**
 * Shows the cinematic Loader on first paint, then unmounts it once its exit
 * animation completes. Guarded per session so returning within the same tab
 * doesn't replay the intro on every navigation.
 */
/** Decide after hydration whether the intro should play this load. */
const shouldShowIntro = () => {
  const seen = sessionStorage.getItem("owlsey:intro-seen");
  // `?intro=1` forces the intro to replay — handy for QA/design review.
  return !seen || window.location.search.includes("intro=1");
};

export const LoaderWrapper: React.FC = () => {
  // Render the intro on the server and on the first client pass so the page
  // can never paint before its overlay. A small pre-paint script in the root
  // layout hides this element when the intro was already seen this session.
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hydrationCheck = window.setTimeout(() => {
      setShow(shouldShowIntro());
    }, 0);

    return () => window.clearTimeout(hydrationCheck);
  }, []);

  const handleDone = useCallback(() => {
    sessionStorage.setItem("owlsey:intro-seen", "1");
    document.documentElement.classList.add("owlsey-intro-seen");
    document.documentElement.style.overflow = "";
    lockScroll(false);
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    // Lock scroll while the loader is up. `overflow` covers native scroll
    // (mobile / non-Lenis); `lockScroll` pauses Lenis on desktop so its eased
    // position doesn't drift behind the frozen overlay.
    document.documentElement.style.overflow = "hidden";
    lockScroll(true);
    // Safety net: never let the intro trap the page. If the exit animation
    // hasn't fired within a hard ceiling (e.g. GSAP paused in a background
    // tab, or an error), force the page to reveal anyway.
    const failsafe = window.setTimeout(handleDone, 6000);
    return () => {
      window.clearTimeout(failsafe);
      // Always restore scroll when the overlay goes away. Without this, a
      // repeat visit that skips the intro (`show` flips to false before the
      // Loader's exit animation ever calls handleDone) would leave the page
      // permanently scroll-locked.
      document.documentElement.style.overflow = "";
      lockScroll(false);
    };
  }, [show, handleDone]);

  if (!show) return null;
  return (
    <div data-intro-overlay>
      <Loader onDone={handleDone} />
    </div>
  );
};
