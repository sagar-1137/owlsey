"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Globe, Mail, Target } from "lucide-react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_CONFIG } from "@/lib/motionConfig";
import { GridJunctions } from "@/components/common/GridJunctions";

const FOOTER_LINKS = [
  { label: "What we build", href: "/services" },
  { label: "Selected systems", href: "/projects" },
  { label: "How we deliver", href: "/experience" },
  { label: "Why Owlsey", href: "/" },
  { label: "Open a brief", href: "/contact" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

/* Brand glyphs are inline paths — lucide dropped its brand set, and the right
   rail already renders them this way. Kept in the same order as the rail. */
const FOOTER_SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "GitHub",
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
    label: "Email",
    href: "mailto:hello@owlsey.com",
    path: (
      <path d="M1.5 4.5h21A1.5 1.5 0 0124 6v12a1.5 1.5 0 01-1.5 1.5h-21A1.5 1.5 0 010 18V6a1.5 1.5 0 011.5-1.5zM12 13.5L1.5 6.75v.045L12 13.875l10.5-7.08V6.75L12 13.5z" />
    ),
  },
];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  useEffect(() => {
    const root = footerRef.current;
    if (!root || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // PHASE 1: Main CTA panel reveal with clip-path
      const ctaPanel = root.querySelector(".footer-cta") as HTMLElement;
      if (ctaPanel) {
        // Animate clip-path inset to reveal panel
        gsap.from(ctaPanel, {
          clipPath: "inset(100% 0 0 0)",
          duration: MOTION_CONFIG.timing.primaryReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            markers: MOTION_CONFIG.debug,
            once: true,
          },
        });

        // Animate "02 / Start" label first
        const ctaLabel = ctaPanel.querySelector(".display-kicker:last-of-type");
        if (ctaLabel) {
          gsap.from(ctaLabel, {
            opacity: 0,
            yPercent: 10,
            duration: 0.6,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              once: true,
            },
          });
        }

        // Animate heading next
        const ctaHeading = ctaPanel.querySelector(".modular-display");
        if (ctaHeading) {
          gsap.from(ctaHeading, {
            yPercent: 20,
            opacity: 0,
            duration: MOTION_CONFIG.timing.primaryReveal,
            ease: MOTION_CONFIG.easing.revealOutStrong,
            scrollTrigger: {
              trigger: root,
              start: "top 65%",
              once: true,
            },
          });
        }

        // Animate rule and button last
        const ctaRule = ctaPanel.querySelector(".footer-cta-rule");
        if (ctaRule) {
          gsap.from(ctaRule, {
            opacity: 0,
            yPercent: 15,
            duration: MOTION_CONFIG.timing.supportingReveal,
            ease: MOTION_CONFIG.easing.revealOut,
            scrollTrigger: {
              trigger: root,
              start: "top 60%",
              once: true,
            },
          });
        }
      }

      // PHASE 2: Footer navigation rows stagger
      const navLinks = root.querySelectorAll(".footer-nav a");
      if (navLinks.length > 0) {
        gsap.from(navLinks, {
          opacity: 0,
          xPercent: -8,
          duration: MOTION_CONFIG.timing.supportingReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          stagger: MOTION_CONFIG.stagger.minimal,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            markers: MOTION_CONFIG.debug,
            once: true,
          },
        });

        // Animate indices before labels
        const indices = root.querySelectorAll(".footer-link-index");
        if (indices.length > 0) {
          gsap.from(indices, {
            opacity: 0,
            duration: 0.5,
            ease: MOTION_CONFIG.easing.revealOut,
            stagger: MOTION_CONFIG.stagger.minimal,
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              once: true,
            },
          });
        }
      }

      // PHASE 3: Divider lines animation
      const dividerLines = root.querySelectorAll("[data-footer-cell] .border-t, [data-footer-cell] .border-b");
      if (dividerLines.length > 0) {
        gsap.from(dividerLines, {
          scaleX: 0,
          transformOrigin: "left",
          duration: MOTION_CONFIG.timing.supportingReveal,
          ease: MOTION_CONFIG.easing.revealOut,
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
            markers: MOTION_CONFIG.debug,
          },
        });
      }

      // PHASE 4: General cell reveals (fallback for remaining cells)
      const cells = root.querySelectorAll<HTMLElement>("[data-footer-cell]:not([data-motion-static])");
      const revealable = (cell: Element) =>
        Array.from(cell.children).filter(
          (child) =>
            !child.classList.contains("footer-glow") &&
            !child.classList.contains("footer-dots") &&
            !child.classList.contains("border-t") &&
            !child.classList.contains("border-b")
        );
      const content = Array.from(cells).flatMap(revealable);
      gsap.set(content, { opacity: 0, y: 16, filter: "blur(2px)" });
      ScrollTrigger.batch(cells, {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          const targets = elements.flatMap(revealable);
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: MOTION_CONFIG.timing.supportingReveal,
            stagger: MOTION_CONFIG.stagger.minimal,
            ease: MOTION_CONFIG.easing.revealOut,
            clearProps: "transform,filter",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer ref={footerRef} id="contact" className="chapter-obsidian relative w-full" data-chapter="Contact" aria-labelledby="footer-title">
      <div className="modular-grid footer-grid has-complete-junctions">
        <GridJunctions />
        <div data-footer-cell className="modular-box footer-primary footer-lead flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">01 / Align</p>
          <div>
            <span className="ring-icon mb-8" aria-hidden="true">
              <Target className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <h2 id="footer-title" className="modular-display max-w-[8ch] text-[color:var(--text-strong)]">
              Bring the
              <br />
              requirement<span className="accent-stop">.</span>
            </h2>
            <p className="mt-6 max-w-[34ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              Custom software shaped around your operation, preferred technology, and room to evolve.
            </p>
          </div>
        </div>

        <div data-footer-cell data-motion-static aria-hidden="true" className="modular-box footer-primary footer-breathing" />

        <Link href="/contact" data-cursor="START" data-motion-link data-no-card-motion data-footer-cell className="modular-box footer-primary footer-cta group flex flex-col justify-between">
          <span className="footer-glow" aria-hidden="true" />
          <span className="footer-dots footer-dots--tr" aria-hidden="true" />
          <div className="flex items-center justify-between">
            <p className="display-kicker text-[color:var(--text-faint)]">Project enquiry</p>
            <span className="display-kicker text-[color:var(--text-dim)]">02 / Start</span>
          </div>
          <div>
            <p className="modular-display text-[clamp(3.2rem,5.4vw,5.8rem)] text-[color:var(--text-strong)]">
              Open
              <br />
              the brief<span className="accent-stop">.</span>
            </p>
            <div className="footer-cta-rule mt-8 flex items-end justify-between border-t pt-4">
              <span data-motion-label className="display-kicker text-[color:var(--text-muted)]">Tell us what you need</span>
              <span className="footer-arrow-button" aria-hidden="true">
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </Link>

        <div data-footer-cell className="modular-box footer-directory-cell footer-brand flex flex-col justify-between">
          <Link href="/" data-cursor="HOME" className="inline-flex w-fit transition-opacity hover:opacity-65" aria-label="Owlsey home">
            <Image src="/logos/owlsey_horizontal.svg" alt="Owlsey" width={154} height={38} className="owlsey-logo-on-dark h-auto w-36" />
          </Link>
          <div>
            <p className="max-w-[30ch] text-sm leading-6 text-[color:var(--text-muted)]">
              We build custom software solutions that help businesses move faster, operate smarter, and scale with confidence.
            </p>
            <ul className="footer-socials mt-8 border-t border-[color:var(--line-strong)] pt-6">
              {FOOTER_SOCIALS.map(({ label, href, path }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    data-cursor="VIEW"
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      {path}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-footer-cell className="modular-box footer-directory-cell footer-nav flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-faint)]">Explore</p>
          <nav className="border-t border-[color:var(--line-strong)]" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link, index) => (
              <Link key={link.label} href={link.href} data-cursor="VIEW" data-motion-link className="group flex items-center justify-between border-b border-[color:var(--line-subtle)] py-2.5 text-sm text-[color:var(--text-muted)] transition-colors last:border-b-0 hover:text-[color:var(--text-strong)]">
                <span className="flex items-center gap-3">
                  <span className="footer-link-index font-mono text-[8px] tracking-[0.16em]">0{index + 1}</span>
                  <span data-motion-label>{link.label}</span>
                </span>
                <ArrowUpRight className="h-3 w-3 opacity-70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        <div data-footer-cell className="modular-box footer-directory-cell footer-contact flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="display-kicker text-[color:var(--text-faint)]">Direct contact</p>
            <span className="footer-status inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">
              <span className="footer-status-dot" />
              Available
            </span>
          </div>
          <div className="footer-contact-rows">
            <div>
              <span className="footer-box-icon" aria-hidden="true">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
              <p className="mt-4 display-kicker text-[color:var(--text-faint)]">Email</p>
              <a
                href="mailto:hello@owlsey.com"
                data-cursor="MAIL"
                className="footer-contact-value group mt-1 flex items-center justify-between text-[color:var(--text-body)]"
              >
                <span>hello@owlsey.com</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            </div>
            <div className="border-t border-[color:var(--line-subtle)] pt-5">
              <span className="footer-box-icon" aria-hidden="true">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
              <p className="mt-4 display-kicker text-[color:var(--text-faint)]">Response time</p>
              <p className="footer-contact-value mt-1 text-[color:var(--text-body)]">Within one business day.</p>
            </div>
          </div>
        </div>

        <div data-footer-cell className="modular-box footer-directory-cell footer-response flex flex-col justify-between">
          <span className="footer-dots footer-dots--br" aria-hidden="true" />
          <div className="flex items-center justify-between">
            <p className="display-kicker text-[color:var(--text-faint)]">Working principle</p>
            <span className="footer-quote-mark" aria-hidden="true">&ldquo;</span>
          </div>
          <p className="footer-response-copy max-w-[16ch] text-[color:var(--text-body)]">
            A short brief is enough. We usually reply within one business day.
          </p>
        </div>

        <div data-footer-cell data-motion-static className="modular-box footer-utility md:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-4">
          <span className="flex flex-col gap-0.5">
            <span className="display-kicker text-[color:var(--text-muted)]">© {year} Owlsey</span>
            <span className="text-xs text-[color:var(--text-faint)]">All rights reserved.</span>
          </span>

          <span className="flex items-center gap-3">
            <span className="footer-box-icon" aria-hidden="true">
              <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="display-kicker text-[color:var(--text-muted)]">India / Worldwide</span>
              <span className="text-xs text-[color:var(--text-faint)]">We work across borders.</span>
            </span>
          </span>

          <div className="flex items-center gap-5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} data-cursor="VIEW" className="display-kicker text-[color:var(--text-faint)] transition-colors hover:text-[color:var(--text-strong)]">
                {link.label}
              </Link>
            ))}
          </div>

          <a href="#home" data-cursor="TOP" className="group flex items-center gap-3 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]">
            <span className="display-kicker">Back to top</span>
            <span className="footer-arrow-button footer-arrow-button--sm" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
