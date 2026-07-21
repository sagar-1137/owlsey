"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, Check } from "lucide-react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  acceptAll,
  rejectAll,
  readConsent,
  saveConsent,
  CONSENT_EVENT,
} from "@/lib/cookieConsent";

/** Subscribe to consent changes so the banner reacts without a reload. */
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** true once the visitor has recorded a consent choice. */
const hasConsent = () => readConsent() !== null;

type OptionalCategory = "analytics" | "preferences";

const CATEGORIES: {
  id: OptionalCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how visitors interact with the site.",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Remember your settings so the site feels like yours.",
  },
];

export const CookieConsent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  // Read storage the React-blessed way: server snapshot is always "has
  // consent" (so nothing renders during SSR / first paint), the client
  // snapshot reflects real storage. No effect, no hydration mismatch.
  const consented = useSyncExternalStore(subscribe, hasConsent, () => true);
  // Local flag drives the exit animation before we actually unmount.
  const [dismissed, setDismissed] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [prefs, setPrefs] = useState<Record<OptionalCategory, boolean>>({
    analytics: false,
    preferences: false,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const visible = !consented && !dismissed;

  // Slide up from the bottom when it becomes visible.
  useEffect(() => {
    if (!visible) return;
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion) {
      panel.style.transform = "none";
      panel.style.opacity = "1";
      return;
    }

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { yPercent: 120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", delay: 0.35 }
      );
    }, panel);
    return () => ctx.revert();
  }, [visible, prefersReducedMotion]);

  const dismiss = (action: () => void) => {
    const panel = panelRef.current;
    if (prefersReducedMotion || !panel) {
      setDismissed(true);
      action();
      return;
    }
    const gsap = ensureGsap();
    gsap.to(panel, {
      yPercent: 120,
      autoAlpha: 0,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => {
        setDismissed(true);
        // Persist after the panel has left so the store update doesn't
        // yank it out mid-animation.
        action();
      },
    });
  };

  const handleSavePrefs = () =>
    dismiss(() =>
      saveConsent({ analytics: prefs.analytics, preferences: prefs.preferences })
    );

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
      <div ref={panelRef} className="cookie-consent-panel">
        <div className="cookie-consent-inner">
          <div className="cookie-consent-message">
            <div className="cookie-consent-head">
              <span className="cookie-consent-icon" aria-hidden="true">
                <Cookie className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <p className="display-kicker text-[color:var(--text-dim)]">Privacy / Cookies</p>
            </div>
            <h2 id="cookie-consent-title" className="cookie-consent-title text-[color:var(--text-strong)]">
              We use cookies to keep things working<span className="accent-stop">.</span>
            </h2>
            <p className="cookie-consent-copy text-[color:var(--text-muted)]">
              Essential cookies keep the site running. Analytics and preference
              cookies are optional — you decide. Read our{" "}
              <Link href="/cookies" className="cookie-consent-link" data-cursor="VIEW">
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          <div className="cookie-consent-actions">
            {customizing ? (
              <>
                <button type="button" data-cursor="START" onClick={handleSavePrefs} className="cookie-consent-btn cookie-consent-btn--primary">
                  Save choices
                </button>
                <button type="button" data-cursor="VIEW" onClick={() => setCustomizing(false)} className="cookie-consent-btn cookie-consent-btn--ghost">
                  Back
                </button>
              </>
            ) : (
              <>
                <button type="button" data-cursor="START" onClick={() => dismiss(acceptAll)} className="cookie-consent-btn cookie-consent-btn--primary">
                  Accept all
                </button>
                <button type="button" data-cursor="VIEW" onClick={() => dismiss(rejectAll)} className="cookie-consent-btn cookie-consent-btn--ghost">
                  Reject non-essential
                </button>
                <button type="button" data-cursor="VIEW" onClick={() => setCustomizing(true)} className="cookie-consent-btn cookie-consent-btn--text">
                  Customize
                </button>
              </>
            )}
          </div>
        </div>

        {customizing && (
          <ul className="cookie-consent-options">
            <li className="cookie-consent-option is-locked">
              <div>
                <p className="cookie-consent-option-label">Essential</p>
                <p className="cookie-consent-option-desc">Required for the site to function. Always on.</p>
              </div>
              <span className="cookie-consent-locked-tag display-kicker">Always on</span>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="cookie-consent-option">
                <div>
                  <p className="cookie-consent-option-label">{cat.label}</p>
                  <p className="cookie-consent-option-desc">{cat.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs[cat.id]}
                  aria-label={`Toggle ${cat.label} cookies`}
                  data-cursor="TOGGLE"
                  onClick={() => setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id] }))}
                  className={`cookie-consent-switch${prefs[cat.id] ? " is-on" : ""}`}
                >
                  <span className="cookie-consent-switch-thumb">
                    {prefs[cat.id] && <Check className="h-2.5 w-2.5" strokeWidth={2.5} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
