"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three.js loads only on the client, only when the hero mounts.
const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

export default function SynapserHero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      {reduced ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-inter text-[clamp(64px,16vw,220px)] font-bold tracking-[-0.04em] text-[#141414]">
            ARNAB
          </span>
        </div>
      ) : (
        <HeroParticles />
      )}

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 py-9 md:px-16">
        <div className="flex items-start justify-between font-mono text-[12px] tracking-[0.02em] text-[#6B6B68]">
          <span>( PORTFOLIO — 2026 )</span>
          <span className="hidden sm:block">
            BASED IN DEHRADUN, IN · GMT+5:30
          </span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <span className="font-mono text-[12px] tracking-[0.1em] text-[#141414]">
            SCROLL TO EXPLORE&nbsp;&nbsp;↓
          </span>
          <span className="hidden font-mono text-[12px] tracking-[0.1em] text-[#6B6B68] md:block">
            RESEARCH — MAKING — SUSTAINABILITY — ERGONOMICS — PROTOTYPING
          </span>
        </div>
      </div>
    </section>
  );
}
