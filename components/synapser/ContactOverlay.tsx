"use client";

import { useEffect } from "react";

const SOCIALS: [string, string][] = [
  ["Behance", "https://www.behance.net/arnabgupta4"],
  ["LinkedIn", "https://www.linkedin.com/in/arnab-gupta-2b8256231/"],
];

/**
 * Podium-style contact overlay: reveals with a radial clip-path wipe from the
 * nav, holds the contact details, and collapses back when the cross is clicked
 * (or Escape). Locks scroll while open.
 */
export default function ContactOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.removeProperty("overflow");
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[60] bg-[#141414] text-[#f1f0ed]"
      style={{
        clipPath: open
          ? "circle(150% at 92% 40px)"
          : "circle(0% at 92% 40px)",
        transition: "clip-path 0.85s cubic-bezier(0.76,0,0.24,1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] flex-col px-6 py-6 md:px-16">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-white/45">
            ( Contact )
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white/70"
          >
            <span className="relative block h-4 w-4 transition-transform duration-500 group-hover:rotate-90">
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
            </span>
          </button>
        </div>

        {/* content */}
        <div
          className="flex flex-1 flex-col justify-center"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(24px)",
            transition: open
              ? "opacity 0.6s ease 0.28s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s"
              : "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-white/45">
            Get in touch
          </p>
          <h2 className="mt-6 max-w-[900px] font-serif text-[clamp(40px,8vw,104px)] italic leading-[0.98] tracking-[-0.01em]">
            Let&rsquo;s make
            <br />
            something real.
          </h2>
          <a
            href="mailto:arnab.peoplelab@doonuniversity.ac.in"
            className="mt-12 inline-block font-inter text-[clamp(20px,3.4vw,36px)] font-medium tracking-[-0.02em] text-[#f1f0ed] underline decoration-white/25 decoration-1 underline-offset-[8px] transition-colors hover:text-white hover:decoration-[#9aa0ff]"
          >
            arnab.peoplelab@doonuniversity.ac.in
          </a>
        </div>

        {/* bottom bar */}
        <div
          className="flex flex-col gap-5 border-t border-white/12 pt-7 font-sans text-[14px] tracking-[-0.01em] sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: open ? 1 : 0,
            transition: open ? "opacity 0.6s ease 0.42s" : "opacity 0.2s ease",
          }}
        >
          <div className="text-white/55">
            <p className="font-medium uppercase tracking-[0.18em] text-white/40">
              Based in
            </p>
            <p className="mt-2 text-[16px] text-[#f1f0ed]">
              Dehradun, IN · Available for work
            </p>
          </div>
          <div className="flex items-center gap-7">
            {SOCIALS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-[16px] text-[#f1f0ed] transition-colors hover:text-[#9aa0ff]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
