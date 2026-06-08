"use client";

import { useEffect, useState } from "react";
import { getMusic } from "@/lib/music";
import { isSoundEnabled, setSoundEnabled, onSoundChange } from "@/lib/sound";

/**
 * Speaker toggle = global on/off for interactive sound (the About hover clicks).
 * Turning it OFF also silences the intro music if it's still playing. Turning it
 * ON re-enables the clicks but does NOT replay the one-shot intro music.
 */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isSoundEnabled());
    return onSoundChange(setOn);
  }, []);

  const toggle = () => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    // Turning sound off also stops the intro music if it happens to still be
    // playing. Turning it back on does not restart the music.
    if (!next) getMusic()?.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      aria-pressed={on}
      className={`group inline-flex items-center gap-2.5 text-[#9a9a9a] transition-colors duration-300 hover:text-[#f3f3f3] ${className}`}
    >
      <span className="font-sans text-[11px] uppercase tracking-[0.2em]">
        {on ? "Sound on" : "Sound off"}
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
        {on ? (
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
