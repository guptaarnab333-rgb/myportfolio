"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Shot = { src: string; alt: string };

// A documentary mix of real renders + process shots across the work.
const shots: Shot[] = [
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/hero-context.png?tr=orig-true", alt: "Solar water purifier standing on a construction site" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06-gargi.png?tr=orig-true", alt: "Gargi Nari Shakti identity collage" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/sketch.png?tr=orig-true", alt: "Sketch progression for the water purifier form" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05-uphaar-tea.png?tr=orig-true", alt: "Uphaar festive tea packaging" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/exploded.png?tr=orig-true", alt: "Exploded view of the purifier components" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07-biroti-cafe.png?tr=orig-true", alt: "Biroti Café brand mockups" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/explorations.png?tr=orig-true", alt: "Early form-exploration sketches" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02-clutter-comfort.png?tr=orig-true", alt: "Shared studio desk organizer in use" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/mech-paddle.png?tr=orig-true", alt: "Foot-paddle dispensing mechanism detail" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04-isbt-flyover.png?tr=orig-true", alt: "Reclaimed public space under the ISBT flyover" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/final-hero.png?tr=orig-true", alt: "Final purifier render, front three-quarter" },
  { src: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs08-scout.png?tr=orig-true", alt: "Scout research-agent interface" },
];

export default function WorkGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const figs = ref.current?.querySelectorAll("figure");
      if (!figs) return;
      gsap.from(figs, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    },
    { dependencies: [reduced] }
  );

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-[120px] md:px-[64px]">
      <h2 className="mb-12 max-w-[820px] font-oswald text-[clamp(28px,4.4vw,56px)] font-light leading-[1.0] tracking-[-0.03em] text-white">
        Made by hand and by machine. The process is the proof.
      </h2>

      <div ref={ref} className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {shots.map((s) => (
          <figure
            key={s.src}
            className="group mb-4 break-inside-avoid overflow-hidden rounded-[3px] border border-edge bg-panel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="block w-full transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:brightness-110"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
