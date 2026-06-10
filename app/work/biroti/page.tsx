import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "Biroti — Arnab Gupta",
  description:
    "A brand identity for Biroti, a device-free café designed around being fully present — logo, menu, conversation prompts, and website.",
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
    <div className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen ${className}`}>
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

/* ---------- content data (verbatim from Figma) ---------- */

const meta = [
  { label: "Year", value: "2025" },
  { label: "Duration", value: "6 weeks · Individual" },
  { label: "Client", value: "Biroti Café, Kolkata (Hypothetical)" },
  { label: "Deliverables", value: "Logo · Menu · Prompts · Website" },
];

const palette = [
  ["Ink", "#1A1712", "Backgrounds · Primary text"],
  ["Parchment", "#F2EBD9", "Section backgrounds · Cards"],
  ["Cream", "#FAF6EE", "Page backgrounds · Panels"],
  ["Terracotta", "#B85A30", "Accent · Italic emphasis · CTAs"],
  ["Muted Stone", "#7A7264", "Body text · Secondary labels"],
];

const typeFamilies = [
  ["DM Serif Display", "Regular + Italic", "Logo · Display headline", "Take a break."],
  ["Cormorant Garamond", "Light", "Body copy · Long-form", "BIROTI is where conversations flow without interruption."],
  ["Li MAK Zakigonj Unicode", "Regular", "Names · Bengali script", "weiwZ"],
];

const prompts = [
  "When did you last do absolutely nothing — and not feel guilty about it?",
  "If you could slow down one moment from this week, which would it be?",
  "What's one thing you've been rushing past that deserves your full attention?",
  "What part of yourself are you still waiting for permission to become?",
];

/* eslint-disable @next/next/no-img-element */

export default function Biroti() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                Biroti
              </h1>
              <p className="mt-8 max-w-[680px] font-inter text-[18px] leading-[1.55] tracking-[-0.03em]">
                <Highlight
                  segments={[
                    "Biroti is a café designed around a simple but increasingly rare idea: ",
                    ["being fully present.", true],
                    " In a culture where cafés have become extensions of offices and screens dominate social spaces, the project explores how branding can ",
                    ["encourage genuine human connection. ", true],
                    "The identity system was developed to support a ",
                    ["device-free café experience,", true],
                    " translating the brand's philosophy across physical and digital touchpoints including the logo, menu design, conversation prompt cards, environmental graphics, and website.",
                  ]}
                />
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

        {/* ---------- Hero mockup (full-bleed) ---------- */}
        <FullBleed className="mt-16">
          <Reveal y={36}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/hero.png?tr=orig-true" alt="" className="h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- Context ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>CONTEXT</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              Cafés became offices
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-6 font-inter text-[16px] leading-[1.55] tracking-[-0.03em]">
              <p>
                <Highlight
                  segments={[
                    ["Modern cafés increasingly", false],
                    [" function as workspaces. Laptops, notifications, ", true],
                    "and",
                    [" digital distractions", true],
                    " often replace meaningful interactions, transforming ",
                    ["social environments into temporary offices.", true],
                  ]}
                />
              </p>
              <p className="text-stone">
                <Highlight
                  segments={[
                    "The challenge was to create a brand identity that actively ",
                    ["encourages people to slow down", true],
                    ", engage with one another, and reclaim moments of uninterrupted conversation.",
                  ]}
                />
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------- Insight callout (full-bleed, terracotta) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-6 bg-[#86481b] px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white/80">
                INSIGHT
              </p>
              <p className="max-w-[1000px] font-sans text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.2] tracking-[-0.03em] text-white">
                Being present is no longer the default, It has to be designed.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Naming ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>NAMING</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              Biroti, Bengali for pause
            </h2>
            <img src="/cases/cs07/bengali.svg" alt="বিরতি" className="mt-6 h-[clamp(48px,7vw,76px)] w-auto" />
            <p className="mt-3 font-inter text-[12px] font-semibold uppercase tracking-[0.06em] text-stone">
              BENGALI — pause
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-inter text-[16px] leading-[1.55] tracking-[-0.03em]">
              <Highlight
                segments={[
                  "Rather than representing a complete stop, the name signifies a brief moment of ",
                  ["reflection between activities.", true],
                  " It embodies the café's core philosophy: ",
                  ["creating space for people to disconnect from devices and reconnect with their surroundings.", true],
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Mood board (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/moodboard.png?tr=orig-true" alt="Mood Board — brand direction" className="mx-auto h-auto w-full max-w-[1271px] rounded-[3px]" />
        </Reveal>

        {/* ---------- Visual Vocabulary (palette image with swatch photos) ---------- */}
        <SectionHead className="mt-28" kicker="PALETTE" title="Visual Vocabulary" />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/vocab.png?tr=orig-true" alt="Colour palette — Ink, Parchment, Cream, Terracotta, Muted Stone" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Type ---------- */}
        <SectionHead className="mt-28" kicker="TYPE" title="Three families. One voice." />
        <div className="mt-10 flex flex-col">
          {typeFamilies.map(([fam, weight, use, sample], i) => (
            <Reveal key={fam as string}>
              <div className="grid grid-cols-1 gap-4 border-t border-black/10 py-8 md:grid-cols-[300px_1fr] md:gap-12">
                <div>
                  <p className="font-sans text-[20px] font-medium tracking-[-0.03em] text-graphite">
                    {fam}
                  </p>
                  <p className="mt-1 font-inter text-[13px] tracking-[-0.03em] text-stone">
                    {weight}
                  </p>
                  <p className="mt-1 font-inter text-[12px] uppercase tracking-[0.04em] text-stone">
                    {use}
                  </p>
                </div>
                {i === 2 ? (
                  <img src="/cases/cs07/bengali.svg" alt="বিরতি" className="h-[clamp(40px,6vw,64px)] w-auto self-start" />
                ) : (
                  <p
                    className={`leading-[1.1] text-graphite ${
                      i === 0
                        ? "font-serif text-[clamp(36px,5vw,56px)]"
                        : "font-serif text-[clamp(22px,3vw,32px)] leading-[1.4]"
                    }`}
                  >
                    {sample}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Logo system ---------- */}
        <SectionHead className="mt-28" kicker="LOGO SYSTEM" title="One word-mark, three backgrounds." />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/logos.png?tr=orig-true" alt="The Biroti word-mark on cream, parchment, and dark backgrounds." className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Touch points (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/touchpoints.png?tr=orig-true" alt="Touch points — the brand, in your hands." className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Conversation prompts ---------- */}
        <SectionHead className="mt-28" kicker="CONVERSATION PROMPTS" title="A question per table." />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prompts.map((q) => (
            <Reveal key={q}>
              <div className="flex h-full flex-col gap-6 rounded-[3px] bg-[#F2EBD9] px-8 py-10">
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B85A30]">
                  BIROTI CAFÉ
                </p>
                <p className="font-serif text-[clamp(22px,2.8vw,28px)] leading-[1.3] text-[#1A1712]">
                  {q}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Mockups (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/mockups.png?tr=orig-true" alt="Mockups — logo applications" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Website (heading baked into image) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs07/website.png?tr=orig-true" alt="Website — digital design" className="h-auto w-full rounded-[3px]" />
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
            <p className="max-w-[760px] font-inter text-[18px] leading-[1.5] tracking-[-0.02em]">
              <Highlight
                segments={[
                  "This project demonstrated how a strong point of view can guide an entire identity system. Once the brand philosophy was clearly defined, decisions regarding typography, colour, language, and touchpoints became significantly more focused and coherent. Biroti is ultimately a brand built around a single belief: ",
                  ["meaningful experiences begin when distractions end.", true],
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/the-ignored-user" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              Go back to
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              The Ignored User →
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
