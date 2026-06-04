"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * App-wide smooth scrolling (Lenis) driven by GSAP's ticker so there is a
 * single RAF loop shared with ScrollTrigger (prevents scroll jitter).
 * Under prefers-reduced-motion we render children with native scrolling.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Feed Lenis scroll events into ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (autoRaf is off below).
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
