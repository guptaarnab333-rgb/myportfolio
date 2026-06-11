/**
 * Content for the Media section (photos + films) inside Work.
 *
 * Photos display in ARRAY ORDER. `src` is the bare master URL on ImageKit —
 * components append a size transform via photoURL() so the pile loads small
 * thumbnails while the viewer gets a full-quality render. To add a photo:
 * stage it in media-uploads/, upload via
 * `node scripts/upload-to-imagekit.mjs <dir> /portfolio/media/photos`
 * (images over 25 MB must be converted to JPEG first), add an entry.
 */

export type MediaPhoto = {
  /** Bare ImageKit URL, no query — use photoURL() to request a size. */
  src: string;
  title: string;
  place?: string;
  /** ISO date, shown in the caption when present. */
  date?: string;
};

/** Sized, quality-tuned delivery URL for a photo master. */
export const photoURL = (src: string, width: number, quality = 95) =>
  `${src}?tr=w-${width},q-${quality}`;

export type MediaFilm = {
  title: string;
  year: string;
  runtime: string;
  role: string;
  synopsis: string;
  /** Direct MP4 (H.264) — served byte-exact from ImageKit. */
  src: string;
  poster: string;
};

const IK = "https://ik.imagekit.io/cnjxcztbn/portfolio";

export const photos: MediaPhoto[] = [
  { src: `${IK}/media/photos/himachal-tibet-border.jpg`, title: "Himachal Tibet Border", place: "Himachal Pradesh" },
  { src: `${IK}/media/photos/owl-at-rest.png`, title: "Owl at Rest" },
  { src: `${IK}/media/photos/fri-dehradun.png`, title: "FRI", place: "Dehradun" },
  { src: `${IK}/media/photos/untouched-paradise.jpg`, title: "Untouched Paradise" },
  { src: `${IK}/media/photos/peace.jpg`, title: "Peace" },
  { src: `${IK}/media/photos/jhanda-mela.png`, title: "Jhanda Mela", place: "Dehradun" },
  { src: `${IK}/media/photos/whispering-woods.jpg`, title: "Whispering Woods" },
  { src: `${IK}/media/photos/green-velvet.jpg`, title: "Green Velvet" },
];

export const films: MediaFilm[] = [
  {
    title: "Pitara",
    year: "2025",
    runtime: "3 min 29 s",
    role: "Direction · Camera · Edit",
    synopsis:
      "Stories from the hands of Tharu artisans. Conceived and shot in a single day during a social design workshop, the film captures the memories, skills, and generations-old grass-weaving craft of the Terai's Tharu community.",
    src: `${IK}/media/videos/tharu.mp4?tr=orig-true`,
    poster: `${IK}/media/posters/pitara-poster.png?tr=q-95`,
  },
  {
    title: "Sakhiyan",
    year: "2025",
    runtime: "4 min 25 s",
    role: "Facilitation · Recording · Edit",
    synopsis:
      "Filmed during a field study on the feminist co-design of everyday spaces, Sakhiyan (सखियाँ) is about the companionship of women in self-help groups: how they work, share, and grow together, and how work shapes their daily lives.",
    src: `${IK}/media/videos/sakhiyan.mp4?tr=orig-true`,
    poster: `${IK}/media/posters/sakhiyan-poster.jpg?tr=q-95`,
  },
];
