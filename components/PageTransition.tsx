"use client";

import { useEffect, useRef } from "react";

/**
 * A full-screen curtain that smooths navigation between pages.
 *
 * The site is a static export, so every internal link is a full document load —
 * which flashes, and (when landing on `/#work` from a case study) visibly snaps
 * from the hero down to the section. This curtain covers the screen during the
 * hand-off so both the flash and the scroll-snap happen hidden, then fades away
 * to reveal the page already in its final position.
 *
 * - Reveal (fade out on arrival): pure CSS, gated on `html.intro-skip`, so it
 *   only runs on in-session navigation. The Preloader owns the first-visit
 *   reveal, so the two never collide.
 * - Cover (fade in on exit): this component intercepts internal link clicks,
 *   draws the curtain, then performs the navigation a beat later.
 */
export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: keep navigation instant, no curtain.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const href = a.getAttribute("href");
      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      )
        return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external
      if (url.pathname === window.location.pathname) return; // in-page anchor → Lenis

      // Real page navigation: draw the curtain, then go.
      e.preventDefault();
      el.style.display = "block";
      void el.offsetWidth; // force reflow so the fade-in actually runs
      el.classList.add("pt-leaving");
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 340);
    };

    // Back/forward cache restores the page exactly as it left — with the
    // curtain fully drawn from the exit above. Lift it so the page isn't
    // permanently black after the browser's Back button.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      el.classList.remove("pt-leaving");
      el.style.display = "none";
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return <div ref={ref} aria-hidden className="page-transition" />;
}
