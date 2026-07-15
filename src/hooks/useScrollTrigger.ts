"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollTriggerConfig extends ScrollTrigger.Vars {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Hook for safely creating and managing ScrollTrigger instances
 * Automatically kills triggers on unmount to prevent memory leaks
 */
export function useScrollTrigger(
  config: ScrollTriggerConfig,
  enabled: boolean = true
) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Create the trigger
    triggerRef.current = ScrollTrigger.create(config);

    // Cleanup on unmount
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [config, enabled]);

  return triggerRef;
}

/**
 * Batch create multiple ScrollTriggers with optional cleanup
 */
export function useScrollTriggerBatch(
  configs: ScrollTriggerConfig[],
  enabled: boolean = true
) {
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Create all triggers
    triggersRef.current = configs.map((config) =>
      ScrollTrigger.create(config)
    );

    // Cleanup on unmount
    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [configs, enabled]);

  return triggersRef;
}
