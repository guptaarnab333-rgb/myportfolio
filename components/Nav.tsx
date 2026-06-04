"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  // Smooth-scroll in-page anchors through Lenis; let cross-page links navigate.
  const onNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const hash = href.split("#")[1];
      if (!hash || !lenis) return;
      if (window.location.pathname !== "/") return; // navigate home first
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = variant === "light";

  const scrolledBg = light
    ? "bg-paper/75 backdrop-blur-md border-b border-black/10"
    : "bg-ink/70 backdrop-blur-md border-b border-line/60";

  const logoMain = light ? "text-graphite" : "text-chalk";
  const logoSub = light ? "text-stone" : "text-label";
  const linkColor = light
    ? "text-graphite/80 hover:text-accent"
    : "text-white/90 hover:text-accent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? scrolledBg : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-[64px]">
        <a href="/" className="group flex flex-col leading-[1.04]">
          <span
            className={`font-oswald text-[22px] font-medium tracking-[-0.02em] ${logoMain}`}
          >
            ARNAB
          </span>
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.42em] transition-colors group-hover:text-accent ${logoSub}`}
          >
            Creates
          </span>
        </a>

        <ul className="flex items-center gap-6 md:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={onNavClick(l.href)}
                className={`font-sans text-[17px] font-medium tracking-[-0.02em] transition-colors md:text-[21px] ${linkColor}`}
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
