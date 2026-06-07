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
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const num = numRef.current;
      const bar = barRef.current;
      const lh = leftHandRef.current;
      const rh = rightHandRef.current;
      if (!overlay || !num) return;

      const counter = { v: 0 };
      // How far apart the two hands start (% of the image width). Closes to 0
      // (fingertips touching) as the counter reaches 100.
      const SPREAD = 16;
      const paint = () => {
        num.textContent = String(Math.round(counter.v));
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`;
        const gap = (1 - counter.v / 100) * SPREAD;
        if (lh) lh.style.transform = `translateX(${-gap}%)`;
        if (rh) rh.style.transform = `translateX(${gap}%)`;
      };

      const finish = () => {
        lenis?.start();
        document.documentElement.style.removeProperty("overflow");
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("preloader:done"));
      };

      // Reduced motion: no count, no slide. Hands already touching; reveal ASAP.
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
        // Circular collapse: the black contracts into a shrinking circle at the
        // point where the fingertips meet, revealing the home page.
        const clip = { r: 145 };
        const setClip = () => {
          overlay.style.clipPath = `circle(${clip.r}% at 50% 50%)`;
        };
        setClip();

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            finish();
          },
        });
        // Final push to 100 — the hands meet at the centre here.
        tl.to(counter, { v: 100, duration: 0.5, ease: "power2.out", onUpdate: paint });
        // Beat on the touch, then collapse the black into the centre circle.
        tl.to(
          clip,
          { r: 0, duration: 1.0, ease: "power3.inOut", onUpdate: setClip },
          "+=0.18"
        );
      };

      // Count to 95 while the hands draw together, then wait for real readiness.
      gsap.to(counter, {
        v: 95,
        duration: 1.8,
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
      className="preloader fixed inset-0 z-[100] bg-black"
    >
      {/* Reaching hands — the transparent cut-out shown at natural size (no
          crop, no overflow clip). Two copies, each masked to one hand at the
          fingertip gap, slide together. Black comes only from the overlay. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={leftHandRef}
            src="/hands.png"
            alt=""
            className="block h-auto w-auto max-w-[90vw] bg-transparent [clip-path:inset(0_46%_0_0)] will-change-transform"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={rightHandRef}
            src="/hands.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full bg-transparent [clip-path:inset(0_0_0_54%)] will-change-transform"
          />
        </div>
      </div>

      {/* bottom row: small white percentage + name */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-8 md:px-[64px]">
        <span className="font-oswald text-[clamp(26px,4vw,46px)] font-light leading-[0.8] tracking-[-0.03em] text-off">
          <span ref={numRef}>0</span>
          <span className="text-off">%</span>
        </span>
        <span className="mb-2 hidden font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-faint sm:block">
          Arnab Gupta
        </span>
      </div>

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
