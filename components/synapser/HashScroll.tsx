"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Honors a `#section` hash when the homepage loads from another page (e.g.
 * clicking "Work" or "About" inside a case study navigates to `/#work`).
 *
 * Lenis drives its own scroll position, so the browser's native hash jump gets
 * overridden and the page lands at the hero. This reads the hash after mount
 * and scrolls to the target through Lenis instead — waiting a frame so layout
 * and the intro hand-off have settled.
 */
/**
 * True when this page view is a manual refresh (vs. an in-session navigation
 * from another page). On a refresh the intro replays and the page should reopen
 * at the hero, so a remembered `#section` hash must be ignored.
 */
function isReload(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav) return nav.type === "reload";
    // Legacy fallback.
    const legacy = (performance as unknown as { navigation?: { type: number } })
      .navigation;
    return legacy?.type === 1;
  } catch {
    return false;
  }
}

export default function HashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    // On a manual refresh the intro replays and the page reopens at the hero —
    // strip the leftover hash and bail so we don't snap back to the remembered
    // section. (Only in-session navigation should honour the hash.)
    if (isReload()) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
      return;
    }

    let cancelled = false;

    const scrollToHash = () => {
      if (cancelled) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -60, immediate: true, force: true });
      } else {
        el.scrollIntoView();
      }
    };

    // The intro preloader may briefly lock scroll / snap to top on first paint;
    // run after it releases (preloader:done) and also on a short fallback timer
    // for the skip-intro path where that event never fires.
    const onDone = () => requestAnimationFrame(scrollToHash);
    window.addEventListener("preloader:done", onDone);
    const t = window.setTimeout(scrollToHash, 250);

    return () => {
      cancelled = true;
      window.removeEventListener("preloader:done", onDone);
      window.clearTimeout(t);
    };
  }, [lenis]);

  return null;
}
