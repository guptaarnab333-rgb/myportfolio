# 3D Work Gallery

| Meta | |
|---|---|
| **Type** | Gallery Section (not a case study) |
| **Discipline** | Digital 3D Modeling |
| **Artist** | Arnab Gupta (SOD-178) |
| **Tool** | Blender |
| **Source file** | `projects/Digital 3D Modeling presentation.pdf` |

---

## Works in This Collection

### 1. The Puffer Chair
Soft, plush-form chair modeling. Organic, tufted-pillow shape with rounded forms.
**Category:** Furniture

### 2. Exhibition Design
Full spatial layout for an exhibition with multiple discrete components:
- Boards to put posters on
- Wooden display panel with glass — to display products and posters
- Hanging panels to display product details
- Metal standees to display products
- Tables to display products
- Caution boards

**Category:** Spaces

### 3. Exhibition Design Assignment
A further iteration of the exhibition space — same brief, refined design language.
**Category:** Spaces

### 4. Inhaler Redesign ⭐
A product-modeling piece exploring inhaler form factor.
**Category:** Product
> **PROMOTED TO STANDALONE CASE STUDY** (see below)

### 5. Hostel Room
Interior modeling of a hostel room — full environment with furniture, lighting, surfaces.
**Category:** Spaces

### 6. Sofa
Furniture modeling — sofa form.
**Category:** Furniture

---

## ⭐ Inhaler Redesign — Promotion to Case Study

During portfolio planning, the **Inhaler Redesign** was identified as having enough of a design story to justify a standalone case study, separate from the gallery.

> *"If any single 3D piece (say the Inhaler Redesign or Exhibition) has a real design story behind it, you could pull that one out as a small case study and keep the rest in the gallery — best of both. I'll note this approach in the summary."*
>
> Confirmed: *"ok note that down we can make a case study on that inhaler for sure"*

**Action item:** Build a separate `inhaler-redesign-case-study.md` once Arnab can share:
- Brief / problem statement for the inhaler project
- Research (existing inhaler products studied, user pain points)
- Sketches and form iterations
- Final 3D renders from multiple angles
- Materials / surfaces explored
- Functional reasoning behind form choices

For now, the Inhaler Redesign render lives in the 3D gallery as a teaser, with a link / CTA to the (forthcoming) case study.

---

## Portfolio Treatment — Decision Locked In

A **standalone gallery page**, mirroring the structure of the Illustration Gallery.

### Filter Categories
- **Furniture** — Puffer Chair · Sofa
- **Product** — Inhaler Redesign (link to case study) · plus any future product pieces
- **Spaces** — Exhibition Design · Exhibition Design Assignment · Hostel Room

### Why a Gallery, Not Individual Case Studies
> *"It's range-driven work without a single narrative arc. A grid of renders (with categories like Furniture · Product · Spaces) lets each piece stand on its own."*

(Discussed and confirmed during portfolio planning.)

### Range Demonstrated
| Track | What it shows |
|---|---|
| **Furniture** (chair, sofa) | Organic/soft surface modeling, tufted/upholstered geometry |
| **Product** (inhaler) | Hard-surface product geometry, ergonomic form |
| **Spaces** (exhibition × 2, hostel room) | Full environment scenes, lighting, materials, scale, props |

---

## Page Structure Recommendation

```
─────────────────────────────────────
[ 3D WORK ]
Modeled in Blender.
Furniture, product, and spatial work.

[ Filter: All | Furniture | Product | Spaces ]

─────────────────────────────────────
[ MASONRY OR EQUAL-RATIO GRID OF RENDERS ]
   click any → lightbox or detail page
   Inhaler card → links to its case study
─────────────────────────────────────
```

### UX Notes for Implementation
- Show **multiple angles per piece** on hover or lightbox (a 3D model deserves more than one shot)
- Inhaler card should be visually marked as a deeper-dive piece — e.g. a small "Case Study →" tag
- Consistent dark-background rendering across the gallery makes the work read as a unified set
- Lazy-load images
- Match the visual language of the Illustration Gallery for consistency

---

## Cross-References

- **Inhaler Redesign Case Study** — to be written once content is ready
- **Illustration Gallery** (`10-illustration-gallery.md`) — uses the same filterable-grid pattern
- **ISBT Flyover** (`09-isbt-flyover-space-design.md`) — uses Autodesk Maya for the more architectural piece; this gallery focuses on Blender work, demonstrating tool range across two pieces of software
