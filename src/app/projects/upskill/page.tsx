import type { Metadata } from "next";
import Link from "next/link";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { TechTag } from "@/components/ui/TechTag";
import { ImageSlider } from "@/components/ui/ImageSlider";

export const metadata: Metadata = {
  title: "Upskill — AI Learning Platform | Adam Silva",
  description:
    "Enterprise SaaS platform that bridges daily work output and professional development using a dual-model AI pipeline (Llama 4 + GPT-5) on Azure Foundry.",
};

const images = [
  { src: "/screenshots/upskill/print1.jpg", alt: "Upskill dashboard overview" },
  { src: "/screenshots/upskill/print2.jpg", alt: "Skill gap analysis view" },
  { src: "/screenshots/upskill/print3.jpg", alt: "Learning intervention panel" },
  { src: "/screenshots/upskill/print4.jpg", alt: "Team analytics view" },
  { src: "/screenshots/upskill/print5.jpg", alt: "Admin configuration panel" },
];

const techStack = [
  { layer: "Analysis Engine", technologies: ["Llama 4"] },
  { layer: "Content Generation", technologies: ["GPT-5"] },
  { layer: "Cloud Infrastructure", technologies: ["Microsoft Azure Foundry"] },
  { layer: "Frontend", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { layer: "Backend", technologies: ["Python", "FastAPI", "SQLAlchemy", "Pydantic"] },
  { layer: "Database", technologies: ["PostgreSQL", "Alembic"] },
];

const architectureFeatures = [
  {
    title: "Dual-Model Intelligence Pipeline",
    points: [
      "Llama 4 (MoE) processes massive volumes of daily work artifacts — messages, documents, code snippets — using its 10M token context window for long-term pattern recognition.",
      "GPT-5 transforms raw analytical data into nuanced, highly contextual learning interventions tailored to each individual's specific project history and skill trajectory.",
    ],
  },
  {
    title: "Enterprise Deployment on Azure Foundry",
    points: [
      "Seamless model orchestration routes requests between Llama 4 and GPT-5 based on task type — analysis vs. content generation.",
      "Enterprise-grade content filtering and PII protection applied to all ingested work artifacts before analysis.",
      "Azure's global footprint ensures low-latency real-time analysis of communication data at scale.",
    ],
  },
  {
    title: "Modern Full-Stack Implementation",
    points: [
      "High-concurrency FastAPI backend with a dedicated service layer for artifact ingestion, asynchronous analysis pipelines, and strict Pydantic validation.",
      "Responsive Next.js dashboard with a custom design system supporting high-contrast accessibility and a hook-based data layer for real-time Skill Intelligence updates.",
    ],
  },
  {
    title: "Automated Proof of Work Mapping",
    points: [
      "AI detects objective skill mastery from daily artifacts — no self-reported surveys or manual input required.",
      "Creates a dynamic Taxonomy of Strength providing leadership with a data-driven view of organisational capabilities.",
    ],
  },
];

const impacts = [
  {
    label: "Zero-Friction Ingestion",
    detail:
      "Automated connectors for Slack and Google Workspace eliminate manual data entry, making skill tracking invisible to the end user.",
  },
  {
    label: "High-Fidelity Diagnostics",
    detail:
      "Llama 4 identifies subtle skill gaps and emerging strengths that traditional analytics tools miss, using long-horizon context across weeks of work artifacts.",
  },
  {
    label: "Just-in-Time Learning",
    detail:
      "GPT-5 generates targeted interventions delivered exactly when a skill gap is detected, maximising professional development ROI without disrupting workflows.",
  },
];

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.04), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export default function UpskillPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-navy)" }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 px-6 sm:px-12 py-4 border-b backdrop-blur-md"
        style={{
          backgroundColor: "rgba(13,13,13,0.85)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <span className="font-mono text-xs" style={{ color: "var(--color-slate)" }}>
            Adam Silva
          </span>
        </div>
      </header>

      <main id="main-content" className="max-w-4xl mx-auto px-6 sm:px-12 py-16 lg:py-24">

        {/* Hero */}
        <FadeInWhenVisible>
          <section aria-label="Project overview" className="mb-20">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--color-green)" }}
            >
              Featured Project
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-5 leading-tight"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Upskill
            </h1>
            <p
              className="text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--color-slate-light)" }}
            >
              AI-powered enterprise SaaS that bridges daily work output and professional
              development — detecting skill gaps automatically, delivering learning exactly
              when it matters.
            </p>
          </section>
        </FadeInWhenVisible>

        {/* Gallery */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Project screenshots" className="mb-24">
            <ImageSlider images={images} />
          </section>
        </FadeInWhenVisible>

        {/* Overview */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Project description" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Overview
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                Upskill is an enterprise-grade SaaS platform designed to bridge the gap between
                daily work output and professional development. By integrating directly into a
                team's digital ecosystem via Slack and Google Workspace, the platform
                autonomously detects skill strengths and gaps — without any manual input.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                The core intelligence is a dual-model pipeline: Llama 4 handles deep analysis
                of work artifacts across its expanded 10M token context window, while GPT-5
                synthesises those insights into personalised, actionable learning interventions.
                The entire stack is deployed on Microsoft Azure Foundry, providing enterprise
                security, PII protection, and global low-latency access.
              </p>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Tech Stack */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Technology stack" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Tech Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {techStack.map(({ layer, technologies }) => (
                <div key={layer} className="rounded-xl p-5" style={glassStyle}>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-3"
                    style={{ color: "var(--color-green)" }}
                  >
                    {layer}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((t) => (
                      <TechTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Architecture */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Architecture" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Key Architectural Features
            </h2>
            <ol className="flex flex-col gap-10">
              {architectureFeatures.map(({ title, points }, i) => (
                <li key={i} className="flex gap-6">
                  <span
                    className="font-mono text-sm shrink-0 mt-0.5 w-8"
                    style={{ color: "var(--color-green)" }}
                  >
                    0{i + 1}.
                  </span>
                  <div>
                    <h3
                      className="font-semibold text-base mb-3"
                      style={{ color: "var(--color-slate-lightest)" }}
                    >
                      {title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {points.map((point, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                          <span
                            className="font-mono shrink-0 mt-0.5"
                            style={{ color: "var(--color-green)" }}
                            aria-hidden="true"
                          >
                            ▸
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </FadeInWhenVisible>

        {/* Key Impacts */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Key impacts" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Key Impacts
            </h2>
            <div className="flex flex-col gap-5">
              {impacts.map(({ label, detail }, i) => (
                <div
                  key={i}
                  className="flex gap-5 rounded-xl p-5"
                  style={glassStyle}
                >
                  <span
                    className="font-mono text-lg shrink-0 mt-0.5"
                    style={{ color: "var(--color-green)" }}
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: "var(--color-slate-lightest)" }}
                    >
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Footer back link */}
        <FadeInWhenVisible delay={0.1}>
          <div
            className="pt-10 border-t flex items-center justify-between"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <Link href="/" className="btn-outline inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <p className="text-xs font-mono" style={{ color: "var(--color-slate)" }}>
              Designed &amp; Built by Adam Silva
            </p>
          </div>
        </FadeInWhenVisible>

      </main>
    </div>
  );
}
