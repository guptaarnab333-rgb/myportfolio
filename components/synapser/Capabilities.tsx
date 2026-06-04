"use client";

import Reveal from "@/components/Reveal";

const pillars: [string, string, string][] = [
  ["01", "Product Design", "End-to-end product design, from first insight to a resolved, manufacturable form."],
  ["02", "Design Research", "Field observation and user research that puts the ignored user back in the room."],
  ["03", "Prototyping & Making", "Physical prototyping, model-making, and material testing. The idea proven in the hand."],
  ["04", "Brand & Identity", "Identity systems and packaging with a clear voice and a reason to exist."],
];

export default function Capabilities() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-[120px] md:px-16">
      <div className="mb-10 flex items-center justify-between font-sans text-[13px] tracking-[0.1em] text-[#6B6B68]">
        <span>( CAPABILITIES )</span>
        <span>[ 004 ]</span>
      </div>
      <h2 className="mb-12 font-inter text-[clamp(32px,5vw,56px)] font-semibold leading-[1.0] tracking-[-0.03em] text-[#141414]">
        What I do, and how I think.
      </h2>

      <div className="border-t border-[#cfcec9]">
        {pillars.map(([n, title, desc], i) => (
          <Reveal key={n} y={20} delay={i * 50}>
            <div className="flex w-full flex-col gap-3 border-b border-[#cfcec9] py-8 md:flex-row md:items-start md:justify-between md:gap-16">
              <div className="flex items-center gap-7">
                <span className="font-sans text-[13px] text-[#6B6B68]">{n}</span>
                <h3 className="font-inter text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em] text-[#141414]">
                  {title}
                </h3>
              </div>
              <p className="max-w-[520px] font-inter text-[16px] leading-[1.5] tracking-[-0.01em] text-[#6B6B68] md:pt-1">
                {desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
