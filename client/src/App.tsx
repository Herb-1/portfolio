import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import Footer from "./components/Footer";
import { ParticleBackground } from "./components/ParticleBackground";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { Toaster } from "@/components/ui/toaster";

// Main App component
const App = () => {
  // Set up smooth scrolling behavior
  useEffect(() => {
    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const element = document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Layered background effects */}
      <AnimatedBackground />
      <ParticleBackground />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Header />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default App;
