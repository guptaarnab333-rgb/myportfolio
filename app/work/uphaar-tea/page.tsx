import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "From Pouch to Bamboo — Arnab Gupta",
  description:
    "A packaging redesign for Uphaar, a 77-year-old Assam tea brand, transforming a conventional plastic pouch into a reusable bamboo canister.",
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
  { label: "Year", value: "2026" },
  { label: "Discipline", value: "Packaging Design" },
  { label: "Duration", value: "6 weeks · Individual" },
  { label: "Role", value: "Designer · Researcher" },
  { label: "SKU", value: "Golden Tips · 250g" },
];

const timeline = [
  ["1948", "FOUNDED", "Shree Hanuman Bhandar — Dugar Group’s family tea business begins in Assam."],
  ["1970", "GTAC ENTRY", "Among the first registered buyers at the Guwahati Tea Auction Centre."],
  ["1988", "PACKAGED TEA", "Launch of packaged tea to meet modern consumer demand."],
  ["1993", "DCPL FORMED", "Dugar Consumer Products Pvt. Ltd. established for blending & packaging."],
  ["Today", "PREMIUM ORIGIN", "30+ year legacy. Single-origin premium teas. Guwahati, Assam.", true],
];

const problems = [
  ["01", "Generic packaging", "Standard metalized poly pouches identical to hundreds of competitor SKUs — indistinguishable on shelf."],
  ["02", "Plastic dependency", "Current formats rely on plastic and metalized film — incompatible with eco-conscious consumer values."],
  ["03", "No cultural story", "Fails to communicate Assam's heritage, the plucking tradition, or the gift emotion central to the brand."],
  ["04", "Weak premium signal", "At ₹720 for 250g, Golden Tips sits in premium territory — the current packaging does not justify it."],
];

const concepts = [
  ["01", "Sustainability", "Eco-first", "100% plastic replaced with bamboo — a grass that matures in 3–5 years vs 50+ for hardwood. Zero petroleum-based materials."],
  ["02", "Cultural heritage", "Made in Assam", "Bamboo craft is woven into Assam's identity. The packaging sustains the local artisan tradition."],
  ["03", "Reusability", "Zero waste", "After the tea is gone, the bamboo canister becomes a storage vessel — for spices, stationery, or décor."],
  ["04", "Premium identity", "Shelf stand-out", "Woven bamboo gives an instantly distinctive shelf presence no competitor has — handcraft, care, gift."],
];

const anatomy = [
  ["01", "Kraft Paper Lid", "Natural unbleached kraft cap. Lightweight, recyclable, printed with brand logo."],
  ["02", "Brand Label Strip", "Tear-to-open kraft collar wraps the canister. Uphaar script, product name, origin story."],
  ["03", "Woven Bamboo Body", "Hand-woven bamboo strips form the cylindrical canister, inspired by Assamese tokri baskets."],
  ["04", "Botanical Illustration", "Assam tea leaf illustration visible through the weave — adds depth and natural origin."],
  ["05", "Inner Liner", "Food-safe inner pouch retains tea freshness inside the bamboo structure."],
  ["06", "Reusable Container", "Designed for life after use. Storage instructions explicitly direct re-use of the bamboo."],
];

const lifecycle = [
  ["life-1", "Unboxing", "First interaction with the kraft collar tear-strip."],
  ["life-2", "The brew", "Golden Tips in cup — single-origin Assam."],
  ["life-3", "Second life", "Bamboo canister becomes spice or stationery jar."],
];

const competitorCols = ["BRAND", "FORMAT", "PRICE", "ECO", "CRAFT", "GIFT", "TIER"];
const competitors = [
  ["Tata Tea Gold", "Metalized foil standup pouch", "₹200 / 250g", "—", "—", "—", "Mass"],
  ["Wagh Bakri", "Laminated carton + inner pouch", "₹230 / 250g", "—", "—", "—", "Mass"],
  ["Vahdam Teas", "Printed kraft bag + tin", "₹600+ / 100g", "partial", "—", "✓", "Premium"],
  ["Teabox", "Resealable zip pouch + box", "₹700+ / 100g", "partial", "—", "✓", "Premium"],
  ["Makaibari Estate", "Decorative tin canister", "₹800+ / 100g", "—", "partial", "✓", "Luxury"],
  ["Uphaar (Redesign)", "Woven bamboo + kraft paper", "₹720 / 250g", "✓✓", "✓✓", "✓✓", "Premium"],
];

/* eslint-disable @next/next/no-img-element */

export default function UphaarTea() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:items-start lg:gap-20">
            <Reveal>
              <h1 className="max-w-[600px] font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                From Pouch to Bamboo.
              </h1>
              <p className="mt-8 max-w-[620px] font-inter text-[18px] leading-[1.5] tracking-[-0.03em] text-accent">
                A packaging redesign for Uphaar, a 77-year-old Assam tea brand,
                transforming a conventional plastic pouch into a reusable bamboo
                canister inspired by the tea gardens and craft traditions of
                Northeast India.
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

        {/* ---------- Hero image pair ---------- */}
        <Reveal className="mt-16" y={36}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/hero-pair.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
          <div className="mt-4 flex justify-between font-inter text-[12px] tracking-[-0.03em] text-stone">
            <span>From standard pouch</span>
            <span>To sustainable bamboo</span>
          </div>
        </Reveal>

        {/* ---------- Context (full-bleed) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/context.png?tr=orig-true" alt="" className="h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- History timeline ---------- */}
        <Reveal className="mt-20">
          <p className="font-sans text-[clamp(18px,2.2vw,24px)] font-normal leading-[1.4] tracking-[-0.03em] text-graphite">
            <Highlight
              segments={[
                ["“Uphaar” ", true],
                "means GIFT in Assamese — a brand built for the art of giving.",
              ]}
            />
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {timeline.map(([year, label, desc, today]) => (
            <Reveal key={year as string}>
              <div className="flex flex-col">
                {/* connector dot + line */}
                <div className="relative mb-6 hidden h-px bg-black/15 lg:block">
                  <span
                    className={`absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                      today ? "bg-[#677149]" : "bg-graphite"
                    }`}
                  />
                </div>
                <p className="font-sans text-[clamp(28px,3.4vw,36px)] font-normal leading-none tracking-[-0.03em] text-graphite">
                  {year as string}
                </p>
                <p className={`mt-3 font-inter text-[12px] font-semibold uppercase tracking-[0.06em] ${today ? "text-[#677149]" : "text-stone"}`}>
                  {label as string}
                </p>
                <p className="mt-3 font-inter text-[13px] leading-[1.45] tracking-[-0.03em] text-stone">
                  {desc as string}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- The Problem ---------- */}
        <SectionHead className="mt-28" kicker="THE PROBLEM" title="What needed to change." />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(([n, t, b]) => (
            <Reveal key={n}>
              <div className="flex flex-col gap-3">
                <p className="font-oswald text-[32px] font-normal leading-none tracking-[-0.03em] text-accent">
                  {n}
                </p>
                <h3 className="font-sans text-[19px] font-medium tracking-[-0.03em] text-graphite">
                  {t}
                </h3>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Research (image: market research + competitor) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/research.png?tr=orig-true" alt="" className="mx-auto h-auto w-full max-w-[1212px] rounded-[3px]" />
        </Reveal>

        {/* ---------- Market Research: Competitor Analysis ---------- */}
        <Reveal className="mt-28 text-center">
          <Eyebrow>MARKET RESEARCH</Eyebrow>
          <h2 className="mt-2 font-sans text-[clamp(34px,5.4vw,64px)] font-normal leading-[1.17] tracking-[-0.03em] text-graphite">
            Competitor Analysis
          </h2>
        </Reveal>
        <Reveal className="mt-10" y={32}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left font-inter tracking-[-0.03em]">
              <thead>
                <tr className="border-b border-black/15">
                  {competitorCols.map((c) => (
                    <th key={c} className="px-3 py-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-graphite first:pl-0">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((row, i) => {
                  const isUphaar = i === competitors.length - 1;
                  return (
                    <tr
                      key={row[0]}
                      className={`border-b border-black/10 ${isUphaar ? "bg-[#677149]/10" : ""}`}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-3 py-5 text-[14px] leading-[1.4] first:pl-0 ${
                            j === 0
                              ? `font-medium ${isUphaar ? "text-[#677149]" : "text-graphite"}`
                              : "text-stone"
                          } ${cell === "✓✓" ? "font-medium text-[#677149]" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---------- Material quote (full-bleed, 'bamboo' highlight baked in) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/material-quote.png?tr=orig-true" alt="" className="h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- Core Concepts ---------- */}
        <SectionHead className="mt-28" kicker="CORE CONCEPTS" title="Four pillars." />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map(([n, t, sub, b]) => (
            <Reveal key={n}>
              <div className="flex h-full flex-col gap-3">
                <p className="font-oswald text-[32px] font-normal leading-none tracking-[-0.03em] text-accent">
                  {n}
                </p>
                <h3 className="font-sans text-[19px] font-medium tracking-[-0.03em] text-graphite">
                  {t}
                </h3>
                <p className="font-inter text-[13px] font-medium uppercase tracking-[0.04em] text-[#677149]">
                  {sub}
                </p>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Design Strategy (image: palette + materials, heading baked in) ---------- */}
        <Reveal className="mt-28" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/design-strategy.png?tr=orig-true" alt="Design Strategy — colour palette and materials" className="h-auto w-full rounded-[3px]" />
        </Reveal>

        {/* ---------- Form Exploration (full-bleed) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/form.png?tr=orig-true" alt="" className="h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- Anatomy (image composite: render + 6 callouts) ---------- */}
        <SectionHead className="mt-28" kicker="ANATOMY" title="Anatomy of the packaging" />
        <Reveal className="mt-10" y={32}>
          <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/anatomy.png?tr=orig-true" alt="" className="h-auto w-full rounded-[3px]" />
        </Reveal>
        {/* readable text list of the anatomy callouts */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {anatomy.map(([n, t, b]) => (
            <div key={n} className="flex gap-4">
              <span className="font-oswald text-[22px] font-normal leading-none tracking-[-0.03em] text-accent">
                {n}
              </span>
              <div>
                <p className="font-sans text-[16px] font-medium tracking-[-0.03em] text-graphite">
                  {t}
                </p>
                <p className="mt-1 font-inter text-[14px] leading-[1.45] tracking-[-0.03em] text-stone">
                  {b}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Impact + product render ---------- */}
        <SectionHead className="mt-28" kicker="IMPACT" title="What it changes." />
        <FullBleed className="mt-10">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/product-render.png?tr=orig-true" alt="" className="mx-auto h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- Final Design (full-bleed) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <img src="https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/final-design.png?tr=orig-true" alt="" className="h-auto w-full" />
          </Reveal>
        </FullBleed>

        {/* ---------- Lifecycle ---------- */}
        <div className="mt-28 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {lifecycle.map(([img, t, b]) => (
            <Reveal key={img} y={32}>
              <figure className="flex flex-col gap-4">
                <img src={`https://ik.imagekit.io/cnjxcztbn/portfolio/cases/cs05/${img}.png?tr=orig-true`} alt="" className="aspect-[357/280] w-full rounded-[3px] object-cover" />
                <figcaption>
                  <p className="font-sans text-[18px] font-medium tracking-[-0.03em] text-graphite">
                    {t}
                  </p>
                  <p className="mt-1 font-inter text-[14px] leading-[1.45] tracking-[-0.03em] text-stone">
                    {b}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- A Final Word (full-bleed, Assam Green) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-6 bg-[#7f8c58] px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[-0.01em] text-white/80">
                A FINAL WORD
              </p>
              <p className="max-w-[900px] font-sans text-[clamp(24px,3.2vw,36px)] font-normal leading-[1.3] tracking-[-0.03em] text-white">
                &ldquo;A tea worthy of Assam, packaged as it should always have been
                — from bamboo, for a gift.&rdquo;
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/scout" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              NEXT PROJECT
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              Scout →
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
