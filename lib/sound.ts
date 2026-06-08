"use client";

// Global on/off switch for interactive sound (the About-section hover clicks).
// The hero speaker toggle flips this; the click player checks it. The intro
// music is a separate one-shot and is NOT controlled or replayed by this.
let enabled = true;
const listeners = new Set<(v: boolean) => void>();

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(v: boolean): void {
  if (enabled === v) return;
  enabled = v;
  listeners.forEach((l) => l(v));
}

export function onSoundChange(cb: (v: boolean) => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
