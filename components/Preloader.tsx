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
  const blackRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const black = blackRef.current;
      const num = numRef.current;
      const bar = barRef.current;
      const lh = leftHandRef.current;
      const rh = rightHandRef.current;
      if (!overlay || !num) return;

      // How far apart the hands start (vw). 0 = touching (full-bleed meeting).
      const APART = 14;
      const hands = { off: APART };
      const paintHands = () => {
        if (lh) lh.style.transform = `translateX(${-hands.off}vw)`;
        if (rh) rh.style.transform = `translateX(${hands.off}vw)`;
      };
      const counter = { v: 0 };
      const paint = () => {
        num.textContent = String(Math.round(counter.v));
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`;
        hands.off = (1 - counter.v / 100) * APART;
        paintHands();
      };
      paint();

      const finish = () => {
        lenis?.start();
        document.documentElement.style.removeProperty("overflow");
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("preloader:done"));
      };

      // Reduced motion: hands meeting, no animation; reveal as soon as ready.
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
        // 1) Hands meet at the centre.
        tl.to(counter, { v: 100, duration: 0.5, ease: "power2.out", onUpdate: paint });
        tl.addLabel("touch", "+=0.18");
        // 2) The black background slides up and away on its own layer — this is
        //    independent of the hands and vanishes first.
        tl.to(
          black,
          { yPercent: -100, duration: 0.85, ease: "power4.inOut" },
          "touch"
        );
        // 3) Once the black is mostly gone, the hands pull each other apart.
        tl.to(
          hands,
          { off: 60, duration: 0.85, ease: "power3.inOut", onUpdate: paintHands },
          "touch+=0.5"
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
      className="preloader pointer-events-none fixed inset-0 z-[100]"
    >
      {/* Black background — its own layer, slides up to reveal the page. */}
      <div ref={blackRef} className="absolute inset-0 bg-black">
        {/* small white percentage + name */}
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

      {/* Hands — independent layer above the black, edge to edge (no gutters). */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={leftHandRef}
          src="/hand-left.png"
          alt=""
          className="block h-auto w-[53vw] bg-transparent will-change-transform"
        />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center justify-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={rightHandRef}
          src="/hand-right.png"
          alt=""
          className="block h-auto w-[47vw] bg-transparent will-change-transform"
        />
      </div>
    </div>
  );
}
