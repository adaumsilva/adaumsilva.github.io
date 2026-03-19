"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SocialLinks } from "./SocialLinks";
import { useLoader } from "@/components/ui/LoaderContext";
import type { Social } from "@/types/content";

const EASE = [0.645, 0.045, 0.355, 1.0] as const;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Featured Project", href: "#featured-project" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export function Sidebar({ social }: { social: Social }) {
  const active = useActiveSection();
  const { loaded } = useLoader();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-0 lg:h-screen lg:w-[45%] lg:max-w-[400px] lg:py-24 lg:px-12 xl:px-16 shrink-0"
      aria-label="Site navigation"
    >
      {/* Top: name + tagline */}
      <m.div {...fadeUp(1.75)}>
        <Link href="#hero" className="group block mb-2 no-underline">
          <h1 className="text-4xl font-bold text-slate-lightest group-hover:text-green transition-colors duration-200">
            Adam Silva
          </h1>
        </Link>
        <h2 className="text-lg font-medium text-slate-light mb-4">AI Engineer</h2>
        <p className="text-sm text-slate max-w-[200px] leading-relaxed">
          Building scalable AI systems and LLM solutions.
        </p>
      </m.div>

      {/* Middle: nav */}
      <m.nav {...fadeUp(2.0)} aria-label="Main navigation">
        <ul className="flex flex-col gap-4">
          {navItems.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`group flex items-center gap-4 text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                    isActive ? "text-slate-lightest" : "text-slate hover:text-slate-lightest"
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-200 ${
                      isActive
                        ? "w-16 bg-slate-lightest"
                        : "w-8 bg-slate group-hover:w-16 group-hover:bg-slate-lightest"
                    }`}
                    aria-hidden="true"
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </m.nav>

      {/* Bottom: social links */}
      <m.div {...fadeUp(2.2)}>
        <SocialLinks social={social} />
      </m.div>
    </aside>
  );
}
