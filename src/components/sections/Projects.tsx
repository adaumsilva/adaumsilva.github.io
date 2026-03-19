import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import type { Project } from "@/types/content";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  const featured = data.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 lg:py-32" aria-label="Featured projects">
      <FadeInWhenVisible>
        <SectionHeading number="04" title="Some Projects I've Built" />
      </FadeInWhenVisible>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
        {featured.map((project, i) => (
          <FadeInWhenVisible key={project.id} delay={0.1 * (i + 1)} className="h-full">
            <ProjectCard project={project} />
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
