"use client";

import Reveal from "@/components/Reveal";
import { cases } from "@/components/data";

/* eslint-disable @next/next/no-img-element */

export default function WorksArchive() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-[120px] md:px-16">
      <div className="mb-10 flex items-center justify-between font-mono text-[13px] tracking-[0.1em] text-[#6B6B68]">
        <span>( SELECTED WORK )</span>
        <span>[ 008 ]</span>
      </div>
      <h2 className="mb-12 font-inter text-[clamp(32px,5vw,56px)] font-semibold leading-[1.0] tracking-[-0.03em] text-[#141414]">
        An archive of selected work.
      </h2>

      <div className="border-t border-[#cfcec9]">
        {cases.map((c, i) => {
          const idx = c.index.split("/")[0].trim();
          const target = c.href ?? "#work";
          return (
            <Reveal key={c.index} y={20} delay={i * 40}>
              <a
                href={target}
                className="group flex w-full items-center justify-between gap-6 border-b border-[#cfcec9] py-7"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span className="font-mono text-[13px] text-[#6B6B68]">
                    {idx}
                  </span>
                  <div className="h-[84px] w-[126px] shrink-0 overflow-hidden rounded-[2px] border border-[#cfcec9] bg-[#e7e6e2] md:h-[120px] md:w-[180px]">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div>
                    <h3 className="font-inter text-[clamp(22px,3.2vw,38px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] transition-transform duration-300 group-hover:translate-x-1">
                      {c.title}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-[#6B6B68] md:text-[12px]">
                      // {c.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="hidden font-mono text-[13px] text-[#6B6B68] sm:block">
                    {c.year}
                  </span>
                  <span className="hidden whitespace-nowrap font-inter text-[15px] font-medium text-[#141414] transition-transform duration-300 group-hover:-translate-y-0.5 md:inline">
                    View Project ↗
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
