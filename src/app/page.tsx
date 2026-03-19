import { getHero, getAbout, getExperience, getProjects, getArchive, getStats, getSocial } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Archive } from "@/components/sections/Archive";
import { Contact } from "@/components/sections/Contact";

export default async function Home() {
  const hero = getHero();
  const about = getAbout();
  const experience = getExperience();
  const projects = getProjects();
  const archive = getArchive();
  const stats = getStats();
  const social = getSocial();

  return (
    <>
      <MobileHeader social={social} />
      <div className="lg:flex">
        <Sidebar social={social} />
        <main
          id="main-content"
          className="flex-1 px-6 sm:px-12 lg:px-16 xl:px-24 max-w-3xl lg:max-w-none mx-auto"
        >
          <Hero data={hero} />
          <About data={about} />
          <Experience data={experience} />
          <FeaturedProject />
          <Projects data={projects} />
          <Stats data={stats} />
          <Archive data={archive} />
          <Contact social={social} />
          <footer className="py-6 text-center">
            <p className="text-slate text-xs font-mono">
              Designed &amp; Built by Adam Silva
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
