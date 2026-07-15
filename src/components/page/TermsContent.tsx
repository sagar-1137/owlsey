"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ensureGsap } from "@/lib/gsap";
import { Navbar } from "@/components/layout/Navbar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer } from "@/components/layout/Footer";

export default function TermsContent() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
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
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      const sections = content.querySelectorAll("[data-content-section]");

      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, content);

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
        <RightSidebar page="terms" />
        <main>
          {/* Hero Section */}
          <section
            ref={heroRef}
            id="hero"
            className="editorial-grid border-b border-white/10"
          >
            <aside className="hidden md:block border-b border-white/10 px-[var(--pad-x)] py-6 md:border-b-0 md:border-r md:py-8">
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                Legal
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
                  Terms of Service
                </h1>

                <p
                  data-hero-desc
                  className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
                >
                  Last updated: June 15, 2026
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section
            ref={contentRef}
            id="content"
            className="editorial-grid border-b border-white/10"
          >
            <aside className="hidden md:block border-b border-white/10 px-[var(--pad-x)] py-6 md:border-b-0 md:border-r md:py-8">
              <div className="text-sm uppercase tracking-[0.2em] text-white/50 mb-8">
                Contents
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
                  Agreement Details
                </div>
              </div>

              <div className="px-[var(--pad-x)] py-10 md:py-12 space-y-12">
                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    By accessing and using Owlsey&apos;s services, you accept and
                    agree to be bound by the terms and provisions of this
                    agreement. If you do not agree to abide by these terms, please
                    do not use our services.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    2. Services
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    Owlsey provides software development, consulting, and related
                    services as described in our service agreements. We reserve the
                    right to modify, suspend, or discontinue any service at any
                    time without prior notice.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    3. User Responsibilities
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your
                    account information and for all activities that occur under your
                    account. You agree to notify us immediately of any
                    unauthorized use of your account.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    4. Intellectual Property
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    All content, features, and functionality of our services are
                    owned by Owlsey and are protected by international copyright,
                    trademark, and other intellectual property laws.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    5. Limitation of Liability
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    To the fullest extent permitted by law, Owlsey shall not be
                    liable for any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    6. Governing Law
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    These terms shall be governed by and construed in accordance
                    with the laws of India, without regard to its conflict of law
                    provisions.
                  </p>
                </div>

                <div data-content-section>
                  <h2
                    className="text-2xl font-bold mb-4 text-white"
                    style={{ fontFamily: "var(--font-redaction)" }}
                  >
                    7. Contact Us
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    If you have any questions about these Terms of Service, please
                    contact us at hello@owlsey.com
                  </p>
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
