import React from "react";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { PinnedChapters } from "@/components/common/PinnedChapters";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { ChapterRoute } from "@/components/sections/ChapterRoute";
import { StatsBar } from "@/components/sections/StatsBar";
import { Projects } from "@/components/sections/Projects";
import { Faq } from "@/components/sections/Faq";
import { OwnProducts } from "@/components/sections/OwnProducts";
import { Industries } from "@/components/sections/Industries";
import { StackStrip } from "@/components/sections/StackStrip";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[image:var(--shell-gradient)] px-0 py-0 text-[color:var(--text-strong)] lg:px-0">
      <DeferredEnhancements />
      <PinnedChapters />
      <div className="viewport-frame-grid" aria-hidden="true" />
      <div className="modular-shell palette-white home-shell w-full overflow-visible bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)]">
        <HomeIntro />
        <Navbar />
        <main>
          <ProofStrip />
          {/* Narrative: method → how we engage → capabilities → proof (client
              work, our own products, sectors shipped) → the stack → questions →
              the footer's invitation. The method, capabilities and Projects
              chapters pin with their own timelines;
              the sections after them are [data-pin-chapter]s driven by
              PinnedChapters. Testimonials stay a calm, unpinned reading band,
              and the footer is the closing invitation (no separate CTA). */}
          <ChapterRoute
            id="process"
            eyebrow="From brief to release"
            lines={["ONE CLEAR", "ROUTE."]}
            points={["Understand the requirement", "Shape the right system", "Build useful releases", "Evolve after launch"]}
            target="method"
            align="left"
          />
          <StatsBar />
          <ChapterRoute
            eyebrow="Software shaped around the work"
            lines={["CUSTOM SOFTWARE,", "BUILT TO FIT."]}
            points={[
              "Web applications",
              "Mobile products",
              "Internal tools",
              "Connected systems",
              "SaaS platforms",
              "AI & Data engines",
              "E-commerce & Fintech",
              "Cloud infrastructure",
            ]}
            target="systems"
            tone="graphite"
            align="center"
          />
          <Projects />
          <OwnProducts />
          <Industries />
          <Testimonials />
          <StackStrip />
          <Faq />
        </main>
        <Footer />
      </div>
    </div>
  );
}
