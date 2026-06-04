import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CaseStudy from "@/components/CaseStudy";
import WorkGrid from "@/components/WorkGrid";
import EditorialList from "@/components/EditorialList";
import CtaFooter from "@/components/CtaFooter";
import { cases } from "@/components/data";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-[1120px] px-6 py-[120px] md:px-[64px]"
      >
        <Reveal>
          <h2 className="max-w-[1000px] font-oswald text-[clamp(30px,4.8vw,64px)] font-light leading-[1.0] tracking-[-0.03em] text-white">
            A third-year product design student at Doon University, Dehradun, and
            a Research Fellow at PEOPLE Lab.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-12 max-w-[680px] font-inter text-[18px] leading-[1.6] tracking-[-0.01em] text-muted">
            My work sits at the intersection of concept-driven thinking and
            physical making. I design products in material honesty, exploring
            sustainable systems, ergonomic form, and the kind of rigour that
            shows up in both the idea and the prototype.
          </p>
        </Reveal>
      </section>

      {/* Selected Work */}
      <section
        id="work"
        className="mx-auto max-w-[1120px] px-6 pt-6 md:px-[64px]"
      >
        <Reveal>
          <h2 className="max-w-[900px] font-oswald text-[clamp(30px,4.8vw,64px)] font-light leading-[1.0] tracking-[-0.03em] text-white">
            Eight projects across product, packaging, and space.
          </h2>
        </Reveal>
      </section>

      <section className="mx-auto mt-12 max-w-[1120px] px-6 md:px-[64px]">
        {cases.map((c, i) => (
          <CaseStudy key={c.index} data={c} flip={i % 2 === 1} />
        ))}
      </section>

      {/* Process / documentary grid */}
      <WorkGrid />

      {/* Toolkit as an editorial list */}
      <EditorialList />

      {/* CTA + footer */}
      <CtaFooter />
    </main>
  );
}
