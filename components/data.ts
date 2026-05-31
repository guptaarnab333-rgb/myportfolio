export type CaseStudy = {
  index: string;
  year: string;
  title: string;
  category: string;
  blurb: string;
  image: string;
  label: string;
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
    image: "/cases/cs01-ignored-user.png",
    label: "THE IGNORED USER",
  },
  {
    index: "02 / 08",
    year: "2024",
    title: "Clutter to Comfort",
    category: "WORKSPACE DESIGN",
    blurb:
      "Redesigning a shared studio so material chaos stops getting in the way of focus.",
    image: "/cases/cs02-clutter-comfort.png",
    label: "FROM CLUTTER TO COMFORT",
  },
  {
    index: "03 / 08",
    year: "2024",
    title: "Redesigning Headway",
    category: "EDUCATION · APP",
    blurb:
      "A learning app that respects the time of someone juggling six other things.",
    image: "/cases/cs03-headway.png",
    label: "REDESIGNING HEADWAY",
  },
  {
    index: "04 / 08",
    year: "2024",
    title: "Flyover Space Design",
    category: "PUBLIC SPACE",
    blurb:
      "Reclaiming the dead air under a flyover into something a city actually uses.",
    image: "/cases/cs04-isbt-flyover.png",
    label: "ISBT FLYOVER SPACE DESIGN",
  },
  {
    index: "05 / 08",
    year: "2024",
    title: "Uphaar Tea Packaging",
    category: "PACKAGING DESIGN",
    blurb:
      "A festive tea brand that carries the warmth of a 77-year heritage onto the shelf.",
    image: "/cases/cs05-uphaar-tea.png",
    label: "UPHAAR TEA PACKAGING",
  },
  {
    index: "06 / 08",
    year: "2024",
    title: "Gargi — Nari Shakti",
    category: "BRANDING · SOCIAL",
    blurb:
      "An identity system for a women-led collective — strong, soft, unmistakably theirs.",
    image: "/cases/cs06-gargi.png",
    label: "GARGI — NARI SHAKTI",
  },
  {
    index: "07 / 08",
    year: "2024",
    title: "Biroti Café",
    category: "HOSPITALITY · BRAND",
    blurb:
      "A neighbourhood café branded around the small ritual of a good unhurried morning.",
    image: "/cases/cs07-biroti-cafe.png",
    label: "BIROTI CAFÉ",
  },
  {
    index: "08 / 08",
    year: "2025",
    title: "Scout",
    category: "PRODUCT · AI",
    blurb:
      "A research agent that helps designers walk into a meeting already knowing the room.",
    image: "/cases/cs08-scout.png",
    label: "SCOUT",
  },
];
