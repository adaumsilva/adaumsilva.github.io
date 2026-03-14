export interface Hero {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  resumeUrl: string;
}

export interface About {
  bio: string[];
  skills: string[];
  avatarUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  techTags: string[];
}

export type DemoType = "huggingface" | "streamlit" | "gradio" | "netron" | "none";

export interface Project {
  id: string;
  title: string;
  featured: boolean;
  summary: string;
  description: {
    problem: string;
    decision: string;
    impact: string;
  };
  techTags: string[];
  links: {
    github: string | null;
    demo: string | null;
    wandb: string | null;
    netron: string | null;
    paper: string | null;
  };
  demo: {
    type: DemoType;
    url: string | null;
    height: number;
  };
  imageUrl: string | null;
}

export interface ArchiveItem {
  id: string;
  year: number;
  title: string;
  description: string;
  techTags: string[];
  links: {
    github: string | null;
    demo: string | null;
    external: string | null;
  };
}

export type KaggleTier = "Grandmaster" | "Master" | "Expert" | "Contributor" | "Novice";

export interface KaggleProfile {
  username: string;
  rank: KaggleTier;
  competitions: number;
  bronze: number;
  silver: number;
  gold: number;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  url: string;
}

export interface Stats {
  githubUsername: string;
  kaggle: KaggleProfile[];
  certifications: Certification[];
}

export interface Social {
  github: string;
  linkedin: string;
  behance: string;
  email: string;
}

export interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string | null;
}
