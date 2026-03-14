import Link from "next/link";
import { TechTag } from "./TechTag";
import { DemoIframe } from "./DemoIframe";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

/* Glassmorphism card — matches the uiverse snippet style */
const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 25px 25px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  /* Visual placeholder when no demo/screenshot is set */
  const visual = project.demo.type !== "none" && project.demo.url ? (
    <DemoIframe
      type={project.demo.type}
      url={project.demo.url}
      height={project.demo.height}
      title={project.title}
    />
  ) : (
    <div
      className="w-full h-full min-h-[280px] rounded-lg flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(217,119,87,0.08) 0%, rgba(17,34,64,0.6) 100%)",
        border: "1px solid rgba(217,119,87,0.15)",
      }}
    >
      <div className="text-center px-8 select-none">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(217,119,87,0.15)", border: "1px solid rgba(217,119,87,0.3)" }}
        >
          <span className="text-green text-3xl font-mono font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
        <p className="text-slate-light font-semibold text-base">{project.title}</p>
      </div>
    </div>
  );

  return (
    <article
      className="relative mb-28 last:mb-0"
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* ── Desktop: 12-column grid, content + image overlap ── */}
      <div className="hidden md:grid md:grid-cols-12 md:items-center">

        {/* Image column */}
        <div className={`col-span-7 row-start-1 ${isEven ? "col-start-1" : "col-start-6"} rounded-lg overflow-hidden`}>
          {visual}
        </div>

        {/* Content column — overlaps the image */}
        <div className={`col-span-6 row-start-1 z-10 flex flex-col ${isEven ? "col-start-7 items-end text-right" : "col-start-1 items-start text-left"}`}>
          <p className="font-mono text-green text-xs tracking-widest mb-2">Featured Project</p>
          <h3
            id={`project-${project.id}-title`}
            className="text-2xl font-semibold text-slate-lightest mb-5 hover:text-green transition-colors duration-200"
          >
            {project.title}
          </h3>

          {/* Glass description card */}
          <div className="rounded-lg p-6 mb-5 w-full" style={glassStyle}>
            <div className="mb-4">
              <span className="font-mono text-green text-xs uppercase tracking-widest">Problem</span>
              <p className="text-slate text-sm leading-relaxed mt-1">{project.description.problem}</p>
            </div>
            <div className="mb-4">
              <span className="font-mono text-green text-xs uppercase tracking-widest">Approach</span>
              <p className="text-slate text-sm leading-relaxed mt-1">{project.description.decision}</p>
            </div>
            <div>
              <span className="font-mono text-green text-xs uppercase tracking-widest">Impact</span>
              <p className="text-slate-light text-sm leading-relaxed mt-1 font-medium">{project.description.impact}</p>
            </div>
          </div>

          {/* Tech tags */}
          <div className={`flex flex-wrap gap-2 mb-4 ${isEven ? "justify-end" : "justify-start"}`}>
            {project.techTags.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>

          {/* Links */}
          <div className={`flex gap-4 ${isEven ? "justify-end" : "justify-start"}`}>
            {project.links.github && (
              <Link href={project.links.github} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="text-slate-light hover:text-green transition-colors">
                <GitHubIcon />
              </Link>
            )}
            {project.links.wandb && (
              <Link href={project.links.wandb} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} W&B report`}
                className="text-slate-light hover:text-green transition-colors flex items-center gap-1 font-mono text-xs">
                W&B <ExternalLinkIcon />
              </Link>
            )}
            {project.links.netron && (
              <Link href={project.links.netron} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} Netron model`}
                className="text-slate-light hover:text-green transition-colors flex items-center gap-1 font-mono text-xs">
                Netron <ExternalLinkIcon />
              </Link>
            )}
            {project.links.demo && (
              <Link href={project.links.demo} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-slate-light hover:text-green transition-colors">
                <ExternalLinkIcon />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked card ── */}
      <div className="md:hidden rounded-lg overflow-hidden" style={glassStyle}>
        <div className="p-6">
          <p className="font-mono text-green text-xs tracking-widest mb-2">Featured Project</p>
          <h3
            id={`project-${project.id}-title`}
            className="text-xl font-semibold text-slate-lightest mb-4"
          >
            {project.title}
          </h3>
          <div className="mb-4">{visual}</div>
          <div className="mb-3">
            <span className="font-mono text-green text-xs uppercase tracking-widest">Problem</span>
            <p className="text-slate text-sm leading-relaxed mt-1">{project.description.problem}</p>
          </div>
          <div className="mb-3">
            <span className="font-mono text-green text-xs uppercase tracking-widest">Approach</span>
            <p className="text-slate text-sm leading-relaxed mt-1">{project.description.decision}</p>
          </div>
          <div className="mb-4">
            <span className="font-mono text-green text-xs uppercase tracking-widest">Impact</span>
            <p className="text-slate-light text-sm leading-relaxed mt-1 font-medium">{project.description.impact}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techTags.map((tag) => <TechTag key={tag} label={tag} />)}
          </div>
          <div className="flex gap-4">
            {project.links.github && (
              <Link href={project.links.github} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`} className="text-slate-light hover:text-green transition-colors">
                <GitHubIcon />
              </Link>
            )}
            {project.links.demo && (
              <Link href={project.links.demo} target="_blank" rel="noopener noreferrer"
                aria-label={`${project.title} demo`} className="text-slate-light hover:text-green transition-colors">
                <ExternalLinkIcon />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
