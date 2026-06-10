import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight, type Seg } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "Gargi — Nari Shakti — Arnab Gupta",
  description:
    "An AI companion, emergency assistance, and grievance platform empowering women across Uttarakhand. Commissioned by Lok Bhavan.",
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
  { label: "Year", value: "2025" },
  { label: "Discipline", value: "UX · UI Design" },
  { label: "Duration", value: "4 weeks" },
  { label: "Design", value: "Arnab Gupta & Sukalp Dabral" },
  { label: "Client", value: "Lok Bhavan, Uttarakhand" },
];

const process = [
  ["DISCOVER", "Secondary research, user research, competitor analysis."],
  ["DEFINE", "User persona, empathy map, journey map."],
  ["IDEATE", "Mind mapping, user flow, information architecture."],
  ["PROTOTYPE", "Wireframes, design system, high-fidelity prototype."],
  ["TEST", "Usability tests, user reviews, iteration."],
];

const stats: { num: string; body: Seg[] }[] = [
  {
    num: "85%",
    body: [
      "of respondents stated they would ",
      ["prefer an AI mentor ", true],
      "for sensitive career or personal questions over a human contact due to guaranteed anonymity.",
    ],
  },
  {
    num: "90%",
    body: [
      "of users rated “",
      ["immediate access to locally relevant emergency and government helplines", true],
      "” as a top-three necessity.",
    ],
  },
  {
    num: "35%",
    body: [
      "Only 35% could ",
      ["reliably recall ", true],
      "more than two Uttarakhand-specific contact numbers.",
    ],
  },
  {
    num: "78%",
    body: [
      "of users reported feeling their ",
      ["formal complaints were ignored or lost ", true],
      "when submitted via traditional email or paper channels.",
    ],
  },
  {
    num: "90%",
    body: [
      "stated that ",
      ["real-time status tracking ", true],
      "was essential to build institutional trust.",
    ],
  },
];

const sitemap = [
  ["Chat with Gargi", "Talk to Gargi AI"],
  ["Grievance Portal", "File · Track"],
  ["Helplines", "Uttarakhand-specific directory"],
  ["SOS", "One-tap emergency contact"],
  ["Profile / Mission", "Account · About Gargi"],
];

const flows = [
  ["flow-1", "01 · ONBOARDING", "Seamless Onboarding", "Streamlining the login process with options to log in via ID & password, Facebook, or Google. The first impression is calm, clear, and free of busywork — the user is on a flow inside three taps."],
  ["flow-2", "02 · GRIEVANCE", "File and Track Grievance", "Fearlessly file and track complaints through a transparent, secure, logged process. Every submission gets a tracking ID and a real-time status — institutional accountability becomes the user's default experience."],
  ["flow-3", "03 · HELPLINES", "Access Support", "Immediate access to critical support — both essential national helplines and the emergency / government contacts specific to Uttarakhand. CM grievance cell, state police, district medical — surfaced first."],
  ["flow-4", "04 · CHAT BOT", "Chat with Gargi", "The Gargi AI is your confidential mentor — immediate, non-judgmental support for all matters of empowerment and self-advocacy. The chat surface is the front door; everything else is a tool inside it."],
  ["flow-5", "05 · MISSION HUB", "Profile & Mission", "A personal hub to manage account details, language settings, and preferences — and the central place to read about the Project Gargi mission. Schemes, Helplines, SOS, and Chat sit one tap away."],
];

/* eslint-disable @next/next/no-img-element */

export default function Gargi() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="max-w-[760px] font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                Gargi — Nari Shakti
              </h1>
              <p className="mt-8 max-w-[760px] font-inter text-[18px] leading-[1.5] tracking-[-0.03em] text-accent">
                Commissioned by Lok Bhavan, Uttarakhand, Gargi Nari Shakti
                combines AI guidance, emergency assistance, and grievance
                management into a single digital platform — accessible,
                trustworthy, and action-oriented, empowering women with
                confidential support and direct access to institutional services.
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

        {/* ---------- Hero collage ---------- */}
        <Reveal className="mt-16" y={36}>
          <img
            src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06/hero-collage.png?tr=orig-true"
            alt="Gargi app screens collage"
            className="h-auto w-full rounded-[3px]"
          />
        </Reveal>

        {/* ---------- Context ---------- */}
        <SectionHead
          className="mt-28"
          kicker="CONTEXT"
          title="Building a trusted digital companion"
        />
        <div className="mt-10 grid grid-cols-1 gap-10 font-inter text-[18px] leading-[1.5] tracking-[-0.03em] text-graphite md:grid-cols-2 md:gap-16">
          <Reveal>
            <p>
              <Highlight
                segments={[
                  ["The Gargi AI ", true],
                  "chatbot is a visionary digital initiative launched at ",
                  ["Raj Bhavan, Uttarakhand ", true],
                  "to empower women through personalised technological support. It serves as a",
                  [" human-centric AI companion", true],
                  " designed to provide immediate guidance and bridge the digital divide for women across the state.",
                ]}
              />
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p>
              <Highlight
                segments={[
                  "The brief from the Government of Uttarakhand asked for two things in one product: an ",
                  ["empowerment platform", true],
                  " that women trust enough to use repeatedly, and an ",
                  ["emergency", true],
                  " surface they can reach in seconds when they need it.",
                ]}
              />
            </p>
          </Reveal>
        </div>

        {/* ---------- Methodology ---------- */}
        <SectionHead
          className="mt-28"
          kicker="METHODOLOGY"
          title="Design Process"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.map(([step, body], i) => (
            <Reveal key={step} delay={(i % 5) * 50}>
              <div className="flex h-full flex-col gap-5 bg-[#ffffff] px-6 py-7">
                <p className="font-inter text-[15px] font-semibold tracking-[-0.01em] text-accent">
                  {step}
                </p>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Research Insights ---------- */}
        <SectionHead
          className="mt-28"
          kicker="RESEARCH INSIGHTS"
          title="What users told us."
        />
        <Reveal className="mt-8">
          <p className="max-w-[760px] font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-stone">
            An online survey was created and conducted via Google Forms with a
            sample size of n = 100 respondents selected randomly.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={(i % 5) * 50}>
              <div className="flex h-full flex-col gap-4 bg-[#ffffff] px-6 py-7">
                <p className="font-oswald text-[clamp(40px,5vw,52px)] font-normal leading-none tracking-[-0.03em] text-accent">
                  {s.num}
                </p>
                <p className="font-inter text-[13px] leading-[1.45] tracking-[-0.03em] text-stone">
                  <Highlight segments={s.body} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        {/* big insight callout — full-bleed blue */}
        <FullBleed className="mt-16">
          <Reveal y={32}>
            <div className="flex flex-col items-start gap-8 bg-accent px-6 py-20 md:flex-row md:items-center md:gap-14 md:px-20">
              <p className="font-oswald text-[clamp(72px,12vw,128px)] font-normal leading-[0.85] tracking-[-0.03em] text-white">
                85%
              </p>
              <p className="max-w-[727px] font-sans text-[clamp(22px,2.8vw,32px)] font-normal leading-[1.25] tracking-[-0.03em] text-white">
                of women trust an AI more than a human for sensitive questions.
                That trust is the foundation Gargi is built on.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Information Architecture ---------- */}
        <SectionHead
          className="mt-28"
          kicker="INFORMATION ARCHITECTURE"
          title="Categorizing the Information"
        />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06/sitemap.png?tr=orig-true" alt="Gargi sitemap" className="h-auto w-full rounded-[3px]" />
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sitemap.map(([title, sub]) => (
            <div key={title} className="flex flex-col gap-1 bg-[#ffffff] px-5 py-5 text-center">
              <p className="font-sans text-[16px] font-medium tracking-[-0.03em] text-graphite">
                {title}
              </p>
              <p className="font-inter text-[13px] tracking-[-0.03em] text-stone">
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* ---------- Design System ---------- */}
        <SectionHead
          className="mt-28"
          kicker="DESIGN SYSTEM"
          title="Designed for clarity & accessibility"
        />
        <Reveal className="mt-10" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06/design-system.png?tr=orig-true" alt="Color palette and grid system" className="h-auto w-full rounded-[3px]" />
        </Reveal>
        <Reveal className="mt-6" y={32}>
          <img loading="lazy" decoding="async" src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06/thumb-zone.png?tr=orig-true" alt="Thumb-zone ergonomics and screens" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Prototype flows ---------- */}
        <SectionHead
          className="mt-28"
          kicker="PROTOTYPE"
          title="28 screens, 5 flows, 1 product."
        />
        <div className="mt-10 flex flex-col gap-4">
          {flows.map(([img, num, title, body], i) => (
            <Reveal key={img} delay={60} y={32}>
              <div
                className={`grid grid-cols-1 items-center gap-8 bg-[#ffffff] px-6 py-10 md:gap-12 md:px-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="flex justify-center">
                  <img loading="lazy" decoding="async" src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs06/${img}.png?tr=orig-true`} alt={title} className="h-auto w-full max-w-[430px]" />
                </figure>
                <div className="flex flex-col gap-4">
                  <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-accent">
                    {num}
                  </p>
                  <h3 className="font-oswald text-[clamp(30px,4vw,40px)] font-normal leading-[1.05] tracking-[-0.03em] text-graphite">
                    {title}
                  </h3>
                  <p className="max-w-[562px] font-inter text-[16px] leading-[1.5] tracking-[-0.03em] text-stone">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Closing quote (full-bleed blue) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col gap-8 bg-accent px-6 py-24 md:px-20">
              <p className="max-w-[1312px] font-sans text-[clamp(24px,3.2vw,36px)] font-normal leading-[1.3] tracking-[-0.03em] text-white">
                &ldquo;Gargi is not a complaint app dressed as a mentor — it is a
                mentor that, when needed, opens the right door.&rdquo;
              </p>
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white/80">
                — Lieutenant General Gurmit Singh, PVSM, UYSM, AVSM, VSM (Retd)
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Reflection ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>REFLECTION</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(30px,3.6vw,40px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
              Key Takeaways
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[820px] font-inter text-[18px] leading-[1.5] tracking-[-0.02em] text-graphite">
              <Highlight
                segments={[
                  "Government projects often prioritize ",
                  ["process and administration. ", true],
                  "This project presented an opportunity to ",
                  ["focus on people", true],
                  " instead. The most important design decision was treating Gargi as a",
                  [" single cohesive experience ", true],
                  "rather than a collection of independent features. By positioning mentorship at the center of the ecosystem, every other service became easier to discover, understand, and use.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/flyover" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              Next Project
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              I.S.B.T. Flyover →
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
