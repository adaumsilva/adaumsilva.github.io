import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { TechTag } from "@/components/ui/TechTag";

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.04), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

const techTags = [
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Llama 4",
  "GPT-5",
  "Azure Foundry",
  "Python",
  "TypeScript",
];

export function FeaturedProject() {
  return (
    <section
      id="featured-project"
      className="py-24 lg:py-32"
      aria-label="Featured project showcase"
    >
      <FadeInWhenVisible>
        <SectionHeading number="03" title="Featured Project" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.15}>
        <article
          className="rounded-xl p-8 lg:p-10"
          style={glassStyle}
          aria-labelledby="upskill-card-title"
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Screenshot */}
            <div
              className="relative aspect-video overflow-hidden rounded-lg order-1"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              }}
            >
              <img
                src="/screenshots/upskill/print1.jpg"
                alt="Upskill dashboard — AI-powered learning platform"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 order-2">
              <p className="font-mono text-green text-xs tracking-widest uppercase">
                Enterprise SaaS · AI Platform
              </p>
              <h3
                id="upskill-card-title"
                className="text-3xl font-bold text-slate-lightest"
              >
                Upskill
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                An enterprise-grade AI learning platform that integrates directly into team
                workflows via Slack and Google Workspace — autonomously detecting skill gaps
                and generating personalized learning interventions using a dual-model pipeline
                (Llama 4 + GPT-5) on Microsoft Azure Foundry.
              </p>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
              <div className="pt-1">
                <Link href="/projects/upskill/" className="btn-outline inline-flex items-center gap-2">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </FadeInWhenVisible>
    </section>
  );
}
