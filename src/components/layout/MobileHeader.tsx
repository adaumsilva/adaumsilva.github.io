"use client";

import { useState } from "react";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-navy/90 backdrop-blur border-b border-navy-light">
        <Link href="#hero" className="text-lg font-bold text-slate-lightest hover:text-green transition-colors">
          Adam Silva
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-slate hover:text-green transition-colors p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          id="mobile-nav"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-shadow/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="relative ml-auto w-72 h-full bg-navy-light flex flex-col py-10 px-8 gap-8 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-5 right-5 text-slate hover:text-green transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-6 mt-8">
                {navItems.map(({ label, href }, i) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 text-slate hover:text-green transition-colors"
                    >
                      <span className="text-green font-mono text-xs">
                        0{i + 1}.
                      </span>
                      <span className="text-slate-lightest text-base font-medium">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
