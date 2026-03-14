"use client";

import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SocialLinks } from "./SocialLinks";
import type { Social } from "@/types/content";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export function Sidebar({ social }: { social: Social }) {
  const active = useActiveSection();

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-0 lg:h-screen lg:w-[45%] lg:max-w-[400px] lg:py-24 lg:px-12 xl:px-16 shrink-0"
      aria-label="Site navigation"
    >
      {/* Top: name + tagline */}
      <div>
        <Link href="#hero" className="group block mb-2 no-underline">
          <h1 className="text-4xl font-bold text-slate-lightest group-hover:text-green transition-colors duration-200">
            Adam Silva
          </h1>
        </Link>
        <h2 className="text-lg font-medium text-slate-light mb-4">AI Engineer</h2>
        <p className="text-sm text-slate max-w-[200px] leading-relaxed">
          Building scalable AI systems and LLM solutions.
        </p>
      </div>

      {/* Middle: nav */}
      <nav aria-label="Main navigation">
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
      </nav>

      {/* Bottom: social links */}
      <SocialLinks social={social} />
    </aside>
  );
}
