"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";
import { ArrowUp } from "lucide-react";

type Section = { id: string; label: string };

const HOME_SECTIONS: Section[] = [
  { id: "home", label: "Hero" },
  { id: "projects", label: "Works" },
  { id: "experience", label: "Craft" },
  { id: "tech", label: "Stack" },
  { id: "blog", label: "Trust" },
  { id: "contact", label: "Talk" },
];

const PROJECTS_SECTIONS: Section[] = [
  { id: "hero", label: "Portfolio" },
  { id: "filter", label: "Filter" },
  { id: "projects-grid", label: "Works" },
];

const CONTACT_SECTIONS: Section[] = [
  { id: "hero", label: "Contact" },
  { id: "form", label: "Form" },
  { id: "info", label: "Info" },
];

const SERVICES_SECTIONS: Section[] = [
  { id: "hero", label: "Services" },
  { id: "services", label: "Offerings" },
];

const EXPERIENCE_SECTIONS: Section[] = [
  { id: "hero", label: "Experience" },
  { id: "experience", label: "Highlights" },
];

const PRIVACY_SECTIONS: Section[] = [
  { id: "hero", label: "Privacy" },
  { id: "content", label: "Policy" },
];

const TERMS_SECTIONS: Section[] = [
  { id: "hero", label: "Terms" },
  { id: "content", label: "Agreement" },
];

const COOKIES_SECTIONS: Section[] = [
  { id: "hero", label: "Cookies" },
  { id: "content", label: "Policy" },
];

const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com",
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.42-1.305.762-1.605-2.665-.302-5.467-1.332-5.467-5.93 0-1.311.469-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.371.815 1.103.815 2.222 0 1.605-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.627-5.373-12-12-12z"
      />
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    path: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@owlsey.com",
    path: (
      <path d="M1.5 4.5h21A1.5 1.5 0 0124 6v12a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 18V6a1.5 1.5 0 011.5-1.5zM12 13.5L1.5 6.75v.045L12 13.875l10.5-7.08V6.75L12 13.5z" />
    ),
  },
];

interface RightSidebarProps {
  page?: "home" | "projects" | "contact" | "services" | "experience" | "privacy" | "terms" | "cookies";
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ page = "home" }) => {
  const SECTIONS = page === "projects" ? PROJECTS_SECTIONS : page === "contact" ? CONTACT_SECTIONS : page === "services" ? SERVICES_SECTIONS : page === "experience" ? EXPERIENCE_SECTIONS : page === "privacy" ? PRIVACY_SECTIONS : page === "terms" ? TERMS_SECTIONS : page === "cookies" ? COOKIES_SECTIONS : HOME_SECTIONS;

  // Desktop-only component. On viewports below lg (1024px), skip the entire
  // mount + scroll listeners — CSS would have hidden it anyway, but the
  // listeners and DOM measurements would still run.
  //
  // SSR/initial render defaults to true so the sidebar's HTML is present
  // from the first paint (the parent CSS uses `lg:flex hidden` to gate
  // visibility on viewport width). On client mount we sync to the real
  // matchMedia value — mobile users unmount, desktop users stay.
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  // Each marker's vertical position on the rail (0..1 fraction of doc height)
  const [markerPositions, setMarkerPositions] = useState<number[]>(
    () => SECTIONS.map((_, i) => i / Math.max(1, SECTIONS.length - 1))
  );

  const fillRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  // Cached section geometry — populated once by measure(), read by the
  // scroll handler so we never call offsetTop per scroll event (forced
  // layout). Refreshed on resize and after fonts settle.
  const offsetsRef = useRef<{ id: string; top: number; mid: number }[]>([]);
  const docMaxRef = useRef<number>(0);

  // Measure real section offsets so markers map to actual page geometry
  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      docMaxRef.current = max;
      const geom = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: 0, mid: 0 };
        return {
          id: s.id,
          top: el.offsetTop,
          mid: el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2,
        };
      });
      offsetsRef.current = geom;
      setMarkerPositions(
        geom.map((g) => Math.max(0, Math.min(1, g.mid / max))),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure after fonts/images settle
    const t = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [SECTIONS, isDesktop]);

  // Track scroll progress + active section — rAF-throttled, uses cached
  // offsets so the scroll path does zero layout work.
  useEffect(() => {
    if (!isDesktop) return;
    let rafId = 0;
    let scheduled = false;

    const flush = () => {
      scheduled = false;
      const max = docMaxRef.current;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      setProgress(p);
      setShowTop(y > window.innerHeight * 0.8);

      const probe = y + window.innerHeight / 3;
      const offs = offsetsRef.current;
      let current = SECTIONS[0]?.id || "home";
      for (const o of offs) {
        if (o.top <= probe) current = o.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [SECTIONS, isDesktop]);

  // GSAP transitions: rail fill, percentage tween, label change
  useEffect(() => {
    if (!isDesktop) return;
    const gsap = ensureGsap();
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        height: `${progress * 100}%`,
        duration: 0.5,
        ease: "power3.out",
      });
    }
    if (pctRef.current) {
      const obj = { v: Number(pctRef.current.dataset.v ?? 0) };
      const target = Math.round(progress * 100);
      gsap.to(obj, {
        v: target,
        duration: 0.5,
        ease: "power3.out",
        onUpdate: () => {
          if (pctRef.current) {
            const r = Math.round(obj.v);
            pctRef.current.textContent = `${String(r).padStart(2, "0")}`;
            pctRef.current.dataset.v = String(r);
          }
        },
      });
    }
  }, [progress, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const gsap = ensureGsap();
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 14, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }
      );
    }
  }, [activeId, isDesktop]);

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = SECTIONS.find((s) => s.id === activeId)?.label ?? "Hero";
  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);

  // Below lg, skip the entire tree. CSS would have hidden it but the JS would
  // still mount and listen — this short-circuits both.
  if (!isDesktop) return null;

  return (
    <aside
      className="fixed inset-y-0 right-0 z-30 hidden flex-col bg-[color:var(--surface-base)] lg:flex"
      style={{ width: "var(--sidebar-w)" }}
    >
      {/* Subtle monochrome glow at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-40 w-full"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(124,102,255,0.18), transparent 60%)",
        }}
      />

      

      {/* ── MIDDLE: Progress rail + section markers + live label ── */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Live label (top of middle band) */}
        <div className="border-b border-[color:var(--line-subtle)] px-2 py-5">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
              now
            </span>
            <span
              ref={labelRef}
              className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-strong)] [writing-mode:vertical-rl] rotate-180"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              {activeLabel}
            </span>
          </div>
        </div>

        {/* Rail with markers */}
        <div ref={railRef} className="relative flex flex-1 justify-center py-6">
          {/* Background rail */}
          <div className="relative h-full w-px bg-white/10">
            {/* Fill — softer, less glow */}
            <span
              ref={fillRef}
              className="absolute left-0 top-0 w-px bg-linear-to-b from-white/30 via-[#5d45ff]/55 to-[#5d45ff]/40"
              style={{ height: "0%" }}
            />

            {/* Travelling indicator — a quiet horizontal tick instead of a glowing orb */}
            <span
              aria-hidden
              className="absolute left-1/2 z-10 h-px w-2 -translate-x-1/2 bg-white/70"
              style={{ top: `${progress * 100}%` }}
            />

            {/* Section markers — positioned by actual page geometry */}
            {SECTIONS.map((s, i) => {
              const pos = (markerPositions[i] ?? 0) * 100;
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => jump(e, s.id)}
                  className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${pos}%` }}
                  title={s.label}
                >
                  <span
                    className={`block h-1.5 w-1.5 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "h-2 w-2 border-[color:var(--text-strong)] bg-[#5d45ff]/60"
                        : isPast
                        ? "border-[#5d45ff]/35 bg-[#5d45ff]/25"
                        : "border-[color:var(--line-strong)] bg-[color:var(--surface-base)] group-hover:border-[color:var(--text-strong)]"
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap border border-[color:var(--line-subtle)] bg-[color:var(--surface-deep)] px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[color:var(--text-body)] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Percentage */}
        <div className="border-t border-[color:var(--line-subtle)] px-2 py-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
              scroll
            </span>
            <div className="flex items-baseline gap-0.5 text-[color:var(--text-strong)]">
              <span
                ref={pctRef}
                data-v="0"
                className="text-[15px] leading-none tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-redaction)" }}
              >
                00
              </span>
              <span className="text-[9px] text-[color:var(--text-faint)]">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Socials + scroll-to-top ─────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-3 border-t border-[color:var(--line-subtle)] px-2 py-5">
        <span className="text-[8px] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
          social
        </span>
        <div className="flex flex-col gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex h-9 w-9 items-center justify-center border border-[color:var(--line-subtle)] bg-[color:var(--surface-panel)] text-[color:var(--text-muted)] transition-all duration-300 hover:border-[#5d45ff]/60 hover:text-[color:var(--text-strong)]"
              title={s.name}
              aria-label={s.name}
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(124,102,255,0.55), transparent 70%)",
                  filter: "blur(7px)",
                }}
              />
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                {s.path}
              </svg>
            </a>
          ))}
        </div>

        {/* Scroll-to-top — fades in past 60% viewport */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`mt-2 flex h-9 w-9 items-center justify-center border border-[color:var(--line-strong)] bg-[linear-gradient(135deg,#5d45ff,#7c66ff)] text-white shadow-[0_0_15px_rgba(93,69,255,0.35)] transition-all duration-500 ${
            showTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
