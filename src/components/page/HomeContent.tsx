import React from "react";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpeningExperience } from "@/components/sections/OpeningExperience";
import { IntroToHeroTransition } from "@/components/sections/IntroToHeroTransition";
import { ChapterRoutes } from "@/components/sections/ChapterRoutes";
import { Hero } from "@/components/sections/Hero";
import { HeroAssembly } from "@/components/sections/HeroAssembly";
import { StatsBar } from "@/components/sections/StatsBar";
import { Capabilities } from "@/components/sections/Capabilities";
import { Projects } from "@/components/sections/Projects";
import { TechMarqueeSection } from "@/components/sections/TechMarqueeSection";

const chapters = [
  {
    id: "one-clear-route",
    title: "ONE CLEAR ROUTE",
    subtitle: "From vision to execution",
    content: (
      <div className="space-y-4 text-white/80">
        <p className="text-base md:text-lg leading-relaxed">
          We transform complex challenges into elegant solutions through a proven process
          that keeps you informed at every step.
        </p>
      </div>
    ),
  },
  {
    id: "custom-software",
    title: "CUSTOM SOFTWARE, BUILT TO FIT",
    subtitle: "Not templates. Not frameworks. Your solution.",
    content: (
      <div className="space-y-4 text-white/80">
        <p className="text-base md:text-lg leading-relaxed">
          Every line of code is written specifically for your business,
          with architecture that scales with your ambitions.
        </p>
      </div>
    ),
  },
];

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[image:var(--shell-gradient)] px-0 py-0 text-[color:var(--text-strong)] lg:px-0">
      <DeferredEnhancements />
      <div className="viewport-frame-grid" aria-hidden="true" />
      <div className="modular-shell palette-white home-shell w-full overflow-visible bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)]">
        {/* Opening experience - full screen intro */}
        <OpeningExperience />

        {/* Intro to hero transition zone */}
        <IntroToHeroTransition />

        <Navbar />
        <main>
          {/* Main hero with assembly animations */}
          <div>
            <Hero />
            <HeroAssembly />
          </div>

          {/* Chapter routes - full screen sections */}
          <ChapterRoutes chapters={chapters} />

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
