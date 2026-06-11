"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import MediaSection from "@/components/media/MediaSection";
import { ScrollTrigger } from "@/lib/gsap";
import { cases } from "@/components/data";

/* eslint-disable @next/next/no-img-element */

/** How many projects to surface before "View more projects" reveals the rest. */
const VISIBLE = 4;

export default function WorksArchive() {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? cases : cases.slice(0, VISIBLE);
  const total = String(cases.length).padStart(3, "0");

  // Expanding/collapsing the grid changes the page height, which shifts the
  // work→about boundary. Re-measure the scroll-fade trigger so the dark→light
  // backdrop stays aligned — otherwise the fade completes early and the
  // "Show less" button renders as white text on the light backdrop.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [showAll]);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 pb-[72px] pt-[120px] md:px-16">
      <div className="mb-10 flex items-center justify-between font-sans text-[13px] tracking-[0.1em] text-[#9a9a9a]">
        <span>( SELECTED WORK )</span>
        <span>[ {total} ]</span>
      </div>
      <h2 className="mb-12 font-inter text-[clamp(32px,5vw,56px)] font-semibold leading-[1.0] tracking-[-0.03em] text-[#f3f3f3]">
        An archive of selected work.
      </h2>

      {/* Horizontal grid — 4 cards side by side on desktop. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((c, i) => {
          const idx = c.index.split("/")[0].trim();
          const target = c.href ?? "#work";
          return (
            <Reveal key={c.index} y={24} delay={(i % VISIBLE) * 60}>
              <a href={target} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-[#2e2e2e] bg-[#222222]">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    style={c.position ? { objectPosition: c.position } : undefined}
                    className="h-full w-full object-cover grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
                  />
                  {/* Hover veil + jump-off cue */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute right-3 top-3 translate-y-1 font-inter text-[12px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View ↗
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-inter text-[18px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#f3f3f3] transition-transform duration-300 group-hover:translate-x-1">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[11px] tracking-[0.04em] text-[#9a9a9a]">
                      // {c.category}
                    </p>
                  </div>
                  <span className="shrink-0 font-sans text-[12px] text-[#9a9a9a]">
                    {idx}
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      {cases.length > VISIBLE && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="group inline-flex items-center gap-3 rounded-full border border-[#f3f3f3]/30 px-7 py-3 font-inter text-[14px] font-medium text-[#f3f3f3] transition-colors duration-300 hover:border-[#f3f3f3] hover:bg-[#f3f3f3] hover:text-[#0a0a0a]"
          >
            {showAll ? "Show less" : "View more projects"}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              {showAll ? "↑" : "↗"}
            </span>
          </button>
        </div>
      )}

      {/* Photographs & films — the pile opens a full-screen media browser. */}
      <Reveal y={28}>
        <MediaSection />
      </Reveal>
    </section>
  );
}
