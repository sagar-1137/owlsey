"use client";

import React from "react";
import { ScrollDirector } from "@/components/common/ScrollDirector";
import { MotionLayer } from "@/components/common/MotionLayer";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Projects } from "@/components/sections/Projects";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[image:var(--shell-gradient)] px-0 py-0 text-[color:var(--text-strong)] lg:px-0">
      <ScrollDirector />
      <SmoothScroll />
      <MotionLayer />
      <div className="modular-shell palette-white home-shell w-full overflow-visible bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)]">
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <Projects />
        </main>
        <Footer />
      </div>
    </div>
  );
}
