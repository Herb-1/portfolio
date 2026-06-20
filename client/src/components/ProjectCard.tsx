import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  index: number;
  isRevealed: boolean;
}

export function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  projectUrl,
  index,
  isRevealed,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-700 h-full ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight follow effect */}
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, hsl(250 85% 65% / 0.08), transparent 40%)`,
        }}
      />

      {/* Card border glow */}
      <div className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsl(250 85% 65% / 0.15), transparent 40%)`,
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Main card */}
      <div className="relative z-[5] glass rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(230,25%,7%)] via-[hsl(230,25%,7%,0.3)] to-transparent" />

          {/* Floating badge top-right */}
          <div className={`absolute top-4 right-4 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
          }`}>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 glass-strong px-3 py-1.5 rounded-full text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Live Demo
            </a>
          </div>

          {/* Index number */}
          <div className="absolute top-4 left-4 font-mono text-xs text-white/20 font-bold">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Center action button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-14 h-14 rounded-full glass-strong flex items-center justify-center text-white transition-all duration-500 hover:scale-110 ${
                isHovered ? 'scale-100 rotate-0' : 'scale-50 rotate-90'
              }`}
            >
              <ArrowUpRight className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Title with animated underline */}
          <h3 className="text-lg font-bold text-foreground mb-2 relative inline-block">
            {title}
            <span
              className={`absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out ${
                isHovered ? 'w-full' : 'w-0'
              }`}
            />
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
            {description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, i) => (
              <Badge
                key={i}
                className={`text-[11px] bg-white/[0.03] text-muted-foreground border border-white/[0.06] px-2.5 py-1 rounded-lg font-mono transition-all duration-300 cursor-default ${
                  isHovered ? 'border-primary/20 text-primary/80 bg-primary/[0.05]' : ''
                }`}
                style={{
                  transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Footer link */}
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group/link"
          >
            <span className={`transition-all duration-300 ${isHovered ? 'text-primary' : ''}`}>
              View Project
            </span>
            <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${
              isHovered ? 'translate-x-0.5 -translate-y-0.5 text-primary' : ''
            }`} />
          </a>
        </div>
      </div>
    </div>
  );
}
