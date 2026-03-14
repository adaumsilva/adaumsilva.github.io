import type { GitHubUser } from "@/types/content";

interface GitHubStatsProps {
  user: GitHubUser | null;
  username: string;
}

export function GitHubStats({ user, username }: GitHubStatsProps) {
  return (
    <div className="bg-navy-light rounded-lg p-6 border border-navy-lighter">
      <div className="flex items-center gap-3 mb-5">
        <svg className="w-5 h-5 text-green" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <h3 className="text-slate-lightest font-semibold text-base">GitHub Activity</h3>
      </div>

      {user && (
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-green font-mono">{user.public_repos}</p>
            <p className="text-xs text-slate mt-1">Repositories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green font-mono">{user.followers}</p>
            <p className="text-xs text-slate mt-1">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green font-mono">{user.following}</p>
            <p className="text-xs text-slate mt-1">Following</p>
          </div>
        </div>
      )}

      {/* Contribution chart */}
      <div className="rounded overflow-hidden bg-navy">
        <img
          src={`https://ghchart.rshah.org/64ffda/${username}`}
          alt={`GitHub contribution chart for ${username}`}
          width={722}
          height={112}
          loading="lazy"
          className="w-full"
        />
      </div>

      <p className="text-xs text-slate mt-3 text-right">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors"
        >
          View on GitHub →
        </a>
      </p>
    </div>
  );
}
