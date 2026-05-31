import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Ignored User — Arnab Gupta",
  description:
    "A solar-powered, foot-operated water purifier designed for the hands that build India's cities.",
};

/* ---------- shared bits ---------- */

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
      <h2 className="mt-5 max-w-[1000px] font-oswald text-[clamp(34px,5.2vw,60px)] font-normal leading-[1.05] tracking-[-0.03em] text-graphite">
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

const questions = [
  {
    k: "WHO",
    t: "Who is actually thirsty?",
    b: "Daily-wage construction workers, 20–55, men and women, spending 8–12 hours building cities. They don’t own the site. They don’t own the water. They have no voice to demand better.",
    span: "md:col-span-4",
  },
  {
    k: "WHAT",
    t: "What is really happening?",
    b: "Tanker water poured into open drums. No purification. Everyone’s hands go into the same water. Workers cup hands or drink mouth-to-tap.",
    span: "md:col-span-5",
  },
  {
    k: "WHERE",
    t: "Where does the problem live?",
    b: "Active construction sites. Dusty, loud, brutal. No rest zones, no hydration points, no shade. The drum sits wherever the tanker last parked.",
    span: "md:col-span-3",
  },
  {
    k: "WHEN",
    t: "When do they need it most?",
    b: "Every hour. Short desperate bursts between tasks. Peak demand mid-morning and post-lunch — the heat is at its worst and the body is already running on empty.",
    span: "md:col-span-6",
  },
  {
    k: "WHY",
    t: "Why has nobody fixed this?",
    b: "Because the user has no power. A daily-wage worker cannot demand better. The contractor faces no market pressure. The problem persists because the user was never considered worth designing for.",
    span: "md:col-span-6",
  },
];

const pains = [
  ["01", "Contamination at source", "Open, unfiltered tanker water shared by everyone, protected by nothing."],
  ["02", "No hands-free interaction", "Every tap or drum handle requires hands that are never clean."],
  ["03", "One height fits nobody", "Existing dispensers ignore the spread of worker heights and roles."],
  ["04", "Direct mouth-to-tap", "Workers without bottles put hands or mouth on shared surfaces."],
  ["05", "Maintenance nobody owns", "Filters clog. Tanks empty. No indicator, no assigned responsibility."],
  ["06", "The product doesn’t belong here", "Office and home products break within weeks under site conditions."],
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
  ["STAGE 01", "Sediment", "Strips dust, mud, and construction particulate from incoming tanker water. First contact, takes the most abuse."],
  ["STAGE 02", "Carbon", "Removes chlorine, organic compounds, and odour. Water becomes chemically clean."],
  ["STAGE 03", "Ceramic", "Microscopic physical barrier — removes bacteria and biological contamination without power or chemicals."],
  ["STAGE 04", "UV Lamp", "Final sterilisation before water enters storage. Nothing reaches the tank unclean."],
];

const materials = [
  ["Outer body", "Galvanised steel + thermally reflective powder coat. Single flat panels per face. Reflective coat deflects solar IR."],
  ["Water-contact", "Food-grade stainless steel — spouts, taps, internal tank lining. No compromise."],
  ["Construction", "Minimal seams. Minimal dirt traps. Industrial where it needs to be tough. Clinical where it needs to be clean."],
];

const dimensions = [
  ["Spout heights", "120 cm and 152 cm — two ranges, two users."],
  ["Storage tank", "1.7 ft × 1.7 ft × 2.5 ft — 150+ litres per fill, serving 30–50 workers per shift."],
  ["Solar panel", "1.5 ft diameter octagonal, removable, 5 m wire."],
  ["Power balance", "Generates ~150 Wh/day. Consumes ~22–30 Wh/day. ≈5× surplus."],
];

const mechanisms = [
  ["/cases/cs01/mech-pumps.png", "Two DC Pumps", "One pump per spout — dedicated flow paths, no cross-contamination between dispensing points."],
  ["/cases/cs01/mech-paddle.png", "Foot Paddle Switch", "Flat paddle activates an electrical switch. Press flows water; release stops it. Zero hand contact at the point of use."],
  ["/cases/cs01/mech-casters.png", "Retractable Casters", "Lever-deploy wheels for repositioning, retract for stability when stationary."],
];

/* eslint-disable @next/next/no-img-element */

export default function TheIgnoredUser() {
  return (
    <main className="min-h-screen bg-paper text-graphite">
      <Nav variant="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[160px] md:pt-[200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_240px] md:items-end md:gap-20">
            <Reveal>
              <Eyebrow>CASE STUDY 01 / PRODUCT DESIGN</Eyebrow>
              <h1 className="mt-8 font-oswald text-[clamp(52px,10vw,120px)] font-normal leading-[0.95] tracking-[-0.03em] text-graphite">
                The Ignored User.
              </h1>
              <p className="mt-8 max-w-[600px] font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-graphite">
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
          <figure>
            <img
              src="/cases/cs01/hero-context.png"
              alt="The final unit in site — a faceted steel column at a construction site."
              className="w-full rounded-[3px]"
            />
            <figcaption className="mt-4 font-inter text-[12px] tracking-[-0.03em] text-stone">
              The final unit in site — a faceted steel column at a construction
              site.
            </figcaption>
          </figure>
        </Reveal>

        {/* ---------- 01 Context ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[440px_1fr] md:gap-20">
          <Reveal>
            <Eyebrow>01 — CONTEXT</Eyebrow>
            <h2 className="mt-6 font-oswald text-[clamp(40px,5.4vw,60px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
              Where it begins.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex max-w-[600px] flex-col gap-8 font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-graphite">
              <p>
                Daily-wage construction workers in urban and semi-urban India
                spend 8–12 hour shifts in extreme heat with no access to clean
                drinking water. Water arrives in tanker trucks and sits in open,
                unfiltered, shared containers — or they drink tap water,
                unhygienic and without basic consideration for the user.
              </p>
              <p>
                Workers, both men and women, access water with dirty or wet
                hands between physically demanding tasks. No purpose-designed
                water infrastructure exists for this context.
              </p>
            </div>
          </Reveal>
        </section>

        {/* context images */}
        <Reveal className="mt-12" y={32}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <img src="/cases/cs01/context-18.png" alt="Site context" className="h-full w-full rounded-[3px] object-cover" />
            <img src="/cases/cs01/context-19.png" alt="Workers accessing shared water" className="h-full w-full rounded-[3px] object-cover" />
          </div>
        </Reveal>

        {/* ---------- 02 Research ---------- */}
        <SectionHead
          className="mt-28"
          kicker="02 — RESEARCH"
          title="Five questions before a single sketch."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {questions.map((q, i) => (
            <Reveal key={q.k} delay={i * 60} className={`${q.span}`}>
              <div className="flex h-full flex-col gap-4 rounded-[3px] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="font-inter text-[12px] font-medium uppercase tracking-[0.02em] text-accent">
                  {q.k}
                </p>
                <h3 className="font-oswald text-[28px] font-normal leading-[1.05] tracking-[-0.03em] text-graphite">
                  {q.t}
                </h3>
                <p className="font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                  {q.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Problem band ---------- */}
        <Reveal className="mt-28" y={32}>
          <div className="flex flex-col gap-8 rounded-[3px] bg-graphite px-8 py-20 md:px-20 md:py-24">
            <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white">
              THE PROBLEM
            </p>
            <h2 className="max-w-[960px] font-oswald text-[clamp(30px,4.4vw,48px)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
              Construction workers on Indian sites are forced to drink from open,
              unfiltered, shared containers — with no hygiene, no dignity, and no
              infrastructure designed for them.
            </h2>
            <p className="max-w-[800px] font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-mist">
              Design a durable, low-energy water purifier and dispenser that
              survives harsh site conditions, requires no hand contact to
              operate, and serves clean water to the most ignored user.
            </p>
          </div>
        </Reveal>

        {/* ---------- 03 Pain points ---------- */}
        <SectionHead
          className="mt-28"
          kicker="03 — USER PAIN POINTS"
          title="What is hurting them."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pains.map(([n, t, b], i) => (
            <Reveal key={n} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col gap-4 rounded-[3px] bg-white px-7 py-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="font-oswald text-[32px] font-normal tracking-[-0.03em] text-accent">
                  {n}
                </p>
                <h3 className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
                  {t}
                </h3>
                <p className="font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Explorations ---------- */}
        <SectionHead
          className="mt-28"
          kicker="05 — THE EXPLORATIONS"
          title="Exploring best-suited forms for the user context"
        />
        <Reveal className="mt-10" y={32}>
          <img src="/cases/cs01/explorations.png" alt="Form exploration sketches" className="w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- 04 Response ---------- */}
        <section className="mt-28 grid grid-cols-1 items-start gap-12 md:grid-cols-[480px_1fr] md:gap-20">
          <Reveal>
            <Eyebrow>04 — THE RESPONSE</Eyebrow>
            <h2 className="mt-6 font-oswald text-[clamp(40px,5.4vw,60px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
              Built specifically for here.
            </h2>
            <div className="mt-8 flex flex-col gap-6 font-inter text-[15px] leading-[1.45] tracking-[-0.02em] text-stone">
              <p>
                Not adapted. Not borrowed. A water purifier and dispenser
                designed from the ground up for the construction site — built for
                this environment, this user, and this problem.
              </p>
              <p>
                A self-sufficient, faceted steel unit — solar-powered, four-stage
                filtered, foot-operated, and mobile. Clean water on demand. No
                hands. No expertise. No excuses.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} y={32}>
            <img src="/cases/cs01/sketch.png" alt="Sketch progression" className="w-full rounded-[3px]" />
          </Reveal>
        </section>

        {/* ---------- 05 Anatomy ---------- */}
        <SectionHead
          className="mt-28"
          kicker="05 — ANATOMY"
          title="Six components. Every one earning its place."
        />
        <section className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[520px_1fr] md:gap-16">
          <Reveal y={32}>
            <img src="/cases/cs01/exploded.png" alt="Exploded view — components" className="w-full rounded-[3px]" />
          </Reveal>
          <Reveal delay={120}>
            <ul className="flex flex-col">
              {components.map(([n, t, b]) => (
                <li key={n} className="flex gap-4 border-t border-black/10 py-4 first:border-t-0">
                  <span className="font-oswald text-[24px] font-normal leading-none tracking-[-0.03em] text-accent">
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

        {/* ---------- 06 Purification ---------- */}
        <SectionHead
          className="mt-28"
          kicker="06 — PURIFICATION"
          title="Four stages. Each earning its place."
        />
        <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_522px]">
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stages.map(([k, t, b]) => (
                <div key={k} className="flex flex-col gap-5 rounded-[3px] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="font-inter text-[12px] font-medium tracking-[-0.01em] text-accent">
                    {k}
                  </p>
                  <p className="font-oswald text-[36px] font-normal leading-none tracking-[-0.03em] text-graphite">
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
            <img src="/cases/cs01/filtration.png" alt="Filtration flow diagram" className="h-full w-full rounded-[3px] object-cover" />
          </Reveal>
        </section>

        {/* ---------- 07 Specifications ---------- */}
        <SectionHead
          className="mt-28"
          kicker="07 — SPECIFICATIONS"
          title="Every dimension derived from the user."
        />
        <section className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {[
            ["MATERIALS", materials],
            ["DIMENSIONS", dimensions],
          ].map(([heading, rows], idx) => (
            <Reveal key={heading as string} delay={idx * 100}>
              <p className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
                {heading as string}
              </p>
              <div className="mt-6 flex flex-col gap-6">
                {(rows as string[][]).map(([label, body]) => (
                  <div key={label}>
                    <p className="font-inter text-[14px] font-medium tracking-[-0.03em] text-accent">
                      {label}
                    </p>
                    <p className="mt-1.5 font-inter text-[16px] leading-[1.4] tracking-[-0.03em] text-graphite">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </section>

        {/* ---------- 08 Mechanism ---------- */}
        <SectionHead
          className="mt-28"
          kicker="08 — MECHANISM"
          title="No handles. No hand contact."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {mechanisms.map(([img, t, b], i) => (
            <Reveal key={t} delay={i * 80} y={32}>
              <figure className="flex flex-col gap-4">
                <img src={img} alt={t} className="aspect-[357/240] w-full rounded-[3px] object-cover" />
                <figcaption>
                  <p className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
                    {t}
                  </p>
                  <p className="mt-2 font-inter text-[14px] leading-[1.4] tracking-[-0.03em] text-stone">
                    {b}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- 09 Final form ---------- */}
        <SectionHead
          className="mt-28"
          kicker="09 — FINAL FORM"
          title="The unit, from every angle."
        />
        <div className="mt-10 flex flex-col gap-4">
          {["final-hero", "elev1", "elev2", "elev3"].map((name, i) => (
            <Reveal key={name} delay={i * 60} y={32}>
              <img src={`/cases/cs01/${name}.png`} alt="Final form render" className="w-full rounded-[3px]" />
            </Reveal>
          ))}
        </div>

        {/* ---------- Final statement ---------- */}
        <Reveal className="mt-28" y={32}>
          <div className="flex flex-col items-center gap-8 rounded-[3px] bg-accent px-8 py-24 text-center md:px-20 md:py-28">
            <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white">
              THE FINAL STATEMENT
            </p>
            <h2 className="max-w-[960px] font-oswald text-[clamp(30px,4.4vw,48px)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
              “This is not a water purifier. It is a statement, that the person
              doing the most physically demanding work deserves the same basic
              dignity as anyone else.”
            </h2>
            <p className="max-w-[720px] font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-peri">
              The technology exists. The need is documented. The user has been
              waiting. This is what design is for.
            </p>
          </div>
        </Reveal>

        {/* ---------- 10 Reflection ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-20">
          <Reveal>
            <Eyebrow>10 — REFLECTION</Eyebrow>
            <h2 className="mt-6 font-oswald text-[clamp(30px,3.6vw,40px)] font-normal leading-[1.1] tracking-[-0.03em] text-graphite">
              What I took away.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[760px] font-inter text-[18px] leading-[1.5] tracking-[-0.02em] text-graphite">
              Designing for users who have no voice changes the brief. Every
              decision had to clear one bar: would this survive a shift on a real
              site? The answer kept pointing back to subtraction — fewer parts,
              fewer interactions, fewer assumptions. The unit’s strongest feature
              is what it asks of the user: nothing.
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/#work" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              Next Project
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              From Clutter to Comfort — Desk Organizer →
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
