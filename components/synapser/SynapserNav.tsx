"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const links: [string, string][] = [
  ["001 / Work", "#work"],
  ["002 / About", "#about"],
  ["003 / Contact", "#contact"],
];

export default function SynapserNav() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(href.slice(1));
      if (el && lenis) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -60 });
      }
    };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-black/10 bg-[#f1f0ed]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-16">
        <a
          href="#top"
          onClick={onClick("#top")}
          className="font-inter text-[15px] font-semibold tracking-[-0.01em] text-[#141414]"
        >
          Arnab Gupta©
        </a>
        <div className="flex items-center gap-6 md:gap-10">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={onClick(href)}
              className="font-mono text-[13px] text-[#141414] transition-opacity hover:opacity-60"
            >
              {label}
            </a>
          ))}
          <span className="hidden font-mono text-[13px] text-[#6B6B68] sm:block">
            EN
          </span>
        </div>
      </nav>
    </header>
  );
}
