"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three.js loads only on the client, only when the hero mounts.
const HeroGallery = dynamic(() => import("./HeroGallery"), { ssr: false });

export default function SynapserHero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* Project images drifting forward (Podium-style) with cursor ripple */}
      {!reduced && <HeroGallery />}

      {/* Readability scrim so the headline lifts off the imagery */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 50% at 50% 46%, rgba(10,10,10,0.82), rgba(10,10,10,0) 78%)",
        }}
      />

      {/* Headline */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <h1 className="text-center font-serif text-[clamp(44px,8.5vw,116px)] italic leading-[1.0] tracking-[-0.01em] text-[#f3f3f3]">
          I make,
          <br />
          therefore I am.
        </h1>
      </div>

      {/* Bottom overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-6 pb-9 md:px-16">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#f3f3f3]">
          Scroll to explore&nbsp;&nbsp;↓
        </span>
        <span className="hidden font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a] md:block">
          Research · Making · Sustainability · Ergonomics · Prototyping
        </span>
      </div>
    </section>
  );
}
