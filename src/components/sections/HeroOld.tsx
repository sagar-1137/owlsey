"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { OwlseyMainGraphic } from "./OwlseyMainGraphic";
import { MagneticGsap } from "@/components/common/MagneticGsap";
import { Viewfinder } from "@/components/common/Viewfinder";

const partners = [
  {
    name: "Northstar",
    description: "Operational software for teams that need cleaner decision-making and less friction.",
  },
  {
    name: "Meridian",
    description: "Digital products designed to simplify execution without flattening brand or ambition.",
  },
  {
    name: "Fieldroom",
    description: "Internal systems that hold up under real pressure, real users, and messy workflows.",
  },
];

export const HeroOld: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const partnerContentRef = useRef<HTMLDivElement>(null);
  const [currentPartner, setCurrentPartner] = React.useState(0);
  const prevPartnerRef = useRef<number>(0);

  useEffect(() => {
    const gsap = ensureGsap();
    const root = heroRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const headlineWords = root.querySelectorAll<HTMLElement>("[data-hero-word]");
      const gridLines = root.querySelectorAll<HTMLElement>("[data-grid-line]");
      const gridDots = root.querySelectorAll<HTMLElement>("[data-grid-dot]");

      // CSS pre-hides these elements so they don't flash visible before this
      // code runs. For elements with transforms we still call gsap.set to
      // pin GSAP's internal cache to the same starting values — otherwise
      // GSAP would interpolate from `transform: none` (its assumed start)
      // and the tween would never reach 0 because the CSS rule keeps the
      // element at translateY(110%).
      if (headlineWords.length) {
        gsap.set(headlineWords, { y: 80, rotate: 3, opacity: 0 });
      }
      if (gridLines.length) {
        gsap.set(gridLines, { scale: 0, opacity: 0 });
        gsap.set(gridDots, { scale: 0, opacity: 0 });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (gridLines.length) {
        tl.to(
          gridLines,
          { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power2.out" },
          0
        ).to(
          gridDots,
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(2)" },
          0.3
        );
      }

      tl.to(
        root.querySelectorAll("[data-intro]"),
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
        0.15
      );

      if (headlineWords.length) {
        tl.to(
          headlineWords,
          { y: 0, opacity: 1, rotate: 0, duration: 1.05, stagger: 0.08, ease: "expo.out" },
          0.15
        );
      }

      const underline = root.querySelector<SVGPathElement>("[data-hero-underline]");
      if (underline) {
        const len = underline.getTotalLength();
        gsap.set(underline, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(
          underline,
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" },
          0.85
        );
      }

      // Eyebrow tick draws in (initial scaleX: 0 set in CSS)
      const tick = root.querySelector<HTMLElement>("[data-hero-eyebrow-tick]");
      if (tick) {
        tl.to(tick, { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.25);
      }

      // Pillars: reveal + count-up. Pillars sit inside the initial viewport,
      // so we run on mount via the main timeline rather than via ScrollTrigger.
      const pillars = root.querySelectorAll<HTMLElement>("[data-hero-pillar]");
      if (pillars.length) {
        tl.to(
          pillars,
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          0.65
        );

        pillars.forEach((p, i) => {
          const num = p.querySelector<HTMLElement>("[data-hero-pillar-num]");
          if (!num || num.dataset.counted === "1") return;
          num.dataset.counted = "1";
          const target = Number(num.dataset.target ?? 0);
          const suffix = num.dataset.suffix ?? "";
          
          // Reset value to 0 on client side before starting GSAP animation to avoid hydration mismatch
          num.textContent = `0${suffix}`;
          
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: target,
              duration: 1.4,
              ease: "power3.out",
              onUpdate: () => {
                num.textContent = `${Math.round(obj.v)}${suffix}`;
              },
              onComplete: () => {
                num.textContent = `${target}${suffix}`;
              },
            },
            0.8 + i * 0.1
          );
        });
      }


      // Parallax planes move slower than the scroll to create weight
      gsap.to(root.querySelectorAll("[data-hero-parallax]"), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === root)
        .forEach((t) => t.kill());
    };
  }, []);

  // Auto-cycle partners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animate partner change
  useEffect(() => {
    const slides = heroRef.current?.querySelectorAll<HTMLElement>("[data-partner-slide]");
    if (!slides || slides.length === 0) return;

    const prevIndex = prevPartnerRef.current;
    if (prevIndex === currentPartner) return;

    const gsap = ensureGsap();
    const inSlide = slides[currentPartner];

    // Force-reset EVERY non-active slide so we never accumulate ghost overlap
    slides.forEach((s, i) => {
      if (i !== currentPartner) {
        gsap.killTweensOf(s);
        gsap.set(s, { opacity: 0, y: 18, filter: "blur(4px)", pointerEvents: "none" });
      }
    });

    if (inSlide) {
      gsap.killTweensOf(inSlide);
      inSlide.style.pointerEvents = "auto";
      gsap.fromTo(
        inSlide,
        { opacity: 0, y: 22, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "expo.out" }
      );
    }

    prevPartnerRef.current = currentPartner;
  }, [currentPartner]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative border-b border-[color:var(--line-subtle)]"
    >
      <Viewfinder />

      {/* 8-Part Technical Blueprint Grid Overlay (Inspired by DB Longbow) */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* Horizontal Line */}
        <div
          data-grid-line="horizontal"
          className="absolute top-1/2 left-0 h-px w-full origin-left bg-white/[0.03]"
        />

        {/* Vertical Lines */}
        <div
          data-grid-line="vertical"
          className="absolute top-0 left-1/4 h-full w-px origin-top bg-white/[0.03]"
        />
        <div
          data-grid-line="vertical"
          className="absolute top-0 left-1/2 h-full w-px origin-top bg-white/[0.03]"
        />
        <div
          data-grid-line="vertical"
          className="absolute top-0 left-3/4 h-full w-px origin-top bg-white/[0.03]"
        />

        {/* Outer and Inner Grid Dot Markers */}
        <div data-grid-dot className="absolute top-0 left-1/4 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
        <div data-grid-dot className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
        <div data-grid-dot className="absolute top-0 left-3/4 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />

        {/* Center Intersections with crosshairs */}
        <div data-grid-dot className="absolute top-1/2 left-1/4 h-3 w-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="absolute h-3 w-px bg-white/10" />
          <span className="absolute h-px w-3 bg-white/10" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>
        <div data-grid-dot className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="absolute h-3 w-px bg-white/10" />
          <span className="absolute h-px w-3 bg-white/10" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>
        <div data-grid-dot className="absolute top-1/2 left-3/4 h-3 w-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="absolute h-3 w-px bg-white/10" />
          <span className="absolute h-px w-3 bg-white/10" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>

        {/* Bottom Boundaries */}
        <div data-grid-dot className="absolute bottom-0 left-1/4 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/20" />
        <div data-grid-dot className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/20" />
        <div data-grid-dot className="absolute bottom-0 left-3/4 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/20" />
      </div>

      <div className="px-3 pb-4 pt-3 md:px-5 md:pb-5 lg:px-6 lg:pb-6">
        <div className="display-grid border-l border-t border-[color:var(--line-subtle)]">
          <div className="display-tile md:col-span-2 lg:col-span-2 lg:row-span-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.22))]">
            <div className="flex items-start justify-between gap-4">
              <div data-intro className="display-kicker text-[color:var(--text-body)]">Owlsey / system architecture</div>
              <div className="hidden gap-3 lg:flex">
                {["01", "02", "03"].map((item) => (
                  <span key={item} className="display-kicker text-[color:var(--text-faint)]">{item}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex h-[calc(var(--display-row)*2.2)] items-center justify-center border border-[color:var(--line-subtle)] bg-white/30 lg:h-[calc(var(--display-row)*2.6)]">
              <div className="w-full max-w-[520px]">
                <OwlseyMainGraphic />
              </div>
            </div>

            <div className="mt-5 grid gap-0 border-t border-[color:var(--line-subtle)] pt-5 lg:grid-cols-[1fr_160px]">
              <div>
                <div data-intro className="display-kicker text-[color:var(--text-faint)]">Featured partner</div>
                <div
                  ref={partnerContentRef}
                  className="relative mt-4 min-h-[112px] w-full overflow-hidden"
                  style={{ transform: "translateZ(0)", isolation: "isolate" }}
                >
                  {partners.map((partner, index) => {
                    const isInitialActive = index === 0;
                    return (
                      <div
                        key={partner.name}
                        data-partner-slide={index}
                        className="absolute inset-x-0 top-0 flex flex-col"
                        style={{
                          opacity: isInitialActive ? 1 : 0,
                          transform: isInitialActive ? "translateY(0px)" : "translateY(15px)",
                          pointerEvents: isInitialActive ? "auto" : "none",
                        }}
                      >
                        <div className="text-[1.9rem] leading-[0.95] text-[color:var(--text-strong)]" style={{ fontFamily: "var(--font-display)" }}>
                          {partner.name}
                        </div>
                        <p className="mt-3 max-w-[28ch] text-sm leading-6 text-[color:var(--text-muted)]">
                          {partner.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div data-intro className="mt-4 flex items-center gap-2.5">
                  {partners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPartner(index)}
                      className={`h-2 w-2 transition-all duration-300 ${
                        currentPartner === index
                          ? "scale-125 bg-[color:var(--accent-primary)]"
                          : "scale-100 bg-[color:var(--text-ghost)] hover:bg-[color:var(--text-dim)]"
                      }`}
                      aria-label={`Go to partner ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 border-l border-[color:var(--line-subtle)] pl-4 lg:mt-0">
                <div className="display-kicker text-[color:var(--text-faint)]">Launch systems</div>
                <div className="mt-5 modular-number text-[3rem] text-[color:var(--text-strong)]">06</div>
                <div className="mt-2 display-kicker text-[color:var(--text-faint)]">weeks to release cadence</div>
              </div>
            </div>
          </div>

          <div className="display-tile md:col-span-2 lg:col-span-2 lg:row-span-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.16))]">
            <div data-intro className="display-kicker text-[color:var(--text-dim)]">Strategy // systems // product delivery</div>
            <h1
              data-hero-headline
              id="services"
              className="mt-4 modular-display text-[clamp(3.6rem,6.5vw,6.8rem)] text-[color:var(--text-strong)]"
            >
              <span data-hero-word className="inline-block">Digital</span>
              <br />
              <span data-hero-word className="inline-block text-[color:var(--text-muted)]">infrastructure</span>
              <br />
              <span data-hero-word className="inline-block">for modern</span>
              <br />
              <span data-hero-word className="inline-block">business.</span>
            </h1>

            <div className="mt-8 grid gap-0 border-t border-[color:var(--line-subtle)] pt-5 lg:grid-cols-[minmax(0,1fr)_210px]">
              <div>
                <p
                  data-intro
                  className="max-w-[28ch] font-mono text-[11px] uppercase tracking-[0.16em] leading-[1.8] text-[color:var(--text-muted)]"
                >
                  We design product systems, internal workflows, and operating software that reduce drag and increase execution clarity.
                </p>
                <div data-intro className="mt-6 flex flex-wrap items-center gap-3">
                  <MagneticGsap
                    as="a"
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-[color:var(--text-strong)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:opacity-80"
                  >
                    <span>Start project</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </MagneticGsap>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-3 border border-[color:var(--line-strong)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-body)] transition-all duration-300 hover:bg-white/24"
                  >
                    <span>See selected work</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <div className="mt-6 border-t border-[color:var(--line-subtle)] pt-4 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <div data-intro className="display-kicker text-[color:var(--text-faint)]">Ops snapshot</div>
                <div className="mt-4 space-y-4">
                  {[
                    ["01", "Product systems"],
                    ["02", "Internal workflows"],
                    ["03", "Delivery velocity"],
                  ].map(([index, label]) => (
                    <div key={index} className="flex items-center justify-between gap-4 border-b border-[color:var(--line-subtle)] pb-3 last:border-b-0 last:pb-0">
                      <span className="display-kicker text-[color:var(--text-faint)]">{index}</span>
                      <span className="display-kicker text-right text-[color:var(--text-body)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {[
            { value: "6", suffix: "", label: "weeks to first release" },
            { value: "3x", suffix: "", label: "cleaner operational visibility" },
            { value: "24h", suffix: "", label: "live business response windows" },
          ].map((item) => (
            <div
              key={item.label}
              data-hero-pillar
              className="display-tile bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.08))]"
            >
              <div className="flex items-center justify-between">
                <span className="display-kicker text-[color:var(--text-faint)]">Signal</span>
                <span className="display-kicker text-[color:var(--text-faint)]">Live</span>
              </div>
              <div
                data-hero-pillar-num
                data-target={Number(item.value.replace(/\D/g, ""))}
                data-suffix={item.value.replace(/\d/g, "")}
                className="mt-6 modular-number text-[clamp(2.2rem,4vw,3.2rem)] text-[color:var(--text-strong)]"
              >
                {item.value}
              </div>
              <p className="mt-4 max-w-[16ch] text-[10px] uppercase tracking-[0.14em] leading-5 text-[color:var(--text-muted)]">
                {item.label}
              </p>
            </div>
          ))}

          <div className="display-tile display-tile-dark md:col-span-2 lg:col-span-1">
            <div className="display-kicker text-white/58">Built for serious operators</div>
            <div className="mt-6 modular-display text-[clamp(2.4rem,4vw,3.6rem)] text-white">
              Systems
              <br />
              before
              <br />
              noise.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
