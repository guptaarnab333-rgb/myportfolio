"use client";

// A single shared <audio> instance for the intro/background music, so the
// preloader's ENTER button and the hero's sound toggle control the same track.
let audio: HTMLAudioElement | null = null;

export function getMusic(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio("/music2.mp3");
    audio.loop = false; // intro only — plays once and stops
    audio.volume = 0.3;
    audio.preload = "auto";
  }
  return audio;
}
