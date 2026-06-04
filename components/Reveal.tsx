"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in ms */
  delay?: number;
  /** vertical travel in px */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered fade-up. Content is visible by default (the element renders
 * at its natural state in SSR/HTML); GSAP only hides-then-reveals it once the
 * client is running and motion is allowed. Under reduced motion it stays put.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      gsap.from(el, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        ease: EASE,
        delay: delay / 1000,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { dependencies: [reduced] }
  );

  const Tag = as;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
