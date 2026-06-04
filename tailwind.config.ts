import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        black: "#000000",
        panel: "#161616",
        line: "#2a2a2a",
        edge: "#2e2e2e",
        off: "#ededed",
        white: "#f3f3f3",
        chalk: "#f2f2f2",
        muted: "#9a9a9a",
        label: "#606060",
        faint: "#5e5e5e",
        accent: "#2429af",
        // Monochrome ramp + one rare indigo accent (flame retired).
        // light-mode (case study) tokens
        paper: "#f1f0ed",
        graphite: "#181717",
        stone: "#606060",
        mist: "#b3b3b3",
        peri: "#d9d9f2",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
