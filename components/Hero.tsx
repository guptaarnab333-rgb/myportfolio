"use client";

import { useRef } from "react";
import { animated, to, useSpring } from "@react-spring/web";

type Floater = {
  image: string;
  label: string;
  /** position as % of hero box */
  left: number;
  top: number;
  /** width in px at desktop scale */
  width: number;
  /** parallax depth, higher = moves more with cursor */
  depth: number;
  rotate: number;
  z: number;
};

// Positions mapped from the Figma "Hero — Kinetic" frame (1440×920).
const floaters: Floater[] = [
  { image: "/cases/cs06-gargi.png", label: "CS06 — Gargi Nari Shakti", left: -3.4, top: 8, width: 360, depth: 1.4, rotate: -5, z: 10 },
  { image: "/cases/cs05-uphaar-tea.png", label: "CS05 — Uphaar Tea", left: 76, top: 3, width: 360, depth: 1.7, rotate: 4, z: 10 },
  { image: "/cases/cs08-scout.png", label: "CS08 — Scout", left: 36, top: 20, width: 372, depth: 0.6, rotate: -2, z: 5 },
  { image: "/cases/cs04-isbt-flyover.png", label: "CS04 — ISBT Flyover", left: 2, top: 60, width: 400, depth: 2.1, rotate: 3, z: 20 },
  { image: "/cases/cs01-ignored-user.png", label: "CS01 — Ignored User", left: 70, top: 62, width: 400, depth: 1.9, rotate: -4, z: 20 },
  { image: "/cases/cs02-clutter-comfort.png", label: "CS02 — Clutter to Comfort", left: 46, top: 70, width: 250, depth: 2.6, rotate: 6, z: 30 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ mx, my }, api] = useSpring(() => ({
    mx: 0,
    my: 0,
    config: { mass: 1.1, tension: 120, friction: 28 },
  }));

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    api.start({ mx: nx, my: ny });
  };

  const handleLeave = () => api.start({ mx: 0, my: 0 });

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] items-center justify-center overflow-hidden px-6"
    >
      {/* Floating case-study cards */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {floaters.map((f, i) => (
          <animated.figure
            key={f.label}
            className="absolute will-change-transform"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.width,
              zIndex: f.z,
              transform: to(
                [mx, my],
                (x, y) =>
                  `translate3d(${x * f.depth * 46}px, ${y * f.depth * 46}px, 0) rotate(${f.rotate}deg)`
              ),
              animation: `floatIn 0.9s cubic-bezier(0.22,1,0.36,1) both`,
              animationDelay: `${0.15 + i * 0.08}s`,
            }}
          >
            <div className="overflow-hidden rounded-[3px] border border-edge bg-panel shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.image}
                alt=""
                className="block h-auto w-full select-none object-cover opacity-90"
                draggable={false}
              />
            </div>
            <figcaption className="mt-2 pl-1 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-faint">
              {f.label}
            </figcaption>
          </animated.figure>
        ))}
      </div>

      {/* Center copy */}
      <div className="relative z-40 flex w-full max-w-[1280px] flex-col items-center text-center">
        <h1 className="font-serif text-[clamp(44px,8.5vw,92px)] italic leading-[1.02] tracking-[-0.03em] text-white">
          I make to <span className="text-flame">think; I think</span> to make.
        </h1>
        <p className="mt-6 font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
          Arnab Gupta&nbsp;&nbsp;·&nbsp;&nbsp;Product Designer &amp; Maker
        </p>
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-faint">
        <span className="hidden md:inline">Move your cursor&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        Scroll to enter
      </p>
    </section>
  );
}
