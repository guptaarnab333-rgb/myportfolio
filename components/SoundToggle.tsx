"use client";

import { useEffect, useState } from "react";
import { getMusic } from "@/lib/music";

/**
 * Equalizer-style toggle for the intro music. Reflects the shared audio's
 * play/pause state and flips it on click. Bars animate while playing.
 */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = getMusic();
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    setPlaying(!a.paused);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const a = getMusic();
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      aria-pressed={playing}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#9a9a9a] transition-colors duration-300 group-hover:text-[#f3f3f3]">
        {playing ? "Sound on" : "Sound off"}
      </span>
      <span className="flex h-[18px] items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block w-[2px] origin-bottom rounded-full bg-[#f3f3f3] ${
              playing ? "eq-bar" : "scale-y-[0.18]"
            }`}
            style={{
              height: "18px",
              animationDelay: playing ? `${i * 0.18}s` : undefined,
            }}
          />
        ))}
      </span>
    </button>
  );
}
