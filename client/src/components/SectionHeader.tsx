import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"} ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } transition-all duration-700 ease-out`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      
      {/* Animated underline */}
      <div className={`${align === "center" ? "mx-auto" : ""} relative h-[3px] w-20 overflow-hidden rounded-full`}>
        <div
          className={`absolute inset-0 rounded-full transition-transform duration-1000 ease-out ${
            isRevealed ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: "linear-gradient(90deg, hsl(250, 85%, 65%), hsl(200, 90%, 55%), hsl(330, 85%, 60%))",
          }}
        />
      </div>
      
      {subtitle && (
        <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
