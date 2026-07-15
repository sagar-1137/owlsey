"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ensureGsap } from "@/lib/gsap";
import { Navbar } from "@/components/layout/Navbar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";

const experience = [
  {
    title: "Clarity",
    text: "We translate business intent into a clean technical shape before coding starts.",
    metric: "2 weeks",
    metricLabel: "discovery → blueprint",
  },
  {
    title: "Structure",
    text: "We choose architecture that can survive scale, team growth, and product evolution.",
    metric: "0 rewrites",
    metricLabel: "in 3 years of delivery",
  },
  {
    title: "Results",
    text: "We stay accountable post-launch through support, iteration, and performance refinement.",
    metric: "<24h",
    metricLabel: "production response SLA",
  },
];

export default function ExperienceContent() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        hero.querySelector("[data-hero-title]"),
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          hero.querySelector("[data-hero-desc]"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const gsap = ensureGsap();
    const exp = experienceRef.current;
    if (!exp) return;

    const ctx = gsap.context(() => {
      const cells = exp.querySelectorAll<HTMLElement>("[data-exp-cell]");
      gsap.set(cells, { opacity: 0, y: 36 });

      gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.3,
      });

      cells.forEach((el) => {
        const underline = el.querySelector<HTMLElement>("[data-exp-underline]");
        if (underline) {
          gsap.fromTo(
            underline,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.9, ease: "expo.out", delay: 0.65 }
          );
        }
      });
    }, exp);

    return () => ctx.revert();
  }, []);

  // Mouse movement glow effect
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveHandler = (e: MouseEvent) => {
      const rect = glow.getBoundingClientRect();
      glow.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      glow.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    glow.addEventListener("mousemove", moveHandler);
    return () => glow.removeEventListener("mousemove", moveHandler);
  }, []);

  const getThemeGradient = () => {
    switch (theme) {
      case "sunset":
        return "from-orange-500/20 via-red-500/20 to-pink-500/20";
      case "forest":
        return "from-green-500/20 via-emerald-500/20 to-teal-500/20";
      case "arctic-winter":
        return "from-blue-500/20 via-cyan-500/20 to-sky-500/20";
      case "como":
        return "from-blue-600/20 via-indigo-500/20 to-purple-500/20";
      case "pumpkin":
        return "from-orange-600/20 via-amber-500/20 to-yellow-500/20";
      default:
        return "from-white/12 via-white/6 to-transparent";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full overflow-x-clip border-y border-[color:var(--line-subtle)] bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)] lg:border-x">
        <Navbar />
        <RightSidebar page="experience" />
        <main>
          {/* Hero Section */}
          <section
            ref={heroRef}
            id="hero"
            className="editorial-grid border-b border-white/10"
          >
            <aside className="hidden md:block border-b border-white/10 px-[var(--pad-x)] py-6 md:border-b-0 md:border-r md:py-8">
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                Experience
              </div>
            </aside>

            <div className="relative overflow-hidden lg:border-r lg:border-white/10">
              <div
                className={`absolute inset-0 bg-linear-to-br ${getThemeGradient()} opacity-30`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,102,255,0.15),transparent_50%)]" />

              <div className="relative px-[var(--pad-x)] py-10 md:py-12 lg:py-16">
                <h1
                  data-hero-title
                  className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-redaction)" }}
                >
                  Our Experience
                </h1>

                <p
                  data-hero-desc
                  className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
                >
                  Quiet. Precise. Durable. Intentional systems, dependable delivery,
                  and practical product thinking.
                </p>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section
            ref={experienceRef}
            id="experience"
            className="editorial-grid border-b border-white/10"
          >
            <aside className="hidden md:block border-b border-white/10 px-[var(--pad-x)] py-6 md:border-b-0 md:border-r md:py-8">
              <div className="text-sm uppercase tracking-[0.2em] text-white/50 mb-8">
                Highlights
              </div>
            </aside>

            <div
              ref={glowRef}
              data-hero-glow
              className="border-r border-white/10 relative"
              style={{
                backgroundImage:
                  "radial-gradient(420px circle at var(--mx, -200px) var(--my, -200px), rgba(124,102,255,0.04), transparent 55%)",
              }}
            >
              <div className="border-b border-white/10 px-[var(--pad-x)] py-6 md:py-8">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  What makes us different
                </div>
              </div>

              <div>
                <div className="grid xl:grid-cols-3">
                  {experience.map((item, index) => (
                    <article
                      key={item.title}
                      data-exp-cell
                      className={`group relative flex min-h-[340px] cursor-pointer flex-col overflow-hidden px-8 py-10 transition-all duration-300 hover:bg-white/[0.015] ${
                        index < experience.length - 1
                          ? "xl:border-r xl:border-white/10"
                          : ""
                      } ${index < 2 ? "border-b border-white/10 xl:border-b-0" : ""}`}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(380px circle at 30% 0%, rgba(124,102,255,0.08), transparent 60%)",
                        }}
                      />

                      <div className="flex items-center gap-3">
                        <span
                          className="text-[28px] leading-none tracking-[-0.05em] text-white/30 transition-colors duration-300 group-hover:text-[#7c66ff]"
                          style={{ fontFamily: "var(--font-redaction)" }}
                        >
                          0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#5d45ff]/40" />
                      </div>

                      <div
                        className="mt-7 text-[42px] leading-[0.96] tracking-[-0.06em] text-white transition-colors duration-300 group-hover:text-[color:var(--accent-strong)]"
                        style={{ fontFamily: "var(--font-redaction)" }}
                      >
                        {item.title}
                      </div>
                      <span
                        data-exp-underline
                        className="mt-3 block h-px w-20 bg-gradient-to-r from-[#7c66ff] via-[#5d45ff] to-transparent"
                      />
                      <p className="mt-6 max-w-[300px] text-base leading-7 text-white/58 transition-colors duration-300 group-hover:text-white/72">
                        {item.text}
                      </p>

                      {/* Supporting metric — gives each card a measurable anchor */}
                      <div className="mt-auto pt-8">
                        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
                          <div>
                            <div
                              className="text-[24px] leading-none tracking-[-0.04em] text-white"
                              style={{ fontFamily: "var(--font-redaction)" }}
                            >
                              {item.metric}
                            </div>
                            <div className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-white/40">
                              {item.metricLabel}
                            </div>
                          </div>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5d45ff]/60 transition-colors duration-300 group-hover:bg-[#7c66ff]" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
