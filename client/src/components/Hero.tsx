import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { personalInfo } from "@/lib/data";
import { SocialIcon } from "./SocialIcon";
import { Download } from "lucide-react";

const roles = ["Web Developer", "Designer", "Full Stack Dev", "Coffee Lover ☕"];

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentRole.length) {
            setTypedText(currentRole.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(currentRole.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated gradient mesh — parallax responsive to mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
        }}
      >
        <div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{
            background: "radial-gradient(circle, hsl(250 85% 65% / 0.12), transparent)",
            animation: "float-slow 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, hsl(330 85% 60% / 0.09), transparent)",
            animation: "float-slow 10s ease-in-out infinite 3s",
          }}
        />
        <div
          className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(200 90% 55% / 0.07), transparent)",
            animation: "float 15s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Animated rings decoration */}
      <div className="absolute top-[15%] right-[8%] w-32 h-32 pointer-events-none opacity-[0.06]">
        <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-4 border border-secondary/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute inset-8 border border-accent/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }} />
      </div>

      {/* Floating code snippets decoration */}
      <div className="absolute bottom-[20%] left-[5%] font-mono text-[10px] text-primary/10 pointer-events-none hidden lg:block" style={{ animation: 'float 8s ease-in-out infinite' }}>
        <div>{"const dev = {"}</div>
        <div className="ml-3">{"name: 'Panadora',"}</div>
        <div className="ml-3">{"passion: true,"}</div>
        <div>{"}"}</div>
      </div>

      <div className="absolute top-[25%] right-[3%] font-mono text-[10px] text-accent/10 pointer-events-none hidden lg:block" style={{ animation: 'float 10s ease-in-out infinite 2s' }}>
        <div>{"<Component />"}</div>
        <div>{"// Building..."}</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground animate-in fade-in slide-in-from-left duration-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              {personalInfo.availability}
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-in fade-in slide-in-from-left duration-700 delay-150">
              <span className="text-foreground">Hi, I'm</span>
              <br />
              <span className="gradient-text relative">
                {personalInfo.name}
                {/* Decorative dots */}
                <span className="absolute -right-6 -top-2 text-primary text-2xl opacity-60">.</span>
              </span>
            </h1>

            {/* Typing Effect */}
            <div className="h-8 flex items-center animate-in fade-in slide-in-from-left duration-700 delay-300">
              <span className="text-lg md:text-xl text-muted-foreground font-mono">
                {"<"} <span className="text-primary">{typedText}</span>
                <span
                  className={`inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
                {" />"}
              </span>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg animate-in fade-in slide-in-from-left duration-700 delay-500">
              {personalInfo.shortBio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 animate-in fade-in slide-in-from-left duration-700 delay-700">
              <Button
                asChild
                size="lg"
                className="relative bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-8 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.03] border-0 group overflow-hidden"
                id="hero-cta-about"
              >
                <a href="#about">
                  {/* Shimmer */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s infinite",
                    }}
                  />
                  <span className="relative">About Me</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 glass border-white/10 text-foreground hover:bg-white/5 hover:border-white/20 font-semibold transition-all duration-300 hover:scale-[1.03]"
                id="hero-cta-contact"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 animate-in fade-in slide-in-from-left duration-1000 delay-1000">
              {personalInfo.socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  platform={social.platform}
                  url={social.url}
                />
              ))}
              <span className="text-muted-foreground/30 text-sm ml-2 font-mono">
                — Follow me
              </span>
            </div>
          </div>

          {/* Avatar */}
          <div className="order-1 lg:order-2 flex justify-center animate-in fade-in zoom-in-50 duration-1000 delay-300">
            <div className="relative group">
              {/* Pulsing glow behind avatar */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, hsl(250 85% 65% / 0.1), transparent 70%)",
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
              />

              {/* Animated ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "conic-gradient(from 0deg, hsl(250 85% 65%), hsl(200 90% 55%), hsl(330 85% 60%), hsl(250 85% 65%))",
                  animation: "spin-slow 8s linear infinite",
                  filter: "blur(2px)",
                }}
              />

              {/* Orbiting dot */}
              <div
                className="absolute w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 pointer-events-none"
                style={{
                  animation: "spin-slow 6s linear infinite",
                  transformOrigin: "calc(50% + 140px) 50%",
                  top: "50%",
                  left: "50%",
                  marginTop: "-6px",
                  marginLeft: "-6px",
                }}
              />

              {/* Avatar container */}
              <div className="relative rounded-full overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 border-[3px] border-background group-hover:scale-[1.02] transition-transform duration-500">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={personalInfo.profileImageUrl}
                    alt={`${personalInfo.name} profile`}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full text-5xl bg-card flex items-center justify-center gradient-text font-bold">
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-in fade-in duration-1000 delay-[2000ms]">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
