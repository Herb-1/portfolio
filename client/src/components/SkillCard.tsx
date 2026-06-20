interface SkillCardProps {
  name: string;
  icon: string;
  level: number;
  index: number;
  isRevealed: boolean;
}

export function SkillCard({ name, icon, level, index, isRevealed }: SkillCardProps) {
  return (
    <div
      className={`glass rounded-xl p-5 group hover:bg-white/[0.06] transition-all duration-500 hover:scale-[1.02] glow-hover ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-xl group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <span className="font-semibold text-foreground">{name}</span>
        <span className="ml-auto text-sm font-mono text-muted-foreground">
          {level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isRevealed ? `${level}%` : "0%",
            background: "linear-gradient(90deg, hsl(250, 85%, 65%), hsl(200, 90%, 55%))",
            transitionDelay: `${index * 80 + 300}ms`,
          }}
        />
      </div>
    </div>
  );
}
