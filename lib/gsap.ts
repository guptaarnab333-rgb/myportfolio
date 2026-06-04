"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins exactly once. Importing gsap from this module everywhere
// guarantees a single registration and one shared timeline/ticker.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Shared easing vocabulary (exponential ease-out, no bounce — per design system).
export const EASE = "expo.out";

export { gsap, ScrollTrigger, useGSAP };
