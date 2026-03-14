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

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article
      className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-4 mb-24 last:mb-0`}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Content card */}
      <div className={`relative z-10 md:w-[55%] flex flex-col justify-center ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
        <p className="font-mono text-green text-xs mb-2">Featured Project</p>
        <h3 id={`project-${project.id}-title`} className="text-xl md:text-2xl font-semibold text-slate-lightest mb-5 hover:text-green transition-colors">
          {project.title}
        </h3>

        {/* Description card */}
        <div className="bg-navy-light p-6 rounded shadow-xl mb-5 w-full">
          <div className="mb-3">
            <span className="font-mono text-green text-xs uppercase tracking-wider">Problem</span>
            <p className="text-slate text-sm leading-relaxed mt-1">{project.description.problem}</p>
          </div>
          <div className="mb-3">
            <span className="font-mono text-green text-xs uppercase tracking-wider">Approach</span>
            <p className="text-slate text-sm leading-relaxed mt-1">{project.description.decision}</p>
          </div>
          <div>
            <span className="font-mono text-green text-xs uppercase tracking-wider">Impact</span>
            <p className="text-slate-light text-sm leading-relaxed mt-1 font-medium">{project.description.impact}</p>
          </div>
        </div>

        {/* Tech tags */}
        <div className={`flex flex-wrap gap-2 mb-4 ${isEven ? "" : "md:justify-end"}`}>
          {project.techTags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>

        {/* Links */}
        <div className={`flex gap-4 ${isEven ? "" : "md:justify-end"}`}>
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-slate hover:text-green transition-colors"
            >
              <GitHubIcon />
            </Link>
          )}
          {project.links.wandb && (
            <Link
              href={project.links.wandb}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Weights & Biases report`}
              className="text-slate hover:text-green transition-colors flex items-center gap-1"
            >
              <span className="font-mono text-xs">W&B</span>
              <ExternalLinkIcon />
            </Link>
          )}
          {project.links.netron && (
            <Link
              href={project.links.netron}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Netron model visualization`}
              className="text-slate hover:text-green transition-colors flex items-center gap-1"
            >
              <span className="font-mono text-xs">Netron</span>
              <ExternalLinkIcon />
            </Link>
          )}
          {project.links.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-slate hover:text-green transition-colors"
            >
              <ExternalLinkIcon />
            </Link>
          )}
        </div>
      </div>

      {/* Demo / visual area */}
      <div className={`md:absolute md:top-0 md:bottom-0 ${isEven ? "md:right-0 md:w-[55%]" : "md:left-0 md:w-[55%]"} rounded overflow-hidden`}>
        {project.demo.type !== "none" && project.demo.url ? (
          <DemoIframe
            type={project.demo.type}
            url={project.demo.url}
            height={project.demo.height}
            title={project.title}
          />
        ) : (
          <div className="w-full h-full min-h-[220px] bg-navy-light rounded flex items-center justify-center border border-navy-lighter">
            <div className="text-center px-6">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-green text-2xl font-mono font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
              <p className="text-slate text-sm">{project.title}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
