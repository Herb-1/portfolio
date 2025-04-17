import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Toggle body overflow to prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Dispatch custom event for MobileMenu component
    window.dispatchEvent(new CustomEvent('toggleMobileMenu', { 
      detail: { isOpen: !isMobileMenuOpen } 
    }));
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Name */}
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {personalInfo.name}
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
              About
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
              Projects
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
              Contact
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-muted-foreground hover:text-primary focus:outline-none transition-colors" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
