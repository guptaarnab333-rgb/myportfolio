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
  const [contactOpen, setContactOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          ? "border-b border-black/10 bg-[#f1f0ed]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-6 md:px-16">
        {/* Logo: ARNAB CREATES eye-mark */}
        <a
          href="#top"
          onClick={onClick("#top")}
          aria-label="Arnab Creates — home"
          className="shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arnab-creates-logo.png"
            alt="Arnab Creates"
            className="h-[38px] w-auto"
          />
        </a>

        {/* Menu */}
        <div className="flex items-center gap-6">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={onClick(href)}
              className="font-sans text-[18px] font-medium tracking-[-0.03em] text-[#181717] transition-colors hover:text-[#2429af] md:text-[21px]"
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
