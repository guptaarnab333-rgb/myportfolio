import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight, type Seg } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "From Clutter to Comfort — Arnab Gupta",
  description:
    "A compact desk organizer and laptop stand designed for hostel students who study, eat, sketch, and work from the same limited workspace.",
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

/* ---------- content data ---------- */

const meta = [
  { label: "Year", value: "2024" },
  { label: "Discipline", value: "Product Design" },
  { label: "Duration", value: "4 weeks · Individual" },
  { label: "Users", value: "Hostel Students · Desk Job Person" },
  { label: "Mentor", value: "Mr. Utsav Baluni" },
];

const process = [
  ["DISCOVER", "Desk research, 5W framing, user journey, mind map, benchmark analysis."],
  ["DEFINE", "5 Whys analysis, surveys, interviews, brief."],
  ["DEVELOP", "Brainstorming, ideation sketches, low-fi prototypes, material exploration."],
  ["DELIVER", "Real-world testing, user feedback, iteration plan."],
];

const stats = [
  ["91%", "Lack of storage impacts productivity."],
  ["100%", "Workspace state affects focus and task completion."],
  ["73%", "Find their workspace cluttered or disorganized."],
];

const whys = [
  ["01", "Why do hostel students need an attached organizer?"],
  ["02", "Why is the workspace becoming cluttered?"],
  ["03", "Why is there a lack of storage, and what does it cost?"],
  ["04", "Why is a clutter-free workspace important?"],
  ["05", "Why does this impact productivity at all?"],
];

const concepts = ["concept-1", "concept-2", "concept-3"];

const prototypes = [
  ["proto-1", "Prototype 01 — Foundational form"],
  ["proto-2", "Prototype 02 — Slot detail"],
  ["proto-3", "Prototype 03 — Reduced material"],
];

const fixes: Seg[][] = [
  [["Too many ", false], ["sharp corners and edges.", true]],
  [["More material", true], [" than necessary.", false]],
  [["Overall ", false], ["form-flow ", true], ["could be cleaner.", false]],
];

const nextSteps: Seg[][] = [
  [["Soften corners", true], [" and ", false], ["edges", true], [" throughout.", false]],
  [["Remove the lower section;", false], [" lighter sheet stock.", true]],
  [["Add ", false], ["cutouts", true], [" on the middle and sides for breathability.", false]],
  [["Refine the ", false], ["bend sequence", true], [" for smoother form-flow.", false]],
];

/* eslint-disable @next/next/no-img-element */

export default function ClutterToComfort() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="max-w-[520px] font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                From Clutter to Comfort.
              </h1>
              <p className="mt-8 max-w-[620px] font-inter text-[18px] leading-[1.4] tracking-[-0.03em] text-accent">
                A compact desk organizer and laptop stand designed for hostel
                students who study, eat, sketch, and work from the same limited
                workspace.
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

        {/* ---------- Hero renders ---------- */}
        <Reveal className="mt-16" y={36}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[508fr_681fr] sm:items-end">
            <img
              src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/hero-sub.png?tr=orig-true"
              alt="The desk organizer on a hostel desk"
              className="h-auto w-full rounded-[3px]"
            />
            <img
              src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/hero-main.png?tr=orig-true"
              alt="The final desk organizer in use"
              className="h-auto w-full rounded-[3px]"
            />
          </div>
          <div className="mt-4 flex justify-between font-inter text-[12px] tracking-[-0.03em] text-stone">
            <span>From Clutter</span>
            <span>To Comfort</span>
          </div>
        </Reveal>

        {/* ---------- Context ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal y={32}>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/before-1.png?tr=orig-true" alt="Cluttered hostel desk" className="aspect-[280/181] w-full rounded-[3px] object-cover" />
              <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/before-2.png?tr=orig-true" alt="Cluttered hostel desk" className="aspect-[280/181] mt-12 w-full rounded-[3px] object-cover" />
              <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/before-3.png?tr=orig-true" alt="Cluttered hostel desk" className="aspect-[280/181] w-full rounded-[3px] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>CONTEXT</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              One Desk, Multiple Roles
            </h2>
            <div className="mt-8 flex flex-col gap-6 font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-graphite">
              <p>
                In most hostel rooms, a single desk serves as a study station,
                dining table, storage unit, and creative workspace. As tasks
                change throughout the day, objects constantly need to be moved,
                creating clutter and disrupting focus.
              </p>
              <p>
                <Highlight
                  segments={[
                    "What started as personal frustration became the brief: ",
                    ["design for hostelers who can’t add a second desk, but desperately need a way to keep this one usable.", true],
                  ]}
                />
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------- Methodology ---------- */}
        <SectionHead
          className="mt-28"
          kicker="METHODOLOGY"
          title="Design Process"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([step, body], i) => (
            <Reveal key={step} delay={(i % 4) * 60}>
              <div className="flex h-full flex-col gap-6 bg-[#ffffff] px-7 py-8">
                <p className="font-oswald text-[24px] font-normal tracking-[-0.03em] text-accent">
                  {step}
                </p>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Research Findings ---------- */}
        <SectionHead
          className="mt-28"
          kicker="RESEARCH FINDINGS"
          title="What Users Revealed"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map(([num, label], i) => (
            <Reveal key={num} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col gap-6 bg-[#ffffff] px-8 py-10">
                <p className="font-oswald text-[clamp(64px,8vw,96px)] font-normal leading-[0.9] tracking-[-0.03em] text-accent">
                  {num}
                </p>
                <p className="max-w-[293px] font-sans text-[18px] font-medium leading-[1.3] tracking-[-0.03em] text-graphite">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6" y={32}>
          <div className="flex flex-col items-start gap-6 bg-[#ffffff] px-8 py-12 sm:flex-row sm:items-center sm:gap-12 md:px-12">
            <p className="font-oswald text-[clamp(96px,16vw,144px)] font-normal leading-[0.85] tracking-[-0.03em] text-accent">
              64%
            </p>
            <p className="max-w-[760px] font-sans text-[clamp(24px,3vw,32px)] font-normal leading-[1.2] tracking-[-0.03em] text-graphite">
              find it challenging to keep their workspace clean and organized —
              even when they want to.
            </p>
          </div>
        </Reveal>

        {/* ---------- 5 Whys ---------- */}
        <SectionHead
          className="mt-28"
          kicker="5 WHYS"
          title="Understanding the Root Cause"
        />
        <Reveal className="mt-10" y={32}>
          <ul className="flex flex-col">
            {whys.map(([n, q]) => (
              <li
                key={n}
                className="flex items-center gap-6 border-t border-black/10 py-7 first:border-t-0 md:gap-10"
              >
                <span className="font-oswald text-[clamp(36px,5vw,48px)] font-normal leading-none tracking-[-0.03em] text-accent">
                  {n}
                </span>
                <p className="font-sans text-[clamp(18px,2.4vw,24px)] font-normal leading-[1.3] tracking-[-0.03em] text-graphite">
                  {q}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-12" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/fivewhys.png?tr=orig-true" alt="5 Whys workshop notes" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Design Brief band (full-bleed, dark) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-8 bg-graphite px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white">
                DESIGN BRIEF
              </p>
              <p className="max-w-[1131px] font-sans text-[clamp(24px,3.4vw,36px)] font-normal leading-[1.3] tracking-[-0.03em] text-mist">
                Design a simple, space-efficient product that helps users
                organize their essentials and reduce desk clutter, allowing them
                to switch between activities without repeatedly clearing their
                workspace.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- The Concept ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>THE CONCEPT</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              One Sheet. One Process. One Product.
            </h2>
            <p className="mt-8 font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-graphite">
              <Highlight
                segments={[
                  "After exploring multiple concepts, the strongest solution emerged from a principle of simplicity. The design uses a ",
                  ["single sheet of metal ", true],
                  "that is cut and bent into shape ",
                  ["without requiring hinges", true],
                  ", screws, or additional components. This approach",
                  [" reduced manufacturing complexity, minimized material usage,", true],
                  " and created a",
                  [" low-cost product", true],
                  " that could be assembled quickly while maintaining structural strength.",
                ]}
              />
            </p>
          </Reveal>
          <Reveal delay={120} y={32}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/concept-2.png?tr=orig-true"
                alt="Concept render"
                className="col-start-1 row-start-1 mt-12 h-auto w-full self-start rounded-[3px]"
              />
              <img
                src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/concept-1.png?tr=orig-true"
                alt="Concept render"
                className="col-start-2 row-start-1 h-auto w-full rounded-[3px]"
              />
              <img
                src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/concept-3.png?tr=orig-true"
                alt="Concept render"
                className="col-start-2 row-start-2 h-auto w-full rounded-[3px]"
              />
            </div>
          </Reveal>
        </section>

        {/* ---------- Prototyping ---------- */}
        <SectionHead
          className="mt-28"
          kicker="PROTOTYPING"
          title="Iterating Through Form"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {prototypes.map(([img, caption], i) => (
            <Reveal key={img} delay={(i % 3) * 60} y={32}>
              <figure className="flex flex-col gap-4">
                <img src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/${img}.png?tr=orig-true`} alt={caption} className="aspect-[362/280] w-full rounded-[3px] object-cover" />
                <figcaption className="font-inter text-[14px] font-medium tracking-[-0.03em] text-graphite">
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12" y={32}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/midfi-1.png?tr=orig-true" alt="Mid-fidelity prototype — final form" className="aspect-[551/338] w-full rounded-[3px] object-cover" />
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/midfi-2.png?tr=orig-true" alt="Mid-fidelity prototype — final form" className="aspect-[551/338] w-full rounded-[3px] object-cover" />
          </div>
          <p className="mt-4 font-inter text-[14px] tracking-[-0.03em] text-stone">
            The mid-fidelity prototype: final form, real material, ready for the
            desk.
          </p>
        </Reveal>

        {/* ---------- Testing ---------- */}
        <SectionHead
          className="mt-28"
          kicker="TESTING"
          title="Evaluating Workspace Impact"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            ["before-state", "BEFORE — desk in everyday state"],
            ["after-state", "AFTER — same desk with the prototype"],
          ].map(([img, caption]) => (
            <Reveal key={img} y={32}>
              <figure className="flex flex-col gap-4">
                <img src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs02/${img}.png?tr=orig-true`} alt={caption} className="aspect-[552/414] w-full rounded-[3px] object-cover" />
                <figcaption className="font-inter text-[14px] font-medium tracking-[-0.03em] text-graphite">
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- Feedback ---------- */}
        <SectionHead
          className="mt-28"
          kicker="FEEDBACK"
          title="What Worked — And What Didn't"
        />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h3 className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
              What needed fixing
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {fixes.map((f, i) => (
                <li key={i} className="flex gap-3 font-inter text-[16px] leading-[1.4] tracking-[-0.03em] text-stone">
                  <span aria-hidden>—</span>
                  <span><Highlight segments={f} /></span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
              Next iteration
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {nextSteps.map((s, i) => (
                <li key={i} className="flex gap-3 font-inter text-[16px] leading-[1.4] tracking-[-0.03em] text-graphite">
                  <span aria-hidden className="text-accent">→</span>
                  <span><Highlight segments={s} /></span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- Reflection ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>REFLECTION</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(30px,3.6vw,40px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
              What I took away.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[760px] font-inter text-[18px] leading-[1.5] tracking-[-0.02em] text-graphite">
              <Highlight
                segments={[
                  "This project reinforced an important lesson: ",
                  ["constraints often lead to the most effective solutions.", true],
                  " By focusing on a specific user group, a limited space, and a simple manufacturing process, the design became clearer, more practical, and easier to understand. Rather than adding features, the solution emerged through reduction — ",
                  ["one sheet, one process, ", true],
                  "and",
                  [" one purpose:", true],
                  " making a small workspace work better.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/gargi" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              Next Project
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              Gargi — Nari Shakti →
            </p>
          </a>
          <a
            href="/#work"
            className="font-inter text-[16px] font-medium tracking-[-0.02em] text-graphite transition-colors hover:text-accent"
          >
            Back to home →
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
