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
    <Card className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 h-full flex flex-col">
      <div className="h-48 overflow-hidden group">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          aria-label={`${title} project thumbnail`}
        ></div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-secondary">{title}</h3>
        <p className="text-tertiary mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors cursor-default font-medium">
              {tech}
            </Badge>
          ))}
        </div>
        <a 
          href={projectUrl} 
          className="text-primary font-medium hover:text-blue-700 transition-all duration-200 inline-flex items-center group/link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Project 
          <ArrowRight className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </CardContent>
    </Card>
  );
}
