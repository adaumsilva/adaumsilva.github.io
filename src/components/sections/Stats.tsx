import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import type { Stats as StatsData } from "@/types/content";

interface StatsProps {
  data: StatsData;
}

export function Stats({ data }: StatsProps) {
  if (data.certifications.length === 0) return null;

  return (
    <section id="stats" className="py-24 lg:py-32" aria-label="Certifications">
      <FadeInWhenVisible>
        <SectionHeading number="04" title="Certifications" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
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
    </section>
  );
}
