import fs from "fs";
import path from "path";
import type { Hero, About, Experience, Project, ArchiveItem, Stats } from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

function load<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function getHero(): Hero {
  return load<Hero>("hero.json");
}

export function getAbout(): About {
  return load<About>("about.json");
}

export function getExperience(): Experience[] {
  return load<Experience[]>("experience.json");
}

export function getProjects(): Project[] {
  return load<Project[]>("projects.json");
}

export function getArchive(): ArchiveItem[] {
  return load<ArchiveItem[]>("archive.json");
}

export function getStats(): Stats {
  return load<Stats>("stats.json");
}
