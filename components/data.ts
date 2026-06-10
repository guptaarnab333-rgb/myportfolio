export type CaseStudy = {
  index: string;
  year: string;
  title: string;
  category: string;
  blurb: string;
  image: string;
  label: string;
  /** detail-page route; falls back to #work when absent */
  href?: string;
  /** object-position helper so each crop sits well */
  position?: string;
};

export const cases: CaseStudy[] = [
  {
    index: "01 / 08",
    year: "2024",
    title: "The Ignored User",
    category: "UX RESEARCH",
    blurb:
      "When the people you design for aren’t in the room — a study on building empathy through observation.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01-ignored-user.png?tr=orig-true",
    label: "THE IGNORED USER",
    href: "/work/the-ignored-user",
  },
  {
    index: "02 / 08",
    year: "2024",
    title: "Redesigning Headway",
    category: "EDUCATION · APP",
    blurb:
      "A learning app that respects the time of someone juggling six other things.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03-headway.png?tr=orig-true",
    label: "REDESIGNING HEADWAY",
    href: "/work/headway",
  },
  {
    index: "03 / 08",
    year: "2024",
    title: "Clutter to Comfort",
    category: "WORKSPACE DESIGN",
    blurb:
      "Redesigning a shared studio so material chaos stops getting in the way of focus.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02-clutter-comfort.png?tr=orig-true",
    label: "FROM CLUTTER TO COMFORT",
    href: "/work/clutter-to-comfort",
  },
  {
    index: "04 / 08",
    year: "2024",
    title: "Gargi — Nari Shakti",
    category: "BRANDING · SOCIAL",
    blurb:
      "An identity system for a women-led collective — strong, soft, unmistakably theirs.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06-gargi.png?tr=orig-true",
    label: "GARGI — NARI SHAKTI",
    href: "/work/gargi",
  },
  {
    index: "05 / 08",
    year: "2024",
    title: "Flyover Space Design",
    category: "PUBLIC SPACE",
    blurb:
      "Reclaiming the dead air under a flyover into something a city actually uses.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04-isbt-flyover.png?tr=orig-true",
    label: "ISBT FLYOVER SPACE DESIGN",
    href: "/work/flyover",
  },
  {
    index: "06 / 08",
    year: "2024",
    title: "Uphaar Tea Packaging",
    category: "PACKAGING DESIGN",
    blurb:
      "A festive tea brand that carries the warmth of a 77-year heritage onto the shelf.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05-uphaar-tea.png?tr=orig-true",
    label: "UPHAAR TEA PACKAGING",
    href: "/work/uphaar-tea",
  },
  {
    index: "07 / 08",
    year: "2025",
    title: "Scout",
    category: "PRODUCT · AI",
    blurb:
      "A research agent that helps designers walk into a meeting already knowing the room.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs08-scout.png?tr=orig-true",
    label: "SCOUT",
    href: "/work/scout",
  },
  {
    index: "08 / 08",
    year: "2024",
    title: "Biroti Café",
    category: "HOSPITALITY · BRAND",
    blurb:
      "A neighbourhood café branded around the small ritual of a good unhurried morning.",
    image: "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07-biroti-cafe.png?tr=orig-true",
    label: "BIROTI CAFÉ",
    href: "/work/biroti",
  },
];
