"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// three / R3F load only on the client, only when actually mounted.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Scene3DSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // No WebGL for reduced-motion or small screens; the type-led hero stands alone.
  const enabled = isDesktop && !reduced;

  return (
    <div ref={ref} aria-hidden className="absolute inset-0">
      {enabled && inView ? <Scene3D /> : null}
    </div>
  );
}
