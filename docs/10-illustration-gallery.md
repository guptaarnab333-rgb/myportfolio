# Illustration Gallery

| Meta | |
|---|---|
| **Type** | Gallery Section (not a case study) |
| **Discipline** | Illustration |
| **Artist** | Arnab Gupta |
| **Scope** | 52-page portfolio of mixed illustration works |
| **Source file** | `projects/illustration works.pdf` (image-only, no extractable text) |

---

## Scope & Mediums

| Dimension | Detail |
|---|---|
| **Mediums** | Digital art · Sketches · Paintings |
| **Tools** | Adobe Illustrator · Adobe Photoshop · Physical paints |
| **Themes** | Mixed (no single subject focus) |
| **Origin** | Both academic coursework and personal work |
| **Standout pieces called out by artist** | None specified — all pieces are roughly equal weight in the artist's mind |

---

## Portfolio Treatment — Decision Locked In

This collection is **NOT** structured as a case study. It has no single narrative arc — it's range-driven personal work, and forcing it into a problem-research-solution format would feel padded and dishonest.

### Format: Standalone Gallery Page

**Layout:** Masonry or filterable grid with click-to-zoom lightbox.

### Filter Categories
- **Digital** — Illustrator and Photoshop work
- **Sketches** — physical pencil/pen sketchbook pages
- **Paintings** — physical paint work

### Why a Gallery, Not a Case Study
> *"Your other projects have a real narrative arc (problem → research → solution). Illustrations don't — pretending they do feels padded. A gallery shows range and lets the work speak; the tradeoff is it's less 'scrollable storytelling,' but for illustration that's actually the right format."*

(This was discussed and confirmed during portfolio planning.)

---

## Page Structure Recommendation

```
─────────────────────────────────────
[ ILLUSTRATIONS ]
A collection of digital, sketched,
and painted work. Mixed academic
and personal pieces.

[ Filter: All | Digital | Sketches | Paintings ]

─────────────────────────────────────
[ MASONRY GRID OF THUMBNAILS ]
   click any → lightbox open
─────────────────────────────────────
```

### UX Notes for Implementation
- Lightbox should allow keyboard navigation (← →)
- Each image should have an optional caption field for medium / year / context
- Filter should animate the grid (Isotope-style or framer-motion layout transitions)
- No project-style hero with description blocks — keep it visual-first
- Lazy-load thumbnails (52 pages = potentially 50+ images)

---

## Open Questions for Implementation

- **Image extraction:** The source PDF is 52 pages of pure visual content. Arnab will need to export individual high-res images from the source files rather than from the PDF.
- **Captions:** If Arnab wants captions, ask him to provide a CSV / JSON mapping image → medium → optional title → optional year.
- **Featured pieces:** If a few illustrations are particularly strong, consider a small "Featured" row above the grid showing 3–4 hero pieces at larger size.
- **Order:** Sequence in the grid — random shuffle, chronological, or curated? Suggested: curated featured row + reverse-chronological grid below.

---

## Cross-References

- Personal-logo deep dive (`14-personal-logo.md`) and Biroti Café (`08-biroti-cafe.md`) show that Arnab can do typography-led identity work — illustration sits in a complementary creative track.
- The 3D Gallery (`11-3d-work-gallery.md`) uses the same filterable-grid pattern. Consistent UI treatment between the two galleries.
