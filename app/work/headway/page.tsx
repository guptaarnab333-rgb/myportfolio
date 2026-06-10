import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Redesigning Headway — Arnab Gupta",
  description:
    "Expanding accessibility and engagement on a book-summary app — for users who read in Hindi, get distracted, and want their reading to belong to them.",
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
  { label: "Discipline", value: "UX · UI" },
  { label: "Platform", value: "Android" },
  { label: "Scope", value: "50+ screens · 2 weeks" },
];

const why = [
  "Outdated visual style",
  "Limited customization",
  "English-only language support",
  "Low engagement after onboarding",
  "Weak audiobook experience",
];

const problems = [
  ["01", "Complicated navigation", "Users get lost between sections; features hide behind extra taps."],
  ["02", "Lengthy onboarding", "Too many intro cards. Users fatigue before seeing value."],
  ["03", "Interruptive streaks", "Mid-read prompts break flow and ask for attention at the wrong moment."],
  ["04", "Restricted discovery", "Search and recommendations feel narrow; no language variety."],
  ["05", "No customization", "One reading mode, one font, no notes. Reading is forced to fit the app."],
];

const compare = [
  ["One text size only", "Text adjustable across 4 fonts"],
  ["Light + Dark backgrounds only", "Light · Dark · Beige · Black"],
  ["Audiobook (basic)", "Audiobook + white-noise (rainfall · gentle waves)"],
  ["No ratings or reviews", "Ratings & reviews per book"],
  ["Library without customization", "Custom reading lists"],
  ["English-only language", "Multiple languages, including Hindi"],
  ["Translate prompt", "Built-in dictionary"],
  ["Streak prompt", "Streak animations + non-blocking notifications"],
  ["—", "Annotation sharing"],
];

/* eslint-disable @next/next/no-img-element */

export default function Headway() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="max-w-[600px] font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                Redesigning Headway
              </h1>
              <p className="mt-8 max-w-[620px] font-inter text-[18px] leading-[1.5] tracking-[-0.03em] text-accent">
                Expanding accessibility and engagement on a book-summary app —
                for users who read in Hindi, get distracted, and want their
                reading to belong to them.
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

        {/* ---------- Hero promo image ---------- */}
        <Reveal className="mt-16" y={36}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/hero.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- The Why ---------- */}
        <SectionHead className="mt-28" kicker="THE WHY" title="Why redesign it" />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w} className="flex gap-3 border-t border-black/10 py-5 font-inter text-[16px] tracking-[-0.03em] text-graphite">
              <span aria-hidden className="text-accent">×</span>
              <span>{w}</span>
            </div>
          ))}
        </div>

        {/* ---------- Process ---------- */}
        <Reveal className="mt-28">
          <Eyebrow>PROCESS</Eyebrow>
          <h2 className="mt-4 whitespace-nowrap font-sans font-normal leading-[1.2] tracking-[-0.04em] text-graphite text-[min(4.2vw,64px)]">
            Discover → Define → Ideate → Design → Test
          </h2>
        </Reveal>
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/process-map.png?tr=orig-true" alt="" className="h-auto w-full" />
        </Reveal>

        {/* ---------- Discover: Competitor Analysis ---------- */}
        <Reveal className="mt-28 text-center">
          <Eyebrow>DISCOVER</Eyebrow>
          <h2 className="mt-2 font-sans text-[clamp(34px,5.4vw,64px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
            Competitor Analysis
          </h2>
        </Reveal>
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/competitor-table.png?tr=orig-true" alt="" className="mx-auto h-auto w-full max-w-[990px]" />
        </Reveal>

        {/* ---------- User Surveys (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/survey.png?tr=orig-true" alt="User Surveys" className="mx-auto h-auto w-full max-w-[1120px] rounded-[3px]" />
        </Reveal>

        {/* ---------- Old / New comparison ---------- */}
        <Reveal className="mt-28" y={32}>
          <div className="overflow-hidden rounded-[3px] border border-black/10">
            <div className="grid grid-cols-2 bg-graphite font-inter text-[14px] font-semibold tracking-[0.04em] text-white">
              <div className="px-6 py-4">OLD</div>
              <div className="border-l border-white/15 px-6 py-4">NEW</div>
            </div>
            {compare.map(([oldV, newV], i) => (
              <div key={i} className="grid grid-cols-2 border-t border-black/10 bg-[#ffffff] font-inter text-[15px] leading-[1.4] tracking-[-0.03em]">
                <div className="px-6 py-4 text-stone">{oldV}</div>
                <div className="border-l border-black/10 px-6 py-4 font-medium text-graphite">{newV}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- Define: problems ---------- */}
        <SectionHead className="mt-28" kicker="DEFINE" title="What we set out to fix" />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(([n, t, b]) => (
            <Reveal key={n}>
              <div className="flex flex-col gap-3">
                <p className="font-oswald text-[32px] font-normal leading-none tracking-[-0.03em] text-accent">
                  {n}
                </p>
                <h3 className="font-sans text-[20px] font-medium tracking-[-0.03em] text-graphite">
                  {t}
                </h3>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- User Journey Map ---------- */}
        <CenteredHead className="mt-28" title="User Journey Map" />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/journey-map.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- User Persona ---------- */}
        <CenteredHead className="mt-28" title="User Persona" />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/persona.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Ideate: user flow ---------- */}
        <SectionHead
          className="mt-28"
          kicker="IDEATE"
          title="Restructured around how readers move"
        />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/user-flow.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Prototype: wireframes ---------- */}
        <SectionHead className="mt-28" kicker="PROTOTYPE" title="Wireframes" />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/wireframes.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Style guide (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/style-guide.png?tr=orig-true" alt="Style Guide — the visual system for new pages." className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- The Screens: hi-fi (individual screens, 2-up on mobile) ---------- */}
        <SectionHead
          className="mt-28"
          kicker="THE SCREENS"
          title="High-Fidelity UI Designs"
        />
        <Reveal className="mt-10" y={32}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <img
                  key={n}
                  src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs03/hifi-${n}.png?tr=orig-true`}
                  alt=""
                  className="h-auto w-full rounded-[6px]"
                />
              );
            })}
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
              The most impactful design decisions came from what was removed, not
              added. Simplifying onboarding, reducing interruptions, and
              eliminating unnecessary choices showed that clarity and restraint
              often create a better experience than adding more features.
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/clutter-to-comfort" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              NEXT PROJECT
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              From Clutter to Comfort →
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
