import type { Metadata } from "next";
import SynapserNav from "@/components/synapser/SynapserNav";
import Reveal from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const metadata: Metadata = {
  title: "Scout — Arnab Gupta",
  description:
    "An AI-native hiring intelligence platform under ForgeField — nine specialist agents that evaluate candidate fit and explain their reasoning.",
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

const TEAL = "#10A788";

const meta = [
  { label: "Year", value: "2026 — Ongoing" },
  { label: "Discipline", value: "UX · UI · AI Product" },
  { label: "Role", value: "Co-founder · Designer" },
  { label: "Team", value: "Arnab Gupta · Angshuman Roy (Dev)" },
];

const methodology = [
  ["DISCOVER", "Job-seeker interviews, competitor scan (Teal · Jobscan · Rezi), state-of-the-art LLM survey."],
  ["DEFINE", "Problem statement, scope guard-rails, success metrics, agent role taxonomy."],
  ["IDEATE", "Single-LLM vs multi-agent architecture, agent personalities, score model."],
  ["PROTOTYPE", "Dashboard states, review form, analysis run flow, agent-detail modal, history."],
  ["TEST", "Beta users running real applications, accuracy benchmarking, cost & latency tuning."],
];

const problems = [
  ["01", "Shallow keyword matching", "A senior engineer who wrote “led” instead of “managed” scores 60% against a JD that uses “managed”. The bar is vocabulary, not capability."],
  ["02", "Black-box scores", "Tools return a number. They rarely show why. The user can’t tell whether the score is about skills, experience, or formatting."],
  ["03", "Single-pass analysis", "One model evaluating skills, experience, narrative, and presentation in one prompt produces shallow conclusions on each. Specialisation is missing."],
  ["04", "No actionable output", "After reading the report, the user still has to translate insights into action. The bridge from analysis to outreach is left to them."],
];

const iaFlow = [
  ["Dashboard", "Upload + paste JD"],
  ["Review", "Verify extracted data"],
  ["Loading", "9 agents in parallel"],
  ["Results", "Score + breakdown"],
  ["Agent Modal", "Per-agent drill-in"],
  ["History", "Past analyses"],
];

const agents = [
  ["Marcus", "Skill Analyst", "Maps your skills to the role."],
  ["Lucas", "Experience Evaluator", "Reviews your work history."],
  ["Elena", "Compliance Reviewer", "Checks credentials & compliance."],
  ["Oliver", "Education Assessor", "Evaluates your academic background."],
  ["Sofia", "Narrative Analyst", "Analyses your career story."],
  ["Ethan", "Readiness Evaluator", "Assesses professional readiness."],
  ["Aria", "Portfolio Reviewer", "Examines your body of work."],
  ["Caleb", "Research Analyst", "Reviews publications & research."],
  ["Nova", "Presentation Specialist", "Evaluates how you present your work."],
];

const palette = [
  ["Teal", "#10A788", "Brand · Primary CTAs · Logo"],
  ["Ink", "#111827", "Headings · Primary text"],
  ["Slate", "#6B7280", "Body text · Labels"],
  ["Surface", "#F9FAFB", "Page background · Cards"],
  ["Success", "#10B981", "Strong fit · Stored · Confirmations"],
  ["Destructive", "#DC2626", "Errors · File rejection"],
];

const keyScreens = [
  ["01 · DASHBOARD", "Upload + paste", "Two-input entry surface with the Start Analysis button bridging both panels.", "/cases/cs08/screen-01-dashboard.webp"],
  ["02 · REVIEW", "Verify extracted data", "A 17-section accordion where the user corrects whatever the AI mis-parsed.", "/cases/cs08/screen-02-review.webp"],
  ["03 · LOADING", "Nine agents working", "The team becomes visible — each card pulses with a live micro-status.", "/cases/cs08/screen-03-loading.webp"],
  ["04 · RESULTS", "The verdict", "Score, top strengths, top gaps, agent breakdown, and a draft outreach message.", "/cases/cs08/screen-04-results.webp"],
  ["05 · AGENT MODAL", "Drill into one lens", "Positive signals, gaps, risk flags, evidence coverage, agent’s note.", "/cases/cs08/screen-05-modal.webp"],
  ["06 · HISTORY", "A track record", "Past analyses with stat cards and a sortable table.", "/cases/cs08/screen-06-history.webp"],
];

const drillBlocks = [
  ["Positive Signals", "What the agent saw that supports the candidate. Tagged HIGH / MEDIUM confidence with the evidence behind each finding."],
  ["Gaps", "What’s missing for this role, with Impact tags (Interview, Resume, Project) showing where each gap will surface."],
  ["Risk Flags", "Things the user should pre-empt — career gaps, vague experience, unverifiable claims. Often the most useful block."],
  ["Evidence Coverage", "A 3-column Expected / Found / Missing list. Calibrates how much of the role’s expected evidence actually exists."],
  ["Agent’s Note", "A 1-2 sentence narrative from the agent, in plain English. The part the user reads first."],
];

/* eslint-disable @next/next/no-img-element */

export default function Scout() {
  return (
    <main className="min-h-screen overflow-x-clip bg-mistblue text-graphite">
      <SynapserNav theme="light" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* ---------- Header ---------- */}
        <header className="pt-[112px] md:pt-[128px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-20">
            <Reveal>
              <Eyebrow>UX · UI · AI PRODUCT</Eyebrow>
              <h1 className="mt-4 font-sans text-[clamp(48px,8vw,84px)] font-normal leading-[1.0] tracking-[-0.03em] text-graphite">
                Scout
              </h1>
              <p className="mt-8 max-w-[680px] font-inter text-[18px] leading-[1.55] tracking-[-0.03em]">
                Scout is an AI-native hiring intelligence platform built under
                ForgeField. By analyzing a resume against a job description,
                Scout deploys nine specialized AI agents that independently
                evaluate candidate fit and synthesize their findings into a
                comprehensive assessment.
              </p>
              <p className="mt-5 max-w-[680px] font-inter text-[18px] leading-[1.55] tracking-[-0.03em] text-accent">
                The platform transforms raw documents into actionable insights,
                highlighting strengths, identifying gaps, and generating
                recruiter-ready outreach recommendations.
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

        {/* ---------- Thumbnail hero (full-bleed) ---------- */}
        <FullBleed className="mt-16">
          <Reveal y={36}>
            <img
              src="/cases/cs08/thumbnail.webp"
              alt="Scout — AI Tool · Resume Checker"
              className="h-auto w-full"
            />
          </Reveal>
        </FullBleed>

        {/* ---------- Context ---------- */}
        <section className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>CONTEXT</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(34px,4.6vw,52px)] font-normal leading-[1.12] tracking-[-0.03em] text-graphite">
              A 0→1 product under a new studio
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-6 font-inter text-[16px] leading-[1.55] tracking-[-0.03em]">
              <p className="font-medium text-graphite">
                Building an AI-native product from scratch
              </p>
              <p>
                Scout became the first product developed under ForgeField, a
                studio focused on creating AI-native applications. Rather than
                treating AI as a feature layered onto an existing workflow, we
                explored a different question:
              </p>
              <p className="text-stone">
                What happens when AI becomes the product&apos;s core engine, and
                the interface exists primarily to make its reasoning
                understandable? Most resume tools rely on keyword matching and
                ATS optimization. We believed modern language models could
                provide a deeper understanding of candidate fit by evaluating
                context, experience, and evidence—not just terminology.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------- Methodology ---------- */}
        <SectionHead className="mt-28" kicker="METHODOLOGY" title="From discovery to product validation" />
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-5">
          {methodology.map(([step, body], i) => (
            <Reveal key={step} delay={i * 60}>
              <div className="flex h-full flex-col gap-3 bg-mistblue p-6">
                <span
                  className="font-inter text-[12px] font-semibold tracking-[0.08em]"
                  style={{ color: TEAL }}
                >
                  {step}
                </span>
                <p className="font-inter text-[14px] leading-[1.5] tracking-[-0.02em] text-stone">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- The Problem ---------- */}
        <SectionHead className="mt-28" kicker="THE PROBLEM" title="Why resume tools still feel dumb" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {problems.map(([num, title, body]) => (
            <Reveal key={num}>
              <div className="flex h-full flex-col gap-4 rounded-[4px] border border-black/10 bg-white/60 p-8">
                <span className="font-sans text-[28px] font-normal leading-none tracking-[-0.03em] text-mist">
                  {num}
                </span>
                <h3 className="font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite">
                  {title}
                </h3>
                <p className="font-inter text-[15px] leading-[1.55] tracking-[-0.02em] text-stone">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Architecture ---------- */}
        <SectionHead className="mt-28" kicker="ARCHITECTURE" title="Why existing resume tools fall short" />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-[4px] border border-black/10 bg-white/40 p-8">
              <span className="w-fit rounded-full border border-[#DC2626]/30 px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
                Rejected
              </span>
              <h3 className="font-sans text-[24px] font-medium tracking-[-0.03em] text-graphite">
                Single LLM, one prompt
              </h3>
              <p className="font-inter text-[15px] leading-[1.6] tracking-[-0.02em] text-stone">
                Send resume + JD + scoring rubric to a single model and ask for a
                structured report. Simple, cheap, fast. But: one prompt has to do
                everything — skills, experience, narrative, presentation — and the
                output reads like a generalist gave it 30 seconds. Findings stay
                shallow, evidence stays vague, the user gets a number with no
                rationale.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="flex h-full flex-col gap-4 rounded-[4px] border p-8"
              style={{ borderColor: `${TEAL}55`, backgroundColor: `${TEAL}0D` }}
            >
              <span
                className="w-fit rounded-full px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-white"
                style={{ backgroundColor: TEAL }}
              >
                Chosen
              </span>
              <h3 className="font-sans text-[24px] font-medium tracking-[-0.03em] text-graphite">
                Nine specialist agents in parallel
              </h3>
              <p className="font-inter text-[15px] leading-[1.6] tracking-[-0.02em] text-stone">
                Each agent reads the same input through a single lens — skills,
                experience, compliance, education, narrative, readiness,
                portfolio, research, presentation. Each returns its own positive
                signals, gaps, risk flags, and evidence coverage. An orchestrator
                assembles the team&apos;s verdict. The user sees the team, not the
                model.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------- Why it matters (full-bleed band) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-6 bg-[#2429af] px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[0.04em] text-white/70">
                WHY IT MATTERS
              </p>
              <p className="max-w-[1000px] font-sans text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.2] tracking-[-0.03em] text-white">
                A team of specialists is legible. A black-box model is not. The
                architecture decision is also the design decision.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Information Architecture ---------- */}
        <SectionHead className="mt-28" kicker="INFORMATION ARCHITECTURE" title="Shape of the product" />
        <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {iaFlow.map(([step, sub], i) => (
            <Reveal key={step} delay={i * 60} className="lg:flex-1">
              <div className="flex h-full w-full flex-col gap-2 rounded-[4px] border border-black/10 bg-white/60 p-5">
                <span
                  className="font-inter text-[12px] font-semibold tracking-[0.04em]"
                  style={{ color: TEAL }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-[17px] font-medium tracking-[-0.03em] text-graphite">
                  {step}
                </p>
                <p className="font-inter text-[13px] leading-[1.45] tracking-[-0.02em] text-stone">
                  {sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- The Nine Agents ---------- */}
        <SectionHead className="mt-28" kicker="THE NINE AGENTS" title="A team you can name." />
        <Reveal className="mt-6">
          <p className="max-w-[760px] font-inter text-[16px] leading-[1.55] tracking-[-0.03em] text-stone">
            Rather than presenting AI as a single black box, Scout introduces a
            team of specialists, each responsible for a distinct aspect of
            evaluation.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map(([name, role, desc], i) => (
            <Reveal key={name} delay={(i % 3) * 60}>
              <div className="flex h-full items-start gap-4 rounded-[4px] border border-black/10 bg-white/60 p-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-[16px] font-medium text-white"
                  style={{ backgroundColor: TEAL }}
                >
                  {name.charAt(0)}
                </span>
                <div>
                  <p className="font-sans text-[19px] font-medium tracking-[-0.03em] text-graphite">
                    {name}
                  </p>
                  <p
                    className="mt-0.5 font-inter text-[12px] font-semibold uppercase tracking-[0.05em]"
                    style={{ color: TEAL }}
                  >
                    {role}
                  </p>
                  <p className="mt-2 font-inter text-[14px] leading-[1.5] tracking-[-0.02em] text-stone">
                    {desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Design System ---------- */}
        <SectionHead className="mt-28" kicker="DESIGN SYSTEM" title="Clarity over decoration" />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <Reveal>
            <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-stone">
              Color palette
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {palette.map(([name, hex, use]) => (
                <div key={name} className="flex items-center gap-4">
                  <span
                    className="h-12 w-12 shrink-0 rounded-[4px] border border-black/10"
                    style={{ backgroundColor: hex }}
                  />
                  <div>
                    <p className="font-sans text-[16px] font-medium tracking-[-0.03em] text-graphite">
                      {name}{" "}
                      <span className="font-inter text-[12px] font-normal text-mist">
                        {hex}
                      </span>
                    </p>
                    <p className="font-inter text-[12px] leading-[1.4] tracking-[-0.02em] text-stone">
                      {use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-10">
              <div>
                <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-stone">
                  Type
                </p>
                <p className="mt-4 font-sans text-[28px] font-medium tracking-[-0.03em] text-graphite">
                  Inter — for the entire product.
                </p>
                <p className="mt-3 font-inter text-[14px] leading-[1.55] tracking-[-0.02em] text-stone">
                  Inter Regular for body, Inter Medium for emphasis. No display
                  font — the product is informational, not decorative. Restraint
                  is the visual language.
                </p>
              </div>
              <div>
                <p className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-stone">
                  Components
                </p>
                <p className="mt-4 font-inter text-[14px] leading-[1.6] tracking-[-0.02em] text-stone">
                  AppHeader · AppFooter · Button (primary / outline / disabled) ·
                  Badge (stored / active / strong) · Alert (destructive) · Dialog
                  (overlay + content + header + footer) · ResumeListItem ·
                  Textarea · UploadDropZone · AgentCard. Every state designed,
                  every variant catalogued.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- Key Screens (ungrouped — one after another, large) ---------- */}
        <SectionHead className="mt-28" kicker="KEY SCREENS" title="The product, end to end." />
        <div className="mt-12 flex flex-col gap-20">
          {keyScreens.map(([label, title, caption, src]) => (
            <Reveal key={label} y={32}>
              <figure>
                <figcaption className="mb-5 max-w-[760px]">
                  <span
                    className="font-inter text-[12px] font-semibold tracking-[0.08em]"
                    style={{ color: TEAL }}
                  >
                    {label}
                  </span>
                  <h3 className="mt-2 font-sans text-[clamp(24px,3.2vw,34px)] font-normal tracking-[-0.03em] text-graphite">
                    {title}
                  </h3>
                  <p className="mt-2 font-inter text-[15px] leading-[1.55] tracking-[-0.02em] text-stone">
                    {caption}
                  </p>
                </figcaption>
                <img
                  src={src}
                  alt={`${title} — Scout`}
                  className="h-auto w-full rounded-[6px] border border-black/10 shadow-[0_18px_50px_-24px_rgba(17,24,39,0.35)]"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---------- Agent Drill-in ---------- */}
        <SectionHead className="mt-28" kicker="AGENT DRILL-IN" title="Each agent's report, on demand." />
        <Reveal className="mt-6">
          <p className="max-w-[760px] font-inter text-[16px] leading-[1.55] tracking-[-0.03em] text-stone">
            Clicking any agent on the Results dashboard opens a focused modal —
            five named blocks, each addressing a different question a serious
            user would ask.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[440px_1fr] lg:items-start lg:gap-16">
          <Reveal y={28}>
            <img
              src="/cases/cs08/agent-drill.webp"
              alt="Agent detail modal"
              className="h-auto w-full rounded-[6px] border border-black/10 shadow-[0_18px_50px_-24px_rgba(17,24,39,0.35)]"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col">
              {drillBlocks.map(([title, body], i) => (
                <div
                  key={title as string}
                  className={`flex flex-col gap-2 py-6 ${
                    i === 0 ? "" : "border-t border-black/10"
                  }`}
                >
                  <h3 className="font-sans text-[19px] font-medium tracking-[-0.03em] text-graphite">
                    {title}
                  </h3>
                  <p className="font-inter text-[15px] leading-[1.55] tracking-[-0.02em] text-stone">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

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
                  "Designing an AI-native product taught me that the ",
                  ["UI is the explanation", true],
                  ". When the model does the work, the interface’s job shifts from collecting input to translating intelligence — making confidence visible, making evidence inspectable, ",
                  ["making the model’s reasoning legible enough for a person to trust", true],
                  ". Scout is the first product I’ve built where that distinction shaped every screen.",
                ]}
              />
            </p>
          </Reveal>
        </section>

        {/* ---------- A Final Word (full-bleed band) ---------- */}
        <FullBleed className="mt-28">
          <Reveal y={32}>
            <div className="flex flex-col items-center gap-8 bg-[#2429af] px-6 py-24 text-center md:px-20">
              <p className="font-inter text-[14px] font-medium tracking-[0.04em] text-white/70">
                A FINAL WORD
              </p>
              <p className="max-w-[1000px] font-sans text-[clamp(26px,3.6vw,44px)] font-normal leading-[1.2] tracking-[-0.03em] text-white">
                The true value of Scout is not the final score,
                <br />
                It&apos;s the transparency behind that score.
              </p>
              <p className="max-w-[700px] font-inter text-[16px] leading-[1.55] tracking-[-0.02em] text-white/75">
                Scout V2 is in progress — sharper agent reasoning, per-agent
                confidence calibration, mobile, and a recruiter outreach surface.
                ForgeField&apos;s second product is in scoping.
              </p>
            </div>
          </Reveal>
        </FullBleed>

        {/* ---------- Next / Back ---------- */}
        <nav className="mt-28 flex flex-col gap-8 border-t border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between">
          <a href="/work/biroti" className="group">
            <p className="font-inter text-[12px] font-medium uppercase tracking-[0.04em] text-stone">
              NEXT PROJECT
            </p>
            <p className="mt-2 font-sans text-[21px] font-medium tracking-[-0.03em] text-graphite transition-colors group-hover:text-accent">
              Biroti Café →
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
