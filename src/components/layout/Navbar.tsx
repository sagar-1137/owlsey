"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ensureGsap, useGSAP } from "@/lib/gsap";

const navLinks = [
  { label: "Home", href: "/", note: "Start here", index: "01" },
  { label: "Services", href: "/services", note: "What we build", index: "02" },
  { label: "Projects", href: "/projects", note: "Selected systems", index: "03" },
  { label: "Experience", href: "/experience", note: "How we deliver", index: "04" },
  { label: "Contact", href: "/contact", note: "Open a brief", index: "05" },
];
const navGridColumns = [0, 25, 50, 75, 100];
const closedNavColumns = [0, 34, 100];
const navBodyColumns = [0, 33.333, 66.667, 100];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const scrollSentinelRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-nav-rail]", {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.out",
        clearProps: "transform",
      });
      gsap.from("[data-nav-logo]", {
        opacity: 0,
        y: 12,
        duration: 0.7,
        delay: 0.35,
        ease: "power3.out",
      });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      if (!isOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const gsap = ensureGsap();
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline
        .fromTo(
          "[data-overlay-cell]",
          { opacity: 0, y: 18, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.72, stagger: 0.055, clearProps: "transform,filter" },
          0.14
        )
        .fromTo(
          "[data-overlay-arrow]",
          { opacity: 0, x: -8, y: 8 },
          { opacity: 1, x: 0, y: 0, duration: 0.42, stagger: 0.045 },
          0.38
        );
    },
    { scope: overlayRef, dependencies: [isOpen], revertOnUpdate: true }
  );

  return (
    <>
      <span ref={scrollSentinelRef} className="pointer-events-none absolute left-0 top-12 h-px w-px" aria-hidden="true" />
      <header ref={headerRef} className="owlsey-nav-fixed pointer-events-none fixed top-0 z-40">
        <div data-nav-rail className={`owlsey-nav-rail pointer-events-auto ${scrolled ? "is-scrolled" : ""}`}>
          <div className="owlsey-nav-junctions" aria-hidden="true">
            {closedNavColumns.map((column) => (
              <span key={column} style={{ left: `${column}%` }} />
            ))}
          </div>

          <button type="button" onClick={() => setIsOpen(true)} data-cursor="MENU" className="owlsey-nav-cell owlsey-nav-menu group" aria-label="Open navigation" aria-expanded={isOpen}>
            <Menu className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>Menu</span>
          </button>

          <Link href="/" onClick={() => setIsOpen(false)} data-cursor="HOME" className="owlsey-nav-cell owlsey-nav-brand" aria-label="Owlsey home">
            <Image src="/logos/owlsey_horizontal.svg" alt="Owlsey" width={186} height={44} priority className="owlsey-logo-on-dark h-8 w-auto object-contain lg:h-9" data-nav-logo />
          </Link>

        </div>
      </header>

      <div ref={overlayRef} className={`owlsey-nav-overlay ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label="Owlsey navigation">
        <div className="owlsey-nav-overlay-head">
          <div className="owlsey-nav-junctions" aria-hidden="true">
            {navGridColumns.map((column) => (
              <span key={column} style={{ left: `${column}%` }} />
            ))}
          </div>
          <div className="owlsey-nav-overlay-label" data-overlay-cell>Navigation / 05</div>
          <Link href="/" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1} className="owlsey-nav-overlay-brand" aria-label="Owlsey home">
            <Image src="/logos/owlsey_horizontal.svg" alt="Owlsey" width={186} height={44} className="owlsey-logo-on-dark h-8 w-auto object-contain lg:h-9" />
          </Link>
          <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1} className="owlsey-nav-close" aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="owlsey-nav-overlay-body">
          <aside className="owlsey-nav-aside">
            <div className="owlsey-nav-aside-junctions" aria-hidden="true"><span /><span /></div>
            <div data-overlay-cell>
              <p className="display-kicker text-[color:var(--text-faint)]">Owlsey / custom systems</p>
              <p className="owlsey-nav-aside-title">One fit.<br />Not a template.</p>
            </div>
            <div data-overlay-cell>
              <p className="owlsey-nav-aside-copy">Client requirements strengthened by practical engineering judgement.</p>
              <a href="mailto:hello@owlsey.com" data-cursor="MAIL" tabIndex={isOpen ? 0 : -1} className="owlsey-nav-aside-mail">
                <span>hello@owlsey.com</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>

          <nav className="owlsey-nav-links" aria-label="Primary navigation">
            <div className="owlsey-nav-links-junctions" aria-hidden="true">
              {navBodyColumns.map((column) => (
                <span key={column} style={{ left: `${column}%` }} />
              ))}
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} data-cursor="OPEN" tabIndex={isOpen ? 0 : -1} className={`owlsey-nav-link group ${isActive ? "is-active" : ""}`}>
                  <div data-overlay-cell className="owlsey-nav-link-meta">
                    <span>{link.index}</span>
                    <span>{isActive ? "Current" : link.note}</span>
                  </div>
                  <div data-overlay-cell className="owlsey-nav-link-main">
                    <span className="owlsey-nav-link-title">{link.label}</span>
                    <ArrowUpRight data-overlay-arrow className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
