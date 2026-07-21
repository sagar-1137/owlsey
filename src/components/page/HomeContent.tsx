import React from "react";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Capabilities } from "@/components/sections/Capabilities";
import { Projects } from "@/components/sections/Projects";
import { TechMarqueeSection } from "@/components/sections/TechMarqueeSection";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[image:var(--shell-gradient)] px-0 py-0 text-[color:var(--text-strong)] lg:px-0">
      <DeferredEnhancements />
      <div className="viewport-frame-grid" aria-hidden="true" />
      <div className="modular-shell palette-white home-shell w-full overflow-visible bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)]">
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <Capabilities />
          <Projects />
          <TechMarqueeSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
