"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTag } from "@/components/ui/TechTag";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { formatDateRange } from "@/lib/utils";
import type { Experience as ExperienceData } from "@/types/content";

interface ExperienceProps {
  data: ExperienceData[];
}

export function Experience({ data }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data[activeIndex];

  return (
    <section id="experience" className="py-24 lg:py-32" aria-label="Work experience">
      <FadeInWhenVisible>
        <SectionHeading number="02" title="Where I've Worked" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-0">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Companies"
            className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-l border-navy-light mb-6 sm:mb-0 sm:mr-8 shrink-0"
          >
            {data.map((exp, i) => (
              <button
                key={exp.id}
                role="tab"
                id={`tab-${exp.id}`}
                aria-selected={activeIndex === i}
                aria-controls={`panel-${exp.id}`}
                onClick={() => setActiveIndex(i)}
                className={`px-4 py-3 text-left text-sm font-mono whitespace-nowrap transition-all duration-200 border-b-2 sm:border-b-0 sm:border-l-2 -mb-px sm:mb-0 sm:-ml-px ${
                  activeIndex === i
                    ? "border-green text-green bg-green-tint"
                    : "border-transparent text-slate hover:text-green hover:bg-green-tint"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div className="flex-1 min-h-[300px]">
            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                role="tabpanel"
                id={`panel-${active.id}`}
                aria-labelledby={`tab-${active.id}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-medium text-slate-lightest mb-1">
                  {active.role}{" "}
                  <span className="text-green">
                    @{" "}
                    {active.companyUrl !== "#" ? (
                      <Link
                        href={active.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {active.company}
                      </Link>
                    ) : (
                      active.company
                    )}
                  </span>
                </h3>
                <p className="font-mono text-xs text-slate mb-5">
                  {formatDateRange(active.startDate, active.endDate)}
                </p>
                <ul className="flex flex-col gap-3 mb-6">
                  {active.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate text-sm leading-relaxed">
                      <span className="text-green font-mono shrink-0 mt-0.5" aria-hidden="true">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {active.techTags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
