import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTag } from "@/components/ui/TechTag";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import type { About as AboutData } from "@/types/content";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-24 lg:py-32" aria-label="About me">
      <FadeInWhenVisible>
        <SectionHeading number="01" title="About Me" />
      </FadeInWhenVisible>

      <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
        <div>
          {data.bio.map((paragraph, i) => (
            <FadeInWhenVisible key={i} delay={0.1 * (i + 1)}>
              <p className="text-slate leading-relaxed mb-4 text-base">{paragraph}</p>
            </FadeInWhenVisible>
          ))}

          <FadeInWhenVisible delay={0.4}>
            <p className="text-slate-light font-medium mb-3 mt-6 text-sm">
              Technologies I work with:
            </p>
            <ul
              className="grid grid-cols-2 gap-2"
              aria-label="Technical skills"
            >
              {data.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-slate text-sm">
                  <span className="text-green font-mono text-xs" aria-hidden="true">▸</span>
                  {skill}
                </li>
              ))}
            </ul>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.2}>
          <div className="relative w-full max-w-[260px] mx-auto md:mx-0 group">
            <div className="absolute inset-0 border-2 border-green rounded translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
            <div className="relative rounded overflow-hidden bg-navy-light aspect-square">
              {data.avatarUrl && data.avatarUrl !== "/images/headshot.jpg" ? (
                <Image
                  src={data.avatarUrl}
                  alt="Adam Silva"
                  width={260}
                  height={260}
                  className="object-cover w-full h-full mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-300"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-lighter text-4xl font-bold text-green">
                  AS
                </div>
              )}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
