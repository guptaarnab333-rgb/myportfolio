"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { photos as photoData, photoURL, films, type MediaFilm } from "./data";

/**
 * Media — photographs & films, living inside the Work section.
 *
 * A pile of prints sits under the case grid. Clicking it takes over the
 * screen: the prints scatter outward (blurred, greyed) behind two choices —
 * PHOTOS and VIDEOS. Photos is a full-screen viewer (scroll / swipe / arrows,
 * dot rail on the left, captions that fade after a beat, newest first).
 * Videos is a cinema: poster + synopsis, then a chrome-less player.
 */

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const WIPE = "cubic-bezier(0.76,0,0.24,1)";

/* Deterministic print layouts — % offsets from centre, rotation, width vw. */
const SCATTER: [number, number, number, number][] = [
  [-38, -30, -10, 16],
  [30, -34, 7, 18],
  [-12, -38, 4, 14],
  [42, 6, -6, 15],
  [-44, 14, 8, 17],
  [12, 34, -8, 16],
  [-22, 36, 12, 13],
  [36, 36, -14, 14],
];
const PILE: [number, number, number, number][] = [
  [-16, -6, -9, 13],
  [12, -10, 6, 14],
  [-4, 2, 2, 12],
  [18, 6, -5, 12],
  [-20, 8, 7, 13],
  [4, 12, -3, 12],
  [-8, -14, 11, 11],
  [22, -2, -12, 11],
];

type Phase = "menu" | "photos" | "videos";

export default function MediaSection() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 380);
  }, []);

  return (
    <>
      {/* ---------- The pile (entry tile) ---------- */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group relative mt-16 block h-[240px] w-full overflow-hidden rounded-[2px] border border-[#2e2e2e] bg-[#141414] md:h-[300px]"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          {photoData.slice(0, 8).map((p, i) => {
            const [x, y, r, w] = PILE[i % PILE.length];
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.src}
                src={photoURL(p.src, 480, 75)}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute left-1/2 top-1/2 rounded-[2px] border border-[#2e2e2e] grayscale transition-[filter] duration-700 group-hover:grayscale-[0.4]"
                style={{
                  width: `clamp(90px, ${w}vw, 200px)`,
                  transform: `translate(calc(-50% + ${x * 2.4}px), calc(-50% + ${y * 2.2}px)) rotate(${r}deg)`,
                }}
              />
            );
          })}
        </div>
        {/* veil + label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9aa0ff]">
            Media
          </p>
          <p className="mt-3 font-oswald text-[clamp(26px,4.5vw,40px)] leading-none tracking-[-0.02em] text-[#f3f3f3]">
            Photographs &amp; films
          </p>
          <p className="mt-4 font-inter text-[12px] font-medium text-[#9a9a9a] transition-colors duration-300 group-hover:text-[#f3f3f3]">
            Click to open
          </p>
        </div>
      </button>

      {/* Portal to <body>: the Reveal wrapper around this section carries a
          transform, which would otherwise become the containing block for
          this fixed overlay and trap it inside the band. */}
      {open &&
        createPortal(
          <MediaOverlay reduced={reduced} closing={closing} onClose={close} />,
          document.body
        )}
    </>
  );
}

/* ====================================================================== */

function MediaOverlay({
  reduced,
  closing,
  onClose,
}: {
  reduced: boolean;
  closing: boolean;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("menu");
  const [entered, setEntered] = useState(false);
  // True while the chrome-less film player is up — the overlay's own top bar
  // hides and Escape is handled by the player (exit film, not the phase).
  const [playerActive, setPlayerActive] = useState(false);

  // Two-frame mount so the scatter transition actually animates.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll lock + Escape steps back one layer.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (playerActive) return; // the film player owns Escape while it's up
      if (phase === "menu") onClose();
      else setPhase("menu");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, playerActive, onClose]);

  const showMenu = phase === "menu";
  const spread = entered && !closing;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media — photographs and films"
      className="fixed inset-0 z-[70] overflow-hidden bg-[#0a0a0a]"
      style={{
        opacity: closing ? 0 : 1,
        transition: reduced ? "none" : `opacity 0.35s ease`,
      }}
    >
      {/* ---------- scattered prints backdrop (menu only) ---------- */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: showMenu ? 1 : 0,
          transition: reduced ? "none" : `opacity 0.5s ease`,
          pointerEvents: "none",
        }}
      >
        {photoData.slice(0, 8).map((p, i) => {
          const [sx, sy, sr, sw] = SCATTER[i % SCATTER.length];
          const [px, py, pr] = PILE[i % PILE.length];
          const on = spread && showMenu;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.src}
              src={photoURL(p.src, 640, 70)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute left-1/2 top-1/2 rounded-[2px] border border-[#2e2e2e]"
              style={{
                width: `clamp(110px, ${sw}vw, 280px)`,
                transform: on
                  ? `translate(calc(-50% + ${sx}vw), calc(-50% + ${sy}vh)) rotate(${sr}deg)`
                  : `translate(calc(-50% + ${px * 2}px), calc(-50% + ${py * 2}px)) rotate(${pr}deg)`,
                filter: "blur(7px) grayscale(1) brightness(0.45)",
                transition: reduced
                  ? "none"
                  : `transform 0.9s ${EASE} ${i * 45}ms`,
              }}
            />
          );
        })}
      </div>

      {/* ---------- top bar (hidden while a film plays) ---------- */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex h-[80px] items-center justify-between px-6 transition-opacity duration-400 md:px-16"
        style={{
          opacity: playerActive ? 0 : 1,
          pointerEvents: playerActive ? "none" : "auto",
        }}
      >
        <div className="flex items-center gap-4">
          {phase !== "menu" && (
            <button
              type="button"
              onClick={() => setPhase("menu")}
              aria-label="Back to media menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[#f3f3f3] transition-colors duration-300 hover:border-white/70"
            >
              <span aria-hidden className="text-[18px] leading-none">←</span>
            </button>
          )}
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a]">
            {phase === "menu"
              ? "Media"
              : phase === "photos"
                ? "Media · Photos"
                : "Media · Videos"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close media"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white/70"
        >
          <span className="relative block h-4 w-4 transition-transform duration-500 group-hover:rotate-90">
            <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
          </span>
        </button>
      </div>

      {/* ---------- menu CTAs ---------- */}
      {showMenu && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 sm:flex-row sm:gap-8">
          {(
            [
              ["Photos", "photos", `${photoData.length} photographs`],
              ["Videos", "videos", `${films.length} ${films.length === 1 ? "film" : "films"}`],
            ] as [string, Phase, string][]
          ).map(([label, target, sub], i) => (
            <button
              key={target}
              type="button"
              onClick={() => setPhase(target)}
              className="group w-full max-w-[320px] rounded-full border border-white/25 px-10 py-6 text-center transition-colors duration-300 hover:border-white hover:bg-[#f3f3f3] sm:w-auto sm:min-w-[260px]"
              style={{
                opacity: spread ? 1 : 0,
                transform: spread ? "translateY(0)" : "translateY(24px)",
                transition: reduced
                  ? "none"
                  : `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.6s ${EASE} ${0.3 + i * 0.08}s, background-color 0.3s, border-color 0.3s`,
              }}
            >
              <span className="block font-oswald text-[clamp(30px,5vw,44px)] leading-none tracking-[-0.02em] text-[#f3f3f3] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                {label}
              </span>
              <span className="mt-2 block font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a] transition-colors duration-300 group-hover:text-[#606060]">
                {sub}
              </span>
            </button>
          ))}
        </div>
      )}

      {phase === "photos" && <PhotoViewer reduced={reduced} />}
      {phase === "videos" && <VideoViewer onPlayerChange={setPlayerActive} />}
    </div>
  );
}

/* ====================================================================== */

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function PhotoViewer({ reduced }: { reduced: boolean }) {
  // Photos show in the order they're listed in data.ts.
  const photos = photoData;
  const [index, setIndex] = useState(0);
  const [captionOn, setCaptionOn] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const cooldown = useRef(0);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => Math.min(photos.length - 1, Math.max(0, i + dir)));
    },
    [photos.length]
  );

  // Wheel / touch / arrows move between photos. The page behind is locked,
  // so the wheel is ours; a cooldown keeps one flick = one photo.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - cooldown.current < 550 || Math.abs(e.deltaY) < 12) return;
      cooldown.current = now;
      go(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 48) go(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  // Caption shows on every landing, then quietly leaves.
  useEffect(() => {
    setCaptionOn(true);
    const id = window.setTimeout(() => setCaptionOn(false), 2800);
    return () => window.clearTimeout(id);
  }, [index]);

  const current = photos[index];

  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* photographs, crossfading in place */}
      {photos.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.src}
          src={photoURL(p.src, 2560, 95)}
          alt={i === index ? p.title : ""}
          loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
          decoding="async"
          className="absolute left-1/2 top-1/2 max-h-[76vh] max-w-[88vw] rounded-[2px] object-contain shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:max-h-[80vh] md:max-w-[80vw]"
          style={{
            transform: `translate(-50%, calc(-50% + ${
              i === index ? 0 : i > index ? 36 : -36
            }px))`,
            opacity: i === index ? 1 : 0,
            transition: reduced
              ? "opacity 0.15s ease"
              : `opacity 0.55s ease, transform 0.7s ${EASE}`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* dot rail */}
      <div
        className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5 md:left-8"
        role="tablist"
        aria-label="Photos"
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Photo ${i + 1} of ${photos.length}: ${p.title}`}
            onClick={() => setIndex(i)}
            className="flex h-4 w-4 items-center justify-center"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === index ? 7 : 5,
                height: i === index ? 7 : 5,
                background:
                  i === index ? "#f3f3f3" : "rgba(243,243,243,0.28)",
              }}
            />
          </button>
        ))}
      </div>

      {/* index counter */}
      <p className="absolute right-6 top-[92px] font-sans text-[11px] font-medium tracking-[0.18em] text-[#9a9a9a] md:right-16">
        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </p>

      {/* caption — name · place · date, gone after a beat */}
      <div
        className="pointer-events-none absolute bottom-8 left-6 md:bottom-12 md:left-12"
        style={{
          opacity: captionOn ? 1 : 0,
          transform: captionOn ? "translateY(0)" : "translateY(8px)",
          transition: reduced
            ? "opacity 0.15s ease"
            : `opacity 0.5s ease, transform 0.5s ${EASE}`,
        }}
      >
        <p className="font-inter text-[15px] font-medium tracking-[-0.01em] text-[#f3f3f3]">
          {current.title}
        </p>
        {(current.place || current.date) && (
          <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a]">
            {[current.place, current.date && fmtDate(current.date)]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

/* ====================================================================== */

function VideoViewer({
  onPlayerChange,
}: {
  onPlayerChange: (on: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlayingState] = useState(false);
  const film = films[index];

  const setPlaying = useCallback(
    (on: boolean) => {
      setPlayingState(on);
      onPlayerChange(on);
    },
    [onPlayerChange]
  );
  // Leaving the videos phase mid-film must hand the top bar back.
  useEffect(() => () => onPlayerChange(false), [onPlayerChange]);

  // While the film plays, Escape exits the player (the overlay defers).
  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, setPlaying]);

  // Scroll / swipe switches films while the poster is up (no-op with one).
  const rootRef = useRef<HTMLDivElement>(null);
  const cooldown = useRef(0);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (playing || films.length < 2) return;
      const now = Date.now();
      if (now - cooldown.current < 650 || Math.abs(e.deltaY) < 12) return;
      cooldown.current = now;
      setIndex((i) =>
        Math.min(films.length - 1, Math.max(0, i + (e.deltaY > 0 ? 1 : -1)))
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [playing]);

  return (
    <div ref={rootRef} className="absolute inset-0 bg-black">
      {playing ? (
        <Player
          key={film.src}
          film={film}
          onExit={() => setPlaying(false)}
          onSwipe={
            films.length > 1
              ? (dir) =>
                  setIndex((i) =>
                    Math.min(films.length - 1, Math.max(0, i + dir))
                  )
              : undefined
          }
        />
      ) : (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={film.poster}
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: 0.85 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

          {/* play — the one action on screen */}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${film.title}`}
            className="group absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 transition-all duration-300 hover:border-white hover:bg-[#f3f3f3] md:h-[88px] md:w-[88px]"
          >
            <span
              aria-hidden
              className="ml-1 block border-y-[9px] border-l-[14px] border-y-transparent border-l-white transition-colors duration-300 group-hover:border-l-[#0a0a0a]"
            />
          </button>

          {/* the description over the hero, before play */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-16 md:pb-14">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a]">
              Documentary · {film.year} · {film.runtime}
            </p>
            <h3 className="mt-3 font-oswald text-[clamp(40px,7vw,72px)] leading-[1.02] tracking-[-0.02em] text-[#f3f3f3]">
              {film.title}
            </h3>
            <p className="mt-4 max-w-[560px] font-inter text-[15px] leading-[1.55] tracking-[-0.01em] text-[#f3f3f3]/75 md:text-[16px]">
              {film.synopsis}
            </p>
            <p className="mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#606060]">
              {film.role}
            </p>
          </div>

          {/* Dot rail, same as the photo viewer: one dot per film, scroll or
              tap to move. Left rail = "where you are" across both viewers. */}
          {films.length > 1 && (
            <div
              className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5 md:left-8"
              role="tablist"
              aria-label="Films"
            >
              {films.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Film ${i + 1} of ${films.length}: ${f.title}`}
                  onClick={() => setIndex(i)}
                  className="flex h-4 w-4 items-center justify-center"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 7 : 5,
                      height: i === index ? 7 : 5,
                      background:
                        i === index ? "#f3f3f3" : "rgba(243,243,243,0.28)",
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const fmtTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* Chrome-less player. The film is the page; the chrome is a thin interactive
   progress rail on the left, a close on the right, and a quiet text-control
   line at the bottom. The wheel scrubs the timeline forward and back. */
function Player({
  film,
  onExit,
  onSwipe,
}: {
  film: MediaFilm;
  onExit: () => void;
  /** Phone gesture: horizontal swipe moves to the next / previous film. */
  onSwipe?: (dir: 1 | -1) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touch = useRef({ x: 0, y: 0, moved: false, onControls: false });
  const firstInfo = useRef(true);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("00:00");
  const [length, setLength] = useState("00:00");
  const [infoOn, setInfoOn] = useState(true);

  // Start playback explicitly — the autoplay attribute alone is at the mercy
  // of browser policy. If unmuted play is refused, start muted instead.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPaused(true));
    });
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    // play() can be interrupted by a pause or unmount; that's fine, but the
    // rejection must be consumed or it surfaces as an unhandled error.
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  // Fullscreen rotates phones to landscape so a horizontal film fills the
  // screen. iPhones can't fullscreen a div, so fall back to the video
  // element's native fullscreen (which rotates by itself).
  const fullscreen = async () => {
    const el = wrapRef.current;
    const v = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      if (el?.requestFullscreen) {
        await el.requestFullscreen();
        const orientation = screen.orientation as unknown as {
          lock?: (o: string) => Promise<void>;
        };
        await orientation.lock?.("landscape").catch(() => {});
      } else if (v?.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    } catch {
      /* fullscreen refused — nothing to do */
    }
  };

  // Wheel scrubs: down moves the film forward, up rewinds.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation(); // keep the film-switch wheel in VideoViewer quiet
      const v = videoRef.current;
      if (!v || !v.duration) return;
      v.currentTime = Math.min(
        v.duration,
        Math.max(0, v.currentTime + e.deltaY * 0.015)
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Left rail seeking (desktop) — click or drag anywhere along it.
  const seekFromY = (clientY: number) => {
    const v = videoRef.current;
    const rail = railRef.current;
    if (!v || !rail || !v.duration) return;
    const r = rail.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    v.currentTime = f * v.duration;
    setProgress(f);
  };

  // Bottom bar seeking (phones).
  const seekFromX = (clientX: number) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const r = bar.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.currentTime = f * v.duration;
    setProgress(f);
  };

  // Phone info card: shown on entry, fades once the film settles, and comes
  // back whenever the viewer pauses to read.
  useEffect(() => {
    if (paused) {
      setInfoOn(true);
      return;
    }
    const t = window.setTimeout(
      () => setInfoOn(false),
      firstInfo.current ? 3600 : 900
    );
    firstInfo.current = false;
    return () => window.clearTimeout(t);
  }, [paused]);

  // Horizontal swipe = next / previous film, like shorts. Swipes that start
  // on the control row (or that are really vertical) don't count, and a
  // swipe must not fall through as a tap on the video.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = {
      x: t.clientX,
      y: t.clientY,
      moved: false,
      onControls: !!(e.target as HTMLElement).closest("[data-controls]"),
    };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (
      Math.abs(t.clientX - touch.current.x) > 10 ||
      Math.abs(t.clientY - touch.current.y) > 10
    )
      touch.current.moved = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (
      onSwipe &&
      !touch.current.onControls &&
      Math.abs(dx) > 60 &&
      Math.abs(dx) > Math.abs(dy) * 1.5
    )
      onSwipe(dx < 0 ? 1 : -1);
  };
  const videoClick = () => {
    if (touch.current.moved) {
      touch.current.moved = false;
      return; // that was a swipe, not a tap
    }
    toggle();
  };

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={film.src}
        poster={film.poster}
        autoPlay
        playsInline
        muted={muted}
        onClick={videoClick}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={onExit}
        onLoadedMetadata={(e) => setLength(fmtTime(e.currentTarget.duration))}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.duration) return;
          setProgress(v.currentTime / v.duration);
          setClock(fmtTime(v.currentTime));
        }}
        className="h-full w-full cursor-pointer object-contain"
      />

      {/* legibility gradient behind the bottom control line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

      {/* pause cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30"
        style={{ opacity: paused ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <span className="ml-1 block border-y-[8px] border-l-[12px] border-y-transparent border-l-white" />
      </div>

      {/* phone info card — title + synopsis at the top; fades out while the
          film plays, returns whenever it's paused */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent px-5 pb-14 pr-16 pt-5 md:hidden"
        style={{
          opacity: infoOn ? 1 : 0,
          transform: infoOn ? "translateY(0)" : "translateY(-10px)",
          transition: `opacity 0.45s ease, transform 0.55s ${EASE}`,
        }}
      >
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a]">
          Documentary · {film.year} · {film.runtime}
        </p>
        <p className="mt-2 font-oswald text-[24px] leading-none tracking-[-0.01em] text-[#f3f3f3]">
          {film.title}
        </p>
        <p className="mt-2.5 font-inter text-[13px] leading-[1.5] tracking-[-0.01em] text-[#f3f3f3]/75">
          {film.synopsis}
        </p>
      </div>

      {/* ---- left rail: thin, interactive, fills top→bottom ---- */}
      <div
        ref={railRef}
        role="slider"
        aria-label="Seek through the film"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={`${clock} of ${length}`}
        tabIndex={0}
        onPointerDown={(e) => {
          dragging.current = true;
          seekFromY(e.clientY);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
        }}
        onPointerMove={(e) => {
          if (dragging.current) seekFromY(e.clientY);
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {}
        }}
        onKeyDown={(e) => {
          const v = videoRef.current;
          if (!v) return;
          if (e.key === "ArrowDown" || e.key === "ArrowRight")
            v.currentTime = Math.min(v.duration, v.currentTime + 5);
          if (e.key === "ArrowUp" || e.key === "ArrowLeft")
            v.currentTime = Math.max(0, v.currentTime - 5);
        }}
        className="group absolute bottom-20 left-4 top-20 hidden w-8 cursor-pointer touch-none md:left-7 md:block"
      >
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-white/15 transition-all duration-300 group-hover:w-[5px]">
          <div
            className="w-full bg-[#f3f3f3]"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        {/* thumb */}
        <div
          className="absolute left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f3f3] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ top: `${progress * 100}%` }}
        />
      </div>

      {/* ---- close: right edge, centred ---- */}
      <button
        type="button"
        onClick={onExit}
        aria-label="Close film"
        data-controls
        className="group absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 transition-colors duration-300 hover:border-white/70 md:right-7 md:top-1/2 md:-translate-y-1/2"
      >
        <span className="relative block h-4 w-4 transition-transform duration-500 group-hover:rotate-90">
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
        </span>
      </button>

      {/* ---- desktop bottom line: title · clock, sound icon at the right.
          Play/pause is a click anywhere on the film itself. ---- */}
      <div className="absolute inset-x-0 bottom-0 hidden items-center gap-x-6 px-14 pb-6 md:flex md:px-20 md:pb-7">
        <p className="font-oswald text-[16px] tracking-[-0.01em] text-[#f3f3f3]">
          {film.title}
        </p>
        <p className="font-sans text-[11px] font-medium tracking-[0.18em] text-[#9a9a9a]">
          {clock} / {length}
        </p>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[#f3f3f3]/80 transition-colors duration-300 hover:border-white/70 hover:text-[#f3f3f3]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
            {muted ? (
              <>
                <path d="M23 9l-6 6" />
                <path d="M17 9l6 6" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ---- phone control row: sound · progress · fullscreen ---- */}
      <div
        data-controls
        className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-4 md:hidden"
      >
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 text-[#f3f3f3]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
            {muted ? (
              <>
                <path d="M23 9l-6 6" />
                <path d="M17 9l6 6" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>

        <div
          ref={barRef}
          role="slider"
          aria-label="Seek through the film"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuetext={`${clock} of ${length}`}
          tabIndex={0}
          onPointerDown={(e) => {
            dragging.current = true;
            seekFromX(e.clientX);
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {}
          }}
          onPointerMove={(e) => {
            if (dragging.current) seekFromX(e.clientX);
          }}
          onPointerUp={(e) => {
            dragging.current = false;
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
          }}
          className="relative h-10 flex-1 cursor-pointer touch-none"
        >
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-[#f3f3f3]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3f3f3]"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        <button
          type="button"
          onClick={fullscreen}
          aria-label="Fullscreen, rotated to landscape"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 text-[#f3f3f3]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 3H3v6" />
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M15 21h6v-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
