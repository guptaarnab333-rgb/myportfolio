"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Scene3DSection from "@/components/Scene3DSection";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const type = typeRef.current;
      if (!section || !type) return;

      if (reduced) return;

      // Intro: headline lines rise into view from under a clip mask.
      gsap.from(type.querySelectorAll("[data-line]"), {
        yPercent: 120,
        duration: 1.1,
        ease: EASE,
        stagger: 0.09,
        delay: 0.15,
      });
      gsap.from(type.querySelectorAll("[data-fade]"), {
        autoAlpha: 0,
        y: 16,
        duration: 0.9,
        ease: EASE,
        stagger: 0.1,
        delay: 0.7,
      });

      // Cursor parallax on the type block (subtle, type-only).
      const xTo = gsap.quickTo(type, "x", { duration: 0.9, ease: EASE });
      const yTo = gsap.quickTo(type, "y", { duration: 0.9, ease: EASE });
      const onMove = (e: PointerEvent) => {
        const r = section.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        xTo(nx * 22);
        yTo(ny * 16);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 md:px-[64px]"
    >
      {/* WebGL signature object, behind the type (desktop, motion-on only) */}
      <Scene3DSection />

      <div ref={typeRef} className="relative z-10 w-full max-w-[1280px]">
        <h1 className="font-oswald font-light leading-[0.92] tracking-[-0.03em] text-white text-[clamp(44px,8vw,96px)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block">
              I make to <span className="text-accent">think;</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block">
              I think to make.
            </span>
          </span>
        </h1>

        <p
          data-fade
          className="mt-8 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-muted"
        >
          Arnab Gupta&nbsp;&nbsp;·&nbsp;&nbsp;Product Designer &amp; Maker
        </p>
      </div>

      <p
        data-fade
        className="absolute bottom-8 left-6 z-10 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-faint md:left-[64px]"
      >
        Scroll to enter
      </p>
    </section>
  );
}
