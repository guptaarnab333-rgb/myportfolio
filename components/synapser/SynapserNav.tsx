"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import ContactOverlay from "./ContactOverlay";

const links: [string, string][] = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const SOCIALS: [string, string][] = [
  ["Behance", "https://www.behance.net/arnabgupta4"],
  ["LinkedIn", "https://www.linkedin.com/in/arnab-gupta-2b8256231/"],
];

export default function SynapserNav({
  /**
   * On the homepage the nav rides the dark→light seam and flips theme on
   * scroll. On sub-pages (e.g. a light case study) there's no seam, so pass a
   * fixed theme and the nav stays that colour. In-page anchors then resolve to
   * the homepage instead of scrolling the current page.
   */
  theme,
}: {
  theme?: "light" | "dark";
} = {}) {
  const fixed = theme !== undefined;
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(theme ? theme === "dark" : true);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // On a fixed-theme sub-page there's no seam to track; keep the theme.
      if (fixed) return;
      // The nav rides the dark world until it passes the midpoint of the
      // dark→light seam, then flips to the light theme.
      const seam = document.getElementById("seam");
      if (seam) {
        const boundary = seam.offsetTop + seam.offsetHeight * 0.45;
        setOverDark(y + 40 < boundary);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [fixed]);

  // While the mobile menu is open: lock scroll, close on Escape, and close if
  // the viewport grows past the breakpoint where the inline links return.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.removeProperty("overflow");
    };
  }, [menuOpen]);

  const onClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Contact opens the overlay instead of scrolling.
      if (href === "#contact") {
        e.preventDefault();
        setMenuOpen(false);
        setContactOpen(true);
        return;
      }
      // On a sub-page, let in-page anchors fall through to a real navigation
      // back to the homepage section (the href is rewritten to /#… below).
      const el = document.getElementById(href.replace(/^\/?#/, ""));
      if (el && lenis) {
        e.preventDefault();
        setMenuOpen(false);
        lenis.scrollTo(el, { offset: -60 });
        return;
      }
      setMenuOpen(false);
    };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? overDark
              ? "border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-md"
              : "border-b border-black/10 bg-[#f1f0ed]/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-6 md:px-16">
          {/* Logo: crossfades between the light and dark-mode marks as the
              background morphs (dark mark over hero + work, dark over the
              light about + contact). */}
          <a
            href={fixed ? "/" : "#top"}
            onClick={onClick(fixed ? "/" : "#top")}
            aria-label="Arnab Creates — home"
            className="relative shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arnab-creates-logo.webp"
              alt="Arnab Creates"
              className={`h-[38px] w-auto transition-opacity duration-500 ${
                overDark ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arnab-creates-logo-dark.webp"
              alt=""
              aria-hidden
              className={`absolute left-0 top-0 h-[38px] w-auto transition-opacity duration-500 ${
                overDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>

          {/* Inline menu (tablet and up) */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={fixed && href !== "#contact" ? `/${href}` : href}
                onClick={onClick(href)}
                className={`font-sans text-[18px] font-medium tracking-[-0.03em] transition-colors duration-300 hover:text-[#2429af] md:text-[21px] ${
                  overDark ? "text-[#f3f3f3]" : "text-[#181717]"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger (phones) — opens the full-screen menu below */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`-mr-2 flex h-11 w-11 items-center justify-center md:hidden ${
              overDark ? "text-[#f3f3f3]" : "text-[#181717]"
            }`}
          >
            <span className="flex flex-col items-end gap-[6px]">
              <span className="block h-[1.5px] w-[22px] bg-current transition-colors duration-500" />
              <span className="block h-[1.5px] w-[14px] bg-current transition-colors duration-500" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu: same radial wipe and dark surface as the contact
          overlay, so opening anything from the nav corner is one gesture.
          Sits below ContactOverlay (z-60) so Contact can open on top. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className="fixed inset-0 z-[55] bg-[#141414] text-[#f1f0ed] md:hidden"
        style={{
          clipPath: menuOpen
            ? "circle(150% at 92% 40px)"
            : "circle(0% at 92% 40px)",
          transition: reduced
            ? "none"
            : "clip-path 0.85s cubic-bezier(0.76,0,0.24,1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex h-full flex-col px-6 py-6">
          {/* top bar mirrors the header: logo returns to the page, cross closes */}
          <div className="flex h-[56px] items-center justify-between">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Arnab Creates — back to page"
              className="shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arnab-creates-logo-dark.webp"
                alt="Arnab Creates"
                className="h-[38px] w-auto"
              />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white/70"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
              </span>
            </button>
          </div>

          {/* the three destinations, placard-sized like case titles */}
          <nav aria-label="Menu" className="flex flex-1 flex-col justify-center">
            {links.map(([label, href], i) => (
              <a
                key={href}
                href={fixed && href !== "#contact" ? `/${href}` : href}
                onClick={onClick(href)}
                className="py-3 font-oswald text-[clamp(44px,13vw,64px)] font-normal leading-[1.08] tracking-[-0.02em] text-[#f1f0ed]"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(28px)",
                  transition: reduced
                    ? "none"
                    : menuOpen
                      ? `opacity 0.5s ease ${0.22 + i * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.22 + i * 0.07}s`
                      : "opacity 0.2s ease, transform 0.2s ease",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* quiet bottom bar, matching the contact overlay's */}
          <div
            className="flex items-center gap-7 border-t border-white/12 pt-6 font-sans text-[14px] tracking-[-0.01em]"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: reduced
                ? "none"
                : menuOpen
                  ? "opacity 0.5s ease 0.45s"
                  : "opacity 0.2s ease",
            }}
          >
            {SOCIALS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-[#f1f0ed] transition-colors hover:text-[#9aa0ff]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
