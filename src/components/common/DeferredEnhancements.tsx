"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const MotionLayer = lazy(() =>
  import("@/components/common/MotionLayer").then((module) => ({ default: module.MotionLayer }))
);

export function DeferredEnhancements() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const desktopMotion = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!desktopMotion.matches) return;

    const activate = () => setReady(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(activate, { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(activate, 900);
    return () => window.clearTimeout(handle);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <MotionLayer />
    </Suspense>
  );
}
