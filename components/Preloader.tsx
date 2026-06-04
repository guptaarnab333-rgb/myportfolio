"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function whenReady(): Promise<void> {
  const fonts =
    typeof document !== "undefined" && document.fonts
      ? document.fonts.ready
      : Promise.resolve();
  const loaded = new Promise<void>((res) => {
    if (typeof document === "undefined" || document.readyState === "complete") {
      res();
    } else {
      window.addEventListener("load", () => res(), { once: true });
    }
  });
  const timeout = new Promise<void>((res) => setTimeout(res, 3000));
  // Resolve when fonts + load are done, but never hang past the timeout.
  return Promise.race([Promise.all([fonts, loaded]).then(() => undefined), timeout]);
}

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const num = numRef.current;
      const bar = barRef.current;
      if (!overlay || !num) return;

      const counter = { v: 0 };
      const paint = () => {
        num.textContent = String(Math.round(counter.v));
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`;
      };

      const finish = () => {
        lenis?.start();
        document.documentElement.style.removeProperty("overflow");
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("preloader:done"));
      };

      // Reduced motion: no count, no slide. Reveal as soon as ready.
      if (reduced) {
        counter.v = 100;
        paint();
        whenReady().then(() => {
          gsap.set(overlay, { autoAlpha: 0, display: "none" });
          finish();
        });
        return;
      }

      // Lock scroll during load.
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";

      const reveal = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            finish();
          },
        });
        tl.to(counter, { v: 100, duration: 0.35, ease: "power2.out", onUpdate: paint });
        tl.to(overlay, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.12");
      };

      // Count to 95 quickly, then wait for real readiness before the reveal.
      gsap.to(counter, {
        v: 95,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: paint,
        onComplete: () => whenReady().then(reveal),
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex items-end justify-between bg-black px-6 pb-8 md:px-[64px]"
    >
      <span className="font-oswald text-[clamp(72px,18vw,200px)] font-light leading-[0.8] tracking-[-0.04em] text-off">
        <span ref={numRef}>0</span>
        <span className="text-accent">%</span>
      </span>
      <span className="mb-4 hidden font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-faint sm:block">
        Arnab Gupta
      </span>
      {/* progress bar */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line">
        <span
          ref={barRef}
          className="block h-full origin-left scale-x-0 bg-off"
        />
      </span>
    </div>
  );
}
