"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import {
  AppWindow,
  Box,
  BrainCircuit,
  CloudCog,
  CreditCard,
  Layers,
  LayoutDashboard,
  Network,
  Server,
  Smartphone,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiFlutter,
  SiPostgresql,
  SiRedis,
  SiClaude,
  SiDocker,
} from "react-icons/si";
import type { IconType } from "react-icons";

type ChapterRouteProps = {
  eyebrow: string;
  lines: string[];
  points: string[];
  target: string;
  tone?: "ink" | "graphite";
  align?: "left" | "right" | "center";
};

const defaultDetails: Record<string, string> = {
  "Understand the requirement": "Unpacking business objectives, core user flows, and tech constraints to establish a resilient project blueprint.",
  "Shape the right system": "Architecting modular software structures, defining scope boundaries, and selecting scalable technology stacks.",
  "Build useful releases": "Iterative, production-grade engineering focused on solving core operational friction and delivering real utility.",
  "Evolve after launch": "Proactive infrastructure monitoring, continuous performance optimization, and long-term feature expansion.",

  "Web applications": "High-performance web platforms engineered with responsive state management and resilient microservice backends.",
  "Mobile products": "Native iOS and Android software crafted for fast offline capability, real-time data sync, and fluid touch experience.",
  "Internal tools": "Custom operations dashboards, admin portals, and internal control systems built for team execution speed.",
  "Connected systems": "Unified API integrations, high-throughput cloud data pipelines, and scalable third-party service mesh.",
  "SaaS platforms": "Multi-tenant SaaS architectures built with subscription management, tenant isolation, and enterprise security.",
  "AI & Data engines": "Custom LLM integrations, automated intelligent pipelines, predictive analytics, and vector search systems.",
  "E-commerce & Fintech": "High-concurrency checkout systems, payment gateway integrations, fraud prevention, and ledger engines.",
  "Cloud infrastructure": "Automated CI/CD deployment pipelines, Kubernetes cluster orchestration, and serverless auto-scaling.",

  "Core product": "Business platforms & customer software shaped around how your business actually works. Portals / SaaS / Customer systems.",
  "Internal systems": "Operations tools & workflow engines that replace repeated handoffs and spreadsheet work. Dashboards / Admin portals.",
  "Automation": "Connected workflows with clean links between the products, data, and teams you already run on. APIs / Data flows.",
  "Cloud & intelligence": "Scalable cloud architecture, automated high-throughput data pipelines, and embedded artificial intelligence.",

  "React & Next.js": "Server-rendered React architectures, App Router, SSG/SSR, and high-performance Web Vitals.",
  "TypeScript & Go": "Strict end-to-end type safety, microservices, and high-concurrency backend systems.",
  "Node & Python": "Async API runtimes, NestJS microservices, AI integrations, and background worker queues.",
  "Flutter & Mobile": "Cross-platform native iOS & Android apps with 60fps fluid UI and offline sync.",
  "Postgres & Supabase": "Relational data modeling, connection pooling, ACID ledgers, and real-time database subscriptions.",
  "Redis & MongoDB": "Low-latency caching, in-memory pub/sub, document stores, and high-throughput logging.",
  "OpenAI & Claude": "Enterprise LLM APIs, vector embeddings, RAG pipelines, and automated intelligence tools.",
  "AWS & Docker": "Cloud infrastructure orchestration, containerized deployments, CI/CD, and edge CDNs.",
};

const heroSubtitles: Record<string, string> = {
  "ONE CLEAR ROUTE.": "WE ALWAYS FOLLOW.",
  "CUSTOM SOFTWARE, BUILT TO FIT.": "ENGINEERED FOR SCALE.",
  "SYSTEMS THAT FIT.": "REQUIREMENT-LED. NOT PACKAGED.",
  "THE STACK WE TRUST.": "FOCUSED. BATTLE-TESTED. SCALABLE.",
};

/* Exact-title lookups. The previous fuzzy `includes()` matching misfired in
   both directions — "TypeScript & Go" claimed "Mon**go**DB" (TS logo on the
   Redis card), "E-commerce" fell through to Postgres, and topic cards ended up
   wearing unrelated brand logos. Exact titles cannot cross-match. */

/* The stack chapter's cards name real technologies, so they wear the real
   brand marks — one per pair, the first-named technology. */
const stackLogos: Record<string, IconType> = {
  "React & Next.js": SiReact,
  "TypeScript & Go": SiTypescript,
  "Node & Python": SiNodedotjs,
  "Flutter & Mobile": SiFlutter,
  "Postgres & Supabase": SiPostgresql,
  "Redis & MongoDB": SiRedis,
  "OpenAI & Claude": SiClaude,
  "AWS & Docker": SiDocker,
};

/* Capability/system cards describe what we build, not a vendor — they get
   subject icons (same stroke language as the rest of the interface) instead
   of borrowed brand logos. */
const topicIcons: Record<string, LucideIcon> = {
  "Web applications": AppWindow,
  "Mobile products": Smartphone,
  "Internal tools": Wrench,
  "Connected systems": Network,
  "SaaS platforms": Layers,
  "AI & Data engines": BrainCircuit,
  "E-commerce & Fintech": CreditCard,
  "Cloud infrastructure": Server,
  "Core product": Box,
  "Internal systems": LayoutDashboard,
  "Automation": Workflow,
  "Cloud & intelligence": CloudCog,
};

const PointGraphic: React.FC<{ title: string; index?: number }> = ({ title }) => {
  const t = title.toLowerCase();

  const BrandLogo = stackLogos[title];
  if (BrandLogo) {
    return <BrandLogo className="chapter-route-card-graphic" size={135} />;
  }

  const TopicIcon = topicIcons[title];
  if (TopicIcon) {
    return (
      <TopicIcon
        className="chapter-route-card-graphic"
        size={135}
        strokeWidth={1}
        aria-hidden="true"
      />
    );
  }

  // Chapter 1 (method) keeps its bespoke schematic illustrations.
  if (t.includes("understand")) {
    return (
      <svg className="chapter-route-card-graphic" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="220" height="90" rx="4" stroke="rgba(143,156,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="55" r="32" stroke="rgba(143,156,255,0.25)" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="60" cy="55" r="18" stroke="#8f9cff" strokeWidth="1.5" />
        <circle cx="60" cy="55" r="4" fill="#8f9cff" />
        <line x1="60" y1="15" x2="60" y2="95" stroke="rgba(143,156,255,0.2)" strokeWidth="1" />
        <line x1="20" y1="55" x2="100" y2="55" stroke="rgba(143,156,255,0.2)" strokeWidth="1" />
        <rect x="120" y="32" width="90" height="8" rx="2" fill="rgba(143,156,255,0.3)" />
        <rect x="120" y="48" width="70" height="6" rx="2" fill="rgba(143,156,255,0.18)" />
        <rect x="120" y="62" width="80" height="6" rx="2" fill="rgba(143,156,255,0.18)" />
      </svg>
    );
  }

  if (t.includes("shape")) {
    return (
      <svg className="chapter-route-card-graphic" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="220" height="90" rx="4" stroke="rgba(143,156,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="100" y="35" width="40" height="40" rx="6" fill="rgba(16,26,40,0.9)" stroke="#8f9cff" strokeWidth="1.5" />
        <path d="M120 47V63M112 55H128" stroke="#8f9cff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="30" y="22" width="34" height="24" rx="3" fill="rgba(95,112,216,0.15)" stroke="rgba(143,156,255,0.3)" strokeWidth="1" />
        <rect x="30" y="64" width="34" height="24" rx="3" fill="rgba(95,112,216,0.15)" stroke="rgba(143,156,255,0.3)" strokeWidth="1" />
        <rect x="176" y="22" width="34" height="24" rx="3" fill="rgba(95,112,216,0.15)" stroke="rgba(143,156,255,0.3)" strokeWidth="1" />
        <rect x="176" y="64" width="34" height="24" rx="3" fill="rgba(95,112,216,0.15)" stroke="rgba(143,156,255,0.3)" strokeWidth="1" />
        <path d="M64 34L100 45M64 76L100 65M140 45L176 34M140 65L176 76" stroke="rgba(143,156,255,0.35)" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    );
  }

  if (t.includes("build")) {
    return (
      <svg className="chapter-route-card-graphic" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="220" height="90" rx="4" stroke="rgba(143,156,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="30" y="24" width="180" height="62" rx="4" fill="rgba(11,18,28,0.95)" stroke="rgba(143,156,255,0.3)" strokeWidth="1" />
        <circle cx="44" cy="36" r="3" fill="#ff5f56" />
        <circle cx="54" cy="36" r="3" fill="#ffbd2e" />
        <circle cx="64" cy="36" r="3" fill="#27c93f" />
        <path d="M44 54L52 60L44 66" stroke="#8f9cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="58" y1="66" x2="72" y2="66" stroke="#8f9cff" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="80" y="52" width="70" height="6" rx="2" fill="rgba(143,156,255,0.35)" />
        <rect x="44" y="74" width="110" height="5" rx="2" fill="rgba(143,156,255,0.18)" />
      </svg>
    );
  }

  return (
    <svg className="chapter-route-card-graphic" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="90" rx="4" stroke="rgba(143,156,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M25 80 Q 70 75 100 50 T 170 35 T 215 25" stroke="#8f9cff" strokeWidth="2" fill="none" />
      <path d="M25 80 Q 70 75 100 50 T 170 35 T 215 25 V 85 H 25 Z" fill="url(#telemetry-grad-unique)" opacity="0.25" />
      <defs>
        <linearGradient id="telemetry-grad-unique" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f9cff" />
          <stop offset="100%" stopColor="#8f9cff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="50" r="4" fill="#8f9cff" stroke="#080d14" strokeWidth="1.5" />
      <circle cx="170" cy="35" r="4" fill="#8f9cff" stroke="#080d14" strokeWidth="1.5" />
      <circle cx="215" cy="25" r="4" fill="#8f9cff" stroke="#080d14" strokeWidth="1.5" />
      <line x1="215" y1="25" x2="215" y2="85" stroke="rgba(143,156,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
};

export const ChapterRoute: React.FC<ChapterRouteProps> = ({
  eyebrow,
  lines,
  points,
  target,
  tone = "ink",
  align = "left",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion) return;

    const gsap = ensureGsap();
    const ctx = gsap.context(() => {
      const titleLines = root.querySelectorAll<HTMLElement>("[data-route-line]");
      const batch0Cards = root.querySelectorAll<HTMLElement>("[data-route-card][data-batch='0']");
      const batch1Cards = root.querySelectorAll<HTMLElement>("[data-route-card][data-batch='1']");
      const heroSubEl = root.querySelector<HTMLElement>("[data-route-hero-sub]");
      const stage = root.querySelector<HTMLElement>("[data-route-stage]");

      gsap.set(titleLines, { yPercent: 115 });
      gsap.set(batch0Cards, { opacity: 0, y: 32, scale: 0.94 });
      gsap.set(batch1Cards, { opacity: 0, y: 32, scale: 0.94 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Title reveals and settles cleanly at top location (0.05 -> 0.28 scrub)
      timeline
        .to(titleLines, { yPercent: 0, stagger: 0.08, duration: 0.20, ease: "power3.out" }, 0.05)
        .to(heroSubEl, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.22);

      if (batch1Cards.length === 0) {
        // 4-point chapters (Chapter 1 & 3):
        // Step 2: ONLY AFTER title is settled (starting at 0.35 scrub), reveal cards on continued scroll
        timeline.to(batch0Cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "power3.out",
        }, 0.35);
      } else {
        // 8-point chapters (Chapter 2 & 4). The three phases own disjoint
        // scrub windows — the previous timings let the staggered batch-0
        // entrance (last card still animating until 0.66) outlive the batch-0
        // exit (done at 0.64), so the stale entrance re-lit old cards while
        // batch 1 was already fading in: both batches visible at once.
        //
        // Step 2: reveal Batch 0 (01–04); last card settled by 0.55.
        timeline.to(batch0Cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.16,
          stagger: 0.03,
          ease: "power3.out",
        }, 0.30);

        // Step 3: Batch 0 out, strictly after every entrance finished (0.56 -> 0.64)
        timeline.to(batch0Cards, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.08,
          ease: "power2.in",
        }, 0.56);

        // Step 4: Batch 1 (05–08) in, strictly after Batch 0 is gone; last
        // card settles at 0.84, exactly when the stage handoff begins.
        timeline.to(batch1Cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          stagger: 0.02,
          ease: "power3.out",
        }, 0.66);
      }

      // Stage transition handoff
      timeline.to(stage, { scale: 0.88, opacity: 0, filter: "none", duration: 0.22, ease: "power2.in" }, 0.84);

      const targetSection = document.querySelector<HTMLElement>(`[data-chapter-target="${target}"]`);
      if (targetSection && window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) {
        const cells = targetSection.querySelectorAll<HTMLElement>(".modular-box");
        cells.forEach((cell, index) => {
          const fromLeft = index % 2 === 0;
          gsap.fromTo(cell,
            { opacity: 0.22, x: fromLeft ? -34 : 34, y: 56, clipPath: `inset(${fromLeft ? "16% 8% 0 0" : "16% 0 0 8%"})` },
            {
              opacity: 1,
              x: 0,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: targetSection,
                start: "top 92%",
                end: "top 36%",
                scrub: 0.7,
              },
            });
        });
      }
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion, target]);

  const heroFullTitle = lines.join(" ");

  return (
    <section
      ref={sectionRef}
      className={[
        "chapter-route",
        `chapter-route--${tone}`,
        align === "right" ? "chapter-route--reversed" : "",
        align === "center" ? "chapter-route--center" : "",
      ].filter(Boolean).join(" ")}
      aria-label={eyebrow}
    >
      <div className="chapter-route-stage" data-route-stage>
        <TechnicalGrid className="chapter-route-technical-grid" />
        
        {/* Left Hero Area (Columns 1 & 2) */}
        <div className="chapter-route-hero-left" data-route-hero-left>
          <div>
            <p className="chapter-route-eyebrow">{eyebrow}</p>
            <h2 className="chapter-route-title">
              {lines.map((line) => {
                const hasDot = line.endsWith(".");
                const cleanLine = hasDot ? line.slice(0, -1) : line;
                return (
                  <span className="chapter-route-line-mask" key={line}>
                    <span data-route-line>
                      {cleanLine}
                      {hasDot && <span className="chapter-route-dot">.</span>}
                    </span>
                  </span>
                );
              })}
            </h2>
            <p className="chapter-route-sub" data-route-hero-sub>
              {heroSubtitles[heroFullTitle] || "WE ALWAYS FOLLOW."}
            </p>
          </div>
        </div>

        {/* Bottom 4-Column Card Grid - renders 4 cards across columns 1, 2, 3, 4 */}
        <div className="chapter-route-right-grid">
          {points.map((point, index) => {
            const desc = defaultDetails[point] || "Custom engineered software built for measurable business impact.";
            const slotIndex = index % 4; // Slot 0, 1, 2, 3 in 4-column row
            const batchIndex = Math.floor(index / 4); // Batch 0 (Cards 1-4) or Batch 1 (Cards 5-8)
            const isCenter = align === "center";

            return (
              <article
                className="chapter-route-card"
                data-route-card
                data-batch={batchIndex}
                data-slot={slotIndex}
                key={point}
              >
                <PointGraphic title={point} />
                <div className="chapter-route-card-content">
                  <div>
                    {!isCenter && (
                      <span className="chapter-route-card-num">{String(index + 1).padStart(2, "0")}</span>
                    )}
                    <h3 className="chapter-route-card-title">{point}</h3>
                    <p className="chapter-route-card-desc">{desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
