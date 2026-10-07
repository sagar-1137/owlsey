"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ensureGsap } from "@/lib/gsap";
import { getLenis } from "@/components/common/SmoothScroll";

const PANELS = 4;
/** Hard ceiling so a slow route can never leave the page covered. */
const MAX_COVER_MS = 2500;

/**
 * Route change as a grid wipe: four columns — the same 25% rails as the
 * site grid — rise to cover the page, the route swaps underneath, and they
 * lift away top-first. Internal link clicks are intercepted; everything else
 * (new tabs, modifier clicks, hashes, external links, downloads) is left to
 * the browser. Reduced motion skips it entirely.
 */
export const PageTransition: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const coveringRef = useRef(false);
  const failsafeRef = useRef<number | undefined>(undefined);
  // A link like "/#faq" lands on that section, not the top of the page.
  const pendingHashRef = useRef("");

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gsap = ensureGsap();
    const panels = overlay.querySelectorAll<HTMLElement>("[data-transition-panel]");

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (or same page + hash): let normal anchor scrolling happen.
      if (url.pathname === window.location.pathname) return;
      if (coveringRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      coveringRef.current = true;
      pendingHashRef.current = url.hash;
      overlay.dataset.active = "true";

      gsap.killTweensOf(panels);
      gsap.fromTo(
        panels,
        { scaleY: 0, transformOrigin: "50% 100%" },
        {
          scaleY: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        }
      );

      // If the route never resolves, uncover rather than trap the visitor.
      window.clearTimeout(failsafeRef.current);
      failsafeRef.current = window.setTimeout(() => {
        if (!coveringRef.current) return;
        coveringRef.current = false;
        gsap.to(panels, { scaleY: 0, duration: 0.3, onComplete: () => delete overlay.dataset.active });
      }, MAX_COVER_MS);
    };

    // Capture phase so the wipe starts before Next's <Link> handles the click.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [router]);

  // The new route has rendered: reset scroll under the cover, then reveal.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !coveringRef.current) return;

    window.clearTimeout(failsafeRef.current);
    const gsap = ensureGsap();
    const panels = overlay.querySelectorAll<HTMLElement>("[data-transition-panel]");

    const hash = pendingHashRef.current;
    pendingHashRef.current = "";
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      getLenis()?.scrollTo(top, { immediate: true });
      window.scrollTo(0, top);
    } else {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }

    gsap.to(panels, {
      scaleY: 0,
      transformOrigin: "50% 0%",
      duration: 0.55,
      stagger: 0.06,
      delay: 0.12,
      ease: "power3.inOut",
      onComplete: () => {
        coveringRef.current = false;
        delete overlay.dataset.active;
      },
    });
  }, [pathname]);

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden="true">
      {Array.from({ length: PANELS }, (_, index) => (
        <span key={index} data-transition-panel className="page-transition-panel">
          {index === 0 && <span className="page-transition-mark">Owlsey</span>}
        </span>
      ))}
    </div>
  );
};
