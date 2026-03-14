interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="text-green font-mono text-xs px-2 py-1 rounded bg-green-tint border border-green/20 whitespace-nowrap">
      {label}
    </span>
  );
}
