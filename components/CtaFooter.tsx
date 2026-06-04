"use client";

import Reveal from "@/components/Reveal";

export default function CtaFooter() {
  return (
    <footer id="contact" className="border-t border-line">
      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-[120px] md:px-[64px]">
        <Reveal>
          <h2 className="max-w-[1000px] font-oswald text-[clamp(36px,6.5vw,84px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
            If you are building something that has to work in the real world,
            let&rsquo;s make it.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-[560px] font-inter text-[18px] leading-[1.55] tracking-[-0.01em] text-muted">
            Open to internships, freelance, and collaborations where the making
            matters as much as the idea.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <a
              href="mailto:arnab.peoplelab@doonuniversity.ac.in"
              className="font-oswald text-[clamp(22px,3vw,34px)] font-light tracking-[-0.02em] text-off underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
            >
              arnab.peoplelab@doonuniversity.ac.in
            </a>
            <a
              href="#"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-sans text-[14px] font-medium tracking-[-0.01em] text-white transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              View résumé <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-6 py-8 font-sans text-[15px] font-medium tracking-[-0.02em] sm:flex-row sm:items-center sm:justify-between md:px-[64px] md:text-[18px]">
          <p className="text-faint">
            Arnab Gupta, Product Designer. Built in 2026.
          </p>
          <div className="flex items-center gap-6 text-white">
            <a
              href="https://www.behance.net/arnabgupta4"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/in/arnab-gupta-2b8256231/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
