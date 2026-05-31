import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CaseStudy from "@/components/CaseStudy";
import { cases } from "@/components/data";

const software =
  "Fusion 360 · Blender · Figma · Framer · Adobe Photoshop · Illustrator · Lumion · Looker · Coding (GS)";
const practices =
  "Physical Prototyping · Model Making · Concept Development · Design Research · Sustainability · User Research · Fabrication · Material Testing · UI/UX · Prototyping & Usability Testing";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-[1120px] px-6 py-[88px] md:px-0"
      >
        <Reveal>
          <p className="kicker">Index</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 max-w-[1120px] font-oswald text-[clamp(28px,4.4vw,44px)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
            A third-year product design student at Doon University, Dehradun —
            Research Fellow at PEOPLE Lab.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-10 max-w-[880px] font-inter text-[18px] leading-[1.55] tracking-[-0.01em] text-muted">
            My work sits at the intersection of concept-driven thinking and
            physical making. I design products in material honesty — exploring
            sustainable systems, ergonomic form, and the kind of rigour that
            shows up in both the idea and the prototype.
          </p>
        </Reveal>
      </section>

      {/* Selected Work header */}
      <section
        id="work"
        className="mx-auto max-w-[1120px] px-6 pb-4 pt-6 md:px-0"
      >
        <Reveal>
          <p className="kicker">Selected Work</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-oswald text-[clamp(26px,3.6vw,40px)] font-normal leading-[1.12] tracking-[-0.02em] text-white">
            Eight projects across product, packaging &amp; space.
          </h2>
        </Reveal>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-[1120px] px-6 md:px-0">
        {cases.map((c, i) => (
          <CaseStudy key={c.index} data={c} flip={i % 2 === 1} />
        ))}
      </section>

      {/* Toolkit */}
      <section className="mx-auto max-w-[1120px] px-6 py-[88px] md:px-0">
        <Reveal>
          <p className="kicker">Toolkit</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-serif text-[clamp(26px,3.2vw,36px)] italic leading-[1.15] tracking-[-0.02em] text-white">
            What I reach for, and what I keep getting better at.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal delay={120}>
            <p className="kicker !tracking-[0.22em]">Software</p>
            <p className="mt-5 max-w-[480px] font-inter text-[16px] leading-[1.7] tracking-[-0.01em] text-white">
              {software}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="kicker !tracking-[0.22em]">Practices</p>
            <p className="mt-5 max-w-[560px] font-inter text-[16px] leading-[1.7] tracking-[-0.01em] text-white">
              {practices}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-[1120px] px-6 pb-[72px] pt-[64px] md:px-0"
      >
        <Reveal>
          <p className="kicker">Let’s talk</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-[1120px] font-oswald text-[clamp(34px,5.4vw,64px)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
            Open to internships, freelance, and meaningful collaborations.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={140}>
            <div>
              <p className="kicker !text-[10px] !tracking-[0.22em]">Email</p>
              <a
                href="mailto:arnab.peoplelab@doonuniversity.ac.in"
                className="mt-3 block font-inter text-[16px] font-medium tracking-[-0.01em] text-white transition-colors hover:text-accent"
              >
                arnab.peoplelab@doonuniversity.ac.in
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 font-sans text-[14px] font-medium tracking-[-0.01em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Resume <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-6 py-8 font-sans text-[16px] font-medium tracking-[-0.02em] sm:flex-row sm:items-center sm:justify-between md:px-0 md:text-[21px]">
          <p className="text-accent">Arnab Gupta ⏤ Product Designer</p>
          <div className="flex items-center gap-6 text-white">
            <a
              href="https://www.behance.net/arnabgupta4"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-from-font underline-offset-2 transition-colors hover:text-accent"
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/in/arnab-gupta-2b8256231/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-from-font underline-offset-2 transition-colors hover:text-accent"
            >
              Linkedin
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
