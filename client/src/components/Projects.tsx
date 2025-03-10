import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="section py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 text-center">My Projects</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
        
        <p className="text-center text-tertiary max-w-2xl mx-auto mb-12">
          Here are some of my projects. I'll be adding more as I continue my journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-tertiary italic">More projects coming soon...</p>
        </div>
      </div>
    </section>
  );
}
