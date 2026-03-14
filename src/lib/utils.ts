export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateRange(startDate: string, endDate: string | null): string {
  const fmt = (d: string) => {
    const [year, month] = d.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };
  return `${fmt(startDate)} — ${endDate ? fmt(endDate) : "Present"}`;
}
