"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Crosshair,
  FileText,
  Flag,
  LayoutGrid,
  Mail,
  MessageSquare,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { GridJunctions } from "@/components/common/GridJunctions";

const PROJECT_TYPES = [
  "Custom platform",
  "Internal tool",
  "Integration / automation",
  "Improve an existing product",
  "Not sure yet",
];

/* The enquiry runs as a real four-stage sequence, so the tracker is ordered
   and the first stage is the one the visitor is on. */
const BRIEF_STEPS = [
  { label: "Describe", Icon: FileText },
  { label: "Review", Icon: LayoutGrid },
  { label: "Clarify", Icon: MessageSquare },
  { label: "Deliver", Icon: Check },
];

const USEFUL_BRIEF = [
  { label: "Clear context", Icon: Crosshair },
  { label: "Desired outcome", Icon: Flag },
  { label: "Any reference", Icon: Paperclip },
  { label: "Constraints / timeline", Icon: Clock },
];

export default function ContactContent() {
  const [contextLength, setContextLength] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [directionOpen, setDirectionOpen] = useState(false);
  const [directionError, setDirectionError] = useState(false);
  const directionRef = useRef<HTMLDivElement>(null);
  const directionButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!directionRef.current?.contains(event.target as Node)) setDirectionOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDirectionOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectType) {
      setDirectionError(true);
      directionButtonRef.current?.focus();
      return;
    }
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const submittedProjectType = String(form.get("projectType") ?? "Not specified");
    const context = String(form.get("context") ?? "");
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Direction: ${submittedProjectType}`, "", "Context:", context].join("\n")
    );

    window.location.href = `mailto:hello@owlsey.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#090a0b] text-[color:var(--text-strong)]">
      <DeferredEnhancements />
      <div className="modular-shell palette-white w-full overflow-visible bg-[color:var(--surface-base)]">
        <Navbar />
        <main>
          <section className="chapter-steel" data-chapter="Contact" aria-labelledby="contact-title">
            <div className="modular-grid contact-stage-grid contact-stage-grid--editorial has-complete-junctions">
              <GridJunctions />
              <div data-contact-cell className="modular-box contact-panel-intro flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-dim)]">Project enquiry</p>
                  <span className="display-kicker text-[color:var(--text-faint)]">01</span>
                </div>
                <div>
                  <h1 id="contact-title" className="modular-display max-w-[7ch] text-[clamp(4rem,5.5vw,6.4rem)] text-[color:var(--text-strong)]">
                    Start with <span className="contact-accent-word">context</span><span className="accent-stop">.</span>
                  </h1>
                  <p className="mt-6 max-w-[27ch] text-sm leading-6 text-[color:var(--text-muted)]">Bring the need. We will help shape the right direction.</p>
                </div>
                <div className="contact-intro-art" aria-hidden="true">
                  <span />
                </div>
              </div>

              <div data-contact-cell className="modular-box contact-panel-brief flex flex-col justify-between">
                <div className="contact-panel-brief-head text-center">
                  <p className="display-kicker text-[color:var(--text-dim)]">Project brief</p>
                  <h2 className="modular-display mt-4 text-[clamp(3.2rem,4.6vw,5.2rem)] text-[color:var(--text-strong)]">What needs to <span className="contact-accent-word">work</span>?</h2>
                  <p className="mx-auto mt-4 max-w-[44ch] text-sm leading-6 text-[color:var(--text-muted)]">Tell us the goal, the context, and the constraints. We will take it from <span className="contact-inline-accent">there</span>.</p>
                </div>
                <ol className="contact-brief-steps" aria-label="Enquiry process">
                  {BRIEF_STEPS.map(({ label, Icon }, index) => (
                    <li key={label} data-active={index === 0 ? "true" : undefined}>
                      <span className="step-icon" aria-hidden>
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <strong>{label}</strong>
                    </li>
                  ))}
                </ol>
              </div>

              <aside data-contact-cell className="modular-box contact-panel-guide flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-faint)]">A useful brief</p>
                  <Sparkles className="h-4 w-4 text-[color:var(--contact-accent-soft)]" strokeWidth={1.5} aria-hidden />
                </div>
                <div>
                  <p className="max-w-[13ch] text-[clamp(1.8rem,2.45vw,2.7rem)] leading-[1.03] tracking-[-0.04em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>A short brief is <span className="contact-serif-accent">enough</span><span className="accent-stop">.</span></p>
                  <ul className="contact-guide-list">
                    {USEFUL_BRIEF.map(({ label, Icon }) => (
                      <li key={label}>
                        <span className="guide-icon" aria-hidden>
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <a data-contact-cell href="mailto:hello@owlsey.com" data-cursor="MAIL" data-motion-link className="modular-box contact-panel-email group flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-[color:var(--text-faint)]">Direct email</p>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div className="contact-email-block">
                  <div className="flex items-center gap-4">
                    <span className="contact-email-icon" aria-hidden>
                      <Mail className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-sm text-[color:var(--text-strong)]">Prefer <span className="contact-inline-accent">email</span>?</span>
                      <span className="mt-1 block text-sm text-[color:var(--text-muted)]">Reach us directly.</span>
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-4">
                    <span className="text-[clamp(1rem,1.35vw,1.3rem)] tracking-[-0.03em]">hello@owlsey.com</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>

              <form data-contact-cell data-motion-static className="modular-box contact-panel-form" onSubmit={handleSubmit}>
                <div className="contact-form-fields contact-form-fields--boxed">
                  <label className="contact-compact-field">
                    <span>Name *</span>
                    <input name="name" type="text" autoComplete="name" placeholder="Your name" maxLength={80} required />
                  </label>
                  <label className="contact-compact-field">
                    <span>Work email *</span>
                    <input name="email" type="email" autoComplete="email" placeholder="name@company.com" maxLength={160} required />
                  </label>
                  <div className="contact-compact-field contact-compact-field--wide">
                    <span id="contact-direction-label">Direction *</span>
                    <div ref={directionRef} className={`contact-custom-select ${directionOpen ? "is-open" : ""}`}>
                      <input type="hidden" name="projectType" value={projectType} />
                      <button
                        ref={directionButtonRef}
                        type="button"
                        role="combobox"
                        className="contact-custom-select-trigger"
                        aria-labelledby="contact-direction-label contact-direction-value"
                        aria-haspopup="listbox"
                        aria-controls="contact-direction-options"
                        aria-expanded={directionOpen}
                        aria-invalid={directionError}
                        onClick={() => setDirectionOpen((open) => !open)}
                      >
                        <span id="contact-direction-value" className={projectType ? "" : "is-placeholder"}>
                          {projectType || "Select what is closest"}
                        </span>
                        <span className="contact-custom-select-arrow" aria-hidden="true">
                          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                      </button>
                      {directionOpen && (
                        <div id="contact-direction-options" className="contact-custom-select-menu" role="listbox" aria-labelledby="contact-direction-label">
                          {PROJECT_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              role="option"
                              aria-selected={projectType === type}
                              onClick={() => {
                                setProjectType(type);
                                setDirectionError(false);
                                setDirectionOpen(false);
                                directionButtonRef.current?.focus();
                              }}
                            >
                              <span>{type}</span>
                              {projectType === type && <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {directionError && <small className="contact-field-error">Select a project direction.</small>}
                  </div>
                  <label className="contact-compact-field contact-compact-field--wide contact-compact-message">
                    <span>Context *</span>
                    <span className="contact-message-wrap">
                      <textarea id="contact-context" name="context" minLength={20} maxLength={500} aria-describedby="contact-context-count" onChange={(event) => setContextLength(event.target.value.length)} placeholder="What should the software improve, replace, connect, or make possible?" required />
                      <span id="contact-context-count" className="contact-character-count">{contextLength} / 500</span>
                    </span>
                  </label>
                </div>
                <div className="contact-form-actions">
                  <button type="submit" data-cursor="SEND" className="contact-form-submit group">
                    <span>Open email draft</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>

              <article data-contact-cell className="modular-box modular-box-dark contact-panel-response flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="display-kicker text-white/60">Response</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
                <div>
                  <p className="modular-display max-w-[7ch] text-[clamp(3rem,4.3vw,5rem)] text-white">
                    One business <span className="contact-accent-word">day</span><span className="accent-stop">.</span>
                  </p>
                  <p className="mt-5 max-w-[26ch] text-sm leading-6 text-white/70">Direct. Practical. No fluff. You will hear back within one business day.</p>
                  <p className="contact-response-chip mt-6">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                    We value clarity over size.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
