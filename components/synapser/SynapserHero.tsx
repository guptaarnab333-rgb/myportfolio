"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three.js loads only on the client, only when the hero mounts.
const HeroGallery = dynamic(() => import("./HeroGallery"), { ssr: false });

export default function SynapserHero() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const hero = heroRef.current;
      const overlay = overlayRef.current;
      const hint = hintRef.current;
      if (!hero || !overlay) return;

      // Pin the hero; the first stretch of scroll drives the cut-out reveal
      // before the page advances to the work archive.
      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 0, ease: "none", duration: 0.72 }, 0);
      if (hint) tl.to(hint, { opacity: 0, ease: "none", duration: 0.18 }, 0);

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=135%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        animation: tl,
      });
    },
    { dependencies: [reduced] }
  );

  // Reduced motion: a calm static hero with the logo, no pin, no WebGL.
  if (reduced) {
    return (
      <section
        id="top"
        className="relative flex h-[100svh] w-full items-center justify-center px-6"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arnab-creates-logo.png"
          alt="Arnab Creates"
          className="h-auto w-[min(420px,70vw)]"
        />
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Project images drifting forward, rippling to the cursor */}
      <HeroGallery />

      {/* Cut-out: the eye-mark logo knocked out of a panel, so the gallery
          shows through the mark. Fades on scroll to dissolve into the imagery. */}
      <div ref={overlayRef} className="absolute inset-0">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <mask id="heroLogoCut">
              {/* white = panel shows; the dark logo pixels cut through to the
                  gallery, the light eye stays as panel */}
              <rect width="1440" height="900" fill="#fff" />
              <image
                href="/arnab-creates-logo.png"
                x="320"
                y="320"
                width="800"
                height="258"
                preserveAspectRatio="xMidYMid meet"
              />
            </mask>
          </defs>
          <rect
            width="1440"
            height="900"
            fill="#f1f0ed"
            mask="url(#heroLogoCut)"
          />
        </svg>
      </div>

      {/* Bottom hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 px-6 pb-9 md:px-16"
      >
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
