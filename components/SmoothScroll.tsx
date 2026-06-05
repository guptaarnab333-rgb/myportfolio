"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Keeps GSAP ScrollTrigger in sync with Lenis. useLenis reliably hands back the
 * instance once it exists (no mount-race), so this never silently no-ops.
 */
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

/**
 * App-wide smooth scrolling. Lenis drives its own RAF (autoRaf default) so wheel
 * scrolling always works regardless of effect timing. Reduced motion falls back
 * to native scrolling.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
