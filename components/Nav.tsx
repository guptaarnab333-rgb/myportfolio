"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-md border-b border-line/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-[64px]">
        <a href="#top" className="group flex flex-col leading-[1.04]">
          <span className="font-oswald text-[22px] font-medium tracking-[-0.02em] text-chalk">
            ARNAB
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-label transition-colors group-hover:text-accent">
            Creates
          </span>
        </a>

        <ul className="flex items-center gap-6 md:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-[17px] font-medium tracking-[-0.02em] text-white/90 transition-colors hover:text-accent md:text-[21px]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
