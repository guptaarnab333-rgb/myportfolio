"use client";

import { useEffect, useState } from "react";
import { getMusic } from "@/lib/music";

/**
 * Speaker toggle for the intro music. Mirrors the shared audio's play state.
 * The intro track plays once and stops; clicking the speaker mutes it while
 * it's playing, or replays it from the start once it has ended.
 */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = getMusic();
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onStop);
    a.addEventListener("ended", onStop);
    setPlaying(!a.paused && !a.ended);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onStop);
      a.removeEventListener("ended", onStop);
    };
  }, []);

  const toggle = () => {
    const a = getMusic();
    if (!a) return;
    if (a.paused || a.ended) {
      a.currentTime = 0;
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute sound" : "Play sound"}
      aria-pressed={playing}
      className={`group inline-flex items-center gap-2.5 text-[#9a9a9a] transition-colors duration-300 hover:text-[#f3f3f3] ${className}`}
    >
      <span className="font-sans text-[11px] uppercase tracking-[0.2em]">
        {playing ? "Sound on" : "Sound off"}
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
        {playing ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <path d="M23 9l-6 6" />
            <path d="M17 9l6 6" />
          </>
        )}
      </svg>
    </button>
  );
}
