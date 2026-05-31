"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import type { CaseStudy as CaseStudyType } from "./data";

export default function CaseStudy({
  data,
  flip,
}: {
  data: CaseStudyType;
  flip: boolean;
}) {
  const [hover, setHover] = useState(false);
  const target = data.href ?? "#work";

  return (
    <article className="border-b border-line">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1.55fr_1fr] md:gap-16 md:py-[40px]">
        {/* Cover */}
        <Reveal
          className={flip ? "md:order-2" : "md:order-1"}
          y={36}
        >
          <a
            href={target}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group relative block aspect-[640/460] w-full overflow-hidden rounded-[2px] border border-edge bg-panel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
            <span className="absolute bottom-4 left-5 z-10 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-faint mix-blend-screen">
              {data.label}
            </span>
          </a>
        </Reveal>

        {/* Copy */}
        <Reveal
          className={flip ? "md:order-1" : "md:order-2"}
          delay={120}
          y={24}
        >
          <div className="max-w-[400px]">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-label">
              {data.index}
              <span className="mx-2 text-line">·</span>
              {data.year}
            </p>

            <h3 className="mt-4 font-oswald text-[clamp(34px,5vw,56px)] font-normal leading-[1.0] tracking-[-0.03em] text-white">
              {data.title}
            </h3>

            <p className="mt-5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              {data.category}
            </p>

            <p className="mt-4 font-inter text-[17px] leading-[1.5] tracking-[-0.01em] text-muted">
              {data.blurb}
            </p>

            <a
              href={target}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="mt-8 inline-flex items-center gap-3 font-inter text-[15px] font-medium tracking-[-0.01em] text-white"
            >
              READ CASE STUDY
              <span
                className="inline-block transition-transform duration-300"
                style={{ transform: hover ? "translateX(6px)" : "translateX(0)" }}
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
