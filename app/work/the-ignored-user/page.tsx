import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "The Ignored User — Arnab Gupta",
  description:
    "A solar-powered, foot-operated water purifier designed for the hands that build India's cities.",
};

/* ---------- shared bits ---------- */

/**
 * Breaks a child out of the 1120px content column to span the full viewport
 * width, matching the auto-layout full-bleed sections in the Figma V2
 * (Problem band, Ideation image, Final Form). The centering trick keeps it
 * responsive: 100vw wide, pulled back to the viewport's left edge.
 */
function FullBleed({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-accent">
      {children}
    </p>
  );
}

function SectionHead({
  kicker,
  title,
  className = "",
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2 className="mt-4 max-w-[1000px] font-sans text-[clamp(34px,5.4vw,64px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
        {title}
      </h2>
    </Reveal>
  );
}

/* ---------- content data ---------- */

const meta = [
  { label: "Year", value: "2026" },
  { label: "Discipline", value: "Product Design" },
  { label: "Role", value: "Designer · Researcher" },
  { label: "Tools", value: "Blender · Fusion 360" },
];

/* Research cards — body uses blue keyword highlights, matched to Figma V2 */
type Seg = { t: string; hi?: boolean };
const research: { q: Seg[]; b: Seg[] }[] = [
  {
    q: [{ t: "Who ", hi: true }, { t: "are we designing for " }, { t: "?", hi: true }],
    b: [
      { t: "Construction workers", hi: true },
      { t: " spending long hours on active sites, often with " },
      { t: "limited access ", hi: true },
      { t: "to safe and reliable drinking water." },
    ],
  },
  {
    q: [{ t: "What ", hi: true }, { t: "did we discover " }, { t: "?", hi: true }],
    b: [
      { t: "Water was commonly stored in open drums, making it " },
      { t: "difficult to maintain hygiene", hi: true },
      { t: " and " },
      { t: "easy access.", hi: true },
    ],
  },
  {
    q: [{ t: "Where", hi: true }, { t: " was the gap " }, { t: "?", hi: true }],
    b: [
      { t: "The issue was not just the container, but the lack of a" },
      { t: " dedicated hydration system ", hi: true },
      { t: "within " },
      { t: "construction sites.", hi: true },
    ],
  },
  {
    q: [{ t: "When ", hi: true }, { t: "did it matter most " }, { t: "?", hi: true }],
    b: [
      { t: "During " },
      { t: "peak heat hours", hi: true },
      { t: " and " },
      { t: "between tasks,", hi: true },
      { t: " when workers needed quick and frequent access to water." },
    ],
  },
  {
    q: [{ t: "Why ", hi: true }, { t: "was it worth solving " }, { t: "?", hi: true }],
    b: [
      { t: "Construction workers build our cities, yet few products are designed specifically for their everyday needs. Hydration is a basic need, yet existing solutions" },
      { t: " overlook t", hi: true },
      { t: "he realities of " },
      { t: "construction workers'", hi: true },
      { t: " daily lives." },
    ],
  },
];

const pains = [
  ["01", "Contamination at source", "Open, unfiltered tanker water shared by everyone, protected by nothing.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-01.png?tr=orig-true"],
  ["02", "No hands-free interaction", "Every tap or drum handle requires hands that are never clean.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-02.png?tr=orig-true"],
  ["03", "One height fits nobody", "Existing dispensers ignore the spread of worker heights and roles.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-03.png?tr=orig-true"],
  ["04", "Direct mouth-to-tap", "Workers without bottles put hands or mouth on shared surfaces.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-04.png?tr=orig-true"],
  ["05", "Maintenance nobody owns", "Filters clog. Tanks empty. No indicator, no assigned responsibility.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-05.png?tr=orig-true"],
  ["06", "The product doesn’t belong here", "Office and home products break within weeks under site conditions.", "https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/pain-06.png?tr=orig-true"],
];

const components = [
  ["01", "Solar Panel", "1.5ft octagonal, removable, 30–40W peak. 5m wire — placeable on any sun-exposed surface."],
  ["02", "Battery", "12V, 7–12Ah. Stores surplus charge for overcast periods."],
  ["03", "Filter Stack", "Four stages: sediment → carbon → ceramic → UV. Modular and tool-free replaceable."],
  ["04", "Two DC Pumps", "One per spout. No shared flow path, no cross-contamination."],
  ["05", "Storage Tank", "1.7ft × 1.7ft × 2.5ft. 150+ litres per fill. Sealed and enclosed."],
  ["06", "Foot Paddle + Wheels", "Paddle activates pump. Retractable casters for site repositioning."],
];

const stages = [
  ["Sediment", "Removes dust & mud"],
  ["Carbon", "Removes odour & chlorine"],
  ["Ceramic", "Blocks bacteria"],
  ["UV Lamp", "Final sterilisation"],
];

const mechanisms = [
  ["https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/mech-pumps.png?tr=orig-true", "Two DC Pumps, one per sprout"],
  ["https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/mech-paddle.png?tr=orig-true", "Foot Paddle for hands free water release"],
  ["https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/mech-casters.png?tr=orig-true", "Retractable Casters for stability"],
];

/* eslint-disable @next/next/no-img-element */

export default function TheIgnoredUser() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_240px] md:items-end md:gap-20">
            <Reveal>
              <h1 className="font-sans text-[clamp(52px,9vw,96px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                The Ignored User.
              </h1>
              <p className="mt-8 max-w-[600px] font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-accent">
                A solar-powered, foot-operated water purifier designed for the
                hands that build India’s cities.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="flex flex-col gap-6">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-inter text-[14px] tracking-[-0.03em] text-stone">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-inter text-[14px] font-medium tracking-[-0.03em] text-graphite">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* ---------- Hero render ---------- */}
        <Reveal className="mt-16" y={36}>
          <img
            src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/hero-context.png?tr=orig-true"
            alt="The final unit in site — a faceted steel column at a construction site."
            className="w-full rounded-[3px]"
          />
        </Reveal>

        {/* ---------- Context ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal>
            <Eyebrow>CONTEXT</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
              Understanding the Environment
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex max-w-[600px] flex-col gap-6 font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-graphite">
              <p>
                <Highlight
                  segments={[
                    ["Daily-wage construction workers ", true],
                    "in urban and semi-urban India spend 8–12 hour shifts in extreme heat with ",
                    ["no access to clean drinking water. ", true],
                    "Water arrives in tanker trucks and sits in ",
                    ["open, unfiltered, shared containers", true],
                    " — or they drink tap water, unhygienic and without basic consideration for the user.",
                  ]}
                />
              </p>
              <p>
                <Highlight
                  segments={[
                    "Workers access water with dirty or wet hands between physically demanding tasks. ",
                    ["No", true],
                    " ",
                    ["purpose-designed water infrastructure ", true],
                    "exists for this context.",
                  ]}
                />
              </p>
            </div>
          </Reveal>
        </section>

        {/* context images — three across */}
        <Reveal className="mt-12" y={32}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/context-18.png?tr=orig-true" alt="Site context" className="aspect-[374/249] w-full rounded-[3px] object-cover" />
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/context-19.png?tr=orig-true" alt="Workers accessing shared water" className="aspect-[374/249] w-full rounded-[3px] object-cover" />
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/context-33.png?tr=orig-true" alt="Open drum water storage on site" className="aspect-[374/249] w-full rounded-[3px] object-cover" />
          </div>
        </Reveal>

        {/* ---------- Research ---------- */}
        <SectionHead
          className="mt-28"
          kicker="RESEARCH"
          title="Understanding the User and Context"
        />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {research.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col gap-5 bg-[#ffffff] px-8 py-9">
                <h3 className="font-inter text-[28px] font-normal leading-[1.1] tracking-[-0.03em]">
                  {r.q.map((s, j) => (
                    <span key={j} className={s.hi ? "text-accent" : "text-graphite"}>
                      {s.t}
                    </span>
                  ))}
                </h3>
                <p className="font-inter text-[14px] leading-[1.4] tracking-[-0.03em]">
                  {r.b.map((s, j) => (
                    <span key={j} className={s.hi ? "text-accent" : "text-stone"}>
                      {s.t}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Problem + Brief band (full-bleed) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-8 bg-accent px-6 py-24 text-center md:px-20 md:py-24">
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-mistblue">
                THE PROBLEM
              </p>
              <h2 className="max-w-[960px] font-inter text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.25] tracking-[-0.03em] text-white">
                Construction workers on Indian sites are forced to drink from
                open, unfiltered, shared containers — with no hygiene, no
                dignity, and no infrastructure designed for them.
              </h2>
              <p className="mt-2 font-inter text-[14px] font-medium tracking-[-0.01em] text-mistblue">
                DESIGN BRIEF
              </p>
              <p className="max-w-[800px] font-inter text-[clamp(20px,2.2vw,32px)] font-normal leading-[1.4] tracking-[-0.03em] text-white">
                Design a durable, low-energy water purifier and dispenser that
                survives harsh site conditions, requires no hand contact to
                operate, and serves clean water to the most ignored user.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- User Pain Points ---------- */}
        <SectionHead
          className="mt-28"
          kicker="USER PAIN POINTS"
          title="Key Challenges Identified"
        />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map(([n, t, b, icon]) => (
            <div key={n} className="flex h-full flex-col gap-4 bg-[#ffffff] px-7 py-8">
              <div className="flex items-start justify-between gap-4">
                <p className="font-sans text-[32px] font-normal leading-none tracking-[-0.03em] text-accent">
                  {n}
                </p>
                <img src={icon} alt="" aria-hidden className="h-[44px] w-[44px] object-contain" />
              </div>
              <h3 className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
                {t}
              </h3>
              <p className="font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                {b}
              </p>
            </div>
          ))}
        </div>

        {/* ---------- Ideation (full-bleed image) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="Ideation"
          title="Quick brainstorming sketches"
        />
        <FullBleed className="mt-10">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/ideation.png?tr=orig-true" alt="Brainstorming sketches" className="w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- The Response ---------- */}
        <section className="mt-28 grid grid-cols-1 items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal>
            <Eyebrow>THE RESPONSE</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              Designed for Construction Sites
            </h2>
            <div className="mt-8 flex flex-col gap-6 font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-graphite">
              <p>
                <Highlight
                  segments={[
                    "A purpose-built water purification and dispensing system developed specifically for",
                    [" construction-site environments.", true],
                  ]}
                />
              </p>
              <p>
                <Highlight
                  segments={[
                    "Combining solar-powered operation, multi-stage filtration, hands-free dispensing, and mobility, the design provides ",
                    ["safe and reliable access to drinking water ", true],
                    "while addressing the environmental and operational challenges identified during research.",
                  ]}
                />
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/sketch.png?tr=orig-true" alt="Sketch progression" className="w-full rounded-[3px]" />
          </Reveal>
        </section>

        {/* ---------- Anatomy ---------- */}
        <SectionHead
          className="mt-28"
          kicker="ANATOMY"
          title="Key Components and Functions"
        />
        <section className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/exploded.png?tr=orig-true" alt="Exploded view — components" className="w-full rounded-[3px]" />
          </Reveal>
          <Reveal delay={120}>
            <ul className="flex flex-col">
              {components.map(([n, t, b]) => (
                <li key={n} className="flex gap-4 border-t border-black/10 py-4 first:border-t-0">
                  <span className="font-sans text-[24px] font-medium leading-none tracking-[-0.03em] text-accent">
                    {n}
                  </span>
                  <div>
                    <p className="font-sans text-[18px] font-medium tracking-[-0.03em] text-graphite">
                      {t}
                    </p>
                    <p className="mt-1 font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                      {b}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ---------- Process ---------- */}
        <SectionHead
          className="mt-28"
          kicker="Process"
          title="Water Treatment Process"
        />
        <section className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-12">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-4">
              {stages.map(([t, b]) => (
                <div key={t} className="flex flex-col gap-1 bg-[#ffffff] px-6 py-7">
                  <p className="font-oswald text-[clamp(28px,3.4vw,36px)] font-normal leading-none tracking-[-0.03em] text-graphite">
                    {t}
                  </p>
                  <p className="font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/filtration.png?tr=orig-true" alt="Water treatment process render" className="h-full w-full rounded-[3px] object-cover" />
          </Reveal>
        </section>

        {/* ---------- Specifications & Interaction (full-width infographic) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img
            src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/process-render.png?tr=orig-true"
            alt="Specifications and interaction — materials, dimensions, performance, and how the unit operates."
            className="w-full rounded-[3px]"
          />
        </Reveal>

        {/* ---------- Mechanism ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-2">
          {/* image 1 */}
          <Reveal y={32}>
            <figure className="flex flex-col gap-5">
              <img src={mechanisms[0][0]} alt={mechanisms[0][1]} className="aspect-[519/349] w-full rounded-[3px] object-cover" />
              <figcaption className="font-sans text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.1] tracking-[-0.03em] text-graphite">
                {mechanisms[0][1]}
              </figcaption>
            </figure>
          </Reveal>
          {/* heading */}
          <Reveal delay={80} className="flex flex-col justify-start md:pl-4">
            <Eyebrow>MECHANISM</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              No handles No hand contact
            </h2>
          </Reveal>
          {/* image 2 */}
          <Reveal y={32}>
            <figure className="flex flex-col gap-5">
              <img src={mechanisms[1][0]} alt={mechanisms[1][1]} className="aspect-[519/349] w-full rounded-[3px] object-cover" />
              <figcaption className="font-sans text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.1] tracking-[-0.03em] text-graphite">
                {mechanisms[1][1]}
              </figcaption>
            </figure>
          </Reveal>
          {/* image 3 */}
          <Reveal delay={80} y={32}>
            <figure className="flex flex-col gap-5">
              <img src={mechanisms[2][0]} alt={mechanisms[2][1]} className="aspect-[518/416] w-full rounded-[3px] object-cover" />
              <figcaption className="font-sans text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.1] tracking-[-0.03em] text-graphite">
                {mechanisms[2][1]}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ---------- Final Form ---------- */}
        <SectionHead
          className="mt-28"
          kicker="FINAL FORM"
          title="The unit, from every angle."
        />
        {/* Images shown at their natural aspect ratio so nothing crops and the
            gallery scales cleanly at every width. */}
        <div className="mt-10 flex flex-col gap-4">
          <Reveal y={32}>
            <img
              src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/final-unit.png?tr=orig-true"
              alt="The full unit with its solar kite deployed"
              className="h-auto w-full rounded-[3px]"
            />
          </Reveal>
          {[
            [
              ["final-alcove", "Bottle-filling alcove"],
              ["final-shell", "Shell opened around the filtration core"],
            ],
            [
              ["final-top", "Top grille detail"],
              ["final-door", "Service door open — cartridges and tank"],
            ],
            [
              ["final-angle", "Three-quarter view, panel open"],
              ["final-internals", "Internal assembly without the shell"],
            ],
          ].map(([left, right], i) => (
            <Reveal key={left[0]} delay={(i + 1) * 60} y={32}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <img src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/${left[0]}.png?tr=orig-true`} alt={left[1]} className="h-auto w-full rounded-[3px]" />
                <img src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs01/${right[0]}.png?tr=orig-true`} alt={right[1]} className="h-auto w-full rounded-[3px]" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Reflection ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>REFLECTION</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(30px,3.6vw,40px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
              Key Takeaways
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[760px] font-inter text-[18px] leading-[1.5] tracking-[-0.02em] text-graphite">
              <Highlight
                segments={[
                  "Designing for an ",
                  ["underserved user group ", true],
                  "reshaped the entire project. Every decision was guided by a simple question:",
                  [" could it withstand the realities of a construction site? ", true],
                  "This led to a focus on simplicity, durability, and ease of use. Rather than adding features, the process involved ",
                  ["removing complexity,", true],
                  " resulting in a system that ",
                  ["provides clean drinking water ", true],
                  "with minimal effort or maintenance.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/headway" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              Next Project
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              Redesigning Headway →
            </p>
          </a>
          <a
            href="/#work"
            className="font-inter text-[16px] font-medium tracking-[-0.02em] text-graphite transition-colors hover:text-accent"
          >
            Back to all work →
          </a>
        </nav>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-6 py-8 font-sans text-[16px] font-medium tracking-[-0.02em] sm:flex-row sm:items-center sm:justify-between md:text-[21px]">
          <p className="text-accent">Arnab Gupta ⏤ Product Designer</p>
          <div className="flex items-center gap-6 text-graphite">
            <a href="https://www.behance.net/arnabgupta4" target="_blank" rel="noreferrer" className="underline decoration-from-font underline-offset-2 transition-colors hover:text-accent">
              Behance
            </a>
            <a href="https://www.linkedin.com/in/arnab-gupta-2b8256231/" target="_blank" rel="noreferrer" className="underline decoration-from-font underline-offset-2 transition-colors hover:text-accent">
              Linkedin
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
