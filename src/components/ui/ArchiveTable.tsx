import Link from "next/link";
import { TechTag } from "./TechTag";
import type { ArchiveItem } from "@/types/content";

interface ArchiveTableProps {
  items: ArchiveItem[];
}

export function ArchiveTable({ items }: ArchiveTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-navy-light">
      <table className="w-full text-left" role="table" aria-label="Project archive">
        <thead>
          <tr className="border-b border-navy-light text-xs font-mono text-slate uppercase tracking-wider">
            <th scope="col" className="px-4 py-3 font-normal">Year</th>
            <th scope="col" className="px-4 py-3 font-normal">Title</th>
            <th scope="col" className="px-4 py-3 font-normal hidden sm:table-cell">Description</th>
            <th scope="col" className="px-4 py-3 font-normal hidden md:table-cell">Built with</th>
            <th scope="col" className="px-4 py-3 font-normal text-right">Links</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-navy-light last:border-0 hover:bg-navy-light transition-colors group"
            >
              <td className="px-4 py-4 font-mono text-xs text-slate whitespace-nowrap">{item.year}</td>
              <td className="px-4 py-4 text-sm text-slate-light font-medium group-hover:text-green transition-colors">
                {item.title}
              </td>
              <td className="px-4 py-4 text-xs text-slate hidden sm:table-cell max-w-xs">
                {item.description}
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {item.techTags.slice(0, 3).map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-3">
                  {item.links.github && (
                    <Link
                      href={item.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.title} GitHub repository`}
                      className="text-slate hover:text-green transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                    </Link>
                  )}
                  {item.links.external && (
                    <Link
                      href={item.links.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.title} external link`}
                      className="text-slate hover:text-green transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
