# Arnab Gupta — Portfolio

A dark, editorial single-page portfolio built from the [Portfolio V1 Figma design](https://www.figma.com/design/exho8Xz8k0yWsQWI1OgiZA/Portfolio-V1).

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 3**
- **React Spring** (`@react-spring/web`) — cursor parallax in the hero + scroll-reveal animations
- **next/font** — DM Sans, Oswald, Inter, Instrument Serif

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
  layout.tsx        # fonts + metadata
  page.tsx          # page composition (About, Work, Toolkit, Contact, Footer)
  globals.css       # tokens, keyframes, reduced-motion
components/
  Nav.tsx           # sticky nav, blurs in on scroll
  Hero.tsx          # kinetic hero — floaters react to cursor (React Spring)
  CaseStudy.tsx     # alternating image/text case-study row
  Reveal.tsx        # IntersectionObserver + React Spring fade-up wrapper
  data.ts           # the 8 case studies
public/cases/       # case-study cover images exported from Figma
```

## Notes

- The hero floaters are hidden below `md` for a clean mobile layout; case-study
  rows stack vertically.
- Motion respects `prefers-reduced-motion`.
- Replace the `#` resume link in `app/page.tsx` and any copy in
  `components/data.ts` as needed.
```
