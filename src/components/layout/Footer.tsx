"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Clock, Globe, Mail, Target } from "lucide-react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";

const FOOTER_LINKS = [
  { label: "What we build", href: "/services" },
  { label: "Selected systems", href: "/projects" },
  { label: "How we deliver", href: "/experience" },
  { label: "About Owlsey", href: "/about" },
  { label: "Questions & answers", href: "/#faq" },
  { label: "Open a brief", href: "/contact" },
];

const FOOTER_LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

/* Only channels that really exist. LinkedIn / GitHub / X go back here (and in
   the Organization sameAs) once the real profiles are created. */
const FOOTER_SOCIALS = [
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

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const root = footerRef.current;
    const lightweightDevice = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (!root || prefersReducedMotion || lightweightDevice) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      // Fast snappy reveal for footer content
      const cells = root.querySelectorAll<HTMLElement>("[data-footer-cell]:not([data-motion-static])");
      const revealable = (cell: Element) =>
        Array.from(cell.children).filter(
          (child) =>
            !child.classList.contains("footer-glow") &&
            !child.classList.contains("footer-dots") &&
            !child.classList.contains("pattern") &&
            !child.classList.contains("border-t") &&
            !child.classList.contains("border-b")
        );
      const content = Array.from(cells).flatMap(revealable);
      
      gsap.set(content, { opacity: 0, y: 10 });

      ScrollTrigger.batch(cells, {
        start: "top 95%",
        once: true,
        onEnter: (elements) => {
          const targets = elements.flatMap(revealable);
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        },
      });

      const closingBrand = root.querySelector<HTMLElement>(".footer-embossed-brand__mark");
      if (closingBrand) {
        const settleSkew = gsap.quickTo(closingBrand, "skewX", {
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.fromTo(
          closingBrand,
          { yPercent: 5, scale: 0.92, transformOrigin: "center center" },
          {
            yPercent: -3,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.9,
              onUpdate: (self) => {
                settleSkew(gsap.utils.clamp(-5, 5, self.getVelocity() / -260));
              },
              onScrubComplete: () => settleSkew(0),
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer ref={footerRef} id="contact" className="chapter-obsidian relative w-full" data-chapter="Contact" aria-labelledby="footer-title">
      <div className="modular-grid footer-grid footer-grid--technical">
        <TechnicalGrid className="footer-technical-grid" />
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
            <p className="mt-6 max-w-[30ch] border-t border-[color:var(--line-strong)] pt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              Software shaped around your operation, and room to evolve.
            </p>
          </div>
        </div>

        <div data-footer-cell data-motion-static aria-hidden="true" className="modular-box footer-primary footer-breathing">
          <div className="footer-embossed-brand">
            <span className="footer-embossed-brand__mark">OWLSEY</span>
          </div>
        </div>

        <Link href="/contact" data-cursor="START" data-motion-link data-no-card-motion data-footer-cell className="modular-box footer-primary footer-cta group flex flex-col justify-between">
          <span className="footer-glow" aria-hidden="true" />
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
            <Image src="/logos/owlsey_generated_lockup.svg" alt="Owlsey" width={203} height={59} className="h-auto w-44" />
          </Link>
          <div>
            <p className="max-w-[26ch] text-sm leading-6 text-[color:var(--text-muted)]">
              Custom software for teams that move faster and scale with confidence.
            </p>
            <ul className="footer-socials mt-8 border-t border-[color:var(--line-strong)] pt-6">
              {FOOTER_SOCIALS.map(({ label, href, path }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
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
          <div>
            <nav className="border-t border-[color:var(--line-strong)]" aria-label="Footer navigation">
              {FOOTER_LINKS.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-[color:var(--line-subtle)] py-3 text-sm text-[color:var(--text-muted)] transition-all duration-300 last:border-b-0 hover:text-white"
                >
                  <span className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1.5">
                    <span className="footer-link-index font-mono text-[9px] tracking-[0.18em] text-[color:var(--accent-primary)] opacity-70 group-hover:opacity-100">
                      0{index + 1}
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8f9cff] group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
            <div className="footer-nav-legal mt-6 flex items-center gap-6">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="display-kicker text-[color:var(--text-faint)] transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
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
              <p className="footer-contact-value mt-1 text-[color:var(--text-body)]">Within three business days.</p>
            </div>
          </div>
        </div>

        <div data-footer-cell data-motion-static className="modular-box footer-utility md:col-span-2 lg:col-span-4">
          <span className="flex flex-col gap-0.5">
            <span className="display-kicker text-[color:var(--text-muted)]">© {year} Owlsey</span>
            <span className="text-xs text-[color:var(--text-faint)]">All rights reserved.</span>
          </span>

          <span className="footer-utility-location flex items-center gap-3">
            <span className="footer-box-icon" aria-hidden="true">
              <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="display-kicker text-[color:var(--text-muted)]">Surat, India / Worldwide</span>
              <span className="text-xs text-[color:var(--text-faint)]">We work across borders.</span>
            </span>
          </span>

          <button
            type="button"
            onClick={handleBackToTop}
            data-cursor="TOP"
            className="footer-back-to-top group flex items-center gap-3 text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]"
            aria-label="Back to top"
          >
            <span className="display-kicker">Back to top</span>
            <span className="footer-arrow-button footer-arrow-button--sm" aria-hidden="true">
              <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
