import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "I.S.B.T. Flyover — Arnab Gupta",
  description:
    "Turning the unused surface above a Dehradun flyover into a multi-level public space — amphitheatre, kids park, indoor games, and amenities atop a high-footfall transit zone.",
};

/* ---------- shared bits ---------- */

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

function CenteredHead({
  kicker,
  title,
  className = "",
}: {
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`text-center ${className}`}>
      {kicker ? <Eyebrow>{kicker}</Eyebrow> : null}
      <h2 className="mt-2 font-sans text-[clamp(34px,5.4vw,64px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
        {title}
      </h2>
    </Reveal>
  );
}

/* ---------- content data (verbatim from Figma) ---------- */

const meta = [
  { label: "Year", value: "2025" },
  { label: "Discipline", value: "Spatial Design" },
  { label: "Hypothetical client", value: "MDDA / PWD" },
];

const included = [
  "Spatial planning — seating, stage, circulation",
  "Structural coordination with existing flyover",
  "Material & finish selection",
  "Landscape, shading, ventilation",
  "Furniture & fixtures",
  "Wayfinding & accessibility",
];

const excluded = [
  "Real construction work",
  "Structural calculations / load testing",
  "Cost estimation / budget",
  "Electrical, plumbing, mechanical detail",
  "Real client engagement (MDDA/PWD hypothetical)",
];

const research = [
  ["research-1", "ON-SITE OBSERVATION", "User behaviour, traffic flow, problem spotting at peak and off-peak hours."],
  ["research-2", "STAKEHOLDER INTERVIEWS", "Locals, students, shopkeepers, drivers, travellers, parents, bike riders, kids."],
  ["research-3", "DOCUMENTATION + CLUSTERING", "Extracting patterns across responses; surfacing what to prioritise."],
];

const problems = [
  ["problem-1", "Lack of Green Infrastructure", "Harsh microclimate, no trees. No softscape or visual relief. Unpleasant for daily users."],
  ["problem-2", "Absence of Essential Amenities", "No public toilets or water. No seating or shaded rest. No charging or waiting areas."],
  ["problem-3", "Poor Maintenance & Safety", "Unhygienic and littered. Unsafe especially for women. Poor drainage, smell issues."],
];

const facilities = [
  ["IMPORTANT", true, ["Sports facility", "Open amphitheatre", "Children's park", "Amenities complex"]],
  ["INTEGRATED", true, ["Waiting area", "Seating complex", "Parking complex"]],
  ["NOT REQUIRED", false, ["Co-working", "Stand", "Study complex", "Open gym"]],
  ["NOT REQUIRED", false, ["Art gallery", "Open stage", "Auditorium", "Salons", "Yoga studio"]],
];

const sensory = [
  ["sensory-sight", "SIGHT", "Tensile canopies, glass facades, perforated shadow screens."],
  ["sensory-sound", "SOUND", "Acoustic wooden interiors. Amphitheatre seating for natural focus."],
  ["sensory-smell", "SMELL", "Vertical greenery. Planted railings. Garden stairwells."],
  ["sensory-touch", "TOUCH", "Smooth concrete. Terracotta jali. Textured red earth walls."],
];

const sustain = [
  "Carbon-fibre reduces load on the existing flyover.",
  "ETFE roof — natural light + heat reduction + fully recyclable.",
  "Recyclable, low-impact materials throughout.",
];

const prototyping = [
  ["proto-scaling", "SCALING", "1m : 2cm. Drafting the curves and dimensions at scale on large sheets."],
  ["proto-material", "MATERIAL TESTING", "Starching fabric to test the canopy skin behaviour."],
  ["proto-laser", "SVG + LASER CUTTING", "Elevator booth, flyover pillars, tunnel pieces, archways."],
  ["proto-assembly", "MODEL ASSEMBLY", "Team build — fitting the laser-cut pieces together."],
];

/* eslint-disable @next/next/no-img-element */

export default function Flyover() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="max-w-[600px] font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                I.S.B.T. Flyover.
              </h1>
              <p className="mt-8 max-w-[620px] font-inter text-[18px] leading-[1.5] tracking-[-0.03em] text-accent">
                Turning the unused surface above a Dehradun flyover into a
                multi-level public space — amphitheatre, kids park, indoor games,
                and amenities atop a high-footfall transit zone.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:flex md:flex-col md:gap-6">
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
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/hero.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- The Site (image left, text right) ---------- */}
        <section className="mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-[519fr_520fr] lg:gap-20">
          <Reveal y={32}>
            <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/site.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>THE SITE</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              Dehradun I.S.B.T.
            </h2>
            <p className="mt-6 font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-graphite">
              <Highlight
                segments={[
                  "Connects ",
                  ["Transport Nagar", true],
                  " to the ",
                  ["Shimla bypass", true],
                  ". Foundation laid on March 2013 with a total budget of ₹50.39 Cr. Opened on December 11, 2016, after years of political and construction delays.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Site stats (Length / Width / Nearby + photo collage) ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[212px_1fr] lg:gap-12">
          <Reveal>
            <dl className="flex flex-col gap-10">
              {[
                ["Length", "83 ft / compartment"],
                ["Width", "36 ft / compartment"],
                ["Nearby", "Turner Rd · Majra · Clement Town"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-inter text-[14px] tracking-[-0.03em] text-stone">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-inter text-[15px] font-medium tracking-[-0.03em] text-graphite">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} y={32}>
            <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/site-photos.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
          </Reveal>
        </div>

        {/* ---------- Scope ---------- */}
        <SectionHead
          className="mt-28"
          kicker="SCOPE"
          title="Defining the boundaries of intervention"
        />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
          <Reveal>
            <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-accent">
              INCLUDED
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {included.map((x) => (
                <li key={x} className="flex gap-3 font-inter text-[15px] leading-[1.4] tracking-[-0.03em] text-graphite">
                  <span aria-hidden className="text-accent">+</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-stone">
              EXCLUDED
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {excluded.map((x) => (
                <li key={x} className="flex gap-3 font-inter text-[15px] leading-[1.4] tracking-[-0.03em] text-stone">
                  <span aria-hidden className="text-accent">—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- Research (3-col: image top, label, text) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="RESEARCH"
          title="Understanding people, place, and potential"
        />
        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          {research.map(([img, k, b]) => (
            <Reveal key={k} y={32}>
              <figure className="flex flex-col gap-4">
                <img loading="lazy" decoding="async" src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/${img}.png?tr=orig-true`} alt="" className="aspect-[362/241] w-full rounded-[3px] object-cover" />
                <figcaption>
                  <p className="font-inter text-[14px] font-semibold tracking-[-0.01em] text-accent">
                    {k}
                  </p>
                  <p className="mt-2 font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                    {b}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- Stakeholder Mapping (diagram) + full-bleed quote band ---------- */}
        <Reveal className="mt-28" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/stakeholder.png?tr=orig-true" alt="Stakeholder Mapping" className="mx-auto h-auto w-full max-w-[1120px]" />
        </Reveal>
        <FullBleed className="mt-12">
          <Reveal y={32}>
            <div className="bg-accent px-6 py-12 md:py-14">
              <p className="mx-auto max-w-[1024px] text-center font-sans text-[clamp(20px,2.6vw,28px)] font-normal leading-[1.3] tracking-[-0.03em] text-white">
                &ldquo;Users perceive the under-flyover as neglected, unsafe, and
                uncomfortable — lacking identity and human scale.&rdquo;
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Problems Observed (3-col: image top, title, text) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="PROBLEMS OBSERVED"
          title="Why the space remains underused ?"
        />
        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3">
          {problems.map(([img, title, body]) => (
            <Reveal key={title} y={32}>
              <figure className="flex flex-col gap-4">
                <img loading="lazy" decoding="async" src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/${img}.png?tr=orig-true`} alt="" className="aspect-[357/201] w-full rounded-[3px] object-cover" />
                <figcaption>
                  <p className="font-inter text-[14px] font-semibold tracking-[-0.01em] text-graphite">
                    {title}
                  </p>
                  <p className="mt-2 font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                    {body}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- The Pivot (full-bleed blue, centered) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-8 bg-accent px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white/80">
                THE PIVOT
              </p>
              <h2 className="max-w-[1000px] font-oswald text-[clamp(30px,4.4vw,52px)] font-normal leading-[1.15] tracking-[-0.02em] text-white">
                What if we stopped designing UNDER the flyover, and started
                designing OVER it?
              </h2>
              <p className="max-w-[1004px] font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-white/90">
                The unused surface above the flyover is the largest underused
                public asset on the route. We shifted scope from underpass to
                overhead — a multi-level public space on and around the flyover
                that fosters social inclusivity and community engagement.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Proposed Facilities (4 columns) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="PROPOSED FACILITIES"
          title="What goes up. What stays out."
        />
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {facilities.map(([label, blue, items], i) => (
            <Reveal key={i} delay={(i % 4) * 50}>
              <div className="flex h-full flex-col gap-5">
                <p className={`font-inter text-[14px] font-medium tracking-[-0.01em] ${blue ? "text-accent" : "text-stone"}`}>
                  {label as string}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {(items as string[]).map((it) => (
                    <li key={it} className="font-inter text-[15px] tracking-[-0.03em] text-graphite">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Initial Iterations (centered heading + full-width image) ---------- */}
        <CenteredHead
          className="mt-28"
          kicker="INITIAL ITERATIONS"
          title="Exploring the forms"
        />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/iterations.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Final Form (centered heading + full-width image) ---------- */}
        <CenteredHead className="mt-28" title="Final Form" />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/final-form.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Zoning & Plans ---------- */}
        <SectionHead
          className="mt-28"
          kicker="ZONING & PLANS"
          title="Activity and movement"
        />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/zoning.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Sensory Design (4-col: image top, label, text) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="SENSORY DESIGN"
          title="Designing beyond visual"
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {sensory.map(([img, label, body]) => (
            <Reveal key={img} y={32}>
              <div className="flex flex-col gap-3">
                <img loading="lazy" decoding="async" src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/${img}.png?tr=orig-true`} alt="" className="aspect-[268/140] w-full rounded-[3px] object-cover" />
                <p className="mt-1 font-inter text-[14px] font-semibold tracking-[-0.01em] text-accent">
                  {label}
                </p>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Fabrication ---------- */}
        <SectionHead
          className="mt-28"
          kicker="FABRICATION"
          title="Lightweight, sustainable, and adaptable"
        />
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[540px_1fr] md:gap-20">
          <Reveal>
            <p className="font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-graphite">
              <Highlight
                segments={[
                  "The proposal utilizes ",
                  ["lightweight", true],
                  " and ",
                  ["recyclable materials", true],
                  " to minimize additional ",
                  ["structural load", true],
                  " while promoting long-term ",
                  ["sustainability", true],
                  ".",
                ]}
              />
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-inter text-[13px] font-medium uppercase tracking-[0.04em] text-stone">
              SUSTAINABILITY HIGHLIGHTS
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {sustain.map((s) => (
                <li key={s} className="flex gap-3 font-inter text-[15px] leading-[1.4] tracking-[-0.03em] text-graphite">
                  <span aria-hidden className="text-accent">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/materials.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Prototyping (4-col image-top cards + 2 model photos) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="PROTOTYPING"
          title="Model Making"
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {prototyping.map(([img, k, b]) => (
            <Reveal key={k} y={32}>
              <div className="flex flex-col gap-3">
                <img loading="lazy" decoding="async" src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/${img}.png?tr=orig-true`} alt="" className="aspect-[268/240] w-full rounded-[3px] object-cover" />
                <p className="mt-1 font-inter text-[14px] font-semibold tracking-[-0.01em] text-accent">
                  {k}
                </p>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8" y={32}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/model-1.png?tr=orig-true" alt="" className="aspect-[552/371] w-full rounded-[3px] object-cover" />
            <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/model-2.png?tr=orig-true" alt="" className="aspect-[552/371] w-full rounded-[3px] object-cover" />
          </div>
        </Reveal>

        {/* ---------- Final Prototype ---------- */}
        <CenteredHead className="mt-28" title="Final Prototype" />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/final-front.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>
        <Reveal className="mt-4" y={32}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/final-3q-1.png?tr=orig-true" alt="" className="aspect-[552/414] w-full rounded-[3px] object-cover" />
              <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/final-wireframe.png?tr=orig-true" alt="" className="aspect-[552/414] w-full rounded-[3px] object-cover" />
            </div>
            <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs04/final-3q-2.png?tr=orig-true" alt="" className="h-full w-full rounded-[3px] object-cover" />
          </div>
        </Reveal>

        {/* ---------- Reflection ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
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
                  "The project’s biggest insight came from",
                  [" reframing the problem.", true],
                  " Research revealed that the under-flyover area had limited potential, while the unused surface above offered a far greater ",
                  ["opportunity for public use. ", true],
                  "This shift transformed the project from a simple redesign into an exploration of how ",
                  ["infrastructure can create meaningful civic spaces.", true],
                  " Working in a multidisciplinary team also reinforced the value of clear roles, trust, and collaboration in delivering stronger outcomes.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/uphaar-tea" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              NEXT PROJECT
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              From Pouch to Bamboo →
            </p>
          </a>
          <a
            href="/#work"
            className="font-inter text-[16px] font-medium tracking-[-0.02em] text-graphite transition-colors hover:text-accent"
          >
            View all work →
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
