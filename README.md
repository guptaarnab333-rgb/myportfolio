# Arnab Gupta — Portfolio

A monochrome, motion-led editorial portfolio. Originally built from the
[Portfolio V1 Figma design](https://www.figma.com/design/exho8Xz8k0yWsQWI1OgiZA/Portfolio-V1),
then redesigned in the spirit of [podium.global](https://podium.global): strict
monochrome with one rare indigo accent, a type-led hero, a documentary work grid,
big editorial lists, a loading sequence, smooth scrolling, and a WebGL signature
object.

## Stack

- **Next.js 15** (App Router), **React 18.3**
- **Tailwind CSS 3** — neutral ramp + a single indigo accent (`#2429af`)
- **Lenis** — smooth scrolling, driven by the GSAP ticker (one RAF loop)
- **GSAP + ScrollTrigger** (`@gsap/react`) — hero parallax, scroll reveals, preloader
- **three.js** — the hero "Object" (vanilla WebGL, lazy-loaded, desktop + motion only)
- **next/font** — Oswald (display), Inter (body), DM Sans (labels)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Structure

```
app/
  layout.tsx        # fonts, SmoothScroll provider, Preloader mount
  page.tsx          # home: Hero, About, Work, WorkGrid, EditorialList, CtaFooter
  globals.css       # tokens, Lenis base styles, preloader safety net, reduced-motion
  work/the-ignored-user/   # light-mode case study
components/
  SmoothScroll.tsx  # Lenis provider wired to the GSAP ticker
  Preloader.tsx     # 0 -> 100 loading sequence, locks scroll, hands off to the page
  Hero.tsx          # type-led hero + GSAP cursor parallax
  Scene3D.tsx       # vanilla three.js faceted object
  Scene3DSection.tsx# dynamic (ssr:false) + in-view + reduced-motion / mobile gating
  WorkGrid.tsx      # documentary image mosaic from existing renders
  EditorialList.tsx # big Oswald type lists (software / practices)
  CtaFooter.tsx     # attitude CTA + footer
  CaseStudy.tsx     # alternating image/text case-study row
  Reveal.tsx        # GSAP + ScrollTrigger fade-up (props preserved)
  Nav.tsx           # sticky nav, Lenis-powered anchor scroll, light/dark variants
lib/gsap.ts         # single gsap + ScrollTrigger registration
hooks/useReducedMotion.ts
public/cases/       # case covers + cs01/ detail renders
```

## Notes

- The WebGL object renders only on desktop with motion enabled; mobile and
  `prefers-reduced-motion` fall back to the type-led hero (no canvas). three.js
  is a lazy chunk, so it never touches the initial bundle.
- Smooth scroll, reveals, and the preloader all have reduced-motion fallbacks.
- Replace the `#` résumé link in `components/CtaFooter.tsx` as needed.
```
