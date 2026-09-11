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
  "WordPress",
  "WooCommerce",
  "PHP",
  "JavaScript",
  "OpenAI",
  "Tool Calling",
  "RAG",
  "REST API",
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
          aria-labelledby="ai-shopping-assistant-card-title"
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
                src="/screenshots/ai-shopping-assistant/screenshot-2.jpg"
                alt="AI Shopping Assistant — full-screen interface with conversation history and the live cart side by side"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 order-2">
              <p className="font-mono text-green text-xs tracking-widest uppercase">
                Production SaaS · AI Agent
              </p>
              <h3
                id="ai-shopping-assistant-card-title"
                className="text-3xl font-bold text-slate-lightest"
              >
                AI Shopping Assistant
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                A production AI sales agent for WooCommerce, shipped as a WordPress plugin on a
                metered SaaS gateway — shoppers search the catalogue in natural language, manage
                their cart, and check out without leaving the chat, with RAG-grounded answers from
                uploaded documents and one-click human takeover from the admin inbox.
              </p>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-5">
                <Link href="/projects/ai-shopping-assistant/" className="btn-outline inline-flex items-center gap-2">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="https://store.f5digitalmarketing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AI Shopping Assistant live demo"
                  className="flex items-center gap-2 text-slate-light hover:text-green transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        </article>
      </FadeInWhenVisible>
    </section>
  );
}
