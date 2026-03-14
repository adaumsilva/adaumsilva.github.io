import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubStats } from "@/components/ui/GitHubStats";
import { KaggleBadge } from "@/components/ui/KaggleBadge";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import type { Stats as StatsData, GitHubUser } from "@/types/content";

interface StatsProps {
  data: StatsData;
  githubUser: GitHubUser | null;
}

export function Stats({ data, githubUser }: StatsProps) {
  return (
    <section id="stats" className="py-24 lg:py-32" aria-label="Stats and credentials">
      <FadeInWhenVisible>
        <SectionHeading number="04" title="By the Numbers" />
      </FadeInWhenVisible>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <FadeInWhenVisible delay={0.1}>
          <GitHubStats user={githubUser} username={data.githubUsername} />
        </FadeInWhenVisible>

        <div className="flex flex-col gap-4">
          {data.kaggle.map((profile) => (
            <FadeInWhenVisible key={profile.username} delay={0.2}>
              <KaggleBadge profile={profile} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>

      {data.certifications.length > 0 && (
        <FadeInWhenVisible delay={0.3}>
          <h3 className="text-slate-lightest font-semibold text-base mb-4">Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.certifications.map((cert) => (
              <Link
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-navy-light rounded-lg p-4 border border-navy-lighter hover:border-green/30 transition-colors group"
                aria-label={`${cert.name} by ${cert.issuer}, ${cert.year}`}
              >
                <span className="text-green mt-0.5 shrink-0" aria-hidden="true">✦</span>
                <div>
                  <p className="text-slate-light text-sm font-medium group-hover:text-green transition-colors">
                    {cert.name}
                  </p>
                  <p className="text-slate text-xs mt-1">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </FadeInWhenVisible>
      )}
    </section>
  );
}
