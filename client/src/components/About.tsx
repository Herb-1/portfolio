import { SkillCard } from "./SkillCard";
import { personalInfo, skills } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 text-center">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
          
          <div className="prose prose-lg max-w-none text-tertiary">
            {personalInfo.aboutMe.map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-secondary mb-6">My Skills</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <SkillCard 
                  key={index}
                  name={skill.name}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
