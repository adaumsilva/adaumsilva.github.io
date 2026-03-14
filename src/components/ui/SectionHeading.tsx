interface SectionHeadingProps {
  number: string;
  title: string;
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-green text-sm font-normal shrink-0">{number}.</span>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-lightest whitespace-nowrap">{title}</h2>
      <div className="hidden sm:block h-px bg-navy-light flex-1 max-w-xs" aria-hidden="true" />
    </div>
  );
}
