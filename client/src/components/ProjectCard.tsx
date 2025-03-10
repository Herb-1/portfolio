import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
}

export function ProjectCard({ title, description, technologies, imageUrl, projectUrl }: ProjectCardProps) {
  return (
    <Card className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2">
      <div className="h-48 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          aria-label={`${title} project thumbnail`}
        ></div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-secondary">{title}</h3>
        <p className="text-tertiary mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors cursor-default">
              {tech}
            </Badge>
          ))}
        </div>
        <a href={projectUrl} className="text-primary font-medium hover:text-blue-700 transition-colors duration-200 inline-flex items-center" target="_blank" rel="noopener noreferrer">
          View Project 
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}
