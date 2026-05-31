"use client";

import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in ms */
  delay?: number;
  /** vertical travel in px */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const styles = useSpring({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0px)" : `translateY(${y}px)`,
    delay,
    config: { mass: 1, tension: 210, friction: 28 },
  });

  const Tag = animated[as] as typeof animated.div;

  return (
    <Tag ref={ref as never} style={styles} className={className}>
      {children}
    </Tag>
  );
}
