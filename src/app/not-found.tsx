"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ShieldAlert } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex flex-col items-center justify-center p-6 font-mono text-xs select-none">
      <div className="max-w-md w-full glass-panel p-8 rounded-xl border border-white/5 space-y-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Glow corner background */}
        <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-red-500/5 blur-[25px] pointer-events-none" />

        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 w-fit mx-auto text-red-400">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-sm font-bold text-white tracking-widest uppercase">
            Error 404: Node Unreachable
          </h1>
          <p className="text-[10px] text-foreground-light leading-relaxed">
            The requesting socket address is invalid or not mapped to any known infrastructure hosts.
          </p>
        </div>

        <div className="border-t border-b border-white/5 py-3 text-[10px] text-left text-foreground-light space-y-1">
          <div><span className="text-white">REQUEST:</span> GET /not-found</div>
          <div><span className="text-white">STATUS:</span> 404 Not Found</div>
          <div><span className="text-white">DIAGNOSTIC:</span> Host lookup failed locally</div>
        </div>

        <div className="pt-2">
          <MagneticButton>
            <Link
              href="/"
              data-cursor
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Return to Gateway</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
