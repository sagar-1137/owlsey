import React from "react";
import { DeferredEnhancements } from "@/components/common/DeferredEnhancements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { ChapterRoute } from "@/components/sections/ChapterRoute";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[image:var(--shell-gradient)] px-0 py-0 text-[color:var(--text-strong)] lg:px-0">
      <DeferredEnhancements />
      <div className="viewport-frame-grid" aria-hidden="true" />
      <div className="modular-shell palette-white home-shell w-full overflow-visible bg-[color:var(--surface-base)] shadow-[var(--shadow-shell)]">
        <HomeIntro />
        <Navbar />
        <main>
          <ChapterRoute
            eyebrow="From brief to release"
            lines={["ONE CLEAR", "ROUTE."]}
            points={["Understand the requirement", "Shape the right system", "Build useful releases", "Evolve after launch"]}
            target="capabilities"
            align="left"
          />
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
          <ChapterRoute
            eyebrow="Custom by default"
            lines={["SYSTEMS", "THAT FIT."]}
            points={[
              "Core product",
              "Internal systems",
              "Automation",
              "Cloud & intelligence",
            ]}
            target="tech-stack"
            tone="ink"
            align="right"
          />
          <ChapterRoute
            eyebrow="Engineering stack"
            lines={["THE STACK", "WE TRUST."]}
            points={[
              "React & Next.js",
              "TypeScript & Go",
              "Node & Python",
              "Flutter & Mobile",
              "Postgres & Supabase",
              "Redis & MongoDB",
              "OpenAI & Claude",
              "AWS & Docker",
            ]}
            target="footer"
            tone="graphite"
            align="center"
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
