import Link from "next/link";
import { TechTag } from "./TechTag";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.04), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="rounded-xl p-7 transition-transform duration-300 hover:-translate-y-1 flex flex-col h-full"
      style={glassStyle}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-mono text-green text-xs tracking-widest mb-2">Featured Project</p>
          <h3
            id={`project-${project.id}-title`}
            className="text-xl font-semibold text-slate-lightest hover:text-green transition-colors duration-200"
          >
            {project.title}
          </h3>
        </div>
        {/* Folder icon */}
        <svg className="w-10 h-10 text-green shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      </div>

      {/* Description — grows to fill available space */}
      <p className="text-slate text-sm leading-relaxed mb-6 flex-1">
        {project.summary}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techTags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-white/5">
        {project.links.github && (
          <Link
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className="flex items-center gap-2 text-slate-light hover:text-green transition-colors duration-200 text-sm"
          >
            <GitHubIcon />
            View on GitHub
          </Link>
        )}
        {project.links.wandb && (
          <Link
            href={project.links.wandb}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} W&B report`}
            className="flex items-center gap-2 text-slate-light hover:text-green transition-colors duration-200 text-sm font-mono"
          >
            <ExternalLinkIcon />
            W&B Report
          </Link>
        )}
        {project.links.demo && (
          <Link
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="flex items-center gap-2 text-slate-light hover:text-green transition-colors duration-200 text-sm"
          >
            <ExternalLinkIcon />
            Live Demo
          </Link>
        )}
      </div>
    </article>
  );
}
