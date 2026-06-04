---
name: Arnab Gupta Portfolio
description: Dark editorial portfolio that moves — print rigor with web life, for product design work
colors:
  ink: "#0a0a0a"
  panel: "#222222"
  line: "#2a2a2a"
  edge: "#2e2e2e"
  white: "#f3f3f3"
  chalk: "#f2f2f2"
  muted: "#9a9a9a"
  label: "#606060"
  faint: "#5e5e5e"
  accent: "#2429af"
  flame: "#f85050"
  paper: "#f1f0ed"
  graphite: "#181717"
  stone: "#606060"
  mist: "#b3b3b3"
  peri: "#d9d9f2"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(44px, 8.5vw, 92px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(34px, 5vw, 56px)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Oswald, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  hair: "2px"
  card: "3px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
components:
  link-cta:
    textColor: "{colors.white}"
    typography: "{typography.body}"
  case-cover:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.hair}"
  category-label:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  nav-scrolled:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
---

# Design System: Arnab Gupta Portfolio

## 1. Overview

**Creative North Star: "The Kinetic Editorial"**

A magazine that moves. The system marries print-grade editorial typography to restrained, deliberate motion: cursor parallax in the hero, scroll-driven reveals, hover that responds. The near-black surface (#0a0a0a) is the page stock; case-study images are the plates; type sets the rhythm. Motion is not decoration bolted on at the end, it is the signature, the thing that makes editorial rigor feel alive on the web rather than embalmed.

The personality is thoughtful, grounded, and candid. The voice is first-person and plainspoken, a designer explaining real decisions to a respected peer. Warmth comes from honest storytelling and unhurried pacing, never from warm-tinted color on the dark canvas. The motion stays editorial, not spectacular: every move is purposeful, eased, and reversible; it reads as a publication that breathes, never as a demo reel.

This system explicitly rejects the generic-SaaS look (purple-to-blue gradients, identical icon-heading-text card grids, hero-metric stat blocks, Inter-for-everything), maximalist clutter, corporate sterility, and trend gimmicks. One clear thing to look at per viewport. Every section earns its place.

**Key Characteristics:**
- Near-black editorial surface; images are the brightest thing on screen.
- Motion is the signature: parallax, scroll reveals, and confident hover, all eased and reduced-motion safe.
- Three-voice type system: Instrument Serif italic (display), Oswald condensed (case titles), Inter (reading), DM Sans (labels).
- Saturated accents (indigo, flame) used rarely and deliberately, ≤10% of any view.
- Tactile, confident components: defined borders, pronounced hover motion, deliberate image lifts.

## 2. Colors

A near-black darkroom neutral ramp carrying two saturated accents, used sparingly so the work stays the brightest element.

### Primary
- **Indigo Signal** (#2429af): The brand and interactive lead. Category labels, links, the hero attribution line, hover states. It is the consistent "this is interactive / this is the brand" cue across the page. Never used as a large fill; it lives in small, high-intent type.

### Secondary
- **Flame** (#f85050): Emotional punctuation, never a system color. Reserved for a single emphasis per view, the verb fragment in the hero headline ("think; I think"). Its scarcity is what makes it land.

### Named Rules (color budget)
**The Ten-Percent Rule.** Indigo and flame together occupy no more than ~10% of any viewport. The accents are rare and deliberate by doctrine; the dark neutral ramp carries everything else. Color earns attention precisely because there is so little of it.

### Neutral
- **Ink** (#0a0a0a): The darkroom surface. The page background; the room the work hangs in.
- **Panel** (#222222): Image-frame and surface backing behind covers before they load.
- **Line** (#2a2a2a) / **Edge** (#2e2e2e): Hairline dividers between case rows and around image frames. Structure by whisper, not by box.
- **White** (#f3f3f3) / **Chalk** (#f2f2f2): Primary reading and heading ink on dark. Not pure #fff; slightly dialed back to sit calmly on near-black.
- **Muted** (#9a9a9a): Body prose in case blurbs. Verify ≥4.5:1 on ink (it passes); do not let it drift lighter "for elegance."
- **Label** (#606060) / **Faint** (#5e5e5e): Eyebrow labels, captions, indices, scroll hints. The quietest readable tier; reserve for short non-essential metadata only.

### Light-mode (case-study pages)
- **Paper** (#f1f0ed): The light surface for individual case-study reading pages (a near-white at near-zero chroma, not a warm cream tell).
- **Graphite** (#181717): Primary ink on paper.
- **Stone** (#606060) / **Mist** (#b3b3b3): Secondary text and dividers on paper.
- **Peri** (#d9d9f2): A pale indigo wash for accent moments on light surfaces.

### Named Rules
**The Indigo-Leads Rule.** Indigo is the only color allowed to signal interactivity and brand. If something is a link, a category, or the name, it may be indigo; nothing else competes for that job.

**The One Flame Rule.** Flame red appears at most once per viewport, on copy, never on chrome. The moment a second flame element appears, the first one stops meaning anything.

**The No-Warm-Tint Rule.** Warmth in this brand is carried by voice and pacing. Neutrals stay at or near zero chroma. No cream, sand, or paper-warm body backgrounds.

## 3. Typography

**Display Font:** Instrument Serif (with Georgia, serif) — italic
**Headline Font:** Oswald (condensed sans)
**Body Font:** Inter
**Label Font:** DM Sans

**Character:** A deliberate contrast-axis pairing: a high-contrast italic serif for the editorial display voice, a tall condensed sans (Oswald) for case titles that read like exhibition placards, a neutral humanist sans (Inter) for comfortable reading, and a geometric sans (DM Sans) for tracked labels. Four families, each with a distinct job; none competing on the same axis.

### Hierarchy
- **Display** (Instrument Serif italic, 400, clamp(44px, 8.5vw, 92px), line-height 1.02, tracking -0.03em): The hero headline only. The single largest voice on the site. Ceiling stays under the ~96px shouting line.
- **Headline** (Oswald, 400, clamp(34px, 5vw, 56px), line-height 1.0, tracking -0.03em): Case-study titles. Condensed, tall, placard-like.
- **Title** (Oswald, 500, ~22px, tracking -0.02em): The "ARNAB" wordmark in the nav.
- **Body** (Inter, 400, 17px, line-height 1.5, tracking -0.01em): Case-study blurbs and reading copy. Cap measure at 65–75ch (current `max-w-[400px]` blurbs sit well within this).
- **Label** (DM Sans, 500, 11px, tracking 0.18em, UPPERCASE): Eyebrows, indices, categories, captions, the scroll hint. Short strings only (≤4 words).

### Named Rules
**The Italic-Display Rule.** The serif display voice is always italic and always solo. It carries the hero; it does not appear again as decoration elsewhere.

**The Tracked-Label Rule.** Uppercase is allowed only on DM Sans labels at ≤4 words with wide tracking (≥0.16em). No uppercase sentences, no all-caps body.

## 4. Elevation

Flat surfaces, tactile imagery. The page stock is flat; depth comes from tonal layering (ink → panel → hairline edge) and from deliberate, confident shadow under imagery that lifts on hover or float. UI containers stay flat; images are the things that feel physical.

### Shadow Vocabulary
- **Image lift** (`box-shadow: 0 30px 80px -40px rgba(0,0,0,0.9)`): The deep, soft, downward shadow under hero floater cards. Reads as a plate resting above the page, not as a UI card.

### Named Rules
**The Flat-Stock Rule.** Surfaces are flat. Only imagery casts shadow, and only to separate a plate from the page. UI containers (sections, nav, copy blocks) never get shadows.

## 5. Components

The component feel is **tactile and confident**: components respond to the cursor with pronounced, eased motion and defined edges, so the page feels physical without becoming noisy. Chrome stays minimal; the response is what reads as craft.

### Buttons / Links
- **Shape:** No buttons in the classic sense; CTAs are text links with motion.
- **Primary CTA ("READ CASE STUDY"):** Inter 15px medium, white, with an arrow glyph that slides 6px right on hover (300ms). Verb-forward; the arrow is the only ornament, and its travel should feel decisive.
- **Hover / Focus:** Color shifts toward Indigo Signal on nav links. Ensure a visible `:focus-visible` ring for keyboard users (currently relies on default; harden this).

### Case Cover (signature)
- **Corner Style:** Near-square (2–3px / `{rounded.hair}`–`{rounded.card}`).
- **Background:** Panel (#222222) backing while the image loads.
- **Border:** Single defined Edge (#2e2e2e) hairline. No double borders, no stripes. The border should read crisply against the dark, not dissolve into it.
- **Behavior:** Image scales to 1.04 over 900ms on hover with an exponential ease (cubic-bezier(0.22,1,0.36,1)); a top-down black gradient (35%→0) lightens on hover. A faint mix-blend-screen label sits bottom-left. The hover response is generous and confident, not a timid 1–2% nudge.

### Hero Floaters (signature)
- **Style:** Absolutely-positioned figures with cursor-parallax depth (React Spring), each rotated a few degrees, entering with a staggered floatIn. Hairline Edge border, Panel backing, the Image-lift shadow.
- **Rule:** Desktop only (`hidden md:block`); the mobile hero is type-led. Honor `prefers-reduced-motion` (parallax and floatIn must degrade to a static, fully-visible arrangement).

### Navigation
- **Style:** Fixed, transparent at top; on scroll (>24px) it gains a translucent ink backdrop (`bg-ink/70 backdrop-blur-md`) and a hairline bottom border. A light variant exists for case-study (paper) pages.
- **Typography:** Oswald wordmark ("ARNAB" + tracked "Creates" sublabel); DM/Inter nav links that shift to Indigo on hover.
- **Mobile:** Links stay inline; sizes step down. Ensure tap targets ≥44px.

### Section Reveal (signature behavior)
- IntersectionObserver-driven fade-up (opacity + translateY) via React Spring, threshold 0.18. Content must be visible by default and only enhanced by the reveal, never gated on it (so headless/background-tab renders never ship blank).

## 6. Do's and Don'ts

### Do:
- **Do** keep #0a0a0a as the room: let case images be the brightest thing on any screen.
- **Do** use Indigo (#2429af) as the single signal for links, categories, and brand; keep it small and high-intent.
- **Do** reserve Flame (#f85050) for one emphasis per viewport, on copy only.
- **Do** keep borders to a single hairline (Line/Edge) and corners near-square (2–3px).
- **Do** pair fonts on a contrast axis (serif display + condensed sans + humanist sans) and keep labels uppercase only at ≤4 words.
- **Do** give every animation (cursor parallax, scroll reveal, hover) a `prefers-reduced-motion: reduce` fallback, and keep revealed content visible by default.
- **Do** verify muted (#9a9a9a) body text stays ≥4.5:1 on ink; bump toward white if a smaller size or lighter context drops it.

### Don't:
- **Don't** ship the generic-SaaS look: no purple-to-blue gradients, no identical icon-heading-text card grids, no hero-metric stat blocks, no Inter-for-everything.
- **Don't** clutter: no competing focal points, no wall of sections, no decorative noise. One clear subject per viewport.
- **Don't** go corporate/sterile: no stock photography, no faceless agency polish without a point of view.
- **Don't** reach for trend gimmicks: no brutalism-for-its-own-sake, no scroll-jacking, no effect that fights readability.
- **Don't** introduce a warm cream/sand/paper body background; warmth is carried by voice, not by tinting the dark surface.
- **Don't** use border-left/right greater than 1px as a colored accent stripe, gradient text (`background-clip: text`), or decorative glassmorphism.
- **Don't** let Flame become a system color or Indigo become a large fill; both lose meaning when overused.
- **Don't** add uppercase sentences or all-caps body copy; uppercase is for short tracked labels only.
