"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMusic } from "@/lib/music";

/** Session flag: set once the visitor has clicked Enter. */
const ENTERED_KEY = "intro-entered";

/**
 * The intro should play on the very first arrival and on a manual refresh, but
 * NOT on in-site navigation. Because the site is a static export, every
 * internal link is a full document load that remounts this component, so we
 * can't rely on React state alone — we read the Navigation Timing API:
 *  - "reload"  → the visitor refreshed: always replay the intro.
 *  - otherwise → replay only if they haven't entered yet this session.
 */
function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    if (isReload) return false; // refresh always replays
    return sessionStorage.getItem(ENTERED_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const [entered, setEntered] = useState(false);
  // When true, the intro is bypassed entirely (already entered this session).
  const [skip, setSkip] = useState(false);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  // Decide before first paint whether to skip, so the ENTER gate never flashes
  // on internal navigation.
  useLayoutEffect(() => {
    if (shouldSkipIntro()) {
      setSkip(true);
      if (overlayRef.current) overlayRef.current.style.display = "none";
    }
  }, []);

  // Lock scroll while the intro is up; preload the music.
  useEffect(() => {
    if (skip) return; // intro bypassed: leave scroll alone
    // Always reopen at the hero: stop the browser from restoring the previous
    // scroll position on reload, and force the page to the top right away.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    getMusic(); // instantiate + preload the shared track
    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, [skip]);
  useEffect(() => {
    if (skip) return;
    lenis?.stop();
  }, [lenis, skip]);

  const onEnter = () => {
    if (entered) return;
    // Remember for the rest of this browser session so internal navigation
    // doesn't replay the intro. Cleared automatically when the tab closes.
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {
      /* ignore */
    }
    // Start music inside the click gesture (browser autoplay requirement).
    getMusic()?.play().catch(() => {});
    setEntered(true);
  };

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const black = blackRef.current;
      const num = numRef.current;
      const bar = barRef.current;
      const lh = leftHandRef.current;
      const rh = rightHandRef.current;
      if (!overlay) return;
      if (skip) return; // intro bypassed this session

      const APART = 14;
      const hands = { off: APART };
      const paintHands = () => {
        if (lh) lh.style.transform = `translateX(${-hands.off}vw)`;
        if (rh) rh.style.transform = `translateX(${hands.off}vw)`;
      };
      const counter = { v: 0 };
      const paint = () => {
        if (num) num.textContent = String(Math.round(counter.v));
        if (bar) bar.style.transform = `scaleX(${counter.v / 100})`;
        hands.off = (1 - counter.v / 100) * APART;
        paintHands();
      };
      paint(); // idle: hands apart, behind the ENTER gate

      const finish = () => {
        document.documentElement.style.removeProperty("overflow");
        lenis?.start();
        // Snap to the hero before handing control back, so the page never
        // reveals at a remembered scroll position.
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("preloader:done"));
      };

      if (!entered) return; // hold on the ENTER screen until clicked

      // Reduced motion: skip the animation, reveal immediately.
      if (reduced) {
        gsap.set(overlay, { autoAlpha: 0, display: "none" });
        finish();
        return;
      }

      const tl = gsap.timeline({
        delay: 0.45, // let the ENTER gate fade out first
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          finish();
        },
      });
      // Hands draw together as the counter climbs to 100.
      tl.to(counter, { v: 100, duration: 1.6, ease: "power2.out", onUpdate: paint });
      tl.addLabel("touch", "+=0.2");
      // Black slides up to reveal the page (independent of the hands).
      tl.to(black, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "touch");
      // Then the hands pull apart.
      tl.to(
        hands,
        { off: 60, duration: 0.85, ease: "power3.inOut", onUpdate: paintHands },
        "touch+=0.5"
      );
    },
    { dependencies: [entered, reduced, skip] }
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="preloader pointer-events-none fixed inset-0 z-[100]"
      style={skip ? { display: "none" } : undefined}
    >
      {/* Black background — its own layer, slides up to reveal the page. */}
      <div ref={blackRef} className="absolute inset-0 bg-black">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-8 md:px-[64px]">
          <span className="font-oswald text-[clamp(26px,4vw,46px)] font-light leading-[0.8] tracking-[-0.03em] text-off">
            <span ref={numRef}>0</span>
            <span className="text-off">%</span>
          </span>
          <span className="mb-2 hidden font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-faint sm:block">
            Arnab Gupta
          </span>
        </div>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line">
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-0 bg-off"
          />
        </span>
      </div>

      {/* Hands — independent layer above the black, edge to edge. */}
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

      {/* ENTER gate — the first screen; fades out on click. */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-7 bg-black transition-opacity duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          entered ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={onEnter}
          className="enter-glow group rounded-full border border-[#f3f3f3]/40 px-12 py-4 font-oswald text-[clamp(18px,3vw,26px)] font-light uppercase tracking-[0.45em] text-[#f3f3f3] transition-[letter-spacing,border-color] duration-500 hover:border-[#f3f3f3] hover:tracking-[0.6em]"
        >
          Enter
        </button>
        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-faint">
          ♪ sound on
        </span>
      </div>
    </div>
  );
}
