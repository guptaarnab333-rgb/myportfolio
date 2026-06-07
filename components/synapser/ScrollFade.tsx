"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Real-time, scroll-scrubbed background. A single fixed layer behind everything
 * whose colour is driven directly by scroll position (GSAP ScrollTrigger scrub,
 * synced to Lenis), morphing ink → paper as the #seam spacer passes through the
 * viewport. The dark world (hero + work) and light world (about + contact) are
 * transparent while this is active, so the whole page tint shifts as you scroll.
 *
 * Reduced motion / no-JS: this no-ops and the CSS fallback in globals.css gives
 * each world a solid background plus a static gradient seam.
 */
const INK = "#0a0a0a";
const PAPER = "#f1f0ed";
const GRID_LIGHT = "rgba(243,243,243,0.05)"; // faint light lines, for the dark phase
const GRID_DARK = "rgba(20,20,20,0.06)"; //   faint dark lines, for the light phase
const GRID_SIZE = 64; // px per cell — tighter, Synapser-style spacing

function gridStyle(line: string, size = GRID_SIZE): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: "center center",
  };
}

export default function ScrollFade() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = root.current;
      const seam = document.getElementById("seam");
      if (!el || !seam) return;

      const bg = el.querySelector<HTMLElement>("[data-bg]");
      const gLight = el.querySelector<HTMLElement>("[data-grid-light]");
      const gDark = el.querySelector<HTMLElement>("[data-grid-dark]");
      if (!bg) return;

      document.documentElement.classList.add("fade-active");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: seam,
          // Morph across the small seam crossing the middle of the viewport.
          // Wider than the seam itself so the fade stays smooth despite the
          // tight work→about gap.
          start: "top 70%",
          end: "bottom 30%",
          // Numeric scrub (vs `true`) adds an easing lag so the colour glides
          // toward the scroll position instead of snapping 1:1. This keeps the
          // fade smooth even when someone flicks the wheel and scrolls fast.
          scrub: 1.2,
          invalidateOnRefresh: true, // recompute start/end on every refresh
        },
      });

      tl.fromTo(bg, { backgroundColor: INK }, { backgroundColor: PAPER }, 0);
      if (gLight) tl.fromTo(gLight, { opacity: 1 }, { opacity: 0 }, 0);
      if (gDark) tl.fromTo(gDark, { opacity: 0 }, { opacity: 1 }, 0);

      // The hero is 100svh and fonts/images settle after first paint, which
      // shifts the seam. Re-measure once things are stable so the fade lines up.
      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
      if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        document.documentElement.classList.remove("fade-active");
      };
    },
    { dependencies: [reduced] }
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div data-bg className="absolute inset-0" style={{ backgroundColor: INK }} />
      <div data-grid-light className="absolute inset-0" style={gridStyle(GRID_LIGHT)} />
      <div
        data-grid-dark
        className="absolute inset-0"
        style={{ ...gridStyle(GRID_DARK), opacity: 0 }}
      />
    </div>
  );
}
