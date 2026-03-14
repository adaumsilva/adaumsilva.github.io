import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchiveTable } from "@/components/ui/ArchiveTable";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import type { ArchiveItem } from "@/types/content";

interface ArchiveProps {
  data: ArchiveItem[];
}

export function Archive({ data }: ArchiveProps) {
  return (
    <section id="archive" className="py-24 lg:py-32" aria-label="Project archive">
      <FadeInWhenVisible>
        <SectionHeading number="05" title="Other Projects" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <p className="text-slate text-sm mb-8 max-w-lg">
          A collection of smaller experiments, competition notebooks, and side projects.
        </p>
        <ArchiveTable items={data} />
      </FadeInWhenVisible>
    </section>
  );
}
