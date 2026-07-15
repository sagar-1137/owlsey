"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "./Loader";

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
  // Keep the server and first client render identical. Session storage is
  // consulted only after hydration to avoid replacing the page tree.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hydrationCheck = window.setTimeout(() => {
      setShow(shouldShowIntro());
    }, 0);

    return () => window.clearTimeout(hydrationCheck);
  }, []);

  const handleDone = useCallback(() => {
    sessionStorage.setItem("owlsey:intro-seen", "1");
    document.documentElement.style.overflow = "";
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    // Lock scroll while the loader is up.
    document.documentElement.style.overflow = "hidden";
    // Safety net: never let the intro trap the page. If the exit animation
    // hasn't fired within a hard ceiling (e.g. GSAP paused in a background
    // tab, or an error), force the page to reveal anyway.
    const failsafe = window.setTimeout(handleDone, 6000);
    return () => window.clearTimeout(failsafe);
  }, [show, handleDone]);

  if (!show) return null;
  return <Loader onDone={handleDone} />;
};
