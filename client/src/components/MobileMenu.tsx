import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Listen for toggleMobileMenu custom event
  useEffect(() => {
    const handleToggle = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen);
    };
    
    window.addEventListener('toggleMobileMenu', handleToggle as EventListener);
    return () => window.removeEventListener('toggleMobileMenu', handleToggle as EventListener);
  }, []);
  
  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('toggleMobileMenu', { 
      detail: { isOpen: false } 
    }));
  };

  return (
    <div 
      className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 pt-20 pb-8">
        <button 
          className="absolute top-4 right-4 text-tertiary focus:outline-none"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
        
        <nav className="flex flex-col space-y-6">
          <a 
            href="#home" 
            className="text-tertiary hover:text-primary text-lg font-medium transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-tertiary hover:text-primary text-lg font-medium transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-tertiary hover:text-primary text-lg font-medium transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-tertiary hover:text-primary text-lg font-medium transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
}
