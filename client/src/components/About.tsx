import { SkillCard } from "./SkillCard";
import { SectionHeader } from "./SectionHeader";
import { personalInfo, skills } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

export function About() {
  const { ref: aboutRef, isRevealed: aboutRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: statsRef, isRevealed: statsRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: skillsRef, isRevealed: skillsRevealed } = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, hsl(200 90% 55%), transparent)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, hsl(330 85% 60%), transparent)",
            animation: "float-slow 18s ease-in-out infinite 5s",
          }}
        />
        {/* Decorative shapes */}
        <div
          className="absolute top-[20%] left-[8%] w-20 h-20 border border-primary/[0.04] rounded-2xl hidden lg:block"
          style={{ animation: "float 10s ease-in-out infinite", transform: "rotate(15deg)" }}
        />
        <div
          className="absolute bottom-[30%] right-[10%] w-16 h-16 border border-secondary/[0.04] rounded-full hidden lg:block"
          style={{ animation: "float 12s ease-in-out infinite 3s" }}
        />
        <div
          className="absolute top-[60%] left-[15%] w-3 h-3 bg-accent/[0.06] rounded-full hidden lg:block"
          style={{ animation: "float 8s ease-in-out infinite 1s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="About Me"
          subtitle="A glimpse into who I am and what I do"
        />

        {/* About Content */}
        <div
          ref={aboutRef}
          className={`max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            aboutRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass rounded-2xl p-8 md:p-10 space-y-5 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
              <div
                className="absolute top-0 right-0 w-full h-full opacity-20"
                style={{
                  background: "radial-gradient(circle at top right, hsl(250 85% 65% / 0.2), transparent 70%)",
                }}
              />
            </div>

            {personalInfo.aboutMe.map((paragraph, index) => (
              <p
                key={index}
                className={`text-muted-foreground leading-relaxed text-lg transition-all duration-700 ${
                  aboutRevealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-20"
        >
          {personalInfo.stats.map((stat, index) => (
            <AnimatedStatCard
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
              isRevealed={statsRevealed}
            />
          ))}
        </div>

        {/* Skills */}
        <div
          ref={skillsRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            skillsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            My Skills
          </h3>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {[
              { key: "all", label: "All" },
              { key: "frontend", label: "Frontend" },
              { key: "backend", label: "Backend" },
              { key: "other", label: "Other" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 scale-105"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
                index={index}
                isRevealed={skillsRevealed}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated stat card with counting effect
function AnimatedStatCard({
  value,
  label,
  index,
  isRevealed,
}: {
  value: string;
  label: string;
  index: number;
  isRevealed: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isRevealed) return;

    // Extract number from value like "2+", "10+", "9+"
    const numMatch = value.match(/(\d+)/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numMatch[1]);
    const suffix = value.replace(numMatch[1], "");
    const duration = 1500;
    const startTime = Date.now();
    const delay = index * 200;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delay;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        setDisplayValue(`${current}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [isRevealed, value, index]);

  return (
    <div
      className={`glass rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-all duration-500 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(250 85% 65% / 0.05), transparent 70%)",
        }}
      />
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 relative z-10">
        {isRevealed ? displayValue : "0"}
      </div>
      <div className="text-sm text-muted-foreground font-medium relative z-10">
        {label}
      </div>
    </div>
  );
}
