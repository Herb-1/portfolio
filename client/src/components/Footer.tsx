import { personalInfo } from "@/lib/data";

export function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold text-white">
              {personalInfo.name}
            </a>
            <p className="text-gray-400 mt-2">© {currentYear} All rights reserved.</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-200">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
