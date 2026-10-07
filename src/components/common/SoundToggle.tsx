"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { isSoundOn, playClick, playHover, setSoundOn, subscribeSound } from "@/lib/uiSound";

const INTERACTIVE = "a, button, summary, [role='button'], [data-cursor]";

/**
 * Sound switch plus the global hover/click listeners. One delegated listener
 * per event covers every link and button on every page, so components don't
 * need to know sound exists.
 */
export const SoundToggle: React.FC = () => {
  // Server and first paint render "off"; the stored choice applies on hydrate.
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lastTarget: Element | null = null;

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest(INTERACTIVE) ?? null;
      // Fire once per element entered, not for every child crossed inside it.
      if (target && target !== lastTarget) playHover();
      lastTarget = target;
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(INTERACTIVE);
      if (target && !target.closest("[data-sound-toggle]")) playClick();
    };

    if (finePointer) document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return (
    <button
      type="button"
      data-sound-toggle
      data-cursor={on ? "MUTE" : "SOUND"}
      aria-pressed={on}
      aria-label={on ? "Turn interface sound off" : "Turn interface sound on"}
      onClick={() => setSoundOn(!on)}
      className={`sound-toggle${on ? " is-on" : ""}`}
    >
      <span className="sound-toggle-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="sound-toggle-label">Sound {on ? "on" : "off"}</span>
    </button>
  );
};
