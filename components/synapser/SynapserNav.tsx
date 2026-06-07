"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import ContactOverlay from "./ContactOverlay";

const links: [string, string][] = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function SynapserNav() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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
  }, []);

  const onClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Contact opens the overlay instead of scrolling.
      if (href === "#contact") {
        e.preventDefault();
        setContactOpen(true);
        return;
      }
      const el = document.getElementById(href.slice(1));
      if (el && lenis) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -60 });
      }
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
            href="#top"
            onClick={onClick("#top")}
            aria-label="Arnab Creates — home"
            className="relative shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arnab-creates-logo.png"
              alt="Arnab Creates"
              className={`h-[38px] w-auto transition-opacity duration-500 ${
                overDark ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arnab-creates-logo-dark.png"
              alt=""
              aria-hidden
              className={`absolute left-0 top-0 h-[38px] w-auto transition-opacity duration-500 ${
                overDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>

          {/* Menu */}
          <div className="flex items-center gap-6">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={onClick(href)}
                className={`font-sans text-[18px] font-medium tracking-[-0.03em] transition-colors duration-300 hover:text-[#2429af] md:text-[21px] ${
                  overDark ? "text-[#f3f3f3]" : "text-[#181717]"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
