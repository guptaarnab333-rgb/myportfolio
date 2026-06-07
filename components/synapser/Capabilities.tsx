"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Pillar = {
  n: string;
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
};

const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Product Design",
    tagline: "From first insight to a form that ships",
    desc: "End-to-end product design — concept, ergonomics, and the detailing that makes an object resolved and manufacturable.",
    tags: ["Concept", "Ergonomics", "CMF", "Detailing"],
  },
  {
    n: "02",
    title: "Design Research",
    tagline: "The ignored user, back in the room",
    desc: "Field observation and user research that surfaces the person a product is really for, and what they actually need.",
    tags: ["Field study", "Interviews", "Synthesis", "Insight"],
  },
  {
    n: "03",
    title: "Prototyping & Making",
    tagline: "The idea, proven in the hand",
    desc: "Physical prototyping, model-making, and material testing, so a decision is judged by holding it, not describing it.",
    tags: ["Models", "Materials", "Testing", "Iteration"],
  },
  {
    n: "04",
    title: "Brand & Identity",
    tagline: "A clear voice, and a reason to exist",
    desc: "Identity systems and packaging built around a specific point of view: considered, distinct, unmistakably theirs.",
    tags: ["Identity", "Packaging", "Systems", "Art direction"],
  },
];

export default function Capabilities() {
  const reduced = useReducedMotion();
  const audioRef = useRef<AudioContext | null>(null);

  // Browsers only allow audio after a user gesture — arm the context on the
  // first click/tap/key, then hover clicks can play.
  useEffect(() => {
    if (reduced) return;
    const arm = () => {
      if (!audioRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (Ctx) audioRef.current = new Ctx();
      }
      audioRef.current?.resume().catch(() => {});
    };
    window.addEventListener("pointerdown", arm);
    window.addEventListener("keydown", arm);
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [reduced]);

  // A short synthesized "click/tick" played when a row opens on hover.
  const playClick = () => {
    const ctx = audioRef.current;
    if (!ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(1280, t + 0.025);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  };

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-[72px] md:px-16">
      <div className="mb-10 flex items-center justify-between font-sans text-[13px] tracking-[0.1em] text-[#6B6B68]">
        <span>( CAPABILITIES )</span>
        <span>[ 004 ]</span>
      </div>
      <h2 className="mb-12 font-inter text-[clamp(32px,5vw,56px)] font-semibold leading-[1.0] tracking-[-0.03em] text-[#141414]">
        What I do, and how I think.
      </h2>

      <div className="border-t border-[#cfcec9]">
        {PILLARS.map((p, i) => (
          <Reveal key={p.n} y={16} delay={i * 50}>
            <div
              className="group border-b border-[#cfcec9] px-4 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 md:hover:bg-[#141414]"
              onMouseEnter={() => {
                if (!reduced) playClick();
              }}
            >
              {/* header */}
              <div className="flex items-center justify-between gap-6 py-6 md:py-7">
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="font-sans text-[13px] text-[#6B6B68] transition-colors duration-300 md:group-hover:text-[#9a9a9a]">
                    {p.n}
                  </span>
                  <h3 className="font-inter text-[clamp(22px,3vw,34px)] font-semibold tracking-[-0.02em] text-[#141414] transition-colors duration-300 md:group-hover:text-[#f3f3f3]">
                    {p.title}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="hidden font-sans text-[22px] font-light leading-none text-[#6B6B68] transition-all duration-300 md:block md:group-hover:rotate-45 md:group-hover:text-[#f3f3f3]"
                >
                  +
                </span>
              </div>

              {/* expanding detail (open on mobile; hover-to-open on desktop) */}
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="pb-7 md:pl-[52px]">
                    <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-[#57574f] md:group-hover:text-[#9a9a9a]">
                      {p.tagline}
                    </p>
                    <p className="mt-3 max-w-[640px] font-inter text-[15px] leading-[1.55] tracking-[-0.01em] text-[#3f3f3d] md:text-[16px] md:group-hover:text-[#bcbcba]">
                      {p.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[11px] uppercase tracking-[0.1em] text-[#6B6B68] md:group-hover:text-[#8a8a87]">
                      {p.tags.map((tag, j) => (
                        <span key={tag} className="flex items-center gap-3">
                          {tag}
                          {j < p.tags.length - 1 && (
                            <span className="text-[#cfcec9] md:group-hover:text-[#4a4a48]">
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
