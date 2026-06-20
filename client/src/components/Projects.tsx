import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { projects } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const allTechs = Array.from(
  new Set(projects.flatMap((p) => p.technologies))
);

export function Projects() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const filteredProjects = activeTech
    ? projects.filter((p) => p.technologies.includes(activeTech))
    : projects;

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse, hsl(250 85% 65%), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.05]"
          style={{
            background: "radial-gradient(ellipse, hsl(200 90% 55%), transparent)",
          }}
        />
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="My Projects"
          subtitle="Here are some of my projects. I'll be adding more as I continue my journey."
        />

        {/* Tech filter tags */}
        <div
          className={`flex justify-center gap-2 mb-12 flex-wrap transition-all duration-700 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() => setActiveTech(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
              activeTech === null
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
            }`}
          >
            All
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(activeTech === tech ? null : tech)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                activeTech === tech
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
              index={index}
              isRevealed={isRevealed}
            />
          ))}
        </div>

        {/* Coming soon */}
        <div
          className={`text-center mt-20 transition-all duration-700 delay-700 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-muted-foreground/60 font-mono text-sm">
              More projects coming soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
