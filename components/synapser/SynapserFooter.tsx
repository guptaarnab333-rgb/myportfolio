"use client";

import Reveal from "@/components/Reveal";

export default function SynapserFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-[1440px] border-t border-[#cfcec9] px-6 pb-12 pt-[100px] md:px-16"
    >
      <Reveal>
        <p className="font-mono text-[13px] tracking-[0.1em] text-[#6B6B68]">
          ( LET&rsquo;S TALK )
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-8 font-inter text-[clamp(40px,8vw,96px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#141414]">
          Let&rsquo;s make
          <br />
          something real.
        </h2>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-14 flex flex-col gap-6 border-b border-[#cfcec9] pb-16 sm:flex-row sm:items-end sm:justify-between">
          <a
            href="mailto:arnab.peoplelab@doonuniversity.ac.in"
            className="font-inter text-[clamp(20px,3vw,28px)] font-medium tracking-[-0.02em] text-[#141414] underline decoration-[#cfcec9] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[#141414]"
          >
            arnab.peoplelab@doonuniversity.ac.in
          </a>
          <span className="font-mono text-[12px] tracking-[0.1em] text-[#6B6B68]">
            ( DRAG TO THROW )
          </span>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4 font-mono text-[13px] tracking-[0.04em] text-[#6B6B68] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 ARNAB GUPTA</span>
        <div className="flex items-center gap-7 text-[#141414]">
          <a
            href="https://www.behance.net/arnabgupta4"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            Behance ↗
          </a>
          <a
            href="https://www.linkedin.com/in/arnab-gupta-2b8256231/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
