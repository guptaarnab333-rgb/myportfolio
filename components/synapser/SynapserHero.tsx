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

      {/* Overlay (bottom only, so nothing collides with the fixed header) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-6 pb-9 md:px-16">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#141414]">
          Scroll to explore&nbsp;&nbsp;↓
        </span>
        <span className="hidden font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#6B6B68] md:block">
          Research · Making · Sustainability · Ergonomics · Prototyping
        </span>
      </div>
    </section>
  );
}
