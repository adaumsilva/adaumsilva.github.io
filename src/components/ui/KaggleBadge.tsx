import Link from "next/link";
import type { KaggleProfile, KaggleTier } from "@/types/content";

const TIER_COLORS: Record<KaggleTier, { bg: string; text: string; border: string }> = {
  Grandmaster: { bg: "rgba(255,215,0,0.1)", text: "#ffd700", border: "rgba(255,215,0,0.3)" },
  Master:      { bg: "rgba(162,89,255,0.1)", text: "#a259ff", border: "rgba(162,89,255,0.3)" },
  Expert:      { bg: "rgba(32,190,255,0.1)", text: "#20beff", border: "rgba(32,190,255,0.3)" },
  Contributor: { bg: "rgba(136,146,176,0.1)", text: "#8892b0", border: "rgba(136,146,176,0.3)" },
  Novice:      { bg: "rgba(74,85,104,0.1)", text: "#4a5568", border: "rgba(74,85,104,0.3)" },
};

const MEDAL_ICONS = {
  gold:   { label: "Gold medals",   color: "#ffd700" },
  silver: { label: "Silver medals", color: "#c0c0c0" },
  bronze: { label: "Bronze medals", color: "#cd7f32" },
};

interface KaggleBadgeProps {
  profile: KaggleProfile;
}

export function KaggleBadge({ profile }: KaggleBadgeProps) {
  const colors = TIER_COLORS[profile.rank];

  return (
    <Link
      href={`https://kaggle.com/${profile.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-navy-light rounded-lg p-6 border border-navy-lighter hover:border-green/30 transition-all duration-200 group"
      aria-label={`Kaggle profile: ${profile.username}, ${profile.rank} tier`}
    >
      <div className="flex items-center gap-3 mb-4">
        {/* Kaggle icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" style={{ color: colors.text }} aria-hidden="true">
          <path d="M18.825 23.859c-.022.092-.097.141-.168.141h-3.027c-.178 0-.355-.078-.465-.217l-5.073-6.171-1.435 1.395v4.55c0 .243-.189.442-.435.442H5.965c-.243 0-.432-.2-.432-.442V.442C5.533.2 5.722 0 5.965 0h2.257c.243 0 .435.2.435.442v13.152l6.179-6.421c.11-.122.27-.206.452-.206h3.133c.065 0 .127.05.145.118.032.124-.028.256-.114.337l-6.483 6.53 6.835 8.605c.071.086.094.218.022.302z" />
        </svg>
        <h3 className="text-slate-lightest font-semibold text-base">Kaggle</h3>
      </div>

      {/* Tier badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
        style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
      >
        {profile.rank}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xl font-bold font-mono" style={{ color: colors.text }}>{profile.competitions}</p>
          <p className="text-xs text-slate">Competitions</p>
        </div>
        <div>
          <div className="flex gap-2 mt-1">
            {(["gold", "silver", "bronze"] as const).map((medal) => (
              <span
                key={medal}
                className="flex items-center gap-1 text-xs font-mono"
                style={{ color: MEDAL_ICONS[medal].color }}
                title={`${profile[medal]} ${MEDAL_ICONS[medal].label}`}
              >
                ● {profile[medal]}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate mt-1">Medals</p>
        </div>
      </div>

      <p className="text-xs text-slate group-hover:text-green transition-colors">
        @{profile.username} →
      </p>
    </Link>
  );
}
